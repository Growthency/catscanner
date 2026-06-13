'use client'
import { useParams } from 'next/navigation'
import { ADMIN as C } from '@/lib/admin-theme'
import { Wrench } from 'lucide-react'

// Short description shown under each section title.
const BLURBS: Record<string, string> = {
  pages: 'Create, edit and manage all the pages on your site.',
  homepage: 'Edit the content and sections of your homepage.',
  'rank-tracker': 'Track your keyword rankings on Google over time.',
  'seo-health': 'Audit your site for on-page SEO issues and fixes.',
  'indexing-report': 'See which pages are indexed in Google Search Console.',
  subscriptions: 'View and manage customer subscriptions and credit purchases.',
  'header-scripts': 'Add custom scripts (analytics, pixels) to the site <head>.',
  'external-links': 'Manage outbound and affiliate links across the site.',
  menus: 'Edit the navigation menu items and their order.',
  'footer-content': 'Edit the footer columns, links and bottom text.',
  'theme-colors': 'Customize the brand colors used across the site.',
  'custom-css': 'Add your own CSS to fine-tune the site styling.',
}

function titleFromSlug(slug: string) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export default function AdminSection() {
  const params = useParams()
  const slug = (Array.isArray(params.section) ? params.section[0] : params.section) || ''
  const title = titleFromSlug(slug)
  const blurb = BLURBS[slug] || 'Manage this section of your site.'

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: C.text }}>{title}</h1>
        <p className="text-sm mt-1" style={{ color: C.muted }}>{blurb}</p>
      </div>

      <div className="rounded-2xl p-12 flex flex-col items-center justify-center text-center" style={{ background: C.card, border: `1px solid ${C.border}` }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: C.accentBg }}>
          <Wrench size={24} style={{ color: C.accent }} />
        </div>
        <h2 className="text-lg font-semibold mb-1.5" style={{ color: C.text }}>{title} — coming next</h2>
        <p className="text-sm max-w-md" style={{ color: C.muted }}>
          The layout for this section is ready. Its controls are being built in the next update.
        </p>
      </div>
    </div>
  )
}
