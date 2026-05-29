import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query') || ''

  try {
    const res = await fetch(`http://localhost:5000/api/account-lookup?query=${encodeURIComponent(query)}`, {
      cache: 'no-store'
    })
    if (!res.ok) throw new Error('Lookup failed')
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Account lookup error:', err)
    return NextResponse.json({ error: 'Account not found' }, { status: 404 })
  }
}
