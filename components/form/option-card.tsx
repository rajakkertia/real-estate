"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  compact?: boolean;
}

export const OptionCard = React.forwardRef<HTMLButtonElement, OptionCardProps>(
  (
    { selected, title, description, icon, compact, className, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        className={cn(
          "group relative flex w-full items-start gap-3.5 rounded-2xl border bg-card text-left transition-all duration-200",
          "hover:-translate-y-[1px] hover:border-forest-700/35 hover:shadow-[0_6px_24px_-12px_rgba(24,45,37,0.25)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card",
          selected
            ? "border-forest-700/90 bg-forest-700/[0.04] shadow-[0_6px_20px_-14px_rgba(24,45,37,0.4)]"
            : "border-border/80",
          compact ? "p-3.5" : "p-4 sm:p-[18px]",
          className,
        )}
        {...props}
      >
        {icon ? (
          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-xl transition-colors",
              compact ? "h-9 w-9" : "h-10 w-10",
              selected
                ? "bg-forest-700 text-sand-50"
                : "bg-sand-100 text-forest-700 group-hover:bg-sand-200/80",
            )}
          >
            {icon}
          </span>
        ) : null}
        <span className="flex min-w-0 flex-1 flex-col">
          <span className={cn("font-medium text-foreground", compact ? "text-[14px]" : "text-[15px]")}>
            {title}
          </span>
          {description ? (
            <span className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
              {description}
            </span>
          ) : null}
        </span>
        <span
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all",
            selected
              ? "border-forest-700 bg-forest-700 text-sand-50 scale-100"
              : "border-border bg-transparent text-transparent scale-90 opacity-60",
          )}
          aria-hidden
        >
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
      </button>
    );
  },
);
OptionCard.displayName = "OptionCard";
