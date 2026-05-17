"use client";
import { Twitter, Linkedin, MessageCircle, ListVideo } from "lucide-react";
import { PipelineRibbon } from "../components/layout/PipelineRibbon";
import { KpiCard } from "../components/ui/KpiCard";
import { ThemedCard } from "../components/ui/ThemedCard";
import { RecommendationCard } from "../components/ui/RecommendationCard";
import { InsightCard } from "../components/ui/InsightCard";
import { SubscriberVelocityChart } from "../components/charts/SubscriberVelocityChart";
import { QcDonut } from "../components/charts/QcDonut";
import { unified, engagementQueue, videoPackage, DAILY_90 } from "../lib/data";
import { fmtNum, fmtPct, fmtSeconds, cn } from "../lib/utils";
import { useTheme } from "../components/theme/ThemeProvider";

const ICON_MAP = {
  twitter: Twitter,
  linkedin: Linkedin,
  message: MessageCircle,
  listVideo: ListVideo,
} as const;

export default function DashboardPage() {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  const m = unified.metrics.current;
  const b = unified.client.baseline;
  const spark = DAILY_90.slice(-30).map((d) => ({ v: d.subs }));
  const sparkCtr = DAILY_90.slice(-30).map((d) => ({ v: d.ctr }));
  const sparkViews = DAILY_90.slice(-30).map((d) => ({ v: d.views }));
  const sparkAvd = DAILY_90.slice(-30).map((d) => ({ v: d.avd }));

  function pctDelta(cur: number, base: number) {
    return ((cur - base) / base) * 100;
  }

  return (
    <div>
      <header className="mb-4">
        <h1
          className={cn(
            "text-2xl md:text-3xl font-semibold",
            isWeb3 && "font-heading text-gradient-orange tracking-tight",
          )}
        >
          {unified.client.name}
        </h1>
        <p className="text-sm text-[rgb(var(--muted))] mt-1">{unified.client.niche}</p>
      </header>

      <PipelineRibbon />

      {/* Row 1: KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Subscribers"
          value={fmtNum(m.subs)}
          delta={pctDelta(m.subs, b.subs)}
          deltaLabel={`+${(m.subs - b.subs).toLocaleString()} vs baseline`}
          sparkData={spark}
        />
        <KpiCard
          label="CTR (rolling 30d)"
          value={fmtPct(m.ctr)}
          delta={pctDelta(m.ctr, b.ctr)}
          deltaLabel={`baseline ${b.ctr.toFixed(1)}%`}
          sparkData={sparkCtr}
          accent="secondary"
        />
        <KpiCard
          label="Avg View Duration"
          value={fmtSeconds(m.avd_seconds)}
          delta={pctDelta(m.avd_seconds, b.avd_seconds)}
          deltaLabel={`baseline ${fmtSeconds(b.avd_seconds)}`}
          sparkData={sparkAvd}
          accent="tertiary"
        />
        <KpiCard
          label="QC Pass Rate"
          value="95"
          delta={4}
          deltaLabel="last 30 days"
          sparkData={sparkViews}
          accent="primary"
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ThemedCard
          className="lg:col-span-2"
          title="Subscriber & view velocity"
          subtitle="last 90 days, weekly buckets"
        >
          <SubscriberVelocityChart height={290} />
        </ThemedCard>
        <ThemedCard
          title="QC Score — vid_143"
          subtitle="iron condor October P&L"
          right={
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                "bg-emerald-500/15 text-emerald-500",
              )}
            >
              APPROVED · 95
            </span>
          }
        >
          <QcDonut breakdown={videoPackage.qc_review.breakdown} height={230} />
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            {Object.entries(videoPackage.qc_review.breakdown).map(([k, v]) => (
              <div
                key={k}
                className={cn(
                  "flex items-center justify-between rounded-lg px-2 py-1",
                  isWeb3 ? "border border-white/10" : "bg-[rgb(var(--surface-low))]",
                )}
              >
                <span className="capitalize text-[rgb(var(--muted))]">{k.replace("_", " ")}</span>
                <span className={cn("font-semibold", isWeb3 && "mono text-[#FFD600]")}>{v}</span>
              </div>
            ))}
          </div>
        </ThemedCard>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ThemedCard
          className="lg:col-span-2"
          title="Today's engagement queue"
          subtitle="cross-platform repurposing + community tab"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {engagementQueue.map((item) => {
              const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-3 transition-colors",
                    isWeb3
                      ? "border-white/5 bg-black/20 hover:border-[#F7931A]/40"
                      : "border-[rgb(var(--border)/0.15)] hover:bg-[rgb(var(--secondary))]",
                  )}
                >
                  <div
                    className={cn(
                      "grid h-9 w-9 place-items-center rounded-full",
                      isWeb3
                        ? "bg-gradient-to-br from-[#F7931A]/20 to-[#FFD600]/10 text-[#FFD600]"
                        : "bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]",
                    )}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{item.task}</div>
                    <div className="text-[11px] text-[rgb(var(--muted))]">{item.channel} · {item.eta}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </ThemedCard>
        <ThemedCard title="Top recommendations" subtitle="ranked by impact × effort">
          <div className="space-y-2">
            {unified.recommendations.slice(0, 5).map((r) => (
              <RecommendationCard key={r.rank} {...r} />
            ))}
          </div>
        </ThemedCard>
      </div>

      {/* Row 4: insights */}
      <div className="mb-2">
        <h2
          className={cn(
            "text-sm font-semibold uppercase tracking-wider text-[rgb(var(--muted))]",
            isWeb3 && "mono",
          )}
        >
          Open insights
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {unified.insights.map((i, idx) => {
          const severity: "info" | "warning" | "critical" =
            i.includes("dragging") || i.includes("unchanged")
              ? "warning"
              : i.includes("100k target") || i.includes("safety margin")
                ? "info"
                : "info";
          return <InsightCard key={idx} text={i} severity={severity} />;
        })}
      </div>
    </div>
  );
}
