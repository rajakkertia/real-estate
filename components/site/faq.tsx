"use client";

import { SectionHeading } from "./section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Who is Atelier Estate for?",
    a: "We work with individuals, families, and small institutional buyers who value a measured, private advisory experience — whether renting a pied-à-terre or purchasing a primary residence.",
  },
  {
    q: "Is the first consultation really free?",
    a: "Yes. Your initial discovery call is complimentary and without obligation. We'll only move forward if there is a clear, mutual fit.",
  },
  {
    q: "How do you charge for your service?",
    a: "Our fee structure is transparent and agreed in writing before any engagement. For buyers, we typically work on a success fee; for tenants and relocations, a fixed retainer applies. No surprises, ever.",
  },
  {
    q: "Do you list or market properties?",
    a: "No. We act exclusively on behalf of buyers and tenants. That alignment is the foundation of every recommendation we make.",
  },
  {
    q: "Which cities do you cover?",
    a: "Our senior team is based across select European hubs including Madrid, Lisbon, Barcelona, and Milan — with trusted local partners in other markets for clients with broader mandates.",
  },
  {
    q: "How private is my information?",
    a: "Completely. Briefs are reviewed by your advisor only. We sign NDAs on request and store your data on encrypted, GDPR-compliant infrastructure.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative bg-sand-50/60 py-24 md:py-32">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Questions, answered plainly."
            description="Still unsure? Start your brief — your advisor will gladly clarify anything on the discovery call."
          />
        </div>
        <div className="rounded-3xl border border-border/70 bg-card px-6 py-2 md:px-8">
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
