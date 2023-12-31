'use client'
import { useEffect, useRef, useState } from 'react'
import { Content, asImageSrc, asText, isFilled } from '@prismicio/client'
import Link from 'next/link'
import { PrismicRichText } from './PrismicRichText'
import { buttonVariants } from './ui/button'
import { badgeVariants } from './ui/badge'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
  const itemsRef = useRef<Array<HTMLLIElement | null>>([])
  const revealRef = useRef(null)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const [currentItem, setCurrentItem] = useState<null | number>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Animate list-items in with a stagger
    let ctx = gsap.context(() => {
      itemsRef.current.forEach(item => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'elastic.out(1,0.3)',
            stagger: 0.2,
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=100px',
              end: 'bottom center',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      return () => ctx.revert() // cleanup!
    }, ref)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY }
      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2))
      let ctx = gsap.context(() => {
        if (currentItem !== null) {
          const maxY = window.scrollY + window.innerHeight - 350
          const maxX = window.innerWidth - 250

          gsap.to(revealRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
            ease: 'back.out(2)',
            duration: 1.3,
            opacity: 1,
          })
          gsap.to(revealRef.current, {
            opacity: hovering ? 1 : 0,
            visibility: 'visible',
            ease: 'power3.out',
            duration: 0.4,
          })
        }
        lastMousePos.current = mousePos
        return () => ctx.revert()
      }, ref)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [currentItem, hovering])

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

  // Preload images
  useEffect(() => {
    contentImages.forEach(url => {
      if (!url) return
      const img = new Image()
      img.src = url
    })
  }, [contentImages])

  const onMouseEnter = (index: number) => {
    setCurrentItem(index)
    if (!hovering) setHovering(true)
  }
  const onMouseLeave = () => {
    setHovering(false)
    setCurrentItem(null)
  }

  return (
    <>
      <ul
        className="grid border-b border-b-secondary"
        ref={ref}
        onMouseLeave={() => onMouseLeave()}
      >
        {content.map((item, index) => (
          <li
            key={item.id}
            className="list-item"
            ref={el => (itemsRef.current[index] = el)}
            onMouseEnter={() => onMouseEnter(index)}
          >
            <Link
              href={item.url || '#'}
              className="flex flex-col justify-between border-t border-t-secondary py-10 md:items-start"
              aria-label={asText(item.data.title) || 'View the content'}
            >
              <div className="flex w-full flex-col justify-between md:flex-row md:items-center">
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
                <span
                  className={cn(
                    'my-6 md:my-0',
                    buttonVariants({ variant: 'outline' }),
                  )}
                >
                  {ctaText}
                  <ArrowUpRight />
                </span>
              </div>
              {isFilled.richText(item.data.excerpt) ? (
                <div className="prose my-4 lg:prose-lg dark:prose-invert">
                  <PrismicRichText field={item.data.excerpt} />
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>

      {/* Hover Element */}
      <div
        ref={revealRef}
        className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        style={{
          backgroundImage:
            currentItem !== null ? `url(${contentImages[currentItem]})` : ``,
        }}
      />
    </>
  )
}
export default ContentList
