'use client'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { ImageField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { gsap } from 'gsap'

type AvatarProps = {
  image: ImageField
  className?: string
}

const Avatar = ({ image, className }: AvatarProps) => {
  const component = useRef(null)
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.avatar',
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.inOut',
        },
      )
      window.onmousemove = e => {
        if (!component.current) return
        const componentRect = (
          component.current as HTMLElement
        ).getBoundingClientRect()
        const componentCenterX = componentRect.left + componentRect.width / 2
        let componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
        }
        let distFromCenter = 1 - Math.abs(componentPercent.x)
        gsap
          .timeline({
            defaults: { duration: 0.5, overwrite: 'auto', ease: 'power3.out' },
          })
          .to(
            '.avatar',
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
              duration: 0.5,
            },
            0,
          )
          .to(
            '.highlight',
            {
              opacity: distFromCenter - 0.7,
              x: (-10 + 20) & componentPercent.x,
              duration: 0.5,
            },
            0,
          )
      }
    }, component)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={component} className="w-fulls relative">
      <div
        className={cn('avatar aspect-1 relative overflow-hidden', className)}
      >
        <PrismicNextImage
          field={image}
          imgixParams={{ flip: 'h', q: 90, w: 360, h: 360 }}
          className="avatar-image z-[-1] h-full w-full object-fill"
          priority
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block" />
      </div>
    </div>
  )
}

export default Avatar
