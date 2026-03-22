'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true); setError(null)

    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
    if (error) { setError(error.message); setLoading(false); return }

    if (data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, email, full_name: fullName, credits: 0 })
      router.push('/dashboard')
    }
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/dashboard` } })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16" style={{background:'var(--bg-primary)'}}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl">🐱</Link>
          <h1 className="font-fraunces text-3xl font-bold mt-3" style={{color:'var(--text-primary)'}}>Create Account</h1>
          <p className="mt-2 text-sm" style={{color:'var(--text-muted)'}}>Start scanning cats for free</p>
        </div>

        <div className="rounded-2xl p-8" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
          <button
            onClick={handleGoogle}
            className="w-full py-3 rounded-xl flex items-center justify-center gap-3 font-semibold transition-all mb-6"
            style={{border:'1px solid var(--border)', color:'var(--text-primary)', background:'var(--bg-secondary)'}}
          >
            <span>G</span> Continue with Google
          </button>

          <div className="relative flex items-center mb-6">
            <div className="flex-1 h-px" style={{background:'var(--border)'}} />
            <span className="px-3 text-xs" style={{color:'var(--text-faint)'}}>or</span>
            <div className="flex-1 h-px" style={{background:'var(--border)'}} />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>Full Name</label>
              <input
                type="text" value={fullName} onChange={e=>setFullName(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
                style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>Email</label>
              <input
                type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
                style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>Password</label>
              <input
                type="password" value={password} onChange={e=>setPassword(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
                style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
                placeholder="Min. 6 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>Confirm Password</label>
              <input
                type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
                style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
                placeholder="Repeat password"
              />
            </div>

            {error && <p className="text-sm p-3 rounded-xl" style={{background:'rgba(239,68,68,0.1)', color:'#ef4444'}}>{error}</p>}

            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-white transition-all glow-orange disabled:opacity-60" style={{background:'var(--btn-primary)'}}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{color:'var(--text-faint)'}}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold" style={{color:'var(--accent)'}}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
