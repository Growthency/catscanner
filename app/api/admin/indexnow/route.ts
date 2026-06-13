import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'

// Self-hosted IndexNow key (also served at /<KEY>.txt from /public).
const KEY = '8f2a9c4e7b1d6053a8e2f9c4b7d1e60a'
const HOST = (process.env.GSC_SITE_URL || 'https://catscanner.org')
  .replace(/^https?:\/\//, '').replace(/\/$/, '')

// POST /api/admin/indexnow { urls: string[] } — notify Bing/Yandex/etc. via IndexNow.
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { urls } = await req.json()
  if (!Array.isArray(urls) || !urls.length) {
    return NextResponse.json({ error: 'No URLs to submit' }, { status: 400 })
  }

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: urls.slice(0, 100),
      }),
    })
    // IndexNow returns 200 or 202 on success.
    return NextResponse.json({ ok: res.status === 200 || res.status === 202, status: res.status, submitted: Math.min(urls.length, 100) })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || 'Submit failed' }, { status: 500 })
  }
}
