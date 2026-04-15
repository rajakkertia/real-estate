"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-forest-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-display text-[30px] font-medium leading-[1.08] tracking-tight text-foreground text-balance sm:text-[38px] md:text-[44px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[15.5px] leading-[1.65] text-muted-foreground text-pretty md:text-[16px]">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
