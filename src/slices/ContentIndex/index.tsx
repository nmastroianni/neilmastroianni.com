import ContentList from '@/components/ContentList'
import Heading from '@/components/Heading'
import Section from '@/components/Section'
import { createClient } from '@/prismicio'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@/components/PrismicRichText'
import Pagination from '@/components/Pagination'

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>
type contextProps = {
  page?: number
}

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
  context,
}: ContentIndexProps): Promise<JSX.Element> => {
  const { page } = context as contextProps
  const client = createClient()
  let content
  if (slice.primary.content_type === 'Post') {
    content = await client.getByType('post', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
      page: page || 1,
      pageSize: 5,
    })
  } else if (slice.primary.content_type === 'Project')
    content = await client.getByType('project', {
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
      page: page || 1,
      pageSize: 5,
    })

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="lg"
    >
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <Heading as="h2" size="5xl">
              {children}
            </Heading>
          ),
        }}
      />
      {isFilled.richText(slice.primary.description) && (
        <div className="prose my-4 lg:prose-lg dark:prose-invert">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      {content && (
        <>
          <ContentList
            content={content.results}
            ctaText={
              isFilled.keyText(slice.primary.content_cta_text)
                ? slice.primary.content_cta_text
                : 'Read More'
            }
            fallbackItemImage={slice.primary.fallback_item_image}
          />
          {content?.total_pages > 1 && (
            <Pagination
              hasNextPage={content?.next_page !== null}
              hasPrevPage={content?.prev_page !== null}
              totalPages={content?.total_pages}
            />
          )}
        </>
      )}
    </Section>
  )
}

export default ContentIndex
