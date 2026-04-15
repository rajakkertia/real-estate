"use client";

import { motion } from "framer-motion";
import { Compass, Home, Building2, Landmark } from "lucide-react";
import { SectionHeading } from "./section-heading";

const services = [
  {
    icon: <Home className="h-5 w-5" />,
    title: "Home buyer advisory",
    body: "End-to-end guidance for first-time and seasoned buyers — search, due diligence, negotiation, closing.",
  },
  {
    icon: <Compass className="h-5 w-5" />,
    title: "Relocation support",
    body: "Moving cities or countries. Neighborhood scouting, school insight, and a soft landing for the whole family.",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Rental concierge",
    body: "Curated rentals from trusted landlords — including discreet, off-platform inventory you won&rsquo;t find online.",
  },
  {
    icon: <Landmark className="h-5 w-5" />,
    title: "Investment sourcing",
    body: "Yield-focused sourcing with on-the-ground underwriting and long-term strategy for private investors.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-sand-50/70 py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="A small studio, a full scope of care."
          description="Every engagement is led by a senior advisor. No call centers, no cold handoffs, no up-sells."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex h-full flex-col rounded-3xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-forest-700/30 hover:shadow-[0_14px_40px_-24px_rgba(24,45,37,0.25)] md:p-7"
            >
              <span className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-700 text-sand-50 shadow-sm shadow-forest-900/10">
                {s.icon}
              </span>
              <h3 className="font-display text-[19px] font-medium leading-snug tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground text-pretty">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
