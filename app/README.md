# Blackbird Agency — Multi-Agent YouTube SEO Dashboard

Next.js 14 (App Router) dashboard for **AlphaTraderTV**, surfacing every output from the 19-agent Blackbird pipeline. Six screens, each in two complete visual variations switchable from the top bar.

## Stack

- Next.js 14.2 + React 18 + TypeScript strict
- Tailwind CSS 3 with CSS-variable theming
- Recharts (every chart) + Tremor primitives + Lucide icons
- bun as the package manager and dev runner

## Run

```bash
bun install
bun dev          # localhost:3000
bun run build    # production build
bun start        # serve the production build
```

## Theme system

The app ships two complete visual variations and switches between them instantly via a top-bar toggle.

- **Material You** — light surface (#FFFBFE), Material 3 purple (#6750A4), Roboto, 24px radii, tonal shadow elevation, organic blurred shapes behind the layout.
- **Web3 Bitcoin DeFi** — true void (#030304), Bitcoin orange (#F7931A) + gold (#FFD600) accents, Space Grotesk / JetBrains Mono, 16px radii, glow shadows, 50px grid background.

Both themes are driven by CSS custom properties defined in `app/globals.css` under
`[data-theme="material"]` and `[data-theme="web3"]` selectors. The active theme is
written to the `<html data-theme>` attribute by a no-flash inline script and
persisted to `localStorage`. Every chart resolves its palette via
`components/charts/chartColors.ts` so the same component renders correctly under
both themes.

## Screens

| Route | What it shows |
|---|---|
| `/dashboard` | Pipeline ribbon · 4 KPI cards · subscriber-velocity ComposedChart · QC donut · engagement queue · top-5 recommendations · open-insights grid |
| `/channel-insights` | SEO health RadialBar gauge · baseline-vs-current horizontal bars · CTR/AVD 90d AreaCharts · velocity ComposedChart · top-videos table with sparklines · quick-wins · 52×7 cadence heatmap (custom SVG) |
| `/keyword-intelligence` | Filter chips · Treemap of the keyword universe · sortable keyword table · 6-axis Radar of the selected keyword · intent donut · Trending vs evergreen ScatterChart · long-tail chip cloud |
| `/video-optimization` | 7-node pipeline stepper · keyword brief · 3 title alternatives with CTR estimates · description with hook-strength meter · tag cloud + char-budget gauge · chapter timeline (horizontal in Material, vertical "ledger" in Web3) · thumbnail mockup with palette · QC score gauge + 4-axis breakdown bars + APPROVED banner |
| `/competitor-analysis` | 10-row leaderboard with weekly-views sparklines · niche-share Treemap · multi-series Strategy Radar (you + 2 competitors) · keyword gap matrix with heat cells · per-video differentiation brief |
| `/agent-activity` | Team + status filters · stacked AreaChart of run rate (24h, by team) · vertical timeline of all 19 agent runs, each expandable to show prompt + raw output + structured JSON + tokens/cost/duration/retries |

## Data layer

All data is read statically. `app/lib/data.ts` imports:

- `data/unified-system-state.json` — the canonical worked example (AlphaTraderTV, vid_143 "How I Made $14K With Iron Condors in October (Real P&L)", QC 95 APPROVED).
- `data/agents/*.json` — every individual agent's prompt, raw output, structured output, dependencies, and timing.

The module also derives a few computed datasets — a 90-day daily timeseries with a believable breakout at the vid_143 launch, a 52×7 cadence heatmap, an enriched keyword catalog (opportunity score, intent, growth rate, long-tail expansions), an enriched competitor catalog (niche share, growth, cadence, depth scores), a keyword-gap matrix, and an engagement queue. Every value flows from a real field in the source JSON or a deterministic transformation of one.

## Build status

`bun run build` finishes clean with all six routes statically prerendered. TypeScript strict mode is on.

## Pragmatic decisions

- Tremor is loaded for KPI-card styling tokens and tables, but every chart uses Recharts directly for full theme control.
- The Web3 chapter timeline is rendered vertically (blockchain-ledger metaphor) while the Material variant is horizontal — same data, distinct visual language per spec.
- `cadence heatmap` is hand-drawn SVG (not Recharts) because Recharts has no native calendar heatmap.
- A no-flash inline script in `<head>` sets `data-theme` before React hydrates, eliminating theme flicker.
- "Today's engagement queue", "quick wins", and the 90-day daily timeseries are synthesized deterministically from the unified state — every number traces back to a real baseline/current pair or a transformation of `lists.videos` / `lists.keywords`.

## What it looks like

Click the theme pill in the top bar to swap the entire visual language. The Material variant feels like a tonal-paper Material 3 design system: rounded surfaces, soft purple shadows, organic background blobs. The Web3 variant feels like a Bitcoin trading terminal: black-void background, 50px grid, JetBrains-Mono numerics, orange/gold glows, gradient borders on selected items.
