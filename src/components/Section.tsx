import * as React from 'react'
import { cn } from '@/lib/utils'

type SectionProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
  width?: 'full' | '2xl' | 'xl' | 'lg' | 'md' | 'sm'
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  (
    { as: Comp = 'section', width = 'full', className, children, ...restProps },
    ref,
  ) => {
    return (
      <Comp
        ref={ref}
        className={cn(
          'mx-auto flex flex-col justify-center px-4 py-2 md:px-6 md:py-8 lg:py-10',
          {
            'w-full': width === 'full',
            'max-w-screen-2xl': width === '2xl',
            'max-w-screen-xl': width === 'xl',
            'max-w-screen-lg': width === 'lg',
            'max-w-screen-md': width === 'md',
            'max-w-screen-sm': width === 'sm',
          },
          className,
        )}
        {...restProps}
      >
        {children}
      </Comp>
    )
  },
)

Section.displayName = 'Section'

export default Section
