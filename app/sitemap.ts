import type { MetadataRoute } from 'next'
import { createServerClient } from '@/lib/supabase-server'
import { BLOG_POSTS } from '@/lib/blog-posts'

const SITE = 'https://catscanner.org'

// Regenerate hourly so newly published posts appear automatically.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, priority: 1, changeFrequency: 'weekly', lastModified: now },
    { url: `${SITE}/pricing`, priority: 0.9, changeFrequency: 'weekly', lastModified: now },
    { url: `${SITE}/blog`, priority: 0.9, changeFrequency: 'daily', lastModified: now },
    { url: `${SITE}/about`, priority: 0.7, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE}/contact`, priority: 0.6, changeFrequency: 'monthly', lastModified: now },
    { url: `${SITE}/privacy`, priority: 0.4, changeFrequency: 'yearly', lastModified: now },
    { url: `${SITE}/terms`, priority: 0.4, changeFrequency: 'yearly', lastModified: now },
    { url: `${SITE}/refund`, priority: 0.4, changeFrequency: 'yearly', lastModified: now },
    { url: `${SITE}/login`, priority: 0.3, changeFrequency: 'yearly', lastModified: now },
    { url: `${SITE}/signup`, priority: 0.3, changeFrequency: 'yearly', lastModified: now },
  ]

  const staticArticles: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${SITE}${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  let dbPosts: MetadataRoute.Sitemap = []
  try {
    const supabase = createServerClient()
    const { data } = await supabase
      .from('posts')
      .select('slug, updated_at, publish_date, created_at')
      .eq('status', 'published')
    dbPosts = (data || []).map((p: any) => ({
      url: `${SITE}/${p.slug}`,
      lastModified: new Date(p.updated_at || p.publish_date || p.created_at || now),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {}

  return [...staticPages, ...staticArticles, ...dbPosts]
}
