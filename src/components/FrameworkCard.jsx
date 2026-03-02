import { useState, useMemo } from 'react'
import ScoreBadge from './ScoreBadge.jsx'
import VagueWordHighlighter from './VagueWordHighlighter.jsx'
import { scoreValueProp, detectVagueWords, FRAMEWORK_EXAMPLES } from '../utils/vpUtils.js'

export default function FrameworkCard({ framework, inputs, showWinner = false, winnerDimensions = null }) {
  const [text, setText] = useState(framework.text)
  const [copied, setCopied] = useState(false)
  const [showExample, setShowExample] = useState(false)
  const [showTips, setShowTips] = useState(false)

  const scores = useMemo(() => scoreValueProp(text, inputs, framework.frameworkKey), [text, inputs, framework.frameworkKey])
  const vagueWords = useMemo(() => detectVagueWords(text), [text])
  const example = FRAMEWORK_EXAMPLES[framework.frameworkKey]

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const overallColor = scores.overall >= 70 ? 'text-turtle' : scores.overall >= 45 ? 'text-tangerine' : 'text-coral'

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-semibold text-base">{framework.name}</h3>
            {showWinner && winnerDimensions && winnerDimensions.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-turtle/15 border border-turtle/30 text-turtle text-xs font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Winner: {winnerDimensions.join(', ')}
              </span>
            )}
          </div>
          <p className="text-galactic text-xs mt-1 italic">{framework.description}</p>
        </div>
        <div className={`text-2xl font-bold ${overallColor} shrink-0`}>
          {scores.overall}<span className="text-sm font-normal text-galactic">/100</span>
        </div>
      </div>

      {/* Score dimensions */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <ScoreBadge label="Clarity" score={scores.clarity} highlight={winnerDimensions?.includes('Clarity')} />
        <ScoreBadge label="Specificity" score={scores.specificity} highlight={winnerDimensions?.includes('Specificity')} />
        <ScoreBadge label="Customer Focus" score={scores.customerFocus} highlight={winnerDimensions?.includes('Customer Focus')} />
        <ScoreBadge label="Brevity" score={scores.brevity} highlight={winnerDimensions?.includes('Brevity')} />
        <ScoreBadge label="Differentiation" score={scores.differentiation} highlight={winnerDimensions?.includes('Differentiation')} />
      </div>

      {/* Editable text with vague word count */}
      <div className="relative">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={framework.isTagline ? 2 : 4}
          className="w-full bg-midnight border border-metal/30 rounded-lg p-3 text-cloudy text-sm resize-y focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
        />
        {vagueWords.length > 0 && (
          <div className="mt-2">
            <VagueWordHighlighter vagueWords={vagueWords} />
          </div>
        )}
      </div>

      {/* Actions row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTips(!showTips)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              showTips
                ? 'bg-azure/10 border-azure/30 text-azure'
                : 'border-metal/30 text-galactic hover:text-cloudy hover:border-metal/50'
            }`}
          >
            {showTips ? 'Hide Tips' : `${scores.tips.length} Tips`}
          </button>
          {example && (
            <button
              onClick={() => setShowExample(!showExample)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                showExample
                  ? 'bg-prince/10 border-prince/30 text-prince'
                  : 'border-metal/30 text-galactic hover:text-cloudy hover:border-metal/50'
              }`}
            >
              {showExample ? 'Hide Example' : 'See Example'}
            </button>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-lg bg-azure/10 border border-azure/30 text-azure hover:bg-azure hover:text-white transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Tips panel */}
      {showTips && scores.tips.length > 0 && (
        <div className="bg-midnight/60 border border-metal/20 rounded-xl p-4 animate-fadeIn">
          <p className="text-xs text-galactic uppercase tracking-wider mb-3 font-medium">Improvement Tips</p>
          <ul className="flex flex-col gap-2.5">
            {scores.tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className={`shrink-0 text-xs font-medium px-1.5 py-0.5 rounded ${
                  tip.dimension === 'Clarity' ? 'bg-azure/15 text-azure' :
                  tip.dimension === 'Specificity' ? 'bg-prince/15 text-prince' :
                  tip.dimension === 'Customer Focus' ? 'bg-turtle/15 text-turtle' :
                  tip.dimension === 'Brevity' ? 'bg-tangerine/15 text-tangerine' :
                  tip.dimension === 'Differentiation' ? 'bg-sunflower/15 text-sunflower' :
                  'bg-metal/20 text-galactic'
                }`}>
                  {tip.dimension}
                </span>
                <span className="text-cloudy">{tip.tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Example panel */}
      {showExample && example && (
        <div className="bg-midnight/60 border border-prince/20 rounded-xl p-4 animate-fadeIn">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-prince uppercase tracking-wider font-medium">Real-World Example</span>
            <span className="text-xs text-galactic">({example.company})</span>
          </div>
          <blockquote className="text-sm text-white italic border-l-2 border-prince/40 pl-3 mb-3">
            {example.text}
          </blockquote>
          <p className="text-xs text-cloudy leading-relaxed">
            <span className="text-galactic font-medium">Why it works:</span> {example.analysis}
          </p>
        </div>
      )}
    </div>
  )
}
