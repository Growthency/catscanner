import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import SiteChrome from '@/components/layout/SiteChrome'
import ScrollToTop from '@/components/ui/ScrollToTop'
import HeaderScripts from '@/components/HeaderScripts'
import SiteCustomization from '@/components/SiteCustomization'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'

// Self-hosted via next/font — no render-blocking request, no layout shift.
const fraunces = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-fraunces', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

const SITE_URL = 'https://catscanner.org'
const SITE_NAME = 'CatScanner'
const DESCRIPTION = 'Identify your cat instantly with our AI Cat Identifier. Upload a photo to detect cat breeds like Maine Coon, Siamese, Persian, Bengal, and 70+ feline breeds — free to try.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | CatScanner',
    default: 'Cat Scanner - Free Cat Breed Identifier By Pictures Online',
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ['cat scanner', 'cat breed identifier', 'cat breed identification', 'AI cat identifier', 'identify cat breed by photo', 'what breed is my cat', 'cat breed finder', 'cat identifier'],
  authors: [{ name: 'CatScanner' }],
  creator: 'CatScanner',
  publisher: 'CatScanner',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: 'Cat Scanner - Free Cat Breed Identifier By Pictures Online',
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'CatScanner — Free AI Cat Breed Identifier' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cat Scanner - Free Cat Breed Identifier By Pictures Online',
    description: DESCRIPTION,
    images: ['/og-default.png'],
  },
  verification: {
    google: ['RMIExaKazI_Fw3g0DRP1EksVW7WWiCH5FYGJvH8a7qs', 'rTpR8Bi_NVkQRjODAD3DNydhk-qvdgN13ywj1AXu7hY'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
}

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
      description: 'AI-powered cat breed identification from a single photo.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://enorwjzvshnlwwptbwqu.supabase.co" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('cs-theme-v2');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');})();` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TQ3M8D23N7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TQ3M8D23N7');
          `}
        </Script>
        <SiteCustomization />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="sr-only focus:not-sr-only" style={{ position: 'absolute', left: 8, top: 8, zIndex: 100, background: 'var(--accent)', color: '#fff', padding: '8px 14px', borderRadius: 8 }}>Skip to content</a>
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
          <ScrollToTop />
        </ThemeProvider>
        <HeaderScripts />
      </body>
    </html>
  )
}
