'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import { POST_CATEGORIES, EMPTY_POST, slugify, DEFAULT_AUTHOR_PHOTO, type Post } from '@/lib/posts'
import RichTextEditor from './RichTextEditor'
import ImageUpload from './ImageUpload'
import { ArrowLeft, Save, Send, Search, Loader2, X, Plus, Code2, Braces, Link2 } from 'lucide-react'

const cardStyle = { background: C.card, border: `1px solid ${C.border}` }
const labelStyle = { color: C.text }
const inputStyle = { background: C.card, border: `1px solid ${C.border}`, color: C.text }

function isValidJson(s?: string): boolean { try { JSON.parse(s || ''); return true } catch { return false } }

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
  const [categories, setCategories] = useState<string[]>(POST_CATEGORIES)
  const [newCat, setNewCat] = useState('')
  const [allPosts, setAllPosts] = useState<{ id: string; title: string; slug: string }[]>([])

  const set = useCallback((patch: Partial<Post>) => setForm((f) => ({ ...f, ...patch })), [])

  // Load the editable category list (falls back to the built-in defaults).
  useEffect(() => {
    ;(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const res = await fetch('/api/admin/settings', { headers: { Authorization: `Bearer ${session?.access_token}` } })
        const j = await res.json()
        const arr = JSON.parse(j.settings?.post_categories || 'null')
        if (Array.isArray(arr) && arr.length) setCategories(arr)
      } catch {}
    })()
  }, [])

  async function persistCategories(next: string[]) {
    setCategories(next)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ settings: { post_categories: JSON.stringify(next) } }),
      })
    } catch {}
  }

  function addCategory() {
    const name = newCat.trim()
    if (!name || categories.includes(name)) { setNewCat(''); return }
    persistCategories([...categories, name])
    set({ category: name })
    setNewCat('')
  }

  function removeCategory(c: string) {
    const next = categories.filter((x) => x !== c)
    persistCategories(next)
    if (form.category === c) set({ category: next[0] || '' })
  }

  // Load other posts to power the interlink checker.
  useEffect(() => {
    ;(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const res = await fetch('/api/admin/posts', { headers: { Authorization: `Bearer ${session?.access_token}` } })
        const j = await res.json()
        if (Array.isArray(j.posts)) setAllPosts(j.posts.map((p: any) => ({ id: p.id, title: p.title, slug: p.slug })))
      } catch {}
    })()
  }, [])

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

  // Internal-link opportunities: other posts whose title appears in this
  // content but isn't linked yet.
  const interlinks = (() => {
    const html = form.content || ''
    const plain = html.replace(/<[^>]+>/g, ' ').toLowerCase()
    if (plain.trim().length < 30) return []
    return allPosts.filter((p) => p.id !== postId && p.title && p.slug && plain.includes(p.title.toLowerCase()) && !html.includes(`/${p.slug}`)).slice(0, 12)
  })()

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
              {form.featured_image && <button type="button" onClick={() => set({ featured_image: '' })} title="Remove image" className="shrink-0 px-3 rounded-lg flex items-center justify-center" style={{ border: `1px solid ${C.border}`, color: '#ef4444' }}><X size={16} /></button>}
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

          {/* Custom CSS */}
          <div className="rounded-2xl p-5" style={cardStyle}>
            <h3 className="flex items-center gap-1.5 text-sm font-semibold mb-1" style={labelStyle}><Code2 size={14} style={{ color: C.accent }} /> Custom CSS</h3>
            <p className="text-xs mb-2" style={{ color: C.faint }}>Loads only on this page, after the global CSS so your rules win.</p>
            <textarea value={form.custom_css || ''} onChange={(e) => set({ custom_css: e.target.value })} spellCheck={false} rows={5}
              placeholder={'/* Example */\n.post-body h2 { color: #f97316; }'}
              className="w-full px-3 py-2 rounded-lg outline-none font-mono text-xs" style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          {/* Custom Schema (JSON-LD) */}
          <div className="rounded-2xl p-5" style={cardStyle}>
            <h3 className="flex items-center gap-1.5 text-sm font-semibold mb-1" style={labelStyle}><Braces size={14} style={{ color: C.accent }} /> Custom Schema (JSON-LD)</h3>
            <p className="text-xs mb-2" style={{ color: C.faint }}>If set, replaces the default Article schema. Use for HowTo, FAQPage, Recipe, Product, etc.</p>
            <textarea value={form.custom_schema || ''} onChange={(e) => set({ custom_schema: e.target.value })} spellCheck={false} rows={6}
              placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "FAQPage"\n}'}
              className="w-full px-3 py-2 rounded-lg outline-none font-mono text-xs" style={{ ...inputStyle, resize: 'vertical' }} />
            {!!form.custom_schema?.trim() && !isValidJson(form.custom_schema) && (
              <p className="text-xs mt-1" style={{ color: '#ef4444' }}>⚠ Not valid JSON yet — it won’t be used until it parses.</p>
            )}
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

          {/* Interlink Checker */}
          <div className="rounded-2xl p-5" style={cardStyle}>
            <h3 className="flex items-center gap-1.5 text-sm font-semibold mb-2" style={labelStyle}><Link2 size={14} style={{ color: C.accent }} /> Interlink Checker</h3>
            {interlinks.length === 0 ? (
              <p className="text-xs" style={{ color: C.faint }}>{(form.content || '').replace(/<[^>]+>/g, '').trim().length < 30 ? 'Start writing to see interlink suggestions.' : 'No internal link opportunities found yet.'}</p>
            ) : (
              <div className="space-y-2">
                <p className="text-xs mb-1" style={{ color: C.muted }}>{interlinks.length} internal link {interlinks.length === 1 ? 'opportunity' : 'opportunities'}:</p>
                {interlinks.map((p) => (
                  <div key={p.id} className="text-xs rounded-lg px-2.5 py-2" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
                    <p className="font-medium truncate" style={{ color: C.text }}>{p.title}</p>
                    <p className="font-mono truncate" style={{ color: C.accent }}>/{p.slug}</p>
                  </div>
                ))}
              </div>
            )}
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
              <input value={form.author_name || ''} onChange={(e) => set({ author_name: e.target.value })} placeholder="Marcus Bennett"
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
                {form.author_photo && <button type="button" onClick={() => set({ author_photo: '' })} title="Remove photo" className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg" style={{ border: `1px solid ${C.border}`, color: '#ef4444' }}><X size={15} /></button>}
              </div>
              <p className="text-xs mt-1" style={{ color: C.faint }}>Empty = default author photo (Marcus Bennett).</p>
            </div>
          </div>

          {/* Meta */}
          <div className="rounded-2xl p-5 space-y-4" style={cardStyle}>
            <Field label="Category" hint="Add or remove categories — shared across all posts.">
              <select value={form.category || ''} onChange={(e) => set({ category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg outline-none text-sm" style={inputStyle}>
                {!categories.length && <option value="">No categories yet</option>}
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {categories.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 rounded-full text-xs" style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.muted }}>
                      {c}
                      <button type="button" onClick={() => removeCategory(c)} title={`Delete "${c}"`} className="hover:opacity-70" style={{ color: '#ef4444' }}><X size={12} /></button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <input value={newCat} onChange={(e) => setNewCat(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCategory() } }}
                  placeholder="New category name" className="flex-1 px-3 py-2 rounded-lg outline-none text-sm" style={inputStyle} />
                <button type="button" onClick={addCategory} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white shrink-0" style={{ background: C.accent }}><Plus size={14} /> Add</button>
              </div>
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
