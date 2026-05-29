'use client'

import { useState } from 'react'
import Card from '../ui/Card'

interface QueryInputProps {
  onSubmit: (query: string) => void
  isLoading: boolean
}

export default function QueryInput({ onSubmit, isLoading }: QueryInputProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSubmit(query)
      setQuery('')
    }
  }

  return (
    <Card title="Ask a Question">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Why is account SB-7821 also suspicious?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-2 rounded-lg border border-palette-light-gray bg-bg-primary text-text-primary placeholder-text-text5 focus:outline-none focus:border-bg-bg4 focus:ring-1 focus:ring-bg-bg4 disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="w-full px-4 py-2 bg-palette-blue text-text-secondary rounded-lg font-semibold hover:bg-palette-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <i className="ti ti-send"></i>
          Send Question
        </button>
      </form>
    </Card>
  )
}
