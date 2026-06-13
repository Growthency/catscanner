'use client'
import { useRef, useEffect, useState } from 'react'
import { ADMIN as C } from '@/lib/admin-theme'
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  Link2, Heading2, Heading3, Heading4, Pilcrow, Code, Image as ImageIcon, Quote,
} from 'lucide-react'

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [showHtml, setShowHtml] = useState(false)

  // Seed the editor with the initial/loaded HTML (runs on mount and when toggling back from HTML view).
  useEffect(() => {
    if (!showHtml && ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHtml])

  function exec(cmd: string, arg?: string) {
    document.execCommand(cmd, false, arg)
    if (ref.current) onChange(ref.current.innerHTML)
    ref.current?.focus()
  }

  function Btn({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
    return (
      <button
        type="button"
        title={title}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClick}
        className="w-8 h-8 flex items-center justify-center rounded hover:bg-black/5 transition-colors"
        style={{ color: C.muted }}
      >
        {children}
      </button>
    )
  }

  const Divider = () => <span style={{ width: 1, height: 18, background: C.border, margin: '0 3px' }} />

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5" style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
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
        <Btn title="Insert link" onClick={() => { const url = window.prompt('Link URL:'); if (url) exec('createLink', url) }}><Link2 size={16} /></Btn>
        <Btn title="Insert image" onClick={() => { const url = window.prompt('Image URL:'); if (url) exec('insertImage', url) }}><ImageIcon size={16} /></Btn>
        <span style={{ flex: 1 }} />
        <button
          type="button"
          onClick={() => setShowHtml((s) => !s)}
          className="flex items-center gap-1 px-2 h-8 rounded text-xs font-medium transition-colors"
          style={{ color: showHtml ? C.accent : C.muted, background: showHtml ? C.accentBg : 'transparent' }}
        >
          <Code size={14} /> HTML
        </button>
      </div>

      {/* Editor body */}
      {showHtml ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="w-full p-4 outline-none font-mono text-xs leading-relaxed"
          style={{ minHeight: 360, background: C.card, color: C.text, resize: 'vertical', display: 'block' }}
        />
      ) : (
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={() => ref.current && onChange(ref.current.innerHTML)}
          className="post-body w-full p-4 outline-none"
          data-placeholder="Write your article here…"
          style={{ minHeight: 360, background: C.card, color: C.text }}
        />
      )}
    </div>
  )
}
