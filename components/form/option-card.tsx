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
          "group relative flex w-full items-start gap-4 rounded-2xl border bg-card p-4 text-left shadow-sm transition-all",
          "hover:border-forest-700/40 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
          selected
            ? "border-forest-700 ring-1 ring-forest-700/40 bg-forest-700/[0.03]"
            : "border-border",
          compact && "p-3",
          className,
        )}
        {...props}
      >
        {icon ? (
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-forest-700 transition-colors",
              selected && "bg-forest-700 text-sand-50",
            )}
          >
            {icon}
          </span>
        ) : null}
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[15px] font-medium text-foreground">
            {title}
          </span>
          {description ? (
            <span className="mt-0.5 text-[13px] text-muted-foreground">
              {description}
            </span>
          ) : null}
        </span>
        <span
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all",
            selected
              ? "border-forest-700 bg-forest-700 text-sand-50"
              : "border-border bg-transparent text-transparent",
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
