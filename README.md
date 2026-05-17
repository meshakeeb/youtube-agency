# Blackbird Agency — Multi-Agent YouTube SEO SaaS

> End-to-end deliverable: 19-agent workspace simulation → structured data layer → SaaS product specs → premium dual-theme Next.js dashboard.

## What This Is

A complete product design + working prototype for **Blackbird Agency**, an AI-agentic YouTube SEO SaaS targeting creators (initial beachhead: trading-education). The deliverable demonstrates:

1. **The agent workspace simulated end-to-end** — 19 specialized agents fired in dependency order against a real worked example (trading-edu channel "AlphaTraderTV" producing a video about iron-condor options income).
2. **Strict JSON outputs** for every agent, internally consistent, with a canonical unified state document and a Postgres schema derived from them.
3. **Comprehensive product specs** — PRD, OKRs, roadmap, business model, competitive analysis, orchestration architecture, screens spec, plus deep market research with citations.
4. **A working Next.js 14 SaaS dashboard** — 6 screens, each rendered in two visual variations (Material You + Web3 Bitcoin DeFi), switchable in real time. Premium charts via Tremor + Recharts, all icons from Lucide.

## Repository Map

```
.
├── README.md                          ← (this file)
├── COMPANY.md                         ← company charter
├── agents/                            ← 19 agent definition folders
├── teams/                             ← 5 team folders + Operations
├── skills/                            ← 19 skill folders backing the agents
│
├── product/                           ← markdown spec deliverables
│   ├── 00-overview.md
│   ├── 01-agent-discovery.md          ← all 19 agents, exec phases, DAG
│   ├── 02-agent-execution.md          ← sequential simulation index
│   ├── 03-unified-data-model.md       ← canonical state shape + entities
│   ├── 04-sql-schema.md               ← Postgres schema overview
│   ├── 05-ui-mapping.md               ← every UI element → data field binding
│   ├── 06-screens.md                  ← 6 screens × 2 design variations, chart spec
│   ├── 07-ux-flow.md                  ← end-to-end user journey
│   ├── 08-prd.md                      ← functional + non-functional requirements
│   ├── 09-okrs.md                     ← Q3 2026 → Q2 2027
│   ├── 10-roadmap.md                  ← MVP → V1 → V2 → Scale
│   ├── 11-business-model.md           ← pricing, unit economics, GTM
│   ├── 12-competitive-analysis.md     ← positioning, differentiation
│   ├── 13-orchestration-architecture.md ← LangGraph hierarchical-teams design
│   ├── features/ALL-FEATURES.md       ← 10 feature deep-dives
│   ├── research-competitive.md        ← web research: TubeBuddy/vidIQ/Spotter/etc
│   └── research-orchestration.md      ← web research: LangGraph patterns
│
├── data/                              ← machine-readable artifacts
│   ├── unified-system-state.json      ← canonical aggregated state (worked example)
│   ├── agent-execution-order.json     ← pipeline DAG (nodes + edges)
│   ├── schema.sql                     ← 21-table Postgres DDL + agent→table mapping
│   └── agents/                        ← 19 per-agent JSON outputs
│       ├── channel-auditor.json
│       ├── brand-voice-specialist.json
│       ├── ... (17 more)
│       └── client-reporting-agent.json
│
└── app/                               ← Next.js 14 SaaS dashboard
    ├── README.md                      ← run instructions + design decisions
    ├── package.json
    ├── tailwind.config.ts
    ├── app/                           ← App Router routes
    │   ├── layout.tsx
    │   ├── globals.css                ← both themes as CSS variables
    │   ├── dashboard/page.tsx
    │   ├── channel-insights/page.tsx
    │   ├── keyword-intelligence/page.tsx
    │   ├── video-optimization/page.tsx
    │   ├── competitor-analysis/page.tsx
    │   └── agent-activity/page.tsx
    └── app/components/
        ├── charts/    ← 16 Recharts components
        ├── ui/        ← 13 UI primitives
        ├── layout/    ← Sidebar, Topbar, PipelineRibbon, backgrounds
        └── theme/     ← ThemeProvider + ThemeToggle
```

## The Worked Example

Every artifact in `data/` describes a single coherent scenario:

| Field | Value |
|---|---|
| Client | **AlphaTraderTV** |
| Niche | Trading education — options income, equities, crypto (US, beginner→intermediate) |
| Baseline | 38,420 subs · 2.1% CTR · 4:12 AVD · 142 videos |
| Target | 100K subs in 9 months |
| Sample video | *"How I Made $14K With Iron Condors in October (Real P&L)"* |
| Primary keyword | `iron condor strategy` (volume 14k, difficulty 0.42, opportunity 0.81) |
| Predicted CTR | 6.1% |
| QC outcome | **APPROVED (95/100)** |

This worked example threads through every spec, every JSON output, and every dashboard screen.

## The Pipeline (at a glance)

```
PHASE 0 — Onboarding (one-time per client)
  channel-auditor → brand-voice-specialist
  niche-intelligence-analyst → audience-persona-builder + competitor-analyst
   → chief-strategy-officer → ceo (approval gate)

PHASE 1 — Per-video Production (strict linear)
  keyword-researcher → title-copywriter → description-writer
   → tags-hashtag-specialist → chapter-architect
   → thumbnail-strategist → quality-controller [GATE: score ≥80]

PHASE 2 — Post-publish Growth (parallel)
  community-engagement-strategist ║ cross-platform-repurposing-agent ║ playlist-architect

PHASE 3 — Weekly Monitoring (scheduled)
  performance-analyst → chief-strategy-officer → client-reporting-agent → ceo (monthly)
```

Total simulated wall-clock for the worked example: ~131s. Token cost: ~$0.74/run.

## Strategic Headlines

- **Market gap:** the $80–$200/mo agentic premium tier is empty between Spotter ($49) / vidIQ Max ($79) and Tubular Labs ($1,500). Blackbird's Pro ($149) and Agency ($499) tiers occupy that white space. ([product/12-competitive-analysis.md](product/12-competitive-analysis.md))
- **AI-in-creator-economy TAM:** $5.7B in 2026 → $16.8B by 2030 (31.3% CAGR). Trading-edu niche carries 3–5× the ARPU of general creators. ([product/research-competitive.md](product/research-competitive.md))
- **Four differentiation pillars** no incumbent occupies simultaneously: brand-voice-as-artifact, niche intelligence layer, QC quality gate, continuous post-publish optimization loop.
- **Orchestration:** LangGraph.js hierarchical-teams pattern (top supervisor → 5 team supervisors → 19 specialists), Postgres + pgvector for thread + cross-thread memory, LangSmith from day one, Temporal as durability backstop for irreversible side effects. ([product/13-orchestration-architecture.md](product/13-orchestration-architecture.md))

## Running the Dashboard

```bash
cd app
bun install
bun dev
# open http://localhost:3000
```

Then click the theme toggle (top-right in the Topbar) to switch between **Material You** (light, purple, organic) and **Web3 Bitcoin DeFi** (dark, Bitcoin orange + gold, monospace data displays). Same data, two complete visual languages.

Routes:
- `/dashboard` — multi-KPI overview, pipeline ribbon, recommendations, insights, engagement queue
- `/channel-insights` — SEO health gauge, baseline-vs-current, CTR/AVD trends, top videos, 52×7 cadence heatmap
- `/keyword-intelligence` — keyword universe treemap, sortable table, 6-axis radar, intent donut, trending scatter
- `/video-optimization` — 7-node pipeline stepper for the iron-condor video, all agent outputs side-by-side, QC verdict
- `/competitor-analysis` — leaderboard, niche-share treemap, multi-series strategy radar, keyword gap matrix
- `/agent-activity` — vertical timeline of all 19 runs with expandable prompt/raw/structured JSON + tokens/cost

## Build Output

- **App:** 48 source files, ~3,968 LOC. `bun run build` clean. All 6 routes statically prerendered. HTTP 200 verified.
- **Charts:** 16 Recharts components (ComposedChart, RadarChart, RadialBarChart, Treemap, ScatterChart, PieChart, AreaChart, BarChart, custom SVG cadence heatmap).
- **UI primitives:** 13 (KpiCard, PipelineStepper, QcDecisionBanner, AgentTimelineCard, ChapterTimeline w/ Material-horizontal + Web3-vertical "blockchain-ledger" variants, ThumbnailPreview, etc.).
- **Themes:** entirely CSS-variable driven; theme switch is instant, persisted to localStorage, no-flash inline bootstrap script in `<head>`.
- **Data:** 19 agent JSONs + unified state + execution-order DAG (all `jq -e` valid); 21-table Postgres schema; agent→table mapping comment block at end of schema.sql.

## Reading Order (recommended)

If you have 5 minutes: [product/00-overview.md](product/00-overview.md) → run the app → toggle the theme on `/dashboard`.

If you have 30 minutes:
1. [product/00-overview.md](product/00-overview.md)
2. [product/01-agent-discovery.md](product/01-agent-discovery.md) — the 19-agent roster + DAG
3. [product/02-agent-execution.md](product/02-agent-execution.md) — sequential simulation index
4. [data/unified-system-state.json](data/unified-system-state.json) — the canonical aggregated state
5. [product/06-screens.md](product/06-screens.md) — the 6 × 2 screens spec
6. Run the app and toggle themes
7. [product/08-prd.md](product/08-prd.md) → [product/12-competitive-analysis.md](product/12-competitive-analysis.md) → [product/13-orchestration-architecture.md](product/13-orchestration-architecture.md)

If you have 2 hours: read the rest in numerical order; cross-reference individual agent JSONs in `data/agents/` against the screens that render them.

## Open Decisions / Next Moves

1. Validate the $99–$199 willingness-to-pay with 5–10 trading creators (per [research-competitive.md](product/research-competitive.md) recommendation).
2. Spike LangGraph.js Self-Hosted Lite with one team (Intelligence, 3 agents) to validate the state schema before scaling agent count.
3. Define eval rubrics (`voice_match`, `hook_strength`, `seo_score`, `compliance_safety`) and 12 golden traces before LangSmith is wired into production.
4. Build the Brand Voice Profile editor surface — the moat made visible.
