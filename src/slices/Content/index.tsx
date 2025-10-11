import { PrismicRichText } from '@/components/PrismicRichText'
import Section from '@/components/Section'
import { Content as PrismicContent } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import * as prismic from '@prismicio/client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { JSX } from 'react'

/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<PrismicContent.ContentSlice>

/**
 * Component for "Content" Slices.
 */
const Content = ({ slice }: ContentProps): JSX.Element => {
  const jscode = prismic.asText(slice.primary.content)
  switch (slice.variation) {
    case 'javascript':
      return (
        <Section
          width="lg"
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="prose dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto block w-full"
        >
          <SyntaxHighlighter
            language="javascript"
            style={okaidia}
            showInlineLineNumbers
          >
            {jscode}
          </SyntaxHighlighter>
        </Section>
      )
    case 'jsx':
      return (
        <Section
          width="lg"
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="prose dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto block w-full"
        >
          <SyntaxHighlighter language="jsx" style={okaidia} showLineNumbers>
            {jscode}
          </SyntaxHighlighter>
        </Section>
      )
    case 'tsx':
      return (
        <Section
          width="lg"
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="prose dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto block w-full"
        >
          <SyntaxHighlighter language="tsx" style={okaidia} showLineNumbers>
            {jscode}
          </SyntaxHighlighter>
        </Section>
      )
    case 'python':
      return (
        <Section
          width="lg"
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="prose dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto block w-full"
        >
          <SyntaxHighlighter language="python" style={okaidia} showLineNumbers>
            {jscode}
          </SyntaxHighlighter>
        </Section>
      )
    case 'shell':
      return (
        <Section
          width="lg"
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="prose dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto block w-full"
        >
          <SyntaxHighlighter language="bash" style={okaidia} showLineNumbers>
            {jscode}
          </SyntaxHighlighter>
        </Section>
      )
    default:
      return (
        <Section
          width="lg"
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="prose dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto block w-full"
        >
          <PrismicRichText field={slice.primary.content} />
        </Section>
      )
  }
}

export default Content
