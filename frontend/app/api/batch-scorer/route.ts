import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const res = await fetch('http://localhost:5000/api/batch-scorer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store'
    })

    if (!res.ok) throw new Error('Batch scoring failed')
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Batch scorer error:', err)
    return NextResponse.json({ error: 'Batch scoring failed' }, { status: 500 })
  }
}
