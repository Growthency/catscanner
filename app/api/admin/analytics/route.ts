import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { getGoogleAccessToken } from '@/lib/google-jwt'

export const maxDuration = 30

const num = (v: any) => Math.round(Number(v) || 0)

function rangeToDates(range: string): { startDate: string; endDate: string } {
  const d = new Date()
  const y = d.getFullYear(), m = d.getMonth()
  const iso = (dt: Date) => dt.toISOString().slice(0, 10)
  switch (range) {
    case '7d': return { startDate: '7daysAgo', endDate: 'today' }
    case 'thisMonth': return { startDate: iso(new Date(y, m, 1)), endDate: 'today' }
    case 'lastMonth': return { startDate: iso(new Date(y, m - 1, 1)), endDate: iso(new Date(y, m, 0)) }
    case '365d': return { startDate: '365daysAgo', endDate: 'today' }
    case 'lifetime': return { startDate: '2020-01-01', endDate: 'today' }
    case '30d':
    default: return { startDate: '30daysAgo', endDate: 'today' }
  }
}

// GET /api/admin/analytics?range=30d&metric=activeUsers — live GA4 data for the admin Dashboard.
export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const property = process.env.GA4_PROPERTY_ID
  if (!property || !process.env.GSC_SERVICE_ACCOUNT_JSON) return NextResponse.json({ connected: false })

  const token = await getGoogleAccessToken('https://www.googleapis.com/auth/analytics.readonly')
  if (!token) return NextResponse.json({ connected: false, error: 'Could not authenticate — check GSC_SERVICE_ACCOUNT_JSON.' })

  const sp = new URL(req.url).searchParams
  const range = sp.get('range') || '30d'
  const metric = ['activeUsers', 'sessions', 'screenPageViews'].includes(sp.get('metric') || '') ? (sp.get('metric') as string) : 'activeUsers'
  const dr = rangeToDates(range)

  async function run(body: any) {
    try {
      const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      if (!r.ok) return null
      return await r.json()
    } catch { return null }
  }

  const [summary, today, seven, chart, pages, countries] = await Promise.all([
    run({ dateRanges: [dr], metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }] }),
    run({ dateRanges: [{ startDate: 'today', endDate: 'today' }], metrics: [{ name: 'activeUsers' }] }),
    run({ dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }], metrics: [{ name: 'activeUsers' }] }),
    run({ dateRanges: [dr], dimensions: [{ name: 'date' }], metrics: [{ name: metric }], orderBys: [{ dimension: { dimensionName: 'date' } }], limit: 400 }),
    run({ dateRanges: [dr], dimensions: [{ name: 'pagePath' }], metrics: [{ name: 'screenPageViews' }], orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 25 }),
    run({ dateRanges: [dr], dimensions: [{ name: 'country' }], metrics: [{ name: 'activeUsers' }], orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }], limit: 25 }),
  ])

  if (!summary) {
    return NextResponse.json({ connected: false, error: 'GA4 returned an error. Confirm the service account is added to the GA4 property and GA4_PROPERTY_ID is the numeric ID.' })
  }

  const s = summary.rows?.[0]?.metricValues || []
  return NextResponse.json({
    connected: true,
    users: num(s[0]?.value),
    newUsers: num(s[1]?.value),
    sessions: num(s[2]?.value),
    pageViews: num(s[3]?.value),
    today: num(today?.rows?.[0]?.metricValues?.[0]?.value),
    users7d: num(seven?.rows?.[0]?.metricValues?.[0]?.value),
    chart: (chart?.rows || []).map((row: any) => ({ date: row.dimensionValues[0].value, value: num(row.metricValues[0].value) })),
    topPages: (pages?.rows || []).map((row: any) => ({ path: row.dimensionValues[0].value, views: num(row.metricValues[0].value) })),
    topCountries: (countries?.rows || []).map((row: any) => ({ name: row.dimensionValues[0].value, users: num(row.metricValues[0].value) })),
  })
}
