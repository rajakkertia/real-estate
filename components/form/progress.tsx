"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormProgressProps {
  current: number;
  total: number;
  label?: string;
}

export function FormProgress({ current, total, label }: FormProgressProps) {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span className="uppercase tracking-[0.18em]">
          Step {current} of {total}
        </span>
        {label ? (
          <span className="text-forest-700/80 font-medium normal-case tracking-normal">
            {label}
          </span>
        ) : null}
      </div>
      <div
        className={cn(
          "relative h-1.5 w-full overflow-hidden rounded-full bg-sand-200/70",
        )}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-forest-600 to-forest-800"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
