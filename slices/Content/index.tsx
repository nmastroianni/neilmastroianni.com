import { FC } from 'react'
import { Content as PrismicContent } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@/components/PrismicRichText'

/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<PrismicContent.ContentSlice>

/**
 * Component for "Content" Slices.
 */
const Content: FC<ContentProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-6 lg:py-8"
    >
      <div className="mx-auto prose lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </section>
  )
}

export default Content
