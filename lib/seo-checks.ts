// Lightweight, dependency-free SEO analysis of a page's raw HTML.

export type CheckLevel = 'critical' | 'warning' | 'info'
export type Issue = { category: string; level: CheckLevel; message: string }
export type PageResult = {
  url: string
  path: string
  ok: boolean
  status: number
  score: number
  passed: number
  total: number
  categories: Record<string, { passed: number; total: number }>
  issues: Issue[]
}

export const SEO_CATEGORIES = [
  'Meta Tags', 'Open Graph', 'Twitter Cards', 'Headings',
  'Images', 'Structured Data', 'Technical', 'Performance', 'Internal Links',
]

function parseMetas(html: string): Record<string, string>[] {
  const metas: Record<string, string>[] = []
  const tagRe = /<meta\b[^>]*>/gi
  let m: RegExpExecArray | null
  while ((m = tagRe.exec(html))) {
    const attrs: Record<string, string> = {}
    const attrRe = /([\w:-]+)\s*=\s*["']([^"']*)["']/g
    let a: RegExpExecArray | null
    while ((a = attrRe.exec(m[0]))) attrs[a[1].toLowerCase()] = a[2]
    metas.push(attrs)
  }
  return metas
}

export function analyzePage(html: string, url: string, status = 200): PageResult {
  let path = url
  try { path = new URL(url).pathname } catch {}

  const metas = parseMetas(html)
  const byName = (n: string) => metas.find((m) => m.name === n)?.content || ''
  const byProp = (p: string) => metas.find((m) => m.property === p)?.content || ''

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim() : ''
  const desc = byName('description')
  const h1 = (html.match(/<h1[\s/>]/gi) || []).length
  const h2 = (html.match(/<h2[\s/>]/gi) || []).length
  const imgTotal = (html.match(/<img\b/gi) || []).length
  const imgWithAlt = (html.match(/<img\b[^>]*\salt\s*=\s*["'][^"']+["']/gi) || []).length
  const scripts = (html.match(/<script\b/gi) || []).length
  const internalLinks = (html.match(/<a\b[^>]+href\s*=\s*["'](\/(?!\/)|https?:\/\/(?:www\.)?catscanner\.org)[^"']*["']/gi) || []).length
  const sizeKb = Math.round(html.length / 1024)

  const issues: Issue[] = []
  const categories: Record<string, { passed: number; total: number }> = {}

  function run(name: string, checks: { ok: boolean; level: CheckLevel; msg: string }[]) {
    categories[name] = { passed: checks.filter((c) => c.ok).length, total: checks.length }
    for (const c of checks) if (!c.ok) issues.push({ category: name, level: c.level, message: `${c.msg} — ${path}` })
  }

  run('Meta Tags', [
    { ok: title.length > 0, level: 'critical', msg: 'Missing <title>' },
    { ok: title.length >= 20 && title.length <= 65, level: 'warning', msg: `Title length ${title.length} (aim 20–65)` },
    { ok: desc.length > 0, level: 'warning', msg: 'Missing meta description' },
    { ok: desc.length >= 50 && desc.length <= 170, level: 'info', msg: `Description length ${desc.length} (aim 50–170)` },
    { ok: /<link[^>]+rel=["']canonical["']/i.test(html), level: 'info', msg: 'Missing canonical link' },
  ])

  run('Open Graph', [
    { ok: !!byProp('og:title'), level: 'warning', msg: 'Missing og:title' },
    { ok: !!byProp('og:description'), level: 'info', msg: 'Missing og:description' },
    { ok: !!byProp('og:image'), level: 'warning', msg: 'Missing og:image' },
    { ok: !!byProp('og:type'), level: 'info', msg: 'Missing og:type' },
  ])

  run('Twitter Cards', [
    { ok: !!byName('twitter:card'), level: 'info', msg: 'Missing twitter:card' },
    { ok: !!byName('twitter:title'), level: 'info', msg: 'Missing twitter:title' },
    { ok: !!byName('twitter:image'), level: 'info', msg: 'Missing twitter:image' },
  ])

  run('Headings', [
    { ok: h1 >= 1, level: 'critical', msg: 'No <h1> found' },
    { ok: h1 <= 1, level: 'warning', msg: `Multiple <h1> tags (${h1})` },
    { ok: h2 >= 1, level: 'info', msg: 'No <h2> subheadings' },
  ])

  run('Images', imgTotal === 0
    ? [{ ok: true, level: 'info', msg: '' }]
    : [{ ok: imgWithAlt === imgTotal, level: 'warning', msg: `${imgTotal - imgWithAlt}/${imgTotal} images missing alt text` }])

  run('Structured Data', [
    { ok: /application\/ld\+json/i.test(html), level: 'warning', msg: 'No JSON-LD structured data' },
  ])

  run('Technical', [
    { ok: /<html[^>]+\blang\s*=/i.test(html), level: 'warning', msg: 'Missing <html lang>' },
    { ok: /charset/i.test(html), level: 'info', msg: 'Missing charset' },
    { ok: metas.some((m) => m.name === 'viewport'), level: 'warning', msg: 'Missing viewport meta' },
    { ok: url.startsWith('https://'), level: 'critical', msg: 'Not served over HTTPS' },
  ])

  run('Performance', [
    { ok: sizeKb < 250, level: 'info', msg: `Large HTML (${sizeKb} KB)` },
    { ok: scripts < 25, level: 'info', msg: `Many script tags (${scripts})` },
    { ok: status === 200, level: 'critical', msg: `HTTP status ${status}` },
  ])

  run('Internal Links', [
    { ok: internalLinks >= 3, level: 'info', msg: `Few internal links (${internalLinks})` },
  ])

  let passed = 0, total = 0
  for (const c of Object.values(categories)) { passed += c.passed; total += c.total }
  const score = total ? Math.round((passed / total) * 100) : 100

  return { url, path, ok: status === 200, status, score, passed, total, categories, issues }
}

export function emptyAgg() {
  const categories: Record<string, { passed: number; total: number }> = {}
  for (const c of SEO_CATEGORIES) categories[c] = { passed: 0, total: 0 }
  return categories
}
