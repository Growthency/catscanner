'use client'
import { useRef, useEffect, useState } from 'react'
import { ADMIN as C } from '@/lib/admin-theme'
import ImageUpload from './ImageUpload'
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  Link2, Heading2, Heading3, Heading4, Pilcrow, Code, Image as ImageIcon, Quote, Upload, X, Check,
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
  const ref = useRef<HTMLDivElement>(null)
  const htmlFileRef = useRef<HTMLInputElement>(null)
  const savedRange = useRef<Range | null>(null)
  const [showHtml, setShowHtml] = useState(false)
  const [panel, setPanel] = useState<null | 'link' | 'image'>(null)
  const [linkUrl, setLinkUrl] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [imgAlt, setImgAlt] = useState('')
  const [imgCaption, setImgCaption] = useState('')

  // Seed the editor with the loaded HTML (on mount and when toggling back from HTML view).
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

  // Save / restore the caret so inserting a link or image lands where the cursor
  // was (focusing a panel input would otherwise lose the selection → jump to top).
  function saveSel() {
    const sel = window.getSelection()
    savedRange.current = sel && sel.rangeCount && ref.current?.contains(sel.anchorNode) ? sel.getRangeAt(0).cloneRange() : null
  }
  function restoreSel() {
    ref.current?.focus()
    const sel = window.getSelection()
    if (sel && savedRange.current) { sel.removeAllRanges(); sel.addRange(savedRange.current) }
  }

  function openLink() { saveSel(); setLinkUrl(''); setPanel('link') }
  function applyLink() {
    const url = linkUrl.trim()
    if (!url) { setPanel(null); return }
    restoreSel()
    const sel = window.getSelection()
    if (sel && sel.rangeCount && !sel.getRangeAt(0).collapsed) document.execCommand('createLink', false, url)
    else document.execCommand('insertHTML', false, `<a href="${esc(url)}">${esc(url)}</a>`)
    setPanel(null); setLinkUrl(''); sync()
  }

  function openImage() { saveSel(); setImgUrl(''); setImgAlt(''); setImgCaption(''); setPanel('image') }
  function applyImage() {
    const url = imgUrl.trim()
    if (!url) return
    restoreSel()
    document.execCommand('insertHTML', false, buildFigure(url, imgAlt, imgCaption) + '<p><br/></p>')
    setPanel(null); sync()
  }

  // Load a raw .html file straight into the editor content.
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

  return (
    <div className="rounded-xl" style={{ border: `1px solid ${C.border}` }}>
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
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); applyLink() } if (e.key === 'Escape') setPanel(null) }}
            placeholder="https://example.com or /your-slug"
            className="flex-1 min-w-[200px] px-3 py-2 rounded-lg outline-none text-sm" style={inp} />
          <button type="button" onClick={applyLink} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-white" style={{ background: C.accent }}><Check size={14} /> Insert link</button>
          <button type="button" onClick={() => setPanel(null)} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm" style={{ border: `1px solid ${C.border}`, color: C.muted }}><X size={14} /> Cancel</button>
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
        <div ref={ref} contentEditable suppressContentEditableWarning onInput={sync} onMouseUp={sync} onBlur={sync}
          className="post-body w-full p-4 outline-none rounded-b-xl" data-placeholder="Write your article here…"
          style={{ minHeight: 360, maxHeight: 460, overflowY: 'auto', background: C.card, color: C.text }} />
      )}
    </div>
  )
}
