import Card from '../ui/Card'

interface FIUReportData {
  reference: string
  reportingEntity: string
  branch: string
  ifscCode: string
  dateOfReport: string
  totalAmount: number
  suspicionType: string
  grounds: string
}

interface FIUPreviewProps {
  report: FIUReportData | null
  isLoading: boolean
}

export default function FIUPreview({ report, isLoading }: FIUPreviewProps) {
  if (isLoading) {
    return (
      <Card title="FIU Report Preview">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-bg-secondary rounded w-3/4"></div>
          <div className="h-4 bg-bg-secondary rounded"></div>
          <div className="h-4 bg-bg-secondary rounded"></div>
          <div className="h-4 bg-bg-secondary rounded w-5/6"></div>
        </div>
      </Card>
    )
  }

  if (!report) {
    return (
      <Card title="FIU Report Preview">
        <p className="text-text-text5 text-size6 italic">Generate a report to preview it here.</p>
      </Card>
    )
  }

  return (
    <Card title="FIU Report Preview" className="max-h-[600px] overflow-y-auto">
      <div className="space-y-4 font-mono text-size5">
        <div className="border-b-2 border-text-text5 pb-4">
          <p className="text-center font-bold text-text-primary">SUSPICIOUS TRANSACTION REPORT (STR)</p>
          <p className="text-center text-size4 text-text-text5">As per FIU-IND Guidelines, Section 12, PMLA 2002</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-size5">
          <div>
            <p className="text-text-text5 font-semibold">Report Reference:</p>
            <p className="text-text-primary font-bold">{report.reference}</p>
          </div>
          <div>
            <p className="text-text-text5 font-semibold">Date of Report:</p>
            <p className="text-text-primary font-bold">{report.dateOfReport}</p>
          </div>
          <div>
            <p className="text-text-text5 font-semibold">Reporting Entity:</p>
            <p className="text-text-primary font-bold">{report.reportingEntity}</p>
          </div>
          <div>
            <p className="text-text-text5 font-semibold">Branch / IFSC:</p>
            <p className="text-text-primary font-bold">
              {report.branch} / {report.ifscCode}
            </p>
          </div>
        </div>

        <div className="border-t border-b border-palette-light-gray py-3">
          <p className="text-text-text5 font-semibold">Total Amount:</p>
          <p className="text-size8 font-extrabold text-palette-red">₹{report.totalAmount.toLocaleString()}</p>
        </div>

        <div>
          <p className="text-text-text5 font-semibold mb-2">Suspicion Type:</p>
          <p className="text-text-primary">{report.suspicionType}</p>
        </div>

        <div>
          <p className="text-text-text5 font-semibold mb-2">Grounds for Suspicion:</p>
          <p className="text-text-primary text-size6 leading-relaxed whitespace-pre-wrap">{report.grounds}</p>
        </div>

        <div className="border-t border-palette-light-gray pt-4 flex gap-2">
          <button className="flex-1 px-4 py-2 bg-palette-blue text-text-secondary rounded-lg font-semibold hover:bg-palette-blue/90 transition-colors flex items-center justify-center gap-2">
            <i className="ti ti-copy"></i>
            Copy
          </button>
          <button className="flex-1 px-4 py-2 bg-bg-secondary text-text-primary rounded-lg font-semibold hover:bg-bg-secondary/80 transition-colors flex items-center justify-center gap-2">
            <i className="ti ti-download"></i>
            Export
          </button>
        </div>
      </div>
    </Card>
  )
}
