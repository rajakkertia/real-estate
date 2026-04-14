import type { LeadFormOutput } from "./form-schema";

export type LeadSubmissionResult = {
  ok: boolean;
  id?: string;
  error?: string;
};

/**
 * Thin adapter for lead submission. Swap the implementation to wire up to
 * Supabase, a Next.js route handler, or a third-party CRM without changing
 * the form component.
 *
 * Example (Supabase):
 *   const { data, error } = await supabase.from("leads").insert(payload).select().single();
 *   return error ? { ok: false, error: error.message } : { ok: true, id: data.id };
 */
export async function submitLead(
  payload: LeadFormOutput,
): Promise<LeadSubmissionResult> {
  // Simulate network + a stable id. Replace with a real integration.
  await new Promise((r) => setTimeout(r, 900));

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info("[lead]", payload);
  }

  return {
    ok: true,
    id: `lead_${Math.random().toString(36).slice(2, 10)}`,
  };
}
