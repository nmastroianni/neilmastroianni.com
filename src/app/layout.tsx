import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '@/app/globals.css'
import { createClient, repositoryName } from '@/prismicio'
import { asText } from '@prismicio/client'
import { cn } from '@/lib/utils'
import { PrismicPreview } from '@prismicio/next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Suspense } from 'react'
import Analytics from '@/components/Analytics'
import Consent from '@/components/Consent'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return {
    metadataBase: new URL(`https://${settings.data.domain || `example.com`}`),
    title: asText(settings.data.site_title) || 'Neil Mastroianni',
    description:
      settings.data.site_description ||
      `Neil Mastroianni: Passionate learner, collaborator, and tech enthusiast 
      exploring ways technology enhances our lives.`,
    openGraph: {
      images: [settings.data.site_image.url || ''],
    },
  }
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'dark flex min-h-screen flex-col bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Suspense>
          <Analytics />
        </Suspense>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Consent />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  )
}
