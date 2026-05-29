import { useState } from 'react'

interface BatchScorerFormProps {
  onScore: (accounts: string) => void
  loading: boolean
}

export default function BatchScorerForm({ onScore, loading }: BatchScorerFormProps) {
  const [inputMode, setInputMode] = useState<'paste' | 'file'>('paste')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const accounts = formData.get('accounts') as string
    onScore(accounts)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        onScore(content)
      }
      reader.readAsText(file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex gap-2 border-b border-palette-light-gray">
        <button
          type="button"
          onClick={() => setInputMode('paste')}
          className={`px-4 py-2 font-semibold text-size6 border-b-2 transition ${
            inputMode === 'paste'
              ? 'border-palette-blue text-palette-blue'
              : 'border-transparent text-text-text5'
          }`}
        >
          Paste List
        </button>
        <button
          type="button"
          onClick={() => setInputMode('file')}
          className={`px-4 py-2 font-semibold text-size6 border-b-2 transition ${
            inputMode === 'file'
              ? 'border-palette-blue text-palette-blue'
              : 'border-transparent text-text-text5'
          }`}
        >
          Upload File
        </button>
      </div>

      {/* Input Area */}
      {inputMode === 'paste' ? (
        <div>
          <label className="block text-text-primary text-size6 font-semibold mb-2">
            Account IDs (one per line or comma-separated)
          </label>
          <textarea
            name="accounts"
            placeholder="SB-3311
SB-7821
SB-4490"
            rows={8}
            className="w-full px-4 py-2 border border-palette-light-gray rounded-lg text-text-primary font-mono text-size5 focus:outline-none focus:border-palette-blue"
            disabled={loading}
          />
        </div>
      ) : (
        <div>
          <label className="block text-text-primary text-size6 font-semibold mb-2">
            Upload CSV or TXT file
          </label>
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileUpload}
            disabled={loading}
            className="w-full px-4 py-2 border border-palette-light-gray rounded-lg"
          />
          <p className="text-text-text5 text-size5 mt-2">Each line should contain one account ID</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-palette-blue text-text-secondary rounded-lg font-semibold text-size6 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Scoring...
          </>
        ) : (
          'Score Accounts'
        )}
      </button>
    </form>
  )
}
