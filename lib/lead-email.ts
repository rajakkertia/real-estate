import {
  contactMethodLabels,
  featureLabels,
  financingLabels,
  propertyTypeLabels,
  timelineLabels,
  type LeadFormOutput,
} from "./form-schema";

const escapeHtml = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatRange = (min?: number, max?: number, unit = "€") => {
  const hasMin = typeof min === "number" && !Number.isNaN(min);
  const hasMax = typeof max === "number" && !Number.isNaN(max);
  const fmt = (n: number) => `${unit}${n.toLocaleString("en-US")}`;
  if (hasMin && hasMax) return `${fmt(min!)} – ${fmt(max!)}`;
  if (hasMin) return `from ${fmt(min!)}`;
  if (hasMax) return `up to ${fmt(max!)}`;
  return "—";
};

type Row = { label: string; value: string };

function renderSection(heading: string, rows: Row[]) {
  const items = rows
    .filter((r) => r.value && r.value !== "—")
    .map(
      (r) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #EBE3D4;vertical-align:top;width:38%;color:#6B6457;font-size:13px;letter-spacing:0.02em;">${escapeHtml(r.label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #EBE3D4;vertical-align:top;color:#1F2A20;font-size:14px;line-height:1.55;">${r.value}</td>
    </tr>`,
    )
    .join("");

  if (!items) return "";

  return `
  <section style="padding:20px 28px 4px;">
    <h2 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:13px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:#234235;">
      ${escapeHtml(heading)}
    </h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
      ${items}
    </table>
  </section>`;
}

export function renderLeadEmail(data: LeadFormOutput) {
  const isBuy = data.intent === "buy";

  const budgetRows: Row[] = isBuy
    ? [
        {
          label: "Budget",
          value: formatRange(data.budgetMin, data.budgetMax),
        },
        {
          label: "Financing",
          value: data.financing ? financingLabels[data.financing] : "—",
        },
      ]
    : [
        {
          label: "Monthly budget",
          value: formatRange(data.monthlyMin, data.monthlyMax),
        },
        {
          label: "Lease length",
          value: data.leaseLength
            ? escapeHtml(data.leaseLength).replace(/^\w/, (c) => c.toUpperCase())
            : "—",
        },
      ];

  const featuresStr =
    data.features && data.features.length
      ? data.features
          .map(
            (f) =>
              `<span style="display:inline-block;margin:0 6px 6px 0;padding:4px 10px;border:1px solid #D7CCB7;border-radius:999px;font-size:12px;color:#3F4A3F;background:#FAF6EC;">${escapeHtml(
                featureLabels[f],
              )}</span>`,
          )
          .join("")
      : "—";

  const notes = data.notes
    ? `<div style="padding:14px 16px;margin-top:8px;border:1px solid #EBE3D4;border-radius:12px;background:#FBF7EF;font-size:14px;line-height:1.65;color:#1F2A20;white-space:pre-wrap;">${escapeHtml(
        data.notes,
      )}</div>`
    : "—";

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>New brief · Atelier Estate</title>
  </head>
  <body style="margin:0;padding:0;background:#F3ECE1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1F2A20;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F3ECE1;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#FFFDF9;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px -20px rgba(24,45,37,0.25);">
            <tr>
              <td style="padding:28px 28px 20px;background:#234235;color:#FAF7F2;">
                <div style="font-size:11px;letter-spacing:0.24em;text-transform:uppercase;opacity:0.8;">New client brief</div>
                <div style="margin-top:8px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:500;letter-spacing:-0.01em;">
                  ${escapeHtml(data.fullName)}
                </div>
                <div style="margin-top:6px;font-size:13px;opacity:0.85;">
                  Looking to <strong style="font-weight:600;">${isBuy ? "buy" : "rent"}</strong> a
                  ${escapeHtml(propertyTypeLabels[data.propertyType])} in
                  ${escapeHtml(data.location)}
                </div>
              </td>
            </tr>

            ${renderSection("Contact", [
              { label: "Full name", value: escapeHtml(data.fullName) },
              {
                label: "Email",
                value: `<a href="mailto:${escapeHtml(
                  data.email,
                )}" style="color:#234235;text-decoration:underline;">${escapeHtml(
                  data.email,
                )}</a>`,
              },
              { label: "Phone", value: data.phone ? escapeHtml(data.phone) : "—" },
              {
                label: "Preferred channel",
                value: contactMethodLabels[data.contactMethod],
              },
            ])}

            ${renderSection("Property", [
              { label: "Intent", value: isBuy ? "Purchase" : "Rental" },
              {
                label: "Property type",
                value: escapeHtml(propertyTypeLabels[data.propertyType]),
              },
              { label: "Location", value: escapeHtml(data.location) },
              {
                label: "Bedrooms",
                value:
                  data.bedrooms === "studio"
                    ? "Studio"
                    : escapeHtml(data.bedrooms),
              },
              {
                label: "Minimum size",
                value:
                  typeof data.minSize === "number" && !Number.isNaN(data.minSize)
                    ? `${data.minSize} m²`
                    : "—",
              },
            ])}

            ${renderSection(isBuy ? "Budget & financing" : "Budget & lease", budgetRows)}

            ${renderSection("Timeline & features", [
              { label: "Timeline", value: timelineLabels[data.timeline] },
              { label: "Must-haves", value: featuresStr },
            ])}

            ${renderSection("Notes", [{ label: "From the client", value: notes }])}

            <tr>
              <td style="padding:22px 28px 28px;">
                <div style="font-size:12px;color:#8A8475;line-height:1.6;">
                  Please reply within one business day. The client is expecting
                  a personal, considered note — not a template.
                </div>
              </td>
            </tr>
          </table>
          <div style="margin:16px auto 0;font-size:11px;color:#8A8475;letter-spacing:0.1em;text-transform:uppercase;">
            Atelier Estate · Private Advisory
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { html };
}

export function leadEmailSubject(data: LeadFormOutput) {
  const action = data.intent === "buy" ? "Buy" : "Rent";
  return `New brief · ${data.fullName} · ${action} · ${data.location}`;
}
