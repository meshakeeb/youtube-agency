# Feature Deep-Dives

> Consolidated per-feature spec. Each section has the same shape: market state · gap · design decisions · data model touchpoints · success metrics. Sources for "market state" come from [`product/research-competitive.md`](../research-competitive.md).

---

## 01 — Channel Audit

### Market state
TubeBuddy ships an SEO checklist on upload. vidIQ shows analytics-driven scores. Morningfame tutors. None produce a **structured audit report with versioning** that the rest of the system can consume.

### Gap
- No artifact reuse across video runs.
- No surfacing of "long-term issues" vs. "quick wins" distinction.
- No baseline-vs-current comparison after onboarding.

### Design decisions
- `channel-auditor` produces a versioned `channel_audits` row with `health_score (0–100)`, `baseline_metrics`, `quick_wins[]`, `long_term_issues[]`, `video_audit_sample[]`.
- Re-audit runs every 90 days or on creator request; old versions persist for trend visibility.
- "Quick wins" are constrained to ≤7-day implementation effort with clear ROI estimate.

### Data model
- Writes: `channel_audits` (versioned), `metrics.baseline_*`
- Read by: `chief-strategy-officer`, `performance-analyst` (for baseline diff)

### Success metrics
- 100% of new clients receive an audit within 8 minutes of onboarding kickoff.
- Average ≥3 quick-win recommendations marked "implemented" within 30 days.

---

## 02 — Brand Voice Engine

### Market state
**The widest moat candidate.** No competitor models brand voice as a durable artifact. vidIQ AI Coach passes channel context to the LLM per session; Spotter's brand-voice control lives in the prompt; nobody stores a structured Voice Profile.

### Gap
- Brand voice is the cheapest way to make AI output sound human and avoid YouTube 2026's inauthenticity penalties.
- No tool surfaces voice violations or lets a creator review/edit their profile.

### Design decisions
- `brand-voice-specialist` reads top 10 performing videos, descriptions, community posts.
- Output: `brand_voice_profiles` with `tone`, `vocabulary_prefer[]`, `vocabulary_avoid[]`, `sentence_patterns[]`, `do_examples[]`, `dont_examples[]`, `red_lines[]`.
- Voice profile gets a vector embedding stored in pgvector for semantic retrieval.
- **Mandatory input** to `title-copywriter`, `description-writer`, `thumbnail-strategist`, `community-engagement-strategist`, `cross-platform-repurposing-agent`. Production cannot fire if `voice_profile_id` is null.
- **QC red-line enforcement**: `quality-controller` fails any output that triggers a `red_lines[]` pattern match (regex + LLM judge).
- Creator-facing UI: dedicated Voice Profile editor with versioning. Every edit is human-approved.

### Data model
- Writes: `brand_voice_profiles` (versioned with `voice_embedding` vector(1536))
- Read by: every Production + Growth agent
- Indexed: HNSW on voice_embedding

### Success metrics
- QC voice-match score median ≥4.2/5 across 100 production runs.
- Zero red-line escapes (each escape = P0).
- Creator-rated "sounds like me" survey response ≥85% positive at 30-day retention check-in.

---

## 03 — Niche Intelligence

### Market state
vidIQ AI Coach is "channel-aware." Nobody is "niche-aware" in a structured way. Trading-edu creators in particular need encoded knowledge of compliance language, regulatory norms, earnings season, Fed-decision weeks, tax season.

### Gap
- Generic SEO tools can't differentiate "iron condor strategy" (legitimate education) from "guaranteed returns" (compliance red flag).
- Seasonal timing intelligence (publish about taxes in Feb–Apr) is unencoded everywhere.

### Design decisions
- `niche-intelligence-analyst` ships per-niche profile: top-10 channels, vocabulary, trending angles, seasonal patterns, gap observations.
- Profiles are **shared across clients in the same niche** (one profile / 84 niches at maturity). Refreshes quarterly.
- The Niche Profile becomes the canonical reference for `keyword-researcher`, `competitor-analyst`, and (indirectly via persona) the Production team.

### Data model
- Writes: `niche_profiles` (shared, slug-keyed)
- Read by: `keyword-researcher`, `competitor-analyst`, `audience-persona-builder`
- One `niche_profiles.id` → many `clients`

### Success metrics
- 12 seeded niche profiles by end of Q4 2026.
- Median time-to-first-Production-video for a new niche client ≤14 min (vs. ~21 min cold-start without seeded profile).

---

## 04 — Keyword Intelligence

### Market state
TubeBuddy and vidIQ ship keyword tools; vidIQ scores keywords with their own model; 1of10 uses outlier-pattern-search; Spotter offers idea search. All present *single-axis scores* (a 0–100 number).

### Gap
- Multi-dimensional keyword scoring (volume × difficulty × intent × brand fit × seasonality × CTR potential) is not surfaced.
- No keyword-universe treemap visualization in any competitor.

### Design decisions
- `keyword-researcher` returns: `primary_keyword`, `long_tail[5–8]`, `opportunity_score`, `placement_notes`.
- UI exposes 6-axis radar per selected keyword (the same axes used internally for opportunity scoring).
- Treemap visualizes the keyword universe sized by volume, colored by opportunity score — a positioning artifact in marketing demos.

### Data model
- Writes: `keyword_briefs`, `keywords` (per-brief long-tail rows)
- Read by: `title-copywriter`, `description-writer`, `tags-hashtag-specialist`, `chapter-architect`

### Success metrics
- ≥70% of selected keywords yield videos in the top 30 search results within 30 days.
- Median radar-score correlation with realized 7-day CTR ≥0.55.

---

## 05 — Competitor Intelligence

### Market state
1of10's "outlier search" is closest. vidIQ tracks competitors. Tubular Labs has the deepest database but priced for enterprise.

### Gap
- No tool surfaces per-niche keyword gaps as a structured table with gap scores.
- No multi-series strategy radar comparing your channel against competitors on 5 axes.

### Design decisions
- `competitor-analyst` runs two modes:
  - **Onboarding deep dive**: 10 competitors + 20 keyword gaps + multi-dimensional strategy comparison.
  - **Per-video brief**: top 5 ranking videos for the target keyword + differentiation angle.
- Differentiation angle is a structured `{angle, evidence, why_this_works_for_brand_voice}` triple.

### Data model
- Writes: `competitor_reports`, `competitors` (denorm), `competitor_gaps`
- Read by: `keyword-researcher` (per-video brief), Title/Description (differentiation angle)

### Success metrics
- 100% of new clients receive a competitor report within 12 min of onboarding.
- ≥3 keyword gaps acted upon per client per quarter.

---

## 06 — Video Optimization Pipeline (the Production heart)

### Market state
Taja automates metadata from a transcript. 1of10 generates titles and thumbnails from prompts. Spotter handles concept-stage. Nobody runs the **full sequential pipeline with QC**.

### Gap
- Discrete tools don't pass state between stages — keyword choice doesn't propagate into chapters, descriptions don't reference titles' rationale, etc.
- No QC gate.

### Design decisions
- Strict linear DAG: keyword → title → description → tags → chapters → thumbnail → QC.
- Each agent's output is structured JSON consumed by the next.
- Real-time card-by-card reveal on the Video Optimization screen.
- One-click retry on QC return, scoped to the failing agent.

### Data model
- Writes: per-step tables listed in [04-sql-schema.md](../04-sql-schema.md).
- Read by: `quality-controller`, downstream Growth agents.

### Success metrics
- Pipeline p95 wall-clock ≤5 min.
- QC first-pass approval rate ≥80%.

---

## 07 — Thumbnail Strategist

### Market state
1of10 generates thumbnail images. TubeBuddy A/B tests thumbnails. Spotter offers thumbnail ideation. Nobody ships a **structured brief** (palette + composition + overlay + facial expression + mobile check).

### Gap
- A thumbnail image without a brief becomes a recurring failure point — creators ask "why this thumbnail?" and the AI can't answer.
- No mobile-readability validation.

### Design decisions
- V1: ship the **brief**, not the image. Creator/editor takes the brief into Figma/Canva.
- V2: optional image generation via Flux + GPT-Image-1 using the brief as prompt.
- Brief includes: `layout`, `text_overlay` (≤5 words), `color_palette[3]` w/ hex, `facial_expression`, `mobile_check_notes`, optional `ab_variant`.

### Data model
- Writes: `thumbnail_briefs`
- Read by: `quality-controller`, `community-engagement-strategist`

### Success metrics
- Median CTR uplift from baseline thumbnail style ≥25% after first 5 briefs.

---

## 08 — Quality Controller (the gate)

### Market state
No competitor ships an adversarial QC pass. Taja shows an SEO score but doesn't *reject* output. vidIQ flags issues but doesn't block publish.

### Gap
- Marginal-quality content escapes by default. Creators see their own work as good.
- No accountability for "voice violations" or "structural issues" pre-publish.

### Design decisions
- `quality-controller` scores 0–100 across 4 dimensions: Keyword, Brand Voice, Structure, CTR Potential.
- Score ≥80 = APPROVED; <80 = RETURNED with structured `revision_notes[]`.
- On RETURNED, the orchestrator routes back to the specific failing agent with the revision note prepended to its prompt.
- Max 3 retries per agent per video; on 3rd failure escalate to `chief-strategy-officer`.
- QC outcomes are the primary input to the LangSmith online eval suite.

### Data model
- Writes: `qc_reviews` (one row per attempt)
- Read by: orchestrator (gate routing), `client-reporting-agent` (approval rate metric)

### Success metrics
- First-pass approval rate ≥80%.
- Median time-to-resolution on RETURNED videos ≤90 seconds (1 retry).
- Zero red-line escapes (P0).

---

## 09 — Growth Fan-Out (Engagement + Repurposing + Playlist)

### Market state
Taja and Hypefury repurpose content. TubeBuddy generates community posts. Buffer schedules. Nobody runs all three in parallel from a single published-video event.

### Gap
- Manual orchestration between repurposing and playlist placement.
- Engagement scripts that ignore brand voice (Hypefury especially).

### Design decisions
- Three parallel agents fire post-publish:
  - `community-engagement-strategist`: pinned comment + community post + 3 verbal in-video hooks.
  - `cross-platform-repurposing-agent`: 3 Shorts + Twitter thread + LinkedIn + Instagram + Telegram.
  - `playlist-architect`: places video in target playlists, recommends end-screen cards.
- Outputs surface on Dashboard "Today's Engagement Queue" with one-click copy + Buffer/Hypefury/Telegram integrations.

### Data model
- Writes: `engagement_packages`, `repurposing_packages`, `channel_architecture` (per-video rows)
- Read by: Dashboard, `client-reporting-agent`

### Success metrics
- 100% of published videos receive all 3 outputs within 90 seconds of mark-as-published.
- Median repurposing-to-publish lag ≤4 hours.

---

## 10 — Performance Monitoring + Reporting

### Market state
vidIQ ships analytics dashboards. Morningfame ships walkthroughs. Spotter tracks ideation success. Nobody runs **automated weekly cron with flagged underperformers + auto-generated client reports**.

### Gap
- Discovering an underperformer requires manual dashboard inspection.
- Client reports are still manually written by agency operators.

### Design decisions
- `performance-analyst` weekly cron: detect CTR drop >0.5pp, AVD drop >30s, view-velocity drop >40% over 28d.
- Auto-flag → push to Dashboard sidebar; auto-route to `chief-strategy-officer` for strategy adjustment.
- `client-reporting-agent` auto-generates:
  - **Weekly Pulse**: 1-page PDF (traffic light + top 3 numbers) → email + dashboard link.
  - **Monthly Deep-Dive**: multi-page PDF (metrics vs baseline + top 3 wins + top 3 concerns + next-month preview) → first Monday of month.

### Data model
- Writes: `performance_snapshots`, `recommendations` (from CSO), `reports`
- Read by: Dashboard, Channel Insights, external email recipient

### Success metrics
- 100% of active clients receive Weekly Pulse within 10 min of Monday 09:00 cron.
- Underperformer flag → strategy adjustment loop closes ≤7 days p50.
- Client read-rate on Weekly Pulse ≥75% within 48h of send.
