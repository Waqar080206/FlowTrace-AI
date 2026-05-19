"use client"

import { useEffect, useState } from 'react'
import Card from '../ui/Card'

interface Metrics {
  alerts: number;
  txns_analysed: number;
  avg_risk: number;
  accounts_flagged: number;
}

export default function MetricCards({ metrics }: { metrics?: Metrics }) {
  // Hardcoded target values per requirements if API fails or is loading
  const target = metrics || {
    alerts: 7,
    txns_analysed: 14832,
    avg_risk: 71,
    accounts_flagged: 23
  }

  const [counts, setCounts] = useState({ alerts: 0, txns: 0, risk: 0, accounts: 0 })

  useEffect(() => {
    let current = 0
    const duration = 1000 // 1 second animation
    const steps = 30
    const interval = duration / steps

    const timer = setInterval(() => {
      current++
      const progress = current / steps
      setCounts({
        alerts: Math.floor(target.alerts * progress),
        txns: Math.floor(target.txns_analysed * progress),
        risk: Math.floor(target.avg_risk * progress),
        accounts: Math.floor(target.accounts_flagged * progress)
      })

      if (current === steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [target.alerts, target.txns_analysed, target.avg_risk, target.accounts_flagged])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card title="Active Alerts" className="border-red-200 bg-red-50/30">
        <div className="text-4xl font-extrabold text-red-600">{counts.alerts}</div>
        <p className="text-sm font-medium text-red-500 mt-1 flex items-center">
          +2 in last hour
        </p>
      </Card>
      
      <Card title="Transactions Analysed" className="border-blue-200">
        <div className="text-4xl font-extrabold text-blue-900">{counts.txns.toLocaleString()}</div>
        <p className="text-sm font-medium text-gray-500 mt-1">Today</p>
      </Card>
      
      <Card title="Avg Network Risk" className="border-amber-200">
        <div className="text-4xl font-extrabold text-amber-600">{counts.risk}</div>
        <p className="text-sm font-medium text-gray-500 mt-1">Threshold: 65</p>
      </Card>
      
      <Card title="Accounts Flagged" className="border-purple-200">
        <div className="text-4xl font-extrabold text-purple-700">{counts.accounts}</div>
        <p className="text-sm font-medium text-gray-500 mt-1">Pending FIU Action</p>
      </Card>
    </div>
  )
}
