import Card from '../ui/Card'

interface Transaction {
  id: string
  date: string
  time: string
  type: 'debit' | 'credit'
  amount: number
  counterparty: string
  channel: string
  status: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
  accountId: string
}

export default function TransactionHistory({ transactions, accountId }: TransactionHistoryProps) {
  return (
    <Card title="Recent Transactions">
      <div className="overflow-x-auto">
        <table className="w-full text-size6">
          <thead>
            <tr className="border-b border-palette-light-gray">
              <th className="text-left py-2 font-semibold text-text-primary">Date & Time</th>
              <th className="text-left py-2 font-semibold text-text-primary">Type</th>
              <th className="text-left py-2 font-semibold text-text-primary">Counterparty</th>
              <th className="text-right py-2 font-semibold text-text-primary">Amount</th>
              <th className="text-left py-2 font-semibold text-text-primary">Channel</th>
              <th className="text-left py-2 font-semibold text-text-primary">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-b border-palette-light-gray hover:bg-bg-secondary transition">
                <td className="py-3">
                  <div>
                    <p className="text-text-primary font-semibold">{txn.date}</p>
                    <p className="text-text-text5 text-size5">{txn.time}</p>
                  </div>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-size5 font-semibold ${
                    txn.type === 'debit'
                      ? 'bg-palette-red bg-opacity-10 text-palette-red'
                      : 'bg-palette-blue bg-opacity-10 text-palette-blue'
                  }`}>
                    {txn.type === 'debit' ? '↗ Debit' : '↙ Credit'}
                  </span>
                </td>
                <td className="py-3">
                  <p className="text-text-primary font-mono">{txn.counterparty}</p>
                </td>
                <td className="py-3 text-right">
                  <p className={`font-bold ${txn.type === 'debit' ? 'text-palette-red' : 'text-palette-blue'}`}>
                    {txn.type === 'debit' ? '-' : '+'}₹{txn.amount.toLocaleString()}
                  </p>
                </td>
                <td className="py-3">
                  <span className="text-text-text5">{txn.channel}</span>
                </td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-palette-blue bg-opacity-10 text-palette-blue rounded text-size5 font-semibold">
                    {txn.status === 'completed' ? '✓ Completed' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
