import Link from 'next/link'

export default function Footer() {
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
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>AI-powered cat breed identification</p>
            <p className="text-sm" style={{ color: 'var(--text-faint)' }}>support@catscanner.org</p>
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
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'].map(item => (
                <li key={item}>
                  <span className="text-sm cursor-pointer transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-faint)' }}>© 2026 CatScanner.org · English · For informational purposes only</p>
        </div>
      </div>

      {/* Disclaimer bar — very bottom */}
      <div className="py-3 text-center" style={{ background: 'var(--accent-bg)', borderTop: '1px solid var(--border)' }}>
        <p className="text-sm px-4" style={{ color: 'var(--text-muted)' }}>
          🐾 CatScanner.org results are for informational purposes only. Always consult a veterinarian for medical advice.
        </p>
      </div>
    </footer>
  )
}
