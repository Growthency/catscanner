import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Verify the caller is a logged-in admin.
// The client sends the Supabase access token as `Authorization: Bearer <token>`.
// If NEXT_PUBLIC_ADMIN_EMAILS is set, only those emails pass; otherwise any
// authenticated user passes (matches the client-side /admin gate).
export async function requireAdmin(req: NextRequest): Promise<boolean> {
  const header = req.headers.get('authorization')
  if (!header?.startsWith('Bearer ')) return false
  const token = header.slice(7)

  const anon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )
  const { data: { user }, error } = await anon.auth.getUser(token)
  if (error || !user) return false

  const allow = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  if (allow.length === 0) return true
  return allow.includes((user.email || '').toLowerCase())
}
