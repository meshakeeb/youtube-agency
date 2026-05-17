"use client";
import { Flag } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme/ThemeProvider";

interface Chapter {
  ts: string;
  title: string;
  seconds: number;
  has_keyword: boolean;
}

export function ChapterTimeline({ chapters, total }: { chapters: Chapter[]; total: number }) {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";

  if (isWeb3) {
    // Vertical "blockchain ledger" timeline
    return (
      <div className="relative pl-7">
        <div className="absolute left-2 top-1 bottom-1 w-px bg-gradient-to-b from-[#F7931A] via-[#FFD600] to-transparent" />
        {chapters.map((c, i) => (
          <div key={i} className="relative pb-4 last:pb-0">
            <div className="absolute -left-7 top-0 h-5 w-5 grid place-items-center rounded-md border border-white/10 bg-black text-[10px] mono text-[#FFD600]">
              {i + 1}
            </div>
            <div className="text-[11px] mono text-[#FFD600]">{c.ts}</div>
            <div className="text-sm font-medium text-white flex items-center gap-2">
              {c.has_keyword && <Flag size={12} className="text-[#F7931A]" />}
              {c.title}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Material: horizontal chapter timeline.
  return (
    <div className="relative h-32">
      <div className="absolute top-10 left-2 right-2 h-1.5 rounded-full bg-[rgb(var(--secondary))]" />
      {chapters.map((c, i) => {
        const pct = (c.seconds / total) * 100;
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2"
            style={{ left: `${pct}%`, top: 0 }}
          >
            <div className="flex flex-col items-center">
              <div className="text-[10px] text-[rgb(var(--muted))]">{c.ts}</div>
              <div className="my-1 grid place-items-center h-7 w-7 rounded-full bg-[rgb(var(--primary))] text-white shadow-md">
                {c.has_keyword ? <Flag size={12} /> : <span className="text-[10px]">{i + 1}</span>}
              </div>
              <div
                className={cn(
                  "max-w-[140px] truncate text-center text-[10px] font-medium text-[rgb(var(--fg))]",
                )}
              >
                {c.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
