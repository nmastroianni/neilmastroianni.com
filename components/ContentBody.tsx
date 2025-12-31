import { SliceZone } from '@prismicio/react'
import { Content, asDate, asText } from '@prismicio/client'

import { components } from '@/slices'
import Heading from '@/components/Heading'
import { cn } from '@/lib/utils'
import { Toc } from '@/components/Toc'
import { slugifyHeading } from '@/lib/utils'

export default function ContentBody({
  page,
}: {
  page: Content.PostDocument | Content.ProjectDocument
}) {
  return (
    <section className="px-0 lg:col-span-3">
      <div className="rounded-lg py-10 md:px-8 md:py-20">
        <div className="px-4">
          <Heading
            as="h1"
            size="6xl"
            id={slugifyHeading({ text: asText(page.data.title) })}
            className="text-center lg:scroll-mt-24"
          >
            {asText(page.data.title)}
          </Heading>
          <div className="flex flex-wrap justify-center gap-x-4">
            {page.tags.map((tag, index) => (
              <span
                key={index}
                className={cn('mt-8 text-lg font-bold md:text-xl')}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-8 border-b border-secondary pb-8 text-center text-xl font-medium text-muted-foreground">
            {page.first_publication_date
              ? asDate(page.first_publication_date).toLocaleDateString(
                  'en-US',
                  {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: 'America/New_York',
                  },
                )
              : 'Not Yet Published'}
          </p>
        </div>
        <div className="relative lg:grid lg:grid-cols-6 lg:items-start">
          <div className="mt-4 px-4 lg:sticky lg:top-28 lg:col-span-2 lg:mt-10">
            <Toc slices={page.data.slices} title={page.data.title} />
          </div>
          <div className="lg:col-span-4">
            <SliceZone slices={page.data.slices} components={components} />
          </div>
        </div>
      </div>
    </section>
  )
}
