import { useState } from 'react'
import ScoreBadge from './ScoreBadge.jsx'
import VagueWordHighlighter from './VagueWordHighlighter.jsx'
import { analyzeExisting, FRAMEWORK_EXAMPLES } from '../utils/vpUtils.js'

const SAMPLE_VP = 'We help small business owners launch and maintain a fast, reliable website in minutes by providing managed hosting with one-click WordPress installs.'

export default function AnalyzeTab() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleAnalyze = () => {
    const r = analyzeExisting(text)
    setResult(r)
  }

  const handleCopyImproved = () => {
    if (result?.improvedVersion) {
      navigator.clipboard.writeText(result.improvedVersion)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const scores = result?.scores
  const overallColor = scores ? (scores.overall >= 70 ? 'text-turtle' : scores.overall >= 45 ? 'text-tangerine' : 'text-coral') : ''

  return (
    <div className="flex flex-col gap-6">
      {/* Input */}
      <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-white font-semibold text-lg">Analyze Your Existing Value Proposition</h2>
            <p className="text-cloudy text-sm mt-1">Paste your current value prop, tagline, or About page opener. Get a 5-dimension score with specific rewrite suggestions.</p>
          </div>
        </div>
        <div className="relative">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={5}
            placeholder="Paste your value proposition here..."
            className="w-full bg-midnight border border-metal/30 rounded-lg p-3 text-sm text-white placeholder:text-galactic resize-y focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
          />
          {!text && (
            <button
              onClick={() => setText(SAMPLE_VP)}
              className="absolute bottom-3 right-3 text-xs px-2 py-1 rounded border border-metal/30 text-galactic hover:text-white hover:border-azure transition-colors"
            >
              Try Sample
            </button>
          )}
        </div>
        <button
          onClick={handleAnalyze}
          disabled={!text.trim()}
          className="w-full py-3 rounded-lg bg-azure text-white font-semibold hover:bg-azure-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
        >
          Analyze Value Proposition
        </button>
      </div>

      {/* Results */}
      {result && scores && (
        <div className="flex flex-col gap-5 animate-fadeIn">
          {/* Overall Score + Framework */}
          <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <p className="text-xs text-galactic uppercase tracking-wider mb-1">Closest Framework Match</p>
                <div className="flex items-center gap-3">
                  <p className="text-white font-semibold text-lg">{result.framework.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full border border-azure/30 text-azure">
                    {result.framework.confidence}% match
                  </span>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs text-galactic uppercase tracking-wider mb-1">Overall Score</p>
                <p className={`text-3xl font-bold ${overallColor}`}>
                  {scores.overall}<span className="text-sm font-normal text-galactic">/100</span>
                </p>
              </div>
            </div>

            {/* 5 Dimension Scores */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <ScoreBadge label="Clarity" score={scores.clarity} size="lg" />
              <ScoreBadge label="Specificity" score={scores.specificity} size="lg" />
              <ScoreBadge label="Customer Focus" score={scores.customerFocus} size="lg" />
              <ScoreBadge label="Brevity" score={scores.brevity} size="lg" />
              <ScoreBadge label="Differentiation" score={scores.differentiation} size="lg" />
            </div>

            {/* Word count + vague word summary */}
            <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-metal/20">
              <span className="text-xs text-galactic">{result.wordCount} words</span>
              {result.vagueWords.length > 0 && (
                <VagueWordHighlighter vagueWords={result.vagueWords} />
              )}
            </div>
          </div>

          {/* Improvement Tips */}
          {scores.tips.length > 0 && (
            <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-6">
              <p className="text-xs text-galactic uppercase tracking-wider mb-4 font-medium">Improvement Tips</p>
              <ul className="flex flex-col gap-3">
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

          {/* Specific Rewrite Suggestions */}
          {result.rewriteSuggestions.length > 0 && (
            <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-6">
              <p className="text-xs text-galactic uppercase tracking-wider mb-4 font-medium">Specific Fixes</p>
              <div className="flex flex-col gap-3">
                {result.rewriteSuggestions.map((sug, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className={`shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                      sug.type === 'vague-word' ? 'bg-tangerine/15 text-tangerine' :
                      sug.type === 'brevity' ? 'bg-coral/15 text-coral' :
                      sug.type === 'customer-focus' ? 'bg-turtle/15 text-turtle' :
                      'bg-prince/15 text-prince'
                    }`}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm">{sug.label}</p>
                      <p className="text-cloudy text-xs mt-0.5">{sug.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Before / After Preview */}
          <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="text-xs text-galactic uppercase tracking-wider font-medium">Before / After Preview</p>
              <button
                onClick={handleCopyImproved}
                className="text-xs px-3 py-1 rounded-lg bg-azure/10 border border-azure/30 text-azure hover:bg-azure hover:text-white transition-colors"
              >
                {copied ? 'Copied!' : 'Copy Improved'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-midnight/40 border border-metal/20">
                <p className="text-xs text-coral uppercase tracking-wider mb-2 font-medium">Original</p>
                <p className="text-sm text-cloudy leading-relaxed">{text}</p>
              </div>
              <div className="p-4 rounded-xl bg-midnight/40 border border-turtle/20">
                <p className="text-xs text-turtle uppercase tracking-wider mb-2 font-medium">Suggested Improvement</p>
                <p className="text-sm text-cloudy leading-relaxed">
                  {renderImprovedText(result.improvedVersion, text)}
                </p>
              </div>
            </div>
            <p className="text-xs text-galactic mt-3 italic">
              Bracketed text [like this] shows where to insert specific details. Replace with your actual numbers, metrics, or specifics.
            </p>
          </div>

          {/* Framework Example */}
          {result.framework.id && FRAMEWORK_EXAMPLES[result.framework.id] && (
            <div className="card-gradient border border-prince/20 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-prince uppercase tracking-wider font-medium">Example of a Great {result.framework.name}</span>
                <span className="text-xs text-galactic">({FRAMEWORK_EXAMPLES[result.framework.id].company})</span>
              </div>
              <blockquote className="text-sm text-white italic border-l-2 border-prince/40 pl-3 mb-3">
                {FRAMEWORK_EXAMPLES[result.framework.id].text}
              </blockquote>
              <p className="text-xs text-cloudy leading-relaxed">
                <span className="text-galactic font-medium">Why it works:</span> {FRAMEWORK_EXAMPLES[result.framework.id].analysis}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Render improved text with highlights for changed parts
function renderImprovedText(improved, original) {
  if (!improved) return original

  // Find bracketed suggestions and highlight them
  const parts = improved.split(/(\[[^\]]+\])/g)
  return parts.map((part, i) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      return (
        <span key={i} className="text-turtle bg-turtle/10 px-0.5 rounded font-medium">
          {part}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}
