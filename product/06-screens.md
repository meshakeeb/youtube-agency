# Screens Spec — 6 Screens × 2 Design Variations

> Every screen ships in two visual variations:
> - **Variation A — Material You** (light, purple-seeded, organic, generous radii)
> - **Variation B — Web3 Bitcoin DeFi** (true-void dark, Bitcoin orange + gold, mono-data, glow shadows)
>
> Both are real routes in the Next.js app, switchable via a top-bar theme toggle. Data bindings come from [`data/unified-system-state.json`](../data/unified-system-state.json). Component primitives are Tremor + Recharts + Lucide.

---

## Screen 1 — Dashboard

**Purpose:** Single-pane overview of channel performance, current pipeline state, top insights, and today's action queue.

### Shared layout (both variations)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Top bar: logo · client switcher · search · theme toggle · avatar        │
├──────────┬─────────────────────────────────────────────────────────────┤
│          │ [Pipeline ribbon — current phase + active agent + duration] │
│ Sidebar  ├─────────────────────────────────────────────────────────────┤
│          │ Row 1: 4 KPI cards (Subs · CTR · AVD · QC Pass Rate)         │
│          ├─────────────────────────────────────────────────────────────┤
│          │ Row 2: [Subscriber Velocity composed chart (left, 2/3)]      │
│          │        [QC Score donut + breakdown (right, 1/3)]             │
│          ├─────────────────────────────────────────────────────────────┤
│          │ Row 3: [Today's Engagement Queue (cards, 2/3)]               │
│          │        [Top Recommendations action panel (1/3)]              │
│          ├─────────────────────────────────────────────────────────────┤
│          │ Row 4: [Open Insights — severity-coded card grid]            │
│          └─────────────────────────────────────────────────────────────┘
```

### Components and data bindings

| # | Component | Primitive | Data binding |
|---|---|---|---|
| 1 | Pipeline ribbon | Custom `<PipelineRibbon>` w/ animated dot | `pipeline_state.{current_phase, active_thread_id, blocking_agents}` |
| 2 | KPI: Subscribers | Tremor `<Card><Metric>` + `<BadgeDelta>` + `<SparkAreaChart>` | `metrics.current.subs`, `metrics.trend_30d[].subs` |
| 3 | KPI: CTR | same | `metrics.current.ctr` |
| 4 | KPI: AVD | same | `metrics.current.avd_seconds` |
| 5 | KPI: QC Pass Rate | Tremor `<Card>` + `<ProgressCircle>` | `metrics.current.qc_pass_rate` |
| 6 | Subscriber Velocity chart | Recharts `<ComposedChart>` (Area for `subs`, Bar for `views`) | `metrics.trend_90d[]` |
| 7 | QC Score donut | Recharts `<PieChart>` (donut variant) | `entities.video.qc_review.breakdown` |
| 8 | Engagement Queue | Card list w/ Lucide icons (Twitter, Linkedin, MessageCircle, ListVideo) | `lists.videos[].engagement_package` filtered to today |
| 9 | Recommendations panel | Card list w/ priority chips + one-click `ArrowRight` CTA | `recommendations[]` top 5 |
| 10 | Insights grid | Severity-colored cards | `insights[]` open, sorted by severity |

### Charts — premium spec

- **Subscriber Velocity** (`<ComposedChart>`, 90 days)
  - Y-axis 1: `subs` (line, smooth, 2px stroke, gradient fill below).
  - Y-axis 2: `views/day` (bar, narrow, alternate color).
  - Reference line: target (`client.target.subs` / time-projected).
  - Brush component at bottom for time-range selection.
  - Tooltip shows all 3 values + delta from baseline.
- **QC Score donut**
  - 4 segments (Keyword, Brand Voice, Structure, CTR Potential).
  - Center label: aggregate score.
  - Each segment label = score + Lucide check/x.

### Variation A — Material You

- Background: `#FFFBFE` with two large blurred organic shapes (purple at 12%, mauve at 8%) behind the KPI row.
- KPI cards: `bg-[#F3EDF7]` (Surface Container), `rounded-[24px]`, `shadow-sm`, hover `shadow-md` + `scale-[1.02]`. Metric value Roboto Medium 32px.
- Pipeline ribbon: pill at the top, `bg-[#E8DEF8]` (Secondary Container) with a small purple pulse animation on the active agent.
- Recharts theme: lines `#6750A4`, area gradient `#6750A4` → transparent, bars `#7D5260` (Tertiary).
- BadgeDelta: rounded-full pill with light-purple background.
- Icons: Lucide at 20px, stroke 1.5, `text-[#49454F]` for muted, `text-[#6750A4]` for primary.
- Motion: 300ms `cubic-bezier(0.2, 0, 0, 1)` on every hover.
- Engagement Queue cards each have a top-left organic blur (purple/lavender) revealed on hover.

### Variation B — Web3 Bitcoin DeFi

- Background: `#030304` with the signature grid pattern (50px × 50px, `rgba(30,41,59,0.5)`) masked to radial vignette. Two soft orange blur orbs (`#F7931A` at 8%, `blur-[120px]`) positioned top-right and bottom-left.
- KPI cards: `bg-[#0F1115]`, `border border-white/10`, `rounded-2xl`, shadow `shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)]`. Metric value Space Grotesk Semibold 36px; sub-label JetBrains Mono 12px uppercase tracking-wider.
- Pipeline ribbon: thin glass card with `backdrop-blur-lg bg-black/40`, active agent text gets the gradient `from-[#F7931A] to-[#FFD600]` clipped on the text itself; pulsing dot uses `animate-ping`.
- Recharts theme: lines `#F7931A`, area gradient `#F7931A` → transparent, bars `#EA580C`, gridlines `rgba(255,255,255,0.05)`.
- BadgeDelta: gradient pill `from-[#EA580C] to-[#F7931A]` for positive, `border-white/20 text-[#94A3B8]` for negative — never red (red is reserved for QC RETURNED).
- Icons: Lucide at 20px, stroke 2, `text-[#F7931A]` primary, `text-[#94A3B8]` muted.
- Hover: cards lift `-translate-y-1`, border shifts to `border-[#F7931A]/50`, glow intensifies.
- Subscriber Velocity chart background has a *very* faint blockchain-node decorative pattern (orange dots on intersections at 4% opacity).

---

## Screen 2 — Channel Insights

**Purpose:** Deep performance analytics. SEO health gauge, baseline-vs-current comparison, CTR/AVD/velocity trends, top videos, audit quick-wins.

### Shared layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Header: channel name · niche pill · last audit timestamp · "Re-audit" CTA│
├─────────────────────────────────────────────────────────────────────────┤
│ Row 1: [SEO Health radial gauge (1/3)] [Baseline vs Current bars (2/3)] │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 2: [CTR Trend 90d area chart (1/2)] [AVD Trend 90d (1/2)]           │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 3: [Subscriber velocity + view velocity composed chart (full width)]│
├─────────────────────────────────────────────────────────────────────────┤
│ Row 4: [Top 5 videos table w/ sparklines (2/3)] [Quick wins list (1/3)] │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 5: [Upload cadence × performance heatmap (full width)]              │
└─────────────────────────────────────────────────────────────────────────┘
```

### Components and data bindings

| # | Component | Primitive | Data binding |
|---|---|---|---|
| 1 | SEO Health gauge | Recharts `<RadialBarChart>` (single arc, 0–100) | `entities.channel.audit.health_score` |
| 2 | Baseline vs Current | Recharts `<BarChart>` horizontal grouped (2 series) | `entities.channel.audit.baseline_metrics` vs `metrics.current` |
| 3 | CTR Trend 90d | Recharts `<AreaChart>` w/ gradient fill, niche-median reference line | `metrics.trend_90d[].ctr` |
| 4 | AVD Trend 90d | same with seconds-formatted Y | `metrics.trend_90d[].avd_seconds` |
| 5 | Velocity composed | Recharts `<ComposedChart>` (line subs + bar views) | `metrics.trend_90d[]` |
| 6 | Top videos table | Tremor `<Table>` + `<SparkLineChart>` per row | `lists.videos[]` sorted by view_velocity desc |
| 7 | Quick wins | Card list w/ severity + ETA chips | `entities.channel.audit.quick_wins[]` |
| 8 | Cadence heatmap | Custom SVG grid (52 weeks × 7 days) w/ Recharts tooltips | `lists.videos[].{published_at, view_velocity_7d}` |

### Charts — premium spec

- **SEO Health gauge**: 270° radial arc, gradient stroke (red 0–40 → amber 40–70 → green 70–100), center shows score in large font + threshold label ("Excellent / Good / Needs Work"). Animated count-up on mount (Framer Motion 800ms).
- **Cadence heatmap**: 7 rows (days of week) × 52 cols (weeks). Each cell color-coded by `view_velocity_7d` percentile. Empty cells = no upload. Hover shows date + video title + velocity. Bottom row: monthly aggregates.
- **Top videos table** rows include: rank, thumbnail, title (truncated), CTR, AVD, view velocity, 7-day sparkline.

### Variation A — Material You

- SEO gauge ring uses Material color steps: `#B3261E` (red) → `#F2B8B5` → `#7D5260` → `#6750A4` (purple at top).
- Baseline-vs-Current bars: pastel pair `#E8DEF8` baseline, `#6750A4` current.
- Quick win cards: tonal pill chip for severity (light pink/orange/green).
- Cadence heatmap: 8-step purple ramp from `#F3EDF7` (lightest) to `#1D192B` (darkest).

### Variation B — Web3 Bitcoin DeFi

- SEO gauge ring uses orange gradient: from `#EA580C` deep at 0 to `#F7931A` at 50 to `#FFD600` (gold) at 100. Adds outer glow shadow.
- Baseline-vs-Current bars: muted `border border-white/10` for baseline, gradient `from-[#EA580C] to-[#F7931A]` for current.
- Quick win cards: terminal-style monospace title, severity chip uses orange/gold tints; corner border accents (`border-t border-l border-[#F7931A]/50` on top-left).
- Cadence heatmap: 9-step heat ramp from `#0F1115` (no data) → `#451A03` → `#9A3412` → `#EA580C` → `#F7931A` → `#FFD600` (hottest).

---

## Screen 3 — Keyword Intelligence

**Purpose:** SEO keyword discovery, gap analysis, multi-dimensional scoring, and triage into the content calendar.

### Shared layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Search + filter row (intent · volume range · difficulty · trending)     │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 1: [Keyword universe treemap (full width, 320px tall)]              │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 2: [Keyword table w/ rank, volume, difficulty, opportunity (2/3)]   │
│        [Selected keyword radar (1/3)]                                    │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 3: [Search-intent distribution donut (1/3)] [Trending vs evergreen  │
│        scatter (2/3)]                                                    │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 4: [Long-tail suggestions for selected keyword (chips)]             │
└─────────────────────────────────────────────────────────────────────────┘
```

### Components and data bindings

| # | Component | Primitive | Data binding |
|---|---|---|---|
| 1 | Filter chips | Tremor `<MultiSelect>` + custom chips | derived from `lists.keywords[]` |
| 2 | Keyword universe treemap | Recharts `<Treemap>` (size=volume, color=opportunity_score) | `lists.keywords[]` |
| 3 | Keyword table | Tremor `<Table>` w/ sortable columns + per-row opportunity badge | `lists.keywords[]` |
| 4 | Scoring radar | Recharts `<RadarChart>` (5 axes) | `lists.keywords[selected]` |
| 5 | Intent donut | Recharts `<PieChart>` donut | aggregate of `lists.keywords[].intent` |
| 6 | Trending scatter | Recharts `<ScatterChart>` (x=volume, y=growth_rate, size=opportunity) | `lists.keywords[]` |
| 7 | Long-tail chips | Tremor `<Badge>` chips | `lists.keywords[selected].long_tail[]` |
| 8 | "Add to calendar" CTA | Button → mutation | creates new video draft with `topic = keyword` |

### Radar axes (selected keyword)

- Volume (log-normalized)
- Inverse difficulty (1 - difficulty)
- Intent match (alignment with channel's content type)
- Brand fit (cosine similarity with brand voice topics)
- Seasonality (current vs. annual median)
- CTR potential (predicted from competitor SERP analysis)

### Variation A — Material You

- Treemap rectangles use 5-step purple ramp by opportunity_score (`#E8DEF8` → `#6750A4`). Border 1px outline color, rounded `4px`.
- Radar: filled polygon `#6750A4/30`, stroke `#6750A4`, dots `#7D5260`.
- Intent donut: purple/lavender/mauve/peach segments.
- Filter chips: tonal pill, `bg-[#E8DEF8]`, active = `bg-[#6750A4] text-white`.

### Variation B — Web3 Bitcoin DeFi

- Treemap: 5-step heat ramp from `#1F2937` → `#451A03` → `#EA580C` → `#F7931A` → `#FFD600`. Border 1px `border-white/10`.
- Radar: filled polygon `#F7931A/20` with gradient stroke, dots `#FFD600`.
- Each high-opportunity (>80) cell on the treemap gets a faint orange glow shadow.
- Long-tail chips: JetBrains Mono uppercase, `border-white/10` rest, `border-[#F7931A]` on hover w/ ping animation.

---

## Screen 4 — Video Optimization

**Purpose:** The Production pipeline cockpit. Watches the linear agent chain progress, surfaces each agent's output as it lands, gates on QC.

### Shared layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Header: video topic · status pill · pipeline stepper (7 nodes)          │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 1: [Keyword Brief card (1/2)] [Title Set — 3 alternatives (1/2)]    │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 2: [Description draft + hook strength meter (full width)]           │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 3: [Tag chip cloud + char-count gauge (1/2)] [Chapter timeline (1/2)│
├─────────────────────────────────────────────────────────────────────────┤
│ Row 4: [Thumbnail Brief — layout sketch + palette + overlay text]       │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 5: [QC Review — radial score + 4-axis breakdown + decision banner]  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Components and data bindings

| # | Component | Primitive | Data binding |
|---|---|---|---|
| 1 | Pipeline stepper | Custom 7-node stepper w/ Lucide check/loader/x icons | `agent_runs[]` filtered to current video |
| 2 | Keyword Brief card | Tremor `<Card>` w/ structured key:value rows | `entities.video.keyword_brief` |
| 3 | Title Set cards | 3 stacked cards (primary highlighted) w/ CTR estimate gauge | `entities.video.title_set.{primary_title, alternatives, ctr_estimate}` |
| 4 | Description card | Render markdown + char counter + hook strength meter | `entities.video.description.{description_full, hook_strength_score}` |
| 5 | Tag chip cloud | Lucide `Tag` icon + Tremor `<Badge>` chips | `entities.video.tag_set.tags[]` |
| 6 | Tag char-count gauge | Tremor `<ProgressBar>` (color = green ≤450, amber 450–490, red >490) | `entities.video.tag_set.char_count_total` |
| 7 | Chapter timeline | Custom horizontal timeline w/ Lucide flag icons at keyword chapters | `entities.video.chapter_set.chapters[]` |
| 8 | Thumbnail layout sketch | Visual mockup w/ palette swatches + overlay text preview | `entities.video.thumbnail_brief` |
| 9 | QC radial score | Recharts `<RadialBarChart>` 0–100 + central icon | `entities.video.qc_review.quality_score` |
| 10 | QC breakdown bars | Recharts `<BarChart>` horizontal (4 axes) | `entities.video.qc_review.breakdown` |
| 11 | QC decision banner | Lucide `CheckCircle2` / `AlertTriangle` + revision notes list | `entities.video.qc_review.{decision, revision_notes}` |
| 12 | "Retry failing agent" CTA | Button → mutation | only when decision=RETURNED |

### Pipeline stepper interaction

Each of the 7 nodes (keyword → title → desc → tags → chapters → thumb → QC) animates: greyed before, pulsing during, checked after, red-X if failed. Click a completed node to scroll to that card. Hover shows agent name + duration + token count.

### Variation A — Material You

- Pipeline stepper nodes: `bg-[#E8DEF8]` rest, `bg-[#6750A4]` complete with white check, animated dotted line between in purple.
- Title alternative cards: primary card is `scale-105` and elevated `shadow-md`, others `opacity-80`.
- Hook strength meter: horizontal 0–100 with gradient fill amber→purple.
- Thumbnail palette swatches: rounded-full chips with hex code label below.
- QC RETURNED banner: `bg-[#FFDAD6]` (Material error container) with red-violet text; revision notes in nested cards with `border-l-4 border-[#B3261E]`.

### Variation B — Web3 Bitcoin DeFi

- Pipeline stepper: nodes are small monospace numbered tiles `bg-[#0F1115] border border-white/10`; complete state adds orange glow. Connecting line is gradient `from-[#F7931A] to-[#FFD600]` masking from left.
- Title alternative cards: primary card has gradient border (`p-[1px] bg-gradient-to-r from-[#EA580C] to-[#F7931A]` then inner card), CTR estimate badge uses gold.
- Hook strength meter: orange→gold gradient bar with JetBrains Mono percentage.
- Tag chip cloud: terminal-style `border-white/10` chips, hover lights orange. Char-count gauge replaces traffic-light colors with gold (good) → orange (warn) → orange/red ping (over-limit).
- Chapter timeline: vertical bar replaces horizontal — looks like a blockchain ledger; each chapter is a numbered node on a gradient orange→transparent vertical line.
- Thumbnail palette swatches: glass-morphism chips `bg-white/5 backdrop-blur` with hex in JetBrains Mono.
- QC RETURNED banner: thin red-line `border border-[#EF4444]/50` with corner accent borders; revision notes in `bg-[#1F0A0A]` cards.

---

## Screen 5 — Competitor Analysis

**Purpose:** Competitive benchmarking. Niche leaderboard, keyword gap heat, strategy comparison radar, per-video differentiation brief.

### Shared layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Niche selector + "refresh competitor data" CTA                          │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 1: [Competitor leaderboard table (full width, 10 rows)]             │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 2: [Niche-share treemap (1/2)] [Strategy radar — multi-series (1/2)]│
├─────────────────────────────────────────────────────────────────────────┤
│ Row 3: [Keyword gap matrix table (full width)]                          │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 4: [Per-video competitive brief — 5 ranking videos + diff angle]    │
└─────────────────────────────────────────────────────────────────────────┘
```

### Components and data bindings

| # | Component | Primitive | Data binding |
|---|---|---|---|
| 1 | Leaderboard table | Tremor `<Table>` w/ rank, avatar, subs, niche-share %, weekly views sparkline, last-video timestamp | `entities.competitors[]` |
| 2 | Niche-share treemap | Recharts `<Treemap>` (size=niche_share, color=growth_rate) | `entities.competitors[]` |
| 3 | Strategy radar | Recharts `<RadarChart>` multi-series (self + 2 selected competitors) | per-competitor strategy axes |
| 4 | Keyword gap matrix | Tremor `<Table>` w/ heat-mapped cells (your-rank, top-comp-rank, gap-score) | `lists.competitor_keywords[]` |
| 5 | Differentiation panel | Card w/ Lucide `Target` icon + structured rationale | `entities.video.competitor_brief.differentiation_angle` |

### Strategy radar axes (5)

- Upload cadence (videos/week)
- Avg video length
- Thumbnail style depth-score
- Description depth-score
- Community engagement rate

### Variation A — Material You

- Treemap: 5-step ramp from `#E8DEF8` → `#6750A4`. Each cell shows competitor name + niche % in `text-[#FFFBFE]` over the darker cells.
- Strategy radar: 3 overlaid polygons (you=purple, top-comp=mauve, 2nd-comp=light-purple), each with fill at 25%.
- Leaderboard rows: hover lifts shadow + tints background `#F3EDF7`.

### Variation B — Web3 Bitcoin DeFi

- Treemap: heat ramp dark → orange → gold; each cell `border border-white/5`, hover gets orange glow. Self-row uses a special gold border.
- Strategy radar: 3 overlaid polygons (you=gradient orange→gold, top-comp=`#94A3B8`, 2nd-comp=`#475569`), legend uses JetBrains Mono.
- Leaderboard rows: monospace numerics, rank cell uses `#FFD600` gold, hover row gets faint orange row-highlight `bg-[#F7931A]/5`.

---

## Screen 6 — Agent Activity Logs

**Purpose:** Traceability. Every agent run, timeline-ordered, expandable to raw + structured outputs. Filter by team/agent/status. Replay any run.

### Shared layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Filter bar: team · agent · status · phase · time range                  │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 1: [Run-rate timeline area chart (last 24h, by team)]               │
├─────────────────────────────────────────────────────────────────────────┤
│ Row 2: [Vertical timeline of agent runs — most recent at top, expandable│
│        cards showing raw output + structured JSON + tokens + cost]      │
└─────────────────────────────────────────────────────────────────────────┘
```

### Components and data bindings

| # | Component | Primitive | Data binding |
|---|---|---|---|
| 1 | Filter bar | Tremor `<MultiSelect>` per dimension | derived from `agent_runs[]` |
| 2 | Run-rate area chart | Tremor `<AreaChart>` stacked by team, 24h | `agent_runs[]` aggregated per 15-min bucket |
| 3 | Timeline cards | Custom vertical timeline (Lucide icon per status), expand-on-click | `agent_runs[]` |
| 4 | Expanded view: prompt | `<pre>` w/ code highlighting | `agent_runs[i].prompt` |
| 5 | Expanded view: raw output | `<pre>` w/ markdown rendering | `agent_runs[i].raw_output` |
| 6 | Expanded view: structured | JSON tree viewer (collapsible) | `agent_runs[i].structured_output` |
| 7 | Per-run metadata strip | Lucide icons + numbers: tokens, cost, duration, retries | `agent_runs[i].{tokens, cost_usd, duration_ms, retry_count}` |
| 8 | Replay CTA | Button → opens modal w/ editable prompt input | mutation: new pipeline_run |
| 9 | LangSmith trace link | External link icon | `agent_runs[i].langsmith_trace_url` |

### Variation A — Material You

- Run-rate chart: stacked area with 5 tonal purples per team (Intelligence=`#6750A4`, Onboarding=`#7D5260`, Production=`#9A8AC3`, Growth=`#B69DD8`, Operations=`#D0BCFF`).
- Timeline cards: pill-shaped status badges, generous `p-6` padding, hover elevates to `shadow-md`.
- Status icons: `CheckCircle2` green, `Loader2` spinning purple, `AlertTriangle` amber, `XCircle` red, `RotateCcw` for returned.
- Expanded cards: `bg-[#F3EDF7]`, code blocks use a soft `#E7E0EC` background, JSON tree uses indented disclosure.

### Variation B — Web3 Bitcoin DeFi

- Run-rate chart: stacked area with 5 hues from orange→gold spectrum (Intelligence=`#EA580C`, Onboarding=`#F7931A`, Production=`#FB923C`, Growth=`#FCD34D`, Operations=`#FFD600`).
- Timeline cards: glass `bg-black/40 backdrop-blur-lg`, status badges are monospace, completed = gradient pill, running = orange pulse, failed = red hairline corner accents.
- Status icons: same Lucide set but stroke-2, colored.
- Expanded cards: `bg-[#0F1115] border border-white/10`, code blocks `bg-black/60 border-white/5`, syntax highlighting uses orange/gold/cyan/white palette.
- The vertical timeline rail is a thin gradient line `from-[#F7931A] via-[#FFD600] to-transparent` mimicking a blockchain ledger.

---

## Cross-Screen Patterns

### Theme toggle (top bar, present on every screen)
- Material You: small icon button (Lucide `Sun`), tonal hover.
- Web3: pill toggle with `Moon`/`Sun` icons on a gradient track.

### Client switcher
- Material You: dropdown w/ recent + search + "+ New Client" pill.
- Web3: terminal-style dropdown w/ JetBrains Mono client names + status dots.

### Pipeline ribbon
- Material You: pill with current-agent name + Lucide spinner.
- Web3: glass card with gradient text + pulsing dot + JetBrains Mono ETA.

### Empty states
- Material You: large soft illustration with primary CTA, generous breathing room.
- Web3: monospace "// no data yet" + thin orange border + single ghost CTA.

### Loading states
- Material You: tonal skeleton bars with shimmer.
- Web3: thin `border-white/10` skeleton lines that pulse with orange glow.

### Error states
- Material You: `bg-[#FFDAD6]` banner with `AlertOctagon` icon and primary CTA.
- Web3: thin red-line border at top of card with monospace error message and `RotateCcw` retry icon.

### Motion principles
- Material You: 300ms `cubic-bezier(0.2, 0, 0, 1)` on every state transition; press feedback `active:scale-95`.
- Web3: 200–300ms `transition-all`; hover lifts `-translate-y-1`; cards never scale on hover (precision aesthetic).

### Accessibility (both variations)
- WCAG AA contrast minimum on text.
- Charts have alt text summary + tabular fallback.
- All KPI cards focus-trap correctly and announce value + delta.
- Color is never the sole signal — Lucide icons accompany every status.
