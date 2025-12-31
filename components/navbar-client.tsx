'use client'

import Link from 'next/link'
import { PrismicNextLink } from '@prismicio/next'
import { Menu } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { PrismicRichText } from '@/components/PrismicRichText'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Content } from '@prismicio/client'

type NavbarClientProps = {
  settings: Content.SettingsDocumentData
}

const NavbarClient = ({ settings }: NavbarClientProps) => {
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latest => {
    const previous = scrollY.getPrevious()
    if (previous && latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
    >
      <div className="container mx-auto flex max-w-5xl items-center justify-between p-6">
        {/* Desktop Menu */}
        <div className="mr-4 flex w-full justify-between">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2"
            aria-label="Homepage"
          >
            <PrismicRichText
              field={settings.site_title}
              components={{
                paragraph: ({ children }) => (
                  <span className="hidden font-bold sm:inline-block">
                    {children}
                  </span>
                ),
              }}
            />
          </Link>
          <div className="flex items-center">
            <nav className="hidden items-center gap-1 text-sm md:flex">
              {settings.navigation.map(item => (
                <Button key={item.label} variant="ghost" asChild>
                  <PrismicNextLink field={item.link}>
                    {item.label}
                  </PrismicNextLink>
                </Button>
              ))}
            </nav>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" aria-label="Open main menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <Link href="/" className="flex w-full justify-center">
                <PrismicRichText
                  field={settings.site_title}
                  components={{
                    paragraph: ({ children }) => (
                      <span className="font-bold">{children}</span>
                    ),
                  }}
                />
              </Link>
              <nav className="mt-6 grid gap-2">
                {settings.navigation.map(item => (
                  <SheetClose key={item.label} asChild>
                    <Button variant="ghost" asChild>
                      <PrismicNextLink field={item.link}>
                        {item.label}
                      </PrismicNextLink>
                    </Button>
                  </SheetClose>
                ))}
              </nav>
              <SheetFooter className="mt-6 items-center">
                <ThemeToggle />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

export default NavbarClient
