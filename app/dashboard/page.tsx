'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function RarityBadge({ rarity }: { rarity: string }) {
  const configs: Record<string, {bg:string,color:string}> = {
    Common: {bg:'rgba(156,163,175,0.2)',color:'#9ca3af'},
    Uncommon: {bg:'rgba(59,130,246,0.2)',color:'#60a5fa'},
    Rare: {bg:'rgba(167,139,250,0.3)',color:'#a78bfa'},
    'Very Rare': {bg:'rgba(251,191,36,0.25)',color:'#fbbf24'},
  }
  const c = configs[rarity] || configs.Common
  return <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{background:c.bg, color:c.color}}>{rarity}</span>
}

function MetricCard({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="rounded-2xl p-5 card-lift" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
      <p className="text-xs mb-1" style={{color:'var(--text-faint)'}}>{label}</p>
      <p className="font-fraunces text-3xl font-bold" style={{color: color || 'var(--text-primary)'}}>{value}</p>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [scans, setScans] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [stats, setStats] = useState({ uniqueBreeds: 0, rareBreeds: 0, thisMonth: 0 })
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    if (searchParams.get('payment') === 'success') setPaymentSuccess(true)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      setUser(session.user)
      loadData(session.user.id)
    })
  }, [])

  async function loadData(userId: string) {
    const [profileRes, scansRes, txRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('scans').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(20),
      supabase.from('transactions').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    ])
    if (profileRes.data) setProfile(profileRes.data)
    if (scansRes.data) {
      setScans(scansRes.data)
      const breeds = new Set(scansRes.data.map((s:any) => s.result?.breedName).filter(Boolean))
      const rare = scansRes.data.filter((s:any) => s.result?.rarity === 'Rare' || s.result?.rarity === 'Very Rare').length
      const month = new Date().getMonth()
      const thisMonth = scansRes.data.filter((s:any) => new Date(s.created_at).getMonth() === month).length
      setStats({ uniqueBreeds: breeds.size, rareBreeds: rare, thisMonth })
    }
    if (txRes.data) setTransactions(txRes.data)
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Cat Lover'
  const credits = profile?.credits ?? 0
  const creditColor = credits > 100 ? 'var(--accent)' : credits >= 10 ? '#f59e0b' : '#ef4444'

  function timeAgo(date: string) {
    const diff = Date.now() - new Date(date).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {paymentSuccess && (
        <div className="p-4 rounded-2xl text-sm font-semibold" style={{background:'rgba(34,197,94,0.1)', color:'#22c55e', border:'1px solid rgba(34,197,94,0.2)'}}>
          🎉 Payment successful! Your credits have been added.
        </div>
      )}

      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-fraunces text-3xl font-bold" style={{color:'var(--text-primary)'}}>Hey {displayName}, ready to scan? 🐱</h1>
          <p className="text-sm mt-1" style={{color:'var(--text-muted)'}}>Here&apos;s your CatScanner overview</p>
        </div>
        <Link href="/#scanner" className="px-4 py-2.5 rounded-full font-semibold text-sm text-white glow-orange" style={{background:'var(--btn-primary)'}}>
          + New Scan
        </Link>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Scans" value={profile?.total_scans ?? 0} />
        <MetricCard label="Credits Remaining" value={credits} color={creditColor} />
        <MetricCard label="Unique Breeds" value={stats.uniqueBreeds} color="var(--purple)" />
        <MetricCard label="Rare Breeds" value={stats.rareBreeds} color="#fbbf24" />
      </div>

      {/* Credits card */}
      <div className="rounded-2xl p-6" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs mb-1" style={{color:'var(--text-faint)'}}>Credit Balance</p>
            <p className="font-fraunces text-4xl font-bold" style={{color:creditColor}}>{credits}</p>
            <p className="text-xs mt-1" style={{color:'var(--text-faint)'}}>credits remaining</p>
          </div>
          <Link href="/pricing" className="text-sm font-semibold px-4 py-2 rounded-full" style={{background:'var(--accent-bg)', color:'var(--accent)'}}>
            Buy More Credits →
          </Link>
        </div>
        <div className="w-full rounded-full h-2 overflow-hidden" style={{background:'var(--bg-secondary)'}}>
          <div className="h-2 rounded-full transition-all" style={{width:`${Math.min(100, (credits / 1200) * 100)}%`, background:'var(--accent)'}} />
        </div>
        {transactions[0] && (
          <p className="text-xs mt-2" style={{color:'var(--text-faint)'}}>
            Last purchase: {transactions[0].pack_name} — ${transactions[0].amount_paid}
          </p>
        )}
      </div>

      {/* Recent scans */}
      <div className="rounded-2xl p-6" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-fraunces text-xl font-bold" style={{color:'var(--text-primary)'}}>Recent Scans</h2>
          <Link href="/dashboard/history" className="text-xs font-semibold" style={{color:'var(--accent)'}}>View All →</Link>
        </div>
        {scans.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">🐱</div>
            <p style={{color:'var(--text-muted)'}}>No scans yet. Start scanning your cats!</p>
            <Link href="/#scanner" className="inline-block mt-4 px-5 py-2 rounded-full text-sm font-semibold text-white" style={{background:'var(--btn-primary)'}}>Scan a Cat</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {scans.slice(0, 5).map((scan: any) => (
              <div key={scan.id} className="flex items-center justify-between p-3 rounded-xl" style={{background:'var(--bg-secondary)'}}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🐱</span>
                  <div>
                    <p className="font-semibold text-sm" style={{color:'var(--text-primary)'}}>{scan.result?.breedName || 'Unknown'}</p>
                    <p className="text-xs" style={{color:'var(--text-faint)'}}>{scan.result?.fullBreedName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <RarityBadge rarity={scan.result?.rarity || 'Common'} />
                  <span className="text-xs" style={{color:'var(--text-faint)'}}>{timeAgo(scan.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl p-5" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
          <p className="font-fraunces font-bold text-lg mb-1" style={{color:'var(--text-primary)'}}>Cat Journal</p>
          <p className="text-sm mb-3" style={{color:'var(--text-muted)'}}>{stats.uniqueBreeds} breeds logged</p>
          <Link href="/dashboard/journal" className="text-xs font-semibold" style={{color:'var(--accent)'}}>View Journal →</Link>
        </div>
        <div className="rounded-2xl p-5" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
          <p className="font-fraunces font-bold text-lg mb-1" style={{color:'var(--text-primary)'}}>This Month</p>
          <p className="text-sm mb-3" style={{color:'var(--text-muted)'}}>{stats.thisMonth} scans in {new Date().toLocaleString('default', {month:'long'})}</p>
        </div>
        <div className="rounded-2xl p-5" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
          <p className="font-fraunces font-bold text-lg mb-1" style={{color:'var(--text-primary)'}}>Total Spent</p>
          <p className="text-sm mb-3" style={{color:'var(--text-muted)'}}>
            ${transactions.reduce((sum:number, t:any) => sum + (t.amount_paid || 0), 0).toFixed(2)} across {transactions.length} purchases
          </p>
          <Link href="/dashboard/credits" className="text-xs font-semibold" style={{color:'var(--accent)'}}>View Billing →</Link>
        </div>
      </div>
    </div>
  )
}
