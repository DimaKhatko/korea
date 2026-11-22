/**
 * Korea 2027 landing: the one place for trip data that is still pending from the client.
 * The bracketed placeholders stay visible on the page on purpose (see
 * _reference/korea-design/HANDOFF.md) until real values arrive; replace them here only.
 */

/** Trip dates as shown on the page (one group): Hero tag, About card, Price. */
export const TRIP_DATES = "21–30 березня 2027";

/** The same dates, machine-readable (ISO YYYY-MM-DD), for the JSON-LD trip. */
export const START_ISO = "2027-03-21";
export const END_ISO = "2027-03-30";

/** Participant age, shown as «Підлітки 10–20 років.» (en dash; parsed for the JSON-LD). */
export const PARTICIPANT_AGE = "10–20 років";

/**
 * Maximum group size: the number only. The About card renders «У групі до 20 учасників.»
 * and the JSON-LD reads the number (eligibleQuantity.maxValue).
 */
export const MAX_GROUP_SIZE = "20";

/** Slot for a PointCamp group photo in WhyUs, shown as «[ФОТО]» until the photo is supplied. */
export const GROUP_PHOTO = "[ФОТО]";

/** Trip price in euros. Shown as «3150 €», without «від». */
export const PRICE_EUR = 3150;

/**
 * Manual launch switch. While false, the page is noindex and left out of sitemap.xml even
 * when every value above is real. Flip it to true only on launch day, then rebuild.
 */
export const LAUNCHED = false;

/* ---------- Derived (do not edit) */

/** True while a value still contains a «[…]» placeholder. */
export const isPlaceholder = (value: string): boolean => /\[[^\]]*\]/.test(value);

/** Placeholders that are still in the data (each one keeps the page out of search). */
export const PENDING_PLACEHOLDERS: string[] = Object.entries({
  TRIP_DATES,
  PARTICIPANT_AGE,
  MAX_GROUP_SIZE,
})
  .filter(([, value]) => isPlaceholder(value))
  .map(([name, value]) => `${name} = "${value}"`);

/**
 * Why the page is kept out of search right now (empty when it is indexable). While any
 * reason applies, the page renders <meta name="robots" content="noindex, follow"> and is
 * left out of sitemap.xml (scripts/write-seo.mjs prints the reasons on every build).
 */
export const NOINDEX_REASONS: string[] = [
  ...(LAUNCHED ? [] : ["LAUNCHED = false (flip it to true only on launch day)"]),
  ...PENDING_PLACEHOLDERS.map((p) => `placeholder left: ${p}`),
];

export const SEARCH_INDEXABLE = NOINDEX_REASONS.length === 0;

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

/** Trip start/end for the JSON-LD when both are valid ISO dates, else null. */
export function tripDates(): { start: string; end: string } | null {
  return ISO_DATE.test(START_ISO) && ISO_DATE.test(END_ISO)
    ? { start: START_ISO, end: END_ISO }
    : null;
}
