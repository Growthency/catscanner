'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(null)
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/dashboard` })
    if (error) { setError(error.message) } else { setSent(true) }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16" style={{background:'var(--bg-primary)'}}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl">🐱</Link>
          <h1 className="font-fraunces text-3xl font-bold mt-3" style={{color:'var(--text-primary)'}}>Reset Password</h1>
          <p className="mt-2 text-sm" style={{color:'var(--text-muted)'}}>We&apos;ll send you a reset link</p>
        </div>
        <div className="rounded-2xl p-8" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="font-fraunces text-xl font-bold mb-2" style={{color:'var(--text-primary)'}}>Check your email</h2>
              <p className="text-sm" style={{color:'var(--text-muted)'}}>We sent a password reset link to <strong>{email}</strong></p>
              <Link href="/login" className="inline-block mt-6 text-sm font-semibold" style={{color:'var(--accent)'}}>← Back to login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>Email address</label>
                <input
                  type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                  className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
                  style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
                  placeholder="you@example.com"
                />
              </div>
              {error && <p className="text-sm p-3 rounded-xl" style={{background:'rgba(239,68,68,0.1)', color:'#ef4444'}}>{error}</p>}
              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-white glow-orange disabled:opacity-60" style={{background:'var(--btn-primary)'}}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <p className="text-center text-sm" style={{color:'var(--text-faint)'}}>
                <Link href="/login" className="font-semibold" style={{color:'var(--accent)'}}>← Back to login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
