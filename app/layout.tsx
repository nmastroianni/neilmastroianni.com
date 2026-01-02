import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/navbar'
import { PrismicPreview } from '@prismicio/next'
import { createClient, repositoryName } from '@/prismicio'
import { asText } from '@prismicio/client/richtext'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import { Toaster } from '@/components/ui/sonner'
import PrivacyToast from '@/components/PrivacyToast'
import { Partytown } from '@qwik.dev/partytown/react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')

  return {
    title: asText(settings.data.site_title) || 'Neil Mastroianni',
    description:
      settings.data.site_description || 'A personal website and blog.',
    openGraph: {
      images: [settings.data.site_image.url || ''],
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID
  const fbId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
  const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
  const siteUrl = isProd ? 'https://www.neilmastroianni.com' : ''
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://images.prismic.io" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <Partytown
          forward={['fbq']}
          debug={!isProd}
          resolveUrl={url => {
            if (url.hostname === 'connect.facebook.net') {
              // Return a relative path in dev to avoid CORS blocks
              return new URL(
                `${siteUrl}/proxies/facebook${url.pathname}${url.search}`,
                window.location.origin,
              )
            }
            return url
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <PrivacyToast message={settings.data.privacy_toast_message} />
          <Toaster richColors closeButton />
          <PrismicPreview repositoryName={repositoryName} />
        </ThemeProvider>
        {isProd && <Analytics gaId={gaId} clarityId={clarityId} fbId={fbId} />}
      </body>
    </html>
  )
}
