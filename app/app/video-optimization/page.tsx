"use client";
import { CheckCircle2, FileText, Tag, Sparkles } from "lucide-react";
import { useTheme } from "../components/theme/ThemeProvider";
import { ThemedCard } from "../components/ui/ThemedCard";
import { PipelineStepper } from "../components/ui/PipelineStepper";
import { HookStrengthMeter } from "../components/ui/HookStrengthMeter";
import { ChapterTimeline } from "../components/ui/ChapterTimeline";
import { ChipCloud } from "../components/ui/ChipCloud";
import { ThumbnailPreview } from "../components/ui/ThumbnailPreview";
import { ScoreGauge } from "../components/ui/ScoreGauge";
import { QcBreakdownBars } from "../components/charts/QcBreakdownBars";
import { QcDecisionBanner } from "../components/ui/QcDecisionBanner";
import { videoPackage, PRODUCTION_STEPS } from "../lib/data";
import { cn } from "../lib/utils";

export default function VideoOptimizationPage() {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";

  return (
    <div>
      <header className="mb-4 flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className={cn("text-2xl md:text-3xl font-semibold", isWeb3 && "font-heading text-gradient-orange")}>
            Video Optimization
          </h1>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">
            {videoPackage.topic} · vid_143
          </p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
            "bg-emerald-500/15 text-emerald-500",
          )}
        >
          <CheckCircle2 size={13} /> {videoPackage.status}
        </span>
      </header>

      <div className="mb-6">
        <PipelineStepper steps={PRODUCTION_STEPS} activeIndex={PRODUCTION_STEPS.length} />
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ThemedCard title="Keyword Brief" subtitle="from keyword-researcher">
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <Row label="Primary" value={videoPackage.keyword_brief.primary_keyword} mono />
            <Row label="Search vol" value={videoPackage.keyword_brief.search_volume.toLocaleString()} />
            <Row label="Difficulty" value={`${videoPackage.keyword_brief.difficulty}/100`} />
            <Row label="Intent" value={videoPackage.keyword_brief.intent} />
            <Row label="CTR band" value={`${videoPackage.keyword_brief.ctr_band[0]}–${videoPackage.keyword_brief.ctr_band[1]}%`} />
            <Row label="Long-tail" value={`${videoPackage.keyword_brief.long_tail.length} variations`} />
          </dl>
          <div className="mt-3">
            <div className="text-[11px] uppercase tracking-wider text-[rgb(var(--muted))] mb-1.5">secondary keywords</div>
            <ChipCloud chips={videoPackage.keyword_brief.secondary_keywords} accent />
          </div>
        </ThemedCard>

        <ThemedCard title="Title set" subtitle="from title-copywriter · primary highlighted">
          <div className="space-y-2.5">
            {/* primary */}
            <div
              className={cn(
                "rounded-xl p-3 border relative",
                isWeb3
                  ? "border-transparent bg-gradient-to-br from-[#F7931A]/15 to-transparent shadow-[0_0_24px_-8px_rgba(247,147,26,0.5)]"
                  : "border-[rgb(var(--primary))]/40 bg-[rgb(var(--secondary))] shadow-md",
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={cn("text-[10px] uppercase tracking-widest font-semibold", isWeb3 ? "text-[#FFD600] mono" : "text-[rgb(var(--primary))]")}>
                  PRIMARY · CTR {videoPackage.title_set.ctr_estimate}%
                </span>
                <span className="text-[11px] text-[rgb(var(--muted))]">{videoPackage.title_set.primary_char_count}/60</span>
              </div>
              <p className="text-sm font-semibold leading-snug">{videoPackage.title_set.primary_title}</p>
            </div>
            {videoPackage.title_set.alternatives.map((a, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl border p-3 opacity-90",
                  isWeb3 ? "border-white/5 bg-black/20" : "border-[rgb(var(--border)/0.15)] bg-[rgb(var(--bg))]/50",
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-[rgb(var(--muted))]">Alt {i + 1} · CTR {a.ctr_estimate}%</span>
                  <span className="text-[11px] text-[rgb(var(--muted))]">{a.char_count}/60</span>
                </div>
                <p className="text-sm font-medium leading-snug">{a.title}</p>
                <p className="text-[11px] text-[rgb(var(--muted))] mt-1">{a.rationale}</p>
              </div>
            ))}
          </div>
        </ThemedCard>
      </div>

      {/* Description full width */}
      <ThemedCard
        title="Description draft"
        subtitle={`${videoPackage.description.char_count.toLocaleString()} chars · hook strength ${videoPackage.description.hook_strength}/100`}
        className="mb-4"
        right={<FileText size={16} className="text-[rgb(var(--muted))]" />}
      >
        <pre className={cn("whitespace-pre-wrap text-[13px] leading-relaxed rounded-xl p-4", isWeb3 ? "bg-black/40 border border-white/5 text-white/85" : "bg-[rgb(var(--bg))]/60 border border-[rgb(var(--border)/0.15)]")}>{videoPackage.description.full_text}</pre>
        <div className="mt-4 max-w-md">
          <HookStrengthMeter score={videoPackage.description.hook_strength} />
        </div>
      </ThemedCard>

      {/* Row 3: Tags + Chapters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ThemedCard
          title="Tag cloud"
          subtitle={`${videoPackage.tag_set.tags.length} tags · ${videoPackage.tag_set.char_count_total}/500 chars`}
          right={<Tag size={16} className="text-[rgb(var(--muted))]" />}
        >
          <ChipCloud chips={videoPackage.tag_set.tags} />
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className={cn("text-[rgb(var(--muted))]", isWeb3 && "mono uppercase tracking-widest")}>char budget</span>
              <span className={cn("font-semibold", isWeb3 && "mono text-[#FFD600]")}>{videoPackage.tag_set.char_count_total}/500</span>
            </div>
            <div className={cn("h-2 rounded-full overflow-hidden", isWeb3 ? "bg-white/5" : "bg-[rgb(var(--surface-low))]")}>
              <div
                className={cn(
                  "h-full",
                  videoPackage.tag_set.char_count_total <= 450
                    ? "bg-emerald-500"
                    : videoPackage.tag_set.char_count_total <= 490
                      ? "bg-amber-500"
                      : "bg-red-500",
                )}
                style={{ width: `${(videoPackage.tag_set.char_count_total / 500) * 100}%` }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-[11px] uppercase tracking-wider text-[rgb(var(--muted))] mb-1.5">hashtags</div>
            <ChipCloud chips={videoPackage.hashtag_set} accent />
          </div>
        </ThemedCard>
        <ThemedCard
          title="Chapter timeline"
          subtitle={`${videoPackage.chapter_set.chapters.length} chapters · ${Math.floor(videoPackage.chapter_set.total_seconds / 60)}m total`}
        >
          <ChapterTimeline chapters={videoPackage.chapter_set.chapters} total={videoPackage.chapter_set.total_seconds} />
        </ThemedCard>
      </div>

      {/* Thumbnail */}
      <ThemedCard title="Thumbnail brief" subtitle="from thumbnail-strategist" className="mb-4" right={<Sparkles size={16} className="text-[rgb(var(--muted))]" />}>
        <ThumbnailPreview
          palette={videoPackage.thumbnail_brief.palette}
          overlay={videoPackage.thumbnail_brief.overlay_text}
          secondary={videoPackage.thumbnail_brief.secondary_text}
          composition={videoPackage.thumbnail_brief.composition}
        />
      </ThemedCard>

      {/* QC */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <ThemedCard title="QC score">
          <ScoreGauge score={videoPackage.qc_review.quality_score} label="composite" />
        </ThemedCard>
        <ThemedCard title="QC breakdown" subtitle="4-axis check from quality-controller" className="lg:col-span-2">
          <QcBreakdownBars breakdown={videoPackage.qc_review.breakdown} height={220} />
        </ThemedCard>
      </div>
      <QcDecisionBanner
        decision={videoPackage.qc_review.decision}
        score={videoPackage.qc_review.quality_score}
        publishWindow={videoPackage.qc_review.publish_window}
        revisionNotes={videoPackage.qc_review.revision_notes}
      />
      <ThemedCard title="QC checks passed" subtitle="10/10" className="mt-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-sm">
          {videoPackage.qc_review.checks_passed.map((c) => (
            <li key={c} className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-[rgb(var(--fg))]/90">{c}</span>
            </li>
          ))}
        </ul>
      </ThemedCard>
    </div>
  );
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <>
      <dt className="text-xs uppercase tracking-wider text-[rgb(var(--muted))]">{label}</dt>
      <dd className={cn("text-sm font-medium", mono && "font-mono")}>{value}</dd>
    </>
  );
}
