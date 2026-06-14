'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import { Save, Loader2, Check } from 'lucide-react'

export type SettingField = { key: string; label: string; hint?: string; type?: 'text' | 'textarea' | 'email' | 'code'; placeholder?: string }

// Generic site_settings editor used by Footer Content, Custom CSS, etc.
export default function SettingsForm({ title, subtitle, icon: Icon, fields }: { title: string; subtitle: string; icon: any; fields: SettingField[] }) {
  const [values, setValues] = useState<Record<string, string>>({})
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
      if (res.ok) setValues(data.settings || {})
      setLoading(false)
    })()
  }, [])

  async function save() {
    setSaving(true); setSaved(false)
    const picked: Record<string, string> = {}
    for (const f of fields) picked[f.key] = values[f.key] || ''
    const res = await fetch('/api/admin/settings', { method: 'PUT', headers: await authHeader(), body: JSON.stringify({ settings: picked }) })
    setSaving(false)
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2500) }
  }

  const set = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }))
  const input = { background: C.bg, border: `1px solid ${C.border}`, color: C.text }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.accentBg }}><Icon size={20} style={{ color: C.accent }} /></div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: C.text }}>{title}</h1>
          <p className="text-sm" style={{ color: C.muted }}>{subtitle}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20" style={{ color: C.muted }}><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="rounded-2xl p-6 space-y-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: C.muted }}>{f.label}</label>
              {f.type === 'textarea' || f.type === 'code' ? (
                <textarea value={values[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} rows={f.type === 'code' ? 14 : 3} placeholder={f.placeholder} spellCheck={f.type !== 'code'}
                  className={`w-full px-4 py-2.5 rounded-lg outline-none text-sm ${f.type === 'code' ? 'font-mono text-xs' : ''}`} style={{ ...input, resize: 'vertical' }} />
              ) : (
                <input type={f.type === 'email' ? 'email' : 'text'} value={values[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} placeholder={f.placeholder}
                  className="w-full px-4 py-2.5 rounded-lg outline-none text-sm" style={input} />
              )}
              {f.hint && <p className="text-xs mt-1" style={{ color: C.faint }}>{f.hint}</p>}
            </div>
          ))}
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: saved ? '#16a34a' : C.accent }}>
            {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : <Save size={15} />} {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  )
}
