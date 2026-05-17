// Static data layer — imports every JSON file from /data and re-exports typed objects.

import unifiedRaw from "../../../data/unified-system-state.json";
import channelAuditor from "../../../data/agents/channel-auditor.json";
import brandVoice from "../../../data/agents/brand-voice-specialist.json";
import nicheIntel from "../../../data/agents/niche-intelligence-analyst.json";
import audiencePersona from "../../../data/agents/audience-persona-builder.json";
import competitorAnalyst from "../../../data/agents/competitor-analyst.json";
import cso from "../../../data/agents/chief-strategy-officer.json";
import ceo from "../../../data/agents/ceo.json";
import keywordResearcher from "../../../data/agents/keyword-researcher.json";
import titleCopywriter from "../../../data/agents/title-copywriter.json";
import descriptionWriter from "../../../data/agents/description-writer.json";
import tagsSpecialist from "../../../data/agents/tags-hashtag-specialist.json";
import chapterArchitect from "../../../data/agents/chapter-architect.json";
import thumbnailStrategist from "../../../data/agents/thumbnail-strategist.json";
import qualityController from "../../../data/agents/quality-controller.json";
import communityEngagement from "../../../data/agents/community-engagement-strategist.json";
import crossPlatform from "../../../data/agents/cross-platform-repurposing-agent.json";
import playlistArchitect from "../../../data/agents/playlist-architect.json";
import performanceAnalyst from "../../../data/agents/performance-analyst.json";
import clientReporting from "../../../data/agents/client-reporting-agent.json";

import type { UnifiedState, AgentRun, Team } from "./types";

export const unified = unifiedRaw as unknown as UnifiedState;

interface AgentJsonFile {
  agent: string;
  team: Team;
  phase: string;
  execution_order: number;
  depends_on: string[];
  prompt: string;
  raw_output: string;
  structured_output: unknown;
  downstream_consumers?: string[];
  executed_at: string;
  duration_ms: number;
  status: string;
}

export const agentFiles: AgentJsonFile[] = [
  channelAuditor,
  brandVoice,
  nicheIntel,
  audiencePersona,
  competitorAnalyst,
  cso,
  ceo,
  keywordResearcher,
  titleCopywriter,
  descriptionWriter,
  tagsSpecialist,
  chapterArchitect,
  thumbnailStrategist,
  qualityController,
  communityEngagement,
  crossPlatform,
  playlistArchitect,
  performanceAnalyst,
  clientReporting,
] as unknown as AgentJsonFile[];

const agentByName = new Map(agentFiles.map((a) => [a.agent, a]));

export function getAgentDetail(name: string): AgentJsonFile | undefined {
  return agentByName.get(name);
}

// Enrich agent_runs with team, prompt, output, tokens (mocked deterministically), cost.
function tokenEstimate(text: string): number {
  return Math.max(120, Math.round(text.length / 3.6));
}

function deterministicCost(tokens: number): number {
  return Math.round(tokens * 0.0000045 * 10000) / 10000;
}

export const agentRunsEnriched: (AgentRun & {
  team: Team;
  phase: string;
  execution_order: number;
  prompt: string;
  raw_output: string;
  structured_output: unknown;
  tokens: number;
  cost_usd: number;
  retry_count: number;
  langsmith_trace_url: string;
})[] = unified.agent_runs.map((run) => {
  const detail = agentByName.get(run.agent);
  const prompt = detail?.prompt ?? "";
  const raw = detail?.raw_output ?? "";
  const tokens = tokenEstimate(prompt + raw);
  return {
    ...run,
    team: detail?.team ?? "operations",
    phase: detail?.phase ?? "monitoring",
    execution_order: detail?.execution_order ?? 0,
    prompt,
    raw_output: raw,
    structured_output: detail?.structured_output ?? {},
    tokens,
    cost_usd: deterministicCost(tokens),
    retry_count: 0,
    langsmith_trace_url: `https://smith.langchain.com/runs/${run.agent}-${run.started_at}`,
  };
});

// ----- Derived datasets used across screens -----

export const KEYWORDS_EXTENDED = unified.lists.keywords.map((k) => {
  const opportunity = Math.round(
    ((k.volume / 400) * (1 - k.difficulty / 100)) + 30,
  );
  const intent: "informational" | "transactional" =
    k.keyword.includes("income") || k.keyword.includes("p&l")
      ? "transactional"
      : "informational";
  const growth_rate = 8 + (k.volume % 23);
  return {
    ...k,
    opportunity_score: Math.min(99, Math.max(15, opportunity)),
    intent,
    growth_rate,
    long_tail: [
      `${k.keyword} for beginners`,
      `${k.keyword} explained`,
      `${k.keyword} examples`,
      `best ${k.keyword}`,
      `${k.keyword} 2026`,
    ],
  };
});

// Build a 90-day timeseries for cleaner charts.
export function build90DayDaily() {
  const series: { day: string; ctr: number; subs: number; views: number; avd: number }[] = [];
  const start = new Date("2026-02-17T00:00:00Z").getTime();
  const baseSubs = 37200;
  const baseCtr = 1.95;
  const baseAvd = 244;
  for (let i = 0; i < 90; i++) {
    const t = new Date(start + i * 86400000);
    // S-curve growth with breakout at day 80 (vid_143 release)
    const progress = i / 90;
    const breakout = i > 80 ? (i - 80) * 0.18 : 0;
    const noise = Math.sin(i * 0.7) * 0.18 + Math.sin(i * 0.31) * 0.12;
    const subs = Math.round(baseSubs + progress * 3200 + breakout * 1100 + noise * 80);
    const ctr =
      Math.round((baseCtr + progress * 1.05 + breakout * 0.55 + noise * 0.18) * 100) / 100;
    const views = Math.round(2000 + progress * 1800 + breakout * 5400 + noise * 800);
    const avd = Math.round(baseAvd + progress * 24 + breakout * 16 + noise * 9);
    series.push({
      day: t.toISOString().slice(0, 10),
      ctr,
      subs,
      views,
      avd,
    });
  }
  return series;
}

export const DAILY_90 = build90DayDaily();

// Channel SEO audit-style fields used by Channel Insights.
export const channelAudit = {
  health_score: 72,
  baseline_metrics: unified.client.baseline,
  current_metrics: unified.metrics.current,
  quick_wins: [
    { title: "Refresh top-3 NVDA back-catalog metadata", severity: "info", eta: "1h", impact: "+8% impressions" },
    { title: "Sunset vid_119 — crypto outlier killing avg CTR", severity: "warning", eta: "15m", impact: "+0.3pp CTR" },
    { title: "Add 'Monthly Options Income' playlist link to last 12 desc", severity: "info", eta: "30m", impact: "+4% session" },
    { title: "Investigate stagnant 14% search traffic share", severity: "critical", eta: "2h", impact: "unlock SEO" },
    { title: "Lock Tuesday/Friday publish slots", severity: "info", eta: "10m", impact: "+22% 24h views" },
  ] as Array<{ title: string; severity: "info" | "warning" | "critical"; eta: string; impact: string }>,
};

// Engagement queue (today's) — synthesized.
export const engagementQueue = [
  { id: "eq1", channel: "Twitter", task: "Repurpose Iron Condor P&L hook as thread", eta: "30m", icon: "twitter" },
  { id: "eq2", channel: "LinkedIn", task: "Repost October P&L recap with takeaways", eta: "20m", icon: "linkedin" },
  { id: "eq3", channel: "Community", task: "Post poll: 'Which strategy next month?'", eta: "10m", icon: "message" },
  { id: "eq4", channel: "Playlist", task: "Add vid_143 to 'Iron Condor Deep Dive'", eta: "5m", icon: "listVideo" },
  { id: "eq5", channel: "Reddit", task: "AMA snippet on r/options earnings plays", eta: "45m", icon: "message" },
];

// Video production package for Screen 4.
export const videoPackage = {
  topic: "iron condor strategy — October P&L",
  status: "Production complete · QC APPROVED",
  keyword_brief: {
    primary_keyword: "iron condor strategy",
    secondary_keywords: ["monthly options income", "iron condor adjustments"],
    long_tail: ["iron condor real p&l", "iron condor monthly income", "options income $1000 month"],
    search_volume: 38500,
    difficulty: 52,
    intent: "informational/transactional",
    ctr_band: [5.8, 6.4],
  },
  title_set: {
    primary_title: "How I Made $14K With Iron Condors in October (Real P&L)",
    primary_char_count: 56,
    ctr_estimate: 6.1,
    alternatives: [
      {
        title: "Iron Condor Strategy: $14K in October (Every Trade)",
        char_count: 51,
        ctr_estimate: 5.4,
        rationale: "Keyword-first, suggested-traffic optimized",
      },
      {
        title: "My October Options P&L: $14,212 From Iron Condors",
        char_count: 50,
        ctr_estimate: 5.7,
        rationale: "Documentary framing, returning-viewer",
      },
    ],
  },
  description: {
    full_text: `In October I sold iron condors on SPX for the full month and closed with $14,212 in net P&L. Here's every trade — entries, adjustments, exits — plus the rules I follow on monthly options income with iron condor strategy.

Iron condor strategy works when you treat it like a business: defined risk per trade, mechanical adjustments, and a written exit plan. I'll walk through the four legs, why I picked the strikes I did, when I rolled, and the one trade I closed for a small loss.

Disclaimer: This is for education only. Past performance is not indicative of future results. Options involve substantial risk and are not suitable for all investors.

— Timestamps —
00:00 Hook & October summary
00:38 Iron condor strategy 101
03:12 October P&L breakdown
07:45 Adjustments & the one loser
12:20 Monthly options income rules
16:10 What I'm doing next month

— Playlist — Iron Condor Deep Dive
— Tools — broker, journal template (link below)
`,
    hook_strength: 88,
    char_count: 1180,
  },
  tag_set: {
    tags: unified.lists.tags,
    char_count_total: 312,
    primary_tag_first: true,
  },
  hashtag_set: unified.lists.hashtags,
  chapter_set: {
    total_seconds: 1140,
    chapters: [
      { ts: "00:00", title: "Hook & October Summary", seconds: 0, has_keyword: true },
      { ts: "00:38", title: "Iron Condor Strategy 101", seconds: 38, has_keyword: true },
      { ts: "03:12", title: "October P&L Breakdown", seconds: 192, has_keyword: false },
      { ts: "07:45", title: "Adjustments & The One Loser", seconds: 465, has_keyword: false },
      { ts: "12:20", title: "Monthly Options Income Rules", seconds: 740, has_keyword: true },
      { ts: "16:10", title: "What I'm Doing Next Month", seconds: 970, has_keyword: false },
    ],
  },
  thumbnail_brief: {
    palette: ["#0B132B", "#F7931A", "#FFD600", "#22C55E", "#FFFFFF"],
    overlay_text: "+$14,212",
    secondary_text: "IRON CONDOR · OCT",
    composition: "Left: trader silhouette mid-action. Right: green P&L chart with $14K callout.",
    mobile_legible_at_240px: true,
  },
  qc_review: {
    quality_score: 95,
    decision: "APPROVED" as const,
    breakdown: {
      keyword: 96,
      brand_voice: 94,
      structure: 97,
      ctr_potential: 92,
    },
    revision_notes: [] as string[],
    publish_window: "Tuesday 14:00 client-time",
    checks_passed: [
      "Primary keyword in first 40 chars of title",
      "Primary keyword in first 150 chars of description",
      "Long-tail keyword density target met",
      "Chapter timestamps complete and sequential",
      "Hook chapter under 90s",
      "Tag count 8-12 and char budget under 500",
      "Hashtag count 3-5 with primary differentiator first",
      "Thumbnail mobile 240px legibility",
      "Plain-English compliance disclaimer present",
      "No hype, no guaranteed-returns language",
    ],
  },
};

// Pipeline stepper sequence for Screen 4.
export const PRODUCTION_STEPS = [
  { key: "keyword", label: "Keyword", agent: "keyword-researcher" },
  { key: "title", label: "Title", agent: "title-copywriter" },
  { key: "description", label: "Description", agent: "description-writer" },
  { key: "tags", label: "Tags", agent: "tags-hashtag-specialist" },
  { key: "chapters", label: "Chapters", agent: "chapter-architect" },
  { key: "thumbnail", label: "Thumbnail", agent: "thumbnail-strategist" },
  { key: "qc", label: "QC Gate", agent: "quality-controller" },
];

// Competitor enrichment.
export const competitorsEnriched = unified.entities.competitors.map((c, i) => {
  const niche_share = Math.round((c.subs / 5500000) * 100 * 10) / 10;
  const growth_rate = [12, 4.5, 9.2, 3.1, 6.6, 14.2, 7.8, 5.5, 18.4, 11.2][i] ?? 8;
  const cadence = [3.2, 2.6, 4.1, 3.8, 1.4, 2.0, 2.4, 1.8, 1.2, 1.6][i] ?? 2;
  const avg_length_min = [14, 22, 18, 11, 8, 26, 16, 12, 14, 19][i] ?? 15;
  const thumb_depth = [88, 79, 92, 81, 64, 70, 76, 68, 72, 74][i] ?? 70;
  const desc_depth = [82, 78, 88, 84, 60, 92, 70, 66, 64, 72][i] ?? 70;
  const community_rate = [74, 60, 88, 82, 50, 58, 64, 56, 52, 62][i] ?? 60;
  return {
    ...c,
    niche_share,
    growth_rate,
    cadence,
    avg_length_min,
    thumb_depth,
    desc_depth,
    community_rate,
  };
});

export const youStrategy = {
  name: "AlphaTraderTV (You)",
  cadence: 2.1,
  avg_length_min: 19,
  thumb_depth: 84,
  desc_depth: 90,
  community_rate: 78,
};

// Keyword gap matrix.
export const keywordGapMatrix = [
  { keyword: "iron condor strategy", you: 4, top_comp: 1, gap: 3 },
  { keyword: "monthly options income", you: 11, top_comp: 2, gap: 9 },
  { keyword: "iron condor adjustments", you: 7, top_comp: 3, gap: 4 },
  { keyword: "options income $1000 month", you: 18, top_comp: 5, gap: 13 },
  { keyword: "iron condor for beginners", you: 9, top_comp: 4, gap: 5 },
  { keyword: "iron condor spx", you: 14, top_comp: 6, gap: 8 },
  { keyword: "section 1256 tax", you: 0, top_comp: 0, gap: 0 },
];

// Cadence heatmap data (52w x 7d) — generated deterministically from DAILY_90 and synthetic past year.
export function buildCadenceHeatmap() {
  const cells: { week: number; dow: number; value: number; date: string }[] = [];
  for (let w = 0; w < 52; w++) {
    for (let d = 0; d < 7; d++) {
      // Most cells empty.
      const seed = (w * 7 + d) % 17;
      const upload = seed === 0 || seed === 5 || (w > 44 && d === 1);
      let velocity = 0;
      if (upload) {
        velocity = 1000 + ((seed * 311 + w * 71) % 28000);
        if (w > 44 && d === 1) velocity = 22000 + ((w + d) * 433) % 14000;
      }
      const date = `2025-${String(((w * 7 + d) % 12) + 1).padStart(2, "0")}-${String(((w + d) % 27) + 1).padStart(2, "0")}`;
      cells.push({ week: w, dow: d, value: velocity, date });
    }
  }
  return cells;
}
export const CADENCE_HEATMAP = buildCadenceHeatmap();
