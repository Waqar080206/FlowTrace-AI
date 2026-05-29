# FlowTrace AI — User Flow

> Who uses this system, what they do, and exactly how every interaction plays out step by step.

---

## Actors

| Actor | Role | Primary goal |
|---|---|---|
| **Fraud Investigator** | Bank AML team member | Review alerts, investigate fund flows, file FIU reports |
| **AML Manager** | Supervises investigator team | Monitor overall fraud activity, track FIU submission status |
| **System (Automated)** | Flask backend + ML pipeline | Detect anomalies, score transactions, generate alerts 24/7 |

---

## Flow 1 — Investigator receives and triages a new alert

This is the entry point for almost every session. An investigator opens the dashboard and decides which alert to act on first.

```
Investigator opens browser → localhost:3000
        ↓
app/page.tsx redirects → /dashboard/overview
        ↓
Overview page loads
  ├── MetricCards animate in (alerts, txns, risk score, accounts)
  ├── TxnChart renders (transaction volume + anomaly spikes today)
  ├── HeatmapChart renders (which branch × channel has most flags)
  └── AlertQueue renders (live list, sorted by risk score desc)
        ↓
Investigator scans the alert list
  ├── Sees "Circular transaction — Risk 94" at top
  ├── Reads account IDs: SB-3311 → SB-7821 → SB-4490 → SB-3311
  └── Clicks the alert row (row gets red border highlight)
        ↓
Investigator decides to investigate → clicks "Graph Explorer" tab
```

**What the system does behind the scenes:**
- On page load: `GET /api/metrics` and `GET /api/alerts` fire from the server component
- Alerts are sorted by risk score from `fraud_patterns.get_all_alerts()`
- No action is logged yet — this is a read-only triage step

---

## Flow 2 — Investigator explores the fund flow graph

The investigator wants to see *how* the money moved, not just that it did.

```
Investigator arrives at /dashboard/graph
        ↓
Page fetches GET /api/graph?case_id=CR-0847
        ↓
GraphCanvas renders
  ├── 8 nodes drawn (accounts as circles, coloured by risk)
  ├── 7 directed edges drawn (transfers, weighted by amount)
  ├── Node SB-3311 is red (risk 94), others amber or blue
  └── Circular loop is visually obvious from the layout
        ↓
Investigator clicks node SB-3311 (Rajan M.)
        ↓
NodeInspector panel updates (right side)
  ├── Account: SB-3311 — Rajan Mehta
  ├── KYC status: Verified
  ├── Declared income: ₹35,000/month
  ├── Risk score: 94/100 (animated bar fills red)
  ├── Connected to: 3 accounts
  └── ⚠ Flagged: circular flow participant
        ↓
Investigator clicks node SB-7821 (Priya K.)
        ↓
NodeInspector updates with SB-7821 details
        ↓
Investigator reads PatternTags below the graph:
  ⭕ Round-trip  📊 Structuring ₹48K  💤 Dormant  🔄 Layering ×5  👤 Profile mismatch
        ↓
Investigator confirms suspicious network → clicks "Temporal Replay" tab
```

**System actions:**
- Canvas click fires hit-test against node radius
- `onNodeClick(node)` lifts state to page, NodeInspector re-renders
- `GET /api/risk-score?account_id=SB-3311` fetches live breakdown

---

## Flow 3 — Investigator replays the transaction timeline

The investigator wants to watch the money move hop by hop, in chronological order.

```
Investigator arrives at /dashboard/replay
        ↓
ReplayCanvas initialises (6-node circular scheme, all nodes grey)
TxnTable shows all 6 transactions (none highlighted)
ReplayControls shows Play button, seek bar at 0
        ↓
Investigator clicks Play
        ↓
Step 1 (09:14 AM)
  ├── Node SB-3311 lights up red on canvas
  ├── Edge SB-3311 → SB-7821 animates (red line appears)
  ├── Row 1 in TxnTable highlights (₹80,000 UPI — "Round-trip leg 1")
  └── ReplayStep badge "Step 1/6" updates
        ↓
Step 2 (09:22 AM)
  ├── Edge SB-7821 → SB-4490 lights up
  └── Row 2 highlights (₹78,000 UPI — "Round-trip leg 2")
        ↓
... steps 3, 4, 5 continue ...
        ↓
Step 6 (09:52 AM) — FINAL
  ├── Edge SB-7821 → SB-3311 lights up (loop closes)
  ├── Row 6 highlights (₹70,000 UPI — "Return to origin")
  └── ML finding shown: "Isolation Forest score 0.94 — round-trip confirmed"
        ↓
Investigator drags seek bar back to Step 3 to re-examine a hop
        ↓
Investigator is now ready to understand WHY → clicks "Fraud Story Engine" tab
```

**System actions:**
- `setInterval` in ReplayControls fires every 1200ms
- Each tick calls `onStep(n)` → parent state `currentStep` increments
- Both ReplayCanvas and TxnTable watch `currentStep` via `useEffect`
- Seek bar drag calls `seekReplay(fraction)` → jumps state directly

---

## Flow 4 — Investigator reads the AI-generated fraud narrative

The investigator needs a plain-English explanation they can include in their report.

```
Investigator arrives at /dashboard/story
        ↓
Page auto-selects Case #CR-0847
        ↓
POST /api/generate-story { case_id: "CR-0847" }
        ↓
Flask calls genai_engine.generate_story_stream()
  ├── IF OPENAI_API_KEY set → streams from OpenAI GPT-4
  └── IF no key → streams pre-written fallback narrative
        ↓
StoryBox types in the narrative live (character by character)
  "On 14 January 2025 at 09:14 AM, account SB-3311 (Rajan Mehta)
   initiated a ₹80,000 UPI transfer to SB-7821..."
        ↓
Narrative finishes → blinking cursor disappears
        ↓
RiskBreakdown shows 4 animated bars:
  Graph cycle score: 94 ████████████████████
  Isolation Forest:  88 ██████████████████
  Rule engine:       82 ████████████████
  Velocity:          76 ███████████████
        ↓
HybridLayers shows all 4 layers triggered → red banner "All 4 agree → Alert fired"
        ↓
Investigator types in QueryInput:
  "Why is account SB-7821 also suspicious?"
        ↓
POST /api/ask-engine → streams targeted response about SB-7821
        ↓
Investigator clicks Case tab "ST-0291" → structuring narrative loads
        ↓
Investigator is satisfied → clicks "FIU Reports" tab
```

**System actions:**
- `fetch('/api/generate-story', { method: 'POST', body: ... })`
- Response body consumed as `ReadableStream`
- `TextDecoder` decodes each chunk
- Each chunk appended to `narrative` state → React re-renders StoryBox

---

## Flow 5 — Investigator generates and submits a FIU report

The investigator creates a compliant Suspicious Transaction Report with one click.

```
Investigator arrives at /dashboard/fiu
        ↓
FIUForm shows:
  Case: [CR-2024-0847 — Circular transactions ▼]
  Type: [STR — Suspicious Transaction Report ▼]
  [ Generate FIU Report ]
        ↓
Investigator confirms case and type, clicks "Generate FIU Report"
        ↓
POST /api/fiu-report { case_id: "CR-0847", report_type: "STR" }
        ↓
Flask calls fiu_report.build_str_report()
  ├── Fills all FIU-IND STR mandatory fields
  ├── Calls genai_engine.generate_fiu_grounds() for narrative grounds
  └── Returns complete report JSON
        ↓
FIUPreview populates:
  SUSPICIOUS TRANSACTION REPORT (STR)
  As per FIU-IND Guidelines, Section 12, PMLA 2002
  ─────────────────────────────────────────────
  Report Reference:    STR/UBI/2024/0847
  Reporting Entity:    Union Bank of India
  Branch / IFSC:       UBIN0534789 / Andheri East
  Date of Report:      14 Jan 2025
  Total Amount:        ₹2,40,000  ← highlighted red
  Suspicion Type:      Round-trip / Circular layering
  Grounds:             ₹2,40,000 originated from SB-3311...
        ↓
Investigator reviews all fields
        ↓
Investigator copies / exports report
        ↓
SubmissionHistory table updates (new row: Pending FIU)
        ↓
Session complete
```

**System actions:**
- `fiu_report.build_str_report(case_dict)` constructs all fields
- FIU-IND Section 12 field names used exactly as specified
- `genai_engine.generate_fiu_grounds()` generates the grounds paragraph
- Response JSON mapped to `FIUReport` TypeScript interface → FIUPreview renders

---

## Flow 6 — AML Manager monitors overall activity (Overview only)

A manager-level user who doesn't investigate cases directly but tracks macro trends.

```
Manager opens /dashboard/overview
        ↓
Reads MetricCards:
  7 critical alerts today
  14,832 transactions analysed
  Avg risk score: 71 (above 65 threshold → amber)
  23 accounts flagged
        ↓
Reads TxnChart:
  Spots two anomaly score spikes at 09:00 and 14:00
        ↓
Reads HeatmapChart:
  Mumbai UPI channel has highest fraud density today
        ↓
Scans AlertQueue:
  4 high-risk, 3 medium-risk open cases
        ↓
Navigates to /dashboard/fiu → checks SubmissionHistory
  STR/UBI/2024/0291 is "Under review" — filed 3 days ago
        ↓
Manager is satisfied with status visibility → session ends
```

---

## Flow 7 — New alert arrives mid-session (automated system flow)

This describes what the backend does continuously, independent of any user session.

```
Incoming transaction batch (CBS, UPI, NEFT, RTGS)
        ↓
fraud_patterns.get_all_alerts() runs on each batch
  ├── detect_circular(df)
  ├── detect_structuring(df)
  ├── detect_dormant(df)
  ├── detect_layering(df)
  └── detect_profile_mismatch(df)
        ↓
ml_model.score_batch(df) runs Isolation Forest on all transactions
        ↓
4-layer hybrid check:
  Rule engine triggered?   YES → layer 1 flag
  Graph cycle detected?    YES → layer 2 flag
  Isolation Forest > 0.8?  YES → layer 3 flag
  All 3 agree?             YES → Gen-AI confirms → layer 4
        ↓
Alert created → added to alert queue
        ↓
Next time investigator loads /dashboard/overview → alert appears
```

---

## Edge Cases

| Situation | What happens |
|---|---|
| No API key set | Gen-AI narrative uses pre-written fallback. Demo still works fully. |
| Flask backend is down | Next.js API routes return 502. Dashboard shows an error state. |
| Investigator clicks "Replay" before selecting a case | Defaults to case CR-0847 (the circular scheme demo case) |
| FIU report generation fails | FIUPreview shows an error message. Form stays active to retry. |
| Graph has no suspicious nodes | GraphCanvas renders all nodes green. PatternTags shows empty. |

---

## State that persists across tabs

| State | Where stored | Shared across |
|---|---|---|
| Selected alert case | URL query param `?case_id=X` | Graph, Replay, Story, FIU all read this |
| Selected node | React state in `graph/page.tsx` | NodeInspector only (local to Graph tab) |
| Replay step | React state in `replay/page.tsx` | ReplayCanvas + TxnTable (local to Replay tab) |
| Generated narrative | React state in `story/page.tsx` | StoryBox (local to Story tab, clears on tab change) |
| FIU report data | React state in `fiu/page.tsx` | FIUPreview (local to FIU tab) |

No global state management library (Redux, Zustand) is needed for the POC. Each tab owns its own state.
