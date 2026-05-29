import Card from '../ui/Card'
import Badge from '../ui/Badge'

interface ScoredAccount {
  id: string
  name: string
  risk_score: number
  score_level: 'high' | 'medium' | 'low'
  patterns: number
  flagged: boolean
  last_updated: string
}

interface BatchScorerResultsProps {
  results: ScoredAccount[]
  batchId: string | null
}

export default function BatchScorerResults({ results, batchId }: BatchScorerResultsProps) {
  const sortedResults = [...results].sort((a, b) => b.risk_score - a.risk_score)

  return (
    <Card title={`Results (${results.length} accounts)`}>
      <div className="space-y-2">
        {batchId && (
          <p className="text-text-text5 text-size5 mb-4">
            Batch ID: <span className="font-mono text-text-primary">{batchId}</span>
          </p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-size5">
            <thead>
              <tr className="border-b border-palette-light-gray">
                <th className="text-left py-2 font-semibold text-text-primary">Account</th>
                <th className="text-left py-2 font-semibold text-text-primary">Name</th>
                <th className="text-center py-2 font-semibold text-text-primary">Risk Score</th>
                <th className="text-center py-2 font-semibold text-text-primary">Level</th>
                <th className="text-center py-2 font-semibold text-text-primary">Patterns</th>
                <th className="text-center py-2 font-semibold text-text-primary">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((account) => (
                <tr
                  key={account.id}
                  className={`border-b border-palette-light-gray hover:bg-bg-secondary transition ${
                    account.flagged ? 'bg-palette-red bg-opacity-5' : ''
                  }`}
                >
                  <td className="py-3">
                    <span className="font-mono font-bold text-text-primary">{account.id}</span>
                  </td>
                  <td className="py-3">
                    <span className="text-text-primary">{account.name}</span>
                  </td>
                  <td className="py-3 text-center">
                    <span className={`font-bold ${
                      account.score_level === 'high'
                        ? 'text-palette-red'
                        : account.score_level === 'medium'
                        ? 'text-bg-secondary'
                        : 'text-palette-blue'
                    }`}>
                      {account.risk_score}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <Badge level={account.score_level === 'high' ? 'high' : account.score_level === 'medium' ? 'medium' : 'low'}>
                      {account.score_level}
                    </Badge>
                  </td>
                  <td className="py-3 text-center">
                    <span className="text-text-primary font-semibold">{account.patterns}</span>
                  </td>
                  <td className="py-3 text-center">
                    {account.flagged ? (
                      <span className="px-2 py-1 bg-palette-red bg-opacity-10 text-palette-red rounded text-size4 font-semibold">
                        🚩 Flagged
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-palette-blue bg-opacity-10 text-palette-blue rounded text-size4 font-semibold">
                        ✓ Clear
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
