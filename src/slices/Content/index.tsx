import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@/components/PrismicRichText'
import Section from '@/components/Section'

/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<Content.ContentSlice>

/**
 * Component for "Content" Slices.
 */
const Content = ({ slice }: ContentProps): JSX.Element => {
  return (
    <Section
      width="lg"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="prose mx-auto block w-full lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert"
    >
      <PrismicRichText field={slice.primary.content} />
    </Section>
  )
}

export default Content
