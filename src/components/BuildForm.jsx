import { useState } from 'react';

const EXAMPLE = {
  productName: 'DreamHost',
  whatItDoes: 'provides managed web hosting with one-click WordPress installs and 24/7 expert support',
  whoItsFor: 'small business owners who want a professional website without the tech headaches',
  painSolved: 'confusing server management and unreliable hosting that causes downtime',
  keyBenefit: 'launch and maintain a fast, reliable website in minutes',
  differentiator: 'we offer a 97-day money-back guarantee with US-based support available around the clock',
  socialProof: 'Trusted by 1.5 million websites worldwide'
};

export default function BuildForm({ onGenerate }) {
  const [inputs, setInputs] = useState({ productName: '', whatItDoes: '', whoItsFor: '', painSolved: '', keyBenefit: '', differentiator: '', socialProof: '' });

  const set = (field) => (e) => setInputs(prev => ({ ...prev, [field]: e.target.value }));

  const canGenerate = inputs.productName && inputs.whatItDoes && inputs.whoItsFor && inputs.painSolved && inputs.keyBenefit && inputs.differentiator;

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold text-lg">Your Product Details</h2>
        <button
          onClick={() => setInputs(EXAMPLE)}
          className="text-xs px-3 py-1.5 rounded-lg border border-metal/40 text-galactic hover:text-white hover:border-azure transition-colors"
        >
          Fill Example
        </button>
      </div>

      {[
        { field: 'productName', label: 'Product / Company Name', placeholder: 'e.g. DreamHost', hint: '' },
        { field: 'whatItDoes', label: 'What it does', placeholder: 'Describe in 1 sentence (≤25 words)', hint: 'Keep this to one clear sentence.' },
        { field: 'whoItsFor', label: "Who it's for", placeholder: 'e.g. small business owners who want a professional website', hint: 'Be specific about your target customer.' },
        { field: 'painSolved', label: 'Primary pain it solves', placeholder: 'e.g. confusing server setup and unreliable hosting', hint: '' },
        { field: 'keyBenefit', label: 'Key benefit delivered', placeholder: 'e.g. launch a fast, reliable website in minutes', hint: '' },
        { field: 'differentiator', label: 'Main differentiator vs. alternatives', placeholder: 'e.g. 97-day money-back guarantee with US-based support', hint: 'What makes you the only logical choice?' },
        { field: 'socialProof', label: 'Social proof hint', placeholder: 'e.g. Trusted by 1.5 million websites (optional)', hint: 'Optional — adds credibility to the elevator pitch.' },
      ].map(({ field, label, placeholder, hint }) => (
        <div key={field} className="flex flex-col gap-1">
          <label className="text-sm font-medium text-cloudy">{label}</label>
          {hint && <p className="text-xs text-galactic">{hint}</p>}
          <input
            type="text"
            value={inputs[field]}
            onChange={set(field)}
            placeholder={placeholder}
            className="bg-midnight border border-metal/30 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
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
  );
}
