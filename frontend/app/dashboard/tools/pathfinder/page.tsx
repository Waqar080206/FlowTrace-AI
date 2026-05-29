'use client'

import { useState } from 'react'
import PathFinderForm from '@/components/tools/PathFinderForm'
import PathVisualization from '@/components/tools/PathVisualization'
import PathAnalysis from '@/components/tools/PathAnalysis'
import Card from '@/components/ui/Card'
import ErrorState, { ErrorAlert } from '@/components/ui/ErrorState'
import { SkeletonCard, SkeletonGrid } from '@/components/ui/LoadingSkeleton'

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
  const [usingDemoData, setUsingDemoData] = useState(false)

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
    setUsingDemoData(false)

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
      setUsingDemoData(true)
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

      {/* Error Alert */}
      {error && !path && (
        <ErrorAlert 
          message={error}
          onDismiss={() => setError(null)}
          variant="error"
        />
      )}

      {/* Demo Data Warning */}
      {usingDemoData && path && (
        <ErrorAlert 
          message="Showing demo path. Backend API is currently unavailable."
          variant="info"
        />
      )}

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          <SkeletonGrid cols={4} items={4} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><SkeletonCard /></div>
            <div><SkeletonCard /></div>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && path && (
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

      {/* Empty State */}
      {!path && !loading && !fromAccount && (
        <div className="bg-bg-secondary rounded-lg border border-palette-light-gray p-8 text-center">
          <div className="text-4xl mb-4">🔗</div>
          <p className="text-text-text5 text-size6">Enter two accounts to find a transaction path between them</p>
          <p className="text-text-text6 text-size5 mt-2">Try: From SB-3311 to SB-5603</p>
        </div>
      )}

      {/* Not Found State */}
      {!loading && error && fromAccount && !path && (
        <div className="bg-bg-secondary rounded-lg border border-palette-light-gray p-8">
          <ErrorState
            title="No Path Found"
            message={`Unable to find a transaction path from ${fromAccount} to ${toAccount}. The accounts may not be connected or the transaction history may be limited.`}
            icon="🔍"
            onRetry={() => handleFind(fromAccount, toAccount)}
            actionLabel="Try Again"
          />
        </div>
      )}
    </div>
  )
}
