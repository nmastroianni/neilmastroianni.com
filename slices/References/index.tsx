import { FC, ReactNode } from 'react'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-4 py-2 md:py-8 lg:px-0"
    >
      <div className="mx-auto prose list-none lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert prose-ul:list-none prose-ul:pl-0">
        {isFilled.keyText(slice.primary.heading) ? (
          <Heading as="h2" size="5xl">
            {slice.primary.heading}
          </Heading>
        ) : (
          <Heading as="h2" size="5xl">
            References
          </Heading>
        )}
        {isFilled.group(slice.primary.sources) && (
          <ul className="">
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
      </div>
    </section>
  )
}

export default References
