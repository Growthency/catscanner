'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import { Droplet, Save, Loader2, Check, RotateCcw } from 'lucide-react'

const DEFAULTS: Record<string, string> = { theme_accent: '#f97316', theme_gradient_mid: '#fb923c', theme_gradient_end: '#7c3aed' }
const SWATCHES = [
  { key: 'theme_accent', label: 'Primary accent', sub: 'Brand gradient start · links · highlights' },
  { key: 'theme_gradient_mid', label: 'Gradient middle', sub: 'Brand gradient centre stop' },
  { key: 'theme_gradient_end', label: 'Gradient end', sub: 'Brand gradient end · secondary accents' },
]

export default function ThemeColorsPage() {
  const [v, setV] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function authHeader() {
    const { data: { session } } = await supabase.auth.getSession()
    return { Authorization: `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' }
  }

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/settings', { headers: await authHeader() })
      const data = await res.json()
      if (res.ok) setV(data.settings || {})
      setLoading(false)
    })()
  }, [])

  const col = (k: string) => v[k] || DEFAULTS[k]
  const set = (k: string, val: string) => setV((p) => ({ ...p, [k]: val }))

  async function save(reset = false) {
    setSaving(true); setSaved(false)
    const payload = reset
      ? { theme_accent: '', theme_gradient_mid: '', theme_gradient_end: '' }
      : { theme_accent: col('theme_accent'), theme_gradient_mid: col('theme_gradient_mid'), theme_gradient_end: col('theme_gradient_end') }
    if (reset) setV((p) => ({ ...p, ...payload }))
    const res = await fetch('/api/admin/settings', { method: 'PUT', headers: await authHeader(), body: JSON.stringify({ settings: payload }) })
    setSaving(false)
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2500) }
  }

  const card = { background: C.card, border: `1px solid ${C.border}` }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.accentBg }}><Droplet size={20} style={{ color: C.accent }} /></div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: C.text }}>Theme Colors</h1>
          <p className="text-sm" style={{ color: C.muted }}>Change the brand palette across the whole site — no deploy needed.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20" style={{ color: C.muted }}><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="rounded-2xl p-6 space-y-4" style={card}>
          {SWATCHES.map((sw) => (
            <div key={sw.key} className="flex items-center gap-4">
              <input type="color" value={col(sw.key)} onChange={(e) => set(sw.key, e.target.value)} className="w-14 h-12 rounded-lg cursor-pointer shrink-0" style={{ border: `1px solid ${C.border}`, background: 'transparent' }} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm" style={{ color: C.text }}>{sw.label}</p>
                <p className="text-xs" style={{ color: C.faint }}>{sw.sub}</p>
              </div>
              <input value={col(sw.key)} onChange={(e) => set(sw.key, e.target.value)} className="w-28 px-3 py-2 rounded-lg outline-none text-sm font-mono" style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }} />
            </div>
          ))}

          {/* Preview */}
          <div className="rounded-xl p-4" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
            <p className="text-[11px] font-semibold uppercase tracking-wide mb-2" style={{ color: C.faint }}>Preview</p>
            <div className="h-12 rounded-full mb-3" style={{ background: `linear-gradient(90deg, ${col('theme_accent')}, ${col('theme_gradient_mid')}, ${col('theme_gradient_end')})` }} />
            <div className="flex flex-wrap gap-2">
              {SWATCHES.map((sw) => (
                <span key={sw.key} className="text-xs font-semibold text-white px-2.5 py-1 rounded-full font-mono" style={{ background: col(sw.key) }}>{col(sw.key)}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => save(false)} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: saved ? '#16a34a' : C.accent }}>
              {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : <Save size={15} />} {saved ? 'Saved!' : 'Save Changes'}
            </button>
            <button onClick={() => save(true)} disabled={saving} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.muted }}>
              <RotateCcw size={15} /> Reset to default
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
