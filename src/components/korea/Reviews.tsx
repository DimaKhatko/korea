import smileySticker from "@/assets/korea/sticker-smiley.png";
import { PaperDivider } from "./PaperDivider";
import { PaperStar } from "./PaperStar";
import { SnapRow } from "./SnapRow";

/* ---------- Copy and data (edit here) */

type Rating = {
  value: string;
  text: string;
  /** Read by screen readers instead of the visual value + text. */
  ariaLabel: string;
  /** Lime card showing five paper stars instead of the value. */
  stars?: boolean;
};

const RATINGS: Rating[] = [
  { value: "4,8", text: "Google Maps", ariaLabel: "4,8 — Google Maps" },
  { value: "98%", text: "рекомендують у Facebook", ariaLabel: "98% — рекомендують у Facebook" },
  {
    value: "5",
    text: "у кожній анкеті батьків після поїздки",
    ariaLabel: "5 зірок з 5",
    stars: true,
  },
];

/**
 * Real parent reviews, verbatim from the approved design (including the «)» smileys and «…»).
 * Never edit or correct them.
 */
const QUOTES: { text: string; author: string }[] = [
  {
    text: "Хлопці, від нашої родини вам велика подяка) Андрій у дикому захопленні від поїздки) я такого щасливого сина давно не бачила)",
    author: "Мама Андрія",
  },
  {
    text: "Дуже дякую за неймовірну подорож… за новий безцінний досвід, що отримав мій син. Дитина приїхала не тільки з новими враженнями та почуттями, а й з новою мотивацією до життя.",
    author: "Мама учасника",
  },
  {
    text: "Хороша організація, класна команда. Вдячна за підхід і турботу про сина",
    author: "Уляна, мама Матвія",
  },
  {
    text: "Вже другий тиждень розповідає щось нове",
    author: "Ольга, мама Юлії",
  },
];

/** Fixed tilts of the five rating stars (deterministic for prerender + hydration). */
const STAR_TILTS = [-8, 5, -3, 7, -5];

const CHANGES_TITLE = "Що помітили батьки: після поїздки дитина…";

const CHANGES: string[] = [
  "стала самостійнішою",
  "стала впевненішою в собі",
  "знайшла нових друзів",
  "більше говорить англійською",
  "має нові звички: порядок, ввічливість, нова їжа",
  "має нові мрії та цілі",
];

/**
 * Reviews from 04-reviews (#reviews): divider with the smiley, ratings, quotes, sakura tags.
 * Below lg: ratings stacked, quotes in a SnapRow (300 px cards, the next one peeks).
 * From lg: ratings in 3 columns, quotes 2×2.
 */
export function Reviews() {
  return (
    <section id="reviews" className="pk-paper relative">
      <PaperDivider sticker={smileySticker} side="left" />
      <div className="mx-auto flex flex-col gap-5 py-16 md:max-w-[680px] lg:max-w-[1280px] lg:gap-10 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-5 px-5 lg:max-w-[760px] lg:px-0">
          <p className="m-0 flex items-baseline gap-2.5 text-[14px] font-black tracking-[0.06em] text-ink-soft uppercase">
            <span lang="ko" className="font-kr text-[18px] font-normal tracking-normal text-ink">
              후기
            </span>
            <span>Відгуки</span>
          </p>
          <h2 className="m-0 text-[30px] leading-[1.05] font-black tracking-[-0.01em] lg:text-[40px]">
            Що кажуть батьки після наших поїздок
          </h2>
          <p className="m-0 text-[17px] leading-[1.55] text-ink-soft lg:text-[19px]">
            Відгуки батьків і оцінки з анкет, які родини заповнюють після кожної поїздки.
          </p>
        </div>

        <div className="flex flex-col gap-3 px-5 lg:grid lg:grid-cols-3 lg:gap-6 lg:px-0">
          {RATINGS.map((rating) => (
            <article
              key={rating.value}
              aria-label={rating.ariaLabel}
              className={`pk-card flex items-center gap-4 px-[18px] py-4 lg:px-6 lg:py-5 ${rating.stars ? "bg-lime" : ""}`}
            >
              <p
                aria-hidden="true"
                className="m-0 flex flex-none items-center text-[36px] leading-none font-black tracking-[-0.02em] lg:text-[48px]"
              >
                {rating.stars
                  ? STAR_TILTS.map((deg, i) => (
                      <PaperStar
                        key={i}
                        tilt={deg}
                        delayMs={i * 90}
                        className="-mr-0.5 size-[27px] lg:size-[34px]"
                      />
                    ))
                  : rating.value}
              </p>
              <p className="m-0 text-[15px] leading-[1.35] font-bold">{rating.text}</p>
            </article>
          ))}
        </div>

        <SnapRow label="Відгуки батьків, гортайте вбік" gridClassName="lg:grid-cols-2 lg:gap-6">
          {QUOTES.map((quote) => (
            <figure
              key={quote.author}
              className="pk-card relative m-0 box-border flex w-[300px] flex-none snap-start flex-col gap-[14px] overflow-visible p-6 lg:w-auto"
            >
              <span
                className="pk-photo__tape top-[-16px] right-6 left-auto h-[30px] w-24"
                aria-hidden="true"
              />
              <span aria-hidden="true" className="h-6 text-[56px] leading-[0.6] font-black">
                “
              </span>
              <blockquote className="m-0 text-[16px] leading-[1.5] font-medium lg:text-[18px]">
                {quote.text}
              </blockquote>
              <figcaption className="mt-auto text-[15px] font-extrabold text-ink-soft">
                — {quote.author}
              </figcaption>
            </figure>
          ))}
        </SnapRow>

        <div className="flex flex-col gap-3 px-5 lg:gap-[14px] lg:px-0">
          <p className="m-0 text-[14px] font-black tracking-[0.06em] uppercase">{CHANGES_TITLE}</p>
          <div className="flex flex-wrap gap-2 lg:gap-2.5">
            {CHANGES.map((change) => (
              <span key={change} className="pk-tag pk-tag--sakura min-h-[34px] text-[15px]">
                {change}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
