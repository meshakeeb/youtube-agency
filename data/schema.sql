-- Blackbird Agency — Data Layer Schema (Postgres 15+)
-- Generated 2026-05-17. All flexible payloads land in JSONB columns named *_payload.
-- Naming: snake_case tables, _id PK, timestamps with timezone, soft-delete via deleted_at.

BEGIN;

-- =====================================================================
-- CORE: CLIENT + CHANNEL + CONTENT ENTITIES
-- =====================================================================

CREATE TABLE clients (
  client_id        TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  owner_name       TEXT,
  niche            TEXT NOT NULL,
  baseline_payload JSONB NOT NULL,
  target_payload   JSONB NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at       TIMESTAMPTZ
);

CREATE TABLE channels (
  channel_id       TEXT PRIMARY KEY,
  client_id        TEXT NOT NULL REFERENCES clients(client_id),
  name             TEXT NOT NULL,
  language         TEXT NOT NULL DEFAULT 'en',
  country          TEXT NOT NULL DEFAULT 'US',
  subs             INTEGER NOT NULL DEFAULT 0,
  lifetime_videos  INTEGER NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE videos (
  video_id          TEXT PRIMARY KEY,
  channel_id        TEXT NOT NULL REFERENCES channels(channel_id),
  title             TEXT NOT NULL,
  duration_seconds  INTEGER,
  primary_keyword   TEXT,
  status            TEXT NOT NULL DEFAULT 'planned',
  published_at      TIMESTAMPTZ,
  ctr_96h           NUMERIC(5,2),
  views_96h         INTEGER,
  avd_seconds_96h   INTEGER,
  metadata_payload  JSONB,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE playlists (
  playlist_id        TEXT PRIMARY KEY,
  channel_id         TEXT NOT NULL REFERENCES channels(channel_id),
  title              TEXT NOT NULL,
  target_keyword     TEXT,
  target_video_count INTEGER NOT NULL DEFAULT 0,
  ordering_strategy  TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE playlist_videos (
  playlist_id  TEXT NOT NULL REFERENCES playlists(playlist_id) ON DELETE CASCADE,
  video_id     TEXT NOT NULL REFERENCES videos(video_id) ON DELETE CASCADE,
  position     INTEGER NOT NULL,
  PRIMARY KEY (playlist_id, video_id)
);

-- =====================================================================
-- INTELLIGENCE: COMPETITORS, KEYWORDS, PERSONAS, NICHE, BRAND VOICE
-- =====================================================================

CREATE TABLE competitors (
  competitor_id       TEXT PRIMARY KEY,
  client_id           TEXT NOT NULL REFERENCES clients(client_id),
  name                TEXT NOT NULL,
  channel_id_external TEXT,
  subs                INTEGER,
  avg_views_30d       INTEGER,
  ctr                 NUMERIC(5,2),
  avd_seconds         INTEGER,
  upload_freq_per_week NUMERIC(4,2),
  overlap_score       NUMERIC(4,2),
  metrics_payload     JSONB,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE competitor_gaps (
  gap_id            BIGSERIAL PRIMARY KEY,
  client_id         TEXT NOT NULL REFERENCES clients(client_id),
  keyword           TEXT NOT NULL,
  volume            INTEGER NOT NULL,
  difficulty        NUMERIC(4,1) NOT NULL,
  gap_score         NUMERIC(4,2) NOT NULL,
  intent            TEXT,
  surfaced_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE keywords (
  keyword_id      BIGSERIAL PRIMARY KEY,
  client_id       TEXT NOT NULL REFERENCES clients(client_id),
  keyword         TEXT NOT NULL,
  volume          INTEGER,
  difficulty      NUMERIC(4,1),
  tier            TEXT,
  intent          TEXT,
  video_id        TEXT REFERENCES videos(video_id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (client_id, keyword)
);

CREATE TABLE tags (
  tag_id       BIGSERIAL PRIMARY KEY,
  video_id     TEXT NOT NULL REFERENCES videos(video_id) ON DELETE CASCADE,
  tag          TEXT NOT NULL,
  position     INTEGER NOT NULL,
  char_count   INTEGER NOT NULL
);

CREATE TABLE hashtags (
  hashtag_id   BIGSERIAL PRIMARY KEY,
  video_id     TEXT NOT NULL REFERENCES videos(video_id) ON DELETE CASCADE,
  hashtag      TEXT NOT NULL,
  position     INTEGER NOT NULL
);

CREATE TABLE personas (
  persona_id        TEXT PRIMARY KEY,
  client_id         TEXT NOT NULL REFERENCES clients(client_id),
  name              TEXT NOT NULL,
  is_primary        BOOLEAN NOT NULL DEFAULT false,
  demographics_payload JSONB NOT NULL,
  knowledge_payload    JSONB NOT NULL,
  intent_payload       JSONB NOT NULL,
  language_rules_payload JSONB NOT NULL,
  platform_behavior_payload JSONB NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE niche_profiles (
  niche_profile_id    BIGSERIAL PRIMARY KEY,
  client_id           TEXT NOT NULL REFERENCES clients(client_id),
  niche               TEXT NOT NULL,
  top_channels_payload JSONB NOT NULL,
  vocabulary          TEXT[] NOT NULL,
  trending_angles_payload JSONB NOT NULL,
  seasonal_patterns_payload JSONB NOT NULL,
  gap_observations    TEXT[] NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE brand_voice_profiles (
  brand_voice_id          BIGSERIAL PRIMARY KEY,
  client_id               TEXT NOT NULL REFERENCES clients(client_id),
  tone                    TEXT NOT NULL,
  archetype               TEXT,
  vocabulary_prefer       TEXT[] NOT NULL,
  vocabulary_avoid        TEXT[] NOT NULL,
  sentence_patterns       TEXT[] NOT NULL,
  do_examples             TEXT[] NOT NULL,
  dont_examples           TEXT[] NOT NULL,
  red_lines               TEXT[] NOT NULL,
  voice_dimensions_payload JSONB,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- AGENT ORCHESTRATION
-- =====================================================================

CREATE TABLE agent_runs (
  run_id          BIGSERIAL PRIMARY KEY,
  client_id       TEXT NOT NULL REFERENCES clients(client_id),
  video_id        TEXT REFERENCES videos(video_id),
  agent           TEXT NOT NULL,
  team            TEXT NOT NULL,
  phase           TEXT NOT NULL,
  status          TEXT NOT NULL,
  started_at      TIMESTAMPTZ NOT NULL,
  ended_at        TIMESTAMPTZ,
  duration_ms     INTEGER,
  depends_on      TEXT[],
  prompt_text     TEXT,
  error_text      TEXT
);

CREATE TABLE agent_outputs (
  output_id          BIGSERIAL PRIMARY KEY,
  run_id             BIGINT NOT NULL REFERENCES agent_runs(run_id) ON DELETE CASCADE,
  agent              TEXT NOT NULL,
  raw_output         TEXT NOT NULL,
  structured_payload JSONB NOT NULL,
  downstream_consumers TEXT[] NOT NULL DEFAULT '{}',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX agent_outputs_payload_gin ON agent_outputs USING GIN (structured_payload);

CREATE TABLE qc_reviews (
  qc_id              BIGSERIAL PRIMARY KEY,
  video_id           TEXT NOT NULL REFERENCES videos(video_id) ON DELETE CASCADE,
  run_id             BIGINT REFERENCES agent_runs(run_id),
  quality_score      INTEGER NOT NULL,
  breakdown_payload  JSONB NOT NULL,
  decision           TEXT NOT NULL CHECK (decision IN ('APPROVED','RETURNED')),
  revision_notes     TEXT[] NOT NULL DEFAULT '{}',
  reviewed_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- PERFORMANCE + REPORTING
-- =====================================================================

CREATE TABLE performance_snapshots (
  snapshot_id           BIGSERIAL PRIMARY KEY,
  channel_id            TEXT NOT NULL REFERENCES channels(channel_id),
  video_id              TEXT REFERENCES videos(video_id),
  snapshot_at           TIMESTAMPTZ NOT NULL,
  ctr                   NUMERIC(5,2),
  avd_seconds           INTEGER,
  subs                  INTEGER,
  views                 INTEGER,
  watch_time_hours      NUMERIC(10,2),
  search_traffic_share_pct NUMERIC(5,2),
  suggested_traffic_share_pct NUMERIC(5,2),
  metrics_payload       JSONB
);

CREATE TABLE reports (
  report_id          BIGSERIAL PRIMARY KEY,
  client_id          TEXT NOT NULL REFERENCES clients(client_id),
  report_type        TEXT NOT NULL CHECK (report_type IN ('weekly_pulse','monthly_deep_dive','quarterly_review')),
  for_period_start   DATE NOT NULL,
  for_period_end     DATE NOT NULL,
  payload            JSONB NOT NULL,
  generated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE recommendations (
  recommendation_id BIGSERIAL PRIMARY KEY,
  client_id         TEXT NOT NULL REFERENCES clients(client_id),
  rank              INTEGER NOT NULL,
  action            TEXT NOT NULL,
  owner             TEXT NOT NULL,
  effort            TEXT NOT NULL,
  status            TEXT NOT NULL DEFAULT 'open',
  generated_by      TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at      TIMESTAMPTZ
);

-- =====================================================================
-- GROWTH PACKAGES
-- =====================================================================

CREATE TABLE engagement_packages (
  package_id           BIGSERIAL PRIMARY KEY,
  video_id             TEXT NOT NULL REFERENCES videos(video_id) ON DELETE CASCADE,
  pinned_comment       TEXT NOT NULL,
  community_post_payload JSONB NOT NULL,
  in_video_hooks_payload JSONB NOT NULL,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE repurposing_packages (
  package_id            BIGSERIAL PRIMARY KEY,
  video_id              TEXT NOT NULL REFERENCES videos(video_id) ON DELETE CASCADE,
  shorts_payload        JSONB NOT NULL,
  twitter_thread        TEXT,
  linkedin_post         TEXT,
  instagram_caption     TEXT,
  telegram_announcement TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE channel_architecture (
  arch_id              BIGSERIAL PRIMARY KEY,
  channel_id           TEXT NOT NULL REFERENCES channels(channel_id),
  playlists_payload    JSONB NOT NULL,
  end_screen_strategy  TEXT NOT NULL,
  per_video_notes_payload JSONB,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================================
-- INDEXES
-- =====================================================================

CREATE INDEX videos_channel_idx ON videos (channel_id);
CREATE INDEX videos_status_idx ON videos (status);
CREATE INDEX keywords_client_idx ON keywords (client_id);
CREATE INDEX competitors_client_idx ON competitors (client_id);
CREATE INDEX agent_runs_client_video_idx ON agent_runs (client_id, video_id);
CREATE INDEX agent_runs_agent_idx ON agent_runs (agent);
CREATE INDEX perf_snap_channel_at_idx ON performance_snapshots (channel_id, snapshot_at DESC);
CREATE INDEX perf_snap_video_at_idx ON performance_snapshots (video_id, snapshot_at DESC);
CREATE INDEX reports_client_period_idx ON reports (client_id, for_period_end DESC);
CREATE INDEX recommendations_client_rank_idx ON recommendations (client_id, rank);

COMMIT;

-- =====================================================================
-- AGENT → TABLE MAPPING
-- =====================================================================
-- Each row: agent name → tables it writes to. Read-only joins not listed.
--
-- channel-auditor                  → channels, videos, performance_snapshots (baseline),
--                                    agent_runs, agent_outputs
-- brand-voice-specialist           → brand_voice_profiles, agent_runs, agent_outputs
-- niche-intelligence-analyst       → niche_profiles, agent_runs, agent_outputs
-- audience-persona-builder         → personas, agent_runs, agent_outputs
-- competitor-analyst               → competitors, competitor_gaps, agent_runs, agent_outputs
-- chief-strategy-officer           → recommendations, agent_runs, agent_outputs (approvals payload)
-- ceo                              → agent_runs, agent_outputs (decision payload),
--                                    recommendations (quarterly goals)
-- keyword-researcher               → keywords, agent_runs, agent_outputs
-- title-copywriter                 → videos (title, metadata_payload), agent_runs, agent_outputs
-- description-writer               → videos (metadata_payload.description), agent_runs, agent_outputs
-- tags-hashtag-specialist          → tags, hashtags, agent_runs, agent_outputs
-- chapter-architect                → videos (metadata_payload.chapters), agent_runs, agent_outputs
-- thumbnail-strategist             → videos (metadata_payload.thumbnail), agent_runs, agent_outputs
-- quality-controller               → qc_reviews, agent_runs, agent_outputs
-- community-engagement-strategist  → engagement_packages, agent_runs, agent_outputs
-- cross-platform-repurposing-agent → repurposing_packages, agent_runs, agent_outputs
-- playlist-architect               → playlists, playlist_videos, channel_architecture,
--                                    agent_runs, agent_outputs
-- performance-analyst              → performance_snapshots, recommendations,
--                                    agent_runs, agent_outputs
-- client-reporting-agent           → reports, agent_runs, agent_outputs
