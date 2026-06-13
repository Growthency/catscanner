import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/admin-auth'

// GET /api/admin/scan-cache?key=seo-health — load a saved scan.
export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const key = new URL(req.url).searchParams.get('key')
  if (!key) return NextResponse.json({ data: null })
  const supabase = createServerClient()
  const { data } = await supabase.from('scan_cache').select('data,scanned_at').eq('key', key).maybeSingle()
  return NextResponse.json({ data: data?.data ?? null, scannedAt: data?.scanned_at ?? null })
}

// POST /api/admin/scan-cache { key, data } — save a scan.
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { key, data } = await req.json()
  if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 })
  const supabase = createServerClient()
  const { error } = await supabase.from('scan_cache').upsert({ key, data, scanned_at: new Date().toISOString() })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
