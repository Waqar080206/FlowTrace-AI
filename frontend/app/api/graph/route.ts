import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const caseId = searchParams.get('case_id') || 'CR-0847'
  
  const res = await fetch(`http://localhost:5000/api/graph?case_id=${caseId}`, { cache: 'no-store' })
  const data = await res.json()
  return NextResponse.json(data)
}
