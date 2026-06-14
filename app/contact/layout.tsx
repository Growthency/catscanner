import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the CatScanner team — questions, feedback, billing help, or partnership enquiries.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact CatScanner',
    description: 'Get in touch with the CatScanner team — questions, feedback, or billing help.',
    url: 'https://catscanner.org/contact',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
