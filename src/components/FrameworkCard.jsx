import { useState } from 'react';
import ClarityBadge from './ClarityBadge.jsx';
import { clarityScore } from '../utils/vpUtils.js';

export default function FrameworkCard({ framework }) {
  const [text, setText] = useState(framework.text);
  const [copied, setCopied] = useState(false);

  const score = clarityScore(text, framework.isTagline);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 flex flex-col gap-4 animate-fadeIn">
      <div>
        <h3 className="text-white font-semibold text-base">{framework.name}</h3>
        <p className="text-galactic text-xs mt-1 italic">{framework.description}</p>
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={framework.isTagline ? 2 : 4}
        className="w-full bg-midnight border border-metal/30 rounded-lg p-3 text-cloudy text-sm resize-y focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
      />
      <div className="flex items-center justify-between flex-wrap gap-2">
        <ClarityBadge score={score} />
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1.5 rounded-lg bg-azure/10 border border-azure/30 text-azure hover:bg-azure hover:text-white transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
