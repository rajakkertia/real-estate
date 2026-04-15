"use client";

import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Who is Atelier Estate for?",
    a: "We work with individuals, families, and small institutional buyers who value a measured, private advisory experience — whether renting a pied-à-terre, relocating with a family, or buying a long-term residence.",
  },
  {
    q: "Is the first consultation really free?",
    a: "Yes. Your initial discovery call is complimentary and without obligation. We only take on clients where there is a clear, mutual fit — and we'll tell you honestly if we're not the right match.",
  },
  {
    q: "How do you charge for your service?",
    a: "Fees are transparent and agreed in writing before any engagement. Buyers typically work with us on a success fee; tenants and relocations are on a fixed retainer. You'll never see a surprise invoice.",
  },
  {
    q: "Do you list or market properties?",
    a: "No. We represent buyers and tenants exclusively. That alignment is the foundation of every recommendation we make — and the reason we can walk you away from a beautiful-looking mistake.",
  },
  {
    q: "Which cities do you cover?",
    a: "Our senior team works across selected European hubs including Madrid, Lisbon, Barcelona, and Milan, with a vetted partner network for clients with broader international mandates.",
  },
  {
    q: "How private is my information?",
    a: "Completely. Your brief is read only by your advisor. We sign NDAs on request and store your data on encrypted, GDPR-compliant infrastructure. We never sell, share, or market to our lists.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative bg-sand-50/70 py-24 md:py-32">
      <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Questions, answered plainly."
            description="Still curious? Start your brief — your advisor will gladly clarify anything on the first call, with no obligation."
          />
          <div className="mt-8 hidden lg:block">
            <Button asChild variant="outline">
              <a href="#get-started">
                Start your brief
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="rounded-3xl border border-border/60 bg-card/80 px-5 py-2 sm:px-7 md:px-9">
          <Accordion type="single" collapsible defaultValue="q-0">
            {faqs.map((item, i) => (
              <AccordionItem key={item.q} value={`q-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
