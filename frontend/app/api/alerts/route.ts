import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('http://localhost:5000/api/alerts', { cache: 'no-store' })
    if (!res.ok) throw new Error('Alerts API failed')
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Failed to fetch alerts:', err)
    return NextResponse.json([
      {
        id: 'ALT-001',
        type: 'Circular transaction',
        accounts: 'SB-3311, SB-7821, SB-4490',
        score: 94,
        time: '09:52 AM',
      },
      {
        id: 'ALT-002',
        type: 'Structuring',
        accounts: 'SB-2156, SB-5603',
        score: 82,
        time: '10:14 AM',
      },
    ])
  }
}
