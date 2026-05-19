import MetricCards from '../../../components/overview/MetricCards'
import TxnChart from '../../../components/overview/TxnChart'
import HeatmapChart from '../../../components/overview/HeatmapChart'
import AlertQueue from '../../../components/overview/AlertQueue'
import type { Alert } from '../../../lib/types'

// If backend API isn't ready or fetch fails, fallback to UI mock data
const MOCK_ALERTS: Alert[] = [
  { id: "ALT-001", type: "Circular transaction", accounts: "SB-3311, CA-4412", score: 92, time: "10:23 AM", level: "high" },
  { id: "ALT-002", type: "Structuring", accounts: "SB-8822, CA-1102, CA-1103", score: 85, time: "09:55 AM", level: "high" },
  { id: "ALT-003", type: "Rapid layering", accounts: "CC-9011, SB-1122, CA-4455, CA-1103, SB-3311", score: 75, time: "09:12 AM", level: "medium" },
  { id: "ALT-004", type: "Dormant reactivation", accounts: "SB-0091", score: 68, time: "08:45 AM", level: "medium" },
  { id: "ALT-005", type: "Profile mismatch", accounts: "SB-7742", score: 88, time: "08:30 AM", level: "high" }
]

export default async function OverviewPage() {
  let alerts = MOCK_ALERTS
  let metrics = undefined // Uses default inside component

  try {
    const [alertsRes, metricsRes] = await Promise.all([
      fetch('http://localhost:5000/api/alerts', { cache: 'no-store' }),
      fetch('http://localhost:5000/api/metrics', { cache: 'no-store' })
    ])
    
    if (alertsRes.ok) alerts = await alertsRes.json()
    if (metricsRes.ok) metrics = await metricsRes.json()
  } catch (err) {
    console.log("Could not fetch from backend, using fallback data.")
  }

  return (
    <div className="flex flex-col gap-6">
      <MetricCards metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <TxnChart />
          <HeatmapChart />
        </div>
        
        <div className="col-span-1">
          <AlertQueue alerts={alerts} />
        </div>
      </div>
    </div>
  )
}
