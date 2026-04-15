"use client";

import { motion } from "framer-motion";
import { Check, CalendarClock, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThankYouProps {
  referenceId?: string;
  onReset: () => void;
}

export function ThankYou({ referenceId, onReset }: ThankYouProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 14 }}
        className="relative mb-7 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-forest-700 text-sand-50 shadow-[0_16px_40px_-16px_rgba(24,45,37,0.6)]"
      >
        <Check className="h-8 w-8" strokeWidth={2.5} />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-forest-700/25" />
      </motion.div>

      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-forest-700">
        Brief received
      </p>
      <h3 className="mt-3 font-display text-[30px] font-medium leading-[1.1] tracking-tight text-foreground text-balance sm:text-[36px]">
        Thank you — your brief is in good hands.
      </h3>
      <p className="mt-4 max-w-md text-pretty text-[15.5px] leading-[1.65] text-muted-foreground">
        A senior advisor will read it personally this week and reply within one
        business day. No auto-responders, no sales queue — just a real,
        considered answer from a human who read every word.
      </p>

      {referenceId ? (
        <p className="mt-5 rounded-full border border-border/60 bg-sand-50/80 px-4 py-1.5 font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
          Ref · {referenceId.toUpperCase()}
        </p>
      ) : null}

      <div className="mt-10 grid w-full max-w-md gap-3 text-left">
        {[
          {
            icon: <Mail className="h-4 w-4" />,
            title: "A copy is on its way",
            body: "Check your inbox — we've sent your brief and our Privacy note for your records.",
          },
          {
            icon: <MessageCircle className="h-4 w-4" />,
            title: "A human reply, not a template",
            body: "Your advisor will introduce themselves personally — expect it within one business day.",
          },
          {
            icon: <CalendarClock className="h-4 w-4" />,
            title: "A 20-minute discovery call",
            body: "Optional, unhurried, and without obligation. A fit-check before anything else.",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.08 }}
            className="flex items-start gap-3.5 rounded-2xl border border-border/60 bg-card p-4"
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sand-100 text-forest-700">
              {item.icon}
            </span>
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-foreground">
                {item.title}
              </p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <Button variant="outline" onClick={onReset}>
          Submit another brief
        </Button>
        <p className="text-[12px] text-muted-foreground">
          In the meantime, feel free to write us at{" "}
          <a
            href="mailto:hello@atelierestate.com"
            className="font-medium text-forest-700 underline-offset-4 hover:underline"
          >
            hello@atelierestate.com
          </a>
        </p>
      </div>
    </motion.div>
  );
}
