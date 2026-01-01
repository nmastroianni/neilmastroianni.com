import { FC } from 'react'
import { asText, Content, isFilled } from '@prismicio/client'
import Link from 'next/link'
import { PrismicRichText } from './PrismicRichText'
import { buttonVariants } from './ui/button'
import { badgeVariants } from './ui/badge'
import { cn, slugifyHeading } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import Heading from './Heading'
import { PrismicNextImage } from '@prismicio/next'

type ContentListProps = {
  content: Content.PostDocument[] | Content.ProjectDocument[]
  ctaText: Content.ContentIndexSlice['primary']['content_cta_text']
}

const ContentList: FC<ContentListProps> = ({ content, ctaText }) => {
  return (
    <ul className="grid gap-y-8 divide-y-2 border-b border-b-secondary px-4 lg:px-0">
      {content.map((item, index) => {
        return (
          <li key={`${item.id}-${index}`} className="pb-8">
            <Link
              href={item.url || '#'}
              aria-labelledby={slugifyHeading({
                text: asText(item.data.title),
              })}
              className="group"
            >
              <div className="flex w-full flex-col items-center justify-between lg:flex-row">
                {isFilled.image(item.data.featured_image) && (
                  <PrismicNextImage
                    field={item.data.featured_image}
                    imgixParams={{ ar: '11:16', fit: 'crop' }}
                    width={220}
                    sizes="220px"
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="rounded-lg transition-opacity duration-300 ease-in-out group-hover:opacity-100 lg:opacity-60"
                  />
                )}
                <div className="flex flex-col gap-y-3 py-4 text-center lg:pl-8 lg:text-left">
                  <PrismicRichText
                    field={item.data.title}
                    components={{
                      heading1: ({ children }) => (
                        <Heading
                          as="h2"
                          size="5xl"
                          id={slugifyHeading({ text: asText(item.data.title) })}
                        >
                          {children}
                        </Heading>
                      ),
                    }}
                  />
                  <div className="flex gap-3 py-2">
                    {item.tags.length > 0 &&
                      item.tags.map(tag => (
                        <span
                          key={item.id + tag}
                          className={cn(
                            'block',
                            badgeVariants({ variant: 'secondary' }),
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                  {isFilled.richText(item.data.excerpt) ? (
                    <div className="my-4 prose text-left lg:prose-lg dark:prose-invert">
                      <PrismicRichText field={item.data.excerpt} />
                    </div>
                  ) : null}
                </div>
                <span
                  className={cn(
                    'my-6 md:my-0',
                    buttonVariants({ variant: 'outline' }),
                  )}
                  aria-label={`Continue reading ${asText(item.data.title)}`}
                >
                  {ctaText}
                  <ArrowUpRight />
                </span>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default ContentList
