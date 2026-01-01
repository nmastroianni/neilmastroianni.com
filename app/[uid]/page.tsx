import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { asText } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import Heading from '@/components/Heading'
import { createClient } from '@/prismicio'
import { components } from '@/slices'

type Params = { uid: string }
type SearchParams = {
  [key: string]: string | string[] | undefined
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}) {
  const { uid } = await params
  const srchParams = await searchParams
  const client = createClient()
  const page = await client.getByUID('page', uid).catch(() => notFound())
  const pageNumber = { page: srchParams.page }

  return (
    <>
      {page.data.slices[0]?.slice_type !== 'hero' ? (
        <Heading
          as="h1"
          size="5xl"
          className="my-6 text-center lg:my-8 lg:text-center"
        >
          {asText(page.data.title)}
        </Heading>
      ) : null}
      <SliceZone
        slices={page.data.slices}
        components={components}
        context={pageNumber}
      />
    </>
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

  return pages.map(page => ({ uid: page.uid }))
}
