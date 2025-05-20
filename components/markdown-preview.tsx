"use client"

import { useEffect, useState } from "react"

interface MarkdownPreviewProps {
  content: string
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    // Simple markdown parser (for a real app, use a proper markdown library)
    const parseMarkdown = (markdown: string) => {
      const parsed = markdown
        // Headers
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        // Bold
        .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
        // Italic
        .replace(/\*(.*?)\*/gim, "<em>$1</em>")
        // Links
        .replace(
          /\[([^\]]+)\]$$([^)]+)$$/gim,
          '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>',
        )
        // Lists
        .replace(/^\s*\n\* (.*)/gim, "<ul>\n<li>$1</li>")
        .replace(/^\* (.*)/gim, "<li>$1</li>")
        .replace(/^\s*\n- (.*)/gim, "<ul>\n<li>$1</li>")
        .replace(/^- (.*)/gim, "<li>$1</li>")
        // Code
        .replace(/`(.*?)`/gim, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
        // Paragraphs
        .replace(/^\s*(\n)?(.+)/gim, (m) =>
          /<(\/)?(h1|h2|h3|h4|h5|h6|ul|ol|li|blockquote|pre|img|code)/.test(m) ? m : "<p>" + m + "</p>",
        )
        // Line breaks
        .replace(/\n/gim, "<br />")

      return parsed
    }

    setHtml(parseMarkdown(content || "Nothing to preview"))
  }, [content])

  return <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}
