import { useState } from 'react';
import { analyzeExisting } from '../utils/vpUtils.js';
import ClarityBadge from './ClarityBadge.jsx';

export default function AnalyzeTab() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    const r = analyzeExisting(text);
    setResult(r);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="card-gradient border border-metal/20 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-white font-semibold text-lg">Analyze Your Existing Value Proposition</h2>
        <p className="text-cloudy text-sm">Paste your current value prop, tagline, or About page opener. We'll identify the framework, score its clarity, and suggest improvements.</p>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={5}
          placeholder="Paste your value proposition here..."
          className="w-full bg-midnight border border-metal/30 rounded-lg p-3 text-sm text-white placeholder:text-galactic resize-y focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
        />
        <button
          onClick={handleAnalyze}
          disabled={!text.trim()}
          className="w-full py-3 rounded-lg bg-azure text-white font-semibold hover:bg-azure-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Analyze
        </button>
      </div>

      {result && (
        <div className="card-gradient border border-metal/20 rounded-2xl p-6 flex flex-col gap-5 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-galactic uppercase tracking-wider mb-1">Closest Framework</p>
              <p className="text-white font-semibold">{result.framework}</p>
            </div>
            <div className="flex items-center gap-4">
              <ClarityBadge score={result.score} />
              <span className="text-xs text-galactic">{result.wordCount} words</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-galactic uppercase tracking-wider mb-3">3 Improvement Tips</p>
            <ul className="flex flex-col gap-2">
              {result.tips.map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-cloudy">
                  <span className="text-turtle font-bold shrink-0">{i + 1}.</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-midnight/60 border border-metal/20 rounded-xl p-4">
            <p className="text-xs text-galactic uppercase tracking-wider mb-2">Suggested Rewrite</p>
            <p className="text-sm text-cloudy italic">{result.rewrite}</p>
          </div>
        </div>
      )}
    </div>
  );
}
