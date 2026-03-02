import { useState } from 'react'

const EXAMPLE = {
  productName: 'DreamHost',
  whatItDoes: 'provides managed web hosting with one-click WordPress installs and 24/7 expert support',
  whoItsFor: 'small business owners who want a professional website without the tech headaches',
  painSolved: 'confusing server management and unreliable hosting that causes downtime',
  keyBenefit: 'launch and maintain a fast, reliable website in minutes',
  differentiator: 'we offer a 97-day money-back guarantee with US-based support available around the clock',
  socialProof: 'Trusted by 1.5 million websites worldwide',
}

const FIELDS = [
  { field: 'productName', label: 'Product / Company Name', placeholder: 'e.g. DreamHost', hint: '' },
  { field: 'whatItDoes', label: 'What it does', placeholder: 'Describe in 1 sentence', hint: 'One clear sentence about your product\'s core function.' },
  { field: 'whoItsFor', label: "Who it's for", placeholder: 'e.g. small business owners who want a professional website', hint: 'Be specific about your target customer and their situation.' },
  { field: 'painSolved', label: 'Primary pain it solves', placeholder: 'e.g. confusing server setup and unreliable hosting', hint: 'What problem keeps them up at night?' },
  { field: 'keyBenefit', label: 'Key benefit delivered', placeholder: 'e.g. launch a fast, reliable website in minutes', hint: 'The outcome they achieve, not the feature you provide.' },
  { field: 'differentiator', label: 'Main differentiator vs. alternatives', placeholder: 'e.g. 97-day money-back guarantee with US-based support', hint: 'What makes you the only logical choice?' },
  { field: 'socialProof', label: 'Social proof (optional)', placeholder: 'e.g. Trusted by 1.5 million websites', hint: 'Optional — adds credibility to the elevator pitch.' },
]

const EMPTY_INPUTS = { productName: '', whatItDoes: '', whoItsFor: '', painSolved: '', keyBenefit: '', differentiator: '', socialProof: '' }

export default function BuildForm({ onGenerate, initialValues = null, compact = false }) {
  const [inputs, setInputs] = useState(initialValues || EMPTY_INPUTS)

  const set = (field) => (e) => setInputs(prev => ({ ...prev, [field]: e.target.value }))

  const canGenerate = inputs.productName && inputs.whatItDoes && inputs.whoItsFor && inputs.painSolved && inputs.keyBenefit && inputs.differentiator

  const filledCount = FIELDS.filter(f => f.field !== 'socialProof' && inputs[f.field]).length
  const totalRequired = FIELDS.filter(f => f.field !== 'socialProof').length

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-white font-semibold text-lg">Your Product Details</h2>
          {!compact && (
            <span className="text-xs text-galactic">
              {filledCount}/{totalRequired} required
            </span>
          )}
        </div>
        <button
          onClick={() => setInputs(EXAMPLE)}
          className="text-xs px-3 py-1.5 rounded-lg border border-metal/40 text-galactic hover:text-white hover:border-azure transition-colors shrink-0"
        >
          Fill Example
        </button>
      </div>

      {FIELDS.map(({ field, label, placeholder, hint }) => (
        <div key={field} className="flex flex-col gap-1">
          <label className="text-sm font-medium text-cloudy">
            {label}
            {field !== 'socialProof' && !inputs[field] && (
              <span className="text-coral ml-1">*</span>
            )}
          </label>
          {hint && !compact && <p className="text-xs text-galactic">{hint}</p>}
          <input
            type="text"
            value={inputs[field]}
            onChange={set(field)}
            placeholder={placeholder}
            className="bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss transition-colors"
          />
        </div>
      ))}

      <button
        onClick={() => canGenerate && onGenerate(inputs)}
        disabled={!canGenerate}
        className="mt-2 w-full py-3 rounded-lg bg-azure text-white font-semibold hover:bg-azure-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
      >
        Generate Value Propositions
      </button>
    </div>
  )
}
