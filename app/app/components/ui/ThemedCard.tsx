"use client";
import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

export function ThemedCard({
  children,
  className,
  title,
  subtitle,
  right,
  pad = true,
}: {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
  pad?: boolean;
}) {
  return (
    <div className={cn("themed-card relative", pad && "p-5", className)}>
      {(title || right) && (
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-[rgb(var(--fg))]">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-[rgb(var(--muted))] mt-0.5">{subtitle}</p>
            )}
          </div>
          {right && <div className="shrink-0">{right}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
