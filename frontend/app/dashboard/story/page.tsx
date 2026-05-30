'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import StoryBox from '@/components/story/StoryBox'
import RiskBreakdown from '@/components/story/RiskBreakdown'
import HybridLayers from '@/components/story/HybridLayers'
import QueryInput from '@/components/story/QueryInput'

const DEMO_NARRATIVE = ` On 14 January 2025 at 09:14 AM, account SB-3311 (Rajan Mehta) initiated a ₹80,000 UPI transfer to SB-7821 (Priya Sharma). 

Over the next 38 minutes, the same amount circulated through a network of 5 accounts in a deliberate pattern:
- SB-3311 → SB-7821 → SB-4490 → SB-2156 → SB-5603 → back to SB-7821
- Amounts decreased incrementally by ₹2,000 per hop (₹80K → ₹78K → ₹76K, etc.)

This pattern is characteristic of circular transaction layering combined with structuring. The accounts share no legitimate business relationship per their KYC records. All transfers occurred within business hours, suggesting coordinated activity.

The Isolation Forest anomaly detector flagged this network with a 0.94 score (max 1.0), indicating severe statistical deviation from normal fund flow patterns. Combined with rule-engine detection of circular loops and Gen-AI contextual analysis of the narrative, this case meets the threshold for Suspicious Transaction Reporting.

Recommended action: File STR with FIU immediately. Flag all 6 accounts for enhanced monitoring.`

const DEMO_RISK_SCORES = [
  { layer: 'Graph cycle score', score: 94 },
  { layer: 'Isolation Forest', score: 88 },
  { layer: 'Rule engine', score: 82 },
  { layer: 'Velocity check', score: 76 },
]

const DEMO_LAYERS = [
  { layer: 'Rule engine (Circular loops)', triggered: true, score: 92 },
  { layer: 'Graph analysis (Cycle detection)', triggered: true, score: 94 },
  { layer: 'ML model (Isolation Forest)', triggered: true, score: 88 },
  { layer: 'Gen-AI contextual analysis', triggered: true, score: 85 },
]

function FraudStoryEngineContent() {
  const searchParams = useSearchParams()
  const caseId = searchParams.get('case_id') ?? 'CR-0847'

  const [narrative, setNarrative] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isQuerying, setIsQuerying] = useState(false)
  const [queryResponse, setQueryResponse] = useState('')

  useEffect(() => {
    const fetchNarrative = async () => {
      try {
        setNarrative('')
        setIsLoading(true)
        
        const res = await fetch('/api/generate-story', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ case_id: caseId }),
        })

        if (!res.ok) throw new Error('Failed to generate narrative')
        
        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        
        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            
            const chunk = decoder.decode(value, { stream: true })
            setNarrative((prev) => prev + chunk)
          }
        }
      } catch (err) {
        console.log("Could not fetch narrative, using demo data.")
        // Simulate streaming demo data as fallback
        let index = 0
        setNarrative('')
        const interval = setInterval(() => {
          if (index < DEMO_NARRATIVE.length) {
            setNarrative((prev) => prev + DEMO_NARRATIVE[index])
            index++
          } else {
            setIsLoading(false)
            clearInterval(interval)
          }
        }, 5)
      }
      setIsLoading(false)
    }

    fetchNarrative()
  }, [caseId])

  const handleQuery = async (query: string) => {
    setIsQuerying(true)
    setQueryResponse('')

    try {
      // Try real API first
      const res = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case_id: caseId, query }),
      })

      if (res.ok && res.body) {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value, { stream: true })
          setQueryResponse((prev) => prev + chunk)
        }
      } else {
        throw new Error('API call failed')
      }
    } catch (err) {
      console.log("Could not fetch query response, using demo data.")
      // Fallback to demo response
      const mockResponse = `Based on the transaction patterns, account SB-7821 shows several red flags:

1. **Hub Activity**: SB-7821 appears in 4 of the 6 transactions, acting as a central hub in the circular network. This is typical of structuring schemes where one account coordinates fund redistribution.

2. **Account Profile Mismatch**: The account holder (Priya Sharma) declared monthly income of ₹32,000, yet received transfers totaling ₹80,000+ within a 38-minute window. This 2.5x monthly income in a single day is statistically anomalous.

3. **Quick Turnover**: Funds arrived at 09:22 AM and left at 09:31 AM—only 9 minutes of dwell time. This rapid movement is inconsistent with legitimate business operations and suggests a pass-through account.

4. **Structured Amounts**: The decreasing payment pattern (80K → 78K → 76K) is deliberate structuring to stay below regulatory thresholds while maintaining velocity.

Recommendation: Classify SB-7821 as HIGH RISK. Request additional KYC documents, recent income tax returns, and business registration proofs from the account holder.`

      let index = 0
      const interval = setInterval(() => {
        if (index < mockResponse.length) {
          setQueryResponse((prev) => prev + mockResponse[index])
          index++
        } else {
          setIsQuerying(false)
          clearInterval(interval)
        }
      }, 3)
      return
    }
    
    setIsQuerying(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-size9 font-bold text-text-primary font-poppins">Fraud Story Engine</h1>
        <p className="text-text-text5 text-size6 mt-1">Case {caseId} — AI-generated narrative & contextual analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main story area */}
        <div className="lg:col-span-2 space-y-6">
          <StoryBox narrative={narrative} isLoading={isLoading} />

          {/* Query section */}
          <QueryInput onSubmit={handleQuery} isLoading={isQuerying} />

          {/* Query response */}
          {queryResponse && (
            <div className="bg-bg-secondary rounded-lg border border-palette-light-gray p-4">
              <h3 className="text-size7 font-bold text-text-primary mb-3 font-poppins">AI Response</h3>
              <p className="text-text-primary text-size6 leading-relaxed whitespace-pre-wrap">{queryResponse}</p>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <RiskBreakdown scores={DEMO_RISK_SCORES} />
          <HybridLayers layers={DEMO_LAYERS} />
        </div>
      </div>
    </div>
  )
}

export default function FraudStoryEngine() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-text-text5">Loading story...</div>}>
      <FraudStoryEngineContent />
    </Suspense>
  )
}
