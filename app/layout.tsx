import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import SiteChrome from '@/components/layout/SiteChrome'
import ScrollToTop from '@/components/ui/ScrollToTop'
import HeaderScripts from '@/components/HeaderScripts'
import SiteCustomization from '@/components/SiteCustomization'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | CatScanner',
    default: 'Cat Scanner - Free Cat Breed Identifier By Pictures Online',
  },
  description: 'Identify your cat instantly with our AI Cat Identifier. Upload a photo to detect cat breeds like Maine Coon, Siamese, Persian, Bengal, and 70+ feline breeds.',
  icons: {
    icon: '/icon.svg',
  },
  alternates: {
    types: { 'application/rss+xml': '/feed.xml' },
  },
  verification: {
    google: ['RMIExaKazI_Fw3g0DRP1EksVW7WWiCH5FYGJvH8a7qs', 'rTpR8Bi_NVkQRjODAD3DNydhk-qvdgN13ywj1AXu7hY'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('cs-theme-v2');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');})();` }} />
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
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
          <ScrollToTop />
        </ThemeProvider>
        <HeaderScripts />
      </body>
    </html>
  )
}
