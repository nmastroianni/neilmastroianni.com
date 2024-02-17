'use client'
import { PrismicRichText } from '@prismicio/react'
import { slugifyHeading } from '@/lib/slugifyHeading'
import { cn } from '@/lib/utils'
import Heading from '@/components/Heading'
import { asText } from '@prismicio/client'
import { useEffect, useRef, useState } from 'react'

// Create an iterable  nav element
const TocNavElement = ({ node, children, level, activeId }) => {
  const id = slugifyHeading(node)

  return (
    <li
      className={cn('', {
        'border-b pb-3 pl-2 font-semibold': level === 1,
        'ml-8': level === 2,
        'list-disc': id === activeId && level !== 1,
      })}
    >
      <a
        className={cn('block text-neutral-300', {
          'text-neutral-300': id !== activeId,
          'text-primary': id === activeId,
        })}
        href={`#${id}`}
      >
        {children ? children : node.text}
      </a>
    </li>
  )
}

export function Toc({ slices, title }) {
  const headingsList = useRef(null)
  const [activeId, setActiveId] = useState(null)
  const [headings, setHeadings] = useState([]) // Add state to store our heading ID's and their index
  const scrollRef = useRef(0) // Store the previous scroll position
  useEffect(() => {
    if (!headingsList.current) return

    const firstHeadingId = slugifyHeading({
      text: headingsList.current.childNodes[0].textContent,
    })

    setActiveId(firstHeadingId)

    // Loop over our headings and create an id for each, store it in the new state
    headingsList.current.childNodes.forEach((heading, index) => {
      const id = slugifyHeading({ text: heading.textContent })

      if (id) {
        setHeadings(headings => [...headings, { id, index }])
      }
    })
  }, [headingsList])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id')

          if (entry.isIntersecting) {
            setActiveId(id)
            scrollRef.current = window.scrollY
          } else {
            const diff = scrollRef.current - window.scrollY
            const isScrollingUp = diff > 0
            const currentIndex = headings.findIndex(
              heading => heading.id === id,
            )
            const prevEntry = headings[currentIndex - 1]
            const prevId = prevEntry?.id

            if (isScrollingUp && prevId) {
              setActiveId(prevId)
            }
          }
        })
      },
      {
        rootMargin: '0px 0px -90% 0px',
      },
    )

    const observeHeadings = () => {
      headings.forEach(heading => {
        const currentHeading = document.getElementById(heading.id)

        if (currentHeading) {
          observer.observe(currentHeading)
        }
      })
    }

    if (headings.length) {
      observeHeadings()
    }

    return () => {
      headings.forEach(heading => {
        const currentHeading = document.getElementById(heading.id)

        if (currentHeading) {
          observer.unobserve(currentHeading)
        }
      })
    }
  }, [headings])

  return (
    <aside className="rounded-lg border border-secondary p-6">
      <nav aria-labelledby="toc-heading">
        <Heading
          as="h2"
          size="2xl"
          id="toc-heading"
          className="text-center lg:text-left"
        >
          Table of Contents
        </Heading>
        <ol className="mt-4 space-y-1" role="list" ref={headingsList}>
          <TocNavElement
            node={{ text: asText(title) }}
            level={1}
            activeId={activeId}
          />
          {slices.map(slice => {
            if (slice.slice_type === 'content') {
              return (
                <PrismicRichText
                  key={slice.id}
                  field={slice.primary.content}
                  components={{
                    heading1: ({ node, children, key }) => (
                      <TocNavElement
                        node={node}
                        key={key}
                        level={1}
                        activeId={activeId}
                      >
                        {children}
                      </TocNavElement>
                    ),
                    heading2: ({ node, children, key }) => (
                      <TocNavElement
                        node={node}
                        key={key}
                        level={2}
                        activeId={activeId}
                      >
                        {children}
                      </TocNavElement>
                    ),
                    heading3: () => <></>,
                    paragraph: () => <></>,
                    preformatted: () => <></>,
                    strong: () => <></>,
                    em: () => <></>,
                    listItem: () => <></>,
                    oListItem: () => <></>,
                    list: () => <></>,
                    oList: () => <></>,
                    image: () => <></>,
                    embed: () => <></>,
                    hyperlink: () => <></>,
                  }}
                />
              )
            }
          })}
        </ol>
      </nav>
    </aside>
  )
}
