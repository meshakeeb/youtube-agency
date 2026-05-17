"use client";
import { RefreshCw } from "lucide-react";
import { useTheme } from "../components/theme/ThemeProvider";
import { ThemedCard } from "../components/ui/ThemedCard";
import { SeoHealthGauge } from "../components/charts/SeoHealthGauge";
import { BaselineCurrentBars } from "../components/charts/BaselineCurrentBars";
import { CtrTrendChart } from "../components/charts/CtrTrendChart";
import { AvdTrendChart } from "../components/charts/AvdTrendChart";
import { SubscriberVelocityChart } from "../components/charts/SubscriberVelocityChart";
import { CadenceHeatmap } from "../components/charts/CadenceHeatmap";
import { SeverityBadge } from "../components/ui/SeverityBadge";
import { unified, channelAudit, DAILY_90 } from "../lib/data";
import { cn, fmtPct, fmtSeconds } from "../lib/utils";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

export default function ChannelInsightsPage() {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  const topVideos = [...unified.entities.videos].sort((a, b) => (b.views_96h ?? 0) - (a.views_96h ?? 0));

  return (
    <div>
      <header className="mb-6 flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className={cn("text-2xl md:text-3xl font-semibold", isWeb3 && "font-heading text-gradient-orange")}>
            Channel Insights
          </h1>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">
            {unified.client.name} · last audit {new Date(unified.generated_at).toLocaleString()}
          </p>
        </div>
        <button
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            isWeb3
              ? "bg-gradient-to-r from-[#F7931A] to-[#FFD600] text-black"
              : "bg-[rgb(var(--primary))] text-white hover:opacity-90",
          )}
        >
          <RefreshCw size={14} /> Re-audit channel
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <ThemedCard title="SEO health" subtitle="channel-auditor composite">
          <SeoHealthGauge score={channelAudit.health_score} height={220} />
          <p className="text-xs text-[rgb(var(--muted))] mt-2 text-center">
            Strong improvement room in keyword density and chapter coverage.
          </p>
        </ThemedCard>
        <ThemedCard className="lg:col-span-2" title="Baseline vs current" subtitle="trend since onboarding">
          <BaselineCurrentBars height={260} />
        </ThemedCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ThemedCard title="CTR — 90 days" subtitle={`current ${fmtPct(unified.metrics.current.ctr)} · niche median 3.2%`}>
          <CtrTrendChart height={240} />
        </ThemedCard>
        <ThemedCard title="AVD — 90 days" subtitle={`current ${fmtSeconds(unified.metrics.current.avd_seconds)}`}>
          <AvdTrendChart height={240} />
        </ThemedCard>
      </div>

      <ThemedCard title="Subscriber & view velocity" subtitle="weekly aggregates" className="mb-4">
        <SubscriberVelocityChart height={280} />
      </ThemedCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <ThemedCard className="lg:col-span-2" title="Top videos by 96h velocity" subtitle="sorted by views_96h">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={cn("text-[11px] uppercase tracking-wider text-[rgb(var(--muted))]", isWeb3 && "mono")}>
                  <th className="py-2 pr-3 text-left">#</th>
                  <th className="py-2 pr-3 text-left">Title</th>
                  <th className="py-2 pr-3 text-right">CTR</th>
                  <th className="py-2 pr-3 text-right">AVD</th>
                  <th className="py-2 pr-3 text-right">Views 96h</th>
                  <th className="py-2 pr-3">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topVideos.map((v, i) => (
                  <tr key={v.video_id} className={cn("border-t", isWeb3 ? "border-white/5" : "border-[rgb(var(--border)/0.15)]")}>
                    <td className={cn("py-2.5 pr-3", isWeb3 && "mono text-[#FFD600]")}>{i + 1}</td>
                    <td className="py-2.5 pr-3">
                      <div className="font-medium truncate max-w-[260px]">{v.title}</div>
                      <div className="text-[11px] text-[rgb(var(--muted))]">{v.video_id}{v.status === "flagged_sunset" ? " · flagged" : ""}</div>
                    </td>
                    <td className="py-2.5 pr-3 text-right">{((v.ctr_96h ?? v.ctr ?? 0) as number).toFixed(1)}%</td>
                    <td className="py-2.5 pr-3 text-right">{fmtSeconds((v.avd_seconds_96h ?? v.avd_seconds ?? 0) as number)}</td>
                    <td className={cn("py-2.5 pr-3 text-right font-semibold", isWeb3 && "mono")}>{(v.views_96h ?? 0).toLocaleString()}</td>
                    <td className="py-2.5 pr-3 w-24">
                      <div className="h-8">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={DAILY_90.slice(-14 - i, -1 - i).map((d) => ({ v: d.views + i * 80 }))}>
                            <defs>
                              <linearGradient id={`spark${i}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={isWeb3 ? "#F7931A" : "#6750A4"} stopOpacity={0.6} />
                                <stop offset="100%" stopColor={isWeb3 ? "#F7931A" : "#6750A4"} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="v" stroke={isWeb3 ? "#F7931A" : "#6750A4"} fill={`url(#spark${i})`} strokeWidth={1.5} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ThemedCard>
        <ThemedCard title="Quick wins" subtitle="from channel audit">
          <ul className="space-y-2">
            {channelAudit.quick_wins.map((qw) => (
              <li
                key={qw.title}
                className={cn(
                  "rounded-xl border p-3",
                  isWeb3 ? "border-white/5 bg-black/20" : "border-[rgb(var(--border)/0.15)] bg-[rgb(var(--bg))]/40",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{qw.title}</span>
                  <SeverityBadge severity={qw.severity} />
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-[rgb(var(--muted))]">
                  <span>{qw.eta}</span>
                  <span className={cn(isWeb3 && "mono text-[#FFD600]")}>{qw.impact}</span>
                </div>
              </li>
            ))}
          </ul>
        </ThemedCard>
      </div>

      <ThemedCard title="Upload cadence × performance" subtitle="52 weeks × 7 days, color = view velocity">
        <CadenceHeatmap />
      </ThemedCard>
    </div>
  );
}
