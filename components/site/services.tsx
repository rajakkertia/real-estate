"use client";

import { motion } from "framer-motion";
import { Compass, Home, Building2, Landmark } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: <Home className="h-5 w-5" />,
    title: "Home buyer advisory",
    body: "Full-cycle guidance for first-time and seasoned buyers — from search and due-diligence to negotiation and closing.",
  },
  {
    icon: <Compass className="h-5 w-5" />,
    title: "Relocation support",
    body: "Moving cities or countries? We handle neighborhood scouting, school insight, and soft-landing logistics.",
  },
  {
    icon: <Building2 className="h-5 w-5" />,
    title: "Rental concierge",
    body: "Curated rentals from trusted landlords — including discreet, off-platform inventory you won't find online.",
  },
  {
    icon: <Landmark className="h-5 w-5" />,
    title: "Investment sourcing",
    body: "Yield-focused sourcing for investors, with on-the-ground underwriting and long-term asset strategy.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-sand-50/60 py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="A small studio. A full scope of care."
          description="Every engagement is led by a senior advisor. No call centers, no cold handoffs."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 md:gap-5 lg:grid-cols-4">
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
              className={cn(
                "group relative flex h-full flex-col rounded-3xl border border-border/70 bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-forest-700/30 hover:shadow-md",
              )}
            >
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-700 text-sand-50 shadow-sm shadow-forest-900/10">
                {s.icon}
              </span>
              <h3 className="font-display text-xl font-medium tracking-tight">
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
