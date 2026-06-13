'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import { DollarSign, TrendingUp, Users, Receipt, Loader2 } from 'lucide-react'

type Data = {
  totalRevenue: number; thisMonth: number; activeSubscribers: number; transactionCount: number
  packs: { Starter: number; Explorer: number; Pro: number }
  recent: { pack_name: string; amount_paid: number; credits_added: number; created_at: string }[]
}

export default function AdminSubscriptions() {
  const [d, setD] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/admin/subscriptions', { headers: { Authorization: `Bearer ${session?.access_token}` } })
      if (res.ok) setD(await res.json())
      setLoading(false)
    })()
  }, [])

  const card = { background: C.card, border: `1px solid ${C.border}` }
  const money = (n: number) => `$${(n || 0).toFixed(2)}`

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold" style={{ color: C.text }}>Subscriptions</h1>
        <p className="text-sm mt-1" style={{ color: C.muted }}>Revenue, active plans and recent transactions.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20" style={{ color: C.muted }}><Loader2 className="animate-spin" /></div>
      ) : (
        <>
          {/* Top stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: DollarSign, label: 'Total revenue', value: money(d?.totalRevenue || 0) },
              { icon: TrendingUp, label: 'This month', value: money(d?.thisMonth || 0) },
              { icon: Users, label: 'Active subscribers', value: String(d?.activeSubscribers ?? 0) },
              { icon: Receipt, label: 'Transactions', value: String(d?.transactionCount ?? 0) },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-5" style={card}>
                <s.icon size={20} style={{ color: C.accent }} className="mb-2" />
                <p className="text-2xl font-bold" style={{ color: C.text }}>{s.value}</p>
                <p className="text-xs" style={{ color: C.muted }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Per-pack */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(['Starter', 'Explorer', 'Pro'] as const).map((p) => (
              <div key={p} className="rounded-2xl p-5" style={card}>
                <p className="text-sm font-medium mb-1" style={{ color: C.muted }}>{p}</p>
                <p className="text-2xl font-bold" style={{ color: C.text }}>{d?.packs?.[p] ?? 0}</p>
                <p className="text-xs" style={{ color: C.faint }}>purchases</p>
              </div>
            ))}
          </div>

          {/* Recent transactions */}
          <div>
            <h2 className="text-base font-semibold mb-3" style={{ color: C.text }}>Recent transactions</h2>
            <div className="rounded-2xl overflow-hidden" style={card}>
              {!d?.recent?.length ? (
                <div className="p-10 text-center text-sm" style={{ color: C.muted }}>No transactions yet.</div>
              ) : (
                d.recent.map((t, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: i === 0 ? 'none' : `1px solid ${C.border}` }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: C.text }}>{t.pack_name}</p>
                      <p className="text-xs" style={{ color: C.faint }}>{new Date(t.created_at).toLocaleDateString()} · +{t.credits_added} credits</p>
                    </div>
                    <span className="text-sm font-bold" style={{ color: '#16a34a' }}>{money(t.amount_paid)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
