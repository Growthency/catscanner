import { cache } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown, Lock, ArrowRight, List, Sparkles, Eye, Clock } from 'lucide-react'
import { createServerClient } from '@/lib/supabase-server'
import { BLOG_POSTS } from '@/lib/blog-posts'
import { slugify, DEFAULT_AUTHOR_PHOTO, DEFAULT_AUTHOR_NAME, DEFAULT_AUTHOR_ROLE } from '@/lib/posts'
import ViewTracker from '@/components/ViewTracker'
import BookmarkButton from '@/components/BookmarkButton'

// Shared magazine renderer used by both DB posts (/[slug]) and the static
// top-level articles, so every article looks identical.
export type ArticleData = {
  slug: string
  title: string
  content: string
  excerpt?: string | null
  meta_title?: string | null
  meta_description?: string | null
  category?: string | null
  author_name?: string | null
  author_role?: string | null
  author_photo?: string | null
  featured_image?: string | null
  read_time?: string | null
  views?: number
  publish_date?: string | null
  created_at?: string | null
  updated_at?: string | null
  custom_schema?: string | null
  custom_css?: string | null
}

type RelatedPost = { title: string; href: string; image: string; category: string; date: string; views: number; featured?: boolean }

const getRelated = cache(async (currentSlug: string): Promise<{ popular: RelatedPost[]; recent: RelatedPost[] }> => {
  let db: RelatedPost[] = []
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from('posts')
      .select('title,slug,featured_image,category,publish_date,created_at,featured,views')
      .eq('status', 'published').limit(40)
    db = (data || []).map((p: any) => ({
      title: p.title, href: `/${p.slug}`, image: p.featured_image || '',
      category: p.category || 'Guide', date: p.publish_date || p.created_at, views: p.views || 0, featured: p.featured,
    }))
  } catch {}
  const statics: RelatedPost[] = BLOG_POSTS.map((p) => ({
    title: p.title, href: p.slug, image: p.image, category: p.category, date: p.date, views: 0, featured: p.featured,
  }))
  const all = [...db, ...statics].filter((p) => p.href !== `/${currentSlug}` && p.href !== currentSlug)
  const popular = [...all].sort((a, b) => b.views - a.views).slice(0, 5)
  const recent = [...all].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4)
  return { popular, recent }
})

const getLinkRules = cache(async (): Promise<{ domain: string; nofollow: boolean; sponsored: boolean }[]> => {
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from('external_link_rules').select('domain,nofollow,sponsored')
    return data || []
  } catch { return [] }
})

function applyLinkRules(html: string, rules: { domain: string; nofollow: boolean; sponsored: boolean }[]): string {
  if (!rules.length) return html
  return html.replace(/<a\b([^>]*)>/gi, (full, attrs) => {
    const href = (attrs.match(/href=["']([^"']+)["']/i) || [])[1]
    if (!href) return full
    let domain = ''
    try { domain = new URL(href, 'https://catscanner.org').hostname.replace(/^www\./, '') } catch { return full }
    if (domain === 'catscanner.org') return full
    const rule = rules.find((r) => domain === r.domain || domain.endsWith('.' + r.domain))
    if (!rule) return full
    const rels = ['noopener']
    if (rule.nofollow) rels.push('nofollow')
    if (rule.sponsored) rels.push('sponsored')
    const cleaned = attrs.replace(/\srel=["'][^"']*["']/gi, '')
    return `<a${cleaned} rel="${rels.join(' ')}">`
  })
}

// Add heading anchor ids, build a TOC, and split content at the first heading.
function processContent(html: string): { intro: string; body: string; toc: { id: string; text: string; level: number }[] } {
  const toc: { id: string; text: string; level: number }[] = []
  const withIds = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_m, level: string, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim()
    if (!text) return `<h${level}${attrs}>${inner}</h${level}>`
    const id = slugify(text) || `section-${toc.length + 1}`
    toc.push({ id, text, level: Number(level) })
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`
  })
  const lower = withIds.toLowerCase()
  const idxs = ['<h2', '<h3'].map((t) => lower.indexOf(t)).filter((i) => i >= 0)
  if (!idxs.length) return { intro: withIds, body: '', toc }
  const first = Math.min(...idxs)
  return { intro: withIds.slice(0, first), body: withIds.slice(first), toc }
}

function fmt(d: string | null | undefined) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function ArticleView({ post }: { post: ArticleData }) {
  const rules = await getLinkRules()
  const { intro, body, toc } = processContent(applyLinkRules(post.content || '', rules))
  const { popular, recent } = await getRelated(post.slug)
  const updated = post.updated_at && post.updated_at !== post.created_at ? post.updated_at : (post.publish_date || post.created_at || null)
  const authorName = post.author_name || DEFAULT_AUTHOR_NAME
  const authorRole = post.author_role || DEFAULT_AUTHOR_ROLE
  const category = post.category || 'Guide'

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || undefined,
    image: post.featured_image ? [post.featured_image] : undefined,
    datePublished: post.publish_date || post.created_at || undefined,
    dateModified: updated || undefined,
    author: { '@type': 'Person', name: authorName },
    publisher: { '@type': 'Organization', name: 'CatScanner', logo: { '@type': 'ImageObject', url: 'https://catscanner.org/icon.svg' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://catscanner.org/${post.slug}` },
  }
  let schemaJson = JSON.stringify(defaultSchema)
  if (post.custom_schema && post.custom_schema.trim()) {
    try { JSON.parse(post.custom_schema); schemaJson = post.custom_schema } catch {}
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '84px' }}>
      <ViewTracker slug={post.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      {post.custom_css ? <style dangerouslySetInnerHTML={{ __html: post.custom_css }} /> : null}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {/* ── MAIN ── */}
        <article className="lg:col-span-2 min-w-0">
          <nav className="flex items-center gap-1.5 text-xs mb-5 flex-wrap" style={{ color: 'var(--text-faint)' }}>
            <Link href="/" className="hover:opacity-70">Home</Link><ChevronRight size={12} />
            <Link href="/blog" className="hover:opacity-70">Blog</Link><ChevronRight size={12} />
            <span style={{ color: 'var(--accent)' }}>{category}</span>
          </nav>

          <div className="flex items-start justify-between gap-4 mb-5">
            <h1 className="font-fraunces font-black leading-tight" style={{ fontSize: 'clamp(1.8rem,4vw,2.7rem)', color: 'var(--text-primary)' }}>{post.title}</h1>
          </div>

          {/* Author card */}
          <div className="flex items-center gap-3 p-3 rounded-2xl mb-3" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <img src={post.author_photo || DEFAULT_AUTHOR_PHOTO} alt={authorName} className="w-11 h-11 rounded-full object-cover" style={{ border: '1px solid var(--border)', background: 'var(--bg-secondary)' }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{authorName}</p>
              <p className="text-xs" style={{ color: 'var(--text-faint)' }}>{authorRole}</p>
            </div>
            <div className="text-right text-xs" style={{ color: 'var(--text-faint)' }}>
              <p>Updated</p>
              <p className="font-semibold" style={{ color: 'var(--text-muted)' }}>{fmt(updated)}</p>
            </div>
          </div>

          {/* Views + read time + bookmark */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-faint)' }}>
              <span className="flex items-center gap-1"><Eye size={13} /> {post.views || 0} views</span>
              {post.read_time && <span className="flex items-center gap-1"><Clock size={13} /> {post.read_time} read</span>}
            </div>
            <BookmarkButton article={{ slug: post.slug, title: post.title, excerpt: post.excerpt || post.meta_description || '', image: post.featured_image || '', category, href: `/${post.slug}` }} />
          </div>

          {post.featured_image && <img src={post.featured_image} alt={post.title} className="w-full rounded-2xl mb-7" style={{ border: '1px solid var(--border)' }} />}

          {/* Intro (before first heading) */}
          {intro && <div className="post-body" style={{ color: 'var(--text-muted)' }} dangerouslySetInnerHTML={{ __html: intro }} />}

          {/* Inline Table of Contents — after intro, before first heading */}
          {toc.length > 1 && (
            <details className="my-7 rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} open>
              <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none font-semibold" style={{ color: 'var(--text-primary)' }}>
                <span className="flex items-center gap-2"><List size={16} style={{ color: 'var(--accent)' }} /> Table of Contents
                  <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>{toc.length}</span></span>
                <ChevronDown size={16} style={{ color: 'var(--text-faint)' }} />
              </summary>
              <ul className="px-4 pb-4 pt-1 space-y-1.5">
                {toc.map((t) => (
                  <li key={t.id} style={{ paddingLeft: t.level === 3 ? 18 : 0 }}>
                    <a href={`#${t.id}`} className="text-sm hover:opacity-70" style={{ color: 'var(--text-muted)' }}>{t.text}</a>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {/* Body (from first heading) */}
          {body && <div className="post-body" style={{ color: 'var(--text-muted)' }} dangerouslySetInnerHTML={{ __html: body }} />}

          {/* Inline CTA */}
          <div className="mt-10 rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(124,58,237,0.12))', border: '1px solid var(--border)' }}>
            <p className="font-fraunces text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Want to identify your own cat?</p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Upload a photo and get an instant AI breed report — free to try.</p>
            <Link href="/#scanner" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white glow-orange" style={{ background: 'var(--btn-primary)' }}>Scan Your Cat <ArrowRight size={16} /></Link>
          </div>
        </article>

        {/* ── SIDEBAR ── */}
        <aside className="space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Author bio */}
            <div className="rounded-2xl p-6 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <img src={post.author_photo || DEFAULT_AUTHOR_PHOTO} alt={authorName} className="w-20 h-20 rounded-full object-cover mx-auto mb-3" style={{ border: '2px solid var(--accent)', background: 'var(--bg-secondary)' }} />
              <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{authorName}</p>
              <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full my-2" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>🐾 {authorRole}</span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>Part of the CatScanner team — helping owners identify breeds and care for their cats with AI.</p>
              <Link href="/about" className="inline-flex items-center gap-1 text-sm font-semibold mt-3" style={{ color: 'var(--accent)' }}>More about us <ChevronRight size={14} /></Link>
            </div>

            {/* Popular posts (by views) */}
            {popular.length > 0 && (
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="flex items-center gap-2 text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}><Sparkles size={15} style={{ color: 'var(--accent)' }} /> Popular Posts</h3>
                <div className="space-y-4">
                  {popular.map((p, i) => (
                    <Link key={p.href} href={p.href} className="flex gap-3 group">
                      <span className="text-sm font-black w-5 shrink-0" style={{ color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span>
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0" style={{ background: 'var(--bg-secondary)' }}>
                        {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xl">🐱</div>}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: 'var(--text-primary)' }}>{p.title}</p>
                        <p className="flex items-center gap-1 text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}><Eye size={10} /> {p.views} views</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Premium */}
            <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #f97316, #7c3aed)' }}>
              <Sparkles size={22} className="mb-2" />
              <h3 className="font-fraunces text-lg font-bold mb-1">Go Premium</h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>Unlock unlimited scans, full breed reports and scan history.</p>
              <Link href="/pricing" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full font-semibold text-sm" style={{ background: '#fff', color: '#f97316' }}><Lock size={14} /> View Plans</Link>
            </div>

            {/* Recent */}
            {recent.length > 0 && (
              <div className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>🕒 Recent Posts</h3>
                <div className="space-y-4">
                  {recent.map((p) => (
                    <Link key={p.href} href={p.href} className="flex gap-3 group">
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0" style={{ background: 'var(--bg-secondary)' }}>
                        {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xl">🐱</div>}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-semibold" style={{ color: 'var(--accent)' }}>{p.category}</span>
                        <p className="text-sm font-semibold leading-snug line-clamp-2" style={{ color: 'var(--text-primary)' }}>{p.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
