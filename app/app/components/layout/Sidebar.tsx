"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Target,
  Wand2,
  Users,
  ListChecks,
  Feather,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme/ThemeProvider";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/channel-insights", label: "Channel Insights", icon: Activity },
  { href: "/keyword-intelligence", label: "Keyword Intelligence", icon: Target },
  { href: "/video-optimization", label: "Video Optimization", icon: Wand2 },
  { href: "/competitor-analysis", label: "Competitor Analysis", icon: Users },
  { href: "/agent-activity", label: "Agent Activity", icon: ListChecks },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col w-64 shrink-0 border-r px-4 py-6 sticky top-0 h-screen",
        isWeb3
          ? "border-white/5 bg-black/30 backdrop-blur-xl"
          : "border-[rgb(var(--border)/0.15)] bg-[rgb(var(--surface))]/60 backdrop-blur",
      )}
    >
      <Link href="/dashboard" className="flex items-center gap-2 px-2 py-2 mb-6">
        <div
          className={cn(
            "relative grid h-9 w-9 place-items-center rounded-xl",
            isWeb3
              ? "bg-gradient-to-br from-[#F7931A] to-[#FFD600] shadow-[0_0_18px_rgba(247,147,26,0.5)]"
              : "bg-[rgb(var(--primary))] text-white",
          )}
        >
          <Feather size={18} className="text-white" />
        </div>
        <div className="leading-tight">
          <div
            className={cn(
              "font-semibold text-base",
              isWeb3 && "font-heading tracking-tight",
            )}
          >
            Blackbird
          </div>
          <div
            className={cn(
              "text-[11px] uppercase tracking-wider text-[rgb(var(--muted))]",
              isWeb3 && "mono",
            )}
          >
            Agency
          </div>
        </div>
      </Link>
      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                active
                  ? isWeb3
                    ? "bg-gradient-to-r from-[#F7931A]/15 to-transparent text-white border border-[#F7931A]/30 shadow-[inset_0_0_18px_rgba(247,147,26,0.10)]"
                    : "bg-[rgb(var(--primary))] text-white shadow-[0_2px_10px_rgba(103,80,164,0.25)]"
                  : isWeb3
                    ? "text-white/70 hover:text-white hover:bg-white/5"
                    : "text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] hover:bg-[rgb(var(--surface-low))]",
              )}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.5} />
              <span className={cn(isWeb3 && "font-medium")}>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-6 text-[11px] text-[rgb(var(--muted))] px-3">
        <div className={cn(isWeb3 ? "mono uppercase tracking-widest" : "")}>
          Client · AlphaTraderTV
        </div>
        <div className="opacity-70 mt-1">19 agents · 6 teams</div>
      </div>
    </aside>
  );
}
