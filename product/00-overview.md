# Blackbird Agency — Product Overview

> Multi-agent SaaS that turns YouTube channels into discovered, watched, and shared content at scale.

## One-line Pitch

**Blackbird** runs a 19-agent SEO + growth pipeline for creators — niche intelligence, brand voice, keyword + competitor research, production (titles/descriptions/tags/chapters/thumbnails), QC gating, and post-publish growth (engagement, repurposing, playlists) — orchestrated as a stateful LangGraph workflow with a continuous performance feedback loop.

## Problem

Creators today are stuck juggling 6–8 disconnected tools (TubeBuddy, VidIQ, Spotter, Notion, Premiere, Canva, Buffer, Airtable). None of them:

- maintain **stateful context** about the creator's niche, voice, and audience across videos,
- produce **brand-voice-aligned** outputs that don't sound generic-AI,
- gate work through a **quality controller** before client/publish,
- feed **post-publish performance back into upstream strategy** automatically.

The result: generic titles, copy-paste descriptions, thumbnail templates that ignore audience triggers, and an inability to scale beyond ~1 channel per operator.

## Solution

A single web product where:

1. A creator (or an agency operating multiple creators) **onboards a channel**.
2. The **Intelligence + Onboarding** teams build a permanent context layer: Channel Audit, Brand Voice Profile, Niche Intelligence Profile, Audience Persona Card, Competitor Gap Report.
3. For every new video, the **Production** pipeline runs sequentially (Keyword → Title → Description → Tags → Chapters → Thumbnail) and lands on the **Quality Controller** gate.
4. After publish, **Growth** agents fire in parallel (Community Engagement, Cross-Platform Repurposing, Playlist Architect).
5. **Operations** monitors weekly performance, escalates underperformers, and produces client-facing reports.
6. All outputs are **persisted as structured JSON**, queryable, and surfaced through a Tremor+Recharts dashboard.

## The 19 Agents

| Team | Agents |
|---|---|
| **Intelligence** | niche-intelligence-analyst · audience-persona-builder · competitor-analyst |
| **Onboarding** | channel-auditor · brand-voice-specialist |
| **Production** | keyword-researcher · title-copywriter · description-writer · tags-hashtag-specialist · chapter-architect · thumbnail-strategist |
| **Growth** | community-engagement-strategist · cross-platform-repurposing-agent · playlist-architect |
| **Operations** | quality-controller · performance-analyst · client-reporting-agent |
| **Leadership** | chief-strategy-officer · ceo |

Full role specs in [`product/01-agent-discovery.md`](01-agent-discovery.md). Worked example outputs in [`data/agents/`](../data/agents/) and [`data/unified-system-state.json`](../data/unified-system-state.json).

## Worked Example

Throughout this deliverable the system is demonstrated on a single creator:

- **Channel:** `AlphaTraderTV`
- **Niche:** Stock + options + crypto trading education (beginner→intermediate)
- **Baseline (May 2026):** 38,420 subs · 142 videos · 2.1% CTR · 4:12 AVD
- **Target:** 100K subs in 9 months
- **Sample video being produced:** *"How I Made $14K Trading Options in October 2025 (Full Strategy Breakdown)"*

## Architecture at a Glance

```
┌─ ONBOARDING (one-time per client) ─────────────────────────────┐
│  channel-auditor → brand-voice-specialist                       │
│  niche-intelligence-analyst → audience-persona-builder          │
│  niche-intelligence-analyst → competitor-analyst                │
│       └─→ chief-strategy-officer → ceo (gate)                   │
└─────────────────────────────────────────────────────────────────┘
                 │
                 ▼
┌─ PRODUCTION (per video, strict linear) ────────────────────────┐
│  keyword-researcher → title-copywriter → description-writer    │
│   → tags-hashtag-specialist → chapter-architect                 │
│   → thumbnail-strategist → quality-controller (APPROVE|RETURN) │
└─────────────────────────────────────────────────────────────────┘
                 │  APPROVED → publish
                 ▼
┌─ GROWTH (post-publish, parallel) ──────────────────────────────┐
│  community-engagement-strategist                                │
│  cross-platform-repurposing-agent                               │
│  playlist-architect                                             │
└─────────────────────────────────────────────────────────────────┘
                 │
                 ▼
┌─ MONITORING (weekly) ───────────────────────────────────────────┐
│  performance-analyst → chief-strategy-officer                   │
│       └─→ client-reporting-agent → ceo                          │
└─────────────────────────────────────────────────────────────────┘
```

Implementation runs on **LangGraph.js** with a Postgres + pgvector persistence layer. See [`product/08-orchestration-architecture.md`](08-orchestration-architecture.md).

## Deliverable Map

| File | Contents |
|---|---|
| `product/00-overview.md` | This file |
| `product/01-agent-discovery.md` | All 19 agents, dependency graph, execution phases |
| `product/02-agent-execution.md` | Sequential simulation: prompts → raw output → JSON for every agent |
| `product/03-unified-data-model.md` | Canonical `json_system_state` shape + entity model |
| `product/04-sql-schema.md` | Postgres schema + agent→table mapping |
| `product/05-ui-mapping.md` | Data field → UI component bindings (no generic descriptions) |
| `product/06-screens.md` | All 6 screens × 2 design variations, premium chart spec |
| `product/07-ux-flow.md` | End-to-end user journey |
| `product/08-prd.md` | Problem, solution, features, NFRs, success metrics |
| `product/features/*.md` | Per-feature deep dives with market gap analysis |
| `product/09-okrs.md` | Q3–Q4 2026 OKRs |
| `product/10-roadmap.md` | MVP → V1 → V2 → Scale |
| `product/11-business-model.md` | Pricing, revenue streams, unit economics |
| `product/12-competitive-analysis.md` | TubeBuddy/VidIQ/Spotter/1of10 gap analysis |
| `product/13-orchestration-architecture.md` | LangGraph topology, memory, failure handling |
| `product/research-competitive.md` | Web-researched competitive context |
| `product/research-orchestration.md` | Web-researched orchestration patterns |
| `data/agents/*.json` | 19 structured agent outputs (worked example) |
| `data/unified-system-state.json` | Aggregated canonical state |
| `data/schema.sql` | DDL |
| `app/` | Next.js 14 + Tailwind + Tremor + Recharts + Lucide — 12 screens |

## Design System

Two visual variations are delivered for every screen:

- **Variation A — Material You** (`designs/material.md`): light surfaces, purple seed (#6750A4), generous radii (24–48px), pill buttons, organic blur shapes, 300ms cubic-bezier(0.2,0,0,1) motion.
- **Variation B — Web3 Bitcoin DeFi** (`designs/web3.md`): true void (#030304) background, Bitcoin orange (#F7931A) + digital gold (#FFD600) accents, monospace data displays, 1px hairline borders, colored orange/gold glow shadows, grid-pattern backgrounds.

Both variations are real React routes in the Next.js app, switchable via a top-bar theme toggle.
