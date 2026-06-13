import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { getGoogleAccessToken } from '@/lib/google-jwt'

function ymd(d: Date) { return d.toISOString().slice(0, 10) }

// GET /api/admin/search-queries — top 100 search queries from the last 28 days (Search Console API).
export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!process.env.GSC_SERVICE_ACCOUNT_JSON) {
    return NextResponse.json({ connected: false, queries: [] })
  }

  const token = await getGoogleAccessToken('https://www.googleapis.com/auth/webmasters.readonly')
  if (!token) {
    return NextResponse.json({ connected: false, queries: [], error: 'Could not authenticate. Check the GSC_SERVICE_ACCOUNT_JSON value.' })
  }

  const site = process.env.GSC_SITE_URL || 'https://catscanner.org/'
  const end = new Date()
  const start = new Date(Date.now() - 28 * 86400000)

  try {
    const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate: ymd(start), endDate: ymd(end), dimensions: ['query'], rowLimit: 100 }),
    })
    if (!res.ok) {
      return NextResponse.json({
        connected: false, queries: [],
        error: `Search Console API returned ${res.status}. Make sure the service-account email is added as a user on this property in Search Console.`,
      })
    }
    const data = await res.json()
    const queries = (data.rows || []).map((r: any) => ({
      query: r.keys?.[0] || '',
      clicks: r.clicks || 0,
      impressions: r.impressions || 0,
      position: r.position || 0,
      ctr: r.ctr || 0,
    }))
    return NextResponse.json({ connected: true, queries })
  } catch (e: any) {
    return NextResponse.json({ connected: false, queries: [], error: e.message || 'Request failed' })
  }
}
