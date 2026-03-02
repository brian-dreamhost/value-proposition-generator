import { useState, useMemo } from 'react'
import BuildForm from './BuildForm.jsx'
import FrameworkCard from './FrameworkCard.jsx'
import TaglineSection from './TaglineSection.jsx'
import { generateFrameworks, scoreValueProp } from '../utils/vpUtils.js'

export default function CompareTab() {
  const [stateA, setStateA] = useState({ frameworks: [], inputs: null })
  const [stateB, setStateB] = useState({ frameworks: [], inputs: null })
  const [activeForm, setActiveForm] = useState('A')

  const handleGenerateA = (inputs) => {
    setStateA({ frameworks: generateFrameworks(inputs), inputs })
    // Auto-switch to B if A is filled and B is empty
    if (!stateB.inputs) setActiveForm('B')
  }

  const handleGenerateB = (inputs) => {
    setStateB({ frameworks: generateFrameworks(inputs), inputs })
  }

  const bothGenerated = stateA.frameworks.length > 0 && stateB.frameworks.length > 0

  // Compute winners per dimension for each framework
  const winners = useMemo(() => {
    if (!bothGenerated) return {}
    const result = {}
    const frameworkIds = ['steve-blank', 'geoffrey-moore', 'usp', 'elevator']

    for (const fwId of frameworkIds) {
      const fwA = stateA.frameworks.find(f => f.id === fwId)
      const fwB = stateB.frameworks.find(f => f.id === fwId)
      if (!fwA || !fwB) continue

      const scoresA = scoreValueProp(fwA.text, stateA.inputs, fwA.frameworkKey)
      const scoresB = scoreValueProp(fwB.text, stateB.inputs, fwB.frameworkKey)

      const dimensions = ['Clarity', 'Specificity', 'Customer Focus', 'Brevity', 'Differentiation']
      const scoreKeys = ['clarity', 'specificity', 'customerFocus', 'brevity', 'differentiation']

      const winnersA = []
      const winnersB = []
      dimensions.forEach((dim, i) => {
        const key = scoreKeys[i]
        if (scoresA[key] > scoresB[key]) winnersA.push(dim)
        else if (scoresB[key] > scoresA[key]) winnersB.push(dim)
      })

      result[fwId] = {
        overallA: scoresA.overall,
        overallB: scoresB.overall,
        winnersA,
        winnersB,
        overallWinner: scoresA.overall > scoresB.overall ? 'A' : scoresB.overall > scoresA.overall ? 'B' : 'tie',
      }
    }

    return result
  }, [bothGenerated, stateA, stateB])

  return (
    <div className="flex flex-col gap-6">
      {/* Instructions */}
      <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-6">
        <h2 className="text-white font-semibold text-lg mb-2">A/B Comparison Mode</h2>
        <p className="text-cloudy text-sm">
          Generate value propositions from two different sets of inputs, then compare them side-by-side.
          Useful for testing different messaging angles, audiences, or benefit emphasis.
        </p>
      </div>

      {/* Form toggle */}
      <div className="flex gap-2 mb-0">
        <button
          onClick={() => setActiveForm('A')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
            activeForm === 'A'
              ? 'bg-azure/15 border-azure/40 text-azure'
              : 'border-metal/30 text-galactic hover:text-cloudy hover:border-metal/50'
          }`}
        >
          Version A {stateA.frameworks.length > 0 ? '(generated)' : ''}
        </button>
        <button
          onClick={() => setActiveForm('B')}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
            activeForm === 'B'
              ? 'bg-prince/15 border-prince/40 text-prince'
              : 'border-metal/30 text-galactic hover:text-cloudy hover:border-metal/50'
          }`}
        >
          Version B {stateB.frameworks.length > 0 ? '(generated)' : ''}
        </button>
      </div>

      {/* Active form — key forces remount on switch so initialValues takes effect */}
      <div className="animate-fadeIn" key={activeForm}>
        {activeForm === 'A' ? (
          <BuildForm onGenerate={handleGenerateA} compact={true} initialValues={stateA.inputs} />
        ) : (
          <BuildForm onGenerate={handleGenerateB} compact={true} initialValues={stateB.inputs} />
        )}
      </div>

      {/* Comparison results */}
      {bothGenerated && (
        <div className="animate-fadeIn">
          {/* Summary */}
          <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-6 mb-5">
            <h3 className="text-white font-semibold text-base mb-4">Comparison Summary</h3>
            <div className="flex flex-col gap-3">
              {['steve-blank', 'geoffrey-moore', 'usp', 'elevator'].map(fwId => {
                const w = winners[fwId]
                if (!w) return null
                const fwName = stateA.frameworks.find(f => f.id === fwId)?.name || fwId
                const winnerColor = w.overallWinner === 'A' ? 'text-azure' : w.overallWinner === 'B' ? 'text-prince' : 'text-galactic'
                const winnerLabel = w.overallWinner === 'A' ? 'Version A' : w.overallWinner === 'B' ? 'Version B' : 'Tie'

                return (
                  <div key={fwId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-metal/10 last:border-0">
                    <span className="text-sm text-cloudy font-medium">{fwName}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-galactic">A:</span>
                        <span className={`text-sm font-bold ${w.overallA >= 70 ? 'text-turtle' : w.overallA >= 45 ? 'text-tangerine' : 'text-coral'}`}>
                          {w.overallA}
                        </span>
                      </div>
                      <span className="text-galactic text-xs">vs</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-galactic">B:</span>
                        <span className={`text-sm font-bold ${w.overallB >= 70 ? 'text-turtle' : w.overallB >= 45 ? 'text-tangerine' : 'text-coral'}`}>
                          {w.overallB}
                        </span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                        w.overallWinner === 'A' ? 'border-azure/30 bg-azure/10' :
                        w.overallWinner === 'B' ? 'border-prince/30 bg-prince/10' :
                        'border-metal/30 bg-metal/10'
                      } ${winnerColor}`}>
                        {winnerLabel}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Side-by-side frameworks */}
          {['steve-blank', 'geoffrey-moore', 'usp', 'elevator'].map(fwId => {
            const fwA = stateA.frameworks.find(f => f.id === fwId)
            const fwB = stateB.frameworks.find(f => f.id === fwId)
            const w = winners[fwId]
            if (!fwA || !fwB || !w) return null

            return (
              <div key={fwId} className="mb-5">
                <h3 className="text-white font-semibold text-base mb-3 flex items-center gap-2">
                  {fwA.name}
                  {w.overallWinner !== 'tie' && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                      w.overallWinner === 'A' ? 'border-azure/30 bg-azure/10 text-azure' : 'border-prince/30 bg-prince/10 text-prince'
                    }`}>
                      {w.overallWinner === 'A' ? 'A wins' : 'B wins'} by {Math.abs(w.overallA - w.overallB)} pts
                    </span>
                  )}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-azure font-medium mb-2 uppercase tracking-wider">Version A</p>
                    <FrameworkCard
                      framework={fwA}
                      inputs={stateA.inputs}
                      showWinner={w.overallWinner === 'A'}
                      winnerDimensions={w.winnersA}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-prince font-medium mb-2 uppercase tracking-wider">Version B</p>
                    <FrameworkCard
                      framework={fwB}
                      inputs={stateB.inputs}
                      showWinner={w.overallWinner === 'B'}
                      winnerDimensions={w.winnersB}
                    />
                  </div>
                </div>
              </div>
            )
          })}

          {/* Tagline comparison */}
          <div>
            <h3 className="text-white font-semibold text-base mb-3">Taglines</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-azure font-medium mb-2 uppercase tracking-wider">Version A</p>
                {stateA.frameworks.find(f => f.id === 'tagline') && (
                  <TaglineSection framework={stateA.frameworks.find(f => f.id === 'tagline')} inputs={stateA.inputs} />
                )}
              </div>
              <div>
                <p className="text-xs text-prince font-medium mb-2 uppercase tracking-wider">Version B</p>
                {stateB.frameworks.find(f => f.id === 'tagline') && (
                  <TaglineSection framework={stateB.frameworks.find(f => f.id === 'tagline')} inputs={stateB.inputs} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prompt to generate both */}
      {!bothGenerated && (stateA.frameworks.length > 0 || stateB.frameworks.length > 0) && (
        <div className="text-center py-8 text-galactic text-sm">
          <p>
            {stateA.frameworks.length > 0 && stateB.frameworks.length === 0 && (
              <>Version A generated. Switch to <span className="text-prince font-medium">Version B</span> and fill in different details to compare.</>
            )}
            {stateB.frameworks.length > 0 && stateA.frameworks.length === 0 && (
              <>Version B generated. Switch to <span className="text-azure font-medium">Version A</span> and fill in different details to compare.</>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
