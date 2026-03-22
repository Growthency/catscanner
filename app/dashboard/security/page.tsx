'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SecurityPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{type:'success'|'error', text:string} | null>(null)

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setMsg({ type: 'error', text: 'Passwords do not match' }); return }
    if (password.length < 6) { setMsg({ type: 'error', text: 'Password must be at least 6 characters' }); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setMsg(error ? { type: 'error', text: error.message } : { type: 'success', text: 'Password updated successfully!' })
    setLoading(false)
    if (!error) { setPassword(''); setConfirm('') }
  }

  async function signOutAll() {
    await supabase.auth.signOut({ scope: 'global' })
    window.location.href = '/login'
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="font-fraunces text-3xl font-bold" style={{color:'var(--text-primary)'}}>Security</h1>

      <div className="rounded-2xl p-6" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
        <h2 className="font-fraunces text-xl font-bold mb-4" style={{color:'var(--text-primary)'}}>Change Password</h2>
        <form onSubmit={changePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>New Password</label>
            <input
              type="password" value={password} onChange={e=>setPassword(e.target.value)} required
              className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
              style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
              placeholder="Min. 6 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>Confirm New Password</label>
            <input
              type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required
              className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
              style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
              placeholder="Repeat password"
            />
          </div>
          {msg && <p className="text-sm" style={{color: msg.type==='success' ? '#22c55e' : '#ef4444'}}>{msg.text}</p>}
          <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{background:'var(--btn-primary)'}}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      <div className="rounded-2xl p-6" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
        <h2 className="font-fraunces text-xl font-bold mb-2" style={{color:'var(--text-primary)'}}>Sessions</h2>
        <p className="text-sm mb-4" style={{color:'var(--text-muted)'}}>Sign out from all devices, including this one.</p>
        <button onClick={signOutAll} className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{border:'1px solid rgba(239,68,68,0.4)', color:'#ef4444'}}>
          Sign Out All Devices
        </button>
      </div>
    </div>
  )
}
