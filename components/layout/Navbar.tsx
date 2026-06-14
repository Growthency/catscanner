'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Sun, Moon, Menu, X, LayoutDashboard, User, Crown, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
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
    const { data } = await supabase.from('profiles').select('credits, full_name, avatar_url').eq('id', userId).single()
    if (data) { setCredits(data.credits); setProfile(data) }
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        background: scrolled ? 'var(--bg-nav)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px var(--shadow)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? '61px' : '68px',
            transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-fraunces text-xl font-bold">
            <span>🐱</span>
            <span style={{ color: 'var(--text-primary)' }}>Cat</span>
            <span style={{ color: 'var(--accent)' }}>Scanner</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: 'relative',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: active ? 600 : 500,
                    color: active ? 'var(--accent)' : 'var(--text-muted)',
                    background: active ? 'var(--accent-bg)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '16px',
                        height: '2px',
                        borderRadius: '2px',
                        background: 'var(--accent)',
                      }}
                    />
                  )}
                </Link>
              )
            })}
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
                <Link href="/pricing" className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>
                  🐾 {credits ?? '...'} credits
                </Link>
                <div className="relative">
                  <button onClick={() => setMenuOpen((o) => !o)} className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden font-bold text-white text-sm" style={{ background: 'var(--accent)', border: '2px solid var(--border)' }} aria-label="Account menu">
                    {profile?.avatar_url ? <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" /> : (profile?.full_name || user.email || '?').charAt(0).toUpperCase()}
                  </button>
                  {menuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden z-50 py-1" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: '0 10px 40px var(--shadow-lg)' }}>
                        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                          <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{profile?.full_name || 'Cat Lover'}</p>
                          <p className="text-xs truncate" style={{ color: 'var(--text-faint)' }}>{user.email}</p>
                        </div>
                        <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:opacity-80" style={{ color: 'var(--text-muted)' }}><LayoutDashboard size={16} /> Dashboard</Link>
                        <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:opacity-80" style={{ color: 'var(--text-muted)' }}><User size={16} /> Profile</Link>
                        <Link href="/pricing" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold hover:opacity-80" style={{ color: 'var(--accent)' }}><Crown size={16} /> Upgrade</Link>
                        <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/' }} className="flex items-center gap-2.5 px-4 py-2.5 text-sm w-full text-left" style={{ color: '#ef4444', borderTop: '1px solid var(--border)' }}><LogOut size={16} /> Sign out</button>
                      </div>
                    </>
                  )}
                </div>
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
          {navLinks.map(link => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className="font-fraunces text-3xl font-bold transition-colors"
                style={{ color: active ? 'var(--accent)' : 'var(--text-primary)' }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
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
