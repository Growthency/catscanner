import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/admin-auth'

// GET /api/admin/posts/:id — fetch one post for editing (admin only)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const supabase = createServerClient()
  const { data, error } = await supabase.from('posts').select('*').eq('id', params.id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ post: data })
}

// PUT /api/admin/posts/:id — update a post (admin only)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  body.updated_at = new Date().toISOString()
  const supabase = createServerClient()
  const { data, error } = await supabase.from('posts').update(body).eq('id', params.id).select().single()
  if (error) {
    const msg = error.code === '23505' ? 'That permalink (slug) is already taken.' : error.message
    return NextResponse.json({ error: msg }, { status: 400 })
  }
  return NextResponse.json({ post: data })
}

// DELETE /api/admin/posts/:id — delete a post (admin only)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const supabase = createServerClient()
  const { error } = await supabase.from('posts').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
