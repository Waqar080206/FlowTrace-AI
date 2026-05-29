'use client'

import { useState } from 'react'
import AccountSearchForm from '@/components/tools/AccountSearchForm'
import AccountDetails from '@/components/tools/AccountDetails'
import TransactionHistory from '@/components/tools/TransactionHistory'
import LinkedAccounts from '@/components/tools/LinkedAccounts'

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

interface LinkedAccount {
  id: string
  name: string
  risk_score: number
  relationship_type: string
  transaction_count: number
}

const DEMO_ACCOUNT: Account = {
  id: 'SB-3311',
  name: 'Rajan Mehta',
  type: 'Savings',
  risk_score: 94,
  kyc_status: 'Verified',
  declared_income: 35000,
  linked_accounts: 8,
  flagged: true,
  branch: 'Andheri East',
  ifsc: 'UBIN0534789',
  opened_date: '2022-03-15'
}

const DEMO_TRANSACTIONS: Transaction[] = [
  { id: 'TXN001', date: '2026-01-14', time: '09:14 AM', type: 'debit', amount: 80000, counterparty: 'SB-7821', channel: 'UPI', status: 'completed' },
  { id: 'TXN002', date: '2026-01-14', time: '09:22 AM', type: 'credit', amount: 72000, counterparty: 'SB-5603', channel: 'IMPS', status: 'completed' },
  { id: 'TXN003', date: '2026-01-13', time: '14:45 PM', type: 'debit', amount: 50000, counterparty: 'CA-8822', channel: 'NEFT', status: 'completed' },
  { id: 'TXN004', date: '2026-01-13', time: '11:30 AM', type: 'credit', amount: 45000, counterparty: 'SB-4490', channel: 'UPI', status: 'completed' },
  { id: 'TXN005', date: '2026-01-12', time: '09:00 AM', type: 'debit', amount: 35000, counterparty: 'SB-2156', channel: 'IMPS', status: 'completed' },
]

const DEMO_LINKED_ACCOUNTS: LinkedAccount[] = [
  { id: 'SB-7821', name: 'Priya Sharma', risk_score: 87, relationship_type: 'frequent', transaction_count: 12 },
  { id: 'SB-4490', name: 'Amit Patel', risk_score: 82, relationship_type: 'frequent', transaction_count: 8 },
  { id: 'SB-2156', name: 'Deepak Kumar', risk_score: 75, relationship_type: 'occasional', transaction_count: 5 },
  { id: 'SB-5603', name: 'Neha Singh', risk_score: 68, relationship_type: 'occasional', transaction_count: 3 },
]

export default function AccountLookup() {
  const [searchQuery, setSearchQuery] = useState('')
  const [account, setAccount] = useState<Account | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [linkedAccounts, setLinkedAccounts] = useState<LinkedAccount[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError('Please enter an account ID or name')
      return
    }

    setSearchQuery(query)
    setLoading(true)
    setError(null)

    try {
      // Try to fetch from backend API
      const res = await fetch(`/api/account-lookup?query=${encodeURIComponent(query)}`)
      if (res.ok) {
        const data = await res.json()
        setAccount(data)
        setTransactions(data.transactions || DEMO_TRANSACTIONS)
        setLinkedAccounts(data.linked_accounts || DEMO_LINKED_ACCOUNTS)
      } else {
        throw new Error('Account not found')
      }
    } catch (err) {
      console.log('Using demo data')
      // Use demo data if API fails
      setAccount(DEMO_ACCOUNT)
      setTransactions(DEMO_TRANSACTIONS)
      setLinkedAccounts(DEMO_LINKED_ACCOUNTS)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-size9 font-bold text-text-primary font-poppins">Account Lookup</h1>
        <p className="text-text-text5 text-size6 mt-1">Search and analyze individual account details, transaction history, and linked accounts</p>
      </div>

      <div className="bg-bg-primary rounded-lg border border-palette-light-gray p-6">
        <AccountSearchForm onSearch={handleSearch} loading={loading} />
      </div>

      {error && !account && (
        <div className="bg-palette-red bg-opacity-10 border border-palette-red rounded-lg p-4 text-palette-red">
          {error}
        </div>
      )}

      {account && (
        <div className="space-y-6">
          <AccountDetails account={account} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TransactionHistory transactions={transactions} accountId={account.id} />
            </div>
            <div>
              <LinkedAccounts linkedAccounts={linkedAccounts} currentAccountId={account.id} />
            </div>
          </div>
        </div>
      )}

      {!account && !loading && !searchQuery && (
        <div className="bg-bg-secondary rounded-lg border border-palette-light-gray p-8 text-center">
          <p className="text-text-text5 text-size6">Search for an account to get started</p>
        </div>
      )}
    </div>
  )
}
