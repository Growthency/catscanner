'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import {
  Users, Calendar, Clock, TrendingUp, Activity, Eye, Layers,
  RefreshCw, ChevronDown, BarChart3, FileText, Globe, Loader2,
} from 'lucide-react'

const RANGES: [string, string][] = [
  ['7d', 'Last 7 Days'], ['30d', 'Last 30 Days'], ['thisMonth', 'This Month'],
  ['lastMonth', 'Last Month'], ['365d', 'Last 365 Days'], ['lifetime', 'Lifetime'],
]
const METRICS: [string, string][] = [
  ['users', 'Daily Active Users'], ['clicks', 'Daily Active Clicks'], ['both', 'Clicks vs Users'],
]

function StatCard({ label, value, Icon }: { label: string; value: number; Icon: any }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium" style={{ color: C.muted }}>{label}</span>
        <Icon size={18} style={{ color: C.accent }} />
      </div>
      <p className="text-3xl font-bold" style={{ color: C.text }}>{(value || 0).toLocaleString()}</p>
    </div>
  )
}

export default function AdminDashboard() {
  const [range, setRange] = useState('30d')
  const [metric, setMetric] = useState('users')
  const [data, setData] = useState<any>(null)
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openRange, setOpenRange] = useState(false)
  const [openMetric, setOpenMetric] = useState(false)
  const [hover, setHover] = useState<{ i: number; a: number; b: number; date: string } | null>(null)

  const load = useCallback(async () => {
    setLoading(true); setError(null)
    const { data: { session } } = await supabase.auth.getSession()
    try {
      const res = await fetch(`/api/admin/analytics?range=${range}`, { headers: { Authorization: `Bearer ${session?.access_token}` } })
      const d = await res.json()
      setConnected(!!d.connected)
      if (d.connected) setData(d)
      else { setData(null); setError(d.error || null) }
    } catch { setConnected(false); setData(null) }
    setLoading(false)
  }, [range])

  useEffect(() => { load() }, [load])

  const d = connected && data ? data : null
  const chartData: { date: string; a: number; b: number }[] = useMemo(() => {
    if (!d) return []
    const users = (d.usersChart || []) as { date: string; value: number }[]
    const clicks = (d.clicksChart || []) as { date: string; value: number }[]
    if (metric === 'clicks') return clicks.map((c) => ({ date: c.date, a: Number(c.value) || 0, b: 0 }))
    if (metric === 'both') {
      const cm: Record<string, number> = Object.fromEntries(clicks.map((c) => [c.date, Number(c.value) || 0]))
      return users.map((u) => ({ date: u.date, a: Number(u.value) || 0, b: cm[u.date] || 0 }))
    }
    return users.map((u) => ({ date: u.date, a: Number(u.value) || 0, b: 0 }))
  }, [d, metric])

  const maxChart = Math.max(1, ...chartData.flatMap((c) => [c.a, c.b]))
  const hasData = chartData.some((c) => c.a > 0 || c.b > 0)
  const md = (s: string) => { const p = String(s).split('-'); return p.length === 3 ? `${+p[1]}/${+p[2]}` : s }
  const maxCountry = Math.max(1, ...((d?.topCountries || []).map((c: any) => c.users)))
  const rangeLabel = RANGES.find((r) => r[0] === range)?.[1] || 'Last 30 Days'
  const metricLabel = METRICS.find((m) => m[0] === metric)?.[1] || 'Daily Active Users'
  const card = { background: C.card, border: `1px solid ${C.border}` }

  function Dropdown({ open, setOpen, label, icon: Icon, options, onPick, current }: any) {
    return (
      <div className="relative">
        <button onClick={() => setOpen((o: boolean) => !o)} className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}>
          {Icon && <Icon size={15} />} {label} <ChevronDown size={15} />
        </button>
        {open && (
          <div className="absolute right-0 mt-1 z-20 rounded-lg overflow-hidden min-w-[180px]" style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            {options.map(([val, lbl]: [string, string]) => (
              <button key={val} onClick={() => { onPick(val); setOpen(false) }} className="block w-full text-left px-4 py-2 text-sm" style={{ color: current === val ? C.accent : C.text, background: current === val ? C.accentBg : 'transparent' }}>{lbl}</button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: C.text }}>Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: C.muted }}>Real-time data from Google Analytics &amp; Search Console</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button onClick={load} disabled={loading} className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium disabled:opacity-50" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.muted }}>
            {loading ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />} Clear Cache
          </button>
          <Dropdown open={openRange} setOpen={setOpenRange} label={rangeLabel} icon={Calendar} options={RANGES} current={range} onPick={setRange} />
          <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: connected ? C.accent : C.faint }}>
            <span className="w-2 h-2 rounded-full" style={{ background: connected ? C.accent : C.faint }} /> GA4 {connected ? 'Connected' : 'Not connected'}
          </span>
        </div>
      </div>

      {!connected && !loading && (
        <div className="rounded-xl px-4 py-2.5 text-sm flex items-center gap-2" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309' }}>
          <span>⚠️</span> {error || 'No analytics data yet — add GA4_PROPERTY_ID + GSC_SERVICE_ACCOUNT_JSON in Vercel to show your live numbers.'}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={`Users (${rangeLabel.replace('Last ', '')})`} value={d?.users || 0} Icon={Users} />
        <StatCard label="Users (7d)" value={d?.users7d || 0} Icon={Calendar} />
        <StatCard label="Today" value={d?.today || 0} Icon={Clock} />
        <StatCard label="New Users" value={d?.newUsers || 0} Icon={TrendingUp} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Sessions" value={d?.sessions || 0} Icon={Activity} />
        <StatCard label="Page Views" value={d?.pageViews || 0} Icon={Eye} />
        <StatCard label="Total Active Users" value={d?.users || 0} Icon={Layers} />
      </div>

      {/* Chart */}
      <div className="rounded-2xl p-6" style={card}>
        <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
          <h2 className="flex items-center gap-2 text-base font-semibold" style={{ color: C.text }}>
            <BarChart3 size={18} style={{ color: C.accent }} /> {metricLabel} — {rangeLabel}
          </h2>
          <div className="flex items-center gap-2">
            {metric === 'both' && <span className="flex items-center gap-3 text-xs" style={{ color: C.faint }}><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: C.accent }} /> Users</span><span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: '#3b82f6' }} /> Clicks</span></span>}
            <Dropdown open={openMetric} setOpen={setOpenMetric} label={metricLabel} icon={BarChart3} options={METRICS} current={metric} onPick={setMetric} />
            <span className="text-xs hidden sm:inline" style={{ color: C.faint }}>from Google</span>
          </div>
        </div>
        {loading ? (
          <div className="h-52 flex items-center justify-center" style={{ color: C.muted }}><Loader2 className="animate-spin" /></div>
        ) : !hasData ? (
          <div className="h-52 flex flex-col items-center justify-center text-center" style={{ color: C.faint }}>
            <BarChart3 size={28} className="mb-2" />
            <p className="text-sm">No analytics data yet.</p>
          </div>
        ) : (
          <div className="relative h-52" onMouseLeave={() => setHover(null)}>
            {hover && (
              <div className="pointer-events-none absolute z-20 px-2 py-1 rounded-lg text-xs font-semibold whitespace-nowrap"
                style={{ left: `${((hover.i + 0.5) / chartData.length) * 100}%`, bottom: `${Math.min(90, Math.max(2, (Math.max(hover.a, hover.b) / maxChart) * 100))}%`, transform: 'translate(-50%, -8px)', background: C.text, color: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
                {metric === 'both' ? `${hover.a} / ${hover.b}` : hover.a} · {md(hover.date)}
              </div>
            )}
            <div className="flex items-end gap-1 h-full">
              {chartData.map((c, i) => (
                <div key={i} className="flex-1 flex items-end gap-0.5 h-full cursor-default" onMouseEnter={() => setHover({ i, a: c.a, b: c.b, date: c.date })}>
                  <div className="flex-1 rounded-t transition-opacity" style={{ height: `${Math.max(2, (c.a / maxChart) * 100)}%`, background: `linear-gradient(to top, ${C.accent}, #fdba74)`, opacity: hover && hover.i !== i ? 0.5 : 1 }} />
                  {metric === 'both' && <div className="flex-1 rounded-t transition-opacity" style={{ height: `${Math.max(2, (c.b / maxChart) * 100)}%`, background: '#3b82f6', opacity: hover && hover.i !== i ? 0.5 : 1 }} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6" style={card}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-base font-semibold" style={{ color: C.text }}><FileText size={17} style={{ color: C.accent }} /> Top 25 Pages</h2>
            <span className="text-xs" style={{ color: C.faint }}>by pageviews</span>
          </div>
          {(d?.topPages || []).length === 0 ? (
            <p className="py-8 text-center text-sm" style={{ color: C.faint }}>No data yet.</p>
          ) : (
            <div className="space-y-1">
              {d.topPages.map((p: any, i: number) => (
                <div key={i} className="flex items-center gap-3 py-2.5" style={{ borderBottom: i < d.topPages.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <span className="text-sm font-bold w-6 shrink-0" style={{ color: C.accent }}>#{i + 1}</span>
                  <p className="text-sm font-medium truncate flex-1" style={{ color: C.text }}>{p.path}</p>
                  <span className="flex items-center gap-1 text-sm font-semibold shrink-0" style={{ color: C.muted }}><Eye size={13} /> {p.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-2xl p-6" style={card}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-base font-semibold" style={{ color: C.text }}><Globe size={17} style={{ color: C.accent }} /> Top 25 Countries</h2>
            <span className="text-xs" style={{ color: C.faint }}>by active users</span>
          </div>
          {(d?.topCountries || []).length === 0 ? (
            <p className="py-8 text-center text-sm" style={{ color: C.faint }}>No data yet.</p>
          ) : (
            <div className="space-y-3">
              {d.topCountries.map((c: any, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-bold w-6 shrink-0" style={{ color: C.accent }}>#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1"><span className="text-sm font-medium" style={{ color: C.text }}>{c.name}</span><span className="text-sm font-semibold" style={{ color: C.muted }}>{c.users.toLocaleString()}</span></div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: C.bg }}><div className="h-full rounded-full" style={{ width: `${(c.users / maxCountry) * 100}%`, background: C.accent }} /></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
