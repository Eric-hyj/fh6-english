import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { SITE_CONFIG } from '@/lib/constants'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ClientLayout from '@/components/ClientLayout'
import StructuredData from '@/components/StructuredData'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import '@/styles/globals.css'
import 'leaflet/dist/leaflet.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0b',
}

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  other: {
    'google-site-verification': '7hnAZIzqWDCvkU-e-PA4dka2AeR4jaSZydsp57cnrVY',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col antialiased">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4070332439185407"
          crossOrigin="anonymous"
        />
        <StructuredData />
        <GoogleAnalytics />
        <ClientLayout>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  )
}
