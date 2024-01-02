'use client'
import { useRef, useState } from 'react'
import { Content, asImageSrc, asText, isFilled } from '@prismicio/client'
import Link from 'next/link'
import { PrismicRichText } from './PrismicRichText'
import { buttonVariants } from './ui/button'
import { badgeVariants } from './ui/badge'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

type ContentListProps = {
  content: Content.PostDocument[] | Content.ProjectDocument[]
  ctaText: Content.ContentIndexSlice['primary']['content_cta_text']
  fallbackItemImage: Content.ContentIndexSlice['primary']['fallback_item_image']
}

const ContentList = ({
  content,
  ctaText,
  fallbackItemImage,
}: ContentListProps) => {
  const ref = useRef(null)
  const [currentItem, setCurrentItem] = useState<null | number>(null)
  const contentImages = content.map(item => {
    const image = isFilled.image(item.data.featured_image)
      ? item.data.featured_image
      : fallbackItemImage
    return asImageSrc(image, {
      fit: 'crop',
      w: 220,
      h: 320,
      exp: -10,
    })
  })

  const onMouseEnter = (index: number) => {
    setCurrentItem(index)
  }
  return (
    <ul className="grid border-b border-b-secondary" ref={ref}>
      {content.map((item, index) => (
        <li
          key={item.id}
          className="list-item"
          onMouseEnter={() => onMouseEnter(index)}
        >
          <Link
            href={item.url || '#'}
            className="flex flex-col justify-between border-t border-t-secondary py-10 md:flex-row md:items-center"
            aria-label={asText(item.data.title) || 'View the content'}
          >
            <div className="flex flex-col gap-y-3">
              <PrismicRichText field={item.data.title} />
              <div className="flex gap-3">
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
            </div>
            <span className={buttonVariants({ variant: 'outline' })}>
              {ctaText}
              <ArrowUpRight />
            </span>
          </Link>
        </li>
      ))}
      {/* Hover Element */}
      <div
        className="hover-reveal opacity-0f pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center transition-[background] duration-300"
        style={{
          backgroundImage:
            currentItem !== null ? `url(${contentImages[currentItem]})` : ``,
        }}
      ></div>
    </ul>
  )
}
export default ContentList
