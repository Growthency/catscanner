'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Accepted payment methods shown in the footer. Rendered as styled brand pills
// (no image assets) — Paddle is our Merchant of Record for all checkout.
const PAYMENTS: { label: string; bg: string; fg: string; html: string }[] = [
  { label: 'Visa', bg: '#1A1F71', fg: '#ffffff', html: 'VISA' },
  { label: 'Mastercard', bg: '#1f2937', fg: '#ffffff', html: '<span style="width:13px;height:13px;border-radius:9999px;display:inline-block;background:#EB001B"></span><span style="width:13px;height:13px;border-radius:9999px;display:inline-block;background:#F79E1B;margin-left:-6px"></span>' },
  { label: 'PayPal', bg: '#003087', fg: '#ffffff', html: 'Pay<span style="color:#009CDE">Pal</span>' },
  { label: 'American Express', bg: '#2E77BC', fg: '#ffffff', html: 'AMEX' },
  { label: 'Apple Pay', bg: '#000000', fg: '#ffffff', html: 'Apple&nbsp;Pay' },
  { label: 'Google Pay', bg: '#ffffff', fg: '#3c4043', html: 'G&nbsp;Pay' },
  { label: 'Paddle', bg: '#0070E0', fg: '#ffffff', html: 'Paddle' },
]

export default function Footer() {
  const [s, setS] = useState<Record<string, string>>({})

  useEffect(() => {
    supabase.from('site_settings').select('key,value')
      .in('key', ['footer_brand', 'footer_email', 'footer_copyright', 'footer_disclaimer'])
      .then(({ data }) => { if (data) setS(Object.fromEntries(data.map((r: any) => [r.key, r.value]))) })
  }, [])

  const year = new Date().getFullYear()
  const brand = s.footer_brand || 'AI-powered cat breed identification'
  const email = s.footer_email || 'support@catscanner.org'
  const copyright = s.footer_copyright || 'CatScanner.org · English · For informational purposes only'
  const disclaimer = s.footer_disclaimer || 'CatScanner.org results are for informational purposes only. Always consult a veterinarian for medical advice.'

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-fraunces text-xl font-bold mb-3">
              <span>🐱</span>
              <span style={{ color: 'var(--text-primary)' }}>Cat</span>
              <span style={{ color: 'var(--accent)' }}>Scanner</span>
            </Link>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{brand}</p>
            <p className="text-sm" style={{ color: 'var(--text-faint)' }}>{email}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-faint)' }}>Discord community</p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Features</h4>
            <ul className="space-y-2">
              {['Cat Scanner', 'Breed Profiles', 'Health Insights', 'Care Guides', 'Scan History'].map(item => (
                <li key={item}>
                  <Link href="/#scanner" className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Company</h4>
            <ul className="space-y-2">
              {[{ label: 'About', href: '/about' }, { label: 'Blog', href: '/blog' }, { label: 'Contact', href: '/contact' }, { label: 'Pricing', href: '/pricing' }].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Legal</h4>
            <ul className="space-y-2">
              {[{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Service', href: '/terms' }, { label: 'Refund Policy', href: '/refund' }, { label: 'Contact', href: '/contact' }].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Secure payment + accepted methods (Paddle Merchant of Record) */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} style={{ color: 'var(--accent)' }} /> Secure checkout · Powered by Paddle
          </div>
          <div className="flex items-center flex-wrap gap-2 justify-center">
            <span className="text-xs font-medium mr-0.5" style={{ color: 'var(--text-faint)' }}>We accept</span>
            {PAYMENTS.map(p => (
              <span key={p.label} aria-label={p.label} title={p.label}
                className="inline-flex items-center justify-center px-2.5 rounded-md text-[11px] font-bold leading-none select-none"
                style={{ background: p.bg, color: p.fg, minWidth: 44, height: 24, border: '1px solid rgba(0,0,0,0.08)' }}
                dangerouslySetInnerHTML={{ __html: p.html }} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm" style={{ color: 'var(--text-faint)' }}>© {year} {copyright}</p>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/privacy" className="hover:underline" style={{ color: 'var(--text-faint)' }}>Privacy</Link>
            <span style={{ color: 'var(--text-faint)' }}>·</span>
            <Link href="/terms" className="hover:underline" style={{ color: 'var(--text-faint)' }}>Terms</Link>
            <span style={{ color: 'var(--text-faint)' }}>·</span>
            <Link href="/refund" className="hover:underline" style={{ color: 'var(--text-faint)' }}>Refund</Link>
          </div>
        </div>
      </div>

      {/* Disclaimer bar — very bottom */}
      <div className="py-3 text-center" style={{ background: 'var(--accent-bg)', borderTop: '1px solid var(--border)' }}>
        <p className="text-sm px-4" style={{ color: 'var(--text-muted)' }}>🐾 {disclaimer}</p>
      </div>
    </footer>
  )
}
