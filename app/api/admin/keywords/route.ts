import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/admin-auth'

const DOMAIN = (process.env.GSC_SITE_URL || 'https://catscanner.org')
  .replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')

// Look up where the site ranks for a keyword on Google (via SerpApi, top 100).
async function checkRank(keyword: string): Promise<{ position: number | null; url: string | null }> {
  const key = process.env.SERPAPI_KEY
  if (!key) return { position: null, url: null }
  try {
    const res = await fetch(`https://serpapi.com/search.json?engine=google&num=100&q=${encodeURIComponent(keyword)}&api_key=${key}`)
    if (!res.ok) return { position: null, url: null }
    const data = await res.json()
    const organic: any[] = data.organic_results || []
    const hit = organic.find((r) => (r.link || '').includes(DOMAIN))
    return hit ? { position: hit.position ?? null, url: hit.link ?? null } : { position: null, url: null }
  } catch {
    return { position: null, url: null }
  }
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const supabase = createServerClient()
  const { data, error } = await supabase.from('tracked_keywords').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ keywords: [], serpapi: !!process.env.SERPAPI_KEY, error: error.message })
  return NextResponse.json({ keywords: data, serpapi: !!process.env.SERPAPI_KEY })
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const supabase = createServerClient()

  // Re-check an existing keyword's rank.
  if (body.recheckId) {
    const { data: row } = await supabase.from('tracked_keywords').select('keyword').eq('id', body.recheckId).single()
    if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const { position, url } = await checkRank(row.keyword)
    const { data } = await supabase.from('tracked_keywords')
      .update({ position, url, checked_at: new Date().toISOString() }).eq('id', body.recheckId).select().single()
    return NextResponse.json({ keyword: data })
  }

  // Manually set / clear the search volume for a keyword.
  if (body.volumeId) {
    const n = Number(body.volume)
    const volume = body.volume == null || body.volume === '' || !Number.isFinite(n) ? null : Math.round(n)
    const { data } = await supabase.from('tracked_keywords').update({ volume }).eq('id', body.volumeId).select().single()
    return NextResponse.json({ keyword: data })
  }

  // Add a new keyword.
  const keyword = (body.keyword || '').trim()
  if (!keyword) return NextResponse.json({ error: 'Keyword required' }, { status: 400 })
  const { position, url } = await checkRank(keyword)
  const { data, error } = await supabase.from('tracked_keywords')
    .insert({ keyword, position, url, checked_at: new Date().toISOString() }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ keyword: data })
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const supabase = createServerClient()
  await supabase.from('tracked_keywords').delete().eq('id', id)
  return NextResponse.json({ success: true })
}
