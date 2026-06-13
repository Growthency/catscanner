import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { createServerClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/admin-auth'

// POST /api/admin/upload — store an (already WebP) image in the `uploads` bucket
// and return its public URL. Admin only.
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const form = await req.formData()
  const file = form.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const name = `${randomUUID()}.webp`
  const supabase = createServerClient()
  const { error } = await supabase.storage
    .from('uploads')
    .upload(name, await file.arrayBuffer(), { contentType: 'image/webp', upsert: false })

  if (error) {
    const hint = /bucket/i.test(error.message) ? ' (create a public "uploads" bucket in Supabase Storage)' : ''
    return NextResponse.json({ error: error.message + hint }, { status: 400 })
  }

  const { data } = supabase.storage.from('uploads').getPublicUrl(name)
  return NextResponse.json({ url: data.publicUrl })
}
