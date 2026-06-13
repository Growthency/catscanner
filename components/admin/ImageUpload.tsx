'use client'
import { useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ADMIN as C } from '@/lib/admin-theme'
import { Upload, Loader2 } from 'lucide-react'

// Convert ANY browser-decodable image to WebP (resized to fit 1600px), client-side.
async function toWebp(file: File): Promise<Blob> {
  const img = document.createElement('img')
  const url = URL.createObjectURL(file)
  try {
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('Could not read that image'))
      img.src = url
    })
    const max = 1600
    let { width, height } = img
    if (width > max || height > max) {
      if (width >= height) { height = Math.round((height / width) * max); width = max }
      else { width = Math.round((width / height) * max); height = max }
    }
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Conversion failed'))), 'image/webp', 0.85)
    )
  } finally {
    URL.revokeObjectURL(url)
  }
}

export default function ImageUpload({ onUploaded, label = 'Upload' }: { onUploaded: (url: string) => void; label?: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function handle(file: File) {
    setBusy(true); setErr(null)
    try {
      const webp = await toWebp(file)
      const { data: { session } } = await supabase.auth.getSession()
      const fd = new FormData()
      fd.append('file', webp, 'image.webp')
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session?.access_token}` },
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      onUploaded(data.url)
    } catch (e: any) {
      setErr(e.message || 'Upload failed')
    }
    setBusy(false)
  }

  return (
    <span className="inline-flex items-center gap-2">
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handle(f); e.target.value = '' }} />
      <button type="button" onClick={() => inputRef.current?.click()} disabled={busy}
        title="Upload image (auto-converted to WebP)"
        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap disabled:opacity-60"
        style={{ background: C.accentBg, color: C.accent, border: `1px solid ${C.accent}` }}>
        {busy ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}{label && ` ${label}`}
      </button>
      {err && <span className="text-xs" style={{ color: '#ef4444' }}>{err}</span>}
    </span>
  )
}
