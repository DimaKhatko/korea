/**
 * Korea 2027 landing: the one place for trip data that is still pending from the client.
 * The bracketed placeholders stay visible on the page on purpose (see
 * _reference/korea-design/HANDOFF.md) until real values arrive; replace them here only.
 */

/** Group dates, «Група 1: [ДАТИ]» / «Група 2: [ДАТИ]». */
export const GROUP_1_DATES = "[ДАТИ]";
export const GROUP_2_DATES = "[ДАТИ]";

/** Participant age, «Підлітки [ВІК]». */
export const PARTICIPANT_AGE = "[ВІК]";

/** Maximum group size, «У групі до [N] учасників». */
export const MAX_GROUP_SIZE = "[N]";

/** Slot for a PointCamp group photo in WhyUs, shown as «[ФОТО]» until the photo is supplied. */
export const GROUP_PHOTO = "[ФОТО]";

/** Trip price in euros. Shown as «3150 €», without «від». */
export const PRICE_EUR = 3150;

/**
 * Machine-readable group dates (ISO YYYY-MM-DD) for the JSON-LD trip. Fill them together
 * with GROUP_1_DATES / GROUP_2_DATES; while empty, no dates are published to search engines.
 */
export const GROUP_1_ISO = { start: "", end: "" };
export const GROUP_2_ISO = { start: "", end: "" };

/* ---------- Derived (do not edit) */

/** True while a value still contains a «[…]» placeholder. */
export const isPlaceholder = (value: string): boolean => /\[[^\]]*\]/.test(value);

/**
 * Placeholders that keep the page out of search: while any is left, the page renders
 * <meta name="robots" content="noindex, follow"> and is left out of sitemap.xml
 * (scripts/write-seo.mjs). Both switch back on the next build once all are real.
 */
export const PENDING_PLACEHOLDERS: string[] = Object.entries({
  GROUP_1_DATES,
  GROUP_2_DATES,
  PARTICIPANT_AGE,
  MAX_GROUP_SIZE,
})
  .filter(([, value]) => isPlaceholder(value))
  .map(([name, value]) => `${name} = "${value}"`);

export const SEARCH_INDEXABLE = PENDING_PLACEHOLDERS.length === 0;

/** «13–17 років» → { min: 13, max: 17 }; null while it is a placeholder or has no range. */
export function ageRange(value: string): { min: number; max: number } | null {
  if (isPlaceholder(value)) return null;
  const match = value.match(/(\d{1,2})\D+(\d{1,2})/);
  return match ? { min: Number(match[1]), max: Number(match[2]) } : null;
}

/** «16» → 16; null while it is a placeholder or not a whole number. */
export function groupSize(value: string): number | null {
  return /^\s*\d+\s*$/.test(value) ? Number(value) : null;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** A group's ISO dates when both are filled in, else null. */
export function isoDates(dates: {
  start: string;
  end: string;
}): { start: string; end: string } | null {
  return ISO_DATE.test(dates.start) && ISO_DATE.test(dates.end) ? dates : null;
}
