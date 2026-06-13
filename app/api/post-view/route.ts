import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

// POST /api/post-view { slug } — increment a post's view counter.
export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json()
    if (!slug) return NextResponse.json({ ok: false }, { status: 400 })
    const supabase = createServerClient()
    await supabase.rpc('increment_post_views', { post_slug: slug })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
