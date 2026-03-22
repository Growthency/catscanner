'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const PACKS = [
  {
    id: 'starter',
    name: 'Starter Pack',
    price: '$4.99',
    credits: 120,
    scans: 12,
    badge: '20% more than competitors',
    popular: false,
    features: ['Full breed identification', 'Personality & temperament profile', 'Health & care tips', 'Similar breed comparisons', 'Credits never expire'],
  },
  {
    id: 'explorer',
    name: 'Explorer Pack',
    price: '$9.99',
    credits: 550,
    scans: 55,
    badge: '10% more than competitors',
    popular: true,
    features: ['Everything in Starter', 'Detailed health insights', 'Download PDF breed reports', 'Full scan history & journal', 'Credits never expire'],
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    price: '$19.99',
    credits: 1200,
    scans: 120,
    badge: 'Best value per scan',
    popular: false,
    features: ['Everything in Explorer', 'Export data as CSV', 'Priority AI model', 'Priority customer support', 'Credits never expire'],
  },
]

const FAQS = [
  { q: 'Do credits expire?', a: 'Never. Use them whenever you want. Credits are yours forever.' },
  { q: 'What if the AI fails to identify?', a: 'Full credit refund, automatically. No questions asked.' },
  { q: 'Can I get a refund?', a: 'Yes, within 7 days if credits are unused. Contact support@catscanner.org.' },
  { q: 'Is there a free tier?', a: 'Yes! 3 free scans per day per device, no signup required.' },
  { q: 'Can I buy multiple packs?', a: 'Yes, credits stack on your account. Buy as many packs as you like.' },
]

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  async function handleBuy(packId: string) {
    setLoading(packId)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId, userId: session?.user?.id || null }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      alert('Failed to start checkout. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{background:'var(--bg-primary)', minHeight:'100vh', paddingTop:'80px'}}>
      {/* Hero */}
      <section className="py-16 text-center px-4">
        <h1 className="font-fraunces text-5xl font-black mb-4" style={{color:'var(--text-primary)'}}>
          More Scans. Better Value.
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{color:'var(--text-muted)'}}>
          Credit packs that give you 10–20% more than the competition. Pay once, yours forever.
        </p>
      </section>

      {/* Pricing cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKS.map(pack => (
            <div
              key={pack.id}
              className={`relative rounded-2xl p-6 flex flex-col card-lift card-glow ${pack.popular ? 'glow-orange' : ''}`}
              style={{
                background: pack.popular ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                border: `1px solid ${pack.popular ? 'var(--accent)' : 'var(--border)'}`,
              }}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold text-white" style={{background:'var(--accent)'}}>
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h2 className="font-fraunces text-2xl font-bold mb-1" style={{color:'var(--text-primary)'}}>{pack.name}</h2>
                <p className="text-sm mb-3" style={{color:'var(--accent)'}}>{pack.badge}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="font-fraunces text-4xl font-black" style={{color:'var(--text-primary)'}}>{pack.price}</span>
                  <span className="text-sm mb-1" style={{color:'var(--text-faint)'}}>one-time</span>
                </div>
                <p style={{color:'var(--text-muted)'}}>{pack.credits} credits = <strong style={{color:'var(--text-primary)'}}>{pack.scans} cat scans</strong></p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {pack.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm" style={{color:'var(--text-muted)'}}>
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{color:'var(--accent)'}} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBuy(pack.id)}
                disabled={loading === pack.id}
                className="w-full py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-60"
                style={{background: pack.popular ? 'var(--btn-primary)' : 'var(--bg-secondary)', color: pack.popular ? '#fff' : 'var(--text-primary)', border: pack.popular ? 'none' : '1px solid var(--border)'}}
              >
                {loading === pack.id ? 'Redirecting...' : `Buy ${pack.name}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How Credits Work */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pb-16">
        <h2 className="font-fraunces text-3xl font-bold text-center mb-8" style={{color:'var(--text-primary)'}}>How Credits Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '🔍', text: '1 cat scan = 10 credits deducted' },
            { icon: '♾️', text: 'Credits never expire — use anytime' },
            { icon: '🔄', text: 'Failed scan = full credit refund automatically' },
            { icon: '🆓', text: 'Start free: 3 scans/day, no signup needed' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm" style={{color:'var(--text-muted)'}}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pb-16">
        <h2 className="font-fraunces text-3xl font-bold text-center mb-8" style={{color:'var(--text-primary)'}}>Value Comparison</h2>
        <div className="rounded-2xl overflow-hidden" style={{border:'1px solid var(--border)'}}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{background:'var(--bg-card)'}}>
                {['', 'Competitor', 'Starter', 'Explorer', 'Pro'].map((h, i) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold" style={{color: i > 1 ? 'var(--accent)' : 'var(--text-faint)', borderBottom:'1px solid var(--border)'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Price', '$4.99', '$4.99', '$9.99', '$19.99'],
                ['Scans', '10', '12 ✓', '55 ✓', '120 ✓'],
                ['Per scan cost', '$0.50', '$0.42 ✓', '$0.18 ✓', '$0.17 ✓'],
                ['Expiry', '12 months', 'Never ✓', 'Never ✓', 'Never ✓'],
              ].map(row => (
                <tr key={row[0]} style={{borderBottom:'1px solid var(--border)', background:'var(--bg-secondary)'}}>
                  <td className="px-4 py-3 font-medium" style={{color:'var(--text-muted)'}}>{row[0]}</td>
                  <td className="px-4 py-3" style={{color:'var(--text-faint)'}}>{row[1]}</td>
                  {row.slice(2).map((v, i) => (
                    <td key={i} className="px-4 py-3 font-semibold" style={{color: v.includes('✓') ? 'var(--accent)' : 'var(--text-primary)'}}>
                      {v.replace(' ✓', '')} {v.includes('✓') && <span style={{color:'var(--accent)'}}>✓</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto pb-20">
        <h2 className="font-fraunces text-3xl font-bold text-center mb-8" style={{color:'var(--text-primary)'}}>Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-sm" style={{color:'var(--text-primary)'}}>{faq.q}</span>
                {openFaq === i ? <ChevronUp size={16} style={{color:'var(--accent)'}} /> : <ChevronDown size={16} style={{color:'var(--text-faint)'}} />}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm" style={{color:'var(--text-muted)'}}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
