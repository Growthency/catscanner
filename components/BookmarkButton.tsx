'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react'

export type SavedArticle = { slug: string; title: string; excerpt: string; image: string; category: string; href: string }

export default function BookmarkButton({ article }: { article: SavedArticle }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [saved, setSaved] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        supabase.from('saved_articles').select('id').eq('user_id', session.user.id).eq('slug', article.slug).maybeSingle()
          .then(({ data }) => setSaved(!!data))
      }
    })
  }, [article.slug])

  async function toggle() {
    if (!user) { router.push('/login'); return }
    setBusy(true)
    if (saved) {
      await supabase.from('saved_articles').delete().eq('user_id', user.id).eq('slug', article.slug)
      setSaved(false)
    } else {
      await supabase.from('saved_articles').insert({ user_id: user.id, ...article })
      setSaved(true)
    }
    setBusy(false)
  }

  return (
    <button onClick={toggle} disabled={busy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all"
      style={saved
        ? { background: 'var(--accent)', color: '#fff' }
        : { background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--accent)' }}>
      {busy ? <Loader2 size={14} className="animate-spin" /> : saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
      {saved ? 'Saved' : 'Save'}
    </button>
  )
}
