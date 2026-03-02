import { useState } from 'react'
import BuildTab from './components/BuildTab.jsx'
import AnalyzeTab from './components/AnalyzeTab.jsx'
import CompareTab from './components/CompareTab.jsx'

const TABS = [
  { id: 'build', label: 'Build', icon: 'M12 4.5v15m7.5-7.5h-15' },
  { id: 'analyze', label: 'Analyze', icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' },
  { id: 'compare', label: 'A/B Compare', icon: 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('build')

  return (
    <div className="bg-glow bg-grid min-h-screen">
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-galactic">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors">Free Tools</a>
          <span className="mx-2 text-metal">/</span>
          <a href="https://seo-tools-tau.vercel.app/copywriting/" className="text-azure hover:text-white transition-colors">Copywriting Tools</a>
          <span className="mx-2 text-metal">/</span>
          <span className="text-cloudy">Value Proposition Generator</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center border border-turtle text-turtle rounded-full px-4 py-2 text-sm font-medium mb-4">
            Free Copywriting Tool
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Value Proposition Generator</h1>
          <p className="text-cloudy text-lg max-w-2xl mx-auto">
            Enter your product details once and get 5 scored frameworks — Steve Blank, Geoffrey Moore, USP, Elevator Pitch, and Tagline — with specific improvement tips for each.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-8 border-b border-metal/20 pb-0 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors -mb-px border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-azure text-azure'
                  : 'border-transparent text-galactic hover:text-cloudy'
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
              </svg>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'build' && <BuildTab />}
        {activeTab === 'analyze' && <AnalyzeTab />}
        {activeTab === 'compare' && <CompareTab />}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-metal/30 text-center text-sm text-galactic">
          Free marketing tools by{' '}
          <a href="https://www.dreamhost.com" target="_blank" rel="noopener" className="text-azure hover:text-white transition-colors">
            DreamHost
          </a>
        </footer>
      </div>
    </div>
  )
}
