import * as React from 'react'
import { cn } from '@/lib/utils'

type SectionProps<T extends React.ElementType = 'section'> = {
  as?: T
  className?: string
  children: React.ReactNode
  width?: 'full' | '2xl' | 'xl' | 'lg' | 'md' | 'sm'
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  'as' | 'className' | 'children' | 'width'
>

type SectionComponent = <T extends React.ElementType = 'section'>(
  props: SectionProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => React.ReactElement | null

const SectionInner = React.forwardRef(
  (
    { as, width = 'full', className, children, ...restProps }: SectionProps,
    ref: React.ForwardedRef<HTMLElement>,
  ) => {
    const Comp = as || 'section'
    return (
      <Comp
        ref={ref}
        className={cn(
          'mx-auto flex flex-col justify-center px-4 py-2 md:px-6 md:py-8 lg:py-10',
          {
            'w-full': width === 'full',
            'max-w-(--breakpoint-2xl)': width === '2xl',
            'max-w-(--breakpoint-xl)': width === 'xl',
            'max-w-(--breakpoint-lg)': width === 'lg',
            'max-w-(--breakpoint-md)': width === 'md',
            'max-w-(--breakpoint-sm)': width === 'sm',
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

SectionInner.displayName = 'Section'

const Section = SectionInner as SectionComponent & { displayName: string }

export default Section
