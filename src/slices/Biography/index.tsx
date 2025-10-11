import Section from '@/components/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@/components/PrismicRichText'
import { PrismicNextLink } from '@prismicio/next'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Avatar from './Avatar'
import { JSX } from 'react'

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>

/**
 * Component for "Biography" Slices.
 */
const Biography = ({ slice }: BiographyProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
    >
      <div className="grid items-start gap-8 md:grid-cols-[2fr_1fr]">
        <div className="prose dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl">
          <PrismicRichText field={slice.primary.heading} />
          <PrismicRichText field={slice.primary.description} />
        </div>
        <div className="row-start-1 md:col-start-2 lg:sticky lg:top-24">
          <Avatar
            image={slice.primary.image}
            className="border-muted-foreground rounded-full border-4"
          />
          <div className="flex justify-center">
            <PrismicNextLink
              field={slice.primary.button_link}
              className={cn(
                'mt-8',
                buttonVariants({ variant: 'outline', size: 'lg' }),
              )}
            >
              {slice.primary.button_text}
            </PrismicNextLink>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Biography
