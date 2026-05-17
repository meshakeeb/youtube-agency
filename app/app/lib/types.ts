// Type definitions for Blackbird Agency data layer.

export type Severity = "info" | "warning" | "critical";
export type Team =
  | "intelligence"
  | "onboarding"
  | "production"
  | "growth"
  | "operations";

export interface Trend30 {
  week: string;
  ctr: number;
  subs_end: number;
  views: number;
}

export interface Trend90 {
  month: string;
  ctr: number;
  subs_end: number;
  view_velocity: number;
}

export interface Trend7 {
  day: string;
  ctr: number;
  subs: number;
  views: number;
}

export interface Keyword {
  keyword: string;
  volume: number;
  difficulty: number;
  tier: "primary" | "secondary" | "long_tail";
  intent?: "informational" | "transactional" | "navigational";
  opportunity_score?: number;
  growth_rate?: number;
  long_tail?: string[];
}

export interface VideoSummary {
  video_id: string;
  title: string;
  ctr?: number;
  ctr_96h?: number;
  avd_seconds?: number;
  avd_seconds_96h?: number;
  views_96h?: number;
  status?: string;
  primary_keyword?: string;
  duration_seconds?: number;
  published_at?: string;
}

export interface CompetitorSummary {
  id: string;
  name: string;
  subs: number;
  overlap_score: number;
  niche_share?: number;
  growth_rate?: number;
}

export interface AgentRun {
  agent: string;
  status: string;
  started_at: string;
  ended_at: string;
  duration_ms: number;
  team?: Team;
  phase?: string;
  prompt?: string;
  raw_output?: string;
  structured_output?: unknown;
  tokens?: number;
  cost_usd?: number;
}

export interface UnifiedState {
  generated_at: string;
  client: {
    name: string;
    owner_name: string;
    niche: string;
    baseline: Record<string, number>;
    target: Record<string, number>;
  };
  entities: {
    channel: {
      channel_id: string;
      name: string;
      subs: number;
      lifetime_videos: number;
    };
    videos: VideoSummary[];
    playlists: Array<{
      playlist_id: string;
      title: string;
      target_keyword: string;
      target_video_count: number;
    }>;
    competitors: CompetitorSummary[];
    personas: Array<Record<string, unknown>>;
  };
  metrics: {
    current: {
      ctr: number;
      avd_seconds: number;
      subs: number;
      view_velocity_30d: number;
      watch_time_hours_30d: number;
      net_subs_per_week: number;
      search_traffic_share_pct: number;
      suggested_traffic_share_pct: number;
    };
    trend_7d: Trend7[];
    trend_30d: Trend30[];
    trend_90d: Trend90[];
  };
  lists: {
    keywords: Keyword[];
    tags: string[];
    hashtags: string[];
    competitors: string[];
    playlists: string[];
    videos: string[];
  };
  insights: string[];
  recommendations: Array<{
    rank: number;
    action: string;
    owner: Team;
    effort: "low" | "medium" | "high";
  }>;
  agent_runs: AgentRun[];
  pipeline_state: {
    current_phase: string;
    onboarding_complete: boolean;
    production_complete_for_video?: string;
    growth_complete_for_video?: string;
    blocking_agents: string[];
    gate_decisions: Array<{
      gate: string;
      decision: string;
      score?: number;
      at: string;
    }>;
  };
}
