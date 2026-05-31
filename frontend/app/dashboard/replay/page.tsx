'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import ReplayCanvas from '@/components/replay/ReplayCanvas'
import TxnTable from '@/components/replay/TxnTable'
import ReplayControls from '@/components/replay/ReplayControls'

const DEMO_REPLAY_DATA = {
  nodes: [
    { id: 'SB-3311', name: 'Rajan Mehta', x: 150, y: 180 },
    { id: 'SB-7821', name: 'Priya Sharma', x: 400, y: 180 },
    { id: 'SB-4490', name: 'Amit Patel', x: 650, y: 180 },
  ],
  transactions: [
    {
      id: 1,
      timestamp: '09:14 AM',
      from: 'SB-3311',
      to: 'SB-7821',
      amount: 80000,
      method: 'UPI',
      detail: 'Round-trip leg 1',
    },
    {
      id: 2,
      timestamp: '09:22 AM',
      from: 'SB-7821',
      to: 'SB-4490',
      amount: 78000,
      method: 'UPI',
      detail: 'Round-trip leg 2',
    },
    {
      id: 3,
      timestamp: '09:31 AM',
      from: 'SB-4490',
      to: 'SB-3311',
      amount: 76000,
      method: 'NEFT',
      detail: 'Return to origin leg 1',
    },
    {
      id: 4,
      timestamp: '09:45 AM',
      from: 'SB-3311',
      to: 'SB-7821',
      amount: 74000,
      method: 'UPI',
      detail: 'Second round trip leg 1',
    },
    {
      id: 5,
      timestamp: '09:52 AM',
      from: 'SB-7821',
      to: 'SB-3311',
      amount: 72000,
      method: 'UPI',
      detail: 'Return to origin leg 2',
    },
  ],
}

function TemporalReplayContent() {
  const searchParams = useSearchParams()
  const caseId = searchParams.get('case_id') ?? 'CR-0847'

  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)

  const totalSteps = DEMO_REPLAY_DATA.transactions.length

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [caseId])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [isPlaying, totalSteps])

  const getActiveEdge = useCallback(() => {
    if (currentStep === 0 || currentStep > totalSteps) return null
    const txn = DEMO_REPLAY_DATA.transactions[currentStep - 1]
    return { from: txn.from, to: txn.to }
  }, [currentStep, totalSteps])

  const handlePlay = () => {
    if (currentStep >= totalSteps) {
      setCurrentStep(1)
    } else if (currentStep === 0) {
      setCurrentStep(1)
    }
    setIsPlaying(true)
  }

  const handleStep = (step: number) => {
    setCurrentStep(step)
    if (step >= totalSteps) {
      setIsPlaying(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-text-text5">Loading replay...</div>
  }

  const activeTxn = currentStep > 0 ? DEMO_REPLAY_DATA.transactions[currentStep - 1] : null

  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-size9 font-bold text-text-primary font-poppins">Temporal Replay</h1>
        <p className="text-text-text5 text-size6 mt-1">Case {caseId} — Step-by-step transaction visualization</p>
      </div>

      <div className="bg-bg-primary rounded-lg border border-palette-light-gray p-3 sm:p-4 min-w-0 overflow-hidden">
        <ReplayCanvas
          nodes={DEMO_REPLAY_DATA.nodes}
          edges={DEMO_REPLAY_DATA.transactions.map((t) => ({ from: t.from, to: t.to }))}
          activeEdge={getActiveEdge()}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      </div>

      <ReplayControls
        currentStep={currentStep}
        totalSteps={totalSteps}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={() => setIsPlaying(false)}
        onStep={handleStep}
        activeAmount={activeTxn?.amount}
      />

      <TxnTable
        transactions={DEMO_REPLAY_DATA.transactions}
        currentStep={currentStep}
        onStepSelect={handleStep}
      />
    </div>
  )
}

export default function TemporalReplay() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-text-text5">Loading replay...</div>}>
      <TemporalReplayContent />
    </Suspense>
  )
}
