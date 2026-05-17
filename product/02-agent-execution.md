# Agent Execution — Sequential Simulation

> Worked example: trading-education channel **AlphaTraderTV** producing the video *"How I Made $14K With Iron Condors in October (Real P&L)"*. All 19 agents fired sequentially. Full per-agent prompt, raw output, structured output, downstream consumers, and execution telemetry live in [`data/agents/`](../data/agents/). This file is the index + walkthrough.

## How to Read This

Each agent's complete simulation lives in its own JSON file at `data/agents/{slug}.json` with this shape:

```json
{
  "agent": "keyword-researcher",
  "team": "production",
  "phase": "production",
  "execution_order": 8,
  "depends_on": ["niche-intelligence-analyst", "competitor-analyst"],
  "prompt": "...realistic prompt sent to this agent...",
  "raw_output": "...realistic natural-language output...",
  "structured_output": { ... domain-specific JSON ... },
  "downstream_consumers": ["title-copywriter", "..."],
  "executed_at": "2026-05-17T...",
  "duration_ms": 6840,
  "status": "completed"
}
```

The aggregated state with cross-agent merges lives in [`data/unified-system-state.json`](../data/unified-system-state.json).

## Pipeline Summary (this run)

| Order | Agent | Phase | Duration | Status | File |
|---:|---|---|---:|---|---|
| 1 | channel-auditor | onboarding | 8,421 ms | completed | [data/agents/channel-auditor.json](../data/agents/channel-auditor.json) |
| 2 | brand-voice-specialist | onboarding | 7,188 ms | completed | [brand-voice-specialist.json](../data/agents/brand-voice-specialist.json) |
| 3 | niche-intelligence-analyst | intelligence | 9,842 ms | completed | [niche-intelligence-analyst.json](../data/agents/niche-intelligence-analyst.json) |
| 4 | audience-persona-builder | intelligence | 8,932 ms | completed | [audience-persona-builder.json](../data/agents/audience-persona-builder.json) |
| 5 | competitor-analyst | intelligence | 11,240 ms | completed | [competitor-analyst.json](../data/agents/competitor-analyst.json) |
| 6 | chief-strategy-officer | leadership | 10,310 ms | completed | [chief-strategy-officer.json](../data/agents/chief-strategy-officer.json) |
| 7 | ceo | leadership | 4,210 ms | completed | [ceo.json](../data/agents/ceo.json) |
| 8 | keyword-researcher | production | 6,840 ms | completed | [keyword-researcher.json](../data/agents/keyword-researcher.json) |
| 9 | title-copywriter | production | 4,920 ms | completed | [title-copywriter.json](../data/agents/title-copywriter.json) |
| 10 | description-writer | production | 7,340 ms | completed | [description-writer.json](../data/agents/description-writer.json) |
| 11 | tags-hashtag-specialist | production | 3,940 ms | completed | [tags-hashtag-specialist.json](../data/agents/tags-hashtag-specialist.json) |
| 12 | chapter-architect | production | 5,210 ms | completed | [chapter-architect.json](../data/agents/chapter-architect.json) |
| 13 | thumbnail-strategist | production | 6,120 ms | completed | [thumbnail-strategist.json](../data/agents/thumbnail-strategist.json) |
| 14 | quality-controller | operations | 5,680 ms | **APPROVED (95)** | [quality-controller.json](../data/agents/quality-controller.json) |
| 15 | community-engagement-strategist | growth | 4,880 ms | completed | [community-engagement-strategist.json](../data/agents/community-engagement-strategist.json) |
| 16 | cross-platform-repurposing-agent | growth | 7,640 ms | completed | [cross-platform-repurposing-agent.json](../data/agents/cross-platform-repurposing-agent.json) |
| 17 | playlist-architect | growth | 6,420 ms | completed | [playlist-architect.json](../data/agents/playlist-architect.json) |
| 18 | performance-analyst | operations | 6,210 ms | completed | [performance-analyst.json](../data/agents/performance-analyst.json) |
| 19 | client-reporting-agent | operations | 5,480 ms | completed | [client-reporting-agent.json](../data/agents/client-reporting-agent.json) |

**Total wall-clock (sequential):** ~131 seconds for Phase 0 + Phase 1 + Phase 2 + Monitoring.
**Token cost (estimated):** ~$0.74 for the full pipeline run.

## Key Outputs

- **Primary keyword:** `iron condor strategy` (volume 14k, difficulty 0.42, opportunity 0.81)
- **Primary title:** *"How I Made $14K With Iron Condors in October (Real P&L)"* (Predicted CTR 6.1%)
- **QC Score:** 95/100 → APPROVED
- **Thumbnail brief:** Face + `$14,212` + `IRON CONDOR MONTH` overlay
- **Tags:** 10 tags (312 chars) led by primary keyword
- **Chapters:** 9 chapters across 19:00 video, primary keyword present in 3 chapter titles
- **Playlist:** added to "Monthly Options Income (Iron Condors)" + 5 other targeted playlists
- **CTR after 7 days:** 3.4% (vs. 2.1% baseline) — `performance-analyst` flagged this as positive outlier

## Dependency Integrity (verified)

- `keyword-researcher.primary_keyword` (`iron condor strategy`) appears verbatim in `title-copywriter.primary_title`, `description-writer.description_full` (first 150 chars), `tags-hashtag-specialist.tags[0]`, and 3 of `chapter-architect.chapters[].title`.
- `audience-persona-builder.persona.name` ("Marcus", 32, SWE, intermediate options trader) referenced in `title-copywriter.rationale`, `thumbnail-strategist.expression_direction`, and `community-engagement-strategist.in_video_hooks[0]`.
- `ceo.escalation_resolutions` mirror `chief-strategy-officer.escalations_to_ceo` 1:1.
- `quality-controller.decision == "APPROVED"` correctly unblocks downstream Growth agents (each has `depends_on: ["quality-controller"]`).

## What This Demonstrates

1. **Strict linear Production dependency** holds in practice — the keyword propagates cleanly through 5 downstream agents.
2. **QC gate at score 95** is the realistic outcome for a well-aligned brand-voice + niche-intelligence input. (We expect ~20% of runs to return; that flow is exercised in [features/08-quality-controller.md](features/08-quality-controller.md).)
3. **Growth fan-out runs after publish** — three Growth agents produce independent outputs against the same Brand Voice Profile.
4. **Performance feedback loop closes** — the `performance-analyst` output already references the baseline metrics established by `channel-auditor`, demonstrating the cross-phase memory continuity.

## Cross-References

- Pipeline DAG: [`data/agent-execution-order.json`](../data/agent-execution-order.json)
- Aggregated state: [`data/unified-system-state.json`](../data/unified-system-state.json)
- Schema: [`data/schema.sql`](../data/schema.sql)
- LangGraph implementation: [`product/13-orchestration-architecture.md`](13-orchestration-architecture.md)
