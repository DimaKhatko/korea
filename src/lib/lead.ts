/**
 * Lead submission for the Korea landing (standard S1, see CLAUDE.md).
 * POSTs the lead as JSON to the shared Make scenario `pointcamp-leads`. The webhook URL is
 * public by design (no secret in the client). Payload field names are fixed: the shared
 * scenario depends on them.
 */

export const LANDING = "korea";
export const WEBHOOK_URL = "https://hook.eu1.make.com/29wyg57rzqxtajir3fw537ce1vrs2ev2";

/** Wait before the single retry. */
const RETRY_DELAY_MS = 1500;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/** Field values from the form (FormData names: name, phone, email, participant). */
export type LeadData = {
  name: string;
  phone: string;
  email: string;
  participant: string;
};

export type SendResult = { ok: true } | { ok: false; error: string };

type UtmKey = (typeof UTM_KEYS)[number];

/** Exactly the fields the Make scenario reads. */
type LeadPayload = LeadData &
  Record<UtmKey, string> & {
    landing: typeof LANDING;
    page_url: string;
    submitted_at: string;
    test: boolean;
  };

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function buildPayload(data: LeadData): LeadPayload {
  const params = new URLSearchParams(window.location.search);
  const utm = Object.fromEntries(UTM_KEYS.map((key) => [key, params.get(key) ?? ""])) as Record<
    UtmKey,
    string
  >;
  return {
    landing: LANDING,
    name: data.name,
    phone: data.phone,
    email: data.email,
    participant: data.participant,
    page_url: window.location.href,
    ...utm,
    submitted_at: new Date().toISOString(),
    test: params.get("test") === "1",
  };
}

/** One POST; resolves to an error message, or null when the response is 2xx. */
async function post(body: string): Promise<string | null> {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return response.ok ? null : `HTTP ${response.status}`;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}

/**
 * Sends the lead: one POST, and on a network error or non-2xx one retry after 1500 ms.
 * Only after a confirmed 2xx it pushes { event: "lead_submit" } to window.dataLayer.
 * Never call it for honeypot submissions.
 */
export async function submitLead(data: LeadData): Promise<SendResult> {
  if (typeof window === "undefined") {
    return { ok: false, error: "submitLead() needs a browser" };
  }

  const body = JSON.stringify(buildPayload(data));

  let error = await post(body);
  if (error) {
    await delay(RETRY_DELAY_MS);
    error = await post(body);
  }
  if (error) return { ok: false, error };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "lead_submit" });
  return { ok: true };
}
