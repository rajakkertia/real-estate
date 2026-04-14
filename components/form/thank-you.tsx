"use client";

import { motion } from "framer-motion";
import { Check, Calendar, Mail, Phone } from "lucide-react";
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
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 14 }}
        className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-forest-700 text-sand-50 shadow-lg shadow-forest-900/20"
      >
        <Check className="h-9 w-9" strokeWidth={2.5} />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-forest-700/30" />
      </motion.div>

      <h3 className="font-display text-3xl font-medium text-foreground md:text-4xl">
        Your request is in good hands.
      </h3>
      <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
        A senior advisor from our team will personally review your brief and
        reach out within one business day with a curated shortlist and next
        steps.
      </p>

      {referenceId ? (
        <p className="mt-4 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium tracking-wider text-muted-foreground">
          Reference · {referenceId.toUpperCase()}
        </p>
      ) : null}

      <div className="mt-10 grid w-full max-w-md gap-3 text-left">
        {[
          {
            icon: <Mail className="h-4 w-4" />,
            title: "Confirmation email",
            body: "We just sent a copy of your brief to your inbox.",
          },
          {
            icon: <Calendar className="h-4 w-4" />,
            title: "Personal introduction",
            body: "Your advisor will introduce themselves within 24 hours.",
          },
          {
            icon: <Phone className="h-4 w-4" />,
            title: "Discovery call",
            body: "A 20-minute call to align on strategy — no commitment.",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.08 }}
            className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-sand-100 text-forest-700">
              {item.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {item.title}
              </p>
              <p className="text-[13px] text-muted-foreground">{item.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <Button variant="outline" onClick={onReset}>
          Submit another request
        </Button>
        <p className="text-xs text-muted-foreground">
          Urgent? Write us at{" "}
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
