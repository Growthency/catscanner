'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import { SEO_CATEGORIES, type PageResult } from '@/lib/seo-checks'
import {
  Play, Zap, Loader2, XCircle, AlertTriangle, Info, CheckCircle2, RefreshCw, Shield, Download,
  FileText, Share2, Twitter, Type, Image as ImageIcon, Braces, Settings, Gauge, Link2,
} from 'lucide-react'

const BATCH = 8

const CAT_ICON: Record<string, any> = {
  'Meta Tags': FileText, 'Open Graph': Share2, 'Twitter Cards': Twitter, 'Headings': Type,
  'Images': ImageIcon, 'Structured Data': Braces, 'Technical': Settings, 'Performance': Gauge, 'Internal Links': Link2,
}

function Ring({ score }: { score: number }) {
  const r = 52, circ = 2 * Math.PI * r
  const off = circ - (Math.max(0, Math.min(100, score)) / 100) * circ
  const col = score >= 90 ? '#22c55e' : score >= 75 ? C.accent : score >= 50 ? '#f59e0b' : '#ef4444'
  return (
    <svg width="132" height="132" viewBox="0 0 132 132" className="shrink-0">
      <circle cx="66" cy="66" r={r} fill="none" stroke={C.border} strokeWidth="11" />
      <circle cx="66" cy="66" r={r} fill="none" stroke={col} strokeWidth="11" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={off} transform="rotate(-90 66 66)" />
      <text x="66" y="62" textAnchor="middle" fontSize="30" fontWeight="800" fill={C.text}>{score}</text>
      <text x="66" y="84" textAnchor="middle" fontSize="11" fill={C.faint}>/ 100</text>
    </svg>
  )
}

function pct(p: number, t: number) { return t ? Math.round((p / t) * 100) : 100 }

export default function SeoHealth() {
  const [pages, setPages] = useState<string[]>([])
  const [results, setResults] = useState<Record<string, PageResult>>({})
  const [scanning, setScanning] = useState(false)
  const [tab, setTab] = useState<'overview' | 'pages' | 'global'>('overview')
  const [lastScan, setLastScan] = useState('')
  const [error, setError] = useState<string | null>(null)
  const stopRef = useRef(false)

  useEffect(() => {
    fetch('/sitemap.xml')
      .then((r) => r.text())
      .then((xml) => {
        const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim())
        setPages(locs.length ? locs : ['https://catscanner.org/'])
      })
      .catch(() => setPages(['https://catscanner.org/']))
    ;(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/admin/scan-cache?key=seo-health', { headers: { Authorization: `Bearer ${session?.access_token}` } })
      const d = await res.json()
      if (d?.data?.results) setResults(d.data.results)
      if (d?.scannedAt) setLastScan(new Date(d.scannedAt).toLocaleString())
    })().catch(() => {})
  }, [])

  const remaining = pages.filter((p) => !results[p])
  const all = Object.values(results)

  function exportCsv() {
    const rows = [['URL', 'Score', 'Issues', 'Critical', 'Warnings', 'Info']]
    for (const r of all) {
      const lv = (l: string) => r.issues.filter((i) => i.level === l).length
      rows.push([r.url, String(r.score), String(r.issues.length), String(lv('critical')), String(lv('warning')), String(lv('info'))])
    }
    const csv = rows.map((row) => row.map((v) => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = 'seo-health.csv'; a.click(); URL.revokeObjectURL(a.href)
  }

  async function scan(urls: string[], fresh = false) {
    if (!urls.length || scanning) return
    setScanning(true); setError(null); stopRef.current = false
    if (fresh) setResults({})
    const { data: { session } } = await supabase.auth.getSession()
    const headers = { Authorization: `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' }
    const acc: Record<string, PageResult> = fresh ? {} : { ...results }
    for (let i = 0; i < urls.length; i += BATCH) {
      if (stopRef.current) break
      const chunk = urls.slice(i, i + BATCH)
      try {
        const res = await fetch('/api/admin/seo-scan', { method: 'POST', headers, body: JSON.stringify({ urls: chunk }) })
        const data = await res.json()
        if (!res.ok) { setError(data.error || 'Scan failed. Make sure you are signed in as an admin.'); break }
        for (const r of data.results) acc[r.url] = r
        setResults({ ...acc })
      } catch { setError('Scan request failed.'); break }
    }
    setLastScan(new Date().toLocaleString())
    setScanning(false)
    fetch('/api/admin/scan-cache', { method: 'POST', headers, body: JSON.stringify({ key: 'seo-health', data: { results: acc } }) }).catch(() => {})
  }

  const rescan = () => scan(pages.slice(0, BATCH), true)
  const scanNext = () => scan(remaining.slice(0, BATCH))
  const scanAll = () => scan(remaining)

  const totalPassed = all.reduce((s, r) => s + r.passed, 0)
  const totalChecks = all.reduce((s, r) => s + r.total, 0)
  const score = pct(totalPassed, totalChecks)
  const issues = all.flatMap((r) => r.issues)
  const critical = issues.filter((i) => i.level === 'critical').length
  const warnings = issues.filter((i) => i.level === 'warning').length
  const infos = issues.filter((i) => i.level === 'info').length
  const pagesPassed = all.filter((r) => r.score >= 90 && !r.issues.some((i) => i.level === 'critical')).length
  const rating = score >= 90 ? 'Excellent' : score >= 75 ? 'Good' : score >= 50 ? 'Needs work' : all.length ? 'Poor' : '—'

  const catAgg = SEO_CATEGORIES.map((name) => {
    let p = 0, t = 0
    for (const r of all) { const c = r.categories[name]; if (c) { p += c.passed; t += c.total } }
    return { name, passed: p, total: t, pct: pct(p, t) }
  })

  const noneFail = (frag: string) => all.length > 0 && all.every((r) => !r.issues.some((i) => i.message.includes(frag)))
  const globalChecks = [
    { label: 'All pages served over HTTPS', ok: all.length > 0 && all.every((r) => r.url.startsWith('https://')) },
    { label: 'Every page has a <title>', ok: noneFail('Missing <title>') },
    { label: 'Every page has a meta description', ok: noneFail('Missing meta description') },
    { label: 'Every page has exactly one <h1>', ok: noneFail('No <h1>') && noneFail('Multiple <h1>') },
    { label: 'Open Graph image on every page', ok: noneFail('Missing og:image') },
    { label: 'Mobile viewport on every page', ok: noneFail('Missing viewport') },
    { label: 'Structured data (JSON-LD) on every page', ok: noneFail('No JSON-LD') },
    { label: 'Canonical link on every page', ok: noneFail('Missing canonical') },
    { label: 'All images have alt text', ok: noneFail('missing alt') },
    { label: 'sitemap.xml is present', ok: pages.length > 1 },
  ]

  const card = { background: C.card, border: `1px solid ${C.border}` }
  const progress = pages.length ? (all.length / pages.length) * 100 : 0
  const initialScanning = scanning && all.length === 0

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.accentBg }}><Shield size={20} style={{ color: C.accent }} /></div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: C.text }}>SEO Health</h1>
            <p className="text-sm" style={{ color: C.muted }}>Comprehensive technical SEO audit for all your pages</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {all.length > 0 && (
            <button onClick={exportCsv} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.muted }}>
              <Download size={15} /> Export CSV
            </button>
          )}
          <button onClick={rescan} disabled={scanning || !pages.length}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-60" style={{ background: C.accent }}>
            {scanning ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />} {scanning ? 'Scanning…' : 'Re-scan'}
          </button>
        </div>
      </div>

      {error && <div className="rounded-xl px-4 py-3 text-sm" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>}

      {initialScanning ? (
        /* ── Initial scan overlay ── */
        <div className="rounded-2xl p-16 flex flex-col items-center justify-center text-center" style={card}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: C.accentBg }}>
            <RefreshCw size={30} style={{ color: C.accent }} className="animate-spin" />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: C.text }}>Scanning Your Site…</h2>
          <p className="text-sm mb-5 max-w-md" style={{ color: C.muted }}>
            Fetching pages from your sitemap and running on-page SEO checks across {SEO_CATEGORIES.length} categories. First batch of {Math.min(BATCH, pages.length)} pages loading…
          </p>
          <div className="w-64 h-2 rounded-full overflow-hidden" style={{ background: C.bg }}>
            <div className="h-full rounded-full animate-pulse" style={{ width: '55%', background: C.accent }} />
          </div>
        </div>
      ) : all.length === 0 ? (
        /* ── Empty state ── */
        <div className="rounded-2xl p-16 text-center" style={card}>
          <Gauge size={40} style={{ color: C.faint }} className="mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-1" style={{ color: C.text }}>No scan yet</h2>
          <p className="text-sm mb-5" style={{ color: C.muted }}>Run a scan to audit your {pages.length} pages.</p>
          <button onClick={rescan} disabled={!pages.length} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: C.accent }}>
            <Play size={15} /> Run scan
          </button>
        </div>
      ) : (
        <>
          {/* Scan bar */}
          <div className="rounded-2xl p-4 flex flex-wrap items-center gap-4" style={card}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold" style={{ color: C.text }}>{all.length} / {pages.length} pages scanned</span>
              {remaining.length > 0 && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#fffbeb', color: '#b45309' }}>{remaining.length} remaining</span>}
              {scanning && <RefreshCw size={14} className="animate-spin" style={{ color: C.accent }} />}
            </div>
            <div className="flex-1 min-w-[120px] h-2 rounded-full overflow-hidden" style={{ background: C.bg }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: C.accent }} />
            </div>
            {scanning ? (
              <button onClick={() => { stopRef.current = true }} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
                <XCircle size={15} /> Stop
              </button>
            ) : remaining.length > 0 ? (
              <>
                <button onClick={scanNext} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: C.accent }}>
                  <Play size={15} /> Scan Next {Math.min(remaining.length, BATCH)}
                </button>
                <button onClick={scanAll} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}>
                  <Zap size={15} /> Scan All ({remaining.length})
                </button>
              </>
            ) : null}
          </div>

          {/* Score */}
          <div className="rounded-2xl p-6 flex flex-wrap items-center gap-6" style={card}>
            <Ring score={score} />
            <div className="flex-1 min-w-[200px]">
              <h2 className="text-2xl font-bold" style={{ color: C.text }}>{rating}</h2>
              <p className="text-sm mt-1" style={{ color: C.muted }}>{all.length} pages scanned · {issues.length} issues found{remaining.length ? ` (${remaining.length} remaining)` : ''}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm font-semibold">
                <span style={{ color: '#ef4444' }}>{critical} Critical</span>
                <span style={{ color: '#f59e0b' }}>{warnings} Warnings</span>
                <span style={{ color: '#3b82f6' }}>{infos} Info</span>
                <span style={{ color: '#22c55e' }}>{pagesPassed} Passed</span>
              </div>
              {lastScan && <p className="text-xs mt-2" style={{ color: C.faint }}>Last scanned: {lastScan}</p>}
            </div>
          </div>

          {/* Count cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: XCircle, label: 'Critical', value: critical, color: '#ef4444' },
              { icon: AlertTriangle, label: 'Warnings', value: warnings, color: '#f59e0b' },
              { icon: Info, label: 'Info', value: infos, color: '#3b82f6' },
              { icon: CheckCircle2, label: 'Pages Passed', value: pagesPassed, color: '#22c55e' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-5" style={card}>
                <s.icon size={20} style={{ color: s.color }} className="mb-2" />
                <p className="text-2xl font-bold" style={{ color: C.text }}>{s.value}</p>
                <p className="text-xs" style={{ color: C.muted }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
            {([['overview', 'Overview'], ['pages', `Pages (${all.length})`], ['global', `Global Checks (${globalChecks.length})`]] as const).map(([k, label]) => (
              <button key={k} onClick={() => setTab(k)} className="flex-1 py-2 rounded-lg text-sm font-medium transition-colors"
                style={tab === k ? { background: C.accentBg, color: C.accent } : { color: C.muted }}>{label}</button>
            ))}
          </div>

          {tab === 'overview' && (
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: C.text }}>Category Breakdown</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catAgg.map((c) => {
                  const Icon = CAT_ICON[c.name] || FileText
                  const col = c.pct >= 90 ? '#22c55e' : c.pct >= 70 ? C.accent : '#f59e0b'
                  return (
                    <div key={c.name} className="rounded-2xl p-5" style={card}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: C.text }}><Icon size={16} style={{ color: C.accent }} /> {c.name}</span>
                        <span className="text-sm font-bold" style={{ color: col }}>{c.pct}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden mb-2" style={{ background: C.bg }}>
                        <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: col }} />
                      </div>
                      <p className="text-xs" style={{ color: C.faint }}>{c.passed}/{c.total} checks passed</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {tab === 'pages' && (
            <div className="rounded-2xl overflow-hidden" style={card}>
              {all.sort((a, b) => a.score - b.score).map((r, i) => (
                <div key={r.url} className="px-5 py-4" style={{ borderTop: i === 0 ? 'none' : `1px solid ${C.border}` }}>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold px-2 py-0.5 rounded-lg shrink-0"
                      style={{ background: r.score >= 90 ? '#dcfce7' : r.score >= 70 ? C.accentBg : '#fef2f2', color: r.score >= 90 ? '#16a34a' : r.score >= 70 ? C.accent : '#dc2626' }}>{r.score}</span>
                    <span className="text-sm font-medium truncate flex-1" style={{ color: C.text }}>{r.path}</span>
                    <span className="text-xs shrink-0" style={{ color: C.faint }}>{r.issues.length} issues</span>
                  </div>
                  {r.issues.length > 0 && (
                    <ul className="mt-2 ml-12 space-y-1">
                      {r.issues.slice(0, 6).map((iss, j) => (
                        <li key={j} className="text-xs flex items-center gap-1.5" style={{ color: C.muted }}>
                          <span style={{ color: iss.level === 'critical' ? '#ef4444' : iss.level === 'warning' ? '#f59e0b' : '#3b82f6' }}>●</span>
                          {iss.message.split(' — ')[0]}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === 'global' && (
            <div className="rounded-2xl overflow-hidden" style={card}>
              {globalChecks.map((g, i) => (
                <div key={g.label} className="flex items-center gap-3 px-5 py-3.5" style={{ borderTop: i === 0 ? 'none' : `1px solid ${C.border}` }}>
                  {g.ok ? <CheckCircle2 size={18} style={{ color: '#22c55e' }} /> : <XCircle size={18} style={{ color: '#ef4444' }} />}
                  <span className="text-sm" style={{ color: C.text }}>{g.label}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
