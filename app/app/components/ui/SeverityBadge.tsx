"use client";
import { AlertTriangle, Info, AlertOctagon } from "lucide-react";
import { cn } from "../../lib/utils";

export function SeverityBadge({ severity }: { severity: "info" | "warning" | "critical" }) {
  const Icon =
    severity === "critical" ? AlertOctagon : severity === "warning" ? AlertTriangle : Info;
  const cls =
    severity === "critical"
      ? "bg-error/10 text-error border-error/30"
      : severity === "warning"
        ? "bg-warning/10 text-warning border-warning/30"
        : "bg-primary/10 text-primary border-primary/30";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium",
        cls,
      )}
    >
      <Icon size={11} />
      {severity}
    </span>
  );
}
