import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtNum(n: number, digits = 0): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 10_000) return (n / 1000).toFixed(1) + "K";
  if (n >= 1000) return (n / 1000).toFixed(2) + "K";
  return n.toFixed(digits);
}

export function fmtPct(n: number, digits = 1): string {
  return `${n.toFixed(digits)}%`;
}

export function fmtSeconds(s: number): string {
  const m = Math.floor(s / 60);
  const r = Math.round(s % 60);
  return `${m}m ${r}s`;
}

export function severityClass(sev: "info" | "warning" | "critical"): string {
  if (sev === "critical") return "border-error/40 bg-error/10 text-error";
  if (sev === "warning") return "border-warning/40 bg-warning/10 text-warning";
  return "border-primary/30 bg-primary/10 text-primary";
}
