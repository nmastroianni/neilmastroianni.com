import { createClient } from '@/prismicio'
import Section from './Section'
import { asText, isFilled } from '@prismicio/client'
import Link from 'next/link'
import { PrismicNextLink } from '@prismicio/next'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import { PrismicRichText } from './PrismicRichText'

const Navbar = async () => {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <div className="z-50 mx-auto max-w-screen-xl bg-primary-foreground md:sticky md:top-0 md:rounded-b-lg">
      <Section
        as="header"
        width="xl"
        className="mb-6 justify-start py-4 text-lg md:mb-0 md:py-4 lg:py-6 lg:text-xl"
      >
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="home">
            {asText(settings.data.site_title)}
          </Link>
          {/* mobile navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger className={buttonVariants({ variant: 'ghost' })}>
                <MenuIcon />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription className="text-left">
                    {isFilled.richText(
                      settings.data.navigation_description,
                    ) && (
                      <PrismicRichText
                        field={settings.data.navigation_description}
                      />
                    )}
                  </SheetDescription>
                </SheetHeader>
                {settings.data.navigation.length > 0 && (
                  <ul className="mt-8 grid gap-y-6 text-2xl font-extrabold tracking-wider">
                    {settings.data.navigation.map((item, index) => (
                      <li key={`mobilenav-${item.label}-${index}`}>
                        <SheetClose asChild>
                          <PrismicNextLink field={item.link}>
                            {item.label}
                          </PrismicNextLink>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                )}
              </SheetContent>
            </Sheet>
          </div>

          {/* end mobile navigation */}
          <ul className="hidden gap-x-4 md:flex">
            {isFilled.group(settings.data.navigation)
              ? settings.data.navigation.map(({ link, label }, i) => {
                  if (label) {
                    return (
                      <li key={label + i}>
                        <PrismicNextLink
                          field={link}
                          className={cn(
                            'px-4 py-2',
                            buttonVariants({ variant: 'ghost', size: 'lg' }),
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
