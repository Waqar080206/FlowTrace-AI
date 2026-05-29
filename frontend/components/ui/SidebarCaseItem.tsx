'use client'

import Link from 'next/link'

interface SidebarCaseItemProps {
  caseId: string
  type: string
  risk: number
  collapsed?: boolean
}

export default function SidebarCaseItem({ caseId, type, risk, collapsed = false }: SidebarCaseItemProps) {
  const getRiskColor = (score: number) => {
    if (score >= 85) return 'bg-palette-red'
    if (score >= 70) return 'bg-bg-secondary'
    return 'bg-palette-blue'
  }

  const riskLabel = risk >= 85 ? 'Critical' : risk >= 70 ? 'High' : 'Medium'

  return (
    <Link
      href={`/dashboard/graph?case_id=${caseId}`}
      className="block px-4 py-2 rounded-lg hover:bg-bg-secondary transition-colors group"
      title={collapsed ? `${caseId} - ${type} - Risk ${risk}` : undefined}
    >
      {!collapsed && (
        <>
          <div className="flex items-center justify-between mb-1">
            <span className="text-size6 font-bold text-text-primary font-poppins">{caseId}</span>
            <span className={`px-2 py-0.5 rounded text-size3 font-semibold text-text-secondary ${getRiskColor(risk)}`}>
              {risk}
            </span>
          </div>
          <p className="text-size3 text-text-text5 truncate">{type}</p>
        </>
      )}
    </Link>
  )
}
