import { PrismicRichText } from '@/components/PrismicRichText'
import Section from '@/components/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import * as prismic from '@prismicio/client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'

/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<Content.ContentSlice>

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
          className="prose mx-auto block w-full dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl"
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
          className="prose mx-auto block w-full dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl"
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
          className="prose mx-auto block w-full dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl"
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
          className="prose mx-auto block w-full dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl"
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
          className="prose mx-auto block w-full dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl"
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
          className="prose mx-auto block w-full dark:prose-invert lg:prose-lg xl:prose-xl 2xl:prose-2xl"
        >
          <PrismicRichText field={slice.primary.content} />
        </Section>
      )
  }
}

export default Content
