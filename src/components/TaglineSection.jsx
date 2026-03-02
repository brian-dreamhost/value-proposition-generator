import { useState } from 'react'
import { FRAMEWORK_EXAMPLES } from '../utils/vpUtils.js'

const TYPE_LABELS = {
  command: { label: 'Command', classes: 'border-azure/30 text-azure', description: 'Imperative verb + benefit' },
  contrast: { label: 'Contrast', classes: 'border-prince/30 text-prince', description: '"Old way" to "New way"' },
  question: { label: 'Question', classes: 'border-turtle/30 text-turtle', description: 'Provocative question format' },
  statement: { label: 'Statement', classes: 'border-tangerine/30 text-tangerine', description: 'Bold declarative claim' },
  rhythm: { label: 'Rhythm', classes: 'border-sunflower/30 text-sunflower', description: 'Parallel structure / alliteration' },
}

export default function TaglineSection({ framework }) {
  const [copiedIndex, setCopiedIndex] = useState(-1)
  const [showExample, setShowExample] = useState(false)
  const candidates = framework.taglineCandidates || []
  const example = FRAMEWORK_EXAMPLES['tagline']

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(-1), 1500)
  }

  const handleCopyAll = () => {
    const allText = candidates.map((c, i) => `${i + 1}. "${c.text}" (${c.approach} — Score: ${c.scores.overall}/100)`).join('\n')
    navigator.clipboard.writeText(allText)
    setCopiedIndex(-2)
    setTimeout(() => setCopiedIndex(-1), 1500)
  }

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold text-base">Tagline Candidates</h3>
          <p className="text-galactic text-xs mt-1 italic">5 tagline approaches scored on brevity, memorability, clarity, and uniqueness</p>
        </div>
        <div className="flex items-center gap-2">
          {example && (
            <button
              onClick={() => setShowExample(!showExample)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                showExample
                  ? 'bg-prince/10 border-prince/30 text-prince'
                  : 'border-metal/30 text-galactic hover:text-cloudy hover:border-metal/50'
              }`}
            >
              {showExample ? 'Hide Example' : 'See Examples'}
            </button>
          )}
          <button
            onClick={handleCopyAll}
            className="text-xs px-3 py-1.5 rounded-lg bg-azure/10 border border-azure/30 text-azure hover:bg-azure hover:text-white transition-colors"
          >
            {copiedIndex === -2 ? 'Copied All!' : 'Copy All'}
          </button>
        </div>
      </div>

      {/* Example panel */}
      {showExample && example && (
        <div className="bg-midnight/60 border border-prince/20 rounded-xl p-4 animate-fadeIn">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-prince uppercase tracking-wider font-medium">Famous Taglines</span>
            <span className="text-xs text-galactic">({example.company})</span>
          </div>
          <blockquote className="text-sm text-white italic border-l-2 border-prince/40 pl-3 mb-3">
            {example.text}
          </blockquote>
          <p className="text-xs text-cloudy leading-relaxed">
            <span className="text-galactic font-medium">Why they work:</span> {example.analysis}
          </p>
        </div>
      )}

      {/* Tagline candidates */}
      <div className="flex flex-col gap-3">
        {candidates.map((candidate, i) => {
          const typeInfo = TYPE_LABELS[candidate.type] || { label: candidate.type, classes: 'border-azure/30 text-azure', description: '' }
          const scores = candidate.scores
          const overallColor = scores.overall >= 70 ? 'text-turtle' : scores.overall >= 45 ? 'text-tangerine' : 'text-coral'

          return (
            <div
              key={i}
              className={`flex flex-col gap-3 p-4 rounded-xl border ${
                i === 0 ? 'border-turtle/30 bg-turtle/5' : 'border-metal/20 bg-midnight/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {i === 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-turtle/15 border border-turtle/30 text-turtle text-xs font-medium">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 1l2.928 6.856L20 8.92l-5.072 4.572L16.18 20 10 16.428 3.82 20l1.252-6.508L0 8.92l7.072-1.064L10 1z" clipRule="evenodd" />
                      </svg>
                      Top Pick
                    </span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${typeInfo.classes}`}>
                    {typeInfo.label}
                  </span>
                  <span className="text-xs text-galactic">{candidate.approach}</span>
                </div>
                <span className={`text-lg font-bold ${overallColor} shrink-0`}>
                  {scores.overall}<span className="text-xs font-normal text-galactic">/100</span>
                </span>
              </div>

              <p className={`text-base font-medium ${i === 0 ? 'text-white' : 'text-cloudy'}`}>
                "{candidate.text}"
              </p>

              {/* Mini score bars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Brevity', value: scores.brevity },
                  { label: 'Memorable', value: scores.memorability },
                  { label: 'Clarity', value: scores.clarity },
                  { label: 'Unique', value: scores.uniqueness },
                ].map(dim => (
                  <div key={dim.label} className="flex items-center gap-1.5">
                    <span className="text-[10px] text-galactic w-16 shrink-0">{dim.label}</span>
                    <div className="flex-1 h-1 bg-metal/20 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          dim.value >= 70 ? 'bg-turtle' : dim.value >= 45 ? 'bg-tangerine' : 'bg-coral'
                        }`}
                        style={{ width: `${Math.max(dim.value, 3)}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-medium w-5 text-right ${
                      dim.value >= 70 ? 'text-turtle' : dim.value >= 45 ? 'text-tangerine' : 'text-coral'
                    }`}>
                      {dim.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Copy button */}
              <div className="flex justify-end">
                <button
                  onClick={() => handleCopy(candidate.text, i)}
                  className="text-xs px-3 py-1 rounded-lg bg-azure/10 border border-azure/30 text-azure hover:bg-azure hover:text-white transition-colors"
                >
                  {copiedIndex === i ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
