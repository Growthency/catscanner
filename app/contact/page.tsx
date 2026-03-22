'use client'
import { useState } from 'react'
import { Mail, Clock, MessageCircle } from 'lucide-react'

const SUBJECTS = ['General Inquiry', 'Bug Report', 'Feature Request', 'Breed Request']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<'success' | 'error' | null>(null)

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setResult(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' })
    } catch {
      setResult('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{background:'var(--bg-primary)', minHeight:'100vh', paddingTop:'80px'}}>
      <section className="py-16 text-center px-4">
        <h1 className="font-fraunces text-5xl font-black mb-4" style={{color:'var(--text-primary)'}}>Get in Touch</h1>
        <p className="text-lg max-w-xl mx-auto" style={{color:'var(--text-muted)'}}>We&apos;d love to hear from you. Send us a message and we&apos;ll respond within 24 hours.</p>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl p-5" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{background:'var(--accent-bg)'}}>
                  <Mail size={16} style={{color:'var(--accent)'}} />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5" style={{color:'var(--text-primary)'}}>Email</p>
                  <p className="text-sm" style={{color:'var(--text-muted)'}}>support@catscanner.org</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{background:'var(--purple-bg)'}}>
                  <Clock size={16} style={{color:'var(--purple)'}} />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5" style={{color:'var(--text-primary)'}}>Response Time</p>
                  <p className="text-sm" style={{color:'var(--text-muted)'}}>Within 24 hours</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-5" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{background:'rgba(88,101,242,0.1)'}}>
                  <MessageCircle size={16} style={{color:'#5865f2'}} />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5" style={{color:'var(--text-primary)'}}>Discord</p>
                  <p className="text-sm" style={{color:'var(--text-muted)'}}>Join our community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 rounded-2xl p-8" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
            {result === 'success' ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🐱</div>
                <h2 className="font-fraunces text-2xl font-bold mb-2" style={{color:'var(--text-primary)'}}>Message Sent!</h2>
                <p style={{color:'var(--text-muted)'}}>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => setResult(null)} className="mt-6 px-5 py-2.5 rounded-full text-sm font-semibold" style={{border:'1px solid var(--border)', color:'var(--text-muted)'}}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>Name</label>
                    <input
                      type="text" value={form.name} onChange={e=>update('name',e.target.value)} required
                      className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
                      style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>Email</label>
                    <input
                      type="email" value={form.email} onChange={e=>update('email',e.target.value)} required
                      className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
                      style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>Subject</label>
                  <select
                    value={form.subject} onChange={e=>update('subject',e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
                    style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
                  >
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{color:'var(--text-muted)'}}>Message</label>
                  <textarea
                    value={form.message} onChange={e=>update('message',e.target.value)} required rows={5}
                    className="w-full px-4 py-2.5 rounded-xl outline-none text-sm resize-none"
                    style={{background:'var(--bg-secondary)', border:'1px solid var(--border)', color:'var(--text-primary)'}}
                    placeholder="Tell us how we can help..."
                  />
                </div>
                {result === 'error' && <p className="text-sm" style={{color:'#ef4444'}}>Something went wrong. Please try again.</p>}
                <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-white glow-orange disabled:opacity-60" style={{background:'var(--btn-primary)'}}>
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
