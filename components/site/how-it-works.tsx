"use client";

import { motion } from "framer-motion";
import { FileText, Search, Handshake } from "lucide-react";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    n: "01",
    icon: <FileText className="h-5 w-5" />,
    title: "Share your brief",
    body: "A few thoughtful questions — the shape of your next chapter in under two minutes. We read between the lines.",
  },
  {
    n: "02",
    icon: <Search className="h-5 w-5" />,
    title: "We curate quietly",
    body: "Your advisor personally sources listings, off-market opportunities, and introductions tailored to your brief.",
  },
  {
    n: "03",
    icon: <Handshake className="h-5 w-5" />,
    title: "Visit, decide, move in",
    body: "Private viewings, clean negotiation, and a steady hand through contracts, notary, and first keys.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="Three calm steps — no noise, no pressure."
          description="A service built around your time. You&rsquo;ll speak with one advisor, from first brief to final signature."
        />

        <div className="relative mt-16 md:mt-20">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[34px] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
          />
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {steps.map((step, i) => (
              <motion.article
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col rounded-3xl border border-border/60 bg-card p-7 shadow-[0_8px_30px_-20px_rgba(24,45,37,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-22px_rgba(24,45,37,0.28)] md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-700/5 text-forest-700 ring-1 ring-forest-700/10">
                    {step.icon}
                  </span>
                  <span className="font-display text-[13px] font-medium tracking-[0.3em] text-muted-foreground">
                    {step.n}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[22px] font-medium leading-tight tracking-tight text-foreground md:text-[24px]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground text-pretty">
                  {step.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
