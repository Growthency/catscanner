import Link from 'next/link'
import { Home, Search, BookOpen } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center px-4" style={{ minHeight: '100vh', paddingTop: '80px', background: 'var(--bg-primary)' }}>
      <div className="text-center max-w-lg animate-fade-up">
        <div className="text-7xl mb-2 animate-float">🐱</div>
        <h1 className="font-fraunces font-black leading-none mb-2" style={{ fontSize: 'clamp(3.5rem,12vw,6rem)', color: 'var(--text-primary)' }}>
          4<span className="gradient-text">0</span>4
        </h1>
        <h2 className="font-fraunces text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>This cat wandered off…</h2>
        <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back to identifying cats.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white glow-orange" style={{ background: 'var(--btn-primary)' }}>
            <Home size={17} /> Back Home
          </Link>
          <Link href="/#scanner" className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold" style={{ border: '1px solid var(--purple)', color: 'var(--purple)', background: 'var(--purple-bg)' }}>
            <Search size={17} /> Scan a Cat
          </Link>
          <Link href="/blog" className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold" style={{ border: '1px solid var(--border)', color: 'var(--text-muted)', background: 'var(--bg-card)' }}>
            <BookOpen size={17} /> Read the Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
