'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import { Code2, Plus, Trash2, Loader2, Power } from 'lucide-react'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

type Script = { id: string; name: string; code: string; enabled: boolean }

export default function HeaderScriptsPage() {
  const [scripts, setScripts] = useState<Script[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  async function authHeader() {
    const { data: { session } } = await supabase.auth.getSession()
    return { Authorization: `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' }
  }

  async function load() {
    const res = await fetch('/api/admin/header-scripts', { headers: await authHeader() })
    const data = await res.json()
    if (res.ok) setScripts(data.scripts || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function add() {
    if (!name.trim() || !code.trim() || saving) return
    setSaving(true)
    await fetch('/api/admin/header-scripts', { method: 'POST', headers: await authHeader(), body: JSON.stringify({ name, code }) })
    setName(''); setCode(''); setAdding(false); setSaving(false)
    load()
  }

  async function toggle(s: Script) {
    await fetch('/api/admin/header-scripts', { method: 'PUT', headers: await authHeader(), body: JSON.stringify({ id: s.id, enabled: !s.enabled }) })
    setScripts((list) => list.map((x) => x.id === s.id ? { ...x, enabled: !x.enabled } : x))
  }

  async function doRemove(id: string) {
    await fetch(`/api/admin/header-scripts?id=${id}`, { method: 'DELETE', headers: await authHeader() })
    setScripts((list) => list.filter((x) => x.id !== id))
  }

  const card = { background: C.card, border: `1px solid ${C.border}` }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.accentBg }}><Code2 size={20} style={{ color: C.accent }} /></div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: C.text }}>Header Scripts</h1>
            <p className="text-sm" style={{ color: C.muted }}>Analytics, pixels and verification tags — injected on every page.</p>
          </div>
        </div>
        <button onClick={() => setAdding((a) => !a)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white shrink-0" style={{ background: C.accent }}>
          <Plus size={16} /> Add Script
        </button>
      </div>

      {adding && (
        <div className="rounded-2xl p-5 mb-5 space-y-3" style={card}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Script name (e.g. Facebook Pixel)"
            className="w-full px-4 py-2.5 rounded-lg outline-none text-sm" style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }} />
          <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Paste the full <script>…</script> or <meta> tag here" rows={6} spellCheck={false}
            className="w-full px-4 py-3 rounded-lg outline-none text-xs font-mono" style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text, resize: 'vertical' }} />
          <div className="flex gap-2">
            <button onClick={add} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: C.accent }}>
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Save Script
            </button>
            <button onClick={() => setAdding(false)} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.muted }}>Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16" style={{ color: C.muted }}><Loader2 className="animate-spin" /></div>
      ) : scripts.length === 0 ? (
        <div className="rounded-2xl p-12 text-center text-sm" style={{ ...card, color: C.muted }}>No scripts yet — add your first tracking tag.</div>
      ) : (
        <div className="space-y-3">
          {scripts.map((s) => (
            <div key={s.id} className="rounded-2xl p-4 flex items-center gap-3" style={card}>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold" style={{ color: C.text }}>{s.name}</p>
                <p className="text-xs font-mono truncate" style={{ color: C.faint }}>{s.code.replace(/\s+/g, ' ').slice(0, 80)}…</p>
              </div>
              <button onClick={() => toggle(s)} className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={s.enabled ? { background: '#dcfce7', color: '#16a34a' } : { background: '#f1f5f9', color: C.faint }}>
                <Power size={12} /> {s.enabled ? 'On' : 'Off'}
              </button>
              <button onClick={() => setConfirmId(s.id)} className="p-2 rounded-lg" style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      )}
      <ConfirmDialog open={!!confirmId} title="Delete script?" message="This removes the header script from every page. This cannot be undone." confirmLabel="Delete script" onConfirm={() => { if (confirmId) doRemove(confirmId); setConfirmId(null) }} onCancel={() => setConfirmId(null)} />
    </div>
  )
}
