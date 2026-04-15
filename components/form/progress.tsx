"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormProgressProps {
  current: number; // 1-based
  total: number;
  steps?: string[];
}

export function FormProgress({ current, total, steps }: FormProgressProps) {
  const pct = Math.min(100, Math.max(0, ((current - 1) / (total - 1)) * 100));
  return (
    <div className="space-y-3">
      <div className="relative">
        {/* Track */}
        <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-sand-200/70" />
        {/* Fill */}
        <motion.div
          className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-forest-700"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
        />
        {/* Dots */}
        <ol className="relative flex items-center justify-between">
          {Array.from({ length: total }).map((_, i) => {
            const n = i + 1;
            const done = n < current;
            const active = n === current;
            return (
              <li
                key={n}
                className="relative flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-medium transition-all",
                    done &&
                      "border-forest-700 bg-forest-700 text-sand-50",
                    active &&
                      "border-forest-700 bg-background text-forest-700 ring-4 ring-forest-700/10",
                    !done && !active && "border-sand-200 bg-background text-muted-foreground",
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? <Check className="h-3 w-3" strokeWidth={3} /> : n}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {steps && steps.length === total ? (
        <ol className="hidden items-center justify-between text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:flex">
          {steps.map((label, i) => {
            const n = i + 1;
            const active = n === current;
            const done = n < current;
            return (
              <li
                key={label}
                className={cn(
                  "w-1/5 text-center transition-colors",
                  active && "text-forest-700",
                  done && "text-foreground/70",
                )}
              >
                {label}
              </li>
            );
          })}
        </ol>
      ) : null}

      <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:hidden">
        <span>Step {current} of {total}</span>
        {steps ? (
          <span className="text-forest-700 normal-case tracking-normal text-[13px] font-medium">
            {steps[current - 1]}
          </span>
        ) : null}
      </div>
    </div>
  );
}
