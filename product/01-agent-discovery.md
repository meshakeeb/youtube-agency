# Agent Discovery — The 19-Agent Workspace

> Every agent's purpose, IO contract, dependencies, and execution slot. This is the spec that the orchestration layer in [`product/13-orchestration-architecture.md`](13-orchestration-architecture.md) compiles into a LangGraph state graph.

## Why these 19 (not the default 6)

The prompt's default set (Channel Audit, Competitor Intel, Keyword Research, Content Strategy, Video Optimization, Analytics Synthesizer) is fine as a marketing taxonomy but **collapses six discrete production steps into one mythical "Video Optimization Agent."** In reality, title-writing, description-writing, tag-building, chapter-structuring, and thumbnail-brief writing each have different inputs, different gating constraints, and different failure modes. Mashing them together kills both quality and observability.

The workspace's 19 agents reflect that reality. They map cleanly onto the company's 5 teams (Intelligence, Onboarding, Production, Growth, Operations) and a Leadership layer (CSO, CEO). Each agent has:

- a **single responsibility**
- a **bounded prompt surface**
- a **strict JSON output schema** the next agent depends on
- an **observable execution slot** in the pipeline DAG

## Roster

### Leadership

| Agent | Role | Inputs | Outputs | Skill |
|---|---|---|---|---|
| `ceo` | Final approvals; cross-client visibility; quality-failure escalations. | Monthly performance reports, escalations from CSO/QC/Reporting. | Quarterly goals, onboarding decisions, escalation resolutions. | `company-strategy` |
| `chief-strategy-officer` | Manages Intelligence/Onboarding/Production/Growth; per-client strategy. | All Intelligence + Onboarding outputs, underperformance flags. | Approvals, strategy adjustments, escalations to CEO. | `content-strategy` |

### Intelligence Team

| Agent | Role | Inputs | Outputs | Skill |
|---|---|---|---|---|
| `niche-intelligence-analyst` | Maps the niche ecosystem — top channels, vocabulary, trends, seasons. | Client niche name. | Niche Intelligence Profile (top-10 channels, vocab, trending angles, seasonal patterns, gaps). | `niche-mapping` |
| `audience-persona-builder` | Builds the Audience Persona Card. | Niche Intelligence Profile. | Persona Card (demographics, knowledge level, intent, click triggers, language rules). | `audience-research` |
| `competitor-analyst` | Surfaces competitor weaknesses + keyword gaps; per-video differentiation briefs. | Niche profile; per-video: target keyword. | Competitor Gap Report (10 competitors + 20 keyword gaps); Per-Video Competitor Brief. | `competitor-research` |

### Onboarding Team

| Agent | Role | Inputs | Outputs | Skill |
|---|---|---|---|---|
| `channel-auditor` | Scores existing channel SEO health; baseline metrics; quick wins. | Channel access, last 20–50 videos. | Channel Audit Report (health 0–100, quick wins, long-term issues, baseline CTR/AVD/subs). | `channel-seo-audit`, `youtube-analytics-review` |
| `brand-voice-specialist` | Extracts brand voice from top performers. | Top 10 performing videos, descriptions, community posts. | Brand Voice Profile (tone, vocabulary, sentence patterns, DO/DON'T, red lines). | `brand-voice-extraction` |

### Production Team (strict linear)

| Order | Agent | Role | Inputs | Outputs | Skill |
|---|---|---|---|---|---|
| 1 | `keyword-researcher` | Identifies primary + long-tail keywords + search intent. | Video topic, niche profile, competitor brief. | Keyword Brief (primary, 5–8 long-tail, intent, opportunity score, placement notes). | `youtube-keyword-research` |
| 2 | `title-copywriter` | 3 title alternatives balancing CTR + keyword placement in first 50 chars. | Keyword Brief, Brand Voice, Persona Card. | Title Set (primary + 2 alternatives, rationale, CTR estimate). | `youtube-title-writing` |
| 3 | `description-writer` | 200–500 word SEO description, hook in first 150 chars. | Keyword Brief, Title Set, Brand Voice. | Full Description (hook + body + timestamps + links + boilerplate). | `youtube-description-writing` |
| 4 | `tags-hashtag-specialist` | 8–12 tags (≤500 chars) + 3–5 hashtags. | Keyword Brief, Description. | Tag Set + Hashtag Set. | `youtube-tag-strategy` |
| 5 | `chapter-architect` | 3+ chapters starting at 0:00, keyword-rich titles. | Video summary, Keyword Brief. | Chapter Set (timestamps + titles). | `youtube-chapter-structuring` |
| 6 | `thumbnail-strategist` | Layout, ≤5-word overlay, palette w/ hex, expression, mobile check, A/B variant. | Full Production package, Persona Card. | Thumbnail Brief. | `thumbnail-strategy` |

### Growth Team (parallel post-publish)

| Agent | Role | Inputs | Outputs | Skill |
|---|---|---|---|---|
| `community-engagement-strategist` | Pinned comment, community post, in-video verbal hooks. | Published video, Brand Voice. | Engagement Package. | `community-engagement-design` |
| `cross-platform-repurposing-agent` | 3× Shorts, Twitter thread, LinkedIn, Instagram, Telegram. | Published video, Brand Voice. | Repurposing Package. | `content-repurposing` |
| `playlist-architect` | Onboarding: channel architecture. Per-video: playlist + end screens. | Published videos + channel library. | Channel Architecture Plan + Per-Video Architecture Note. | `playlist-strategy` |

### Operations Team

| Agent | Role | Inputs | Outputs | Skill |
|---|---|---|---|---|
| `quality-controller` | Gating reviewer. Returns or approves the full Production package. | Complete Production Package. | QC Review (score 0–100, APPROVED / RETURNED + revision notes). | `seo-quality-review` |
| `performance-analyst` | Weekly analytics; flags underperformers. | YouTube Analytics, baseline metrics. | Weekly Performance Flag Report + data feed to Reporting. | `youtube-analytics-review` |
| `client-reporting-agent` | Weekly Pulse + Monthly Deep-Dive reports. | Performance data + Growth logs + QC approvals. | Weekly Pulse, Monthly Deep-Dive. | `client-reporting` |

## Execution Phases

```
PHASE 0 — Onboarding (one-time per client, ~8–14 minutes wall clock)
  channel-auditor          ─┐
  brand-voice-specialist    │  (auditor → voice)
  niche-intelligence-analyst│  (parallel kickoff)
  audience-persona-builder  │  (niche → persona)
  competitor-analyst        │  (niche → competitor)
                             └→ chief-strategy-officer → ceo (approval gate)

PHASE 1 — Per-video Production (strict linear, ~3–5 minutes)
  keyword-researcher → title-copywriter → description-writer
   → tags-hashtag-specialist → chapter-architect
   → thumbnail-strategist → quality-controller  [GATE]

  If QC RETURNED, route back to the failing agent with revision notes (max 3 retries; on 3rd failure escalate to CSO).

PHASE 2 — Post-publish Growth (parallel, ~90 seconds wall clock)
  community-engagement-strategist  ║
  cross-platform-repurposing-agent ║  (fan-out, all 3 in parallel)
  playlist-architect               ║

PHASE 3 — Weekly Monitoring (scheduled, ~2 minutes per client)
  performance-analyst
   → chief-strategy-officer (underperformance routing)
   → client-reporting-agent
   → ceo (monthly only)
```

## Dependency Graph (DAG)

```
                              ┌──────────────────────────┐
                              │ niche-intelligence-analyst│
                              └──────────────┬───────────┘
                                              │
                ┌─────────────────────────────┼──────────────────────────┐
                ▼                             ▼                          ▼
      ┌──────────────────┐    ┌──────────────────────────┐    ┌────────────────────┐
      │ audience-persona │    │ competitor-analyst       │    │ chief-strategy-     │
      │ builder           │    │                          │    │ officer             │
      └──────────────────┘    └──────────────┬───────────┘    └────────────────────┘
                                              │
                              ┌──────────────────────────┐
                              │ channel-auditor → brand- │
                              │ voice-specialist          │
                              └──────────────┬───────────┘
                                              │
                              ┌──────────────▼───────────┐
                              │ keyword-researcher        │
                              └──────────────┬───────────┘
                                              │
                              ┌──────────────▼───────────┐
                              │ title-copywriter          │
                              └──────────────┬───────────┘
                                              │
                              ┌──────────────▼───────────┐
                              │ description-writer        │
                              └──────────────┬───────────┘
                                              │
                              ┌──────────────▼───────────┐
                              │ tags-hashtag-specialist   │
                              │ chapter-architect (║)     │
                              └──────────────┬───────────┘
                                              │
                              ┌──────────────▼───────────┐
                              │ thumbnail-strategist      │
                              └──────────────┬───────────┘
                                              │
                              ┌──────────────▼───────────┐
                              │ quality-controller [GATE] │
                              └──────────────┬───────────┘
                                              │ APPROVED
                          ┌──────────────────┼──────────────────┐
                          ▼                  ▼                  ▼
            ┌──────────────────┐  ┌──────────────────┐  ┌────────────────────┐
            │ community-       │  │ cross-platform-  │  │ playlist-architect │
            │ engagement       │  │ repurposing      │  │                    │
            └──────────────────┘  └──────────────────┘  └────────────────────┘
                          │                  │                  │
                          └──────────────────┼──────────────────┘
                                              ▼
                              ┌──────────────────────────┐
                              │ performance-analyst       │ ◄── weekly cron
                              └──────────────┬───────────┘
                                              │
                              ┌──────────────▼───────────┐
                              │ client-reporting-agent    │
                              └──────────────┬───────────┘
                                              │
                              ┌──────────────▼───────────┐
                              │ ceo (monthly reviews)     │
                              └──────────────────────────┘
```

## Quirks That Matter for the Product

1. **QC is the only agent that can reject.** Score ≥ 80 → APPROVED; below 80 → RETURNED with revision notes routed to the specific failing upstream agent. After 3 failed retries on the same agent, escalate to CSO.
2. **Intelligence outputs are standing references**, not regenerated per-video. The product caches `niche_profile_id`, `persona_id`, `voice_profile_id` on the client and reuses them for every Production run (refresh every 90 days or on client request).
3. **Production is strictly linear** — no parallelization within Phase 1. This is intentional: each agent's output feeds the next's input. Parallelism happens *across clients* and in Phase 2 (Growth).
4. **Competitor Analyst has two modes**: heavy onboarding gap analysis (one-time) and lightweight per-video competitive brief (on demand before each Keyword Researcher run).
5. **Playlist Architect is hybrid**: heavy architecture at onboarding, lightweight per-video routing afterward.
6. **Performance Analyst runs weekly cron** — not on publish. Flag latency 24–72h after publish.
7. **Brand Voice is a mandatory gate** — Title/Description/Thumbnail agents *cannot* fire if `voice_profile_id` is null.
