'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FIUForm from '@/components/fiu/FIUForm'
import FIUPreview from '@/components/fiu/FIUPreview'
import SubmissionHistory from '@/components/fiu/SubmissionHistory'

const DEMO_SUBMISSIONS = [
  {
    id: 'STR/UBI/2024/0291',
    caseId: 'ST-0291',
    type: 'STR',
    date: '2025-01-11',
    status: 'Under review' as const,
    responseDate: undefined,
  },
  {
    id: 'STR/UBI/2024/0134',
    caseId: 'DA-0134',
    type: 'STR',
    date: '2025-01-08',
    status: 'Accepted' as const,
    responseDate: '2025-01-15',
  },
  {
    id: 'CTR/UBI/2024/0089',
    caseId: 'CR-0445',
    type: 'CTR',
    date: '2025-01-05',
    status: 'Accepted' as const,
    responseDate: '2025-01-12',
  },
]

export default function FIUReports() {
  const searchParams = useSearchParams()
  const caseId = searchParams.get('case_id') ?? 'CR-0847'

  const [isLoading, setIsLoading] = useState(false)
  const [currentReport, setCurrentReport] = useState<any>(null)
  const [submissions, setSubmissions] = useState(DEMO_SUBMISSIONS)

  const handleGenerate = async (selectedCase: string, reportType: string) => {
    setIsLoading(true)

    try {
      const res = await fetch('/api/fiu-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case_id: selectedCase, report_type: reportType }),
      })

      if (!res.ok) throw new Error('Failed to generate report')
      
      let apiReport = await res.json()
      
      // Transform snake_case API response to camelCase
      const newReport = {
        reference: apiReport.report_ref || apiReport.reference,
        reportingEntity: apiReport.reporting_entity || apiReport.reportingEntity,
        branch: apiReport.branch_ifsc?.split('/')[0] || apiReport.branch || '',
        ifscCode: apiReport.branch_ifsc?.split('/')[1] || apiReport.ifscCode || '',
        dateOfReport: apiReport.date_of_report || apiReport.dateOfReport || new Date().toLocaleDateString('en-IN'),
        totalAmount: apiReport.total_amount || apiReport.totalAmount || 0,
        suspicionType: apiReport.suspicion_type || apiReport.suspicionType || 'Unknown',
        grounds: apiReport.grounds_for_suspicion || apiReport.grounds || 'Details pending...'
      }

      setCurrentReport(newReport)

      // Add to submissions
      setSubmissions((prev) => [
        {
          id: newReport.reference,
          caseId: selectedCase,
          type: reportType,
          date: new Date().toLocaleDateString('en-IN'),
          status: 'Submitted' as const,
        },
        ...prev,
      ])
    } catch (err) {
      console.log("Could not generate report from API, using demo data.")
      
      // Fallback to demo report
      const newReport = {
        reference: `${reportType}/UBI/2024/${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, '0')}`,
        reportingEntity: 'Union Bank of India',
        branch: 'Andheri East',
        ifscCode: 'UBIN0534789',
        dateOfReport: new Date().toLocaleDateString('en-IN'),
        totalAmount: 240000,
        suspicionType: 'Round-trip / Circular layering with structuring',
        grounds: `₹2,40,000 originated from account SB-3311 (Rajan Mehta) on 14 January 2025 and circulated through a network of 5 accounts in rapid succession:

SB-3311 → SB-7821 → SB-4490 → SB-2156 → SB-5603 → SB-7821 → SB-3311

Transaction pattern analysis:
• All transfers completed within 38 minutes (09:14 AM to 09:52 AM)
• Amounts structured in decreasing increments (₹80K → ₹78K → ₹76K → ₹74K → ₹72K)
• Circular nature indicates layering for anti-money laundering purposes
• Accounts show no legitimate business relationships per KYC records

Detection systems triggered:
✓ Rule engine: Circular loop detected (92/100)
✓ Graph analysis: Cycle pattern confirmed (94/100)
✓ ML model: Isolation Forest anomaly (88/100)
✓ Gen-AI: Contextual confirmation (85/100)

Narrative: The structure and speed of these transactions, combined with the deliberate amount decrements and circular pattern, strongly indicate an attempt to disguise the true beneficial ownership and purpose of the funds. This is consistent with money laundering typology patterns identified in recent RBI/FIU guidance.

Recommended action: Immediate STR filing. Freeze accounts pending investigation.`,
      }

      setCurrentReport(newReport)

      setSubmissions((prev) => [
        {
          id: newReport.reference,
          caseId: selectedCase,
          type: reportType,
          date: new Date().toLocaleDateString('en-IN'),
          status: 'Submitted' as const,
        },
        ...prev,
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-size9 font-bold text-text-primary font-poppins">FIU Reports</h1>
        <p className="text-text-text5 text-size6 mt-1">Generate and track Suspicious Transaction Reports (STR) and other FIU filings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form and preview */}
        <div className="lg:col-span-2 space-y-6">
          <FIUForm onGenerate={handleGenerate} isLoading={isLoading} />
          <FIUPreview report={currentReport} isLoading={isLoading} />
        </div>

        {/* Right sidebar - empty for now, could add metrics */}
        <div>
          <div className="bg-bg-primary border border-palette-light-gray rounded-lg p-4">
            <h3 className="text-size7 font-bold text-text-primary mb-4 font-poppins">Quick Stats</h3>
            <div className="space-y-3">
              <div>
                <p className="text-text-text5 text-size5 uppercase font-semibold">Total Submissions</p>
                <p className="text-size8 font-bold text-text-primary mt-1">{submissions.length}</p>
              </div>
              <div className="border-t border-palette-light-gray pt-3">
                <p className="text-text-text5 text-size5 uppercase font-semibold">Pending Review</p>
                <p className="text-size8 font-bold text-palette-blue mt-1">
                  {submissions.filter((s) => s.status === 'Under review').length}
                </p>
              </div>
              <div className="border-t border-palette-light-gray pt-3">
                <p className="text-text-text5 text-size5 uppercase font-semibold">Accepted</p>
                <p className="text-size8 font-bold text-palette-blue mt-1">
                  {submissions.filter((s) => s.status === 'Accepted').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission History */}
      <SubmissionHistory submissions={submissions} />
    </div>
  )
}
