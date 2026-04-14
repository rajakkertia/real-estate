"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[32px] bg-forest-800 px-6 py-14 text-sand-50 shadow-xl shadow-forest-900/20 md:px-16 md:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-sand-300/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-forest-500/30 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-sand-200/80">
              Ready when you are
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl md:text-[44px]">
              A quieter move begins with a short conversation.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-sand-200/90 text-pretty">
              Share your brief in under two minutes. A senior advisor will read
              it personally and reply within one business day.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent">
                <a href="#get-started">
                  Start your brief
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="link" className="text-sand-100">
                <a href="mailto:hello@atelierestate.com">
                  Or write to hello@atelierestate.com
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
