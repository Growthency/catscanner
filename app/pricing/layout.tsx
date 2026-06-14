import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple CatScanner pricing — start free, then upgrade for unlimited AI cat breed scans, full breed reports, and scan history.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'CatScanner Pricing',
    description: 'Start free, then upgrade for unlimited AI cat breed scans and full breed reports.',
    url: 'https://catscanner.org/pricing',
    type: 'website',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
