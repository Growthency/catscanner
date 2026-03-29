'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, ChevronLeft, ChevronRight, Clock, Calendar, ArrowRight } from 'lucide-react'
import { BLOG_POSTS, CATEGORY_COLORS, CATEGORY_GRADIENTS, POSTS_PER_PAGE } from '@/lib/blog-posts'

const ALL_CATEGORIES = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return BLOG_POSTS.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [search, activeCategory])

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  function handleSearch(val: string) { setSearch(val); setPage(1) }
  function handleCategory(cat: string) { setActiveCategory(cat); setPage(1) }

  const featuredPost = BLOG_POSTS.find(p => p.featured)

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '80px' }}>

      {/* ── HERO ── */}
      <section className="py-16 px-4 text-center" style={{ background: 'linear-gradient(160deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
          style={{ background: 'var(--purple-bg)', color: 'var(--purple)', border: '1px solid var(--border)' }}>
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
          🐾 Cat Guides, Breed Spotlights & AI Insights
        </div>
        <h1 className="font-fraunces font-black mb-4" style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)', color: 'var(--text-primary)' }}>
          The <span className="gradient-text">Cat Lover&apos;s</span> Blog
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: 'var(--text-muted)' }}>
          Expert guides, breed spotlights, health insights, and AI tips from the CatScanner team.
        </p>

        {/* Search bar */}
        <div className="max-w-lg mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-faint)' }} />
          <input
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm outline-none transition-all"
            style={{
              background: 'var(--bg-card)',
              border: '1.5px solid var(--border)',
              color: 'var(--text-primary)',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          />
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      {featuredPost && activeCategory === 'All' && !search && page === 1 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto -mt-2 mb-10">
          <Link href={featuredPost.slug}>
            <div className="rounded-2xl overflow-hidden card-lift group cursor-pointer"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
                  {featuredPost.image ? (
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.imageAlt}
                      style={{ width: '100%', height: '100%', minHeight: '280px', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.4s ease' }}
                      className="group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl"
                      style={{ background: CATEGORY_GRADIENTS[featuredPost.category] || 'var(--bg-secondary)', minHeight: '280px' }}>
                      🐱
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'var(--accent)', color: '#fff' }}>
                      ⭐ FEATURED
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{ background: CATEGORY_COLORS[featuredPost.category]?.bg, color: CATEGORY_COLORS[featuredPost.category]?.text }}>
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-faint)' }}>
                      <Clock size={12} />{featuredPost.readTime} read
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-faint)' }}>
                      <Calendar size={12} />{formatDate(featuredPost.date)}
                    </span>
                  </div>
                  <h2 className="font-fraunces font-black mb-4 leading-tight" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: 'var(--text-primary)' }}>
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{featuredPost.excerpt}</p>
                  <div className="inline-flex items-center gap-2 font-semibold text-sm" style={{ color: 'var(--accent)' }}>
                    Read Full Article <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── CATEGORY FILTER ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                background: activeCategory === cat ? 'var(--btn-primary)' : 'var(--bg-card)',
                color: activeCategory === cat ? '#fff' : 'var(--text-muted)',
                border: `1.5px solid ${activeCategory === cat ? 'var(--btn-primary)' : 'var(--border)'}`,
              }}
            >
              {cat}
              <span className="ml-1.5 text-xs opacity-70">
                ({cat === 'All' ? BLOG_POSTS.length : BLOG_POSTS.filter(p => p.category === cat).length})
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── RESULTS INFO ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
            {search ? (
              <><span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for &quot;<span style={{ color: 'var(--accent)' }}>{search}</span>&quot;</>
            ) : (
              <>Showing <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{paginated.length}</span> of <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{filtered.length}</span> articles</>
            )}
          </p>
          {totalPages > 1 && (
            <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
              Page <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{page}</span> of <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{totalPages}</span>
            </p>
          )}
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-10">
        {paginated.length === 0 ? (
          <div className="text-center py-20 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-fraunces text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No articles found</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Try a different search term or category.</p>
            <button onClick={() => { handleSearch(''); handleCategory('All') }} className="mt-4 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ background: 'var(--btn-primary)', color: '#fff' }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((post, i) => (
              <Link key={`${post.slug}-${i}`} href={post.slug}>
                <article className="rounded-2xl overflow-hidden card-lift card-glow group h-full flex flex-col cursor-pointer"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>

                  {/* Featured image or gradient placeholder */}
                  <div className="relative overflow-hidden" style={{ height: '200px', flexShrink: 0 }}>
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.imageAlt}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', transition: 'transform 0.4s ease' }}
                        className="group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"
                        style={{ background: CATEGORY_GRADIENTS[post.category] || 'var(--bg-secondary)' }}>
                        <span className="text-6xl">
                          {post.category === 'Health' ? '💊' : post.category === 'Guide' ? '📖' : post.category === 'Technology' ? '🤖' : post.category === 'Insights' ? '💡' : '🐱'}
                        </span>
                      </div>
                    )}
                    {/* Category badge on image */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
                        style={{ background: CATEGORY_COLORS[post.category]?.bg || 'rgba(167,139,250,0.2)', color: CATEGORY_COLORS[post.category]?.text || 'var(--purple)', border: '1px solid rgba(255,255,255,0.15)' }}>
                        {post.category}
                      </span>
                    </div>
                    {post.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: 'var(--accent)', color: '#fff' }}>⭐ Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-faint)' }}>
                        <Clock size={11} /> {post.readTime} read
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-faint)' }}>
                        <Calendar size={11} /> {formatDate(post.date)}
                      </span>
                    </div>
                    <h2 className="font-fraunces text-base font-bold mb-2 leading-snug flex-1"
                      style={{ color: 'var(--text-primary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.title}
                    </h2>
                    <p className="text-xs leading-relaxed mb-4"
                      style={{ color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-semibold mt-auto group-hover:gap-2 transition-all"
                      style={{ color: 'var(--accent)' }}>
                      Read more <ArrowRight size={13} />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── PAGINATION ── */}
      {totalPages > 1 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-16">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {/* Prev */}
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{
                background: page === 1 ? 'var(--bg-card)' : 'var(--bg-card)',
                color: page === 1 ? 'var(--text-faint)' : 'var(--text-primary)',
                border: '1.5px solid var(--border)',
                opacity: page === 1 ? 0.5 : 1,
                cursor: page === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              <ChevronLeft size={15} /> Prev
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => {
              const show = n === 1 || n === totalPages || Math.abs(n - page) <= 1
              const isEllipsisBefore = n === 2 && page > 4
              const isEllipsisAfter = n === totalPages - 1 && page < totalPages - 3
              if (!show && !isEllipsisBefore && !isEllipsisAfter) return null
              if (isEllipsisBefore || isEllipsisAfter) {
                return <span key={`e${n}`} className="px-1 text-sm" style={{ color: 'var(--text-faint)' }}>…</span>
              }
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className="w-10 h-10 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: page === n ? 'var(--btn-primary)' : 'var(--bg-card)',
                    color: page === n ? '#fff' : 'var(--text-primary)',
                    border: `1.5px solid ${page === n ? 'var(--btn-primary)' : 'var(--border)'}`,
                    boxShadow: page === n ? '0 0 16px rgba(249,115,22,0.35)' : 'none',
                  }}
                >
                  {n}
                </button>
              )
            })}

            {/* Next */}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
              style={{
                background: 'var(--bg-card)',
                color: page === totalPages ? 'var(--text-faint)' : 'var(--text-primary)',
                border: '1.5px solid var(--border)',
                opacity: page === totalPages ? 0.5 : 1,
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        </section>
      )}

    </div>
  )
}
