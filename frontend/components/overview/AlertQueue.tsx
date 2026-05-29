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
                ? 'border-palette-red bg-palette-red bg-opacity-10' 
                : 'border-palette-light-gray hover:border-text-text5'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-text-primary font-poppins text-size7">{alert.type}</span>
              <Badge score={alert.score} />
            </div>
            
            <div className="text-size6 font-medium text-text-text5 mb-2">
              <span className="text-text-text4">{alert.accounts.split(',').length} Accounts involved:</span> {alert.accounts}
            </div>
            
            <div className="flex justify-between items-center text-size3 text-text-text5">
              <span>{alert.id}</span>
              <span>{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
