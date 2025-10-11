import {
  PrismicRichText as BasePrismicRichText,
  JSXMapSerializer,
  PrismicRichTextProps as BasePrismicRichTextProps,
} from '@prismicio/react'
import * as prismic from '@prismicio/client'
import React from 'react'
import Heading from '@/components/Heading'
import Image from 'next/image'
import { slugifyHeading } from '@/lib/slugifyHeading'

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
      <div className="mx-auto max-w-(--breakpoint-sm) overflow-hidden rounded shadow-xl">
        <div
          className="aspect-h-9 aspect-w-16"
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
}

// Define PrismicRichTextProps as a generic type
interface PrismicRichTextProps<
  LinkResolverFunction extends
    prismic.LinkResolverFunction = prismic.LinkResolverFunction,
> extends BasePrismicRichTextProps {
  components?: Record<string, React.ComponentType<any>>
  // Add other props as needed
}

export const PrismicRichText = function PrismicRichText<
  LinkResolverFunction extends
    prismic.LinkResolverFunction<any> = prismic.LinkResolverFunction,
>({ components, ...props }: PrismicRichTextProps<LinkResolverFunction>) {
  return (
    <BasePrismicRichText
      components={{ ...defaultComponents, ...components }}
      {...props}
    />
  )
}
