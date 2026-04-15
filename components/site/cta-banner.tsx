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
          className="relative overflow-hidden rounded-[32px] border border-forest-900/20 bg-forest-800 px-6 py-16 text-sand-50 shadow-[0_30px_80px_-40px_rgba(15,27,22,0.7)] md:px-16 md:py-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sand-300/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-24 h-[420px] w-[420px] rounded-full bg-forest-500/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sand-200/30 to-transparent"
          />

          <div className="relative mx-auto max-w-[36rem] text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-sand-200/75">
              When you&rsquo;re ready
            </p>
            <h2 className="mt-5 font-display text-[34px] font-medium leading-[1.1] tracking-tight text-balance sm:text-[42px] md:text-[48px]">
              A quieter move starts with one short conversation.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-sand-200/90 text-pretty">
              Share your brief in under two minutes. A senior advisor reads
              every request personally and replies within one business day.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="w-full sm:w-auto"
              >
                <a href="#get-started">
                  Start my brief
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
