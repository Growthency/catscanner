import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/admin-auth'

// GET /api/admin/posts — list every post (admin only)
export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data })
}

// POST /api/admin/posts — create a post (admin only)
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  if (!body.title || !body.slug) {
    return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })
  }
  const supabase = createServerClient()
  const { data, error } = await supabase.from('posts').insert(body).select().single()
  if (error) {
    const msg = error.code === '23505' ? 'That permalink (slug) is already taken.' : error.message
    return NextResponse.json({ error: msg }, { status: 400 })
  }
  return NextResponse.json({ post: data })
}
