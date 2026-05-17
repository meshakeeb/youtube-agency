# Unified Data Model

> Every agent's structured output funnels into a single canonical document — [`data/unified-system-state.json`](../data/unified-system-state.json). This file specifies its shape, the entity model, and the rules that govern merging.

## Top-level shape

```json
{
  "client": {
    "id": "uuid",
    "name": "AlphaTraderTV",
    "niche": "trading-education",
    "tier": "pro",
    "baseline": { "ctr": 0.021, "avd_seconds": 252, "subs": 38420, "view_velocity_30d": 1820 },
    "target": { "subs": 100000, "deadline": "2027-02-17" }
  },
  "entities": {
    "channel": { ... },
    "videos": [ ... ],
    "playlists": [ ... ],
    "competitors": [ ... ],
    "personas": [ ... ],
    "niche_profile": { ... },
    "brand_voice_profile": { ... }
  },
  "metrics": {
    "current": { "ctr", "avd_seconds", "subs", "view_velocity_30d", "watch_time_h", "qc_pass_rate" },
    "trend_7d": [ { "date", "ctr", "avd", "subs", "views" } ],
    "trend_30d": [ ... ],
    "trend_90d": [ ... ]
  },
  "lists": {
    "keywords": [ ... ],
    "tags": [ ... ],
    "hashtags": [ ... ],
    "competitor_keywords": [ ... ],
    "playlists": [ ... ],
    "videos": [ ... ],
    "agent_runs": [ ... ]
  },
  "insights": [ { "id", "type", "severity", "title", "body", "evidence_video_ids[]", "created_at" } ],
  "recommendations": [ { "id", "priority", "category", "title", "expected_lift", "action_url", "owner_agent" } ],
  "pipeline_state": {
    "current_phase": "production",
    "blocking_agents": [],
    "gate_decisions": [ { "agent", "decision", "at" } ],
    "active_thread_id": "thread_alphatradertv_video_142"
  },
  "agent_runs": [ { "agent", "status", "started_at", "ended_at", "duration_ms", "tokens", "cost_usd" } ]
}
```

## Entity Model

```
clients ─┬─ channels (1:N)
         └─ brand_voice_profiles (1:N — versioned)
         └─ niche_profiles (1:1 reference)
         └─ audience_personas (1:N)
         └─ competitor_reports (1:1, refreshes quarterly)

channels ─┬─ videos (1:N)
          ├─ playlists (1:N)
          ├─ channel_audits (1:N — versioned)
          └─ channel_architecture_plans (1:N — versioned)

videos ─┬─ keyword_briefs (1:1)
        ├─ title_sets (1:1)
        ├─ descriptions (1:1)
        ├─ tag_sets (1:1)
        ├─ chapter_sets (1:1)
        ├─ thumbnail_briefs (1:1)
        ├─ qc_reviews (1:N — one per attempt)
        ├─ engagement_packages (1:1, post-publish)
        ├─ repurposing_packages (1:1, post-publish)
        ├─ playlist_assignments (N:N to playlists)
        └─ performance_snapshots (1:N — weekly)

agent_runs ── pipeline_runs (1:N) ── clients (M:1)

reports ── clients (M:1)  (weekly_pulse + monthly_deep_dive)
```

## How agent outputs map to entities

| Agent | Writes to | Reads from |
|---|---|---|
| `channel-auditor` | `channel_audits`, `metrics.current.baseline_*` | `channels` |
| `brand-voice-specialist` | `brand_voice_profiles` (new version) | `channels.top_videos` |
| `niche-intelligence-analyst` | `niche_profiles` | (none — fresh research) |
| `audience-persona-builder` | `audience_personas` | `niche_profiles` |
| `competitor-analyst` | `competitor_reports`, `lists.competitor_keywords` | `niche_profiles` |
| `keyword-researcher` | `keyword_briefs` | `niche_profiles`, `competitor_reports` |
| `title-copywriter` | `title_sets` | `keyword_briefs`, `brand_voice_profiles`, `audience_personas` |
| `description-writer` | `descriptions` | `keyword_briefs`, `title_sets`, `brand_voice_profiles` |
| `tags-hashtag-specialist` | `tag_sets` | `keyword_briefs`, `descriptions` |
| `chapter-architect` | `chapter_sets` | `keyword_briefs`, `videos.summary` |
| `thumbnail-strategist` | `thumbnail_briefs` | full production package, `audience_personas` |
| `quality-controller` | `qc_reviews`, `pipeline_state.gate_decisions` | full production package |
| `community-engagement-strategist` | `engagement_packages` | `videos`, `brand_voice_profiles` |
| `cross-platform-repurposing-agent` | `repurposing_packages` | `videos`, `brand_voice_profiles` |
| `playlist-architect` | `channel_architecture_plans`, `playlist_assignments` | `videos`, `playlists` |
| `performance-analyst` | `performance_snapshots`, `insights[]` (flagged) | youtube_analytics, `channel_audits.baseline` |
| `client-reporting-agent` | `reports` (weekly + monthly) | all performance + growth + qc tables |
| `chief-strategy-officer` | `recommendations`, `pipeline_state.gate_decisions` | all upstream |
| `ceo` | `recommendations` (quarterly), gate decisions on onboarding | reports, performance |

## Merging Rules (state reducers)

The orchestrator (LangGraph) declares per-field reducers; the same rules govern the canonical document:

| Field family | Reducer | Reason |
|---|---|---|
| `keyword_brief`, `title_set`, `description`, etc. | last-write-wins | Production is linear, one writer per field |
| `qc_history`, `agent_runs`, `insights` | append | Multiple events per video |
| `growth_outputs`, `repurposing_packages` | append | Parallel agents in Phase 2 |
| `retry_counts` | merge object | Multiple keys, last-value per key |
| `brand_voice_profile` | version-bump | Profile updates create new versions, never overwrite |
| `niche_profile` | version-bump (90-day cadence) | Niche shifts captured in history |
| `metrics.current.*` | last-write-wins (per-key) | Latest cron run owns |
| `metrics.trend_*[]` | append | Time-series, never overwritten |

## Insights and Recommendations — derivation rules

**Insights** are auto-generated by `performance-analyst` and `chief-strategy-officer`:

- `low_ctr` — fired when video CTR < 0.6 × niche-median for 7 days. Evidence: video IDs.
- `avd_drop` — fired when 7-day AVD < 90-day rolling average − 30s.
- `topic_decay` — fired when a topic cluster's view-velocity falls 40% over 4 videos.
- `competitor_overtake` — fired when a tracked competitor's video on the same keyword crosses 2× our views in 14 days.
- `voice_drift` — fired when QC voice-match score trends downward over 5 videos.

**Recommendations** are auto-generated by `chief-strategy-officer`:

- Pull from each open insight; map to a concrete action that the next Production run should adopt.
- Priority is `(severity × business_impact) / effort`. Top 8 surface on the Dashboard action panel.
- Every recommendation has an `owner_agent` (the agent that will be biased by the recommendation when it next runs).

## How the Document Is Built

```
1. Pipeline run completes (Phase 0 / 1 / 2 / monitoring cron).
2. Each agent's structured_output is written to its dedicated table.
3. The `assembleSystemState(clientId)` service (Bun + Postgres) joins:
   - clients table
   - latest entity-per-type
   - latest 7d/30d/90d performance windows
   - open insights + recommendations
   - last 50 agent runs
4. The assembled JSON is cached in Redis (key: client:{id}:state, TTL 60s).
5. The Dashboard + all screens read from this cached JSON via a single
   GET /api/v1/clients/{id}/state endpoint.
6. Mutations (e.g., dismissing an insight) write to the source table and
   invalidate the cache key.
```

## Versioning Strategy

The unified document is versioned with `schema_version: "1.0"` at the root. Breaking changes bump the major; additive changes bump the minor. The dashboard reads `schema_version` and falls back to a compatibility shim if needed.
