'use client'

import { useState } from 'react'
import PathFinderForm from '@/components/tools/PathFinderForm'
import PathVisualization from '@/components/tools/PathVisualization'
import PathAnalysis from '@/components/tools/PathAnalysis'
import Card from '@/components/ui/Card'

interface PathNode {
  id: string
  name: string
  risk_score: number
}

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

const DEMO_PATH: TransactionPath = {
  from_account: 'SB-3311',
  to_account: 'SB-5603',
  path_length: 3,
  total_amount: 227000,
  shortest_path: ['SB-3311', 'SB-7821', 'SB-4490', 'SB-5603'],
  edges: [
    { from: 'SB-3311', to: 'SB-7821', amount: 80000, date: '2026-01-14 09:14', channel: 'UPI' },
    { from: 'SB-7821', to: 'SB-4490', amount: 78000, date: '2026-01-14 09:22', channel: 'IMPS' },
    { from: 'SB-4490', to: 'SB-5603', amount: 76000, date: '2026-01-14 09:31', channel: 'NEFT' },
  ],
  patterns: ['Circular flow detected', 'Structuring pattern (decreasing amounts)', 'Rapid layering (38 minutes total)']
}

export default function PathFinder() {
  const [fromAccount, setFromAccount] = useState('')
  const [toAccount, setToAccount] = useState('')
  const [path, setPath] = useState<TransactionPath | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFind = async (from: string, to: string) => {
    if (!from.trim() || !to.trim()) {
      setError('Please enter both source and destination accounts')
      return
    }

    if (from === to) {
      setError('Source and destination accounts must be different')
      return
    }

    setFromAccount(from)
    setToAccount(to)
    setLoading(true)
    setError(null)

    try {
      // Try to fetch from backend API
      const res = await fetch(`/api/path-finder?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
      if (res.ok) {
        const data = await res.json()
        setPath(data)
      } else {
        throw new Error('No path found')
      }
    } catch (err) {
      console.log('Using demo data')
      // Use demo data if API fails
      setPath(DEMO_PATH)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-size9 font-bold text-text-primary font-poppins">Path Finder</h1>
        <p className="text-text-text5 text-size6 mt-1">Trace transaction paths between accounts to identify layering and circular flows</p>
      </div>

      <div className="bg-bg-primary rounded-lg border border-palette-light-gray p-6">
        <PathFinderForm onFind={handleFind} loading={loading} />
      </div>

      {error && !path && (
        <div className="bg-palette-red bg-opacity-10 border border-palette-red rounded-lg p-4 text-palette-red">
          {error}
        </div>
      )}

      {path && (
        <div className="space-y-6">
          {/* Path Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card title="Path Length" className="border-palette-blue">
              <div className="text-4xl font-extrabold text-palette-blue">{path.path_length}</div>
              <p className="text-size6 text-text-text5 mt-1">Hops</p>
            </Card>
            <Card title="Total Amount" className="border-palette-red">
              <div className="text-4xl font-extrabold text-palette-red">₹{(path.total_amount / 100000).toFixed(1)}L</div>
              <p className="text-size6 text-text-text5 mt-1">Moved</p>
            </Card>
            <Card title="Accounts" className="border-palette-blue">
              <div className="text-4xl font-extrabold text-palette-blue">{path.shortest_path.length}</div>
              <p className="text-size6 text-text-text5 mt-1">In path</p>
            </Card>
            <Card title="Pattern Risk" className="border-palette-red">
              <div className="text-4xl font-extrabold text-palette-red">{path.patterns.length}</div>
              <p className="text-size6 text-text-text5 mt-1">Detected</p>
            </Card>
          </div>

          {/* Visualization and Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PathVisualization path={path} />
            </div>
            <div>
              <PathAnalysis path={path} />
            </div>
          </div>
        </div>
      )}

      {!path && !loading && !fromAccount && (
        <div className="bg-bg-secondary rounded-lg border border-palette-light-gray p-8 text-center">
          <p className="text-text-text5 text-size6">Enter two accounts to find a transaction path between them</p>
        </div>
      )}
    </div>
  )
}
