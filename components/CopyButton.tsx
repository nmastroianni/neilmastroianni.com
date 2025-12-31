'use client'

import { useState } from 'react'

export const CopyButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    // 1. Prevent the click from bubbling up to the navbar or parent components
    e.preventDefault()
    e.stopPropagation()

    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      type="button" // 2. Explicitly set type to prevent form triggers
      aria-label="Copy code to clipboard"
      className="absolute top-9 right-4 z-20 rounded-md border border-white/10 bg-white/10 px-2 py-1 text-[10px] font-medium text-white/50 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-white/20 hover:text-white active:scale-95"
    >
      {copied ? (
        <span className="flex items-center gap-1.5 text-emerald-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          COPIED
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          COPY
        </span>
      )}
    </button>
  )
}
