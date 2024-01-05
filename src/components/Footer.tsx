import React from 'react'
import { createClient } from '@/prismicio'
import { PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import Section from '@/components/Section'
import { asText, isFilled } from '@prismicio/client'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function Footer() {
  const client = createClient()
  const settings = await client.getSingle('settings')
  return (
    <Section
      as="footer"
      width="xl"
      className="mt-auto text-secondary-foreground md:px-0"
    >
      <div className="mx-auto mt-20 grid w-full gap-6 py-8 md:grid-cols-3">
        <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:justify-self-start">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tighter text-secondary-foreground transition-colors duration-150 hover:text-primary"
          >
            {asText(settings.data.site_title)}
          </Link>
          <p className=" text-sm text-secondary-foreground ">
            © {new Date().getFullYear()} {asText(settings.data.site_title)}
          </p>
        </div>
        <nav className="flex justify-center" aria-label="Footer Navigation">
          <ul className="flex items-center gap-1">
            {settings.data.navigation.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <PrismicNextLink
                    className={cn(
                      'group relative block overflow-hidden  rounded px-3 py-1 text-base font-bold text-secondary-foreground transition-colors duration-150 hover:hover:text-primary',
                    )}
                    field={link}
                  >
                    {label}
                  </PrismicNextLink>
                </li>
                {index < settings.data.navigation.length - 1 && (
                  <span
                    className="text-4xl leading-[0] text-secondary"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="socials inline-flex justify-center sm:justify-end">
          {isFilled.link(settings.data.github) && (
            <PrismicNextLink
              field={settings.data.github}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-primary"
              aria-label={asText(settings.data.site_title) + ' on GitHub'}
            >
              <Github />
            </PrismicNextLink>
          )}

          {isFilled.link(settings.data.linkedin) && (
            <PrismicNextLink
              field={settings.data.linkedin}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-primary"
              aria-label={asText(settings.data.site_title) + ' on LinkedIn'}
            >
              <Linkedin />
            </PrismicNextLink>
          )}
        </div>
      </div>
    </Section>
  )
}
