import Heading from '@/components/Heading'
import { PrismicRichText } from '@/components/PrismicRichText'
import Section from '@/components/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { JSX } from 'react'

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
      className="border-secondary border-r border-l"
    >
      <div className="mx-auto w-full max-w-prose">
        <Heading as="h2" size="6xl" className="max-w-prose">
          {slice.primary.heading}
        </Heading>
      </div>
      {slice.items.map((item, index) => (
        <div key={index} className="mx-auto mt-8 w-full max-w-prose md:mt-16">
          <Heading as="h3" size="4xl">
            {item.title}
          </Heading>

          <div className="mt-1 flex w-fit items-center gap-1 text-2xl tracking-tight text-slate-400">
            <Heading as="h4" size="3xl" className="font-medium">
              <span>{item.years}</span>{' '}
              <span className="text-xl font-extralight lg:text-3xl">/</span>{' '}
              {item.organization}
            </Heading>
          </div>
          <div className="prose prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl mt-4">
            <PrismicRichText field={item.description} />
          </div>
        </div>
      ))}
    </Section>
  )
}

export default Experience
