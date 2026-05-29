# FlowTrace AI — Navigation & Sidebar

> Every route, every nav element, every sidebar item — what's on it, where it lives in code, and what it renders.

---

## Layout hierarchy

```
app/layout.tsx          ← Root layout (entire app)
  <Topbar />            ← Fixed top bar, always visible
  {children}
    app/dashboard/layout.tsx   ← Dashboard shell
      <Sidebar />              ← Left sidebar, always visible inside dashboard
      <TabNav />               ← Top sub-navigation within dashboard
      <main>{children}</main>  ← Page content area
```

The sidebar and top nav coexist. The sidebar handles **major section navigation**. The tab nav handles **sub-page switching within the dashboard**.

---

## Topbar — `components/ui/Topbar.tsx`

Always visible. Fixed at the top of every page. Height: 52px.

### Left side
| Element | Detail |
|---|---|
| Logo icon | Navy square (`#1B4F72`), 28×28px, graph SVG icon inside (3 nodes + 2 edges) |
| App name | "FlowTrace AI" — 16px, weight 500 |
| LIVE badge | Small red pill, text "LIVE", 10px — shows system is running |

### Right side
| Element | Detail |
|---|---|
| Data source label | "Union Bank CBS" — 13px, muted text |
| Connection indicator | Green dot + "Connected" text. Red dot + "Disconnected" if Flask is unreachable |
| Notification bell | `ti-bell` icon — future: shows unread alert count badge |

### Code location
```
components/ui/Topbar.tsx
```

---

## Sidebar — `components/ui/Sidebar.tsx`

**Position:** Fixed left side, below the topbar. Width: 220px on desktop, collapses to 60px (icon only) on screens < 1024px.

**Background:** `var(--color-background-primary)` with a right border `0.5px solid var(--color-border-tertiary)`.

The sidebar is the primary navigation. It is always visible when inside `/dashboard/*`.

---

### Sidebar sections

#### Section 1 — Investigation (main navigation)

These are the five core dashboard views. Clicking any of these changes the main content area.

| Icon | Label | Route | What it opens |
|---|---|---|---|
| `ti-layout-dashboard` | Overview | `/dashboard/overview` | Metrics, charts, live alert queue |
| `ti-topology-star` | Graph explorer | `/dashboard/graph` | Fund flow graph + node inspector |
| `ti-player-play` | Temporal replay | `/dashboard/replay` | Hop-by-hop transaction animation |
| `ti-message-chatbot` | Fraud story engine | `/dashboard/story` | Gen-AI narrative + risk breakdown |
| `ti-file-check` | FIU reports | `/dashboard/fiu` | STR/CTR generator + submission history |

Active state: left border accent (`3px solid var(--color-border-info)`), background `var(--color-background-secondary)`.

---

#### Section 2 — Cases (quick-access panel)

A collapsible section showing the 3 most recent open cases. Clicking a case navigates to the Graph Explorer with that `case_id` pre-loaded.

| Element | Detail |
|---|---|
| Section header | "Recent cases" — 11px uppercase, muted |
| Case item | Case ID (bold) + fraud type (muted) + risk badge |
| CR-0847 | Circular transaction — Risk 94 (red badge) |
| ST-0291 | Structuring ₹48K — Risk 88 (red badge) |
| DA-0134 | Dormant abuse — Risk 79 (amber badge) |
| "View all cases →" | Links to a future `/dashboard/cases` page |

Each case item is a `<Link href="/dashboard/graph?case_id=CR-0847">`. The graph page reads the `case_id` query param and fetches the right graph data.

---

#### Section 3 — Tools

Quick access to standalone tools that support an investigation.

| Icon | Label | Route / action | What it does |
|---|---|---|---|
| `ti-search` | Account lookup | `/dashboard/lookup` | Search any account ID → see full history + risk score |
| `ti-network` | Path finder | `/dashboard/pathfinder` | Find shortest fund flow path between two accounts |
| `ti-report-analytics` | Batch scorer | `/dashboard/batch` | Upload a CSV, score all transactions at once |

> Note: These three tool pages are planned for future builds. In the POC, these items are shown in the sidebar with an "Coming soon" tooltip on hover.

---

#### Section 4 — Reports

| Icon | Label | Route | What it does |
|---|---|---|---|
| `ti-file-text` | FIU submissions | `/dashboard/fiu` | Same as FIU Reports in Investigation section |
| `ti-download` | Export data | (button, no route) | Downloads current alert queue as CSV |

---

#### Section 5 — System (bottom of sidebar, pinned)

Pinned to the bottom of the sidebar regardless of scroll position.

| Icon | Label | Action |
|---|---|---|
| `ti-settings` | Settings | Opens a settings panel (future: alert thresholds, model config) |
| `ti-help` | Help | Links to this README |
| `ti-user` | Investigator name | Shows current user name + logout option |

---

### Sidebar collapsed state (< 1024px)

When the viewport is narrower than 1024px, the sidebar collapses to 60px wide. Only icons are shown — labels are hidden. A hamburger button (`ti-menu-2`) at the top of the collapsed sidebar re-expands it as an overlay.

| State | Width | Shows |
|---|---|---|
| Expanded | 220px | Icon + label for every item |
| Collapsed | 60px | Icon only, label on tooltip (title attr) |
| Mobile overlay | Full width drawer | Slides in from left, closes on outside click |

---

### Sidebar component structure

```
components/ui/Sidebar.tsx          ← Main sidebar shell
  SidebarSection.tsx               ← Reusable collapsible section wrapper
  SidebarLink.tsx                  ← Single nav item (icon + label + active state)
  SidebarCaseItem.tsx              ← Case quick-access item with risk badge
```

### Active state logic

```typescript
// SidebarLink.tsx
"use client"
import { usePathname } from 'next/navigation'

const pathname = usePathname()
const isActive = pathname === href || pathname.startsWith(href + '/')
```

---

## Tab nav — `components/ui/TabNav.tsx`

Secondary navigation bar shown inside the main content area, below the topbar. Used within the dashboard to switch between the 5 main views.

**Position:** Sticky below the topbar. Height: 44px. Background: `var(--color-background-secondary)`.

> The tab nav and sidebar both show the same 5 main dashboard links. The sidebar is for primary navigation with context (cases, tools). The tab nav is a fast switcher when the user is deep in an investigation and switching views frequently.

| Tab label | Route |
|---|---|
| Overview | `/dashboard/overview` |
| Graph explorer | `/dashboard/graph` |
| Temporal replay | `/dashboard/replay` |
| Fraud story engine | `/dashboard/story` |
| FIU reports | `/dashboard/fiu` |

Active tab: white background + border, weight 500. Inactive: transparent, muted text.

---

## Full route map

```
/                              → redirect to /dashboard/overview

/dashboard/overview            ← Overview (server component)
/dashboard/graph               ← Graph explorer (client component)
/dashboard/graph?case_id=X     ← Graph for specific case
/dashboard/replay              ← Temporal replay (client component)
/dashboard/replay?case_id=X    ← Replay for specific case
/dashboard/story               ← Fraud story engine (client component)
/dashboard/story?case_id=X     ← Story for specific case
/dashboard/fiu                 ← FIU reports (client component)

/api/alerts                    ← API route handler (proxies Flask)
/api/graph                     ← API route handler (proxies Flask)
/api/generate-story            ← API route handler (streaming proxy)
/api/fiu-report                ← API route handler (proxies Flask)
/api/risk-score                ← API route handler (proxies Flask)
```

---

## Responsive layout

| Breakpoint | Layout behaviour |
|---|---|
| ≥ 1280px | Sidebar expanded (220px) + full content area |
| 1024–1279px | Sidebar expanded (220px) + content area slightly narrower |
| 768–1023px | Sidebar collapsed (60px icons only) + content area |
| < 768px | No sidebar (hidden) + hamburger menu opens full-width drawer overlay |

### Content area widths

The content area is the space to the right of the sidebar.

| Sidebar state | Content area width |
|---|---|
| Expanded (220px sidebar) | `calc(100vw - 220px)` |
| Collapsed (60px sidebar) | `calc(100vw - 60px)` |
| No sidebar (mobile) | `100vw` |

---

## Navigation state — `?case_id` query param

When an investigator clicks an alert in the AlertQueue, the app navigates to the Graph Explorer and passes the case ID in the URL:

```
/dashboard/graph?case_id=CR-0847
```

Every tab that needs to know the active case reads this query param:

```typescript
// In any dashboard page:
import { useSearchParams } from 'next/navigation'
const caseId = useSearchParams().get('case_id') ?? 'CR-0847'
```

This means the investigator can share a URL with a colleague and they land directly on the same case in the same view.

---

## Keyboard navigation

| Key | Action |
|---|---|
| `Tab` | Move through sidebar items |
| `Enter` / `Space` | Activate focused nav item |
| `Escape` | Close mobile sidebar overlay |
| `1`–`5` | (planned) Jump to tab 1–5 directly |
