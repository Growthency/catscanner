'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import { ADMIN as C } from '@/lib/admin-theme'
import ImageUpload from './ImageUpload'
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered, Link2, Heading2, Heading3,
  Heading4, Pilcrow, Code, Image as ImageIcon, Quote, Upload, X, Check, Trash2, Pencil, ExternalLink,
} from 'lucide-react'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Inserted images are wrapped in a resizable <figure> — drag the bottom-right
// corner to resize; the chosen width is saved inline so it renders the same live.
function buildFigure(url: string, alt: string, caption: string): string {
  const cap = caption.trim()
    ? `<figcaption style="text-align:center;font-size:0.85em;color:#94a3b8;margin-top:6px">${esc(caption.trim())}</figcaption>`
    : ''
  return `<figure style="max-width:100%;resize:horizontal;overflow:hidden;margin:0.9em 0"><img src="${esc(url)}" alt="${esc(alt)}" style="width:100%;height:auto;display:block;border-radius:8px"/>${cap}</figure>`
}

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const htmlFileRef = useRef<HTMLInputElement>(null)
  const savedRange = useRef<Range | null>(null)
  const editLinkEl = useRef<HTMLAnchorElement | null>(null)
  const selEl = useRef<HTMLElement | null>(null)
  const [showHtml, setShowHtml] = useState(false)
  const [panel, setPanel] = useState<null | 'link' | 'image'>(null)
  const [linkUrl, setLinkUrl] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [imgAlt, setImgAlt] = useState('')
  const [imgCaption, setImgCaption] = useState('')
  // Floating control shown when an existing image / link is clicked.
  const [sel, setSel] = useState<{ type: 'img' | 'link'; top: number; left: number; width: number } | null>(null)
  const [selAlt, setSelAlt] = useState('')
  const [selHref, setSelHref] = useState('')

  useEffect(() => {
    if (!showHtml && ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value || ''
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHtml])

  const sync = () => { if (ref.current) onChange(ref.current.innerHTML) }

  function exec(cmd: string, arg?: string) {
    document.execCommand(cmd, false, arg)
    sync()
    ref.current?.focus()
  }

  function saveSel() {
    const s = window.getSelection()
    savedRange.current = s && s.rangeCount && ref.current?.contains(s.anchorNode) ? s.getRangeAt(0).cloneRange() : null
  }
  function restoreSel() {
    ref.current?.focus()
    const s = window.getSelection()
    if (s && savedRange.current) { s.removeAllRanges(); s.addRange(savedRange.current) }
  }

  // ── Floating control for a clicked image / link ──
  const computePos = useCallback((el: HTMLElement) => {
    const wrap = wrapRef.current, body = ref.current
    if (!wrap || !body) return null
    const wr = wrap.getBoundingClientRect(), br = body.getBoundingClientRect(), r = el.getBoundingClientRect()
    if (r.bottom < br.top + 6 || r.top > br.bottom - 6) return null // scrolled out of view
    return { top: Math.min(r.bottom, br.bottom) - wr.top, left: Math.max(8, r.left - wr.left), width: r.width }
  }, [])

  function onBodyClick(e: React.MouseEvent) {
    const t = e.target as HTMLElement
    if (t.tagName === 'IMG') {
      selEl.current = t; setSelAlt((t as HTMLImageElement).alt || '')
      const p = computePos(t); setSel(p ? { type: 'img', ...p } : null)
      return
    }
    const a = t.closest?.('a') as HTMLAnchorElement | null
    if (a && ref.current?.contains(a)) {
      selEl.current = a; setSelHref(a.getAttribute('href') || '')
      const p = computePos(a); setSel(p ? { type: 'link', ...p } : null)
      return
    }
    setSel(null); selEl.current = null
  }

  const reposition = useCallback(() => {
    if (!selEl.current) return
    const p = computePos(selEl.current)
    if (!p) { selEl.current = null; setSel(null); return }
    setSel((s) => (s ? { ...s, ...p } : null))
  }, [computePos])

  function setImageAlt(v: string) { setSelAlt(v); if (selEl.current) { (selEl.current as HTMLImageElement).alt = v; sync() } }
  function deleteImage() { const el = selEl.current; (el?.closest('figure') || el)?.remove(); setSel(null); selEl.current = null; sync(); ref.current?.focus() }
  function openExternal() { const h = selEl.current?.getAttribute('href'); if (h) window.open(h, '_blank', 'noopener') }
  function removeLink() { const a = selEl.current; if (a) a.replaceWith(document.createTextNode(a.textContent || '')); setSel(null); selEl.current = null; sync(); ref.current?.focus() }
  function editLink() { editLinkEl.current = selEl.current as HTMLAnchorElement; setLinkUrl(selEl.current?.getAttribute('href') || ''); setSel(null); setPanel('link') }

  function openLink() { editLinkEl.current = null; setSel(null); saveSel(); setLinkUrl(''); setPanel('link') }
  function applyLink() {
    const url = linkUrl.trim()
    if (!url) { setPanel(null); editLinkEl.current = null; return }
    if (editLinkEl.current) { editLinkEl.current.setAttribute('href', url); editLinkEl.current = null; setPanel(null); setLinkUrl(''); sync(); return }
    restoreSel()
    const s = window.getSelection()
    if (s && s.rangeCount && !s.getRangeAt(0).collapsed) document.execCommand('createLink', false, url)
    else document.execCommand('insertHTML', false, `<a href="${esc(url)}">${esc(url)}</a>`)
    setPanel(null); setLinkUrl(''); sync()
  }

  function openImage() { setSel(null); saveSel(); setImgUrl(''); setImgAlt(''); setImgCaption(''); setPanel('image') }
  function applyImage() {
    const url = imgUrl.trim()
    if (!url) return
    restoreSel()
    document.execCommand('insertHTML', false, buildFigure(url, imgAlt, imgCaption) + '<p><br/></p>')
    setPanel(null); sync()
  }

  function uploadHtml(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => { const text = String(reader.result || ''); onChange(text); if (ref.current && !showHtml) ref.current.innerHTML = text }
    reader.readAsText(file)
    e.target.value = ''
  }

  function Btn({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
    return (
      <button type="button" title={title} onMouseDown={(e) => e.preventDefault()} onClick={onClick}
        className="w-8 h-8 flex items-center justify-center rounded hover:bg-black/5 transition-colors" style={{ color: C.muted }}>
        {children}
      </button>
    )
  }
  const Divider = () => <span style={{ width: 1, height: 18, background: C.border, margin: '0 3px' }} />
  const inp = { background: C.card, border: `1px solid ${C.border}`, color: C.text }
  const floatStyle: React.CSSProperties = { position: 'absolute', zIndex: 30, background: C.card, border: `1px solid ${C.border}`, boxShadow: '0 8px 24px rgba(0,0,0,0.14)', borderRadius: 10 }

  return (
    <div ref={wrapRef} className="rounded-xl relative" style={{ border: `1px solid ${C.border}` }}>
      {/* Toolbar — sticks to the top while you scroll the content */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 sticky top-0 z-20 rounded-t-xl" style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <Btn title="Heading 2" onClick={() => exec('formatBlock', 'H2')}><Heading2 size={16} /></Btn>
        <Btn title="Heading 3" onClick={() => exec('formatBlock', 'H3')}><Heading3 size={16} /></Btn>
        <Btn title="Heading 4" onClick={() => exec('formatBlock', 'H4')}><Heading4 size={16} /></Btn>
        <Btn title="Paragraph" onClick={() => exec('formatBlock', 'P')}><Pilcrow size={16} /></Btn>
        <Divider />
        <Btn title="Bold" onClick={() => exec('bold')}><Bold size={16} /></Btn>
        <Btn title="Italic" onClick={() => exec('italic')}><Italic size={16} /></Btn>
        <Btn title="Underline" onClick={() => exec('underline')}><Underline size={16} /></Btn>
        <Btn title="Strikethrough" onClick={() => exec('strikeThrough')}><Strikethrough size={16} /></Btn>
        <Divider />
        <Btn title="Bullet list" onClick={() => exec('insertUnorderedList')}><List size={16} /></Btn>
        <Btn title="Numbered list" onClick={() => exec('insertOrderedList')}><ListOrdered size={16} /></Btn>
        <Btn title="Quote" onClick={() => exec('formatBlock', 'BLOCKQUOTE')}><Quote size={16} /></Btn>
        <Divider />
        <Btn title="Insert link" onClick={openLink}><Link2 size={16} /></Btn>
        <Btn title="Insert image" onClick={openImage}><ImageIcon size={16} /></Btn>
        <span style={{ flex: 1 }} />
        <input ref={htmlFileRef} type="file" accept=".html,.htm,text/html" onChange={uploadHtml} style={{ display: 'none' }} />
        <button type="button" onClick={() => htmlFileRef.current?.click()} title="Upload an HTML file"
          className="flex items-center gap-1 px-2 h-8 rounded text-xs font-medium transition-colors" style={{ color: C.muted }}>
          <Upload size={14} /> HTML file
        </button>
        <button type="button" onClick={() => setShowHtml((s) => !s)}
          className="flex items-center gap-1 px-2 h-8 rounded text-xs font-medium transition-colors"
          style={{ color: showHtml ? C.accent : C.muted, background: showHtml ? C.accentBg : 'transparent' }}>
          <Code size={14} /> HTML
        </button>
      </div>

      {/* Insert-link panel */}
      {panel === 'link' && (
        <div className="flex flex-wrap items-center gap-2 px-3 py-2.5" style={{ background: C.card, borderBottom: `1px solid ${C.border}` }}>
          <input autoFocus value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); applyLink() } if (e.key === 'Escape') { setPanel(null); editLinkEl.current = null } }}
            placeholder="https://example.com or /your-slug"
            className="flex-1 min-w-[200px] px-3 py-2 rounded-lg outline-none text-sm" style={inp} />
          <button type="button" onClick={applyLink} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white" style={{ background: C.accent }}><Check size={14} /> {editLinkEl.current ? 'Update link' : 'Insert link'}</button>
          <button type="button" onClick={() => { setPanel(null); editLinkEl.current = null }} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm" style={{ border: `1px solid ${C.border}`, color: C.muted }}><X size={14} /> Cancel</button>
        </div>
      )}

      {/* Insert-image panel */}
      {panel === 'image' && (
        <div className="px-3 py-3 space-y-2" style={{ background: C.card, borderBottom: `1px solid ${C.border}` }}>
          <div className="flex flex-wrap items-center gap-2">
            <input autoFocus value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder="Image URL — or upload →"
              className="flex-1 min-w-[180px] px-3 py-2 rounded-lg outline-none text-sm" style={inp} />
            <ImageUpload label="Upload" onUploaded={(url) => setImgUrl(url)} />
          </div>
          {imgUrl && <img src={imgUrl} alt="" className="max-h-32 rounded-lg" style={{ border: `1px solid ${C.border}` }} />}
          <input value={imgAlt} onChange={(e) => setImgAlt(e.target.value)} placeholder="Alt text — describe the image (good for SEO & accessibility)"
            className="w-full px-3 py-2 rounded-lg outline-none text-sm" style={inp} />
          <input value={imgCaption} onChange={(e) => setImgCaption(e.target.value)} placeholder="Caption (optional — shown under the image)"
            className="w-full px-3 py-2 rounded-lg outline-none text-sm" style={inp} />
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={applyImage} disabled={!imgUrl.trim()} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50" style={{ background: C.accent }}><Check size={14} /> Insert image</button>
            <button type="button" onClick={() => setPanel(null)} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm" style={{ border: `1px solid ${C.border}`, color: C.muted }}><X size={14} /> Cancel</button>
            <span className="text-xs" style={{ color: C.faint }}>After inserting, drag the image&apos;s bottom-right corner to resize.</span>
          </div>
        </div>
      )}

      {/* Editor body — fixed height with its own scrollbar */}
      {showHtml ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false}
          className="w-full p-4 outline-none font-mono text-xs leading-relaxed rounded-b-xl"
          style={{ minHeight: 360, maxHeight: 460, background: C.card, color: C.text, resize: 'vertical', display: 'block' }} />
      ) : (
        <div ref={ref} contentEditable suppressContentEditableWarning
          onInput={() => { sync(); reposition() }} onMouseUp={sync} onBlur={sync} onClick={onBodyClick} onScroll={reposition}
          className="post-body w-full p-4 outline-none rounded-b-xl" data-placeholder="Write your article here…"
          style={{ minHeight: 360, maxHeight: 460, overflowY: 'auto', background: C.card, color: C.text }} />
      )}

      {/* Floating control — image (ALT + delete) */}
      {sel?.type === 'img' && (
        <div style={{ ...floatStyle, top: sel.top + 6, left: sel.left, width: Math.max(260, Math.min(sel.width, 560)) }} className="flex items-center gap-2 px-2 py-1.5">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: C.accentBg, color: C.accent }}>ALT</span>
          <input value={selAlt} onChange={(e) => setImageAlt(e.target.value)} placeholder="Describe this image (alt text)"
            className="flex-1 min-w-0 px-2 py-1.5 rounded-md outline-none text-sm" style={inp} />
          <button type="button" onClick={deleteImage} title="Delete image" className="w-8 h-8 flex items-center justify-center rounded-md shrink-0" style={{ color: '#ef4444' }}><Trash2 size={16} /></button>
          <button type="button" onClick={() => setSel(null)} title="Close" className="w-8 h-8 flex items-center justify-center rounded-md shrink-0" style={{ color: C.muted }}><X size={16} /></button>
        </div>
      )}

      {/* Floating control — link (url + edit + open + remove) */}
      {sel?.type === 'link' && (
        <div style={{ ...floatStyle, top: sel.top + 6, left: sel.left, maxWidth: 380 }} className="flex items-center gap-1 px-2 py-1.5">
          <span className="text-sm truncate max-w-[180px]" style={{ color: C.accent }} title={selHref}>{selHref || '(no URL)'}</span>
          <Divider />
          <button type="button" onClick={editLink} title="Change link" className="w-8 h-8 flex items-center justify-center rounded-md" style={{ color: C.muted }}><Pencil size={15} /></button>
          <button type="button" onClick={openExternal} title="Open in new tab" className="w-8 h-8 flex items-center justify-center rounded-md" style={{ color: C.muted }}><ExternalLink size={15} /></button>
          <button type="button" onClick={removeLink} title="Remove link" className="w-8 h-8 flex items-center justify-center rounded-md" style={{ color: '#ef4444' }}><X size={15} /></button>
        </div>
      )}
    </div>
  )
}
