/**
 * Lead submission for the Korea landing.
 *
 * TEMPORARY STUB: no network yet. Task 13 replaces the body of submitLead() with the real
 * POST to the Make scenario `pointcamp-leads` (payload, retry and dataLayer rules: S1 in
 * CLAUDE.md). Keep the exported types so LeadForm does not change.
 */

export const LANDING = "korea";

/** Field values from the form (FormData names: name, phone, email, participant). */
export type LeadData = {
  name: string;
  phone: string;
  email: string;
  participant: string;
};

export type SendResult = { ok: true } | { ok: false; error: string };

export async function submitLead(data: LeadData): Promise<SendResult> {
  void data;
  await new Promise((resolve) => setTimeout(resolve, 600));
  // Stub only: `?lead_error=1` in the URL simulates a failed send, to check the error UI.
  if (
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).has("lead_error")
  ) {
    return { ok: false, error: "stub: simulated failure" };
  }
  return { ok: true };
}
