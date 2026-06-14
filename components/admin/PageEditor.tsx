'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import { POST_CATEGORIES, EMPTY_POST, slugify, DEFAULT_AUTHOR_PHOTO, type Post } from '@/lib/posts'
import RichTextEditor from './RichTextEditor'
import ImageUpload from './ImageUpload'
import { ArrowLeft, Save, Send, Search, Loader2 } from 'lucide-react'

const cardStyle = { background: C.card, border: `1px solid ${C.border}` }
const labelStyle = { color: C.text }
const inputStyle = { background: C.card, border: `1px solid ${C.border}`, color: C.text }

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={labelStyle}>{label}</label>
      {children}
      {hint && <p className="text-xs mt-1" style={{ color: C.faint }}>{hint}</p>}
    </div>
  )
}

export default function PageEditor({ postId }: { postId?: string }) {
  const router = useRouter()
  const [form, setForm] = useState<Partial<Post>>(EMPTY_POST)
  const [slugTouched, setSlugTouched] = useState(false)
  const [loading, setLoading] = useState(!!postId)
  const [saving, setSaving] = useState<false | 'draft' | 'publish'>(false)
  const [error, setError] = useState<string | null>(null)

  const set = useCallback((patch: Partial<Post>) => setForm((f) => ({ ...f, ...patch })), [])

  // Load existing post when editing.
  useEffect(() => {
    if (!postId) return
    ;(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch(`/api/admin/posts/${postId}`, {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      })
      const data = await res.json()
      if (res.ok) { setForm(data.post); setSlugTouched(true) }
      else setError(data.error || 'Could not load this post.')
      setLoading(false)
    })()
  }, [postId])

  // Auto-fill slug from the title until the user edits the slug manually.
  function onTitle(title: string) {
    set({ title, ...(slugTouched ? {} : { slug: slugify(title) }) })
  }

  async function save(status: 'draft' | 'published') {
    if (!form.title?.trim()) { setError('Please add a title first.'); return }
    setError(null)
    setSaving(status === 'published' ? 'publish' : 'draft')

    const payload: Partial<Post> = {
      ...form,
      slug: form.slug?.trim() || slugify(form.title),
      status,
      publish_date: form.publish_date || (status === 'published' ? new Date().toISOString() : null),
    }

    const { data: { session } } = await supabase.auth.getSession()
    const auth = { Authorization: `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' }
    const res = postId
      ? await fetch(`/api/admin/posts/${postId}`, { method: 'PUT', headers: auth, body: JSON.stringify(payload) })
      : await fetch('/api/admin/posts', { method: 'POST', headers: auth, body: JSON.stringify(payload) })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setError(data.error || 'Save failed.'); return }
    router.push('/admin/pages')
  }

  if (loading) {
    return <div className="flex items-center justify-center py-24" style={{ color: C.muted }}><Loader2 className="animate-spin" /></div>
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/pages" className="p-2 rounded-lg" style={{ border: `1px solid ${C.border}`, color: C.muted }}><ArrowLeft size={18} /></Link>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: C.text }}>{postId ? 'Edit Page' : 'New Page'}</h1>
            <p className="text-sm" style={{ color: C.muted }}>{postId ? 'Update this article' : 'Create a new article'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={() => save('draft')} disabled={!!saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
            style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}>
            {saving === 'draft' ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save Draft
          </button>
          <button onClick={() => save('published')} disabled={!!saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: C.accent }}>
            {saving === 'publish' ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />} Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm mb-5" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c' }}>{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl p-5" style={cardStyle}>
            <Field label="Title">
              <input value={form.title || ''} onChange={(e) => onTitle(e.target.value)} placeholder="Enter article title…"
                className="w-full px-4 py-2.5 rounded-lg outline-none text-base" style={inputStyle} />
            </Field>
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <Field label="Permalink" hint="The web address for this article.">
              <div className="flex items-center rounded-lg overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                <span className="px-3 py-2.5 text-sm whitespace-nowrap" style={{ background: C.bg, color: C.faint }}>catscanner.org/</span>
                <input value={form.slug || ''} onChange={(e) => { setSlugTouched(true); set({ slug: slugify(e.target.value) }) }} placeholder="article-slug"
                  className="flex-1 px-3 py-2.5 outline-none text-sm" style={{ background: C.card, color: C.text }} />
              </div>
            </Field>
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <label className="block text-sm font-medium mb-1.5" style={labelStyle}>Featured Image</label>
            <div className="flex gap-2">
              <input value={form.featured_image || ''} onChange={(e) => set({ featured_image: e.target.value })} placeholder="/image.webp or https://…"
                className="flex-1 px-4 py-2.5 rounded-lg outline-none text-sm" style={inputStyle} />
              <ImageUpload onUploaded={(url) => set({ featured_image: url })} />
            </div>
            <p className="text-xs mt-1" style={{ color: C.faint }}>Any upload is auto-converted to WebP. Leave empty for a default cover.</p>
            {form.featured_image && (
              <img src={form.featured_image} alt="" className="mt-3 rounded-lg max-h-44 object-cover w-full" style={{ border: `1px solid ${C.border}` }} />
            )}
          </div>

          <div className="rounded-2xl p-5" style={cardStyle}>
            <label className="block text-sm font-medium mb-2" style={labelStyle}>Content</label>
            <RichTextEditor value={form.content || ''} onChange={(html) => set({ content: html })} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Status */}
          <div className="rounded-2xl p-5" style={cardStyle}>
            <h3 className="text-sm font-semibold mb-3" style={labelStyle}>Status</h3>
            <Field label="Publish date" hint="Leave empty to publish now.">
              <input type="datetime-local"
                value={form.publish_date ? form.publish_date.slice(0, 16) : ''}
                onChange={(e) => set({ publish_date: e.target.value ? new Date(e.target.value).toISOString() : null })}
                className="w-full px-3 py-2.5 rounded-lg outline-none text-sm" style={inputStyle} />
            </Field>
            <label className="flex items-center gap-2 mt-3 text-sm cursor-pointer" style={{ color: C.text }}>
              <input type="checkbox" checked={!!form.featured} onChange={(e) => set({ featured: e.target.checked })} />
              Feature on homepage / blog hero
            </label>
          </div>

          {/* SEO */}
          <div className="rounded-2xl p-5 space-y-4" style={cardStyle}>
            <h3 className="flex items-center gap-1.5 text-sm font-semibold" style={labelStyle}><Search size={14} style={{ color: C.accent }} /> SEO Settings</h3>
            <Field label="Meta Title" hint={`${(form.meta_title || '').length}/60 characters`}>
              <input value={form.meta_title || ''} maxLength={70} onChange={(e) => set({ meta_title: e.target.value })} placeholder="Custom title for search engines…"
                className="w-full px-3 py-2 rounded-lg outline-none text-sm" style={inputStyle} />
            </Field>
            <Field label="Meta Description" hint={`${(form.meta_description || '').length}/155 characters`}>
              <textarea value={form.meta_description || ''} maxLength={170} onChange={(e) => set({ meta_description: e.target.value })} placeholder="Brief description for Google results…" rows={3}
                className="w-full px-3 py-2 rounded-lg outline-none text-sm" style={{ ...inputStyle, resize: 'vertical' }} />
            </Field>
            <Field label="Excerpt (card preview)">
              <textarea value={form.excerpt || ''} onChange={(e) => set({ excerpt: e.target.value })} placeholder="Defaults to the meta description" rows={2}
                className="w-full px-3 py-2 rounded-lg outline-none text-sm" style={{ ...inputStyle, resize: 'vertical' }} />
            </Field>
            <Field label="Tags (comma separated)">
              <input value={form.tags || ''} onChange={(e) => set({ tags: e.target.value })} placeholder="cat breeds, identification"
                className="w-full px-3 py-2 rounded-lg outline-none text-sm" style={inputStyle} />
            </Field>
          </div>

          {/* Author */}
          <div className="rounded-2xl p-5 space-y-4" style={cardStyle}>
            <h3 className="text-sm font-semibold" style={labelStyle}>Author</h3>
            <Field label="Name">
              <input value={form.author_name || ''} onChange={(e) => set({ author_name: e.target.value })} placeholder="CatScanner Team"
                className="w-full px-3 py-2.5 rounded-lg outline-none text-sm" style={inputStyle} />
            </Field>
            <Field label="Role">
              <input value={form.author_role || ''} onChange={(e) => set({ author_role: e.target.value })} placeholder="Cat Specialist"
                className="w-full px-3 py-2.5 rounded-lg outline-none text-sm" style={inputStyle} />
            </Field>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={labelStyle}>Photo</label>
              <div className="flex items-center gap-2">
                <img src={form.author_photo || DEFAULT_AUTHOR_PHOTO} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" style={{ border: `1px solid ${C.border}`, background: C.bg }} />
                <input value={form.author_photo || ''} onChange={(e) => set({ author_photo: e.target.value })} placeholder="Photo URL"
                  className="flex-1 px-3 py-2 rounded-lg outline-none text-sm" style={inputStyle} />
                <ImageUpload onUploaded={(url) => set({ author_photo: url })} label="" />
              </div>
              <p className="text-xs mt-1" style={{ color: C.faint }}>Empty = default cat avatar.</p>
            </div>
          </div>

          {/* Meta */}
          <div className="rounded-2xl p-5 space-y-4" style={cardStyle}>
            <Field label="Category">
              <select value={form.category || 'Guide'} onChange={(e) => set({ category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg outline-none text-sm" style={inputStyle}>
                {POST_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Read time">
              <input value={form.read_time || ''} onChange={(e) => set({ read_time: e.target.value })} placeholder="5 min"
                className="w-full px-3 py-2.5 rounded-lg outline-none text-sm" style={inputStyle} />
            </Field>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={labelStyle}>Access Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(['free', 'premium'] as const).map((t) => (
                  <button key={t} type="button" onClick={() => set({ access_type: t })}
                    className="px-3 py-2 rounded-lg text-sm font-medium capitalize"
                    style={{
                      background: form.access_type === t ? C.accentBg : C.card,
                      border: `1px solid ${form.access_type === t ? C.accent : C.border}`,
                      color: form.access_type === t ? C.accent : C.muted,
                    }}>
                    {t === 'free' ? '🔓 Free' : '🔒 Premium'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
