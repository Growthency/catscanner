import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { getGoogleAccessToken } from '@/lib/google-jwt'

export const maxDuration = 60

type Result = { url: string; coverageState: string; indexed: boolean }

// POST /api/admin/index-status { urls } — Google index status via the Search Console
// URL Inspection API. Needs GSC_SERVICE_ACCOUNT_JSON (owner access on the property).
export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { urls } = await req.json()
  if (!Array.isArray(urls)) return NextResponse.json({ error: 'urls must be an array' }, { status: 400 })

  if (!process.env.GSC_SERVICE_ACCOUNT_JSON) {
    return NextResponse.json({ connected: false, results: [] })
  }
  const token = await getGoogleAccessToken('https://www.googleapis.com/auth/webmasters.readonly')
  if (!token) {
    return NextResponse.json({ connected: false, results: [], error: 'Could not authenticate. Check GSC_SERVICE_ACCOUNT_JSON.' })
  }

  const site = process.env.GSC_SITE_URL || 'https://catscanner.org/'
  const results: Result[] = []

  for (const url of urls.slice(0, 8)) {
    try {
      const r = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ inspectionUrl: url, siteUrl: site }),
      })
      if (!r.ok) {
        const msg = r.status === 403 ? 'Add the service account as an OWNER in Search Console' : `API ${r.status}`
        return NextResponse.json({ connected: false, results: [], error: msg })
      }
      const d = await r.json()
      const idx = d.inspectionResult?.indexStatusResult || {}
      const coverageState = idx.coverageState || 'Unknown'
      const indexed = idx.verdict === 'PASS' || /^submitted and indexed/i.test(coverageState) || /indexed/i.test(coverageState) && !/not indexed/i.test(coverageState)
      results.push({ url, coverageState, indexed: !!indexed })
    } catch {
      results.push({ url, coverageState: 'Error', indexed: false })
    }
  }

  return NextResponse.json({ connected: true, results })
}
