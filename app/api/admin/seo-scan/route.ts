import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { analyzePage, type PageResult } from '@/lib/seo-checks'

export const maxDuration = 60

// POST /api/admin/seo-scan { urls: string[] } — fetch & analyze a batch of pages.
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { urls } = await req.json()
  if (!Array.isArray(urls)) {
    return NextResponse.json({ error: 'urls must be an array' }, { status: 400 })
  }

  const batch = urls.slice(0, 10)
  const results: PageResult[] = await Promise.all(
    batch.map(async (url: string): Promise<PageResult> => {
      try {
        const res = await fetch(url, {
          headers: { 'user-agent': 'CatScannerSEOBot/1.0' },
          redirect: 'follow',
        })
        const html = await res.text()
        return analyzePage(html, url, res.status)
      } catch {
        return {
          url, path: url, ok: false, status: 0, score: 0, passed: 0, total: 1,
          categories: {}, issues: [{ category: 'Technical', level: 'critical', message: `Could not fetch ${url}` }],
        }
      }
    })
  )

  return NextResponse.json({ results })
}
