'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Bookmark, Trash2, Loader2, ArrowRight } from 'lucide-react'

type Saved = { id: string; slug: string; title: string; excerpt: string; image: string; category: string; href: string; created_at: string }

export default function SavedPage() {
  const [items, setItems] = useState<Saved[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { setLoading(false); return }
      supabase.from('saved_articles').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false })
        .then(({ data }) => { setItems(data || []); setLoading(false) })
    })
  }, [])

  async function remove(id: string) {
    await supabase.from('saved_articles').delete().eq('id', id)
    setItems((list) => list.filter((x) => x.id !== id))
  }

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-bg)' }}><Bookmark size={20} style={{ color: 'var(--accent)' }} /></div>
        <div>
          <h1 className="font-fraunces text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Saved Articles</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{items.length} article{items.length !== 1 ? 's' : ''} saved</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20" style={{ color: 'var(--text-muted)' }}><Loader2 className="animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <Bookmark size={40} className="mx-auto mb-4" style={{ color: 'var(--text-faint)' }} />
          <h2 className="font-fraunces text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>No saved articles yet</h2>
          <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>Tap “Save” on any blog article to bookmark it for later.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white" style={{ background: 'var(--btn-primary)' }}>Browse the Blog <ArrowRight size={15} /></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((a) => (
            <div key={a.id} className="rounded-2xl overflow-hidden flex flex-col card-lift" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Link href={a.href || `/blog/${a.slug}`} className="block">
                <div className="h-40 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                  {a.image ? <img src={a.image} alt={a.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-5xl">🐱</div>}
                </div>
              </Link>
              <div className="p-4 flex flex-col flex-1">
                {a.category && <span className="self-start text-[11px] font-semibold px-2 py-0.5 rounded-full mb-2" style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}>{a.category}</span>}
                <Link href={a.href || `/blog/${a.slug}`}>
                  <h3 className="font-fraunces font-bold leading-snug mb-1.5 line-clamp-2" style={{ color: 'var(--text-primary)' }}>{a.title}</h3>
                </Link>
                {a.excerpt && <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: 'var(--text-muted)' }}>{a.excerpt}</p>}
                <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <span className="text-xs" style={{ color: 'var(--text-faint)' }}>{fmt(a.created_at)}</span>
                  <button onClick={() => remove(a.id)} title="Remove" className="p-1.5 rounded-lg" style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
