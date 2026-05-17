# UI Mapping — Data Fields → Components

> Every UI element binds to a specific field in [`data/unified-system-state.json`](../data/unified-system-state.json). No generic placeholders. This file is the contract between data layer and design layer.

## Mapping Rules

| Data shape | UI primitive | When to use |
|---|---|---|
| Scalar metric with delta | **Tremor `Metric` + `BadgeDelta`** | KPI cards on Dashboard, Channel Insights |
| Scalar metric (0–100 score) | **Tremor `CategoryBar` or radial gauge** | SEO health, QC quality score |
| Time-series array (≥7 points) | **Recharts `<AreaChart>` or `<LineChart>`** | CTR trend, AVD trend, sub velocity |
| Ranked entity list | **Tremor `Table` w/ rank column + sparklines** | Top videos, top keywords, competitor leaderboard |
| Categorical breakdown (≤6 segments) | **Recharts `<DonutChart>` or `<RadialBar>`** | Traffic source mix, QC score breakdown |
| Categorical breakdown (>6) | **Recharts `<Treemap>`** | Keyword universe, tag cloud |
| Multi-dimensional comparison (3–6 axes) | **Recharts `<RadarChart>`** | Keyword scoring, brand-voice fit, competitor strategy comparison |
| Funnel-stage data | **Recharts `<FunnelChart>` or `<BarChart>` horizontal** | Pipeline phase progression, onboarding completion |
| Two-axis composite (count + score) | **Recharts `<ComposedChart>`** | Video performance vs. CTR over time |
| Network / dependency | **Custom SVG via D3-force OR ReactFlow** | Agent dependency graph, playlist architecture |
| Heatmap (calendar) | **Recharts `<ScatterChart>` w/ shape OR custom grid** | Upload cadence vs. performance heatmap |
| Sparkline (≤12 points) | **Tremor `SparkAreaChart`** | Inline in tables, KPI cards |
| Single status | **Lucide icon + colored chip** | QC APPROVED/RETURNED, pipeline phase |
| List of revision notes | **Stacked text cards with severity icon** | QC return panel |
| Action item | **Card with one-click CTA** | Recommendations on Dashboard |
| Code/JSON output | **`<pre>` block w/ syntax highlighting** | Agent Activity Logs expanded view |
| Timeline of events | **Vertical timeline w/ Lucide icons** | Agent Activity Logs |

## Concrete Bindings (sampled — full per-screen bindings in [06-screens.md](06-screens.md))

### Dashboard
| UI element | Field |
|---|---|
| "Subscribers" KPI value | `metrics.current.subs` |
| "Subscribers" delta | `metrics.current.subs − metrics.trend_30d[0].subs` |
| "Subscribers" sparkline | `metrics.trend_30d[].subs` |
| "CTR" KPI value | `metrics.current.ctr * 100` formatted as % |
| "AVD" KPI value | `formatDuration(metrics.current.avd_seconds)` |
| "QC Pass Rate" gauge | `metrics.current.qc_pass_rate` |
| Insights panel cards | `insights[].{title, body, severity, evidence_video_ids}` |
| Recommendations action panel | `recommendations[].{title, expected_lift, action_url, owner_agent}` |
| "Today's Engagement Queue" | `lists.videos[].engagement_package` filtered to `published_today` |
| Pipeline state ribbon | `pipeline_state.{current_phase, blocking_agents, active_thread_id}` |

### Channel Insights
| UI element | Field |
|---|---|
| SEO Health gauge | `entities.channel.audit.health_score` |
| Baseline vs current comparison | `entities.channel.audit.baseline_metrics` vs `metrics.current` |
| Quick wins list | `entities.channel.audit.quick_wins[]` |
| Long-term issues list | `entities.channel.audit.long_term_issues[]` |
| CTR trend 90d area chart | `metrics.trend_90d[].{date, ctr}` |
| AVD trend 90d area chart | `metrics.trend_90d[].{date, avd}` |
| Subscriber velocity composed chart | `metrics.trend_90d[].{date, subs, views}` |
| Top 5 videos table | `lists.videos[]` sorted by view_velocity desc, top 5 |

### Keyword Intelligence
| UI element | Field |
|---|---|
| Keyword table rows | `lists.keywords[].{keyword, volume, difficulty, opportunity_score, intent, rank}` |
| Keyword universe treemap | `lists.keywords[]` mapped to rectangles sized by `volume`, colored by `opportunity_score` |
| Keyword scoring radar (selected) | `lists.keywords[selected].{volume_norm, difficulty_norm, intent_match, brand_fit, seasonality, ctr_potential}` |
| Filter chips | derived from `lists.keywords[].intent` distinct values |
| Search bar | filters `lists.keywords[]` client-side |
| "Add to calendar" CTA | mutation to `videos` table with `topic = keyword` |

### Video Optimization
| UI element | Field |
|---|---|
| Title card — primary | `entities.video.title_set.primary_title` |
| Title card — alternatives | `entities.video.title_set.alternatives[]` |
| Title card — CTR estimate | `entities.video.title_set.ctr_estimate` |
| Description card body | `entities.video.description.description_full` |
| Description card hook meter | `entities.video.description.hook_strength_score` |
| Tag chip cloud | `entities.video.tag_set.tags[]` |
| Tag character count gauge | `entities.video.tag_set.char_count_total` / 500 |
| Chapters timeline | `entities.video.chapter_set.chapters[].{timestamp, title, keyword_present}` |
| Thumbnail brief preview | `entities.video.thumbnail_brief.{layout, text_overlay, color_palette, facial_expression, mobile_check_notes}` |
| Thumbnail palette swatches | `entities.video.thumbnail_brief.color_palette[].{hex, label}` |
| QC score gauge | `entities.video.qc_review.quality_score` |
| QC breakdown bars | `entities.video.qc_review.breakdown.{keyword, brand_voice, structure, ctr_potential}` |
| QC decision banner | `entities.video.qc_review.decision` |
| Revision notes list (if RETURNED) | `entities.video.qc_review.revision_notes[]` |
| Pipeline progression stepper | `agent_runs[].{agent, status, started_at, ended_at}` filtered to current video |

### Competitor Analysis
| UI element | Field |
|---|---|
| Leaderboard table | `entities.competitors[].{name, subs, niche_share, weekly_views, last_video_at}` |
| Niche-share treemap | `entities.competitors[]` sized by `niche_share` |
| Keyword gap table | `lists.competitor_keywords[].{keyword, volume, difficulty, gap_score, top_ranking_competitor}` |
| Strategy comparison radar | per-competitor `{upload_cadence, avg_video_length, thumbnail_style_score, description_depth, community_engagement}` |
| Per-video competitive brief | `entities.video.competitor_brief.{ranking_videos[5], differentiation_angle}` |

### Agent Activity Logs
| UI element | Field |
|---|---|
| Timeline cards | `agent_runs[]` sorted desc by `started_at` |
| Timeline card status icon | `agent_runs[].status` (running/completed/failed/returned) |
| Timeline card duration | `agent_runs[].duration_ms` |
| Timeline card tokens + cost | `agent_runs[].{tokens, cost_usd}` |
| Expanded view raw output | `agent_runs[].raw_output` |
| Expanded view structured JSON | `agent_runs[].structured_output` |
| Filter chips | derived from distinct `agent_runs[].team` and `.phase` |
| Replay button | mutation: new pipeline_run with modified input |

## State Contracts the UI Relies On

- The unified state endpoint always returns a *complete* document, never partial. UI never has to reconcile missing fields — if data isn't ready, the field is `null` and the UI shows the empty/loading state.
- Numeric fields are always typed (no string-encoded numbers). Dates are ISO 8601 strings.
- Currency is always `USD` and represented as decimal (not cents).
- Boolean status fields use lowercase string enums (`"approved"`, `"returned"`, `"running"`, etc.).

## Accessibility Contract

- All chart components require an alt-text summary derived from the structured data.
- All KPI cards must be focusable and announce value + delta + label.
- Color is never the sole signal — every color-coded element pairs with a Lucide icon and a text label.
