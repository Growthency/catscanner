'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import { ExternalLink, Plus, Trash2, Loader2 } from 'lucide-react'

type Rule = { id: string; domain: string; nofollow: boolean; sponsored: boolean }

export default function ExternalLinksPage() {
  const [rules, setRules] = useState<Rule[]>([])
  const [loading, setLoading] = useState(true)
  const [domain, setDomain] = useState('')
  const [nofollow, setNofollow] = useState(true)
  const [sponsored, setSponsored] = useState(false)
  const [saving, setSaving] = useState(false)

  async function authHeader() {
    const { data: { session } } = await supabase.auth.getSession()
    return { Authorization: `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' }
  }

  async function load() {
    const res = await fetch('/api/admin/external-links', { headers: await authHeader() })
    const data = await res.json()
    if (res.ok) setRules(data.rules || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function add() {
    if (!domain.trim() || saving) return
    setSaving(true)
    await fetch('/api/admin/external-links', { method: 'POST', headers: await authHeader(), body: JSON.stringify({ domain, nofollow, sponsored }) })
    setDomain(''); setNofollow(true); setSponsored(false); setSaving(false)
    load()
  }

  async function remove(id: string) {
    await fetch(`/api/admin/external-links?id=${id}`, { method: 'DELETE', headers: await authHeader() })
    setRules((list) => list.filter((x) => x.id !== id))
  }

  const card = { background: C.card, border: `1px solid ${C.border}` }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.accentBg }}><ExternalLink size={20} style={{ color: C.accent }} /></div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: C.text }}>External Links</h1>
          <p className="text-sm" style={{ color: C.muted }}>Per-domain rel rules — outbound links in articles get nofollow / sponsored automatically.</p>
        </div>
      </div>

      {/* Add rule */}
      <div className="rounded-2xl p-4 mb-5 flex flex-wrap items-center gap-3" style={card}>
        <input value={domain} onChange={(e) => setDomain(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder="domain.com"
          className="flex-1 min-w-[160px] px-4 py-2.5 rounded-lg outline-none text-sm" style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }} />
        <label className="flex items-center gap-1.5 text-sm cursor-pointer" style={{ color: C.text }}>
          <input type="checkbox" checked={nofollow} onChange={(e) => setNofollow(e.target.checked)} /> nofollow
        </label>
        <label className="flex items-center gap-1.5 text-sm cursor-pointer" style={{ color: C.text }}>
          <input type="checkbox" checked={sponsored} onChange={(e) => setSponsored(e.target.checked)} /> sponsored
        </label>
        <button onClick={add} disabled={saving || !domain.trim()} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: C.accent }}>
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add Rule
        </button>
      </div>

      {/* Rules list */}
      {loading ? (
        <div className="flex items-center justify-center py-12" style={{ color: C.muted }}><Loader2 className="animate-spin" /></div>
      ) : rules.length === 0 ? (
        <div className="rounded-2xl p-10 text-center text-sm" style={{ ...card, color: C.muted }}>
          No rules yet. All outbound article links keep their default <code>rel=&quot;noopener&quot;</code>.
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={card}>
          {rules.map((r, i) => (
            <div key={r.id} className="flex items-center gap-3 px-4 py-3.5" style={{ borderTop: i === 0 ? 'none' : `1px solid ${C.border}` }}>
              <span className="font-medium text-sm flex-1" style={{ color: C.text }}>{r.domain}</span>
              {r.nofollow && <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: C.accentBg, color: C.accent }}>nofollow</span>}
              {r.sponsored && <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: '#ede9fe', color: '#7c3aed' }}>sponsored</span>}
              <button onClick={() => remove(r.id)} className="p-2 rounded-lg" style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
