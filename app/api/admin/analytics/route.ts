import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { getGoogleAccessToken } from '@/lib/google-jwt'

export const maxDuration = 30
export const dynamic = 'force-dynamic'
export const revalidate = 0

const num = (v: any) => Math.round(Number(v) || 0)
const iso = (d: Date) => d.toISOString().slice(0, 10)
const normDate = (s: string) => (/^\d{8}$/.test(s) ? `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}` : s)

// Turn a sparse [{date,value}] list into a continuous series across the whole
// window (missing days filled with 0) so the chart always shows a full bar set
// instead of one stretched bar. Long windows bucket by week/month.
function buildSeries(sparse: { date: string; value: number }[], startDate: string, endDate: string): { date: string; value: number }[] {
  const map: Record<string, number> = {}
  for (const r of sparse) { const k = normDate(r.date); map[k] = (map[k] || 0) + (Number(r.value) || 0) }
  const days: string[] = []
  let t = Date.parse(`${startDate}T00:00:00Z`)
  const end = Date.parse(`${endDate}T00:00:00Z`)
  while (t <= end) { days.push(iso(new Date(t))); t += 86400000 }
  if (!days.length) return sparse
  const bucket: 'day' | 'week' | 'month' = days.length <= 70 ? 'day' : days.length <= 400 ? 'week' : 'month'
  if (bucket === 'day') return days.map((d) => ({ date: d, value: map[d] || 0 }))
  const agg: Record<string, number> = {}
  const order: string[] = []
  for (const d of days) {
    const ms = Date.parse(`${d}T00:00:00Z`)
    const key = bucket === 'week' ? iso(new Date(ms - ((new Date(ms).getUTCDay() + 6) % 7) * 86400000)) : `${d.slice(0, 7)}-01`
    if (!(key in agg)) { agg[key] = 0; order.push(key) }
    agg[key] += map[d] || 0
  }
  return order.map((k) => ({ date: k, value: agg[k] }))
}

function rangeToDates(range: string): { startDate: string; endDate: string } {
  const today = new Date()
  const daysAgo = (n: number) => iso(new Date(Date.now() - n * 86400000))
  switch (range) {
    case '7d': return { startDate: daysAgo(7), endDate: iso(today) }
    case 'thisMonth': return { startDate: iso(new Date(today.getFullYear(), today.getMonth(), 1)), endDate: iso(today) }
    case 'lastMonth': return { startDate: iso(new Date(today.getFullYear(), today.getMonth() - 1, 1)), endDate: iso(new Date(today.getFullYear(), today.getMonth(), 0)) }
    case '365d': return { startDate: daysAgo(365), endDate: iso(today) }
    case 'lifetime': return { startDate: '2020-01-01', endDate: iso(today) }
    case '30d':
    default: return { startDate: daysAgo(30), endDate: iso(today) }
  }
}

// GET /api/admin/analytics?range=30d — live GA4 + Search Console data for the admin Dashboard.
export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const property = process.env.GA4_PROPERTY_ID
  if (!property || !process.env.GSC_SERVICE_ACCOUNT_JSON) return NextResponse.json({ connected: false })

  const token = await getGoogleAccessToken('https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly')
  if (!token) return NextResponse.json({ connected: false, error: 'Could not authenticate — check GSC_SERVICE_ACCOUNT_JSON.' })

  const range = new URL(req.url).searchParams.get('range') || '30d'
  const dr = rangeToDates(range)
  const site = process.env.GSC_SITE_URL || 'https://catscanner.org/'
  let gscEmail = ''
  try { gscEmail = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON || '{}').client_email || '' } catch {}
  const gscState: { status: 'ok' | 'forbidden' | 'error' } = { status: 'error' }

  async function ga(body: any) {
    try {
      const r = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      return r.ok ? await r.json() : null
    } catch { return null }
  }
  async function searchConsoleDaily() {
    try {
      const r = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate: dr.startDate, endDate: dr.endDate, dimensions: ['date'], rowLimit: 500 }),
      })
      if (!r.ok) { gscState.status = r.status === 403 ? 'forbidden' : 'error'; return null }
      gscState.status = 'ok'
      const d = await r.json()
      return (d.rows || []).map((row: any) => ({ date: row.keys[0], value: num(row.clicks) }))
    } catch { gscState.status = 'error'; return null }
  }
  async function searchConsoleTop(dimension: 'query' | 'page') {
    try {
      const r = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
        method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate: dr.startDate, endDate: dr.endDate, dimensions: [dimension], rowLimit: 25 }),
      })
      if (!r.ok) return []
      const d = await r.json()
      return (d.rows || []).map((row: any) => ({ key: row.keys[0], clicks: num(row.clicks), impressions: num(row.impressions), ctr: row.ctr || 0, position: row.position || 0 }))
    } catch { return [] }
  }

  const [summary, today, seven, usersChart, pages, countries, clicksChart, searchKeywords, searchPages] = await Promise.all([
    ga({ dateRanges: [dr], metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }, { name: 'sessions' }, { name: 'screenPageViews' }] }),
    ga({ dateRanges: [{ startDate: 'today', endDate: 'today' }], metrics: [{ name: 'activeUsers' }] }),
    ga({ dateRanges: [{ startDate: iso(new Date(Date.now() - 7 * 86400000)), endDate: iso(new Date()) }], metrics: [{ name: 'activeUsers' }] }),
    ga({ dateRanges: [dr], dimensions: [{ name: 'date' }], metrics: [{ name: 'activeUsers' }], orderBys: [{ dimension: { dimensionName: 'date' } }], limit: 500 }),
    ga({ dateRanges: [dr], dimensions: [{ name: 'pagePath' }], metrics: [{ name: 'screenPageViews' }], orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 25 }),
    ga({ dateRanges: [dr], dimensions: [{ name: 'country' }], metrics: [{ name: 'activeUsers' }], orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }], limit: 25 }),
    searchConsoleDaily(),
    searchConsoleTop('query'),
    searchConsoleTop('page'),
  ])

  if (!summary) {
    return NextResponse.json({ connected: false, error: 'GA4 returned an error. Confirm the service account is added to the GA4 property and GA4_PROPERTY_ID is the numeric ID.' })
  }

  const s = summary.rows?.[0]?.metricValues || []
  const usersSeries = buildSeries((usersChart?.rows || []).map((row: any) => ({ date: row.dimensionValues[0].value, value: num(row.metricValues[0].value) })), dr.startDate, dr.endDate)
  let clicksSeries = buildSeries(clicksChart || [], dr.startDate, dr.endDate)
  // Search Console data lags ~2-3 days; drop the empty trailing days so the
  // clicks chart ends at the latest day that actually has data.
  const lastClickIdx = clicksSeries.reduce((acc, c, i) => (c.value > 0 ? i : acc), -1)
  if (lastClickIdx >= 0 && lastClickIdx < clicksSeries.length - 1) clicksSeries = clicksSeries.slice(0, lastClickIdx + 1)
  return NextResponse.json({
    connected: true,
    ga4Connected: true,
    gscConnected: gscState.status === 'ok',
    gscStatus: gscState.status,
    gscEmail,
    gscSite: site,
    users: num(s[0]?.value), newUsers: num(s[1]?.value), sessions: num(s[2]?.value), pageViews: num(s[3]?.value),
    today: num(today?.rows?.[0]?.metricValues?.[0]?.value),
    users7d: num(seven?.rows?.[0]?.metricValues?.[0]?.value),
    usersChart: usersSeries,
    clicksChart: clicksSeries,
    topPages: (pages?.rows || []).map((row: any) => ({ path: row.dimensionValues[0].value, views: num(row.metricValues[0].value) })),
    topCountries: (countries?.rows || []).map((row: any) => ({ name: row.dimensionValues[0].value, users: num(row.metricValues[0].value) })),
    searchKeywords: searchKeywords || [],
    searchPages: searchPages || [],
  })
}
