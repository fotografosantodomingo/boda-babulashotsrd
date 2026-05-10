/**
 * Babula callback Worker
 * ----------------------
 * Receives callback-request form submissions from boda/dron/inmobiliaria/estudio
 * sites and dispatches an email via MailChannels (free for Cloudflare Workers).
 *
 * Deploy:
 *   cd worker && npx wrangler deploy
 *
 * Routes (configured in wrangler.toml):
 *   POST https://callback.babulashotsrd.com/submit
 *
 * On success: 302 redirect to https://<niche>.babulashotsrd.com/?sent=ok
 * On bot (honeypot filled): 302 redirect to a generic success URL (silent).
 * On validation failure: 400 with text body.
 */

const TO_EMAIL = "info@babulashotsrd.com";
const FROM_EMAIL = "noreply@babulashotsrd.com";
const FROM_NAME = "Babula Shots";

const ALLOWED_NICHES = ["boda", "inmobiliaria", "drone", "estudio"];

const NICHE_REDIRECT = {
  boda: "https://boda.babulashotsrd.com/?sent=ok",
  inmobiliaria: "https://inmobiliaria.babulashotsrd.com/?sent=ok",
  drone: "https://dron.babulashotsrd.com/?sent=ok",
  estudio: "https://estudio.babulashotsrd.com/?sent=ok"
};

const ALLOWED_ORIGINS = new Set([
  "https://boda.babulashotsrd.com",
  "https://dron.babulashotsrd.com",
  "https://inmobiliaria.babulashotsrd.com",
  "https://estudio.babulashotsrd.com"
]);

function corsHeaders(origin) {
  const headers = {
    "Vary": "Origin"
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "86400";
  }
  return headers;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailBody(fields) {
  const lines = [
    `Niche: ${fields.niche}`,
    `Locale: ${fields.locale || "-"}`,
    `Name: ${fields.name}`,
    `Phone: ${fields.phone}`,
    `Email: ${fields.email || "-"}`,
    `Preferred day: ${fields.preferredDay}`,
    `Preferred time: ${fields.preferredTime}`,
    "",
    "Message:",
    fields.message || "(none)"
  ];
  const text = lines.join("\n");
  const html = `<pre style="font:14px/1.5 ui-monospace,Menlo,monospace">${escapeHtml(text)}</pre>`;
  return { text, html };
}

async function sendMail(fields) {
  const { text, html } = buildEmailBody(fields);
  const subject = `[Callback ${fields.niche}] ${fields.name} (${fields.phone})`;

  const payload = {
    personalizations: [
      {
        to: [{ email: TO_EMAIL }]
      }
    ],
    from: { email: FROM_EMAIL, name: FROM_NAME },
    reply_to: fields.email ? { email: fields.email, name: fields.name } : undefined,
    subject,
    content: [
      { type: "text/plain", value: text },
      { type: "text/html", value: html }
    ]
  };

  const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`MailChannels failed: ${res.status} ${body}`);
  }
}

function badRequest(message, origin) {
  return new Response(message, {
    status: 400,
    headers: { "Content-Type": "text/plain; charset=utf-8", ...corsHeaders(origin) }
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname !== "/submit") {
      return new Response("Not found", { status: 404, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "POST", ...corsHeaders(origin) }
      });
    }

    let form;
    try {
      const ct = request.headers.get("Content-Type") || "";
      if (ct.includes("application/json")) {
        const json = await request.json();
        form = new Map(Object.entries(json).map(([k, v]) => [k, String(v ?? "")]));
      } else {
        form = await request.formData();
      }
    } catch {
      return badRequest("Invalid form data", origin);
    }

    const get = (k) => {
      const v = form.get(k);
      return v == null ? "" : String(v).trim();
    };

    // Honeypot: bots fill this, real users don't see it. Silently succeed.
    const honeypot = get("website");
    if (honeypot) {
      return Response.redirect(NICHE_REDIRECT.boda, 302);
    }

    const niche = get("niche").toLowerCase();
    if (!ALLOWED_NICHES.includes(niche)) {
      return badRequest("Invalid niche", origin);
    }

    const fields = {
      niche,
      locale: get("locale"),
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      preferredDay: get("preferredDay"),
      preferredTime: get("preferredTime"),
      message: get("message")
    };

    const required = ["name", "phone", "preferredDay", "preferredTime"];
    for (const k of required) {
      if (!fields[k]) {
        return badRequest(`Missing required field: ${k}`, origin);
      }
    }

    // Basic length guards
    if (fields.name.length > 200 || fields.phone.length > 40 || fields.message.length > 4000) {
      return badRequest("Field too long", origin);
    }

    try {
      await sendMail(fields);
    } catch (err) {
      return new Response(`Email delivery failed: ${err && err.message ? err.message : "unknown"}`, {
        status: 502,
        headers: { "Content-Type": "text/plain; charset=utf-8", ...corsHeaders(origin) }
      });
    }

    const redirectTo = NICHE_REDIRECT[niche] || NICHE_REDIRECT.boda;
    return Response.redirect(redirectTo, 302);
  }
};
