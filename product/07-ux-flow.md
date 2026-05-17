# UX Flow — End-to-End User Journey

> One agency operator (Maya) onboards trading-edu creator AlphaTraderTV, ships a video, watches performance, and iterates. Every step maps to a UI screen and a pipeline phase.

## Personas

| Persona | Role | Primary screens |
|---|---|---|
| **Solo Creator** | Owns one channel, runs the pipeline themselves. | Dashboard, Video Optimization, Channel Insights |
| **Agency Operator (Maya)** | Manages 6–40 client channels. | Dashboard (multi-client), Agent Activity Logs, Competitor Analysis, Keyword Intelligence |
| **Client (Read-only)** | Receives weekly + monthly reports. | Dashboard (read-only mode), Channel Insights, Reports |

## End-to-End Journey (Maya × AlphaTraderTV)

### 1. Connect channel (≤2 min)
- Maya signs in, hits **+ New Client**.
- OAuths AlphaTraderTV's YouTube channel (Google OAuth, read-only analytics scope).
- Selects niche `trading-education` from a taxonomy of 84 pre-seeded niches.
- Sets retainer tier and goal (100K subs / 9 months).
- → triggers Phase 0 pipeline run.

### 2. Onboarding pipeline runs (≤14 min, visible in real time)
- The Agent Activity Logs screen shows a **live timeline**: 7 cards animating in order — `channel-auditor` (3:12), `brand-voice-specialist` (2:48), `niche-intelligence-analyst` (4:22, parallel), `audience-persona-builder`, `competitor-analyst`, `chief-strategy-officer`, `ceo`.
- Each card streams partial output; clicking expands the full structured JSON.
- When the CEO node turns green, the **Dashboard** unlocks with the first set of insights.

### 3. Review onboarding outputs
- **Channel Insights** screen renders: SEO health gauge (68/100), CTR vs. niche-median chart, AVD trend, top quick-wins list.
- **Competitor Analysis** screen renders: leaderboard of 10 niche channels, keyword-gap treemap, differentiation panel.
- **Keyword Intelligence** screen renders: 20 keyword-gap opportunities with volume/difficulty/opportunity-score columns + scoring radar.
- Maya tags 3 keywords as priority for next month's content calendar.

### 4. Submit a new video for Production (≤5 min pipeline)
- From the Dashboard's **+ New Video** action, Maya pastes:
  - Topic: `Iron Condor for Monthly Income`
  - Brief: `Show $14K October 2025 P&L; teach 3-leg setup; warn on tail risk`
  - Optional video summary / script outline
- Production pipeline fires (Keyword → Title → Description → Tags → Chapters → Thumbnail → QC).
- **Video Optimization** screen renders progressively as each agent completes:
  - Title card shows 3 alternatives with predicted CTR.
  - Description card shows the full draft + hook-strength meter.
  - Tag card shows chip cloud + character-count gauge.
  - Chapter card shows a timeline visualization.
  - Thumbnail card shows the brief + palette swatches + A/B variant.
- QC produces a 0–100 score per dimension (Keyword, Brand Voice, Structure, CTR Potential).

### 5. Handle QC return loop (~10% of videos)
- If QC returns the package, Maya sees a red banner with which sub-agent failed and the revision note (e.g., *"Hook too clickbaity; violates Brand Voice 'no fake-urgency' red line"*).
- **One-click Retry** re-runs only the failing agent with the revision note appended to its prompt.

### 6. Publish and trigger Growth pipeline
- Maya marks the video Approved → Published (after editor uploads to YouTube).
- Phase 2 fires immediately, in parallel:
  - `community-engagement-strategist` → pinned comment + community post + 3 in-video verbal hooks.
  - `cross-platform-repurposing-agent` → 3 Shorts scripts + Twitter thread + LinkedIn + Instagram + Telegram.
  - `playlist-architect` → places video in target playlist; recommends end-screen cards.
- Outputs surface on the Dashboard under **Today's Engagement Queue**.

### 7. Weekly monitoring (automatic)
- Every Monday 09:00 the `performance-analyst` cron fires for every active client.
- New rows hit the **Channel Insights** trend charts.
- If any video is flagged (CTR drop > 0.5pp, AVD drop > 30s), a red dot appears in the Dashboard sidebar.
- `client-reporting-agent` generates the Weekly Pulse PDF.

### 8. Monthly deep-dive
- First Monday of the month, `client-reporting-agent` produces the Monthly Deep-Dive report.
- Maya reviews, optionally adds commentary, and shares a read-only link with the client.

### 9. Feedback loop
- The CSO node ingests the performance flags and proposes strategy adjustments (e.g., *"Iron condor topic underperformed CTR; pivot to '$X profit in Y days' narrative for next 4 videos"*).
- Approved adjustments mutate the `strategy_state` in the LangGraph store, biasing future Title and Thumbnail outputs.

## UI State Flow (per screen)

| Screen | Empty state | Loading | Populated | Error |
|---|---|---|---|---|
| Dashboard | "Connect your first channel" CTA | Skeleton KPI cards | Live KPIs + insights + queue | Banner with retry |
| Channel Insights | "Audit pending" | Animated SEO gauge skeleton | Gauge + trend + recommendations | Per-card error |
| Keyword Intelligence | "Run niche intel to unlock" | Table skeleton w/ shimmer | Table + radar + filters | Inline filter errors |
| Video Optimization | "Submit a video to start" | Card-by-card progressive reveal | Title + Desc + Tags + Chapters + Thumb + QC | Per-card retry |
| Competitor Analysis | "Niche profile pending" | Leaderboard skeleton | Leaderboard + treemap + strategy panel | Per-card error |
| Agent Activity Logs | "No runs yet" | N/A (logs are append-only) | Timeline + filterable runs | Per-row badge |
