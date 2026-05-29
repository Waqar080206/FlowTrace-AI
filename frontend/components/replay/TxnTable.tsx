import Card from '../ui/Card'

interface Transaction {
  id: number
  timestamp: string
  from: string
  to: string
  amount: number
  method: string
  detail: string
}

interface TxnTableProps {
  transactions: Transaction[]
  currentStep: number
}

export default function TxnTable({ transactions, currentStep }: TxnTableProps) {
  return (
    <Card title={`Transactions (${transactions.length} steps)`}>
      <div className="overflow-x-auto">
        <table className="w-full text-size6">
          <thead className="border-b border-palette-light-gray bg-bg-secondary">
            <tr>
              <th className="text-left p-3 font-semibold text-text-primary">#</th>
              <th className="text-left p-3 font-semibold text-text-primary">Time</th>
              <th className="text-left p-3 font-semibold text-text-primary">From</th>
              <th className="text-left p-3 font-semibold text-text-primary">To</th>
              <th className="text-right p-3 font-semibold text-text-primary">Amount</th>
              <th className="text-left p-3 font-semibold text-text-primary">Method</th>
              <th className="text-left p-3 font-semibold text-text-primary">Detail</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, idx) => (
              <tr
                key={txn.id}
                className={`border-b border-palette-light-gray ${
                  currentStep === idx + 1 ? 'bg-palette-red bg-opacity-10' : 'hover:bg-bg-secondary'
                }`}
              >
                <td className="p-3 text-text-primary font-semibold">{idx + 1}</td>
                <td className="p-3 text-text-text5 font-mono">{txn.timestamp}</td>
                <td className="p-3 font-bold text-text-primary">{txn.from}</td>
                <td className="p-3 font-bold text-text-primary">{txn.to}</td>
                <td className="p-3 text-right font-bold text-palette-red">₹{txn.amount.toLocaleString()}</td>
                <td className="p-3 text-text-text5">{txn.method}</td>
                <td className="p-3 text-text-text4">{txn.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
