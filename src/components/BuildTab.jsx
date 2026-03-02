import { useState } from 'react'
import BuildForm from './BuildForm.jsx'
import FrameworkCard from './FrameworkCard.jsx'
import TaglineSection from './TaglineSection.jsx'
import ExportPanel from './ExportPanel.jsx'
import { generateFrameworks } from '../utils/vpUtils.js'

export default function BuildTab() {
  const [frameworks, setFrameworks] = useState([])
  const [inputs, setInputs] = useState(null)

  const handleGenerate = (formInputs) => {
    const results = generateFrameworks(formInputs)
    setFrameworks(results)
    setInputs(formInputs)
  }

  const regularFrameworks = frameworks.filter(fw => fw.id !== 'tagline')
  const taglineFramework = frameworks.find(fw => fw.id === 'tagline')

  return (
    <div className="flex flex-col gap-8">
      <BuildForm onGenerate={handleGenerate} />

      {frameworks.length > 0 && (
        <div className="animate-fadeIn">
          {/* Export controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <h2 className="text-white font-semibold text-xl">Your 5 Value Propositions</h2>
            <ExportPanel frameworks={frameworks} inputs={inputs} />
          </div>

          {/* Framework cards */}
          <div className="grid grid-cols-1 gap-5">
            {regularFrameworks.map(fw => (
              <FrameworkCard key={fw.id} framework={fw} inputs={inputs} />
            ))}
          </div>

          {/* Tagline section */}
          {taglineFramework && (
            <div className="mt-5">
              <TaglineSection framework={taglineFramework} inputs={inputs} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
