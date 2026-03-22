import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Blog' }

const POSTS = [
  { title: 'The 10 Rarest Cat Breeds in the World', category: 'Breeds', readTime: '5 min', excerpt: 'Discover the most elusive and exotic cat breeds from around the globe, from the Sokoke to the Khao Manee.' },
  { title: 'How to Photograph Your Cat for Perfect AI Identification', category: 'Guide', readTime: '3 min', excerpt: 'Tips and tricks to capture the perfect cat photo for accurate breed identification with CatScanner.' },
  { title: 'Understanding Cat Personality: What Your Breed Says About You', category: 'Insights', readTime: '6 min', excerpt: 'Explore the fascinating connection between cat breeds and their owners\' personalities.' },
  { title: 'Persian vs Maine Coon: The Ultimate Comparison', category: 'Breeds', readTime: '7 min', excerpt: 'Two of the world\'s most beloved cat breeds go head to head in this detailed comparison.' },
  { title: 'Common Health Issues by Cat Breed: What to Watch For', category: 'Health', readTime: '8 min', excerpt: 'A comprehensive guide to breed-specific health conditions and preventive care strategies.' },
  { title: 'Adopting vs Buying: Finding the Right Cat for Your Home', category: 'Guide', readTime: '5 min', excerpt: 'Navigate the decision between adopting a rescue cat or buying from a reputable breeder.' },
]

const CATEGORY_COLORS: Record<string, string> = {
  Breeds: 'var(--purple)',
  Guide: 'var(--accent)',
  Insights: '#14b8a6',
  Health: '#ef4444',
}

export default function BlogPage() {
  return (
    <div style={{background:'var(--bg-primary)', minHeight:'100vh', paddingTop:'80px'}}>
      {/* Hero */}
      <section className="py-16 text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{background:'var(--purple-bg)', color:'var(--purple)', border:'1px solid var(--border)'}}>
          🐾 The Cat Lover&apos;s Corner
        </div>
        <h1 className="font-fraunces text-5xl font-black mb-4" style={{color:'var(--text-primary)'}}>
          From the Cat Lover&apos;s Corner
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{color:'var(--text-muted)'}}>
          Expert guides, breed spotlights, and feline health insights from our team
        </p>
      </section>

      {/* Posts grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <article key={i} className="rounded-2xl overflow-hidden card-lift card-glow cursor-pointer" style={{background:'var(--bg-card)', border:'1px solid var(--border)'}}>
              {/* Placeholder image area */}
              <div className="h-44 flex items-center justify-center" style={{background:'var(--bg-secondary)'}}>
                <span className="text-6xl">🐱</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{background:`${CATEGORY_COLORS[post.category] || 'var(--purple)'}22`, color:CATEGORY_COLORS[post.category] || 'var(--purple)'}}>
                    {post.category}
                  </span>
                  <span className="text-xs" style={{color:'var(--text-faint)'}}>{post.readTime} read</span>
                </div>
                <h2 className="font-fraunces text-lg font-bold mb-2 leading-snug" style={{color:'var(--text-primary)'}}>{post.title}</h2>
                <p className="text-sm" style={{color:'var(--text-muted)'}}>{post.excerpt}</p>
                <p className="text-sm font-semibold mt-4" style={{color:'var(--accent)'}}>Read more →</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
