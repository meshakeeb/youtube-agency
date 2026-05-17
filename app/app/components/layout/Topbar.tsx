"use client";
import { Search, ChevronDown, Bell } from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle";
import { useTheme } from "../theme/ThemeProvider";
import { cn } from "../../lib/utils";
import { unified } from "../../lib/data";

export function Topbar() {
  const { theme } = useTheme();
  const isWeb3 = theme === "web3";
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center gap-4 px-6 lg:px-8 py-3 border-b backdrop-blur-xl",
        isWeb3
          ? "border-white/5 bg-black/40"
          : "border-[rgb(var(--border)/0.15)] bg-[rgb(var(--bg))]/70",
      )}
    >
      <button
        className={cn(
          "flex items-center gap-2 rounded-full pl-3 pr-2 py-1.5 text-sm border transition-colors",
          isWeb3
            ? "border-white/10 text-white hover:border-[#F7931A]/40"
            : "border-[rgb(var(--border)/0.20)] text-[rgb(var(--fg))] hover:bg-[rgb(var(--surface))]",
        )}
      >
        <span className={cn("h-2 w-2 rounded-full", isWeb3 ? "bg-[#FFD600]" : "bg-[rgb(var(--primary))]")} />
        <span className={cn("font-medium", isWeb3 && "mono")}>{unified.client.name}</span>
        <ChevronDown size={14} />
      </button>

      <div
        className={cn(
          "hidden md:flex items-center gap-2 flex-1 max-w-xl rounded-full px-3 py-1.5 border",
          isWeb3
            ? "bg-black/40 border-white/10"
            : "bg-[rgb(var(--surface))] border-[rgb(var(--border)/0.15)]",
        )}
      >
        <Search size={15} className="text-[rgb(var(--muted))]" />
        <input
          placeholder={isWeb3 ? "// search agents, keywords, videos" : "Search agents, keywords, videos…"}
          className="bg-transparent outline-none text-sm flex-1 placeholder:text-[rgb(var(--muted))]"
        />
        <span
          className={cn(
            "text-[10px] px-1.5 py-0.5 rounded border",
            isWeb3 ? "border-white/10 text-white/60 mono" : "border-[rgb(var(--border)/0.2)] text-[rgb(var(--muted))]",
          )}
        >
          ⌘K
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <button
          className={cn(
            "relative grid place-items-center h-8 w-8 rounded-full border",
            isWeb3 ? "border-white/10" : "border-[rgb(var(--border)/0.2)]",
          )}
          aria-label="Notifications"
        >
          <Bell size={15} className="text-[rgb(var(--muted))]" />
          <span
            className={cn(
              "absolute top-1 right-1 h-1.5 w-1.5 rounded-full",
              isWeb3 ? "bg-[#FFD600]" : "bg-[rgb(var(--primary))]",
            )}
          />
        </button>
        <div
          className={cn(
            "h-8 w-8 rounded-full grid place-items-center text-xs font-semibold",
            isWeb3
              ? "bg-gradient-to-br from-[#F7931A] to-[#FFD600] text-black"
              : "bg-[rgb(var(--primary))] text-white",
          )}
        >
          {unified.client.owner_name.slice(0, 1)}
        </div>
      </div>
    </header>
  );
}
