import { useState } from 'react'
import BuildForm from './components/BuildForm.jsx'
import FrameworkCard from './components/FrameworkCard.jsx'
import AnalyzeTab from './components/AnalyzeTab.jsx'
import { generateFrameworks } from './utils/vpUtils.js'

const TABS = ['Build', 'Analyze Existing']

export default function App() {
  const [activeTab, setActiveTab] = useState('Build')
  const [frameworks, setFrameworks] = useState([])

  const handleGenerate = (inputs) => {
    const results = generateFrameworks(inputs)
    setFrameworks(results)
  }

  return (
    <div className="bg-glow bg-grid min-h-screen">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
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
            Struggling to explain what you do and why it matters? Enter your product details once and get 5 proven frameworks — Steve Blank, Geoffrey Moore, USP, Elevator Pitch, and a punchy Tagline.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-metal/20 pb-0">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors -mb-px border-b-2 ${
                activeTab === tab
                  ? 'border-azure text-azure'
                  : 'border-transparent text-galactic hover:text-cloudy'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'Build' ? (
          <div className="flex flex-col gap-8">
            <BuildForm onGenerate={handleGenerate} />
            {frameworks.length > 0 && (
              <div>
                <h2 className="text-white font-semibold text-xl mb-5">Your 5 Value Propositions</h2>
                <div className="grid grid-cols-1 gap-5">
                  {frameworks.map(fw => (
                    <FrameworkCard key={fw.id} framework={fw} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <AnalyzeTab />
        )}

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
