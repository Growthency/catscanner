import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { createServerClient } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'

// POST /api/upload-avatar — any signed-in user can upload their (WebP) avatar.
export async function POST(req: NextRequest) {
  const header = req.headers.get('authorization')
  if (!header?.startsWith('Bearer ')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const token = header.slice(7)

  const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '')
  const { data: { user } } = await anon.auth.getUser(token)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const name = `avatars/${user.id}-${randomUUID()}.webp`
  const supabase = createServerClient()
  const { error } = await supabase.storage.from('uploads').upload(name, await file.arrayBuffer(), { contentType: 'image/webp', upsert: false })
  if (error) {
    const hint = /bucket/i.test(error.message) ? ' (create a public "uploads" bucket in Supabase Storage)' : ''
    return NextResponse.json({ error: error.message + hint }, { status: 400 })
  }
  const { data } = supabase.storage.from('uploads').getPublicUrl(name)
  return NextResponse.json({ url: data.publicUrl })
}
