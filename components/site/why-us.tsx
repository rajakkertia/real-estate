"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "./section-heading";

const pillars = [
  {
    title: "One advisor, start to signature",
    body: "No handoffs, no queues. Your brief is read personally — and the person who reads it is the one who delivers.",
  },
  {
    title: "Off-market access",
    body: "Nearly 40% of our closings never touch public listings. We tap a discreet network of owners, developers, and private offices.",
  },
  {
    title: "Calm, clear negotiation",
    body: "We speak quietly, write firmly, and close cleanly. You'll always know where you stand and why.",
  },
  {
    title: "Clients who stay with us",
    body: "More than 70% of our work comes from returning clients and referrals. A kept promise is our only marketing.",
  },
];

const testimonials = [
  {
    quote:
      "They understood what we wanted before we knew how to say it. The home they found felt inevitable.",
    author: "Elena R.",
    meta: "Bought in Madrid · 2024",
  },
  {
    quote:
      "I've worked with large agencies for years. This felt like a friend with a very good rolodex — and infinite patience.",
    author: "James L.",
    meta: "Relocated to Lisbon · 2023",
  },
  {
    quote:
      "Calm, prepared, and unflappable during negotiation. They saved us seven figures and a lot of nerves.",
    author: "Sofia & Marc",
    meta: "Investment purchase · 2024",
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 md:py-32">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Why Atelier"
            title={
              <>
                The difference is in the
                <span className="italic text-forest-700"> details</span>.
              </>
            }
            description="We built Atelier around the way we'd want to be treated — unhurried, honest, and impeccably prepared."
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
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-700"
                  aria-hidden
                />
                <div>
                  <h3 className="font-display text-lg font-medium text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground text-pretty">
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
                className="relative rounded-3xl border border-border/70 bg-card p-7 shadow-sm md:p-8"
              >
                <Quote className="h-5 w-5 text-forest-600/40" />
                <blockquote className="mt-3 font-display text-[18px] leading-relaxed text-foreground text-pretty md:text-[19px]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border/50 pt-4 text-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-200 font-display text-sm font-medium text-forest-800">
                    {t.author
                      .split(" ")
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {t.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t.meta}
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
