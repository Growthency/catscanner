'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import type { Post } from '@/lib/posts'
import { Plus, FileText, Pencil, Trash2, ExternalLink, Loader2 } from 'lucide-react'

export default function AdminPages() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const { data: { session } } = await supabase.auth.getSession()
    try {
      const res = await fetch('/api/admin/posts', { headers: { Authorization: `Bearer ${session?.access_token}` } })
      const data = await res.json()
      if (res.ok) setPosts(data.posts || [])
      else setError(data.error || 'Could not load posts. Have you run the posts table SQL in Supabase?')
    } catch {
      setError('Could not reach the server.')
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function remove(id: string) {
    if (!window.confirm('Delete this post permanently?')) return
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${session?.access_token}` } })
    if (res.ok) setPosts((p) => p.filter((x) => x.id !== id))
  }

  function fmt(d: string | null) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: C.text }}>Pages</h1>
          <p className="text-sm mt-1" style={{ color: C.muted }}>Create, edit and publish your articles and guides.</p>
        </div>
        <Link href="/admin/pages/new" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white shrink-0" style={{ background: C.accent }}>
          <Plus size={16} /> New Page
        </Link>
      </div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm mb-5" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309' }}>{error}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24" style={{ color: C.muted }}><Loader2 className="animate-spin" /></div>
      ) : posts.length === 0 ? (
        // Empty state
        <div className="rounded-2xl p-16 flex flex-col items-center text-center" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <FileText size={40} style={{ color: C.faint }} className="mb-4" />
          <h2 className="text-lg font-semibold mb-1" style={{ color: C.text }}>No posts yet</h2>
          <p className="text-sm mb-5" style={{ color: C.muted }}>Write your first guide to get started.</p>
          <Link href="/admin/pages/new" className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: C.accent }}>
            <Plus size={16} /> New Page
          </Link>
        </div>
      ) : (
        // List
        <div className="rounded-2xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          {posts.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-4" style={{ borderTop: i === 0 ? 'none' : `1px solid ${C.border}` }}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate" style={{ color: C.text }}>{p.title || 'Untitled'}</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize shrink-0"
                    style={p.status === 'published'
                      ? { background: C.accentBg, color: C.accent }
                      : { background: '#f1f5f9', color: C.faint }}>
                    {p.status}
                  </span>
                </div>
                <p className="text-xs mt-0.5 truncate" style={{ color: C.faint }}>/blog/{p.slug} · {p.category} · {fmt(p.publish_date || p.created_at)}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {p.status === 'published' && (
                  <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" title="View" className="p-2 rounded-lg hover:bg-black/5" style={{ color: C.muted }}><ExternalLink size={15} /></a>
                )}
                <Link href={`/admin/pages/${p.id}/edit`} title="Edit" className="p-2 rounded-lg hover:bg-black/5" style={{ color: C.muted }}><Pencil size={15} /></Link>
                <button onClick={() => remove(p.id)} title="Delete" className="p-2 rounded-lg hover:bg-black/5" style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
