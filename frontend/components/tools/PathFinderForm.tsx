interface PathFinderFormProps {
  onFind: (from: string, to: string) => void
  loading: boolean
}

export default function PathFinderForm({ onFind, loading }: PathFinderFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const from = formData.get('from') as string
    const to = formData.get('to') as string
    onFind(from, to)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-text-primary text-size6 font-semibold mb-2">
            From Account
          </label>
          <input
            type="text"
            name="from"
            placeholder="e.g., SB-3311"
            className="w-full px-4 py-2 border border-palette-light-gray rounded-lg text-text-primary focus:outline-none focus:border-palette-blue disabled:bg-gray-50 disabled:cursor-not-allowed"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-text-primary text-size6 font-semibold mb-2">
            To Account
          </label>
          <input
            type="text"
            name="to"
            placeholder="e.g., SB-5603"
            className="w-full px-4 py-2 border border-palette-light-gray rounded-lg text-text-primary focus:outline-none focus:border-palette-blue disabled:bg-gray-50 disabled:cursor-not-allowed"
            disabled={loading}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-palette-blue text-text-secondary rounded-lg font-semibold text-size6 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Finding Path...
          </>
        ) : (
          'Find Path'
        )}
      </button>
    </form>
  )
}
