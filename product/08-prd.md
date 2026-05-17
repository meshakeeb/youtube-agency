# Product Requirements Document — Blackbird Agency Platform

> Single canonical PRD. Version 1.0 · Author: Blackbird Product · Status: Draft for build sign-off.

## 1. Problem Statement

Creators in high-value niches (trading, finance, fitness, software dev) face four compounding problems:

1. **Fragmented tooling.** TubeBuddy, vidIQ, Spotter, 1of10, Taja each solve one slice. None hold context across videos or across the publish→monitor loop. ([research-competitive.md](research-competitive.md) — sections 1, 3.)
2. **Generic AI output.** Existing tools emit titles/descriptions that ignore brand voice, niche jargon, and audience triggers. YouTube's 2026 "inauthenticity" crackdown actively punishes this. ([Digiday rundown via research-competitive.md](research-competitive.md))
3. **No quality gate.** Every competitor will happily ship mediocre output. There is no adversarial QC step before publish.
4. **Post-publish blind spot.** After a video goes live, none of the existing tools run a continuous *observe → re-optimize* loop. Taja's "Backlog Boost" is the closest and still requires manual triggering.

**The market gap is concrete:** the $80–$200/mo pricing band — the right home for an agentic SaaS with persistent state — is empty between Spotter ($49) / vidIQ Max ($79) and Tubular ($1,500+).

## 2. Solution Summary

Blackbird is a **19-agent stateful pipeline** that automates the full SEO + growth lifecycle for YouTube creators. Agents are organized into five teams (Intelligence, Onboarding, Production, Growth, Operations) plus a Leadership layer (CSO, CEO). The system runs on LangGraph.js with Postgres + pgvector persistence.

Differentiation rests on four pillars no incumbent occupies simultaneously:

1. **Brand voice as a first-class artifact** — extracted at onboarding, persisted as a vector + structured profile, mandatory input to every Production agent.
2. **Niche intelligence layer** — top-10 channels, jargon, seasonal patterns, trending angles mapped per-niche and reused.
3. **Quality controller gate** — score 0–100 across keyword/voice/structure/CTR; below 80 = RETURNED with revision notes routed to the failing agent.
4. **Continuous post-publish optimization** — weekly performance analyst surfaces underperformers; CSO loop feeds strategy adjustments back into Production state.

## 3. Goals (12-month horizon)

| # | Goal | Measure |
|---|---|---|
| G1 | Reach $1M ARR | 600 paid seats at blended $138/mo ARPU |
| G2 | 85%+ retention | Cohort retention measured monthly |
| G3 | 40% average channel growth at 90 days | Views, CTR lift, subscriber velocity |
| G4 | Zero generic output | <2% of QC reviews return on "brand voice violation" |
| G5 | Sub-5 minute Production wall-clock | p95 from Keyword Researcher → QC approval |

## 4. Non-Goals

- Filming, video editing, motion graphics — out of scope (creator's editor handles).
- Paid ads management — out of scope.
- Long-form scripting — Blackbird outlines but does not write entire scripts (this is a deliberate quality boundary; agency creators have their own voice on camera).
- Non-YouTube primary platforms — TikTok, IG, X are *repurposing destinations*, not primary publish targets.

## 5. Personas

| Persona | Job to be done | Plan tier |
|---|---|---|
| **Solo creator** | "Help me ship one high-quality video a week without spending 6 hours on metadata." | Starter $79 |
| **Niche professional** (trading edu, finance, etc.) | "Help me grow without sounding like generic AI." | Pro $149 |
| **Agency operator** | "Run 8–40 client channels with shared infrastructure and white-label reporting." | Agency $499 |
| **Enterprise creator team** | "Multiple channels, custom workflows, on-prem option." | Custom |

## 6. Functional Requirements

### 6.1 Onboarding (one-time per client)
- F-1 OAuth YouTube Data API + Analytics API (read-only).
- F-2 Niche selection from 84-niche taxonomy + custom niche input.
- F-3 Phase 0 pipeline triggers `channel-auditor`, then in parallel `brand-voice-specialist`, `niche-intelligence-analyst` → `audience-persona-builder` + `competitor-analyst`, then `chief-strategy-officer` → `ceo` approval.
- F-4 Onboarding output persists as standing reference docs (re-used for every subsequent video; refresh every 90 days).

### 6.2 Production (per video)
- F-5 Topic + brief input form (≤500 chars topic, ≤2000 chars brief, optional script outline).
- F-6 Strict linear execution: keyword → title → description → tags → chapters → thumbnail → QC.
- F-7 Real-time card-by-card progress on Video Optimization screen.
- F-8 QC returns 0–100 score with per-dimension breakdown.
- F-9 One-click retry on returned package; max 3 retries per agent before CSO escalation.
- F-10 Export approved package as CSV/JSON/markdown for manual YouTube upload.

### 6.3 Growth (post-publish)
- F-11 Mark video as Published triggers parallel Growth fan-out (community + repurposing + playlist).
- F-12 Outputs queued in "Today's Engagement Queue" with copy buttons + Buffer/Hypefury integrations.
- F-13 Playlist Architect updates the Channel Architecture Plan + recommends end-screen cards.

### 6.4 Monitoring
- F-14 Weekly cron (Mon 09:00 client timezone) runs `performance-analyst` for every active channel.
- F-15 Underperformer detection: CTR drop >0.5pp OR AVD drop >30s OR view-velocity drop >40% vs 28d baseline.
- F-16 Auto-generated Weekly Pulse (1-page PDF) emailed to client + read-only dashboard link.
- F-17 Monthly Deep-Dive (first Monday of month) with metrics vs baseline, top wins, top concerns, next-month preview.

### 6.5 Multi-client (agency tier)
- F-18 Client switcher in top nav (recent + search).
- F-19 Aggregated multi-client KPI view at agency level.
- F-20 White-label client portal (custom domain + logo + brand colors).

### 6.6 Observability
- F-21 Agent Activity Logs screen — append-only timeline of every agent run with status, duration, input/output JSON, tokens used, cost.
- F-22 Replay an agent run with modified input (debugging / what-if).
- F-23 Trace links to LangSmith for engineering deep-dives.

## 7. Non-Functional Requirements

| Dimension | Requirement |
|---|---|
| **Latency** | p95 Production pipeline ≤ 5 min wall-clock. Onboarding ≤ 14 min. |
| **Availability** | 99.9% monthly. Weekly cron tolerates 2h delay window. |
| **Durability** | All agent outputs persisted in Postgres with point-in-time recovery (30 days). |
| **Security** | Per-client data isolation via row-level security. Encrypted at rest + in transit. YouTube OAuth tokens stored in a secrets vault. |
| **Compliance** | SOC2 Type II within 12 months. GDPR + CCPA from day 1. |
| **Cost** | Per-video Production token cost ≤ $0.85. Per-onboarding cost ≤ $4.50. |
| **Observability** | Every agent run traces to LangSmith. P95 error rate <1% per agent. |
| **Scalability** | Horizontal scale to 10K concurrent active clients via per-tenant worker pools. |

## 8. Success Metrics

- **North star:** Subscriber growth velocity (subs/day) lift over 90 days vs. pre-onboarding baseline.
- **Activation:** % of new clients that ship their first Production-approved video within 7 days. Target ≥70%.
- **Engagement:** Avg videos shipped per client per month. Target ≥4.
- **Quality:** QC approval rate on first pass. Target ≥80%.
- **Retention:** Monthly logo retention ≥95%, net dollar retention ≥110%.

## 9. Out-of-Scope (V1)

- AI video editing
- Thumbnail image generation (we ship a thumbnail *brief* with palette + composition; image generation is a planned V2 feature)
- Live-stream optimization
- Multi-language localization (planned V2)
- Voice cloning / dubbing

## 10. Open Questions for Cross-Functional Review

1. Should brand-voice profiles be versioned (allowing pre-/post-rebrand differentiation)?
2. Is the QC threshold (≥80) configurable per agency, or globally enforced?
3. Do we expose the LangSmith trace to end-creators or only to engineering / agency operators?
4. Does the YouTube API quota (10,000 units/day per project) accommodate weekly cron at our 1k-creator target without quota expansion application?

## 11. Feature Deep-Dive Index

Each feature has its own spec file with: market state (what competitors do), gap (what's missing), design decisions, data model touchpoints, success metrics.

- [features/01-channel-audit.md](features/01-channel-audit.md)
- [features/02-brand-voice-engine.md](features/02-brand-voice-engine.md)
- [features/03-niche-intelligence.md](features/03-niche-intelligence.md)
- [features/04-keyword-intelligence.md](features/04-keyword-intelligence.md)
- [features/05-competitor-intelligence.md](features/05-competitor-intelligence.md)
- [features/06-video-optimization-pipeline.md](features/06-video-optimization-pipeline.md)
- [features/07-thumbnail-strategist.md](features/07-thumbnail-strategist.md)
- [features/08-quality-controller.md](features/08-quality-controller.md)
- [features/09-growth-fanout.md](features/09-growth-fanout.md)
- [features/10-performance-monitoring.md](features/10-performance-monitoring.md)
