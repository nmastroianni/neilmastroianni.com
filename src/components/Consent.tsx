'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'
import { X } from 'lucide-react'
import Script from 'next/script'
import { Button } from './ui/button'
import { gsap } from 'gsap'

export default function Consent() {
  const [consent, setConsent] = React.useState<boolean>(false)
  const [hideBanner, setHideBanner] = React.useState<boolean>(false)
  const [renderBanner, setRenderBanner] = React.useState<boolean>(true)
  const component = React.useRef(null)

  type Preferences = {
    ad_storage: 'granted' | 'denied'
    analytics_storage: 'granted' | 'denied'
    date_denied?: string
  }

  React.useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('consentMode') === null) {
        setConsent(false)
        const ctx = gsap.context(() => {
          gsap.fromTo(
            '.consent',
            {
              opacity: 0,
              scale: 1.4,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 1.3,
              ease: 'power3.inOut',
              delay: 1,
            },
          )
        }, component)
        return () => ctx.revert()
      } else {
        setHideBanner(true)
        setRenderBanner(false)
        let consentMode: Preferences = JSON.parse(
          `${localStorage.getItem('consentMode')}`,
        )
        setConsent(consentMode.analytics_storage === 'granted')
        if (consentMode.date_denied) {
          const currentDate = new Date()
          const timeDifference =
            currentDate.getTime() - new Date(consentMode.date_denied).getTime()
          const daysSinceDenied = Math.floor(
            timeDifference / (1000 * 60 * 60 * 24),
          )
          daysSinceDenied > 14 && localStorage.removeItem('consentMode')
          setRenderBanner(true)
        }
      }
    }, 3000)
  }, [])

  React.useEffect(() => {
    if (hideBanner) {
      let ctx = gsap.context(() => {
        gsap.config({ nullTargetWarn: false })
        gsap.to('.consent', {
          y: 324,
          duration: 0.7,
          ease: 'power3.inOut',
          onComplete: () => {
            setRenderBanner(false)
          },
        })
      }, component)
      return () => ctx.revert()
    }
  }, [hideBanner, renderBanner])

  return (
    <div ref={component} id="consent">
      {consent === true && (
        <Script
          id="consupd"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
              });
              localStorage.setItem('consentMode', JSON.stringify({ad_storage: 'granted', analytics_storage: 'granted'}));
            `,
          }}
        />
      )}

      {renderBanner && (
        <div
          className={cn(
            'consent fixed bottom-0 z-10 grid w-full bg-secondary-foreground p-3 py-6 opacity-0 md:grid-cols-5',
          )}
        >
          <p className="prose prose-sm mx-auto my-4 px-6 text-left md:col-span-3">
            Your have a right to privacy. Period. If you wish to allow it,
            certain events will be logged. These data are collected with the
            intention of improving the visitor experience. Please choose your
            preference below. Data are only collected if you provide consent
            (which is how it should be).
          </p>
          <div className="my-4 flex items-center justify-evenly md:col-span-2">
            <Button
              className="absolute right-1 top-1 text-secondary hover:text-secondary-foreground"
              variant="ghost"
              onClick={() => {
                setHideBanner(true)
              }}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
            <Button
              variant="ghost"
              className="text-secondary"
              onClick={() => {
                setHideBanner(true)
                localStorage.setItem(
                  'consentMode',
                  JSON.stringify({
                    ad_storage: 'denied',
                    analytics_storage: 'denied',
                    date_denied: new Date(),
                  }),
                )
              }}
            >
              Deny All
            </Button>
            <Button
              size="lg"
              onClick={() => {
                setConsent(true)
                setHideBanner(true)
              }}
            >
              Accept All
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
