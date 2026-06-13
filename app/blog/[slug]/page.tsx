import { cache } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Clock, Calendar, ChevronRight, Lock, ArrowRight, List, Sparkles } from 'lucide-react'
import { createServerClient } from '@/lib/supabase-server'
import { BLOG_POSTS } from '@/lib/blog-posts'
import { slugify, DEFAULT_AUTHOR_PHOTO, type Post } from '@/lib/posts'

const getPost = cache(async (slug: string): Promise<Post | null> => {
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from('posts').select('*').eq('slug', slug).eq('status', 'published').single()
    return (data as Post) || null
  } catch {
    return null
  }
})

type RelatedPost = { title: string; href: string; image: string; category: string; date: string; featured?: boolean }

const getRelated = cache(async (currentSlug: string): Promise<{ popular: RelatedPost[]; recent: RelatedPost[] }> => {
  let db: RelatedPost[] = []
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('posts')
      .select('title,slug,featured_image,category,publish_date,created_at,featured')
      .eq('status', 'published')
      .limit(30)
    db = (data || []).map((p: any) => ({
      title: p.title, href: `/blog/${p.slug}`, image: p.featured_image || '',
      category: p.category || 'Guide', date: p.publish_date || p.created_at, featured: p.featured,
    }))
  } catch {}

  const statics: RelatedPost[] = BLOG_POSTS.map((p) => ({
    title: p.title, href: p.slug, image: p.image, category: p.category, date: p.date, featured: p.featured,
  }))

  const all = [...db, ...statics].filter((p) => p.href !== `/blog/${currentSlug}` && p.href !== currentSlug)
  const recent = [...all].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4)
  const seen = new Set<string>()
  const popular = [...all.filter((p) => p.featured), ...all].filter((p) => !seen.has(p.href) && seen.add(p.href)).slice(0, 4)
  return { popular, recent }
})

// Add anchor ids to h2/h3 in the content and build a table of contents.
function processContent(html: string): { html: string; toc: { id: string; text: string; level: number }[] } {
  const toc: { id: string; text: string; level: number }[] = []
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_m, level: string, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim()
    if (!text) return `<h${level}${attrs}>${inner}</h${level}>`
    const id = slugify(text) || `section-${toc.length + 1}`
    toc.push({ id, text, level: Number(level) })
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`
  })
  return { html: out, toc }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Article not found | CatScanner' }
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || undefined,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      images: post.featured_image ? [post.featured_image] : undefined,
      type: 'article',
    },
  }
}

function fmt(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function PostCard({ p }: { p: RelatedPost }) {
  return (
    <Link href={p.href} className="flex gap-3 group">
      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0" style={{ background: 'var(--bg-secondary)' }}>
        {p.image
          ? <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          : <div className="w-full h-full flex items-center justify-center text-2xl">🐱</div>}
      </div>
      <div className="min-w-0">
        <span className="text-[11px] font-semibold" style={{ color: 'var(--accent)' }}>{p.category}</span>
        <p className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: 'var(--text-primary)' }}>{p.title}</p>
      </div>
    </Link>
  )
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const { html, toc } = processContent(post.content || '')
  const { popular, recent } = await getRelated(post.slug)

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '84px' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {/* ── MAIN ── */}
        <article className="lg:col-span-2 min-w-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-5 flex-wrap" style={{ color: 'var(--text-faint)' }}>
            <Link href="/" className="hover:opacity-70">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:opacity-70">Blog</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--accent)' }}>{post.category}</span>
          </nav>

          {/* Title */}
          <h1 className="font-fraunces font-black leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem,4vw,2.7rem)', color: 'var(--text-primary)' }}>
            {post.title}
          </h1>

          {/* Author card */}
          <div className="flex items-center gap-3 p-3 rounded-2xl mb-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <img src={post.author_photo || DEFAULT_AUTHOR_PHOTO} alt={post.author_name} className="w-11 h-11 rounded-full object-cover" style={{ border: '1px solid var(--border)', background: 'var(--bg-secondary)' }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{post.author_name || 'CatScanner Team'}</p>
              <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{post.author_role || 'Cat Specialist'}</p>
            </div>
            <div className="text-right text-xs space-y-0.5" style={{ color: 'var(--text-faint)' }}>
              <p className="flex items-center gap-1 justify-end"><Calendar size={11} /> {fmt(post.publish_date || post.created_at)}</p>
              {post.read_time && <p className="flex items-center gap-1 justify-end"><Clock size={11} /> {post.read_time} read</p>}
            </div>
          </div>

          {/* Featured image */}
          {post.featured_image && (
            <img src={post.featured_image} alt={post.title} className="w-full rounded-2xl mb-7" style={{ border: '1px solid var(--border)' }} />
          )}

          {/* Mobile table of contents */}
          {toc.length > 1 && (
            <details className="lg:hidden mb-6 rounded-2xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <summary className="flex items-center gap-2 font-semibold cursor-pointer" style={{ color: 'var(--text-primary)' }}>
                <List size={16} style={{ color: 'var(--accent)' }} /> Table of Contents
              </summary>
              <ul className="mt-3 space-y-1.5">
                {toc.map((t) => (
                  <li key={t.id} style={{ paddingLeft: t.level === 3 ? 14 : 0 }}>
                    <a href={`#${t.id}`} className="text-sm hover:opacity-70" style={{ color: 'var(--text-muted)' }}>{t.text}</a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {/* Content */}
          <div className="post-body" style={{ color: 'var(--text-muted)' }} dangerouslySetInnerHTML={{ __html: html }} />

          {/* Inline premium CTA */}
          <div className="mt-10 rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(124,58,237,0.12))', border: '1px solid var(--border)' }}>
            <p className="font-fraunces text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Want to identify your own cat?</p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Upload a photo and get an instant AI breed report — free to try.</p>
            <Link href="/#scanner" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white glow-orange" style={{ background: 'var(--btn-primary)' }}>
              Scan Your Cat <ArrowRight size={16} />
            </Link>
          </div>
        </article>

        {/* ── SIDEBAR ── */}
        <aside className="space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Table of contents */}
            {toc.length > 1 && (
              <div className="hidden lg:block rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="flex items-center gap-2 text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                  <List size={15} style={{ color: 'var(--accent)' }} /> Table of Contents
                </h3>
                <ul className="space-y-2 border-l" style={{ borderColor: 'var(--border)' }}>
                  {toc.map((t) => (
                    <li key={t.id} style={{ paddingLeft: t.level === 3 ? 22 : 12 }}>
                      <a href={`#${t.id}`} className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text-muted)' }}>{t.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Popular posts */}
            {popular.length > 0 && (
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>🔥 Popular Posts</h3>
                <div className="space-y-4">{popular.map((p) => <PostCard key={p.href} p={p} />)}</div>
              </div>
            )}

            {/* Premium subscription card */}
            <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #f97316, #7c3aed)' }}>
              <Sparkles size={22} className="mb-2" />
              <h3 className="font-fraunces text-lg font-bold mb-1">Go Premium</h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>Unlock unlimited scans, full breed reports and scan history.</p>
              <Link href="/pricing" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full font-semibold text-sm" style={{ background: '#fff', color: '#f97316' }}>
                <Lock size={14} /> View Plans
              </Link>
            </div>

            {/* Recent posts */}
            {recent.length > 0 && (
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>🕒 Recent Posts</h3>
                <div className="space-y-4">{recent.map((p) => <PostCard key={p.href} p={p} />)}</div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
