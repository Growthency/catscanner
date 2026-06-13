'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import {
  LayoutDashboard, FileText, Home, Trophy, ShieldCheck, Globe,
  CreditCard, Code, ExternalLink, Menu, PanelBottom, Palette, FileCode, LogOut,
} from 'lucide-react'

const MENU = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: FileText, label: 'Pages', href: '/admin/pages' },
  { icon: Home, label: 'Homepage', href: '/admin/homepage' },
  { icon: Trophy, label: 'Rank Tracker', href: '/admin/rank-tracker' },
  { icon: ShieldCheck, label: 'SEO Health', href: '/admin/seo-health' },
  { icon: Globe, label: 'Indexing Report', href: '/admin/indexing-report' },
  { icon: CreditCard, label: 'Subscriptions', href: '/admin/subscriptions' },
  { icon: Code, label: 'Header Scripts', href: '/admin/header-scripts' },
  { icon: ExternalLink, label: 'External Links', href: '/admin/external-links' },
  { icon: Menu, label: 'Menus', href: '/admin/menus' },
  { icon: PanelBottom, label: 'Footer Content', href: '/admin/footer-content' },
  { icon: Palette, label: 'Theme Colors', href: '/admin/theme-colors' },
  { icon: FileCode, label: 'Custom CSS', href: '/admin/custom-css' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.replace('/login'); return }
      // Optional allow-list: set NEXT_PUBLIC_ADMIN_EMAILS to lock /admin to specific accounts.
      const allow = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
        .split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
      const email = (session.user.email || '').toLowerCase()
      if (allow.length > 0 && !allow.includes(email)) { router.replace('/dashboard'); return }
      setReady(true)
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: C.bg }}>
        <div className="text-3xl animate-pulse">🐱</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex" style={{ background: C.bg }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 fixed top-0 bottom-0 overflow-y-auto" style={{ background: C.sidebar, borderRight: `1px solid ${C.border}` }}>
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 h-16 shrink-0" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ background: C.accent }}>M</div>
          <span className="font-bold text-lg" style={{ color: C.text }}>Admin</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: C.accentSoft, color: C.accent }}>PRO</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider px-3 py-2" style={{ color: C.faint }}>Menu</p>
          {MENU.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-colors"
                style={{
                  background: active ? C.accentBg : 'transparent',
                  color: active ? C.accent : C.muted,
                }}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 shrink-0" style={{ borderTop: `1px solid ${C.border}` }}>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors" style={{ color: C.muted }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 z-40 flex items-center gap-2 px-4" style={{ background: C.sidebar, borderBottom: `1px solid ${C.border}` }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-xs" style={{ background: C.accent }}>M</div>
        <span className="font-bold" style={{ color: C.text }}>Admin</span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: C.accentSoft, color: C.accent }}>PRO</span>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-60 p-5 sm:p-7 pt-20 md:pt-7 overflow-auto">
        {children}
      </main>
    </div>
  )
}
