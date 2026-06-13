'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import { Plus, Trophy, RefreshCw, Trash2, Loader2, Search, ExternalLink } from 'lucide-react'

type Keyword = { id: string; keyword: string; position: number | null; url: string | null; checked_at: string | null }
type Query = { query: string; clicks: number; impressions: number; position: number; ctr: number }

const card = { background: C.card, border: `1px solid ${C.border}` }

export default function RankTracker() {
  const [keywords, setKeywords] = useState<Keyword[]>([])
  const [serpapi, setSerpapi] = useState(false)
  const [input, setInput] = useState('')
  const [adding, setAdding] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
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
    setGscConnected(!!data.connected)
    setQueries(data.queries || [])
    setGscError(data.error || null)
  }

  useEffect(() => { Promise.all([loadKeywords(), loadQueries()]).finally(() => setLoading(false)) }, [])

  async function track() {
    if (!input.trim() || adding) return
    setAdding(true)
    await fetch('/api/admin/keywords', { method: 'POST', headers: await authHeader(), body: JSON.stringify({ keyword: input.trim() }) })
    setInput('')
    await loadKeywords()
    setAdding(false)
  }

  async function recheck(id: string) {
    setBusyId(id)
    await fetch('/api/admin/keywords', { method: 'POST', headers: await authHeader(), body: JSON.stringify({ recheckId: id }) })
    await loadKeywords()
    setBusyId(null)
  }

  async function remove(id: string) {
    setBusyId(id)
    await fetch(`/api/admin/keywords?id=${id}`, { method: 'DELETE', headers: await authHeader() })
    setKeywords((k) => k.filter((x) => x.id !== id))
    setBusyId(null)
  }

  function posBadge(p: number | null) {
    if (p == null) return <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#f1f5f9', color: C.faint }}>Not in top 100</span>
    const col = p <= 3 ? '#16a34a' : p <= 10 ? C.accent : '#f59e0b'
    return <span className="text-sm font-bold px-2.5 py-0.5 rounded-lg" style={{ background: p <= 3 ? '#dcfce7' : C.accentBg, color: col }}>#{p}</span>
  }

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      <div>
        <h1 className="text-3xl font-bold" style={{ color: C.text }}>Rank Tracker</h1>
        <p className="text-sm mt-1" style={{ color: C.muted }}>Live Google positions (SerpApi) + 28-day Search Console data for your keywords.</p>
      </div>

      {/* Track input */}
      <div className="rounded-2xl p-4 flex flex-wrap items-center gap-3" style={card}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && track()}
          placeholder="Track a keyword (e.g. cat breed identifier)"
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-lg outline-none text-sm" style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }} />
        <button onClick={track} disabled={adding || !input.trim()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: C.accent }}>
          {adding ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />} Track
        </button>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={serpapi ? { background: C.accentBg, color: C.accent } : { background: '#fffbeb', color: '#b45309' }}>
          {serpapi ? 'SerpApi: connected' : 'SerpApi: not connected'}
        </span>
      </div>

      {!serpapi && (
        <div className="rounded-xl px-4 py-2.5 text-sm" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309' }}>
          Add a <b>SERPAPI_KEY</b> in your env to fetch live Google positions. You can still add keywords now — ranks will fill in once it&apos;s connected.
        </div>
      )}

      {/* Tracked keywords */}
      {loading ? (
        <div className="flex items-center justify-center py-16" style={{ color: C.muted }}><Loader2 className="animate-spin" /></div>
      ) : keywords.length === 0 ? (
        <div className="rounded-2xl p-12 text-center" style={card}>
          <Trophy size={36} style={{ color: C.faint }} className="mx-auto mb-3" />
          <p className="text-sm" style={{ color: C.muted }}>No keywords tracked yet. Add one above to start.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={card}>
          {keywords.map((k, i) => (
            <div key={k.id} className="flex items-center gap-3 px-5 py-3.5" style={{ borderTop: i === 0 ? 'none' : `1px solid ${C.border}` }}>
              {posBadge(k.position)}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate" style={{ color: C.text }}>{k.keyword}</p>
                {k.url && <a href={k.url} target="_blank" rel="noreferrer" className="text-xs truncate flex items-center gap-1" style={{ color: C.faint }}>{k.url.replace(/^https?:\/\//, '')} <ExternalLink size={10} /></a>}
              </div>
              <span className="text-xs hidden sm:block shrink-0" style={{ color: C.faint }}>{k.checked_at ? new Date(k.checked_at).toLocaleDateString() : '—'}</span>
              <button onClick={() => recheck(k.id)} disabled={busyId === k.id} title="Re-check" className="p-2 rounded-lg hover:bg-black/5" style={{ color: C.muted }}>
                {busyId === k.id ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
              </button>
              <button onClick={() => remove(k.id)} disabled={busyId === k.id} title="Delete" className="p-2 rounded-lg hover:bg-black/5" style={{ color: '#ef4444' }}><Trash2 size={14} /></button>
            </div>
          ))}
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
              {queries.map((q, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 px-5 py-2.5 text-sm items-center" style={{ borderTop: `1px solid ${C.border}` }}>
                  <span className="col-span-6 truncate" style={{ color: C.text }}>{q.query}</span>
                  <span className="col-span-2 text-right font-semibold" style={{ color: C.text }}>{q.clicks}</span>
                  <span className="col-span-2 text-right" style={{ color: C.muted }}>{q.impressions}</span>
                  <span className="col-span-2 text-right" style={{ color: C.muted }}>{q.position.toFixed(1)}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
