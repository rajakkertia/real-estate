import { NextResponse } from "next/server";
import { Resend } from "resend";
import { leadSchema, type LeadFormOutput } from "@/lib/form-schema";
import { leadEmailSubject, renderLeadEmail } from "@/lib/lead-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FROM =
  process.env.RESEND_FROM_EMAIL ??
  "Atelier Estate <onboarding@resend.dev>";
const TO =
  process.env.LEAD_NOTIFICATION_EMAIL ?? "hello@atelierestate.com";

function referenceId() {
  return `lead_${Math.random().toString(36).slice(2, 10)}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Some required fields are missing or invalid.",
        issues: parsed.error.flatten(),
      },
      { status: 422 },
    );
  }

  const data: LeadFormOutput = parsed.data;
  const id = referenceId();

  const apiKey = process.env.RESEND_API_KEY;

  // Dev convenience: if Resend is not configured, log the brief and
  // return success so the form can still be previewed locally.
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        "[api/send] RESEND_API_KEY not set — skipping email and returning a mock success. " +
          "Set RESEND_API_KEY in .env.local to enable real delivery.",
      );
      // eslint-disable-next-line no-console
      console.info("[api/send] Brief payload:", data);
      return NextResponse.json({ ok: true, id, delivered: false });
    }
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email delivery is not configured. Please contact us directly at hello@atelierestate.com.",
      },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { html } = renderLeadEmail(data);

    const { data: sendResult, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: data.email,
      subject: leadEmailSubject(data),
      html,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("[api/send] Resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "We couldn't deliver your brief right now. Please try again in a moment, or email hello@atelierestate.com.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      id,
      messageId: sendResult?.id,
      delivered: true,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[api/send] Unexpected error:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong on our side. Please try again or email us directly.",
      },
      { status: 500 },
    );
  }
}
