import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/admin-auth'

const noAuth = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return noAuth()
  const supabase = createServerClient()
  const { data, error } = await supabase.from('header_scripts').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ scripts: [], error: error.message })
  return NextResponse.json({ scripts: data })
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return noAuth()
  const { name, code, enabled } = await req.json()
  if (!name?.trim() || !code?.trim()) return NextResponse.json({ error: 'Name and code are required' }, { status: 400 })
  const supabase = createServerClient()
  const { data, error } = await supabase.from('header_scripts').insert({ name: name.trim(), code, enabled: enabled !== false }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ script: data })
}

export async function PUT(req: NextRequest) {
  if (!(await requireAdmin(req))) return noAuth()
  const { id, ...fields } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const supabase = createServerClient()
  const { data, error } = await supabase.from('header_scripts').update(fields).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ script: data })
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) return noAuth()
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const supabase = createServerClient()
  await supabase.from('header_scripts').delete().eq('id', id)
  return NextResponse.json({ success: true })
}
