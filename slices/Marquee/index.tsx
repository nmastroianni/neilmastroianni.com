'use client'

import * as React from 'react'
import { SliceComponentProps } from '@prismicio/react'
import { Content } from '@prismicio/client'
import Autoplay from 'embla-carousel-autoplay'

import { PrismicRichText } from '@/components/PrismicRichText'
import Heading from '@/components/Heading'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import MarqueeCard from '@/components/marquee-card'

export type MarqueeProps = SliceComponentProps<Content.MarqueeSlice>

const Marquee = ({ slice }: MarqueeProps) => {
  const { heading, items } = slice.primary
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true }),
  )

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container mx-auto max-w-5xl px-6 py-8 sm:py-10 md:py-12"
    >
      <div className="text-center">
        <PrismicRichText
          field={heading}
          components={{
            heading2: ({ children }) => (
              <Heading as="h2" size="5xl" className="mb-12">
                {children}
              </Heading>
            ),
          }}
        />
      </div>

      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <MarqueeCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </section>
  )
}

export default Marquee
