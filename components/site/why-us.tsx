"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "./section-heading";

const pillars = [
  {
    title: "One advisor, brief to signature",
    body: "No queues, no handoffs, no rotating account managers. The person who reads your brief is the one who opens doors, negotiates, and sits beside you at closing.",
  },
  {
    title: "Roughly 40% of our closings are off-market",
    body: "A discreet network of owners, developers, and family offices lets us bring you homes that never reach Idealista or Rightmove.",
  },
  {
    title: "We only represent the buyer",
    body: "We don't list, we don't double-dip. That alignment shapes every recommendation — especially the ones that save you from a polished-looking mistake.",
  },
  {
    title: "Most clients come back, or send a friend",
    body: "71% of our engagements last year came from returning clients and referrals. A kept promise is the only marketing we invest in.",
  },
];

const testimonials = [
  {
    quote:
      "They asked questions our last agent never thought to ask — and then found us a garden apartment in Salamanca two streets off the market. We moved in six weeks after our first call.",
    author: "Elena R.",
    role: "Entrepreneur",
    meta: "Bought in Madrid · March 2024",
  },
  {
    quote:
      "Relocating with two kids felt impossible until we met Atelier. They pre-vetted schools, handled the embassy paperwork, and walked us into a home that already felt like ours.",
    author: "James & Priya L.",
    role: "Family of four",
    meta: "Relocated to Lisbon · Autumn 2023",
  },
  {
    quote:
      "Calm, prepared, and unflappable during negotiation. They shaved €340k off the asking price and still left us on great terms with the seller. Worth every cent of the fee.",
    author: "Sofia M. & Marc D.",
    role: "Investment purchase",
    meta: "Closed in Barcelona · July 2024",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 md:py-32">
      <div className="container grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Why Atelier"
            title={
              <>
                The difference is in the{" "}
                <span className="italic text-forest-700">details</span>.
              </>
            }
            description="We built Atelier around the way we&rsquo;d want to be treated — unhurried, honest, impeccably prepared."
          />

          <ul className="mt-10 space-y-5">
            {pillars.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex gap-4 border-b border-border/50 pb-5 last:border-0"
              >
                <span
                  className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-forest-700"
                  aria-hidden
                />
                <div>
                  <h3 className="font-display text-[17px] font-medium leading-snug text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground text-pretty">
                    {p.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="grid gap-5">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.author}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative rounded-3xl border border-border/60 bg-card p-7 shadow-[0_10px_40px_-24px_rgba(24,45,37,0.2)] md:p-8"
              >
                <Quote
                  className="h-6 w-6 text-sand-300"
                  strokeWidth={1.4}
                />
                <blockquote className="mt-4 font-display text-[19px] italic leading-[1.55] text-foreground text-pretty md:text-[20px]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border/40 pt-5 text-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-200/80 font-display text-[13px] font-medium text-forest-800">
                    {t.author
                      .split(" ")
                      .map((s) => s[0])
                      .filter((s) => /[A-Z]/.test(s))
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-medium text-foreground">
                      {t.author}
                    </span>
                    <span className="flex flex-wrap items-center gap-x-2 text-[12px] text-muted-foreground">
                      <span>{t.role}</span>
                      <span aria-hidden className="text-border">·</span>
                      <span>{t.meta}</span>
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
