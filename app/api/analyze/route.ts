import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createServerClient } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'

const CAT_PROMPT = `You are an expert feline geneticist and veterinarian with 20+ years of experience.
Analyze this cat photo carefully and identify the breed.
Respond ONLY with a valid JSON object. No markdown, no backticks, no text outside the JSON.

{
  "breedName": "string (common breed name)",
  "fullBreedName": "string (official/full breed name)",
  "confidence": "High" or "Medium" or "Low",
  "rarity": "Common" or "Uncommon" or "Rare" or "Very Rare",
  "origin": "string (country of origin)",
  "size": "Small" or "Medium" or "Large" or "Extra Large",
  "coatType": "string (e.g. Short, Long, Semi-long, Hairless, Curly)",
  "coatColors": ["string"],
  "lifespan": "string (e.g. 12-15 years)",
  "weightRange": "string (e.g. 4-6 kg)",
  "personalityTraits": ["string x6"],
  "energyLevel": "Low" or "Medium" or "High" or "Very High",
  "affectionLevel": "Low" or "Medium" or "High" or "Very High",
  "vocalization": "Quiet" or "Moderate" or "Talkative" or "Very Vocal",
  "healthNotes": "string",
  "commonConditions": ["string x3"],
  "groomingNeeds": "Low" or "Medium" or "High",
  "exerciseNeeds": "Low" or "Medium" or "High",
  "dietNotes": "string",
  "feedingFrequency": "string",
  "goodWithKids": true or false,
  "goodWithDogs": true or false,
  "goodWithCats": true or false,
  "similarBreeds": [
    {
      "name": "string",
      "similarity": "string (e.g. 85%)",
      "keyDifferences": ["string x2"]
    }
  ],
  "funFacts": ["string x3"],
  "careGuide": "string (2-3 sentence summary)",
  "isCat": true or false
}

If the image does not show a cat, set isCat to false and breedName to "Not a cat".`

function getIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1'
}

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, imageHash } = await req.json()
    if (!imageBase64 || !imageHash) {
      return NextResponse.json({ error: 'Missing image data' }, { status: 400 })
    }

    const supabase = createServerClient()
    const ip = getIP(req)

    // Auth check
    const authHeader = req.headers.get('authorization')
    let userId: string | null = null

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7)
      const anonClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data: { user } } = await anonClient.auth.getUser(token)
      userId = user?.id ?? null
    }

    if (!userId) {
      // Check IP lifetime rate limit (3 scans per IP, never resets)
      const { data: ipUsage } = await supabase
        .from('ip_usage')
        .select('count')
        .eq('ip_address', ip)
        .single()

      if (ipUsage) {
        if (ipUsage.count >= 3) {
          return NextResponse.json({ error: 'free_limit_reached' }, { status: 429 })
        } else {
          await supabase.from('ip_usage').update({ count: ipUsage.count + 1 }).eq('ip_address', ip)
        }
      } else {
        await supabase.from('ip_usage').insert({ ip_address: ip, count: 1 })
      }
    } else {
      // Check credits
      const { data: profile } = await supabase.from('profiles').select('credits').eq('id', userId).single()
      if (!profile || profile.credits < 10) {
        return NextResponse.json({ error: 'insufficient_credits' }, { status: 402 })
      }
    }

    // Check cache
    const { data: cached } = await supabase
      .from('scans')
      .select('result')
      .eq('image_hash', imageHash)
      .single()

    if (cached) {
      return NextResponse.json(cached.result)
    }

    // Call Claude API
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const base64Data = imageBase64.split(',')[1]
    const mediaType = imageBase64.split(';')[0].split(':')[1] as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64Data } },
          { type: 'text', text: CAT_PROMPT }
        ]
      }]
    })

    const textContent = message.content.find(c => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 })
    }

    let result: any
    try {
      result = JSON.parse(textContent.text)
    } catch {
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 500 })
    }

    // Deduct credits and save
    if (userId) {
      await supabase.rpc('decrement_credits', { user_id: userId, amount: 10 })
      await supabase.rpc('increment_scans', { user_id: userId })
    }

    await supabase.from('scans').insert({
      user_id: userId,
      ip_address: ip,
      image_hash: imageHash,
      result,
      credits_used: userId ? 10 : 0,
    })

    return NextResponse.json(result)
  } catch (err) {
    console.error('Analyze error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
