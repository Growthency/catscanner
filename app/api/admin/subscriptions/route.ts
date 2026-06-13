import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/admin-auth'

// GET /api/admin/subscriptions — revenue, buyers and recent credit purchases.
export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClient()
  const [txRes, profRes] = await Promise.all([
    supabase.from('transactions').select('*').order('created_at', { ascending: false }),
    supabase.from('profiles').select('credits'),
  ])

  const tx = txRes.data || []
  const now = new Date()
  const num = (v: any) => Number(v) || 0

  const totalRevenue = tx.reduce((s, t) => s + num(t.amount_paid), 0)
  const thisMonth = tx
    .filter((t) => { const d = new Date(t.created_at); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() })
    .reduce((s, t) => s + num(t.amount_paid), 0)
  const activeSubscribers = (profRes.data || []).filter((p) => num(p.credits) > 0).length

  const packs = { Starter: 0, Explorer: 0, Pro: 0 }
  for (const t of tx) {
    const name = (t.pack_name || '').toLowerCase()
    if (name.includes('starter')) packs.Starter++
    else if (name.includes('explorer')) packs.Explorer++
    else if (name.includes('pro')) packs.Pro++
  }

  const recent = tx.slice(0, 10).map((t) => ({
    pack_name: t.pack_name || 'Credit purchase',
    amount_paid: num(t.amount_paid),
    credits_added: num(t.credits_added),
    created_at: t.created_at,
  }))

  return NextResponse.json({
    totalRevenue, thisMonth, activeSubscribers, transactionCount: tx.length, packs, recent,
  })
}
