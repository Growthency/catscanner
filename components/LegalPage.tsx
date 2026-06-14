import Link from 'next/link'
import { ChevronRight, ShieldCheck } from 'lucide-react'

export type LegalSection = { h: string; p?: string[]; ul?: string[] }

export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '84px' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="flex items-center gap-1.5 text-xs mb-5" style={{ color: 'var(--text-faint)' }}>
          <Link href="/" className="hover:opacity-70">Home</Link><ChevronRight size={12} />
          <span style={{ color: 'var(--accent)' }}>{title}</span>
        </nav>

        <h1 className="font-fraunces font-black mb-2" style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: 'var(--text-primary)' }}>{title}</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-faint)' }}>Last updated: {updated}</p>

        {intro && <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>{intro}</p>}

        <div className="space-y-8">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-fraunces text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{s.h}</h2>
              {s.p?.map((para, j) => <p key={j} className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>{para}</p>)}
              {s.ul && (
                <ul className="space-y-2 mb-3">
                  {s.ul.map((li, j) => (
                    <li key={j} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--accent)' }}>•</span><span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl p-5 flex items-start gap-3" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <ShieldCheck size={20} style={{ color: 'var(--accent)' }} className="shrink-0 mt-0.5" />
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Questions about this policy? Email <a href="mailto:support@catscanner.org" style={{ color: 'var(--accent)' }}>support@catscanner.org</a> and we&apos;ll respond within 48 hours.
          </p>
        </div>
      </div>
    </div>
  )
}
