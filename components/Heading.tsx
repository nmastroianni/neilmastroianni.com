import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

interface HeadingProps extends HTMLAttributes<HTMLHeadElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  className?: string
  children: React.ReactNode
}

export default function Heading({
  as: Comp,
  size,
  children,
  className,
  ...restProps
}: HeadingProps) {
  return (
    <Comp
      className={cn(
        'font-bold',
        {
          'text-3xl leading-16 md:text-5xl lg:text-6xl lg:leading-24 xl:text-7xl':
            size === '7xl',
          'text-2xl leading-12 md:text-4xl lg:text-5xl lg:leading-20 xl:text-6xl':
            size === '6xl',
          'text-2xl leading-8 lg:text-5xl lg:leading-16': size === '5xl',
          'text-xl lg:text-4xl lg:leading-12': size === '4xl',
          'text-lg lg:text-3xl': size === '3xl',
          'text-lg': size === '2xl',
          'text-base': size === 'xl',
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </Comp>
  )
}
