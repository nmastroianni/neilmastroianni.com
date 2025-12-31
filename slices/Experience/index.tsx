'use client'

import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { motion } from 'motion/react'

import { PrismicRichText } from '@/components/PrismicRichText'
import Heading from '@/components/Heading'

export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>

const Experience = ({ slice }: ExperienceProps) => {
  const { heading } = slice.primary

  const animation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container mx-auto max-w-5xl px-6 py-24 sm:py-32 md:py-40"
    >
      <Heading as="h2" size="5xl" className="mb-12 text-center">
        {heading}
      </Heading>

      <div className="timeline">
        {slice.items.map((item, index) => (
          <motion.div
            key={index}
            className="timeline-item"
            initial={animation.initial}
            whileInView={animation.whileInView}
            viewport={animation.viewport}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              delay: index * 0.2,
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <Heading as="h3" size="3xl">
                {item.title}
              </Heading>
              <div className="text-muted-foreground">{item.years}</div>
            </div>
            <p className="mb-4 text-lg font-semibold">{item.organization}</p>
            <div className="prose dark:prose-invert">
              <PrismicRichText field={item.description} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Experience
