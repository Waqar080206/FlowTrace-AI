import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const account_id = searchParams.get('account_id') || 'SB-3311'
  
  const res = await fetch(`http://localhost:5000/api/risk-score?account_id=${account_id}`, { cache: 'no-store' })
  const data = await res.json()
  return NextResponse.json(data)
}
