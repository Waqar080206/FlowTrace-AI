"use client"

import { useState } from 'react'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import type { Alert } from '../../lib/types'

export default function AlertQueue({ alerts }: { alerts: Alert[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <Card title="Live Alert Queue (Needs Review)" className="h-[41rem]">
      <div className="flex flex-col gap-2 overflow-y-auto h-full pr-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            onClick={() => setSelectedId(alert.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              selectedId === alert.id 
                ? 'border-red-400 bg-red-50/50' 
                : 'border-slate-100 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-slate-800">{alert.type}</span>
              <Badge score={alert.score} />
            </div>
            
            <div className="text-sm font-medium text-slate-500 mb-2">
              <span className="text-slate-700">{alert.accounts.split(',').length} Accounts involved:</span> {alert.accounts}
            </div>
            
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>{alert.id}</span>
              <span>{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
