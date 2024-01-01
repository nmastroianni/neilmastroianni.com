'use client'
import { useEffect, useRef } from 'react'
import { Content, KeyTextField } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { gsap } from 'gsap'
import Section from '@/components/Section'
import Shapes from './Shapes'

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      const timeline = gsap.timeline()
      timeline.fromTo(
        '.name-animation',
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: 'elastic.out(1.25, 0.3)',
          duration: 1,
          transformOrigin: 'left top',
          stagger: {
            each: 0.07,
            from: 'random',
          },
        },
      )
      timeline.fromTo(
        '.tagline',
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          scale: 1,
          ease: 'elastic.out(0.75, 0.3)',
        },
      )
    }, component)
    return () => ctx.revert()
  }, [])

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return
    return name.split('').map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ))
  }
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
      width="xl"
    >
      <div className="grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-2">
        <Shapes />
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-8 font-extrabold leading-none tracking-tighter"
            aria-label={`${slice.primary.first_name} ${slice.primary.last_name}`}
          >
            <span className="block text-[clamp(5rem,20vmin,10rem)] text-primary">
              {renderLetters(slice.primary.first_name, 'first')}
            </span>
            <span className="-mt-[.2rem] block text-[clamp(3.5rem,8vmin,6rem)]">
              {renderLetters(slice.primary.last_name, 'last')}
            </span>
          </h1>
          <span className="tagline block bg-gradient-to-tr from-primary via-muted-foreground to-secondary-foreground bg-clip-text text-2xl font-bold uppercase tracking-[.2rem] text-transparent opacity-0 md:text-4xl">
            {slice.primary.tag_line}
          </span>
        </div>
      </div>
    </Section>
  )
}

export default Hero
