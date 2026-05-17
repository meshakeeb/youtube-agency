# Orchestration Architecture — LangGraph Hierarchical Teams

> Full research with citations lives in [research-orchestration.md](research-orchestration.md). This file is the productized architecture decision: topology, state schema, persistence, failure handling, observability, deployment.

## TL;DR

- **Framework:** LangGraph.js (stateful multi-agent graph).
- **Topology:** Hierarchical teams — Top Supervisor → 5 Team Supervisors → 19 specialist agents.
- **Persistence:** Postgres + pgvector via `PostgresSaver` (checkpointer, thread-scoped) + `PostgresStore` (cross-thread + vector). Supabase or RDS.
- **Failure handling:** Per-node `RetryPolicy` + error-handler routing; max 3 retries; escalate to CSO node; deadletter via LangSmith.
- **Durability backstop:** Wrap irreversible side-effect nodes (YouTube publish, image generation, billing) in Temporal activities.
- **Observability:** LangSmith from day one for tracing + online evals.
- **Why not alternatives:** CrewAI (less mature, role-based abstractions lose state granularity); OpenAI Agents SDK (newer, single-vendor lock-in); Temporal alone (workflow engine, not LLM-native — but we use it as the durability escape hatch).

Production-proven: this topology runs at Klarna, Uber, LinkedIn, Replit, AppFolio ([research-orchestration.md §2](research-orchestration.md)).

## Why Hierarchical Teams (Not Flat Supervisor or Network)

| Pattern | 19-agent fit | Verdict |
|---|---|---|
| **Network** (any-to-any handoff) | Combinatorial chaos, unbounded recursion | ❌ |
| **Single flat supervisor** | One LLM has to route 19 specialists, blowing context window and reliability | ⚠️ Brittle |
| **Hierarchical teams** | Top supervisor routes to 5 team supervisors → 3–5 specialists per team. Recursion stays under LangChain's recommended 40-depth limit | ✅ |

Each team becomes a compiled subgraph exposed as a single node to the top-level graph. Subgraph isolation gives us:
- bounded context per team (the Intelligence team supervisor doesn't need to know Production prompts)
- independent testability (each team has its own eval suite)
- clean failure containment (a Production failure doesn't crash the Intelligence subgraph)

## State Schema

```ts
import { Annotation } from "@langchain/langgraph";

export const PipelineState = Annotation.Root({
  // Identity
  client_id: Annotation<string>(),
  channel_id: Annotation<string>(),
  video_id: Annotation<string>(),
  thread_id: Annotation<string>(),

  // Phase routing
  phase: Annotation<"onboarding"|"production"|"growth"|"monitoring">(),
  active_team: Annotation<"leadership"|"intelligence"|"onboarding"|"production"|"growth"|"operations">(),
  next_agent: Annotation<string>(),

  // Shared context (last-write-wins)
  niche_profile: Annotation<NicheProfile>(),
  persona: Annotation<AudiencePersona>(),
  brand_voice: Annotation<BrandVoiceProfile>(),
  channel_audit: Annotation<ChannelAuditReport>(),
  competitor_report: Annotation<CompetitorReport>(),

  // Production drafts (append reducer)
  drafts: Annotation<Draft[]>({
    reducer: (l, r) => [...l, ...r],
    default: () => [],
  }),
  qc_history: Annotation<QcReview[]>({
    reducer: (l, r) => [...l, ...r],
    default: () => [],
  }),

  // Concurrent-write fields (last-write-wins per agent)
  keyword_brief: Annotation<KeywordBrief>(),
  title_set: Annotation<TitleSet>(),
  description: Annotation<Description>(),
  tag_set: Annotation<TagSet>(),
  chapters: Annotation<Chapter[]>(),
  thumbnail_brief: Annotation<ThumbnailBrief>(),
  qc_review: Annotation<QcReview>(),

  // Growth (append reducer — outputs land in parallel)
  growth_outputs: Annotation<GrowthOutput[]>({
    reducer: (l, r) => [...l, ...r],
    default: () => [],
  }),

  // Telemetry
  agent_runs: Annotation<AgentRun[]>({
    reducer: (l, r) => [...l, ...r],
    default: () => [],
  }),
  retry_counts: Annotation<Record<string, number>>({
    reducer: (l, r) => ({ ...l, ...r }),
    default: () => ({}),
  }),
});
```

Reducer choice matters:
- `drafts` and `growth_outputs` use append reducers so parallel Growth agents don't clobber each other.
- `keyword_brief`, `title_set`, etc. are last-write-wins — Production is sequential, only one writer per field.
- `retry_counts` uses a merge reducer so the supervisor can track per-agent retries across the run.

## Top-Level Graph

```ts
import { StateGraph, START, END } from "@langchain/langgraph";
import { PostgresSaver, PostgresStore } from "@langchain/langgraph-checkpoint-postgres";

const checkpointer = PostgresSaver.fromConnString(process.env.DATABASE_URL);
const store = new PostgresStore({ pool, index: { dims: 1536, embed: openaiEmbed } });

const pipeline = new StateGraph(PipelineState)
  .addNode("topSupervisor", topSupervisor)
  .addNode("intelligence", intelligenceTeam)
  .addNode("onboarding", onboardingTeam)
  .addNode("production", productionTeam)
  .addNode("growth", growthTeam)
  .addNode("operations", operationsTeam)
  .addNode("leadership", leadershipTeam)
  .addConditionalEdges("topSupervisor", routeByPhase)
  .addEdge(START, "topSupervisor")
  .compile({ checkpointer, store });
```

`routeByPhase` is a deterministic function (not an LLM) that looks at `state.phase` and dispatches to the right team. The top supervisor is an LLM *only* for ambiguity resolution (e.g., QC escalation routing).

## Per-Team Subgraphs

### Intelligence Team

```ts
const intelligence = new StateGraph(PipelineState)
  .addNode("nicheIntelligenceAnalyst", nicheAgent, { retryPolicy: standardRetry })
  .addNode("audiencePersonaBuilder", personaAgent, { retryPolicy: standardRetry })
  .addNode("competitorAnalyst", competitorAgent, { retryPolicy: standardRetry })
  .addNode("teamSupervisor", intelSupervisor)
  .addEdge(START, "nicheIntelligenceAnalyst")
  .addEdge("nicheIntelligenceAnalyst", "audiencePersonaBuilder")
  .addEdge("nicheIntelligenceAnalyst", "competitorAnalyst")  // parallel fan-out
  .addEdge("audiencePersonaBuilder", "teamSupervisor")
  .addEdge("competitorAnalyst", "teamSupervisor")
  .addConditionalEdges("teamSupervisor", (s) => s.next_agent === "done" ? END : "topSupervisor")
  .compile({ checkpointer });
```

### Production Team (strict linear with QC gate)

```ts
const production = new StateGraph(PipelineState)
  .addNode("keywordResearcher", keywordAgent, { retryPolicy: standardRetry })
  .addNode("titleCopywriter", titleAgent, { retryPolicy: standardRetry })
  .addNode("descriptionWriter", descriptionAgent, { retryPolicy: standardRetry })
  .addNode("tagsSpecialist", tagsAgent, { retryPolicy: standardRetry })
  .addNode("chapterArchitect", chapterAgent, { retryPolicy: standardRetry })
  .addNode("thumbnailStrategist", thumbnailAgent, { retryPolicy: standardRetry })
  .addNode("qualityController", qcAgent, { retryPolicy: standardRetry })
  .addNode("retryRouter", retryRouter)
  .addEdge(START, "keywordResearcher")
  .addEdge("keywordResearcher", "titleCopywriter")
  .addEdge("titleCopywriter", "descriptionWriter")
  .addEdge("descriptionWriter", "tagsSpecialist")
  .addEdge("tagsSpecialist", "chapterArchitect")
  .addEdge("chapterArchitect", "thumbnailStrategist")
  .addEdge("thumbnailStrategist", "qualityController")
  .addConditionalEdges("qualityController", qcDecision)  // APPROVED → END | RETURNED → retryRouter
  .addConditionalEdges("retryRouter", retryRoute)  // → failing agent OR escalate
  .compile({ checkpointer });
```

`qcDecision` reads `state.qc_review.decision`. If RETURNED, `retryRouter` looks up the failing agent's `state.retry_counts[agent]`; if <3, re-fires that agent with the revision note appended; if ≥3, sets `next_agent = "chief-strategy-officer"` and routes to Leadership.

### Growth Team (parallel fan-out)

```ts
const growth = new StateGraph(PipelineState)
  .addNode("communityEngagement", communityAgent)
  .addNode("crossPlatformRepurposing", repurposingAgent)
  .addNode("playlistArchitect", playlistAgent)
  .addNode("fanIn", growthFanIn)
  .addEdge(START, "communityEngagement")
  .addEdge(START, "crossPlatformRepurposing")
  .addEdge(START, "playlistArchitect")
  .addEdge("communityEngagement", "fanIn")
  .addEdge("crossPlatformRepurposing", "fanIn")
  .addEdge("playlistArchitect", "fanIn")
  .addEdge("fanIn", END)
  .compile({ checkpointer });
```

All three Growth agents launch from START; they write to the `growth_outputs` append-reducer; `fanIn` waits for all three to complete before returning to the top supervisor.

## Memory Architecture

Two tiers per [research-orchestration.md §3](research-orchestration.md):

### Thread memory (`PostgresSaver` checkpointer)
- Scope: one pipeline run (`thread_id` = `{client_id}_{video_id}` or `{client_id}_onboarding_{timestamp}`).
- Holds: full state snapshots between every node, replayable, supports human-in-the-loop interrupts (e.g., creator-approves-titles step).
- Retention: 30 days hot, then archived to cold storage.

### Cross-thread memory (`PostgresStore`)
- Scope: cross-run, namespaced `(user_id, channel_id, ...)`.
- Holds:
  - `voice_profile/{client_id}` — brand voice with embeddings for semantic retrieval
  - `niche_profile/{niche_slug}` — re-used across all clients in the niche
  - `persona/{client_id}` — audience persona card
  - `strategy_state/{client_id}` — adjustments from the CSO feedback loop
  - `historical_performance/{video_id}` — for the post-publish optimization loop
  - `hook_library/{client_id}` — high-performing hooks for re-use, vector-searched

### Embedding model
- `text-embedding-3-small` (1536 dims). Cheap; sufficient for voice + hook retrieval.
- `pgvector` HNSW index.

## Failure Handling

```ts
const standardRetry: RetryPolicy = {
  initialInterval: 500,
  backoffFactor: 2.0,
  maxInterval: 8000,
  maxAttempts: 3,
  jitter: true,
  retryOn: (err) =>
    err.name === "TimeoutError" ||
    err.name === "RateLimitError" ||
    (err.statusCode >= 500 && err.statusCode < 600),
};
```

Decision tree on failure:

```
Agent fails
  ├── Transient error (5xx, rate limit, timeout)
  │     → RetryPolicy auto-retry with backoff (max 3)
  │
  ├── Validation error (output JSON doesn't match schema)
  │     → Reroute to agent with "your previous output failed validation: ..." prepended
  │       → Counts as a retry
  │
  ├── QC failure (RETURNED decision)
  │     → retryRouter routes to the failing sub-agent with revision_notes
  │       → Counts as a retry
  │
  └── Retry budget exhausted (≥3)
        → Escalate to chief-strategy-officer node
          → CSO decides: skip-and-continue, mark-video-as-blocked, or human-loop
```

**Durability backstop:** LangGraph checkpointers persist state *between* nodes, not *during* a node. Any irreversible side-effect (YouTube publish API call, image generation API, Stripe charge) wraps in a **Temporal activity** with its own durable retry. This is the industry-standard hybrid pattern per [research-orchestration.md §4](research-orchestration.md).

## Observability

**LangSmith from day one.** Every node execution emits a trace. We get:
- Visual DAG of every pipeline run
- Per-agent latency / token / cost breakdown
- Online LLM-as-judge evals on production traffic with rubrics: `voice_match`, `hook_strength`, `seo_score`, `compliance_safety`
- Regression suite of 12 golden traces (5 onboarding scenarios + 5 production scenarios + 2 edge cases) run on every prompt change
- Alerting on per-agent error rate >1% or median latency >2× baseline

Internal **Agent Activity Logs** screen reads the same trace data through LangSmith API and renders a creator-friendly timeline.

## Deployment

| Component | Stack | Why |
|---|---|---|
| Orchestrator | LangGraph.js on Self-Hosted Lite (free tier covers 1M nodes/mo) | At 1000 videos/mo we're projected at ~50K node executions/mo — comfortably in free tier |
| Persistence | Supabase (Postgres 15 + pgvector + Row-Level Security) | One database for checkpointer + store + relational app data |
| API | Bun + Hono on Fly.io | Bun for speed; Fly for global edge |
| Frontend | Next.js 14 (App Router) on Vercel | React Server Components + Tremor + Recharts |
| Auth | Clerk | Org/team model fits agency tier natively |
| Background jobs | Trigger.dev or Inngest | Weekly cron, deferred Growth fan-out |
| Durability layer | Temporal (Cloud) | Wraps publish + image-gen + billing |
| Observability | LangSmith + Datadog | LangSmith for agent traces; Datadog for infra |
| Email + reports | Resend + react-pdf | Weekly Pulse + Monthly Deep-Dive |

## Comparable Frameworks Considered

| Framework | Verdict | Reason |
|---|---|---|
| **CrewAI** | Pass | Role-based abstraction (`Crew`, `Agent`, `Task`) hides the state graph; harder to reason about reducers + checkpointing |
| **AutoGen** | Pass | Conversation-driven; doesn't fit a strict-DAG pipeline cleanly |
| **OpenAI Agents SDK / Swarm** | Pass for now | Single-vendor lock-in; less mature checkpointer story; revisit at scale |
| **Temporal** alone | No | Workflow engine, not LLM-native. We use it as a durability backstop for side effects |
| **LangGraph.js** | **Pick** | Hierarchical teams pattern, first-class state schema, mature persistence, native LangSmith integration |

## Migration Escape Hatch

If LangGraph velocity slows, the hierarchical-teams + reducer-based-state pattern translates cleanly to CrewAI hierarchical crews or a custom orchestrator. We isolate the framework dependency to a single `orchestrator/` directory; agent prompts and eval suite are framework-agnostic. Migration timeline budget: 6 weeks.
