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
 * Maximum group size: the number only. The About card renders «У групі до 15 учасників.»
 * and the JSON-LD reads the number (eligibleQuantity.maxValue).
 */
export const MAX_GROUP_SIZE = "15";

/** Trip price in euros. Shown as «3150 €», without «від». */
export const PRICE_EUR = 3150;

/** Paid separately (Price «Оплачується окремо»; also the JSON-LD Offer description). */
export const PRICE_EXTRAS: { text: string; note?: string }[] = [
  { text: "Переліт", note: "від 1200 €" },
  { text: "Оформлення візи — 100 €" },
  { text: "Кишенькові", note: "близько 300 €, включно з одним прийомом їжі на день і сувенірами" },
  {
    text: "Дорога до міста вильоту і назад",
    note: "Київ – Будапешт / Варшава, близько 310 €, з ночівлею в готелі й супроводом",
  },
];

/* ---------- Page copy reused by the page, meta tags and JSON-LD (one source each) */

/** Hero <h1>; also the JSON-LD Event name. */
export const TRIP_TITLE = "Весняні канікули в Південній Кореї для підлітків та молоді";

/** Hero lead under the h1; also the JSON-LD Event description. */
export const TRIP_SUMMARY = `10 днів у Кореї: Сеул, Кьонджу і Пусан. Група до ${MAX_GROUP_SIZE} учасників, з нею щонайменше троє дорослих, серед них — наша людина в Кореї.`;

/** <title>, og:title, twitter:title, WebPage name. */
export const PAGE_TITLE = "Весняні канікули в Кореї для підлітків 2027 | PointCamp";

/** Meta description (≤ 160 characters), og/twitter description, WebPage description. */
export const PAGE_DESCRIPTION = `Весняні канікули 2027 у Південній Кореї для підлітків та молоді: 10 днів у Сеулі, Кьонджу й Пусані, група до ${MAX_GROUP_SIZE} учасників, 3150 €. 21–30 березня.`;

/** Cities of the route (JSON-LD Event locations), in order of the first visit. */
export const CITIES: { name: string; alternateName: string }[] = [
  { name: "Сеул", alternateName: "Seoul" },
  { name: "Кьонджу", alternateName: "Gyeongju" },
  { name: "Пусан", alternateName: "Busan" },
];

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
