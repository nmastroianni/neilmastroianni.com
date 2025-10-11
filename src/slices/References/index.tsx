import { FC, ReactNode } from 'react'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Section from '@/components/Section'
import Heading from '@/components/Heading'
import { PrismicRichText } from '@/components/PrismicRichText'

/**
 * Props for `References`.
 */
export type ReferencesProps = SliceComponentProps<Content.ReferencesSlice>

/**
 * Component for "References" Slices.
 */
const References: FC<ReferencesProps> = ({ slice }) => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="lg"
    >
      {isFilled.keyText(slice.primary.heading) ? (
        <Heading as="h2" size="3xl">
          {slice.primary.heading}
        </Heading>
      ) : (
        <Heading as="h2" size="3xl">
          References
        </Heading>
      )}
      {isFilled.group(slice.primary.sources) && (
        <ul className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert list-none">
          {slice.primary.sources.map((source, i) => {
            return (
              <li key={slice.id + i}>
                <PrismicRichText
                  field={source.citation}
                  components={{
                    paragraph: ({ children }: { children: ReactNode }) => (
                      <p className="hanging-indent">{children}</p>
                    ),
                  }}
                />
              </li>
            )
          })}
        </ul>
      )}
    </Section>
  )
}

export default References
