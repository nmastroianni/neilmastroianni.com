import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import Heading from '@/components/Heading'

export type HeroProps = SliceComponentProps<Content.HeroSlice>

const Hero = ({ slice }: HeroProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden"
    >
      <div className="animated-gradient absolute inset-0 z-0" />
      <div className="relative z-10 text-center">
        <Heading as="h1" size="7xl" className="mb-4" data-testid="hero-heading">
          {slice.primary.first_name} {slice.primary.last_name}
        </Heading>
        <p className="text-center text-2xl text-balance text-muted-foreground md:text-3xl">
          {slice.primary.tag_line}
        </p>
      </div>
    </section>
  )
}

export default Hero
