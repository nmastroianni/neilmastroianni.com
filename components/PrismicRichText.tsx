import {
  PrismicRichText as BasePrismicRichText,
  JSXMapSerializer,
  PrismicRichTextProps,
} from '@prismicio/react'
import Heading from '@/components/Heading'
import Image from 'next/image'
import { slugifyHeading } from '@/lib/utils'
import CodeBlock from './CodeBlock'

const defaultComponents: JSXMapSerializer = {
  heading1: ({ children, node }) => {
    return (
      <Heading
        as="h1"
        size="6xl"
        id={slugifyHeading(node)}
        className="lg:scroll-mt-24"
      >
        {children}
      </Heading>
    )
  },
  heading2: ({ children, node }) => {
    return (
      <Heading
        as="h2"
        size="5xl"
        id={slugifyHeading(node)}
        className="lg:scroll-mt-24"
      >
        {children}
      </Heading>
    )
  },
  heading3: ({ children, node }) => {
    return (
      <Heading
        as="h3"
        size="4xl"
        id={slugifyHeading(node)}
        className="lg:scroll-mt-24"
      >
        {children}
      </Heading>
    )
  },
  heading4: ({ children }) => {
    return (
      <Heading as="h4" size="3xl">
        {children}
      </Heading>
    )
  },
  heading5: ({ children }) => {
    return (
      <Heading as="h5" size="2xl">
        {children}
      </Heading>
    )
  },
  heading6: ({ children }) => {
    return (
      <Heading as="h6" size="xl">
        {children}
      </Heading>
    )
  },
  paragraph: ({ children }) => {
    return <p>{children}</p>
  },
  embed: ({ node }) => {
    return (
      <div className="mx-auto max-w-(--breakpoint-sm) overflow-hidden rounded">
        <div
          className="aspect-video w-full [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
          dangerouslySetInnerHTML={{ __html: node.oembed.html || '' }}
        />
      </div>
    )
  },
  image: ({ node }) => {
    return (
      <div className="flex justify-center">
        <Image
          src={node.url}
          width={node.dimensions.width}
          height={node.dimensions.height}
          alt={node.alt || ''}
          className="rounded-md"
          title={node.alt || ''}
        />
      </div>
    )
  },
  preformatted: ({ node }) => {
    return <CodeBlock node={node} />
  },
}

export function PrismicRichText(props: PrismicRichTextProps) {
  return (
    <BasePrismicRichText
      {...props}
      components={{ ...defaultComponents, ...props.components }}
    />
  )
}
