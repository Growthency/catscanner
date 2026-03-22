'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [displayName, setDisplayName] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{type:'success'|'error', text:string} | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return
      setUser(session.user)
      supabase.from('profiles').select('*').eq('id', session.user.id).single().then(({ data }) => {
        if (data) { setProfile(data); setDisplayName(data.full_name || '') }
      })
    })
  }, [])

  async function saveName(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase.from('profiles').update({ full_name: displayName }).eq('id', user.id)
    setMsg(error ? { type: 'error', text: error.message } : { type: 'success', text: 'Name updated!' })
    setSaving(false)
  }

  async function deleteAccount() {
    if (!confirm('Are you sure? This cannot be undone.')) return
    setDeleting(true)
    await supabase.from('profiles').delete().eq('id', user.id)
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="font-fraunces text-3xl font-bold" style={{color:'var(--text-primary)'}}>Profile</h1>

      {/* Avatar */}
      <div className="rounded-2xl p-6" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white" style={{background:'var(--accent)'}}>
            {initials}
          </div>
          <div>
            <p className="font-semibold" style={{color:'var(--text-primary)'}}>{displayName || 'Cat Lover'}</p>
            <p className="text-sm" style={{color:'var(--text-faint)'}}>{user?.email}</p>
          </div>
        </div>

        <form onSubmit={saveName} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>Display Name</label>
            <input
              type="text" value={displayName} onChange={e=>setDisplayName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
              style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>Email</label>
            <input
              type="email" value={user?.email || ''} readOnly
              className="w-full px-4 py-2.5 rounded-xl text-sm cursor-not-allowed"
              style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-faint)'}}
            />
          </div>
          {msg && <p className="text-sm" style={{color: msg.type==='success' ? '#22c55e' : '#ef4444'}}>{msg.text}</p>}
          <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{background:'var(--btn-primary)'}}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl p-6" style={{background:'var(--bg-card)', border:'1px solid rgba(239,68,68,0.3)'}}>
        <h2 className="font-fraunces text-lg font-bold mb-2" style={{color:'#ef4444'}}>Danger Zone</h2>
        <p className="text-sm mb-4" style={{color:'var(--text-muted)'}}>Permanently delete your account and all data. This cannot be undone.</p>
        <button onClick={deleteAccount} disabled={deleting} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{background:'#ef4444'}}>
          {deleting ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  )
}
