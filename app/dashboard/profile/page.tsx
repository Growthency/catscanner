'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Camera, Loader2 } from 'lucide-react'

// Crop to a square and convert any image to a 256px WebP avatar.
async function toAvatarWebp(file: File): Promise<Blob> {
  const img = document.createElement('img')
  const url = URL.createObjectURL(file)
  try {
    await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = () => rej(new Error('bad image')); img.src = url })
    const S = 256
    const canvas = document.createElement('canvas')
    canvas.width = S; canvas.height = S
    const ctx = canvas.getContext('2d')!
    const min = Math.min(img.width, img.height)
    ctx.drawImage(img, (img.width - min) / 2, (img.height - min) / 2, min, min, 0, 0, S, S)
    return await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), 'image/webp', 0.85))
  } finally { URL.revokeObjectURL(url) }
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [displayName, setDisplayName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [deleting, setDeleting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return
      setUser(session.user)
      supabase.from('profiles').select('*').eq('id', session.user.id).single().then(({ data }) => {
        if (data) { setDisplayName(data.full_name || ''); setAvatarUrl(data.avatar_url || '') }
      })
    })
  }, [])

  async function saveName(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setSaving(true); setMsg(null)
    // upsert so it works even if the profile row was never created at signup
    const { error } = await supabase.from('profiles').upsert({ id: user.id, email: user.email, full_name: displayName }, { onConflict: 'id' })
    setMsg(error ? { type: 'error', text: error.message } : { type: 'success', text: 'Saved!' })
    setSaving(false)
  }

  async function handleAvatar(file: File) {
    if (!user) return
    setUploading(true); setMsg(null)
    try {
      const webp = await toAvatarWebp(file)
      const { data: { session } } = await supabase.auth.getSession()
      const fd = new FormData()
      fd.append('file', webp, 'avatar.webp')
      const res = await fetch('/api/upload-avatar', { method: 'POST', headers: { Authorization: `Bearer ${session?.access_token}` }, body: fd })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed')
      setAvatarUrl(data.url)
      await supabase.from('profiles').upsert({ id: user.id, email: user.email, avatar_url: data.url }, { onConflict: 'id' })
    } catch (e: any) {
      setMsg({ type: 'error', text: e.message || 'Avatar upload failed' })
    }
    setUploading(false)
  }

  async function deleteAccount() {
    if (!confirm('Are you sure? This cannot be undone.')) return
    setDeleting(true)
    await supabase.from('profiles').delete().eq('id', user.id)
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const initials = (displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)) || '?'

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="font-fraunces text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Profile</h1>

      <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-4 mb-6">
          <button type="button" onClick={() => fileRef.current?.click()} title="Change avatar"
            className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center font-bold text-xl text-white group shrink-0" style={{ background: 'var(--accent)' }}>
            {avatarUrl ? <img src={avatarUrl} alt="" className="w-full h-full object-cover" /> : initials}
            <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              {uploading ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
            </span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleAvatar(f); e.target.value = '' }} />
          <div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{displayName || 'Cat Lover'}</p>
            <p className="text-sm" style={{ color: 'var(--text-faint)' }}>{user?.email}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>Tap the avatar to upload a photo</p>
          </div>
        </div>

        <form onSubmit={saveName} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Display Name</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl outline-none text-sm" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Email</label>
            <input type="email" value={user?.email || ''} readOnly
              className="w-full px-4 py-2.5 rounded-xl text-sm cursor-not-allowed" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-faint)' }} />
          </div>
          {msg && <p className="text-sm" style={{ color: msg.type === 'success' ? '#22c55e' : '#ef4444' }}>{msg.text}</p>}
          <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--btn-primary)' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid rgba(239,68,68,0.3)' }}>
        <h2 className="font-fraunces text-lg font-bold mb-2" style={{ color: '#ef4444' }}>Danger Zone</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Permanently delete your account and all data. This cannot be undone.</p>
        <button onClick={deleteAccount} disabled={deleting} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#ef4444' }}>
          {deleting ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  )
}
