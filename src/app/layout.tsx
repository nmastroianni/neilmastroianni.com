import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '@/prismicio'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export const fontSans = FontSans({
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
          'dark min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <main>{children}</main>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  )
}
