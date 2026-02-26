export default function ClarityBadge({ score }) {
  const color = score >= 70 ? 'text-turtle border-turtle' : score >= 40 ? 'text-tangerine border-tangerine' : 'text-coral border-coral';
  const label = score >= 70 ? 'Clear' : score >= 40 ? 'Needs work' : 'Unclear';
  return (
    <div className={`flex items-center gap-2 text-sm font-medium border rounded-full px-3 py-1 ${color}`}>
      <span>{score}/100</span>
      <span>·</span>
      <span>{label}</span>
    </div>
  );
}
