import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/admin-auth'

const noAuth = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return noAuth()
  const supabase = createServerClient()
  const { data, error } = await supabase.from('external_link_rules').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ rules: [], error: error.message })
  return NextResponse.json({ rules: data })
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return noAuth()
  const { domain, nofollow, sponsored } = await req.json()
  const clean = (domain || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '')
  if (!clean) return NextResponse.json({ error: 'Domain required' }, { status: 400 })
  const supabase = createServerClient()
  const { data, error } = await supabase.from('external_link_rules')
    .insert({ domain: clean, nofollow: nofollow !== false, sponsored: !!sponsored }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ rule: data })
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return noAuth()
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const supabase = createServerClient()
  await supabase.from('external_link_rules').delete().eq('id', id)
  return NextResponse.json({ success: true })
}
