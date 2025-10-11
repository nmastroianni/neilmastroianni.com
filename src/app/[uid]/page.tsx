import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { asText } from '@prismicio/client'

type Params = { uid: string }
type SearchParams = {
  [key: string]: string | string[] | undefined
}

export default async function Page(props: {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}) {
  const client = createClient()
  const searchParams = await props.searchParams
  const params = await props.params
  const page = await client.getByUID('page', params.uid).catch(() => notFound())
  const pageNumber = { page: searchParams.page }
  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
      context={pageNumber}
    />
  )
}

export async function generateMetadata(props: {
  params: Promise<Params>
}): Promise<Metadata> {
  const client = createClient()
  const params = await props.params
  const page = await client.getByUID('page', params.uid).catch(() => notFound())
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
  const pages = await client.getAllByType('page')

  return pages.map(page => {
    return { uid: page.uid }
  })
}
