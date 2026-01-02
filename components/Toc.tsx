'use client'
import { PrismicRichText, PrismicRichTextProps } from '@prismicio/react'
import { slugifyHeading } from '@/lib/utils'
import { cn } from '@/lib/utils'
import Heading from '@/components/Heading'
import { asText, Content, isFilled } from '@prismicio/client'
import {
  useEffect,
  useRef,
  useState,
  FC,
  ReactNode,
  useCallback,
  useMemo,
} from 'react'
import * as prismic from '@prismicio/client'

type TocNavElementProps = {
  node: prismic.RTHeading1Node | prismic.RTHeading2Node | { text: string }
  children?: ReactNode
  level: number
  activeId: string | null
}
// Create an iterable  nav element
const TocNavElement: FC<TocNavElementProps> = ({
  node,
  children,
  level,
  activeId,
}) => {
  const id = slugifyHeading(node)

  return (
    <li
      className={cn({
        'border-b pb-3 pl-2 font-semibold': level === 1,
        'ml-8': level === 2,
        'list-disc': id === activeId && level !== 1,
      })}
    >
      <a
        className={cn('block', {
          '': id !== activeId,
          '': id === activeId,
        })}
        href={`#${id}`}
      >
        {children ? children : 'text' in node ? node.text : ''}
      </a>
    </li>
  )
}

type TocProps = {
  slices: (Content.ReferencesSlice | Content.ContentSlice)[]
  title: prismic.RichTextField
}

export function Toc({ slices, title }: TocProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [headings, setHeadings] = useState<{ id: string; index: number }[]>([]) // Add state to store our heading ID's and their index
  const scrollRef = useRef(0) // Store the previous scroll position

  const headingsListRef = useCallback((node: HTMLOListElement) => {
    if (node !== null) {
      // node is the <ol> element
      const firstHeadingId = slugifyHeading({
        text: node.childNodes[0].textContent || '',
      })
      setActiveId(firstHeadingId)

      const newHeadings: { id: string; index: number }[] = []
      node.childNodes.forEach((heading, index) => {
        const id = slugifyHeading({ text: heading.textContent || '' })
        if (id) {
          newHeadings.push({ id, index })
        }
      })
      setHeadings(newHeadings)
    }
  }, [])

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

  const prismicComponents: PrismicRichTextProps['components'] = useMemo(
    () => ({
      heading1: ({ node, children, key }) => (
        <TocNavElement node={node} key={key} level={1} activeId={activeId}>
          {children}
        </TocNavElement>
      ),
      heading2: ({ node, children, key }) => (
        <TocNavElement node={node} key={key} level={2} activeId={activeId}>
          {children}
        </TocNavElement>
      ),
      heading3: () => <></>,
      heading4: () => <></>,
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
    }),
    [activeId],
  )

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
        <ol className="mt-4 space-y-2.5" role="list" ref={headingsListRef}>
          {isFilled.richText(title) && (
            <TocNavElement
              node={{ text: asText(title) }}
              level={1}
              activeId={activeId}
            />
          )}

          {slices.map(slice => {
            if (
              slice.slice_type === 'content' &&
              isFilled.richText(slice.primary.content)
            ) {
              return (
                <PrismicRichText
                  key={slice.id}
                  field={slice.primary.content}
                  components={prismicComponents}
                />
              )
            }
          })}
        </ol>
      </nav>
    </aside>
  )
}
