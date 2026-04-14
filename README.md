# Atelier Estate — Premium Real Estate Consultation Landing Page

A production-quality landing page for a private real estate advisory, built as a high-converting funnel with a polished multi-step qualification form.

## Stack

- **Next.js 14** (App Router) · **TypeScript**
- **Tailwind CSS** · **shadcn/ui** primitives (custom themed)
- **Framer Motion** — section & step transitions, progress bar, micro-interactions
- **React Hook Form** + **Zod** — fully-typed, validated, multi-step flow

## Run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Architecture

```
app/
  layout.tsx          # Fonts (Inter + Fraunces), metadata
  page.tsx            # Landing composition
  globals.css         # Tailwind layers + design tokens

components/
  form/
    lead-form.tsx     # Orchestrates steps, progress, branching, submission
    progress.tsx      # Animated progress bar
    option-card.tsx   # Reusable selectable card (radio-like)
    field.tsx         # Label + error + hint wrapper
    thank-you.tsx     # Polished success state
  site/
    header.tsx        # Sticky header w/ mobile menu
    hero.tsx          # Headline + inline lead form
    how-it-works.tsx
    services.tsx
    why-us.tsx        # Pillars + testimonials
    faq.tsx
    cta-banner.tsx
    footer.tsx
  ui/                 # shadcn primitives (button, input, select, etc.)

lib/
  form-schema.ts      # Zod schema + typed labels (single source of truth)
  submit-lead.ts      # Thin adapter — swap for Supabase / API route
  utils.ts
```

## Form flow

1. **Intent** — Buy or rent (branches downstream).
2. **Property** — Type, location, bedrooms, minimum size.
3. **Budget** — Branches on intent: purchase budget + financing, or monthly range + lease length.
4. **Timeline** — Urgency, must-have features (chips), free-form notes.
5. **Contact** — Name, email, phone, preferred channel, consent.
6. **Thank you** — Animated confirmation with reference id and next-step reassurance.

Progress is validated per step via `trigger()` and advances only on valid input.
Framer Motion handles entrance/exit transitions; keyboard + screen-reader support is preserved.

## Connecting to Supabase / API

`lib/submit-lead.ts` exposes a single `submitLead(payload)` function. Replace the stub:

```ts
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(URL, ANON_KEY);

export async function submitLead(payload: LeadFormOutput) {
  const { data, error } = await supabase
    .from("leads")
    .insert(payload)
    .select("id")
    .single();
  return error
    ? { ok: false, error: error.message }
    : { ok: true, id: data.id };
}
```

Alternatively, create `app/api/leads/route.ts` and POST to it — the schema is
shared, so server-side re-validation is a one-liner.

## Design notes

- **Palette** — Warm sand neutrals + deep forest green. Chosen to feel
  premium and human, far from corporate blue.
- **Type** — *Fraunces* for display (soft, editorial) + *Inter* for UI.
- **Motion** — Subtle; `[0.22, 1, 0.36, 1]` cubic bezier used consistently.
- **Layout** — Mobile-first; the form is sticky on desktop, inline on mobile.
