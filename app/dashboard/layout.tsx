'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { LayoutDashboard, Plus, History, BookOpen, User, CreditCard, Shield, BookMarked, HelpCircle, LogOut } from 'lucide-react'

const sidebarItems = {
  main: [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Plus, label: 'New Scan', href: '/#scanner' },
    { icon: History, label: 'Scan History', href: '/dashboard/history' },
    { icon: BookOpen, label: 'Cat Journal', href: '/dashboard/journal' },
  ],
  account: [
    { icon: User, label: 'Profile', href: '/dashboard/profile' },
    { icon: CreditCard, label: 'Credits & Billing', href: '/dashboard/credits' },
    { icon: Shield, label: 'Security', href: '/dashboard/security' },
  ],
  support: [
    { icon: BookMarked, label: 'Breed Guide', href: '/blog' },
    { icon: HelpCircle, label: 'Help & FAQ', href: '/contact' },
  ],
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const titles: Record<string, string> = {
      '/dashboard': 'Dashboard | CatScanner',
      '/dashboard/history': 'Scan History | CatScanner',
      '/dashboard/journal': 'Cat Journal | CatScanner',
      '/dashboard/profile': 'Profile | CatScanner',
      '/dashboard/credits': 'Credits & Billing | CatScanner',
      '/dashboard/security': 'Security | CatScanner',
    }
    document.title = titles[pathname] ?? 'Dashboard | CatScanner'
  }, [pathname])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/login'); return }
      setUser(session.user)
      fetchProfile(session.user.id)
    })
  }, [])

  async function fetchProfile(userId: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data)
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background:'var(--bg-primary)'}}>
        <div className="text-4xl animate-pulse">🐱</div>
      </div>
    )
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Cat Lover'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  function SidebarLink({ icon: Icon, label, href }: { icon: any; label: string; href: string }) {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
        style={{
          background: isActive ? 'var(--accent-bg)' : 'transparent',
          color: isActive ? 'var(--accent)' : 'var(--text-muted)',
        }}
      >
        <Icon size={16} />
        {label}
      </Link>
    )
  }

  return (
    <div className="min-h-screen flex pt-16" style={{background:'var(--bg-primary)'}}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 fixed top-16 bottom-0 overflow-y-auto" style={{background:'var(--bg-secondary)', borderRight:'1px solid var(--border)'}}>
        <nav className="flex-1 p-3 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2" style={{color:'var(--text-faint)'}}>Main</p>
          {sidebarItems.main.map(item => <SidebarLink key={item.href} {...item} />)}

          <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-4" style={{color:'var(--text-faint)'}}>Account</p>
          {sidebarItems.account.map(item => <SidebarLink key={item.href} {...item} />)}

          <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2 mt-4" style={{color:'var(--text-faint)'}}>Support</p>
          {sidebarItems.support.map(item => <SidebarLink key={item.href} {...item} />)}
        </nav>

        {/* User bottom */}
        <div className="p-3 border-t" style={{borderColor:'var(--border)'}}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0" style={{background:'var(--accent)'}}>
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate" style={{color:'var(--text-primary)'}}>{displayName}</p>
              <p className="text-xs" style={{color:'var(--accent)'}}>🐾 {profile?.credits ?? 0} credits</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all"
            style={{color:'var(--text-muted)'}}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-56 p-6 overflow-auto">
        {children}
      </main>
    </div>
  )
}
