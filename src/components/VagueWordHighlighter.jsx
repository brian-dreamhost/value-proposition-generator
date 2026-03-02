import { useState } from 'react'

export default function VagueWordHighlighter({ vagueWords }) {
  const [expanded, setExpanded] = useState(false)

  if (vagueWords.length === 0) return null

  const displayed = expanded ? vagueWords : vagueWords.slice(0, 3)

  return (
    <div className="flex flex-col gap-1.5">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs text-tangerine hover:text-white transition-colors group self-start"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <span>
          {vagueWords.length} vague word{vagueWords.length !== 1 ? 's' : ''} detected
          {vagueWords.length > 3 && (
            <span className="text-galactic ml-1">
              ({expanded ? 'show less' : `+${vagueWords.length - 3} more`})
            </span>
          )}
        </span>
      </button>
      {expanded && (
        <div className="flex flex-col gap-1 animate-fadeIn">
          {displayed.map((vw, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className="text-tangerine font-medium shrink-0">"{vw.word}"</span>
              <span className="text-galactic">-&gt;</span>
              <span className="text-cloudy">{vw.replacement}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
