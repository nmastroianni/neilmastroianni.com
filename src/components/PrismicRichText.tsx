import {
  PrismicRichText as BasePrismicRichText,
  JSXMapSerializer,
  PrismicRichTextProps,
} from '@prismicio/react'
import * as prismic from '@prismicio/client'
import React from 'react'

const defaultComponents: JSXMapSerializer = {
  heading1: ({ children }) => {
    return <h1>{children}</h1>
  },
  heading2: ({ children }) => {
    return <h2>{children}</h2>
  },
  heading3: ({ children }) => {
    return (
      <span className="heading">
        <h3>{children}</h3>
      </span>
    )
  },
  heading4: ({ children }) => {
    return (
      <span className="heading">
        <h4>{children}</h4>
      </span>
    )
  },
  heading5: ({ children }) => {
    return (
      <span className="heading">
        <h5>{children}</h5>
      </span>
    )
  },
  heading6: ({ children }) => {
    return (
      <span className="heading">
        <h6>{children}</h6>
      </span>
    )
  },
  paragraph: ({ children }) => {
    return <p>{children}</p>
  },
  embed: ({ node }) => {
    return (
      <div className="mx-auto max-w-screen-sm overflow-hidden rounded shadow-xl">
        <div
          className="aspect-video"
          dangerouslySetInnerHTML={{ __html: node.oembed.html || '' }}
        />
      </div>
    )
  },
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
