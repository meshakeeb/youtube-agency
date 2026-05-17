# Roadmap — MVP → V1 → V2 → Scale

> Time-boxed not feature-boxed. Each phase exits on outcome criteria, not feature checklists.

---

## Phase 0 — Spike (4 weeks · Q3 2026 first half)

**Outcome:** End-to-end Phase 0 + Phase 1 demo on a real trading creator. No multi-tenant, no UI polish, no billing.

| Build | Stop building |
|---|---|
| LangGraph hierarchical graph (5 team subgraphs) | Auth (use a single dev login) |
| Postgres + pgvector persistence (PostgresSaver + PostgresStore) | Multi-tenant isolation |
| 5 core agents wired in: channel-auditor, brand-voice-specialist, niche-intelligence-analyst, keyword-researcher, title-copywriter | Tags / Chapters / Thumbnail / QC (Phase 1.5) |
| Bare Next.js dashboard reading the JSON outputs | Tremor styling — use raw HTML |
| LangSmith tracing turned on | Eval harness (Phase 1.5) |

---

## Phase 1 — MVP (8 weeks · Q3 2026 second half)

**Outcome:** A paying trading-education creator can ship a Production-approved video without engineering hand-holding. 5 design partners on $79–$149 tier.

| Ship | Skip |
|---|---|
| All 19 agents in production | Agency multi-tenant tier |
| Strict linear Production pipeline with QC gate | Auto-strategy adjustment loop |
| Dashboard + Channel Insights + Keyword Intelligence + Video Optimization + Agent Activity Logs (Material You + Web3 themes both shipped) | Competitor Analysis screen (Phase 2) |
| Stripe billing with Starter / Pro tiers | Enterprise / Custom tier |
| Auth (Clerk or WorkOS) + per-tenant row-level security | SOC2 audit (Q4 2026) |
| Weekly Pulse PDF generation | Monthly Deep-Dive (Phase 2) |
| LangSmith eval suite — 12 golden traces with regression alarms | Online LLM-as-judge evals on production traffic (Phase 2) |

**Exit criteria:** ≥3 design partners shipping ≥1 video/week each; QC first-pass ≥70%; pipeline p95 ≤5 min.

---

## Phase 2 — V1 Launch (12 weeks · Q4 2026)

**Outcome:** Public launch on $79 / $149 / $499 tiers. $50K MRR exit.

- **Competitor Analysis screen** with leaderboard + treemap + per-video competitive brief.
- **Phase 2 Growth pipeline** in production: community-engagement-strategist, cross-platform-repurposing-agent, playlist-architect — parallel fan-out.
- **Phase 3 Monitoring** weekly cron: performance-analyst → client-reporting-agent → Monthly Deep-Dive PDF.
- **Agency tier** ($499) with multi-client switcher and white-label client portal (custom domain + logo + colors).
- **Buffer / Hypefury / Telegram / Slack integrations** for the Engagement Queue.
- **SOC2 Type I** attestation.
- **Online evals**: LangSmith LLM-as-judge running on 100% production Production-Team traffic with `voice_match`, `hook_strength`, `seo_score` rubrics.

**Exit criteria:** $50K MRR, 99.9% uptime, NDR ≥105%, ≥250 paid seats.

---

## Phase 3 — V2 (12 weeks · Q1 2027)

**Outcome:** Niche expansion + Autonomous Strategy.

- **84-niche taxonomy** with seeded niche intelligence profiles for top 12 (finance, trading, fitness, software dev, gaming, food, beauty, education, business, real estate, crypto, science).
- **Autonomous Strategy Layer**: closed-loop from `performance-analyst → chief-strategy-officer → mutate strategy_state in PostgresStore → bias Title/Thumbnail outputs`. Behind feature flag; A/B tested.
- **Thumbnail image generation** (was V1 brief-only): Flux + GPT-Image-1 with the Brief as prompt + ≤3 variants + click-prediction model integration.
- **Replay & what-if**: replay any agent run with modified input on Agent Activity Logs screen.
- **Localization**: Spanish + Portuguese + Hindi UI + niche profiles. Trading edu is global.
- **Notification + mobile push** for QC returns, weekly flags, and monthly reports.

**Exit criteria:** $83K MRR, 30% non-trading signups, A/B-validated ≥15% CTR lift from autonomous strategy.

---

## Phase 4 — Scale (Q2 2027 onward)

**Outcome:** Self-optimizing channel system. $1M ARR run-rate.

- **Continuous Backlog Optimization**: weekly cron re-scores the entire video catalog and surfaces re-optimization candidates (Taja's Backlog Boost but agentic + multi-agent).
- **Brand Safety + Compliance Agent** (trading creators face SEC/FINRA-adjacent risk): scans every Production output for compliance red flags (specific recommendations, unverified claims).
- **Enterprise tier** (custom): SLA, on-prem option, custom agents, per-tenant fine-tuned voice models, dedicated Slack channel.
- **Eval-driven prompt iteration loop**: prompts versioned in Git with PromptHub + automatic regression runs against the eval suite before any prompt ship.
- **Multi-platform expansion**: TikTok and Instagram Reels as primary platforms (not just repurposing destinations).

---

## What Is Explicitly Deferred or Killed

- **Long-form scripting** — out of scope through Phase 4. Creators' voice on camera is sacred.
- **Paid ads management** — never. Different product.
- **Generic-niche launch** — we will not chase non-monetizable niches until the trading + finance + dev + fitness wedge is dominated.
- **Hosting video files** — never. We orchestrate metadata + strategy, not storage.
- **Chatbot interface as primary UX** — vidIQ has shown this caps at "tool that answers questions." Our UX is a dashboard that runs the work, not a chat box.

---

## Risks That Could Force Re-Planning

| Risk | Trigger | Mitigation |
|---|---|---|
| YouTube API quota crunch | Daily quota exhaustion at 1k-client scale | Apply for expansion early; cache aggressively; batch reads |
| LLM cost spike | Per-video Production cost > $1.50 | Multi-model routing (small models for keyword, large for QC); prompt-caching |
| YouTube TOS shift against AI metadata | YouTube tightens "inauthentic" rules | Brand-Voice + QC pipeline is already the defense; double down |
| LangGraph velocity vs. CrewAI | LangGraph dev slows; competitor adopts CrewAI and ships faster | Eval suite + hierarchical pattern is portable; we can migrate orchestrator in ≤6 weeks |
