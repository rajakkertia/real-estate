"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/form/lead-form";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-0 h-[720px] bg-gradient-to-b from-sand-100/80 via-background to-background" />
        <div className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-forest-300/20 blur-[120px]" />
        <div className="absolute right-[-10%] top-40 h-[360px] w-[360px] rounded-full bg-sand-300/40 blur-[120px]" />
      </div>

      <div className="container relative grid grid-cols-1 gap-10 pb-20 pt-10 md:pb-28 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-20">
        {/* Left column — pitch */}
        <div className="flex flex-col justify-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-forest-700 shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-forest-500/70" />
              <span className="relative h-2 w-2 rounded-full bg-forest-600" />
            </span>
            Now accepting new clients for Q2
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-6 font-display text-[40px] font-medium leading-[1.05] tracking-tight text-foreground text-balance sm:text-[52px] lg:text-[64px]"
          >
            A calmer way to find{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-forest-700">
                the right home.
              </span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-full bg-sand-200/80"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground text-pretty"
          >
            Atelier Estate is a private advisory for buyers and tenants who
            value taste, time, and a steady hand. Tell us what you&apos;re
            looking for — a senior advisor will curate a shortlist and walk
            you through it, personally.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <a href="#get-started">
                Start your brief
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <a href="#how-it-works">How it works</a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <TrustPill
              icon={<Star className="h-4 w-4 fill-current" />}
              title="4.96 / 5"
              subtitle="from 280+ clients"
            />
            <TrustPill
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Private & discreet"
              subtitle="NDA on request"
            />
            <TrustPill
              title="€640M+"
              subtitle="advised since 2014"
            />
          </motion.div>
        </div>

        {/* Right column — form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="lg:sticky lg:top-24">
            <LeadForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustPill({
  icon,
  title,
  subtitle,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/60 px-4 py-3 backdrop-blur-sm">
      {icon ? (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-200/60 text-forest-700">
          {icon}
        </span>
      ) : null}
      <div className="flex min-w-0 flex-col">
        <span className="font-display text-[15px] font-medium text-foreground">
          {title}
        </span>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
    </div>
  );
}
