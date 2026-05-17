"use client";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme/ThemeProvider";

export function ThumbnailPreview({
  palette,
  overlay,
  secondary,
  composition,
}: {
  palette: string[];
  overlay: string;
  secondary: string;
  composition: string;
}) {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div
          className={cn(
            "relative aspect-[16/9] w-full overflow-hidden rounded-xl",
            isWeb3 ? "border border-white/10" : "border border-[rgb(var(--border)/0.20)]",
          )}
          style={{
            background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[0]} 55%, ${palette[1]}88 100%)`,
          }}
        >
          {/* Decorative chart on right */}
          <svg viewBox="0 0 200 120" className="absolute right-4 top-6 h-3/4 w-3/5 opacity-90">
            <path
              d="M 10 100 L 30 90 L 50 92 L 70 80 L 90 70 L 110 60 L 130 40 L 150 30 L 170 18 L 190 8"
              fill="none"
              stroke={palette[3]}
              strokeWidth={3}
              strokeLinecap="round"
            />
            <path
              d="M 10 100 L 30 90 L 50 92 L 70 80 L 90 70 L 110 60 L 130 40 L 150 30 L 170 18 L 190 8 L 190 110 L 10 110 Z"
              fill={palette[3]}
              fillOpacity={0.18}
            />
          </svg>
          {/* Silhouette block on left */}
          <div className="absolute left-4 bottom-4 h-3/4 w-1/3 bg-black/40 rounded-lg" />
          {/* Overlay text */}
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <div
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ color: palette[1], textShadow: "0 4px 18px rgba(0,0,0,0.45)" }}
            >
              {overlay}
            </div>
            <div
              className="text-xs md:text-sm font-bold tracking-widest mt-1"
              style={{ color: palette[2] }}
            >
              {secondary}
            </div>
          </div>
        </div>
        <div className="mt-3 text-xs text-[rgb(var(--muted))]">{composition}</div>
      </div>
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))] mb-1">palette</div>
        {palette.map((c) => (
          <div key={c} className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full border border-white/10" style={{ background: c }} />
            <span className={cn(isWeb3 ? "mono text-xs" : "text-xs font-mono")}>{c.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
