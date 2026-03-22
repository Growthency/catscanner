'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function CreditsPage() {
  const [profile, setProfile] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return
      Promise.all([
        supabase.from('profiles').select('*').eq('id', session.user.id).single(),
        supabase.from('transactions').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false }),
      ]).then(([profileRes, txRes]) => {
        if (profileRes.data) setProfile(profileRes.data)
        if (txRes.data) setTransactions(txRes.data)
      })
    })
  }, [])

  const credits = profile?.credits ?? 0
  const creditColor = credits > 100 ? 'var(--accent)' : credits >= 10 ? '#f59e0b' : '#ef4444'

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="font-fraunces text-3xl font-bold" style={{color:'var(--text-primary)'}}>Credits & Billing</h1>

      {/* Balance card */}
      <div className="rounded-2xl p-6" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
        <p className="text-sm mb-1" style={{color:'var(--text-faint)'}}>Current Balance</p>
        <p className="font-fraunces text-5xl font-black mb-1" style={{color:creditColor}}>{credits}</p>
        <p className="text-sm mb-4" style={{color:'var(--text-faint)'}}>credits · 1 scan = 10 credits</p>
        <Link href="/pricing" className="inline-block px-5 py-2.5 rounded-full font-semibold text-sm text-white glow-orange" style={{background:'var(--btn-primary)'}}>
          Buy More Credits →
        </Link>
      </div>

      {/* Transaction history */}
      <div className="rounded-2xl overflow-hidden" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
        <div className="px-6 py-4" style={{borderBottom:'1px solid var(--border)'}}>
          <h2 className="font-fraunces text-lg font-bold" style={{color:'var(--text-primary)'}}>Transaction History</h2>
        </div>
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <p style={{color:'var(--text-muted)'}}>No transactions yet.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{borderBottom:'1px solid var(--border)'}}>
                {['Date', 'Pack', 'Credits', 'Amount'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{color:'var(--text-faint)'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx: any) => (
                <tr key={tx.id} style={{borderBottom:'1px solid var(--border)'}}>
                  <td className="px-5 py-3 whitespace-nowrap" style={{color:'var(--text-faint)'}}>{new Date(tx.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3 font-medium" style={{color:'var(--text-primary)'}}>{tx.pack_name}</td>
                  <td className="px-5 py-3" style={{color:'var(--accent)'}}>+{tx.credits_added}</td>
                  <td className="px-5 py-3" style={{color:'var(--text-muted)'}}>${tx.amount_paid?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
