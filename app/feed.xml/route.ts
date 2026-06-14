import { createServerClient } from '@/lib/supabase-server'
import { BLOG_POSTS } from '@/lib/blog-posts'

const SITE = 'https://catscanner.org'

function esc(s: string) {
  return (s || '').replace(/]]>/g, ']]&gt;')
}

// GET /feed.xml — RSS feed of blog posts (DB + static), for search-engine auto-discovery.
export async function GET() {
  type Item = { title: string; link: string; desc: string; date: string }
  const items: Item[] = []

  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('posts')
      .select('title,slug,excerpt,meta_description,publish_date,created_at')
      .eq('status', 'published')
      .order('publish_date', { ascending: false })
      .limit(50)
    for (const p of data || []) {
      items.push({
        title: p.title,
        link: `${SITE}/${p.slug}`,
        desc: p.excerpt || p.meta_description || '',
        date: p.publish_date || p.created_at,
      })
    }
  } catch {}

  for (const p of BLOG_POSTS) {
    items.push({
      title: p.title,
      link: p.slug.startsWith('http') ? p.slug : `${SITE}${p.slug}`,
      desc: p.excerpt,
      date: p.date,
    })
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `<channel>\n` +
    `<title>CatScanner Blog</title>\n` +
    `<link>${SITE}/blog</link>\n` +
    `<description>Cat guides, breed spotlights and AI tips from CatScanner.</description>\n` +
    `<atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>\n` +
    items.map((i) =>
      `<item>\n` +
      `<title><![CDATA[${esc(i.title)}]]></title>\n` +
      `<link>${i.link}</link>\n` +
      `<guid>${i.link}</guid>\n` +
      `<description><![CDATA[${esc(i.desc)}]]></description>\n` +
      (i.date ? `<pubDate>${new Date(i.date).toUTCString()}</pubDate>\n` : '') +
      `</item>`
    ).join('\n') +
    `\n</channel>\n</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
