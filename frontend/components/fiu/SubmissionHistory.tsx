import Card from '../ui/Card'

interface Submission {
  id: string
  caseId: string
  type: string
  date: string
  status: 'Submitted' | 'Under review' | 'Accepted' | 'Rejected'
  responseDate?: string
}

interface SubmissionHistoryProps {
  submissions: Submission[]
}

export default function SubmissionHistory({ submissions }: SubmissionHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-palette-blue text-text-secondary'
      case 'Under review':
        return 'bg-bg-secondary text-text-primary'
      case 'Accepted':
        return 'bg-palette-blue text-text-secondary'
      case 'Rejected':
        return 'bg-palette-red text-text-secondary'
      default:
        return 'bg-bg-secondary text-text-primary'
    }
  }

  return (
    <Card title={`Submission History (${submissions.length} reports)`}>
      <div className="overflow-x-auto">
        <table className="w-full text-size6">
          <thead className="border-b border-palette-light-gray bg-bg-secondary">
            <tr>
              <th className="text-left p-3 font-semibold text-text-primary">Reference</th>
              <th className="text-left p-3 font-semibold text-text-primary">Case</th>
              <th className="text-left p-3 font-semibold text-text-primary">Type</th>
              <th className="text-left p-3 font-semibold text-text-primary">Submitted</th>
              <th className="text-left p-3 font-semibold text-text-primary">Status</th>
              <th className="text-left p-3 font-semibold text-text-primary">Response</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-text-text5">
                  No submissions yet. Generate a report above to submit it.
                </td>
              </tr>
            ) : (
              submissions.map((sub) => (
                <tr key={sub.id} className="border-b border-palette-light-gray hover:bg-bg-secondary">
                  <td className="p-3 font-mono font-semibold text-text-primary">{sub.id}</td>
                  <td className="p-3 text-text-text5">{sub.caseId}</td>
                  <td className="p-3 text-text-primary font-semibold">{sub.type}</td>
                  <td className="p-3 text-text-text5">{sub.date}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-size5 font-semibold ${getStatusColor(sub.status)}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-3 text-text-text5">{sub.responseDate ?? '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
