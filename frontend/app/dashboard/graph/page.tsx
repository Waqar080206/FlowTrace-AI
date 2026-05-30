'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import GraphCanvas from '@/components/graph/GraphCanvas'
import NodeInspector from '@/components/graph/NodeInspector'
import PatternTags from '@/components/graph/PatternTags'

// Mock data for the demo case CR-0847
const DEMO_GRAPH_DATA = {
  nodes: [
    { id: 'SB-3311', name: 'Rajan Mehta', risk: 94, x: 200, y: 150 },
    { id: 'SB-7821', name: 'Priya Sharma', risk: 87, x: 450, y: 100 },
    { id: 'SB-4490', name: 'Amit Patel', risk: 82, x: 550, y: 300 },
    { id: 'SB-2156', name: 'Deepak Kumar', risk: 75, x: 350, y: 400 },
    { id: 'SB-5603', name: 'Neha Singh', risk: 68, x: 100, y: 350 },
    { id: 'SB-8834', name: 'Rajesh Verma', risk: 79, x: 650, y: 200 },
    { id: 'SB-1122', name: 'Sanjay Gupta', risk: 71, x: 400, y: 250 },
    { id: 'SB-9999', name: 'Corporate Account', risk: 45, x: 450, y: 50 },
  ],
  edges: [
    { from: 'SB-3311', to: 'SB-7821', amount: 80000 },
    { from: 'SB-7821', to: 'SB-4490', amount: 78000 },
    { from: 'SB-4490', to: 'SB-2156', amount: 76000 },
    { from: 'SB-2156', to: 'SB-5603', amount: 74000 },
    { from: 'SB-5603', to: 'SB-7821', amount: 72000 },
    { from: 'SB-7821', to: 'SB-3311', amount: 70000 },
  ],
  patterns: [
    { emoji: '⭕', label: 'Round-trip', detail: 'Circular fund flow detected' },
    { emoji: '📊', label: 'Structuring', detail: '₹48K in small increments' },
    { emoji: '💤', label: 'Dormant', detail: '60+ days inactive, suddenly active' },
    { emoji: '🔄', label: 'Layering', detail: '×5 hops before settlement' },
    { emoji: '👤', label: 'Profile mismatch', detail: 'Income vs. transaction amount' },
  ],
}

interface SelectedNodeData {
  id: string
  name: string
  risk: number
  kycStatus: string
  declaredIncome: string
  connectedTo: number
  flagged: boolean
}

interface GraphNode {
  id: string
  name: string
  label?: string
  risk: number
  x: number
  y: number
}

interface GraphEdge {
  from: string
  source?: string
  to: string
  target?: string
  amount: number
}

interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
  patterns: Array<{ emoji: string; label: string; detail: string }>
}

function GraphExplorerContent() {
  const searchParams = useSearchParams()
  const caseId = searchParams.get('case_id') ?? 'CR-0847'

  const [graphData, setGraphData] = useState<GraphData>(DEMO_GRAPH_DATA)
  const [nodePositions, setNodePositions] = useState<GraphNode[]>(DEMO_GRAPH_DATA.nodes)
  const [selectedNode, setSelectedNode] = useState<SelectedNodeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`/api/graph?case_id=${caseId}`)
        if (!res.ok) throw new Error('Failed to fetch graph data')
        const data = await res.json()
        const normalizedData: GraphData = {
          nodes: (data.nodes ?? []).map((n: any) => ({
            id: n.id,
            name: n.name || n.label || n.id,
            label: n.label,
            risk: n.risk,
            x: n.x,
            y: n.y
          })),
          edges: (data.edges ?? []).map((e: any) => ({
            from: e.from || e.source,
            source: e.source,
            to: e.to || e.target,
            target: e.target,
            amount: e.amount
          })),
          patterns: data.patterns ?? DEMO_GRAPH_DATA.patterns,
        }

        setGraphData(normalizedData)
        setNodePositions(normalizedData.nodes)
      } catch (err) {
        console.log("Could not fetch graph data, using demo data.")
        setGraphData(DEMO_GRAPH_DATA)
        setNodePositions(DEMO_GRAPH_DATA.nodes)
      } finally {
        setLoading(false)
      }
    }
    fetchGraph()
  }, [caseId])

  const handleNodeClick = (nodeId: string) => {
    const node = nodePositions.find((n) => n.id === nodeId)
    if (node) {
      setSelectedNode({
        id: node.id,
        name: node.name,
        risk: node.risk,
        kycStatus: 'Verified',
        declaredIncome: '₹35,000/month',
        connectedTo: graphData.edges.filter((e) => e.from === nodeId || e.to === nodeId).length,
        flagged: node.risk >= 80,
      })
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-text-text5">Loading graph...</div>
  }

  if (error) {
    return <div className="text-center py-12 text-palette-red">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-size9 font-bold text-text-primary font-poppins">Graph Explorer</h1>
        <p className="text-text-text5 text-size6 mt-1">Case {caseId} — Fund flow visualization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Graph Canvas */}
          <div className="bg-bg-primary rounded-lg border border-palette-light-gray p-3 sm:p-4 min-w-0 overflow-hidden">
            <GraphCanvas
              nodes={nodePositions}
              edges={graphData.edges}
              selectedNode={selectedNode?.id ?? null}
              onNodeClick={handleNodeClick}
              onNodesChange={setNodePositions}
            />
          </div>

          {/* Pattern Tags */}
          <PatternTags patterns={graphData.patterns} />
        </div>

        {/* Node Inspector (right sidebar) */}
        <div>
          <NodeInspector node={selectedNode} />
        </div>
      </div>
    </div>
  )
}

export default function GraphExplorer() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-text-text5">Loading graph...</div>}>
      <GraphExplorerContent />
    </Suspense>
  )
}
