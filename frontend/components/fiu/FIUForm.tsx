'use client'

import { useState } from 'react'
import Card from '../ui/Card'

interface FIUFormProps {
  onGenerate: (caseId: string, reportType: string) => void
  isLoading: boolean
}

const CASES = [
  { id: 'CR-0847', label: 'CR-0847 — Circular transactions' },
  { id: 'ST-0291', label: 'ST-0291 — Structuring ₹48K' },
  { id: 'DA-0134', label: 'DA-0134 — Dormant abuse' },
]

const REPORT_TYPES = [
  { value: 'STR', label: 'STR — Suspicious Transaction Report' },
  { value: 'CTR', label: 'CTR — Cash Transaction Report' },
  { value: 'NTR', label: 'NTR — Non-Transaction Report' },
]

export default function FIUForm({ onGenerate, isLoading }: FIUFormProps) {
  const [selectedCase, setSelectedCase] = useState('CR-0847')
  const [selectedType, setSelectedType] = useState('STR')

  const handleGenerate = () => {
    onGenerate(selectedCase, selectedType)
  }

  return (
    <Card title="Generate FIU Report">
      <div className="space-y-4">
        <div>
          <label className="block text-size6 font-semibold text-text-primary mb-2">Case</label>
          <select
            value={selectedCase}
            onChange={(e) => setSelectedCase(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-2 rounded-lg border border-palette-light-gray bg-bg-primary text-text-primary focus:outline-none focus:border-bg-bg4 focus:ring-1 focus:ring-bg-bg4 disabled:opacity-50"
          >
            {CASES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-size6 font-semibold text-text-primary mb-2">Report Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-2 rounded-lg border border-palette-light-gray bg-bg-primary text-text-primary focus:outline-none focus:border-bg-bg4 focus:ring-1 focus:ring-bg-bg4 disabled:opacity-50"
          >
            {REPORT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-palette-blue text-text-secondary rounded-lg font-semibold hover:bg-palette-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <i className={`ti ${isLoading ? 'ti-loader' : 'ti-file-check'} animate-spin`}></i>
          {isLoading ? 'Generating...' : 'Generate FIU Report'}
        </button>
      </div>
    </Card>
  )
}
