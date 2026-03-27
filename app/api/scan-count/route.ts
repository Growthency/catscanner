import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

function getIP(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1'
}

export async function GET(req: NextRequest) {
  const ip = getIP(req)
  const supabase = createServerClient()

  const { data } = await supabase
    .from('ip_usage')
    .select('count')
    .eq('ip_address', ip)
    .single()

  return NextResponse.json({ count: data?.count ?? 0 })
}
