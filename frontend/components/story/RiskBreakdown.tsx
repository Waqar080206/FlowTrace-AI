import Card from '../ui/Card'

interface RiskScore {
  layer: string
  score: number
}

interface RiskBreakdownProps {
  scores: RiskScore[]
}

export default function RiskBreakdown({ scores }: RiskBreakdownProps) {
  const maxScore = Math.max(...scores.map((s) => s.score), 100)

  return (
    <Card title="Risk Score Breakdown">
      <div className="space-y-4">
        {scores.map((score) => (
          <div key={score.layer}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-size6 font-semibold text-text-primary">{score.layer}</span>
              <span className="text-size6 font-bold text-palette-red">{score.score}</span>
            </div>
            <div className="w-full bg-palette-light-gray rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-palette-blue to-palette-red transition-all"
                style={{ width: `${(score.score / maxScore) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
