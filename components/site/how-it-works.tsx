"use client";

import { motion } from "framer-motion";
import { FileText, Search, Handshake } from "lucide-react";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    n: "01",
    icon: <FileText className="h-5 w-5" />,
    title: "Share your brief",
    body: "Five thoughtful questions. Tell us the shape of your next chapter — we'll listen between the lines.",
  },
  {
    n: "02",
    icon: <Search className="h-5 w-5" />,
    title: "We curate quietly",
    body: "A senior advisor personally sources listings, off-market homes, and private opportunities tailored to your brief.",
  },
  {
    n: "03",
    icon: <Handshake className="h-5 w-5" />,
    title: "Meet, visit, decide",
    body: "We schedule private viewings, negotiate on your behalf, and stay beside you through contracts and keys.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="Three calm steps — no noise, no pressure."
          description="A service designed around your time. You talk to one advisor, from first brief to final signature."
        />

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6">
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
              className="group relative flex flex-col rounded-3xl border border-border/70 bg-card p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-700/5 text-forest-700 ring-1 ring-forest-700/10">
                  {step.icon}
                </span>
                <span className="font-display text-[15px] font-medium tracking-[0.2em] text-muted-foreground">
                  {step.n}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                {step.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
