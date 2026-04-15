"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/form/lead-form";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[760px] bg-gradient-to-b from-sand-100/80 via-sand-50/40 to-background" />
        <div className="absolute left-1/2 top-28 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-forest-300/15 blur-[120px]" />
        <div className="absolute right-[-12%] top-44 h-[360px] w-[360px] rounded-full bg-sand-300/40 blur-[120px]" />
      </div>

      <div className="container relative grid grid-cols-1 gap-12 pb-20 pt-12 md:pb-28 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-14 lg:pt-20">
        {/* Left column — pitch */}
        <div className="flex flex-col justify-center lg:pt-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-[12px] font-medium text-forest-700 shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-forest-500/70" />
              <span className="relative h-2 w-2 rounded-full bg-forest-600" />
            </span>
            Taking on four new clients this quarter
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-7 font-display text-[42px] font-medium leading-[1.02] tracking-[-0.015em] text-foreground text-balance sm:text-[54px] lg:text-[66px]"
          >
            Finding a home,{" "}
            <span className="italic text-forest-700">without the search.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-[34rem] text-[17px] leading-[1.65] text-muted-foreground text-pretty sm:text-[18px]"
          >
            Atelier Estate is a <span className="text-foreground font-medium">private advisory</span> — not a listings site. Tell one
            senior advisor what you&apos;re looking for; they&apos;ll listen,
            quietly curate a shortlist (including homes you&apos;ll never see
            online), and walk you through every step to keys.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <a href="#get-started">
                Start my brief
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="#how-it-works">See how it works</a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-border/50 pt-7"
          >
            <Stat value="9 yrs" label="Advising privately" />
            <Stat value="€640M" label="Closed since 2014" />
            <Stat value="4.96" label="From 280+ clients" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-forest-600" />
              NDA available on request
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-forest-600" />
              Buyer-side only · No seller conflicts
            </span>
          </motion.div>
        </div>

        {/* Right column — form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="lg:sticky lg:top-24">
            <p className="mb-3 pl-1 text-[11px] font-medium uppercase tracking-[0.22em] text-forest-700 lg:hidden">
              Share your brief
            </p>
            <LeadForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-[24px] font-medium leading-none tracking-tight text-foreground sm:text-[28px]">
        {value}
      </span>
      <span className="mt-2 text-[12px] leading-snug text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
