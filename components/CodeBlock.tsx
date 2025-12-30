import { RTPreformattedNode } from '@prismicio/client'
import { createHighlighter, type Highlighter } from 'shiki'
import { CopyButton } from './CopyButton'

type CustomPreformattedNode = RTPreformattedNode & { label?: string }

type CodeBlockProps = {
  node: CustomPreformattedNode
}

let highlighter: Highlighter | null = null

const getSharedHighlighter = async () => {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-dark'],
      langs: [
        'javascript',
        'typescript',
        'tsx',
        'jsx',
        'python',
        'css',
        'html',
        'json',
        'bash',
      ],
    })
  }
  return highlighter
}

const CodeBlock = async ({ node }: CodeBlockProps) => {
  if (!node || !node.text) return null

  let displayText = node.text
  let lang = 'typescript'

  const lines = node.text.split('\n')
  const firstLine = lines[0].trim()
  const langMatch = firstLine.match(/^(?:\/\/|#)\s*lang:\s*(\w+)/)

  if (langMatch) {
    lang = langMatch[1]
    displayText = lines.slice(1).join('\n')
  } else if (node.label) {
    lang = node.label.replace('language-', '')
  }

  const shiki = await getSharedHighlighter()

  // Generate HTML with a transformer to add line numbers
  const html = shiki.codeToHtml(displayText, {
    lang,
    theme: 'github-dark',
    transformers: [
      {
        line(node, line) {
          // Add a data-line attribute to every line <span>
          node.properties['class'] = (node.properties['class'] || '') + ' line'
          node.properties['data-line'] = line
        },
      },
    ],
  })

  return (
    <div className="code-block-container group relative my-6 overflow-hidden rounded-lg border border-white/10 bg-[#24292e] shadow-xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] opacity-50" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] opacity-50" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f] opacity-50" />
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
            {lang}
          </span>
          {/* Button is now part of the header flex context */}
          <div className="relative h-4 w-16">
            <CopyButton content={displayText} />
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="not-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}

export default CodeBlock
