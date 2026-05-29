interface AccountSearchFormProps {
  onSearch: (query: string) => void
  loading: boolean
}

export default function AccountSearchForm({ onSearch, loading }: AccountSearchFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('search') as string
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-text-primary text-size6 font-semibold mb-2">
          Account ID or Name
        </label>
        <input
          type="text"
          name="search"
          placeholder="e.g., SB-3311 or Rajan Mehta"
          className="w-full px-4 py-2 border border-palette-light-gray rounded-lg text-text-primary focus:outline-none focus:border-palette-blue"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-palette-blue text-text-secondary rounded-lg font-semibold text-size6 hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Search Account'}
      </button>
    </form>
  )
}
