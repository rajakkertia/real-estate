import type { LeadFormOutput } from "./form-schema";

export type LeadSubmissionResult = {
  ok: boolean;
  id?: string;
  error?: string;
};

/**
 * Thin client-side adapter for submitting a lead. POSTs the validated
 * payload to our internal API route, which in turn delivers the brief
 * via Resend. Swap the endpoint or handler implementation without
 * touching the form component.
 */
export async function submitLead(
  payload: LeadFormOutput,
): Promise<LeadSubmissionResult> {
  try {
    const response = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    type ApiResponse = { ok?: boolean; id?: string; error?: string };

    // Attempt to parse the response body whether it's 2xx or 4xx/5xx.
    let json: ApiResponse | null = null;
    try {
      json = (await response.json()) as ApiResponse;
    } catch {
      /* no-op — fall through to status-based handling below */
    }

    if (!response.ok || !json?.ok) {
      return {
        ok: false,
        error:
          json?.error ??
          "We couldn't send your brief. Please try again, or email us at hello@atelierestate.com.",
      };
    }

    return { ok: true, id: json.id };
  } catch {
    // Network / offline
    return {
      ok: false,
      error:
        "Connection issue — please check your network and try again. If this persists, email hello@atelierestate.com.",
    };
  }
}
