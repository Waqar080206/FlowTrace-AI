import Card from '../ui/Card'

interface PathEdge {
  from: string
  to: string
  amount: number
  date: string
  channel: string
}

interface TransactionPath {
  from_account: string
  to_account: string
  path_length: number
  total_amount: number
  shortest_path: string[]
  edges: PathEdge[]
  patterns: string[]
}

export default function PathVisualization({ path }: { path: TransactionPath }) {
  return (
    <Card title="Transaction Path">
      <div className="space-y-6">
        {/* Flow diagram */}
        <div className="overflow-x-auto">
          <div className="flex items-center justify-between min-w-full py-4">
            {path.shortest_path.map((accountId, idx) => (
              <div key={accountId} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-palette-blue text-text-secondary flex items-center justify-center font-bold text-size6 flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-text-primary font-mono font-bold text-size5 mt-2">{accountId}</p>
                </div>
                {idx < path.shortest_path.length - 1 && (
                  <div className="flex-1 px-4">
                    <div className="h-1 bg-palette-blue rounded" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Edge details table */}
        <div>
          <h4 className="text-text-primary font-bold text-size6 mb-3">Transaction Details</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-size5">
              <thead>
                <tr className="border-b border-palette-light-gray">
                  <th className="text-left py-2 font-semibold text-text-primary">From</th>
                  <th className="text-left py-2 font-semibold text-text-primary">To</th>
                  <th className="text-right py-2 font-semibold text-text-primary">Amount</th>
                  <th className="text-left py-2 font-semibold text-text-primary">Channel</th>
                  <th className="text-left py-2 font-semibold text-text-primary">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {path.edges.map((edge, idx) => (
                  <tr key={idx} className="border-b border-palette-light-gray">
                    <td className="py-3">
                      <span className="font-mono text-text-primary">{edge.from}</span>
                    </td>
                    <td className="py-3">
                      <span className="font-mono text-text-primary">{edge.to}</span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="font-bold text-palette-red">₹{edge.amount.toLocaleString()}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-text-text5">{edge.channel}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-text-text5">{edge.date}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  )
}
