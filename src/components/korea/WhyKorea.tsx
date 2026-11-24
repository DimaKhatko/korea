import type { CSSProperties } from "react";
import { responsive, type Responsive } from "@/lib/responsive";
import { SnapRow } from "./SnapRow";

/* ---------- Copy and data (edit here) */

type Card = {
  /** Small Korean word above the title (decorative, aria-hidden). */
  kr: string;
  title: string;
  text: string;
  /** Tilted paper label on the photo. */
  label: string;
  labelTone: "lime" | "ink";
  photo: { img: Responsive; alt: string };
};

const CARDS: Card[] = [
  {
    kr: "케이팝",
    title: "K-pop",
    text: "Пробуємо себе в K-pop в AR-залах HiKR Ground, заходимо в KWANGYA від SM і гуляємо Гангнамом.",
    label: "K-pop в AR",
    labelTone: "lime",
    photo: {
      img: responsive("photo-seoul-neon-street"),
      alt: "Вечірня вулиця Сеула з неоновими вивісками",
    },
  },
  {
    kr: "전통",
    title: "Стародавні традиції",
    text: "Фотосесія в ханбоках біля палацу Кьонбоккун, прогулянка ханоковим селом Пукчхон і день у Кьонджу — стародавній столиці королівства Сілла.",
    label: "Ханбоки",
    labelTone: "ink",
    photo: {
      img: responsive("photo-seoul-gwanghwamun"),
      alt: "Брама Кванхвамун палацу Кьонбоккун",
    },
  },
  {
    kr: "미래",
    title: "Місто майбутнього",
    text: "Бібліотека Starfield у COEX, 100-й поверх Busan X the Sky і цифрові зали ARTE Museum.",
    label: "100-й поверх",
    labelTone: "ink",
    photo: {
      img: responsive("photo-seoul-sign-rooftop"),
      alt: "Напис SEOUL на даху на тлі хмарочосів",
    },
  },
  {
    kr: "음식",
    title: "Їжа і шопінг",
    text: "K-BBQ, ттокпоккі, пуноппан — вафлі-рибки — і десерти з матчі. Канцелярія, косметика і K-pop альбоми.",
    label: "Стріт-фуд",
    labelTone: "ink",
    photo: {
      img: responsive("photo-seoul-street-food"),
      alt: "Корн-доги й пиріжки на вуличному лотку в Сеулі",
    },
  },
];

const tilt = (deg: number) => ({ "--tilt": `${deg}deg` }) as CSSProperties;

/**
 * Why-Korea from 05-why-korea (#why-korea): intro and four photo cards (pk-card pk-day).
 * Below md: SnapRow with 290 px cards. md–lg: 2 columns. From lg: 4 columns.
 * (The reference desktop file switches to 1 column under 640 px; that width is covered by
 * the mobile row here.)
 */
export function WhyKorea() {
  return (
    <section
      id="why-korea"
      className="pk-paper border-t border-line"
    >
      <div className="mx-auto flex flex-col gap-5 py-16 md:max-w-[680px] md:px-5 lg:max-w-[1280px] lg:gap-12 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-5 px-5 md:px-0 lg:max-w-[760px]">
          <p className="m-0 flex items-baseline gap-2.5 text-[14px] font-black tracking-[0.06em] text-ink-soft uppercase">
            <span lang="ko" className="font-kr text-[18px] font-normal tracking-normal text-ink">
              왜 한국
            </span>
            <span>Чому Корея</span>
          </p>
          <h2 className="m-0 text-[30px] leading-[1.05] font-black tracking-[-0.01em] lg:text-[40px]">
            Корея, яку ваша дитина знає з дорам і K-pop
          </h2>
          {/* 917 px wide from lg, wider than its 760 px block, as in the desktop reference. */}
          <p className="m-0 text-[17px] leading-[1.55] text-ink-soft lg:w-[917px] lg:text-[19px]">
            Палаци XIV століття тут стоять поруч із хмарочосами, а вулична їжа — частина програми.
          </p>
        </div>

        <SnapRow
          label="Чому Корея, гортайте вбік"
          breakpoint="md"
          gridClassName="md:grid-cols-2 md:gap-6 lg:grid-cols-4"
        >
          {CARDS.map((card) => (
            <article
              key={card.kr}
              className="pk-card pk-day w-[290px] flex-none snap-start md:w-auto"
            >
              <div className="pk-day__media">
                <img
                  src={card.photo.img.src}
                  srcSet={card.photo.img.srcSet}
                  sizes="(min-width: 1024px) 278px, (min-width: 768px) 304px, 290px"
                  alt={card.photo.alt}
                  width={card.photo.img.width}
                  height={card.photo.img.height}
                  loading="lazy"
                  decoding="async"
                />
                <span
                  className={`pk-label ${card.labelTone === "lime" ? "pk-label--lime" : "pk-label--ink"}`}
                  style={tilt(-3)}
                >
                  <span className="px-[14px] py-2 text-[15px]">{card.label}</span>
                </span>
              </div>
              <div className="pk-day__body px-5 pt-[18px] pb-[22px]">
                <div className="pk-day__kr" lang="ko" aria-hidden="true">
                  {card.kr}
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </SnapRow>
      </div>
    </section>
  );
}
