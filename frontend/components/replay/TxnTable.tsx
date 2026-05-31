'use client'

import { useEffect, useRef } from 'react'
import Card from '../ui/Card'

interface Transaction {
  id: number
  timestamp: string
  from: string
  to: string
  amount: number
  method: string
  detail: string
}

interface TxnTableProps {
  transactions: Transaction[]
  currentStep: number
  onStepSelect?: (step: number) => void
}

export default function TxnTable({ transactions, currentStep, onStepSelect }: TxnTableProps) {
  const activeRowRef = useRef<HTMLTableRowElement>(null)

  useEffect(() => {
    if (currentStep > 0 && activeRowRef.current) {
      activeRowRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [currentStep])

  return (
    <Card title={`Transactions (${transactions.length} steps)`}>
      <div className="overflow-x-auto max-h-[20rem] sm:max-h-none overflow-y-auto">
        <table className="w-full text-size6">
          <thead className="border-b border-palette-light-gray bg-bg-secondary sticky top-0 z-10">
            <tr>
              <th className="text-left p-2 sm:p-3 font-semibold text-text-primary">#</th>
              <th className="text-left p-2 sm:p-3 font-semibold text-text-primary">Time</th>
              <th className="text-left p-2 sm:p-3 font-semibold text-text-primary">From</th>
              <th className="text-left p-2 sm:p-3 font-semibold text-text-primary">To</th>
              <th className="text-right p-2 sm:p-3 font-semibold text-text-primary">Amount</th>
              <th className="text-left p-2 sm:p-3 font-semibold text-text-primary hidden md:table-cell">Method</th>
              <th className="text-left p-2 sm:p-3 font-semibold text-text-primary hidden lg:table-cell">Detail</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, idx) => {
              const step = idx + 1
              const isActive = currentStep === step

              return (
                <tr
                  key={txn.id}
                  ref={isActive ? activeRowRef : undefined}
                  onClick={() => onStepSelect?.(step)}
                  className={`border-b border-palette-light-gray ${
                    onStepSelect ? 'cursor-pointer' : ''
                  } ${isActive ? 'bg-palette-red bg-opacity-10' : 'hover:bg-bg-secondary'}`}
                >
                  <td className="p-2 sm:p-3 text-text-primary font-semibold">{step}</td>
                  <td className="p-2 sm:p-3 text-text-text5 font-mono">{txn.timestamp}</td>
                  <td className="p-2 sm:p-3 font-bold text-text-primary">{txn.from}</td>
                  <td className="p-2 sm:p-3 font-bold text-text-primary">{txn.to}</td>
                  <td className="p-2 sm:p-3 text-right font-bold text-palette-red">₹{txn.amount.toLocaleString()}</td>
                  <td className="p-2 sm:p-3 text-text-text5 hidden md:table-cell">{txn.method}</td>
                  <td className="p-2 sm:p-3 text-text-text4 hidden lg:table-cell">{txn.detail}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
