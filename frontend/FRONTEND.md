# FlowTrace AI — Frontend Documentation

> **Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Chart.js · D3.js
> **Dev server:** `npm run dev` → [http://localhost:3000](http://localhost:3000)

---

## Overview

The frontend is a Next.js 14 application using the App Router. Every tab in the dashboard is a real URL route — no client-side tab switching. The dashboard communicates with the Python backend exclusively through Next.js API route handlers (in `app/api/`), which act as a proxy layer so the browser never calls Flask directly.

---

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

The app opens at `http://localhost:3000` and redirects immediately to `/dashboard/overview`.

Make sure the Flask backend is running on port 5000 before loading any tab that fetches live data.

### Environment variables

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

The `NEXT_PUBLIC_` prefix makes this available in browser-side code. In production, change this to your deployed domain.

---

## Folder Structure

```
frontend/
├── app/
│   ├── layout.tsx                  ← Root layout: <Topbar /> + {children}
│   ├── page.tsx                    ← Redirects to /dashboard/overview
│   ├── dashboard/
│   │   ├── layout.tsx              ← Dashboard shell: <TabNav /> + {children}
│   │   ├── overview/
│   │   │   └── page.tsx            ← /dashboard/overview
│   │   ├── graph/
│   │   │   └── page.tsx            ← /dashboard/graph
│   │   ├── replay/
│   │   │   └── page.tsx            ← /dashboard/replay
│   │   ├── story/
│   │   │   └── page.tsx            ← /dashboard/story
│   │   └── fiu/
│   │       └── page.tsx            ← /dashboard/fiu
│   └── api/
│       ├── alerts/route.ts         ← GET  → proxies to Flask /api/alerts
│       ├── graph/route.ts          ← GET  → proxies to Flask /api/graph
│       ├── generate-story/route.ts ← POST → streaming proxy to Flask
│       ├── fiu-report/route.ts     ← POST → proxies to Flask /api/fiu-report
│       └── risk-score/route.ts     ← GET  → proxies to Flask /api/risk-score
│
├── components/
│   ├── ui/                         ← Shared primitive components
│   ├── overview/                   ← Components for the Overview tab
│   ├── graph/                      ← Components for the Graph Explorer tab
│   ├── replay/                     ← Components for the Temporal Replay tab
│   ├── story/                      ← Components for the Fraud Story Engine tab
│   └── fiu/                        ← Components for the FIU Reports tab
│
├── lib/
│   ├── api.ts                      ← Central fetch wrapper
│   ├── types.ts                    ← All TypeScript interfaces
│   └── constants.ts                ← Risk threshold, channels, colours
│
├── styles/
│   └── globals.css                 ← Tailwind directives + custom CSS vars
│
├── next.config.js                  ← Rewrites: /python-api/* → localhost:5000
├── tailwind.config.ts
├── tsconfig.json
└── .env.local
```

---

## Pages

### `/dashboard/overview` — `app/dashboard/overview/page.tsx`

**Type:** Server Component

Fetches metrics and alerts from the Flask backend at render time using `fetch(..., { cache: 'no-store' })`. Passes data as props to child components.

**Renders:**
- `<MetricCards />` — 4 animated stat cards (alerts, txns, risk score, accounts)
- `<TxnChart />` — transaction volume + anomaly score overlay (Chart.js)
- `<HeatmapChart />` — stacked bar chart, branch × channel fraud heatmap
- `<AlertQueue />` — scrollable live alert list with risk scores

---

### `/dashboard/graph` — `app/dashboard/graph/page.tsx`

**Type:** Client Component (`"use client"`)

Manages `selectedNode` state. Fetches graph JSON from `/api/graph?case_id=CR-0847`.

**Renders (two-column layout):**
- Left: `<GraphCanvas onNodeClick={setSelectedNode} />` — D3-force on `<canvas>`
- Right: `<NodeInspector node={selectedNode} />` — account detail panel
- Below: `<PatternTags />` — fraud pattern badges

**Node click flow:** User clicks canvas → hit-test against node radius → `onNodeClick(node)` → `selectedNode` state updates → `NodeInspector` re-renders with new account data.

---

### `/dashboard/replay` — `app/dashboard/replay/page.tsx`

**Type:** Client Component (`"use client"`)

Manages `currentStep` (0–6). All child components receive it as a prop.

**Renders:**
- `<ReplayControls onStep={setCurrentStep} />` — play/pause/seek bar
- `<ReplayCanvas step={currentStep} />` — animated canvas, lights up hop-by-hop
- `<TxnTable currentStep={currentStep} />` — highlights the active row

**Animation logic:** `ReplayControls` runs a `setInterval` internally and calls `onStep(n)` each tick. The parent state lifts to `currentStep`, which both `ReplayCanvas` and `TxnTable` watch via `useEffect`.

---

### `/dashboard/story` — `app/dashboard/story/page.tsx`

**Type:** Client Component (`"use client"`)

Manages `selectedCase`, `narrative` (streamed string), `isStreaming`.

**On case select:**
1. POST to `/api/generate-story` with `{ case_id }`
2. Consume `res.body` as a `ReadableStream`
3. Decode chunks with `TextDecoder`
4. Append each chunk to `narrative` state → types in live

**Renders:**
- Case selector tabs (CR-0847, ST-0291, DA-0134)
- `<StoryBox text={narrative} isStreaming={isStreaming} />`
- `<RiskBreakdown caseIndex={selectedCase} />`
- `<HybridLayers />` — 4-layer status panel
- `<QueryInput />` — ask a question about any account

---

### `/dashboard/fiu` — `app/dashboard/fiu/page.tsx`

**Type:** Client Component (`"use client"`)

Manages `reportData` state (null until generated).

**Renders:**
- `<FIUForm onGenerate={setReportData} />` — case + report type selector
- `<FIUPreview data={reportData} />` — styled STR document preview
- `<SubmissionHistory />` — past reports table

---

## Components

### `components/ui/`

| Component | Props | What it does |
|---|---|---|
| `Topbar.tsx` | none | Logo, LIVE badge, CBS connection indicator |
| `TabNav.tsx` | none | 5-tab nav using `usePathname()` for active state |
| `Badge.tsx` | `score: number` | Red >80, amber 60–80, green <60. Shows "Risk N" |
| `Card.tsx` | `title, subtitle?, children` | White panel with border and padding |

---

### `components/overview/`

| Component | Props | What it does |
|---|---|---|
| `MetricCards.tsx` | `metrics: Metrics` | 4 cards, count-up animation on mount via `useEffect` |
| `TxnChart.tsx` | `data: HourlyData[]` | Chart.js bar + line. Destroys on unmount to prevent leak |
| `HeatmapChart.tsx` | `data: HeatmapData` | Stacked bar, branches × channels |
| `AlertQueue.tsx` | `alerts: Alert[]` | Scrollable list. Selected item gets red border |

**Chart.js pattern used in both chart components:**

```typescript
useEffect(() => {
  const chart = new Chart(canvasRef.current, { ... })
  return () => chart.destroy()   // cleanup — critical to prevent duplicate charts
}, [data])
```

---

### `components/graph/`

| Component | Props | What it does |
|---|---|---|
| `GraphCanvas.tsx` | `nodes, edges, onNodeClick` | D3-force on `<canvas>`. Hit-tests click against node radius |
| `NodeInspector.tsx` | `node: GraphNode \| null` | Account details, risk bar, KYC, fraud flag banner |
| `PatternTags.tsx` | none | 5 amber badges for detected fraud patterns |

**Canvas click hit-test pattern:**

```typescript
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  const hit = nodes.find(n => Math.hypot(mx - n.x, my - n.y) < n.radius + 8)
  if (hit) onNodeClick(hit)
})
```

---

### `components/replay/`

| Component | Props | What it does |
|---|---|---|
| `ReplayCanvas.tsx` | `step: number` | Redraws on step change. Nodes + edges go red as step increases |
| `ReplayControls.tsx` | `onStep: (n) => void` | Play/pause/reset/seek. Runs setInterval, lifts step to parent |
| `TxnTable.tsx` | `currentStep: number` | Highlights row at `currentStep - 1` with light red bg |

---

### `components/story/`

| Component | Props | What it does |
|---|---|---|
| `StoryBox.tsx` | `text, isStreaming` | Renders narrative HTML. Blinking cursor when streaming |
| `RiskBreakdown.tsx` | `caseIndex: number` | 4 animated progress bars. Data varies by selected case |
| `HybridLayers.tsx` | none | Static 4-layer status panel + red all-agree banner |
| `QueryInput.tsx` | none | Text input, POSTs to `/api/ask-engine`, streams response |

---

### `components/fiu/`

| Component | Props | What it does |
|---|---|---|
| `FIUForm.tsx` | `onGenerate: (data) => void` | Case dropdown + STR/CTR selector. Calls `/api/fiu-report` |
| `FIUPreview.tsx` | `data: FIUReport \| null` | Styled STR document. Empty state if null |
| `SubmissionHistory.tsx` | none | Table of 4 past submissions with status chips |

---

## API Route Handlers (`app/api/`)

These are Next.js Route Handlers. They proxy requests from the browser to the Flask backend. This avoids CORS issues and lets you change the backend URL in one place (`next.config.js`).

| Route | Method | Proxies to |
|---|---|---|
| `/api/alerts` | GET | `http://localhost:5000/api/alerts` |
| `/api/graph` | GET | `http://localhost:5000/api/graph` |
| `/api/generate-story` | POST | `http://localhost:5000/api/generate-story` (streaming) |
| `/api/fiu-report` | POST | `http://localhost:5000/api/fiu-report` |
| `/api/risk-score` | GET | `http://localhost:5000/api/risk-score` |

**Standard proxy pattern:**

```typescript
// app/api/alerts/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('http://localhost:5000/api/alerts')
  const data = await res.json()
  return NextResponse.json(data)
}
```

**Streaming proxy (generate-story):**

```typescript
// app/api/generate-story/route.ts
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
```

---

## Shared Library (`lib/`)

### `lib/types.ts` — TypeScript interfaces

```typescript
Transaction    // txn_id, timestamp, from_acct, to_acct, amount, channel, anomaly_score, flag
GraphNode      // id, label, x, y, risk, color, acct_type, kyc, declared_income
GraphEdge      // source, target, amount, channel, color
Alert          // id, type, accounts, score, time, level ('high' | 'medium')
FIUReport      // ref, entity, branch, date, period, amount, suspicion_type, grounds
Metrics        // alerts, txns_analysed, avg_risk, accounts_flagged
```

### `lib/constants.ts`

```typescript
RISK_THRESHOLD = 65
CHANNELS = ['UPI', 'NEFT', 'RTGS', 'IMPS', 'Cash', 'Branch']
BRANCHES = ['Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Pune']
RISK_COLORS = { high: '#E24B4A', medium: '#EF9F27', low: '#1D9E75' }
```

### `lib/api.ts` — Central fetch wrapper

```typescript
const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, options)
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`)
  return res.json()
}
```

---

## Config Files

### `next.config.js`

```javascript
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/python-api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ]
  },
}
module.exports = nextConfig
```

### `tailwind.config.ts`

Content paths include `./app/**/*.{ts,tsx}` and `./components/**/*.{ts,tsx}`. Extended theme adds `risk-red`, `risk-amber`, `risk-green` color tokens.

---

## Common Issues

**Charts rendering twice / flickering**
Always destroy Chart.js instances in the `useEffect` cleanup function: `return () => chart.destroy()`

**Graph canvas not responding to clicks**
The canvas element needs an explicit `width` and `height` attribute (not just CSS). Set them in the `useEffect` that initialises D3: `canvas.width = canvas.offsetWidth * devicePixelRatio`

**Streaming narrative not appearing**
The `ReadableStream` from fetch needs a `TextDecoder` to decode chunks. Use `new TextDecoder().decode(value)` inside the reader loop.

**Tailwind classes not applying**
Run `npm run build` once to generate the full Tailwind output. In dev mode, JIT should pick up classes automatically if content paths in `tailwind.config.ts` are correct.
