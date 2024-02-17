import { SliceZone } from '@prismicio/react'
import { Content, asDate, asText } from '@prismicio/client'

import { components } from '@/slices'
import Heading from '@/components/Heading'
import Section from '@/components/Section'
import { cn } from '@/lib/utils'
import { Toc } from '@/components/Toc'
import { slugifyHeading } from '@/lib/slugifyHeading'

export default function ContentBody({
  page,
}: {
  page: Content.PostDocument | Content.ProjectDocument
}) {
  return (
    <Section as="article" width="2xl" className="lg:col-span-3 lg:px-0">
      <div className="rounded-lg border-2 border-secondary px-4 py-10 md:px-8 md:py-20">
        <Heading
          as="h1"
          size="6xl"
          id={slugifyHeading({ text: asText(page.data.title) })}
          className="lg:scroll-mt-24"
        >
          {asText(page.data.title)}
        </Heading>
        <div className="flex flex-wrap gap-x-4 text-primary">
          {page.tags.map((tag, index) => (
            <span
              key={index}
              className={cn('mt-4 text-lg font-bold md:text-xl')}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-8 border-b border-secondary text-xl font-medium text-slate-300">
          {page.first_publication_date
            ? asDate(page.first_publication_date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Not Yet Published'}
        </p>
        <div className="relative lg:grid lg:grid-cols-5 lg:items-start">
          <div className="mt-4 lg:sticky lg:top-28 lg:col-span-2 lg:mt-10">
            <Toc slices={page.data.slices} title={page.data.title} />
          </div>
          <div className="lg:col-span-3">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        </div>
      </div>
    </Section>
  )
}
