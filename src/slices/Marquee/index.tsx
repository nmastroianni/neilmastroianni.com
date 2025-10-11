'use client'
import { PrismicRichText } from '@/components/PrismicRichText'
import Section from '@/components/Section'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Dot } from 'lucide-react'
import React, { JSX, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Heading from '@/components/Heading'

gsap.registerPlugin(ScrollTrigger)

/**
 * Props for `Marquee`.
 */
export type MarqueeProps = SliceComponentProps<Content.MarqueeSlice>

/**
 * Component for "Marquee" Slices.
 */
const Marquee = ({ slice }: MarqueeProps): JSX.Element => {
  const component = useRef(null)
  useEffect(() => {
    let ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 4,
        },
      })
      timeline.fromTo(
        '.marquee-row',
        {
          x: index => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400)
          },
        },
        {
          x: index => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400)
          },
          ease: 'power1.inOut',
        },
      )
    }, component)
    return () => ctx.revert()
  }, [])

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
      className="overflow-x-hidden"
    >
      <Section width="xl" as="div" className="w-full">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <Heading as="h2" size="7xl">
                {children}
              </Heading>
            ),
          }}
        />
      </Section>
      {slice.items.length > 0 &&
        slice.items.map((item, index) => {
          return (
            <div
              key={slice.id + index}
              className="marquee-row text-muted flex items-center justify-center"
              aria-label={item.name || undefined}
            >
              {Array.from({ length: 15 }, (_, index) => (
                <React.Fragment key={`${slice.id + index}-${item.name}`}>
                  <span
                    className="marquee-item text-8xl font-extrabold tracking-tighter"
                    style={{
                      color: index === 7 && item.color ? item.color : 'inherit',
                    }}
                  >
                    {item.name}
                  </span>
                  <span>
                    <Dot className="h-16 w-16" />
                  </span>
                </React.Fragment>
              ))}
            </div>
          )
        })}
    </Section>
  )
}

export default Marquee
