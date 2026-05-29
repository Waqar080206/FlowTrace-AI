import Card from '../ui/Card'

interface NodeData {
  id: string
  name: string
  risk: number
  kycStatus: string
  declaredIncome: string
  connectedTo: number
  flagged: boolean
}

interface NodeInspectorProps {
  node: NodeData | null
}

export default function NodeInspector({ node }: NodeInspectorProps) {
  if (!node) {
    return (
      <Card title="Node Inspector" className="h-full">
        <p className="text-text-text5 text-size6">Click a node on the graph to inspect it</p>
      </Card>
    )
  }

  const getRiskColor = (risk: number) => {
    if (risk >= 85) return 'text-palette-red'
    if (risk >= 70) return 'text-bg-secondary'
    return 'text-palette-blue'
  }

  return (
    <Card title="Node Inspector">
      <div className="space-y-4">
        {/* Account ID and Name */}
        <div>
          <p className="text-size3 text-text-text5 uppercase font-semibold">Account</p>
          <p className="text-size7 font-bold text-text-primary font-poppins mt-1">{node.id}</p>
          <p className="text-size6 text-text-text5 mt-1">{node.name}</p>
        </div>

        {/* KYC Status */}
        <div className="pt-2 border-t border-palette-light-gray">
          <p className="text-size3 text-text-text5 uppercase font-semibold">KYC Status</p>
          <p className="text-size6 text-text-primary mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-palette-blue"></span>
            {node.kycStatus}
          </p>
        </div>

        {/* Declared Income */}
        <div className="pt-2 border-t border-palette-light-gray">
          <p className="text-size3 text-text-text5 uppercase font-semibold">Declared Income</p>
          <p className="text-size6 text-text-primary mt-1 font-poppins">{node.declaredIncome}</p>
        </div>

        {/* Risk Score */}
        <div className="pt-2 border-t border-palette-light-gray">
          <p className="text-size3 text-text-text5 uppercase font-semibold">Risk Score</p>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-size7 font-bold font-poppins ${getRiskColor(node.risk)}`}>{node.risk}/100</span>
            </div>
            <div className="w-full bg-palette-light-gray rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${node.risk >= 85 ? 'bg-palette-red' : node.risk >= 70 ? 'bg-bg-secondary' : 'bg-palette-blue'}`}
                style={{ width: `${node.risk}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="pt-2 border-t border-palette-light-gray">
          <p className="text-size3 text-text-text5 uppercase font-semibold">Connected To</p>
          <p className="text-size6 text-text-primary mt-1 font-poppins">{node.connectedTo} accounts</p>
        </div>

        {/* Flagged Status */}
        {node.flagged && (
          <div className="pt-2 border-t border-palette-light-gray bg-palette-red bg-opacity-10 rounded-lg p-3">
            <p className="text-size5 text-palette-red font-semibold flex items-center gap-2">
              <i className="ti ti-alert-circle"></i>
              Flagged: circular flow participant
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
