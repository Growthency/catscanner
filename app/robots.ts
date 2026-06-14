import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/dashboard/', '/login', '/signup', '/forgot-password'],
    },
    sitemap: 'https://catscanner.org/sitemap.xml',
    host: 'https://catscanner.org',
  }
}
