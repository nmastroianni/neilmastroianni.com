'use client'

import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { motion } from 'motion/react'

import { PrismicRichText } from '@/components/PrismicRichText'
import { Button } from '@/components/ui/button'

export type BiographyProps = SliceComponentProps<Content.BiographySlice>

const Biography = ({ slice }: BiographyProps) => {
  const { heading, description, button_link, button_text, image } =
    slice.primary

  const animation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container mx-auto max-w-5xl px-6 py-24 sm:py-32 md:py-40"
    >
      <div className="relative grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="order-last grid grid-cols-1 gap-y-8 lg:order-0 lg:col-span-8">
          <motion.div
            initial={animation.initial}
            whileInView={animation.whileInView}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <PrismicRichText field={heading} />
          </motion.div>
          <motion.div
            initial={animation.initial}
            whileInView={animation.whileInView}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
            className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert"
          >
            <PrismicRichText field={description} />
          </motion.div>
        </div>

        <div className="order-first grid grid-cols-1 gap-8 lg:sticky lg:top-32 lg:order-0 lg:col-span-4">
          <div className="flex justify-center">
            <PrismicNextImage
              field={image}
              className="max-w-76 rounded-xl object-cover"
              fetchPriority="high"
              height={304}
              width={304}
              loading="eager"
              sizes="304px"
              preload={true}
            />
          </div>
          <motion.div
            initial={animation.initial}
            whileInView={animation.whileInView}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.3 }}
            className="flex justify-center"
          >
            <Button asChild>
              <PrismicNextLink field={button_link}>
                {button_text}
              </PrismicNextLink>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Biography
