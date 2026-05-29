import Card from '../ui/Card'
import Badge from '../ui/Badge'

interface LinkedAccount {
  id: string
  name: string
  risk_score: number
  relationship_type: string
  transaction_count: number
}

interface LinkedAccountsProps {
  linkedAccounts: LinkedAccount[]
  currentAccountId: string
}

export default function LinkedAccounts({ linkedAccounts, currentAccountId }: LinkedAccountsProps) {
  return (
    <Card title="Linked Accounts">
      <div className="space-y-3">
        {linkedAccounts.length === 0 ? (
          <p className="text-text-text5 text-size6">No linked accounts</p>
        ) : (
          linkedAccounts.map((account) => (
            <div
              key={account.id}
              className="p-3 border border-palette-light-gray rounded-lg hover:border-palette-blue transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-text-primary font-bold text-size6">{account.id}</p>
                  <p className="text-text-text5 text-size5">{account.name}</p>
                </div>
                <Badge level={
                  account.risk_score >= 80 ? 'high' : account.risk_score >= 60 ? 'medium' : 'low'
                }>
                  {account.risk_score}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-size5">
                <div>
                  <p className="text-text-text5 font-semibold">Type</p>
                  <p className="text-text-primary capitalize">{account.relationship_type}</p>
                </div>
                <div>
                  <p className="text-text-text5 font-semibold">Txns</p>
                  <p className="text-text-primary">{account.transaction_count}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
