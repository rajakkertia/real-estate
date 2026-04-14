import { z } from "zod";

export const intentValues = ["buy", "rent"] as const;
export type Intent = (typeof intentValues)[number];

export const propertyTypes = [
  "apartment",
  "house",
  "penthouse",
  "villa",
  "townhouse",
  "land",
] as const;

export const timelines = [
  "asap",
  "1-3m",
  "3-6m",
  "6-12m",
  "exploring",
] as const;

export const financing = ["cash", "mortgage", "undecided"] as const;

export const contactMethods = ["email", "phone", "whatsapp"] as const;

export const features = [
  "balcony",
  "terrace",
  "garden",
  "parking",
  "pool",
  "sea-view",
  "city-view",
  "elevator",
  "furnished",
  "pet-friendly",
] as const;

export const leadSchema = z
  .object({
    intent: z.enum(intentValues, {
      required_error: "Please choose an option to continue.",
    }),
    propertyType: z.enum(propertyTypes, {
      required_error: "Please select a property type.",
    }),
    location: z
      .string()
      .min(2, "Please enter a city or neighborhood.")
      .max(120),
    bedrooms: z.string().min(1, "Please choose the number of bedrooms."),
    minSize: z.coerce
      .number({ invalid_type_error: "Enter a number" })
      .min(0)
      .max(5000)
      .optional()
      .or(z.literal("" as unknown as number)),
    // Buy branch
    budgetMin: z.coerce
      .number({ invalid_type_error: "Enter a number" })
      .min(0)
      .optional(),
    budgetMax: z.coerce
      .number({ invalid_type_error: "Enter a number" })
      .min(0)
      .optional(),
    financing: z.enum(financing).optional(),
    // Rent branch
    monthlyMin: z.coerce
      .number({ invalid_type_error: "Enter a number" })
      .min(0)
      .optional(),
    monthlyMax: z.coerce
      .number({ invalid_type_error: "Enter a number" })
      .min(0)
      .optional(),
    leaseLength: z.string().optional(),
    // Common
    timeline: z.enum(timelines, {
      required_error: "Please choose a timeline.",
    }),
    features: z.array(z.enum(features)).default([]),
    notes: z.string().max(1000).optional().or(z.literal("")),
    // Contact
    fullName: z.string().min(2, "Please enter your full name.").max(120),
    email: z.string().email("Please enter a valid email."),
    phone: z
      .string()
      .min(6, "Please enter a valid phone number.")
      .max(32)
      .optional()
      .or(z.literal("")),
    contactMethod: z.enum(contactMethods).default("email"),
    consent: z.literal(true, {
      errorMap: () => ({
        message: "Please accept the privacy terms to continue.",
      }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.intent === "buy") {
      if (
        data.budgetMin != null &&
        data.budgetMax != null &&
        data.budgetMin > data.budgetMax
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["budgetMax"],
          message: "Max budget must be greater than min budget.",
        });
      }
    }
    if (data.intent === "rent") {
      if (
        data.monthlyMin != null &&
        data.monthlyMax != null &&
        data.monthlyMin > data.monthlyMax
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["monthlyMax"],
          message: "Max rent must be greater than min rent.",
        });
      }
    }
  });

export type LeadFormValues = z.input<typeof leadSchema>;
export type LeadFormOutput = z.output<typeof leadSchema>;

export const propertyTypeLabels: Record<(typeof propertyTypes)[number], string> =
  {
    apartment: "Apartment",
    house: "House",
    penthouse: "Penthouse",
    villa: "Villa",
    townhouse: "Townhouse",
    land: "Land / Plot",
  };

export const timelineLabels: Record<(typeof timelines)[number], string> = {
  asap: "As soon as possible",
  "1-3m": "Within 1–3 months",
  "3-6m": "Within 3–6 months",
  "6-12m": "Within 6–12 months",
  exploring: "Just exploring options",
};

export const financingLabels: Record<(typeof financing)[number], string> = {
  cash: "Cash purchase",
  mortgage: "Mortgage-financed",
  undecided: "Still deciding",
};

export const featureLabels: Record<(typeof features)[number], string> = {
  balcony: "Balcony",
  terrace: "Terrace",
  garden: "Garden",
  parking: "Parking",
  pool: "Pool",
  "sea-view": "Sea view",
  "city-view": "City view",
  elevator: "Elevator",
  furnished: "Fully furnished",
  "pet-friendly": "Pet friendly",
};

export const contactMethodLabels: Record<
  (typeof contactMethods)[number],
  string
> = {
  email: "Email",
  phone: "Phone call",
  whatsapp: "WhatsApp",
};
