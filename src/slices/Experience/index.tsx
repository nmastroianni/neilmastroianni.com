import Heading from '@/components/Heading'
import { PrismicRichText } from '@/components/PrismicRichText'
import Section from '@/components/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
    >
      <Heading as="h2" size="5xl">
        {slice.primary.heading}
      </Heading>
      {slice.items.map((item, index) => (
        <div key={index} className="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16">
          <Heading as="h3" size="3xl">
            {item.title}
          </Heading>

          <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
            <span>{item.years}</span>{' '}
            <span className="text-3xl font-extralight">/</span>{' '}
            <span>{item.organization}</span>
          </div>
          <div className="prose prose-lg prose-invert mt-4">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
    </Section>
  )
}

export default Experience
