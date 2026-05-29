import Card from '../ui/Card'
import Badge from '../ui/Badge'

interface Account {
  id: string
  name: string
  type: string
  risk_score: number
  kyc_status: string
  declared_income: number
  linked_accounts: number
  flagged: boolean
  branch: string
  ifsc: string
  opened_date: string
}

export default function AccountDetails({ account }: { account: Account }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Details */}
      <div className="lg:col-span-2 space-y-4">
        <Card title="Account Information">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-text-text5 text-size5 uppercase font-semibold">Account ID</p>
                <p className="text-text-primary font-bold text-size7 mt-1">{account.id}</p>
              </div>
              <div>
                <p className="text-text-text5 text-size5 uppercase font-semibold">Account Type</p>
                <p className="text-text-primary font-bold text-size7 mt-1">{account.type}</p>
              </div>
              <div>
                <p className="text-text-text5 text-size5 uppercase font-semibold">Account Holder</p>
                <p className="text-text-primary font-bold text-size7 mt-1">{account.name}</p>
              </div>
              <div>
                <p className="text-text-text5 text-size5 uppercase font-semibold">Opened Date</p>
                <p className="text-text-primary font-bold text-size7 mt-1">{new Date(account.opened_date).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Branch & IFSC">
          <div className="space-y-2">
            <p><span className="text-text-text5 font-semibold">Branch:</span> <span className="text-text-primary">{account.branch}</span></p>
            <p><span className="text-text-text5 font-semibold">IFSC:</span> <span className="text-text-primary font-mono">{account.ifsc}</span></p>
          </div>
        </Card>
      </div>

      {/* Right Sidebar Stats */}
      <div className="space-y-4">
        <Card title="Risk Status">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-text-text5 font-semibold">Risk Score</span>
                <span className="text-text-primary font-bold">{account.risk_score}/100</span>
              </div>
              <div className="w-full bg-palette-light-gray rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition ${
                    account.risk_score >= 80
                      ? 'bg-palette-red'
                      : account.risk_score >= 60
                      ? 'bg-bg-secondary'
                      : 'bg-palette-blue'
                  }`}
                  style={{ width: `${account.risk_score}%` }}
                />
              </div>
            </div>
            <div className="border-t border-palette-light-gray pt-3">
              <p className="text-text-text5 text-size5 uppercase font-semibold">KYC Status</p>
              <p className={`text-size7 font-bold mt-1 ${
                account.kyc_status === 'Verified' ? 'text-palette-blue' : 'text-palette-red'
              }`}>
                {account.kyc_status}
              </p>
            </div>
            <div className="border-t border-palette-light-gray pt-3">
              <p className="text-text-text5 text-size5 uppercase font-semibold">Declared Income</p>
              <p className="text-size7 font-bold mt-1 text-text-primary">₹{account.declared_income.toLocaleString()}/mo</p>
            </div>
            {account.flagged && (
              <div className="border-t border-palette-light-gray pt-3">
                <Badge level="high">🚩 FLAGGED FOR REVIEW</Badge>
              </div>
            )}
          </div>
        </Card>

        <Card title="Network">
          <div>
            <p className="text-text-text5 text-size5 uppercase font-semibold">Linked Accounts</p>
            <p className="text-size8 font-bold text-palette-blue mt-2">{account.linked_accounts}</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
