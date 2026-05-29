import Card from '../ui/Card'

interface TransactionPath {
  from_account: string
  to_account: string
  path_length: number
  total_amount: number
  shortest_path: string[]
  edges: any[]
  patterns: string[]
}

export default function PathAnalysis({ path }: { path: TransactionPath }) {
  return (
    <Card title="Detected Patterns">
      <div className="space-y-3">
        {path.patterns.length === 0 ? (
          <p className="text-text-text5 text-size6">No suspicious patterns detected</p>
        ) : (
          path.patterns.map((pattern, idx) => (
            <div
              key={idx}
              className="p-3 bg-palette-red bg-opacity-10 border border-palette-red rounded-lg"
            >
              <p className="text-palette-red font-semibold text-size6">⚠️ {pattern}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
