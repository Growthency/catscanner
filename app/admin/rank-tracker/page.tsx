'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import { Plus, Trophy, RefreshCw, Trash2, Loader2, Search, ExternalLink, Play, Target, TrendingUp, Clock, Crosshair } from 'lucide-react'

type Keyword = { id: string; keyword: string; position: number | null; url: string | null; checked_at: string | null; volume?: number | null }
type Query = { query: string; clicks: number; impressions: number; position: number; ctr: number }

const card = { background: C.card, border: `1px solid ${C.border}` }

// Google-rank colour tiers (matches the legend below the table).
function tier(p: number | null): { label: string; bg: string; col: string } {
  if (p == null) return { label: 'N/A', bg: '#f1f5f9', col: C.faint }
  if (p <= 3) return { label: `#${p}`, bg: 'rgba(245,158,11,0.15)', col: '#d97706' }
  if (p <= 10) return { label: `#${p}`, bg: '#dcfce7', col: '#16a34a' }
  if (p <= 30) return { label: `#${p}`, bg: 'rgba(59,130,246,0.12)', col: '#2563eb' }
  if (p <= 50) return { label: `#${p}`, bg: 'rgba(249,115,22,0.14)', col: C.accent }
  return { label: `#${p}`, bg: '#fef2f2', col: '#dc2626' }
}

function Stat({ label, value, sub, Icon }: { label: string; value: string | number; sub?: string; Icon: any }) {
  return (
    <div className="rounded-2xl p-4" style={card}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.faint }}>{label}</span>
        <Icon size={15} style={{ color: C.accent }} />
      </div>
      <p className="text-2xl font-bold leading-none" style={{ color: C.text }}>{value}</p>
      {sub && <p className="text-[11px] mt-1" style={{ color: C.faint }}>{sub}</p>}
    </div>
  )
}

export default function RankTracker() {
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [serpapi, setSerpapi] = useState(false)
  const [input, setInput] = useState('')
  const [adding, setAdding] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [checkingAll, setCheckingAll] = useState(false)
  const [editVol, setEditVol] = useState<string | null>(null)
  const [volVal, setVolVal] = useState('')
  const [queries, setQueries] = useState<Query[]>([])
  const [gscConnected, setGscConnected] = useState(false)
  const [gscError, setGscError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  async function authHeader() {
    const { data: { session } } = await supabase.auth.getSession()
    return { Authorization: `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' }
  }

  async function loadKeywords() {
    const res = await fetch('/api/admin/keywords', { headers: await authHeader() })
    const data = await res.json()
    if (res.ok) { setKeywords(data.keywords || []); setSerpapi(!!data.serpapi) }
  }
  async function loadQueries() {
    const res = await fetch('/api/admin/search-queries', { headers: await authHeader() })
    const data = await res.json()
    setGscConnected(!!data.connected); setQueries(data.queries || []); setGscError(data.error || null)
  }
  useEffect(() => { Promise.all([loadKeywords(), loadQueries()]).finally(() => setLoading(false)) }, [])

  async function track() {
    if (!input.trim() || adding) return
    setAdding(true)
    await fetch('/api/admin/keywords', { method: 'POST', headers: await authHeader(), body: JSON.stringify({ keyword: input.trim() }) })
    setInput(''); await loadKeywords(); setAdding(false)
  }
  async function recheck(id: string) {
    setBusyId(id)
    await fetch('/api/admin/keywords', { method: 'POST', headers: await authHeader(), body: JSON.stringify({ recheckId: id }) })
    await loadKeywords(); setBusyId(null)
  }
  async function recheckAll() {
    if (checkingAll || !keywords.length) return
    setCheckingAll(true)
    const h = await authHeader()
    for (const k of keywords) {
      try { await fetch('/api/admin/keywords', { method: 'POST', headers: h, body: JSON.stringify({ recheckId: k.id }) }) } catch {}
    }
    await loadKeywords(); setCheckingAll(false)
  }
  async function remove(id: string) {
    setBusyId(id)
    await fetch(`/api/admin/keywords?id=${id}`, { method: 'DELETE', headers: await authHeader() })
    setKeywords((k) => k.filter((x) => x.id !== id)); setBusyId(null)
  }
  async function saveVolume(id: string) {
    const v = volVal.trim()
    setEditVol(null)
    const volume = v === '' ? null : Number(v)
    setKeywords((list) => list.map((k) => (k.id === id ? { ...k, volume } : k)))
    await fetch('/api/admin/keywords', { method: 'POST', headers: await authHeader(), body: JSON.stringify({ volumeId: id, volume }) })
  }

  const withPos = keywords.filter((k) => k.position != null) as (Keyword & { position: number })[]
  const inTop3 = withPos.filter((k) => k.position <= 3).length
  const inTop10 = withPos.filter((k) => k.position <= 10).length
  const avgPos = withPos.length ? (withPos.reduce((s, k) => s + k.position, 0) / withPos.length).toFixed(1) : '—'
  const lastCheck = keywords.map((k) => k.checked_at).filter(Boolean).sort().slice(-1)[0] as string | undefined

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.accentBg }}><Trophy size={20} style={{ color: C.accent }} /></div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: C.text }}>Rank Tracker</h1>
          <p className="text-sm" style={{ color: C.muted }}>Track your Google rankings for target keywords (US)</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Stat label="Keywords" value={keywords.length} sub="tracked" Icon={Target} />
        <Stat label="Top 3" value={inTop3} sub="keywords" Icon={Trophy} />
        <Stat label="Top 10" value={inTop10} sub="keywords" Icon={Trophy} />
        <Stat label="Avg Position" value={avgPos === '—' ? '—' : `#${avgPos}`} sub="across ranked" Icon={TrendingUp} />
        <Stat label="Ranking" value={`${withPos.length}/${keywords.length}`} sub="found in top 100" Icon={Crosshair} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        <Stat label="Last Check" value={lastCheck ? new Date(lastCheck).toLocaleString() : '—'} sub="" Icon={Clock} />
        <div className="rounded-2xl p-4 flex items-center justify-between" style={card}>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.faint }}>SerpApi</span>
            <p className="text-sm font-bold mt-1" style={{ color: serpapi ? '#16a34a' : '#b45309' }}>{serpapi ? 'Connected' : 'Not connected'}</p>
          </div>
          <button onClick={recheckAll} disabled={checkingAll || !keywords.length}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: C.accent }}>
            {checkingAll ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />} Run Check
          </button>
        </div>
      </div>

      {/* Add keyword */}
      <div className="rounded-2xl p-4 flex flex-wrap items-center gap-3" style={card}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && track()}
          placeholder="e.g. cat breed identifier"
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-lg outline-none text-sm" style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }} />
        <button onClick={track} disabled={adding || !input.trim()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: C.accent }}>
          {adding ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />} Add
        </button>
      </div>

      {!serpapi && (
        <div className="rounded-xl px-4 py-2.5 text-sm" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309' }}>
          Add a <b>SERPAPI_KEY</b> in your env to fetch live Google positions. You can still add keywords now — ranks fill in once it&apos;s connected.
        </div>
      )}

      {/* Keyword table */}
      {loading ? (
        <div className="flex items-center justify-center py-16" style={{ color: C.muted }}><Loader2 className="animate-spin" /></div>
      ) : keywords.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={card}>
          <Trophy size={36} style={{ color: C.faint }} className="mx-auto mb-3" />
          <p className="text-sm" style={{ color: C.muted }}>No keywords tracked yet. Add one above to start.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={card}>
          <div className="grid grid-cols-12 gap-2 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide" style={{ background: C.bg, color: C.faint }}>
            <span className="col-span-1">#</span>
            <span className="col-span-4">Keyword</span>
            <span className="col-span-1 text-right">Volume</span>
            <span className="col-span-2 text-center">US Position</span>
            <span className="col-span-2">Ranking URL</span>
            <span className="col-span-2 text-right">Checked</span>
          </div>
          {keywords.map((k, i) => {
            const t = tier(k.position)
            return (
              <div key={k.id} className="grid grid-cols-12 gap-2 px-5 py-3 items-center text-sm" style={{ borderTop: `1px solid ${C.border}` }}>
                <span className="col-span-1 font-semibold" style={{ color: C.faint }}>{i + 1}</span>
                <span className="col-span-4 font-medium truncate" style={{ color: C.text }} title={k.keyword}>{k.keyword}</span>
                <span className="col-span-1 text-right">
                  {editVol === k.id ? (
                    <input autoFocus value={volVal} onChange={(e) => setVolVal(e.target.value)} onBlur={() => saveVolume(k.id)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); saveVolume(k.id) } if (e.key === 'Escape') setEditVol(null) }}
                      inputMode="numeric" placeholder="18100"
                      className="w-20 px-1.5 py-0.5 rounded text-sm text-right outline-none" style={{ border: `1px solid ${C.accent}`, background: C.card, color: C.text }} />
                  ) : (
                    <button type="button" onClick={() => { setEditVol(k.id); setVolVal(k.volume != null ? String(k.volume) : '') }} title="Click to set search volume"
                      className="text-sm hover:underline" style={{ color: k.volume != null ? C.muted : C.faint }}>
                      {k.volume != null ? (k.volume >= 1000 ? `${(k.volume / 1000).toFixed(1)}K` : k.volume) : 'Set'}
                    </button>
                  )}
                </span>
                <span className="col-span-2 flex justify-center">
                  <span className="text-sm font-bold px-2.5 py-1 rounded-lg" style={{ background: t.bg, color: t.col }}>{t.label}</span>
                </span>
                <span className="col-span-2 min-w-0">
                  {k.url ? <a href={k.url} target="_blank" rel="noreferrer" className="text-xs truncate flex items-center gap-1" style={{ color: C.accent }}>{k.url.replace(/^https?:\/\/[^/]+/, '') || '/'} <ExternalLink size={10} /></a> : <span className="text-xs" style={{ color: C.faint }}>—</span>}
                </span>
                <span className="col-span-2 flex items-center justify-end gap-1">
                  <span className="text-xs hidden sm:block" style={{ color: C.faint }}>{k.checked_at ? new Date(k.checked_at).toLocaleDateString() : '—'}</span>
                  <button onClick={() => recheck(k.id)} disabled={busyId === k.id} title="Re-check" className="p-1.5 rounded-lg hover:bg-black/5" style={{ color: '#16a34a' }}>
                    {busyId === k.id ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
                  </button>
                  <button onClick={() => remove(k.id)} disabled={busyId === k.id} title="Delete" className="p-1.5 rounded-lg hover:bg-black/5" style={{ color: '#ef4444' }}><Trash2 size={14} /></button>
                </span>
              </div>
            )
          })}
          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 px-5 py-3 text-xs" style={{ borderTop: `1px solid ${C.border}`, color: C.muted }}>
            {[['Top 3', '#d97706'], ['4-10', '#16a34a'], ['11-30', '#2563eb'], ['31-50', C.accent], ['50+', '#dc2626']].map(([l, c]) => (
              <span key={l} className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /> {l}</span>
            ))}
          </div>
        </div>
      )}

      {/* Top queries (Search Console) */}
      <div>
        <h2 className="text-base font-semibold mb-3 mt-2" style={{ color: C.text }}>Top 100 queries (Search Console)</h2>
        <div className="rounded-2xl overflow-hidden" style={card}>
          {!gscConnected ? (
            <div className="p-10 text-center">
              <Search size={32} style={{ color: C.faint }} className="mx-auto mb-3" />
              <p className="text-sm font-medium mb-1" style={{ color: C.text }}>Search Console not connected</p>
              <p className="text-xs max-w-md mx-auto" style={{ color: C.muted }}>{gscError || 'Add a Google service-account (GSC_SERVICE_ACCOUNT_JSON) to pull your real search queries here.'}</p>
            </div>
          ) : queries.length === 0 ? (
            <div className="p-10 text-center text-sm" style={{ color: C.muted }}>No query data yet — give Google a few days after launch.</div>
          ) : (
            <>
              <div className="grid grid-cols-12 gap-2 px-5 py-2.5 text-xs font-semibold" style={{ background: C.bg, color: C.faint }}>
                <span className="col-span-6">Query</span>
                <span className="col-span-2 text-right">Clicks</span>
                <span className="col-span-2 text-right">Impr.</span>
                <span className="col-span-2 text-right">Pos.</span>
              </div>
              <div style={{ maxHeight: 360, overflowY: 'auto' }} className="pr-1">
                {queries.map((q, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 px-5 py-2.5 text-sm items-center" style={{ borderTop: `1px solid ${C.border}` }}>
                    <span className="col-span-6 truncate" style={{ color: C.text }}>{q.query}</span>
                    <span className="col-span-2 text-right font-semibold" style={{ color: C.text }}>{q.clicks}</span>
                    <span className="col-span-2 text-right" style={{ color: C.muted }}>{q.impressions}</span>
                    <span className="col-span-2 text-right" style={{ color: C.muted }}>{q.position.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
