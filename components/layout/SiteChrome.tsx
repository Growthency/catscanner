'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

// Routes that get their own full-screen layout (own sidebar) — no public navbar/footer.
const BARE_PREFIXES = ['/dashboard', '/admin']

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/'
  const bare = BARE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'))

  if (bare) return <>{children}</>

  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
