'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import type { Post } from '@/lib/posts'
import { Plus, FileText, Pencil, Trash2, ExternalLink, Loader2, Search, Link2 } from 'lucide-react'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

type Tab = 'all' | 'published' | 'draft' | 'scheduled'

function effStatus(p: Post): 'published' | 'draft' | 'scheduled' {
  if (p.status === 'draft') return 'draft'
  if (p.publish_date && new Date(p.publish_date).getTime() > Date.now()) return 'scheduled'
  return 'published'
}

export default function AdminPages() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('all')
  const [search, setSearch] = useState('')
  const [confirmId, setConfirmId] = useState<string | null>(null)

  async function authHeader() {
    const { data: { session } } = await supabase.auth.getSession()
    return { Authorization: `Bearer ${session?.access_token}` }
  }

  async function load() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/posts', { headers: await authHeader() })
      const data = await res.json()
      if (res.ok) setPosts(data.posts || [])
      else setError(data.error || 'Could not load posts. Have you run the posts table SQL in Supabase?')
    } catch { setError('Could not reach the server.') }
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function doRemove(id: string) {
    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE', headers: await authHeader() })
    setPosts((p) => p.filter((x) => x.id !== id))
  }

  const counts = useMemo(() => {
    const c = { all: posts.length, published: 0, draft: 0, scheduled: 0 }
    for (const p of posts) c[effStatus(p)]++
    return c
  }, [posts])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return posts.filter((p) => {
      if (tab !== 'all' && effStatus(p) !== tab) return false
      if (q && !(`${p.title} ${p.slug}`.toLowerCase().includes(q))) return false
      return true
    })
  }, [posts, tab, search])

  const linkCount = (html: string) => (html?.match(/<a\b/gi) || []).length
  const fmt = (d: string | null) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

  const TABS: { key: Tab; label: string; color: string }[] = [
    { key: 'all', label: 'All', color: C.text },
    { key: 'published', label: 'Published', color: '#16a34a' },
    { key: 'draft', label: 'Draft', color: '#b45309' },
    { key: 'scheduled', label: 'Scheduled', color: '#3b82f6' },
  ]
  const card = { background: C.card, border: `1px solid ${C.border}` }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-3" style={{ color: C.text }}>Pages</h1>
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => {
              const active = tab === t.key
              return (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors"
                  style={active ? { background: t.key === 'all' ? C.text : C.accentBg, color: t.key === 'all' ? '#fff' : t.color, border: `1px solid ${t.key === 'all' ? C.text : C.accent}` } : { background: C.card, color: C.muted, border: `1px solid ${C.border}` }}>
                  {t.key !== 'all' && <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />}
                  {t.label} <span style={{ opacity: 0.7 }}>{counts[t.key]}</span>
                </button>
              )
            })}
          </div>
        </div>
        <Link href="/admin/pages/new" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white shrink-0" style={{ background: C.accent }}>
          <Plus size={16} /> New Page
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: C.faint }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles…"
          className="w-full pl-11 pr-4 py-3 rounded-xl outline-none text-sm" style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }} />
      </div>

      {error && <div className="rounded-xl px-4 py-3 text-sm mb-4" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309' }}>{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center py-20" style={{ color: C.muted }}><Loader2 className="animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl p-16 flex flex-col items-center text-center" style={card}>
          <FileText size={40} style={{ color: C.faint }} className="mb-4" />
          <h2 className="text-lg font-semibold mb-1" style={{ color: C.text }}>{posts.length === 0 ? 'No posts yet' : 'No matching posts'}</h2>
          <p className="text-sm mb-5" style={{ color: C.muted }}>{posts.length === 0 ? 'Write your first guide to get started.' : 'Try a different filter or search.'}</p>
          {posts.length === 0 && <Link href="/admin/pages/new" className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: C.accent }}><Plus size={16} /> New Page</Link>}
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={card}>
          {/* Header row */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-3 text-[11px] font-semibold uppercase tracking-wide" style={{ background: C.bg, color: C.faint }}>
            <span className="col-span-4">Title</span>
            <span className="col-span-2">Category</span>
            <span className="col-span-1">Type</span>
            <span className="col-span-1">Status</span>
            <span className="col-span-2">Date</span>
            <span className="col-span-1 text-center">Links</span>
            <span className="col-span-1 text-right">Actions</span>
          </div>
          {filtered.map((p, i) => {
            const st = effStatus(p)
            const stColor = st === 'published' ? '#16a34a' : st === 'scheduled' ? '#3b82f6' : '#b45309'
            return (
              <div key={p.id} className="grid grid-cols-2 md:grid-cols-12 gap-3 px-5 py-3.5 items-center" style={{ borderTop: `1px solid ${C.border}` }}>
                <div className="col-span-2 md:col-span-4 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: C.text }}>{p.title || 'Untitled'}</p>
                  <p className="text-xs truncate" style={{ color: C.faint }}>/{p.slug}</p>
                </div>
                <span className="hidden md:block col-span-2 text-sm truncate" style={{ color: C.muted }}>{p.category}</span>
                <span className="hidden md:block col-span-1 text-xs font-medium capitalize" style={{ color: p.access_type === 'premium' ? '#7c3aed' : '#16a34a' }}>{p.access_type}</span>
                <span className="hidden md:block col-span-1"><span className="text-[11px] font-semibold capitalize px-2 py-0.5 rounded-full" style={{ background: `${stColor}1a`, color: stColor }}>{st}</span></span>
                <span className="hidden md:block col-span-2 text-sm" style={{ color: C.muted }}>{fmt(p.publish_date || p.created_at)}</span>
                <span className="hidden md:flex col-span-1 items-center justify-center gap-1 text-sm" style={{ color: C.muted }}><Link2 size={12} /> {linkCount(p.content)}</span>
                <div className="col-span-2 md:col-span-1 flex items-center justify-end gap-0.5">
                  {st === 'published' && <a href={`/${p.slug}`} target="_blank" rel="noreferrer" title="View" className="p-1.5 rounded-lg hover:bg-black/5" style={{ color: C.muted }}><ExternalLink size={15} /></a>}
                  <Link href={`/admin/pages/edit?id=${p.id}`} title="Edit" className="p-1.5 rounded-lg hover:bg-black/5" style={{ color: C.muted }}><Pencil size={15} /></Link>
                  <button onClick={() => setConfirmId(p.id)} title="Delete" className="p-1.5 rounded-lg hover:bg-black/5" style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <ConfirmDialog open={!!confirmId} title="Delete post?" message="This permanently deletes the post and can’t be undone." confirmLabel="Delete post" onConfirm={() => { if (confirmId) doRemove(confirmId); setConfirmId(null) }} onCancel={() => setConfirmId(null)} />
    </div>
  )
}
