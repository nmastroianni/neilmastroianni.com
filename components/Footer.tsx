import React from 'react'
import { createClient } from '@/prismicio'
import { PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import Section from '@/components/Section'
import { asText, isFilled } from '@prismicio/client'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import { PrismicRichText } from './PrismicRichText'
import { Button } from './ui/button'

export default async function Footer() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <Section
      as="footer"
      width="xl"
      className="mt-auto w-full border-t text-secondary-foreground lg:px-0"
    >
      {isFilled.richText(settings.data.footer_message) && (
        <div className="flex justify-center pb-6 lg:pb-8">
          <p className="mx-auto prose dark:prose-invert">
            {<PrismicRichText field={settings.data.footer_message} />}
          </p>
        </div>
      )}
      <div className="flex flex-col justify-between gap-y-8 px-4 lg:flex-row lg:gap-y-0">
        <div className="name group flex flex-1 flex-col items-center justify-center gap-x-4 gap-y-2 sm:justify-self-start">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tighter text-secondary-foreground transition-colors duration-150 group-hover:text-primary"
          >
            {asText(settings.data.site_title)}
          </Link>
          <p className="text-sm text-secondary-foreground">
            © {new Date().getFullYear()} {asText(settings.data.site_title)}
          </p>
        </div>
        <nav
          className="flex flex-1 justify-center"
          aria-label="Footer Navigation"
        >
          <ul className="flex items-center gap-1">
            {settings.data.footer_navigation.map((link, index) => (
              <React.Fragment key={link.key}>
                <li>
                  <Button asChild variant={link.variant}>
                    <PrismicNextLink
                      className={cn(
                        'group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-secondary-foreground transition-colors duration-150 hover:hover:text-primary',
                      )}
                      field={link}
                    >
                      {link.text}
                    </PrismicNextLink>
                  </Button>
                </li>
                {index < settings.data.footer_navigation.length - 1 && (
                  <span
                    className="text-4xl leading-0 text-secondary"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="socials inline-flex flex-1 justify-center">
          {isFilled.link(settings.data.github) && (
            <PrismicNextLink
              field={settings.data.github}
              className="p-2 text-2xl text-foreground transition-all duration-150 hover:scale-125 hover:text-primary"
              aria-label={asText(settings.data.site_title) + ' on GitHub'}
            >
              <FaGithub />
            </PrismicNextLink>
          )}

          {isFilled.link(settings.data.linkedin) && (
            <PrismicNextLink
              field={settings.data.linkedin}
              className="p-2 text-2xl text-foreground transition-all duration-150 hover:scale-125 hover:text-primary"
              aria-label={asText(settings.data.site_title) + ' on LinkedIn'}
            >
              <FaLinkedinIn />
            </PrismicNextLink>
          )}
        </div>
      </div>
    </Section>
  )
}
