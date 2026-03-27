import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'
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
  verification: {
    google: 'RMIExaKazI_Fw3g0DRP1EksVW7WWiCH5FYGJvH8a7qs',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CH8M30CS7C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CH8M30CS7C');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
