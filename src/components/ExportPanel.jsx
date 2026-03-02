import { useState } from 'react'
import { formatAllForExport, formatAsMarkdown } from '../utils/vpUtils.js'

export default function ExportPanel({ frameworks, inputs }) {
  const [copied, setCopied] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleCopyAll = () => {
    const text = formatAllForExport(frameworks, inputs)
    navigator.clipboard.writeText(text)
    setCopied(true)
    setShowMenu(false)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleDownloadMarkdown = () => {
    const md = formatAsMarkdown(frameworks, inputs)
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `value-propositions-${inputs?.productName?.toLowerCase().replace(/\s+/g, '-') || 'export'}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowMenu(false)
  }

  const handleDownloadText = () => {
    const text = formatAllForExport(frameworks, inputs)
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `value-propositions-${inputs?.productName?.toLowerCase().replace(/\s+/g, '-') || 'export'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowMenu(false)
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={handleCopyAll}
          className="text-xs px-3 py-1.5 rounded-lg bg-azure/10 border border-azure/30 text-azure hover:bg-azure hover:text-white transition-colors flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
          {copied ? 'Copied!' : 'Copy All'}
        </button>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-xs px-2.5 py-1.5 rounded-lg border border-metal/30 text-galactic hover:text-white hover:border-metal/50 transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Export
          <svg className={`w-3 h-3 transition-transform ${showMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

      {showMenu && (
        <div className="absolute right-0 top-full mt-1 z-20 bg-oblivion border border-metal/30 rounded-lg shadow-lg py-1 min-w-[180px] animate-fadeIn">
          <button
            onClick={handleDownloadMarkdown}
            className="w-full text-left px-3 py-2 text-sm text-cloudy hover:text-white hover:bg-midnight/60 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-galactic" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Download Markdown
          </button>
          <button
            onClick={handleDownloadText}
            className="w-full text-left px-3 py-2 text-sm text-cloudy hover:text-white hover:bg-midnight/60 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-galactic" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Download Plain Text
          </button>
        </div>
      )}
    </div>
  )
}
