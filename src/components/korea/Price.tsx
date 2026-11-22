import starSticker from "@/assets/korea/sticker-star-holo.png";
import { GROUP_1_DATES, GROUP_2_DATES, PRICE_EUR } from "@/lib/korea";
import { PaperDivider } from "./PaperDivider";

/* ---------- Copy and data (edit here) */

const COPY = {
  duration: "10 днів, 9 ночей",
  cta: "Забронювати місце",
  /** Small note under the button; the client may change it. */
  ctaNote:
    "Залиште заявку — ми зателефонуємо, розповімо про умови бронювання й відповімо на питання.",
};

const INCLUDED: string[] = [
  "Проживання у 2–3-місних номерах, 3–4 готелі",
  "Сніданки та ще один прийом їжі щодня",
  "Страхування",
  "Весь транспорт у Кореї, включно з KTX",
  "Усі вхідні квитки за програмою",
  "Прокат ханбоку",
  "Мерч PointCamp",
  "Щонайменше троє дорослих PointCamp і перекладач Корейсько-українського центру",
];

/** `note`: the smaller grey line under the item (amounts). */
const EXTRA: { text: string; note?: string }[] = [
  { text: "Переліт", note: "від 1200 €" },
  { text: "Оформлення візи" },
  { text: "Кишенькові", note: "близько 300 €" },
  { text: "Дорога до міста вильоту і назад", note: "Київ – Будапешт / Варшава, близько 310 €" },
];

/**
 * Price from 09-price (#price): star divider, price card and two clean list cards (no
 * collage). Below md: stacked. md–lg: price card full width, the two lists side by side.
 * From lg: one row, columns 0.9fr 1.15fr 1fr.
 */
export function Price() {
  return (
    <section id="price" className="pk-paper relative">
      <PaperDivider sticker={starSticker} side="right" />
      <div className="mx-auto flex flex-col gap-5 px-5 py-16 md:max-w-[680px] lg:max-w-[1280px] lg:gap-10 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-5 lg:max-w-[760px]">
          <p className="m-0 flex items-baseline gap-2.5 text-[14px] font-black tracking-[0.06em] text-ink-soft uppercase">
            <span lang="ko" className="font-kr text-[18px] font-normal tracking-normal text-ink">
              가격
            </span>
            <span>Вартість</span>
          </p>
          <h2 className="m-0 text-[30px] leading-[1.05] font-black tracking-[-0.01em] lg:text-[40px]">
            Одна ціна — і вся програма в Кореї
          </h2>
        </div>

        <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:items-start md:gap-6 lg:grid-cols-[0.9fr_1.15fr_1fr]">
          <div className="pk-card flex flex-col gap-4 px-6 py-7 md:col-span-2 lg:col-span-1">
            <p className="m-0 text-[14px] font-black tracking-[0.06em] text-ink-soft uppercase">
              {COPY.duration}
            </p>
            <p className="pk-price m-0 text-[52px] whitespace-nowrap lg:text-[64px]">{`${PRICE_EUR} €`}</p>
            <div className="flex flex-col gap-2 text-[15px] leading-[1.5] text-ink-soft">
              <span>
                <strong className="text-ink">Група 1:</strong> {GROUP_1_DATES}
              </span>
              <span>
                <strong className="text-ink">Група 2:</strong> {GROUP_2_DATES}
              </span>
            </div>
            <a className="pk-btn box-border min-h-14 w-full" href="#form">
              {COPY.cta}
            </a>
            <p className="m-0 text-[13px] leading-[1.45] font-semibold text-ink-soft">
              {COPY.ctaNote}
            </p>
          </div>

          <div className="pk-card p-6">
            <h3 className="m-0 mb-[18px] text-[22px] font-black">Входить у вартість</h3>
            <ul className="pk-list">
              {INCLUDED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="pk-card p-6">
            <h3 className="m-0 mb-[18px] text-[22px] font-black">Оплачується окремо</h3>
            <ul className="pk-list pk-list--extra">
              {EXTRA.map((item) => (
                <li key={item.text}>
                  {item.text}
                  {item.note && <small>{item.note}</small>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
