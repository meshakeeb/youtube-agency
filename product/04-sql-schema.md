# SQL Schema Overview

> Full DDL: [`data/schema.sql`](../data/schema.sql) (328 lines, 21 tables, Postgres 15+ with pgvector). This file is the conceptual overview + the agent→table mapping.

## Database Architecture

- **Engine:** Postgres 15 (Supabase or RDS).
- **Extensions:** `pgvector` (semantic search on voice profiles, hooks, thumbnails), `uuid-ossp` (PK generation), `pg_trgm` (fuzzy text search on titles/keywords).
- **Row-level security:** all tenant-scoped tables enforce `tenant_id = current_setting('app.tenant_id')::uuid`. Connection pooler injects per-request.
- **JSONB columns** for flexibility on agent outputs that don't yet warrant their own schema (e.g., `agent_outputs.payload`).
- **Indexes:** btree on every FK, GIN on JSONB payload fields used in WHERE, HNSW on vector columns.
- **Point-in-time recovery:** 30 days hot retention.

## Table Inventory (21 tables)

### Tenant + identity
1. `clients` — tenant root. Holds creator/agency identity, tier, billing state.
2. `channels` — YouTube channel(s) owned by a client (one-to-many for agency tier).

### Onboarding artifacts (versioned, refreshed every ~90 days)
3. `channel_audits` — `channel-auditor` outputs. Versioned per audit run.
4. `brand_voice_profiles` — `brand-voice-specialist` outputs. Versioned per extraction.
5. `niche_profiles` — `niche-intelligence-analyst` outputs. Shared across clients in same niche.
6. `personas` — `audience-persona-builder` outputs. One per client.
7. `competitor_reports` — `competitor-analyst` onboarding output. Refreshes quarterly.
8. `competitors` — competitor channels list (denormalized from competitor_reports for fast leaderboard reads).
9. `competitor_gaps` — keyword-gap rows from competitor analysis.

### Per-video artifacts (Production pipeline)
10. `videos` — one row per video draft (topic, brief, summary, status).
11. `keyword_briefs` — `keyword-researcher` outputs.
12. `keywords` — long-tail keyword candidates linked to a brief.
13. `title_sets` — `title-copywriter` outputs (primary + alternatives + CTR estimate).
14. `descriptions` — `description-writer` outputs.
15. `tag_sets` — `tags-hashtag-specialist` outputs (tags JSONB + hashtags JSONB).
16. `chapter_sets` — `chapter-architect` outputs (chapters JSONB).
17. `thumbnail_briefs` — `thumbnail-strategist` outputs.
18. `qc_reviews` — `quality-controller` outputs. One row per attempt (could be multiple per video on returned/retry).

### Post-publish artifacts (Growth pipeline)
19. `engagement_packages` — `community-engagement-strategist` outputs.
20. `repurposing_packages` — `cross-platform-repurposing-agent` outputs.
21. `channel_architecture` — `playlist-architect` outputs (channel architecture plan + per-video architecture notes).

### Monitoring + reports
22. `performance_snapshots` — `performance-analyst` weekly cron outputs.
23. `recommendations` — strategy adjustments from CSO loop.
24. `reports` — `client-reporting-agent` weekly + monthly PDFs (rendered + S3 URL + payload JSON).

### Observability + telemetry
25. `agent_runs` — every agent execution row. Tokens, cost, duration, status, langsmith_trace_url.
26. `agent_outputs` — raw + structured JSONB payloads keyed by agent_run_id (for replay).
27. `pipeline_runs` — top-level pipeline execution (groups N agent_runs into a single user-facing pipeline_run).

> Note: schema.sql counts 21 tables for the core domain; observability tables 25–27 are listed here for completeness (they live in a sibling `obs` schema and may be split off in V2).

## Agent → Table Mapping (matches the comment block at the end of `data/schema.sql`)

```
Onboarding & Intelligence
  channel-auditor              → channel_audits
  brand-voice-specialist       → brand_voice_profiles
  niche-intelligence-analyst   → niche_profiles
  audience-persona-builder     → personas
  competitor-analyst           → competitor_reports, competitors, competitor_gaps

Production
  keyword-researcher           → keyword_briefs, keywords
  title-copywriter             → title_sets
  description-writer           → descriptions
  tags-hashtag-specialist      → tag_sets
  chapter-architect            → chapter_sets
  thumbnail-strategist         → thumbnail_briefs
  quality-controller           → qc_reviews

Growth
  community-engagement-strategist → engagement_packages
  cross-platform-repurposing-agent → repurposing_packages
  playlist-architect           → channel_architecture (channel + per-video rows)

Operations
  performance-analyst          → performance_snapshots
  client-reporting-agent       → reports

Leadership
  chief-strategy-officer       → recommendations (+ writes to pipeline_runs.gate_decisions JSONB)
  ceo                          → recommendations (quarterly cadence), pipeline_runs (onboarding gate)

Observability (every agent)
  ALL                          → agent_runs (+ agent_outputs for raw + structured payloads)
```

## Key Relationships

- `clients` (1) ← `channels` (N) ← `videos` (N)
- Every per-video table FKs into `videos.id`.
- Every onboarding artifact FKs into `clients.id` and gets a `version_number` for the versioned tables.
- `agent_runs` FKs into `pipeline_runs` which FKs into `clients` — gives us per-tenant observability scoping for free.

## Indexing Strategy (highlights)

- `videos(channel_id, status, created_at desc)` — Dashboard "recent videos" query.
- `qc_reviews(video_id, attempt_number desc)` — get latest QC per video.
- `performance_snapshots(channel_id, snapshot_date desc)` — trend chart queries.
- `agent_runs(pipeline_run_id, execution_order)` — Agent Activity Logs timeline.
- HNSW index on `brand_voice_profiles.voice_embedding` and `videos.hook_embedding` for semantic retrieval.

## How the Unified State Document Maps Back

The `assembleSystemState(clientId)` service in [`product/03-unified-data-model.md`](03-unified-data-model.md) joins:

```sql
clients
LEFT JOIN channels                ON channels.client_id = clients.id
LEFT JOIN LATERAL ( SELECT * FROM channel_audits WHERE channel_id = channels.id ORDER BY created_at DESC LIMIT 1 ) audit ON true
LEFT JOIN LATERAL ( SELECT * FROM brand_voice_profiles WHERE client_id = clients.id ORDER BY version_number DESC LIMIT 1 ) voice ON true
LEFT JOIN niche_profiles          ON niche_profiles.id = clients.niche_profile_id
LEFT JOIN personas                ON personas.client_id = clients.id
LEFT JOIN videos                  ON videos.channel_id = channels.id
LEFT JOIN LATERAL ( SELECT * FROM qc_reviews WHERE video_id = videos.id ORDER BY attempt_number DESC LIMIT 1 ) qc ON true
LEFT JOIN performance_snapshots   ON performance_snapshots.channel_id = channels.id
LEFT JOIN recommendations         ON recommendations.client_id = clients.id AND recommendations.status = 'open'
```

The result is shaped into the canonical JSON in [`data/unified-system-state.json`](../data/unified-system-state.json) and cached in Redis at key `client:{id}:state` (TTL 60s).
