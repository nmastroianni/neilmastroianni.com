import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import ContentBody from '@/components/ContentBody'
import { createClient } from '@/prismicio'

import { Graph } from 'schema-dts'
import { asText } from '@prismicio/client'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  const page = await client
    .getByUID('project', params.uid)
    .catch(() => notFound())
  const settings = await client.getSingle('settings')

  const jsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `https://${settings.data.domain || `example.com`}/#site`,
        name: asText(settings.data.site_title) || '',
        url: `https://${settings.data.domain || `example.com`}/`,
      },
      {
        '@type': 'BlogPosting',
        '@id': `https://${settings.data.domain || `example.com`}${
          page.url
        }/#project`,
        headline: asText(page.data.title),
        description:
          asText(page.data.excerpt) || page.data.meta_description || undefined,
        mainEntityOfPage: `https://${settings.data.domain || `example.com`}${
          page.url
        }`,
        datePublished: page.first_publication_date,
        dateModified: page.last_publication_date || undefined,
        image: page.data.featured_image.url || undefined,
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
  const page = await client
    .getByUID('project', params.uid)
    .catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('project')

  return pages.map(page => {
    return { uid: page.uid }
  })
}
