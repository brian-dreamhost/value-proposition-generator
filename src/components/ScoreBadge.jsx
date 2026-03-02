export default function ScoreBadge({ label, score, highlight = false, size = 'sm' }) {
  // Use full class names so Tailwind can detect them (no string interpolation)
  const textColor = score >= 70 ? 'text-turtle' : score >= 45 ? 'text-tangerine' : 'text-coral'
  const barBg = score >= 70 ? 'bg-turtle' : score >= 45 ? 'bg-tangerine' : 'bg-coral'

  let borderClass, bgClass
  if (highlight) {
    borderClass = score >= 70 ? 'border-turtle/50' : score >= 45 ? 'border-tangerine/50' : 'border-coral/50'
    bgClass = score >= 70 ? 'bg-turtle/10' : score >= 45 ? 'bg-tangerine/10' : 'bg-coral/10'
  } else {
    borderClass = 'border-metal/20'
    bgClass = 'bg-midnight/40'
  }

  // Use inline style for the score bar width since Tailwind can't do dynamic %
  const barWidth = `${Math.max(score, 3)}%`

  if (size === 'lg') {
    return (
      <div className={`flex flex-col gap-1.5 p-3 rounded-xl border ${borderClass} ${bgClass}`}>
        <div className="flex items-center justify-between">
          <span className="text-xs text-galactic font-medium">{label}</span>
          <span className={`text-sm font-bold ${textColor}`}>{score}</span>
        </div>
        <div className="h-1.5 bg-metal/20 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barBg}`}
            style={{ width: barWidth }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-1 p-2 rounded-lg border ${borderClass} ${bgClass}`}>
      <div className="flex items-center justify-between gap-1">
        <span className="text-[10px] sm:text-xs text-galactic truncate">{label}</span>
        <span className={`text-xs font-bold ${textColor}`}>{score}</span>
      </div>
      <div className="h-1 bg-metal/20 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barBg}`}
          style={{ width: barWidth }}
        />
      </div>
    </div>
  )
}
