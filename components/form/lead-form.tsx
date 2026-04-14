"use client";

import * as React from "react";
import { useForm, Controller, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Home,
  Key,
  KeyRound,
  Loader2,
  Lock,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  contactMethodLabels,
  contactMethods,
  featureLabels,
  features,
  financing,
  financingLabels,
  leadSchema,
  propertyTypeLabels,
  propertyTypes,
  timelineLabels,
  timelines,
  type LeadFormOutput,
  type LeadFormValues,
} from "@/lib/form-schema";
import { submitLead } from "@/lib/submit-lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormProgress } from "./progress";
import { OptionCard } from "./option-card";
import { Field } from "./field";
import { ThankYou } from "./thank-you";

type StepId = "intent" | "property" | "budget" | "timeline" | "contact";

const stepOrder: StepId[] = ["intent", "property", "budget", "timeline", "contact"];

const stepLabels: Record<StepId, string> = {
  intent: "Goal",
  property: "Property",
  budget: "Budget",
  timeline: "Timeline",
  contact: "Contact",
};

const stepFields: Record<StepId, FieldPath<LeadFormValues>[]> = {
  intent: ["intent"],
  property: ["propertyType", "location", "bedrooms", "minSize"],
  budget: ["budgetMin", "budgetMax", "financing", "monthlyMin", "monthlyMax", "leaseLength"],
  timeline: ["timeline", "features", "notes"],
  contact: ["fullName", "email", "phone", "contactMethod", "consent"],
};

const propertyIcon: Record<(typeof propertyTypes)[number], React.ReactNode> = {
  apartment: <Building2 className="h-5 w-5" />,
  house: <Home className="h-5 w-5" />,
  penthouse: <Sparkles className="h-5 w-5" />,
  villa: <Key className="h-5 w-5" />,
  townhouse: <Home className="h-5 w-5" />,
  land: <MapPin className="h-5 w-5" />,
};

const variants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export function LeadForm() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState<{
    id?: string;
  } | null>(null);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
    defaultValues: {
      intent: undefined,
      propertyType: undefined,
      location: "",
      bedrooms: "",
      minSize: undefined,
      budgetMin: undefined,
      budgetMax: undefined,
      financing: undefined,
      monthlyMin: undefined,
      monthlyMax: undefined,
      leaseLength: undefined,
      timeline: undefined,
      features: [],
      notes: "",
      fullName: "",
      email: "",
      phone: "",
      contactMethod: "email",
      consent: undefined as unknown as true,
    },
  });

  const {
    control,
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const intent = watch("intent");
  const step = stepOrder[stepIndex];

  const goNext = async () => {
    const fields = stepFields[step];
    const valid = await trigger(fields, { shouldFocus: true });
    if (!valid) return;
    if (stepIndex < stepOrder.length - 1) {
      setStepIndex((i) => i + 1);
      scrollTop();
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      scrollTop();
    }
  };

  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollTop = () => {
    const el = containerRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const onSubmit = async (values: LeadFormValues) => {
    setSubmitting(true);
    try {
      const result = await submitLead(values as LeadFormOutput);
      if (result.ok) {
        setSubmitted({ id: result.id });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const onReset = () => {
    reset();
    setSubmitted(null);
    setStepIndex(0);
    scrollTop();
  };

  return (
    <div
      ref={containerRef}
      id="get-started"
      className="relative overflow-hidden rounded-[28px] border border-border/80 bg-card/90 p-5 shadow-[0_24px_80px_-32px_rgba(24,45,37,0.35)] backdrop-blur-sm sm:p-8 md:p-10"
    >
      <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-sand-200/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-forest-200/40 blur-3xl" />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <ThankYou referenceId={submitted.id} onReset={onReset} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <FormProgress
              current={stepIndex + 1}
              total={stepOrder.length}
              label={stepLabels[step]}
            />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-7"
              noValidate
            >
              <div className="relative min-h-[360px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    {step === "intent" && (
                      <div>
                        <StepHeader
                          eyebrow="Let's start with the why"
                          title="Are you looking to buy or rent?"
                          subtitle="We'll tailor everything in the next steps around your goal."
                        />
                        <Field error={errors.intent?.message}>
                          <Controller
                            control={control}
                            name="intent"
                            render={({ field }) => (
                              <div className="grid gap-3 sm:grid-cols-2">
                                <OptionCard
                                  title="I want to buy"
                                  description="Find a home or investment property to own."
                                  icon={<KeyRound className="h-5 w-5" />}
                                  selected={field.value === "buy"}
                                  onClick={() => field.onChange("buy")}
                                />
                                <OptionCard
                                  title="I want to rent"
                                  description="Find the right place for the right lease."
                                  icon={<Key className="h-5 w-5" />}
                                  selected={field.value === "rent"}
                                  onClick={() => field.onChange("rent")}
                                />
                              </div>
                            )}
                          />
                        </Field>
                      </div>
                    )}

                    {step === "property" && (
                      <div className="space-y-6">
                        <StepHeader
                          eyebrow="Tell us about the space"
                          title="What kind of property do you have in mind?"
                          subtitle="Choose what fits closest — we'll refine details on the call."
                        />

                        <Field
                          label="Property type"
                          required
                          error={errors.propertyType?.message}
                        >
                          <Controller
                            control={control}
                            name="propertyType"
                            render={({ field }) => (
                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {propertyTypes.map((p) => (
                                  <OptionCard
                                    key={p}
                                    compact
                                    title={propertyTypeLabels[p]}
                                    icon={propertyIcon[p]}
                                    selected={field.value === p}
                                    onClick={() => field.onChange(p)}
                                  />
                                ))}
                              </div>
                            )}
                          />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field
                            label="Preferred location"
                            htmlFor="location"
                            required
                            error={errors.location?.message}
                          >
                            <div className="relative">
                              <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
                              <Input
                                id="location"
                                placeholder="e.g. Marbella Old Town, Lisbon Príncipe Real"
                                className="pl-10"
                                {...register("location")}
                              />
                            </div>
                          </Field>

                          <Field
                            label="Bedrooms"
                            required
                            error={errors.bedrooms?.message}
                          >
                            <Controller
                              control={control}
                              name="bedrooms"
                              render={({ field }) => (
                                <Select
                                  value={field.value || undefined}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose bedrooms" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {["studio", "1", "2", "3", "4", "5+"].map(
                                      (b) => (
                                        <SelectItem key={b} value={b}>
                                          {b === "studio"
                                            ? "Studio"
                                            : `${b} bedroom${b === "1" ? "" : "s"}`}
                                        </SelectItem>
                                      ),
                                    )}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </Field>
                        </div>

                        <Field
                          label="Minimum size"
                          htmlFor="minSize"
                          hint="In m² — optional"
                          error={errors.minSize?.message as string | undefined}
                        >
                          <Input
                            id="minSize"
                            type="number"
                            inputMode="numeric"
                            placeholder="e.g. 90"
                            {...register("minSize")}
                          />
                        </Field>
                      </div>
                    )}

                    {step === "budget" && (
                      <div className="space-y-6">
                        {intent === "rent" ? (
                          <>
                            <StepHeader
                              eyebrow="Let's talk numbers"
                              title="What's your monthly budget?"
                              subtitle="A rough range is perfect — we'll align precisely on the call."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                              <Field
                                label="Minimum / month"
                                htmlFor="monthlyMin"
                                error={errors.monthlyMin?.message as string | undefined}
                              >
                                <CurrencyInput
                                  id="monthlyMin"
                                  placeholder="2,000"
                                  {...register("monthlyMin")}
                                />
                              </Field>
                              <Field
                                label="Maximum / month"
                                htmlFor="monthlyMax"
                                required
                                error={errors.monthlyMax?.message as string | undefined}
                              >
                                <CurrencyInput
                                  id="monthlyMax"
                                  placeholder="4,500"
                                  {...register("monthlyMax")}
                                />
                              </Field>
                            </div>
                            <Field label="Lease length" htmlFor="leaseLength">
                              <Controller
                                control={control}
                                name="leaseLength"
                                render={({ field }) => (
                                  <Select
                                    value={field.value || undefined}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Choose lease length" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="short">
                                        Short-term (1–6 months)
                                      </SelectItem>
                                      <SelectItem value="mid">
                                        Mid-term (6–12 months)
                                      </SelectItem>
                                      <SelectItem value="long">
                                        Long-term (12+ months)
                                      </SelectItem>
                                      <SelectItem value="flexible">
                                        Flexible
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </Field>
                          </>
                        ) : (
                          <>
                            <StepHeader
                              eyebrow="Let's talk numbers"
                              title="What's your purchase budget?"
                              subtitle="A range helps us pre-select opportunities that actually fit."
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                              <Field
                                label="Minimum"
                                htmlFor="budgetMin"
                                error={errors.budgetMin?.message as string | undefined}
                              >
                                <CurrencyInput
                                  id="budgetMin"
                                  placeholder="450,000"
                                  {...register("budgetMin")}
                                />
                              </Field>
                              <Field
                                label="Maximum"
                                htmlFor="budgetMax"
                                error={errors.budgetMax?.message as string | undefined}
                              >
                                <CurrencyInput
                                  id="budgetMax"
                                  placeholder="850,000"
                                  {...register("budgetMax")}
                                />
                              </Field>
                            </div>
                            <Field
                              label="How will you finance the purchase?"
                              error={errors.financing?.message}
                            >
                              <Controller
                                control={control}
                                name="financing"
                                render={({ field }) => (
                                  <div className="grid gap-3 sm:grid-cols-3">
                                    {financing.map((f) => (
                                      <OptionCard
                                        key={f}
                                        compact
                                        title={financingLabels[f]}
                                        selected={field.value === f}
                                        onClick={() => field.onChange(f)}
                                      />
                                    ))}
                                  </div>
                                )}
                              />
                            </Field>
                          </>
                        )}
                      </div>
                    )}

                    {step === "timeline" && (
                      <div className="space-y-6">
                        <StepHeader
                          eyebrow="A few finishing touches"
                          title="When do you plan to move forward?"
                          subtitle="Pick what feels right — no pressure, we plan around you."
                        />

                        <Field
                          label="Timeline"
                          required
                          error={errors.timeline?.message}
                        >
                          <Controller
                            control={control}
                            name="timeline"
                            render={({ field }) => (
                              <div className="grid gap-3 sm:grid-cols-2">
                                {timelines.map((t) => (
                                  <OptionCard
                                    key={t}
                                    compact
                                    title={timelineLabels[t]}
                                    selected={field.value === t}
                                    onClick={() => field.onChange(t)}
                                  />
                                ))}
                              </div>
                            )}
                          />
                        </Field>

                        <Field
                          label="Must-have features"
                          hint="Select any that matter"
                        >
                          <Controller
                            control={control}
                            name="features"
                            render={({ field }) => (
                              <div className="flex flex-wrap gap-2">
                                {features.map((f) => {
                                  const active = field.value?.includes(f);
                                  return (
                                    <button
                                      key={f}
                                      type="button"
                                      onClick={() => {
                                        const set = new Set(field.value ?? []);
                                        if (set.has(f)) set.delete(f);
                                        else set.add(f);
                                        field.onChange(Array.from(set));
                                      }}
                                      className={cn(
                                        "rounded-full border px-4 py-2 text-sm transition-all",
                                        active
                                          ? "border-forest-700 bg-forest-700 text-sand-50 shadow-sm"
                                          : "border-border bg-card text-foreground hover:border-forest-700/40",
                                      )}
                                    >
                                      {featureLabels[f]}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          />
                        </Field>

                        <Field
                          label="Anything else we should know?"
                          htmlFor="notes"
                        >
                          <Textarea
                            id="notes"
                            rows={4}
                            placeholder="e.g. Relocating with family next spring. Prefer quiet streets, garden access, ideally walking distance to an international school."
                            {...register("notes")}
                          />
                        </Field>
                      </div>
                    )}

                    {step === "contact" && (
                      <div className="space-y-6">
                        <StepHeader
                          eyebrow="Last step"
                          title="How should your advisor reach you?"
                          subtitle="A senior advisor will personally review your brief and be in touch within one business day."
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field
                            label="Full name"
                            htmlFor="fullName"
                            required
                            error={errors.fullName?.message}
                          >
                            <Input
                              id="fullName"
                              placeholder="e.g. Alexandra Morgan"
                              autoComplete="name"
                              {...register("fullName")}
                            />
                          </Field>
                          <Field
                            label="Email"
                            htmlFor="email"
                            required
                            error={errors.email?.message}
                          >
                            <Input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              autoComplete="email"
                              {...register("email")}
                            />
                          </Field>
                        </div>

                        <Field
                          label="Phone number"
                          htmlFor="phone"
                          error={errors.phone?.message}
                        >
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000 0000"
                            autoComplete="tel"
                            {...register("phone")}
                          />
                        </Field>

                        <Field label="Preferred contact method">
                          <Controller
                            control={control}
                            name="contactMethod"
                            render={({ field }) => (
                              <div className="grid gap-3 sm:grid-cols-3">
                                {contactMethods.map((m) => (
                                  <OptionCard
                                    key={m}
                                    compact
                                    title={contactMethodLabels[m]}
                                    selected={field.value === m}
                                    onClick={() => field.onChange(m)}
                                  />
                                ))}
                              </div>
                            )}
                          />
                        </Field>

                        <div className="flex items-start gap-3 rounded-2xl border border-border/80 bg-sand-50/60 p-4">
                          <Controller
                            control={control}
                            name="consent"
                            render={({ field }) => (
                              <Checkbox
                                id="consent"
                                checked={!!field.value}
                                onCheckedChange={(v) =>
                                  setValue("consent", v === true ? true : (undefined as unknown as true), {
                                    shouldValidate: true,
                                  })
                                }
                              />
                            )}
                          />
                          <div className="space-y-1">
                            <Label
                              htmlFor="consent"
                              className="text-[13px] leading-relaxed text-foreground"
                            >
                              I agree to be contacted about this request and
                              accept the{" "}
                              <a
                                href="#"
                                className="font-medium text-forest-700 underline-offset-4 hover:underline"
                              >
                                Privacy Policy
                              </a>
                              .
                            </Label>
                            {errors.consent ? (
                              <p className="text-xs font-medium text-destructive">
                                {errors.consent.message as string}
                              </p>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                We never share your details. Unsubscribe any
                                time.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex items-center justify-between gap-4 border-t border-border/60 pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={goBack}
                  disabled={stepIndex === 0 || submitting}
                  className={cn(stepIndex === 0 && "invisible")}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>

                {step !== "contact" ? (
                  <Button
                    type="button"
                    onClick={goNext}
                    size="lg"
                    className="min-w-[160px]"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="min-w-[200px]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending brief…
                      </>
                    ) : (
                      <>
                        Request my shortlist
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
                <Lock className="h-3 w-3" />
                Your information is encrypted and reviewed only by our advisory
                team.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-700">
        {eyebrow}
      </p>
      <h3 className="font-display text-2xl font-medium leading-tight text-foreground text-balance sm:text-[28px]">
        {title}
      </h3>
      {subtitle ? (
        <p className="text-[15px] leading-relaxed text-muted-foreground text-pretty">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

const CurrencyInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
        €
      </span>
      <Input
        ref={ref}
        type="number"
        inputMode="numeric"
        className={cn("pl-8", className)}
        {...props}
      />
    </div>
  );
});
CurrencyInput.displayName = "CurrencyInput";
