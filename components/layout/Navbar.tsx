'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [credits, setCredits] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchCredits(session.user.id)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchCredits(session.user.id)
      else setCredits(null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function fetchCredits(userId: string) {
    const { data } = await supabase.from('profiles').select('credits').eq('id', userId).single()
    if (data) setCredits(data.credits)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-fraunces text-xl font-bold">
            <span>🐱</span>
            <span style={{ color: 'var(--text-primary)' }}>Cat</span>
            <span style={{ color: 'var(--accent)' }}>Scanner</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggle}
              className="p-2 rounded-full transition-colors"
              style={{ color: 'var(--text-muted)', background: 'var(--purple-bg)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {user ? (
              <>
                <span
                  className="text-sm font-semibold px-3 py-1 rounded-full"
                  style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
                >
                  🐾 {credits ?? '...'} credits
                </span>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium px-4 py-2 rounded-full transition-colors"
                  style={{ background: 'var(--purple-bg)', color: 'var(--purple)' }}
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium px-4 py-2 rounded-full border transition-colors"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  Login
                </Link>
                <Link
                  href="/#scanner"
                  className="text-sm font-semibold px-4 py-2 rounded-full transition-all glow-orange"
                  style={{ background: 'var(--btn-primary)', color: '#fff' }}
                >
                  Try Free →
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: 'var(--bg-primary)' }}
        >
          <button
            className="absolute top-4 right-4"
            style={{ color: 'var(--text-primary)' }}
            onClick={() => setMobileOpen(false)}
          >
            <X size={28} />
          </button>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="font-fraunces text-3xl font-bold transition-colors"
              style={{ color: 'var(--text-primary)' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 mt-4">
            <button onClick={toggle} className="p-2 rounded-full" style={{ color: 'var(--text-muted)', background: 'var(--purple-bg)' }}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {user ? (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="px-5 py-2 rounded-full font-semibold" style={{ background: 'var(--btn-primary)', color: '#fff' }}>
                Dashboard
              </Link>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)} className="px-5 py-2 rounded-full font-semibold" style={{ background: 'var(--btn-primary)', color: '#fff' }}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
