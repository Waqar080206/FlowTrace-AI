import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const res = await fetch('http://localhost:5000/api/generate-story', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  
  return new Response(res.body, { 
    headers: { 'Content-Type': 'text/plain' } 
  })
}
