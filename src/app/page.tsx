import { Metadata } from 'next'
import { SliceZone } from '@prismicio/react'
import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { Graph } from 'schema-dts'
import { asText } from '@prismicio/client'

export default async function Page() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  const page = await client.getSingle('homepage')
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `https://${settings.data.domain || `example.com`}/#neil`,
        name: 'Neil Mastroianni',
        description: settings.data.site_description || undefined,
        givenName: 'Neil',
        familyName: 'Mastroianni',
        telephone: '732-481-2430',
      },
      {
        '@type': 'WebSite',
        '@id': `https://${settings.data.domain || `example.com`}/#site`,
        publisher: {
          '@id': `https://${settings.data.domain || `example.com`}/#neil`,
        },
        url: `https://${settings.data.domain || `example.com`}/`,
        inLanguage: 'en-US',
        name: 'Neil Mastroianni',
      },
      {
        '@type': 'WebPage',
        url: `https://${settings.data.domain || `example.com`}/`,
        name: 'Home | Neil Mastroianni - Creative Educator',
        datePublished: page.first_publication_date,
        dateModified: page.last_publication_date || page.first_publication_date,
        about: {
          '@id': `https://${settings.data.domain || `example.com`}/#neil`,
        },
        isPartOf: {
          '@id': `https://${settings.data.domain || `example.com`}/#site`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url:
            page.data.meta_image.url ||
            settings.data.site_image.url ||
            undefined,
        },
        inLanguage: 'en-US',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('homepage')
  const settings = await client.getSingle('settings')

  return {
    title: page.data.meta_title || asText(settings.data.site_title),
    description: page.data.meta_description || settings.data.site_description,
    openGraph: {
      images: [page.data.meta_image.url || settings.data.site_image.url || ''],
    },
  }
}
