import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('http://localhost:5000/api/metrics', { cache: 'no-store' })
    if (!res.ok) throw new Error('Metrics API failed')
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Failed to fetch metrics:', err)
    // Return fallback metrics
    return NextResponse.json({
      alerts: 7,
      txns_analysed: 14832,
      avg_risk: 71,
      accounts_flagged: 23
    })
  }
}
