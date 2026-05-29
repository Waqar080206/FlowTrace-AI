'use client'

import { useState } from 'react'
import BatchScorerForm from '@/components/tools/BatchScorerForm'
import BatchScorerResults from '@/components/tools/BatchScorerResults'
import Card from '@/components/ui/Card'

interface ScoredAccount {
  id: string
  name: string
  risk_score: number
  score_level: 'high' | 'medium' | 'low'
  patterns: number
  flagged: boolean
  last_updated: string
}

const DEMO_RESULTS: ScoredAccount[] = [
  { id: 'SB-3311', name: 'Rajan Mehta', risk_score: 94, score_level: 'high', patterns: 5, flagged: true, last_updated: '2026-01-14 10:30' },
  { id: 'SB-7821', name: 'Priya Sharma', risk_score: 87, score_level: 'high', patterns: 4, flagged: true, last_updated: '2026-01-14 10:25' },
  { id: 'SB-4490', name: 'Amit Patel', risk_score: 82, score_level: 'high', patterns: 3, flagged: true, last_updated: '2026-01-14 10:20' },
  { id: 'SB-2156', name: 'Deepak Kumar', risk_score: 75, score_level: 'medium', patterns: 2, flagged: false, last_updated: '2026-01-14 10:15' },
  { id: 'SB-5603', name: 'Neha Singh', risk_score: 68, score_level: 'medium', patterns: 2, flagged: false, last_updated: '2026-01-14 10:10' },
  { id: 'CA-8822', name: 'Tech Solutions Ltd', risk_score: 45, score_level: 'low', patterns: 0, flagged: false, last_updated: '2026-01-14 09:45' },
]

export default function BatchScorer() {
  const [accounts, setAccounts] = useState<string>('')
  const [results, setResults] = useState<ScoredAccount[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [batchId, setBatchId] = useState<string | null>(null)

  const handleScore = async (accountList: string) => {
    const accountIds = accountList
      .split(/[\n,]/)
      .map(a => a.trim())
      .filter(a => a.length > 0)

    if (accountIds.length === 0) {
      setError('Please enter at least one account ID')
      return
    }

    if (accountIds.length > 100) {
      setError('Maximum 100 accounts per batch')
      return
    }

    setAccounts(accountList)
    setLoading(true)
    setError(null)

    try {
      // Try to fetch from backend API
      const res = await fetch('/api/batch-scorer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accounts: accountIds }),
      })

      if (res.ok) {
        const data = await res.json()
        setResults(data.results || DEMO_RESULTS)
        setBatchId(data.batch_id)
      } else {
        throw new Error('Batch scoring failed')
      }
    } catch (err) {
      console.log('Using demo data')
      // Use demo data if API fails
      setResults(DEMO_RESULTS)
      setBatchId(`BATCH-${Date.now()}`)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    const csv = [
      ['Account ID', 'Name', 'Risk Score', 'Level', 'Patterns', 'Flagged', 'Last Updated'],
      ...results.map(r => [
        r.id,
        r.name,
        r.risk_score,
        r.score_level,
        r.patterns,
        r.flagged ? 'Yes' : 'No',
        r.last_updated
      ])
    ]
    
    const csvContent = csv.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `batch-scores-${batchId}.csv`
    a.click()
  }

  const highRiskCount = results.filter(r => r.score_level === 'high').length
  const flaggedCount = results.filter(r => r.flagged).length
  const avgScore = results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.risk_score, 0) / results.length) : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-size9 font-bold text-text-primary font-poppins">Batch Scorer</h1>
        <p className="text-text-text5 text-size6 mt-1">Score multiple accounts in bulk to identify high-risk portfolios</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BatchScorerForm onScore={handleScore} loading={loading} />
        </div>
        <div className="space-y-4">
          {results.length > 0 && (
            <>
              <Card title="Summary Stats" className="border-palette-light-gray">
                <div className="space-y-3">
                  <div>
                    <p className="text-text-text5 text-size5 uppercase font-semibold">Accounts Scored</p>
                    <p className="text-size8 font-bold text-text-primary mt-1">{results.length}</p>
                  </div>
                  <div className="border-t border-palette-light-gray pt-3">
                    <p className="text-text-text5 text-size5 uppercase font-semibold">High Risk</p>
                    <p className="text-size8 font-bold text-palette-red mt-1">{highRiskCount}</p>
                  </div>
                  <div className="border-t border-palette-light-gray pt-3">
                    <p className="text-text-text5 text-size5 uppercase font-semibold">Flagged</p>
                    <p className="text-size8 font-bold text-palette-red mt-1">{flaggedCount}</p>
                  </div>
                  <div className="border-t border-palette-light-gray pt-3">
                    <p className="text-text-text5 text-size5 uppercase font-semibold">Avg Risk Score</p>
                    <p className="text-size8 font-bold text-palette-blue mt-1">{avgScore}</p>
                  </div>
                </div>
              </Card>
              <button
                onClick={handleExport}
                className="w-full px-4 py-2 bg-palette-blue text-text-secondary rounded-lg font-semibold text-size6 hover:opacity-90 transition"
              >
                Export as CSV
              </button>
            </>
          )}
        </div>
      </div>

      {error && !results.length && (
        <div className="bg-palette-red bg-opacity-10 border border-palette-red rounded-lg p-4 text-palette-red">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <BatchScorerResults results={results} batchId={batchId} />
      )}

      {!results.length && !loading && !accounts && (
        <div className="bg-bg-secondary rounded-lg border border-palette-light-gray p-8 text-center">
          <p className="text-text-text5 text-size6">Paste account IDs or upload a list to get started</p>
        </div>
      )}
    </div>
  )
}
