import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { asImageSrc, asText } from '@prismicio/client'
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
        <Heading as="h1" size="5xl" className="my-6 lg:my-8 lg:text-center">
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

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { uid } = await params
  const client = createClient()
  const page = await client.getByUID('page', uid).catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('page')

  return pages.map(page => ({ uid: page.uid }))
}
