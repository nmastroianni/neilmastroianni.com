import { SliceZone } from '@prismicio/react'
import { Content, asDate, asText } from '@prismicio/client'

import { components } from '@/slices'
import Heading from '@/components/Heading'
import Section from '@/components/Section'
import { cn } from '@/lib/utils'

export default function ContentBody({
  page,
}: {
  page: Content.PostDocument | Content.ProjectDocument
}) {
  return (
    <Section as="article" width="xl" className="lg:px-0">
      <div className="rounded-lg border-2 border-secondary px-4 py-10 md:px-8 md:py-20">
        <Heading as="h1" size="6xl">
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
        <div>
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Section>
  )
}
