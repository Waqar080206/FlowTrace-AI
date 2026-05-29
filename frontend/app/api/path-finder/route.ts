import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''

  try {
    const res = await fetch(
      `http://localhost:5000/api/path-finder?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
      { cache: 'no-store' }
    )
    if (!res.ok) throw new Error('Path finding failed')
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Path finding error:', err)
    return NextResponse.json({ error: 'No path found' }, { status: 404 })
  }
}
