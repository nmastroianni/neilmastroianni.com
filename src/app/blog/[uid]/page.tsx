import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ContentBody from '@/components/ContentBody'
import { createClient } from '@/prismicio'
import { Graph } from 'schema-dts'
import { asText } from '@prismicio/client'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client.getByUID('post', params.uid).catch(() => notFound())
  const settings = await client.getSingle('settings')
  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `https://${settings.data.domain || `example.com`}/#site`,
        name: asText(settings.data.site_title) || '',
        url: `https://${settings.data.domain || `example.com`}/`,
        publisher: {
          '@type': 'Person',
          '@id': `https://${settings.data.domain || `example.com`}/#neil`,
          name: 'Neil Mastroianni',
          givenName: 'Neil',
          familyName: 'Mastroianni',
        },
      },
      {
        '@type': 'BlogPosting',
        '@id': `https://${settings.data.domain || `example.com`}${
          page.url
        }/#post`,
        headline: asText(page.data.title),
        description:
          asText(page.data.excerpt) || page.data.meta_description || undefined,
        mainEntityOfPage: `https://${settings.data.domain || `example.com`}${
          page.url
        }`,
        datePublished: page.first_publication_date,
        dateModified: page.last_publication_date || undefined,
        image: page.data.featured_image.url || undefined,
        author: {
          '@type': 'Person',
          '@id': `https://${settings.data.domain || `example.com`}/#neil`,
          name: 'Neil Mastroianni',
          givenName: 'Neil',
          familyName: 'Mastroianni',
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
      <ContentBody page={page} />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('post', params.uid).catch(() => notFound())
  const settings = await client.getSingle('settings')

  return {
    title: `${asText(page.data.title) || page.data.meta_title} • ${asText(
      settings.data.site_title,
    )}`,
    description: page.data.meta_description || settings.data.site_description,
    openGraph: {
      images: [page.data.meta_image.url || settings.data.site_image.url || ''],
    },
    alternates: {
      canonical: `https://${settings.data.domain || `example.com`}${page.url}`,
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('post')

  return pages.map(page => {
    return { uid: page.uid }
  })
}
