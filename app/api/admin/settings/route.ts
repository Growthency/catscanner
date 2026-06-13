import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/admin-auth'

// GET /api/admin/settings — all key/value site settings (admin only).
export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const supabase = createServerClient()
  const { data, error } = await supabase.from('site_settings').select('key,value')
  if (error) return NextResponse.json({ settings: {}, error: error.message })
  const settings = Object.fromEntries((data || []).map((r) => [r.key, r.value]))
  return NextResponse.json({ settings })
}

// PUT /api/admin/settings { settings: {key: value} } — upsert settings (admin only).
export async function PUT(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const settings = body.settings || {}
  const rows = Object.entries(settings).map(([key, value]) => ({ key, value: String(value), updated_at: new Date().toISOString() }))
  if (!rows.length) return NextResponse.json({ success: true })
  const supabase = createServerClient()
  const { error } = await supabase.from('site_settings').upsert(rows)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
