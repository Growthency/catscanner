'use client'
import { ADMIN as C } from '@/lib/admin-theme'
import { AlertTriangle } from 'lucide-react'

// Custom (site-styled) replacement for window.confirm — no default browser dialog.
export default function ConfirmDialog({
  open, title, message, confirmLabel = 'Delete', danger = true, onConfirm, onCancel,
}: {
  open: boolean
  title?: string
  message: string
  confirmLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.45)' }} onClick={onCancel}>
      <div className="w-full max-w-sm rounded-2xl p-6 animate-fade-up" style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: danger ? '#fef2f2' : C.accentBg, color: danger ? '#ef4444' : C.accent }}>
            <AlertTriangle size={20} />
          </div>
          <h3 className="text-base font-bold" style={{ color: C.text }}>{title || 'Are you sure?'}</h3>
        </div>
        <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>{message}</p>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ border: `1px solid ${C.border}`, color: C.muted, background: C.card }}>Cancel</button>
          <button type="button" onClick={onConfirm} className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: danger ? '#ef4444' : C.accent }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
