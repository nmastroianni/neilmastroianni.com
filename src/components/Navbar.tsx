import { createClient } from '@/prismicio'
import Section from './Section'
import { asText, isFilled } from '@prismicio/client'
import Link from 'next/link'
import { PrismicNextLink } from '@prismicio/next'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

const Navbar = async () => {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <div className="z-50 mx-auto max-w-screen-xl rounded-b bg-primary-foreground md:sticky md:top-0">
      <Section
        as="header"
        width="xl"
        className="justify-start py-2 text-lg md:py-4 lg:py-6 lg:text-xl"
      >
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="home">
            {asText(settings.data.site_title)}
          </Link>
          <ul className="flex gap-x-4">
            {isFilled.group(settings.data.navigation)
              ? settings.data.navigation.map(({ link, label }, i) => {
                  if (label) {
                    return (
                      <li key={label + i}>
                        <PrismicNextLink
                          field={link}
                          className={cn(
                            'px-4 py-2',
                            buttonVariants({ variant: 'ghost' }),
                          )}
                        >
                          {label}
                        </PrismicNextLink>
                      </li>
                    )
                  }
                  return (
                    <li key={i}>
                      <PrismicNextLink
                        field={link}
                        className={cn(
                          'px-4 py-2',
                          buttonVariants({ variant: 'ghost' }),
                        )}
                      >
                        {label}
                      </PrismicNextLink>
                    </li>
                  )
                })
              : null}
          </ul>
        </div>
      </Section>
    </div>
  )
}
export default Navbar
