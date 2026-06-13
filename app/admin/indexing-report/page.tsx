'use client'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import {
  Globe, RefreshCw, Loader2, Zap, Radio, Rss, Send, CheckCircle2, XCircle, Search, ExternalLink, Sparkles,
} from 'lucide-react'

const SITE = 'https://catscanner.org/'

type Status = { coverageState: string; indexed: boolean }

function Ring({ pct }: { pct: number }) {
  const r = 58, circ = 2 * Math.PI * r
  const off = circ - (pct / 100) * circ
  const col = pct >= 70 ? '#22c55e' : pct >= 30 ? C.accent : '#ef4444'
  return (
    <svg width="150" height="150" viewBox="0 0 150 150">
      <circle cx="75" cy="75" r={r} fill="none" stroke={C.border} strokeWidth="12" />
      <circle cx="75" cy="75" r={r} fill="none" stroke={col} strokeWidth="12" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off} transform="rotate(-90 75 75)" />
      <text x="75" y="72" textAnchor="middle" fontSize="26" fontWeight="800" fill={col}>{pct.toFixed(1)}%</text>
      <text x="75" y="92" textAnchor="middle" fontSize="11" fill={C.faint}>Indexed</text>
    </svg>
  )
}

export default function IndexingReport() {
  const [pages, setPages] = useState<string[]>([])
  const [status, setStatus] = useState<Record<string, Status>>({})
  const [scanning, setScanning] = useState(false)
  const [connected, setConnected] = useState<boolean | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [lastScan, setLastScan] = useState('')
  const [busy, setBusy] = useState<string | null>(null)

  useEffect(() => {
    fetch('/sitemap.xml').then((r) => r.text()).then((xml) => {
      const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim())
      setPages(locs.length ? locs : [SITE])
    }).catch(() => setPages([SITE]))
  }, [])

  async function authHeader() {
    const { data: { session } } = await supabase.auth.getSession()
    return { Authorization: `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' }
  }

  async function runScan() {
    if (scanning || !pages.length) return
    setScanning(true); setNote(null)
    const headers = await authHeader()
    for (let i = 0; i < pages.length; i += 8) {
      const chunk = pages.slice(i, i + 8)
      const res = await fetch('/api/admin/index-status', { method: 'POST', headers, body: JSON.stringify({ urls: chunk }) })
      const data = await res.json()
      if (!data.connected) { setConnected(false); setNote(data.error || 'Connect a Google service account (GSC_SERVICE_ACCOUNT_JSON) for real index status.'); break }
      setConnected(true)
      setStatus((prev) => { const next = { ...prev }; for (const r of data.results) next[r.url] = { coverageState: r.coverageState, indexed: r.indexed }; return next })
    }
    setLastScan(new Date().toLocaleString())
    setScanning(false)
  }

  async function indexNow(urls: string[]) {
    if (!urls.length) return
    setBusy('indexnow')
    const res = await fetch('/api/admin/indexnow', { method: 'POST', headers: await authHeader(), body: JSON.stringify({ urls }) })
    const data = await res.json()
    setBusy(null)
    setNote(data.ok ? `✅ Submitted ${data.submitted} URL(s) to IndexNow (Bing, Yandex…).` : `IndexNow failed (status ${data.status || '?'}).`)
  }

  const indexed = pages.filter((p) => status[p]?.indexed)
  const notIndexed = pages.filter((p) => !status[p]?.indexed)
  const rate = pages.length ? (indexed.length / pages.length) * 100 : 0

  const coverage = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const p of pages) {
      const s = status[p]?.coverageState || (connected === false ? 'Not scanned' : 'Not scanned')
      counts[s] = (counts[s] || 0) + 1
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [pages, status, connected])

  const filtered = (list: string[]) => list.filter((p) => p.toLowerCase().includes(search.toLowerCase()))
  const path = (u: string) => { try { return new URL(u).pathname } catch { return u } }
  const inspectUrl = (u: string) => `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(SITE)}&id=${encodeURIComponent(u)}`
  const card = { background: C.card, border: `1px solid ${C.border}` }

  function Tool({ icon: Icon, title, sub, children }: any) {
    return (
      <div className="rounded-2xl p-5 flex flex-col" style={card}>
        <div className="flex items-center gap-2 mb-2"><Icon size={18} style={{ color: C.accent }} /><div><p className="text-sm font-semibold" style={{ color: C.text }}>{title}</p><p className="text-xs" style={{ color: C.faint }}>{sub}</p></div></div>
        <div className="flex-1 flex flex-col justify-end mt-2">{children}</div>
      </div>
    )
  }

  function PageRow({ url }: { url: string }) {
    const s = status[url]
    return (
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate" style={{ color: C.text }}>{path(url)}</p>
          {s && <span className="text-[11px] px-1.5 py-0.5 rounded" style={{ background: s.indexed ? '#dcfce7' : '#fff7ed', color: s.indexed ? '#16a34a' : '#b45309' }}>{s.coverageState}</span>}
        </div>
        <a href={inspectUrl(url)} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs px-2 py-1 rounded" style={{ background: C.bg, color: C.muted }}><Send size={11} /> Google</a>
        <button onClick={() => indexNow([url])} className="flex items-center gap-1 text-xs px-2 py-1 rounded" style={{ background: C.accentBg, color: C.accent }}><Zap size={11} /> IndexNow</button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: C.accentBg }}><Globe size={22} style={{ color: C.accent }} /></div>
          <div><h1 className="text-2xl font-bold" style={{ color: C.text }}>Indexing Report</h1><p className="text-sm" style={{ color: C.muted }}>Monitor &amp; manage your Google search index.</p></div>
        </div>
        <div className="flex items-center gap-3">
          {lastScan && <span className="text-xs" style={{ color: C.faint }}>Last scan: {lastScan}</span>}
          <button onClick={runScan} disabled={scanning} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: C.accent }}>
            {scanning ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />} Run Scan
          </button>
        </div>
      </div>

      {/* SEO Boost Tools */}
      <div className="rounded-2xl p-4" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
        <p className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: C.text }}><Sparkles size={15} style={{ color: C.accent }} /> SEO Boost Tools</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Tool icon={Radio} title="IndexNow" sub="Instant crawl notification">
            <p className="text-xs mb-3" style={{ color: C.muted }}>Submit not-indexed URLs to Bing, Yandex &amp; more. No daily limit.</p>
            <button onClick={() => indexNow(notIndexed.length ? notIndexed : pages)} disabled={busy === 'indexnow'} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: '#3b82f6' }}>
              {busy === 'indexnow' ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />} Submit Not-Indexed ({notIndexed.length || pages.length})
            </button>
          </Tool>
          <Tool icon={Radio} title="Sitemap Submit" sub="Bing + IndexNow">
            <p className="text-xs mb-3" style={{ color: C.muted }}>Ping your sitemap to IndexNow engines. Use after publishing new content.</p>
            <button onClick={() => indexNow([`${SITE}sitemap.xml`])} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: C.accent }}>
              <Radio size={14} /> Submit Sitemap
            </button>
          </Tool>
          <Tool icon={Rss} title="RSS Feed" sub="Auto-discovery for crawlers">
            <p className="text-xs mb-2" style={{ color: C.muted }}>Helps engines discover new content. Active at <b>/feed.xml</b>.</p>
            <a href="/feed.xml" target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#f97316,#fb923c)' }}>
              <ExternalLink size={14} /> View RSS Feed
            </a>
            <p className="flex items-center gap-1 text-[11px] mt-2" style={{ color: '#16a34a' }}><CheckCircle2 size={11} /> Active — auto-linked in &lt;head&gt;</p>
          </Tool>
        </div>
      </div>

      {note && <div className="rounded-xl px-4 py-2.5 text-sm" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309' }}>{note}</div>}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pages', value: pages.length, color: C.text },
          { label: 'Indexed', value: indexed.length, color: '#16a34a' },
          { label: 'Not Indexed', value: notIndexed.length, color: '#ef4444' },
          { label: 'Index Rate', value: `${rate.toFixed(0)}%`, color: C.accent },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-5" style={card}>
            <p className="text-xs mb-1" style={{ color: C.faint }}>{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Donut + Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl p-6 flex flex-col items-center justify-center" style={card}>
          <Ring pct={rate} />
          <div className="flex gap-4 mt-3 text-sm">
            <span style={{ color: '#16a34a' }}>● Indexed ({indexed.length})</span>
            <span style={{ color: '#ef4444' }}>● Not Indexed ({notIndexed.length})</span>
          </div>
        </div>
        <div className="rounded-2xl p-6" style={card}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: C.text }}>Coverage Breakdown</h3>
          <div className="space-y-3">
            {coverage.map(([state, count]) => (
              <div key={state}>
                <div className="flex justify-between text-sm mb-1"><span style={{ color: C.muted }}>{state}</span><span className="font-semibold" style={{ color: C.text }}>{count} ({Math.round((count / pages.length) * 100)}%)</span></div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: C.bg }}><div className="h-full rounded-full" style={{ width: `${(count / pages.length) * 100}%`, background: C.accent }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search + bulk */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.faint }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pages…" className="w-full pl-9 pr-3 py-2.5 rounded-lg outline-none text-sm" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }} />
        </div>
        <button onClick={() => indexNow(notIndexed.length ? notIndexed : pages)} disabled={busy === 'indexnow'} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: C.accent }}>
          <Send size={14} /> Index All Not-Indexed ({notIndexed.length || pages.length})
        </button>
      </div>

      {/* Page lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl overflow-hidden" style={card}>
          <p className="flex items-center gap-2 px-4 py-3 text-sm font-semibold" style={{ color: C.text }}><CheckCircle2 size={15} style={{ color: '#16a34a' }} /> Indexed Pages ({indexed.length})</p>
          {filtered(indexed).length === 0 ? <p className="px-4 py-8 text-center text-sm" style={{ color: C.faint }}>No indexed pages match.</p> : filtered(indexed).map((u) => <PageRow key={u} url={u} />)}
        </div>
        <div className="rounded-2xl overflow-hidden" style={card}>
          <p className="flex items-center gap-2 px-4 py-3 text-sm font-semibold" style={{ color: C.text }}><XCircle size={15} style={{ color: '#ef4444' }} /> Not Indexed Pages ({notIndexed.length})</p>
          {filtered(notIndexed).length === 0 ? <p className="px-4 py-8 text-center text-sm" style={{ color: C.faint }}>No pages match.</p> : filtered(notIndexed).map((u) => <PageRow key={u} url={u} />)}
        </div>
      </div>
    </div>
  )
}
