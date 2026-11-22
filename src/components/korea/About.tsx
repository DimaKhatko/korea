import type { CSSProperties } from "react";
import planeHolo from "@/assets/korea/plane-holo.png";
import photoHanRiver from "@/assets/korea/photo-seoul-han-river.webp";
import photoGyeongjuTombs from "@/assets/korea/photo-gyeongju-tombs.webp";
import photoArteMuseum from "@/assets/korea/photo-busan-arte-museum.webp";
import { MAX_GROUP_SIZE, PARTICIPANT_AGE, TRIP_DATES } from "@/lib/korea";

/* ---------- Copy and data (edit here) */

type Fact = { glyph: string; title: string; text: string; lime?: boolean };

const FACTS: Fact[] = [
  {
    glyph: "날",
    title: "10 днів, 9 ночей",
    text: `Весняні канікули: ${TRIP_DATES}.`,
    lime: true,
  },
  { glyph: "길", title: "3 міста", text: "Між містами їдемо швидкісним потягом KTX." },
  {
    glyph: "누구",
    title: "Для кого",
    text: `Підлітки ${PARTICIPANT_AGE}. У групі до ${MAX_GROUP_SIZE} учасників.`,
  },
  {
    glyph: "팀",
    title: "Команда",
    text: "Щонайменше троє дорослих весь час із групою, серед них — наша людина в Кореї.",
  },
];

/** `plane`: plane sticker rotated by `tilt`; `dot`: 18 px city dot, `filled` = ink. */
type Stop =
  | { name: string; when: string; marker: "plane"; tilt: number }
  | { name: string; when: string; marker: "dot"; filled: boolean };

const STOPS: Stop[] = [
  { name: "Приліт", when: "день 1, Сеул", marker: "plane", tilt: 90 },
  { name: "Сеул", when: "дні 1–5", marker: "dot", filled: true },
  { name: "Кенджу", when: "день 6", marker: "dot", filled: false },
  { name: "Пусан", when: "дні 7–8", marker: "dot", filled: false },
  { name: "Сеул", when: "дні 9–10", marker: "dot", filled: true },
  { name: "Виліт", when: "день 10, до Європи", marker: "plane", tilt: 0 },
];

type Photo = { src: string; width: number; height: number; alt: string; label: string };

const PHOTOS: Photo[] = [
  {
    src: photoHanRiver,
    width: 1000,
    height: 255,
    alt: "Сеул: річка Хан і квартали на тлі гір",
    label: "Сеул",
  },
  {
    src: photoGyeongjuTombs,
    width: 1060,
    height: 570,
    alt: "Кенджу: пагорби-гробниці королів Сілла",
    label: "Кенджу",
  },
  {
    src: photoArteMuseum,
    width: 640,
    height: 520,
    alt: "Зал ARTE Museum Busan з проєкціями квітів",
    label: "Пусан",
  },
];

const tilt = (deg: number) => ({ "--tilt": `${deg}deg` }) as CSSProperties;

/**
 * About from 02-about (#about): intro + 4 fact cards, route card, photo strip.
 * The route line is a background gradient on the list, from the first marker centre to
 * the last: vertical below lg (x 26.5 px), horizontal across 6 equal columns from lg
 * (y 26.5 px, length 5/6 of the row + 13 px, i.e. 5 columns + 5 gaps of 16 px).
 */
export function About() {
  return (
    <section id="about" className="pk-paper border-t border-line">
      <div className="mx-auto flex flex-col gap-5 px-5 py-16 md:max-w-[680px] lg:max-w-[1280px] lg:gap-10 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="flex flex-col gap-5">
            <p className="m-0 flex items-baseline gap-2.5 text-[14px] font-black tracking-[0.06em] text-ink-soft uppercase">
              <span lang="ko" className="font-kr text-[18px] font-normal tracking-normal text-ink">
                소개
              </span>
              <span>Про подорож</span>
            </p>
            <h2 className="m-0 text-[30px] leading-[1.05] font-black tracking-[-0.01em] lg:text-[40px]">
              Сеул, Кенджу і Пусан за 10 днів
            </h2>
            <p className="m-0 text-[17px] leading-[1.55] text-ink-soft lg:max-w-[40ch] lg:text-[19px]">
              Повне занурення у світ дорам, K-pop, футуристичних технологій та стародавніх традицій.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:gap-6">
            {FACTS.map((fact) => (
              <article
                key={fact.glyph}
                className={`pk-card flex flex-col gap-2 p-4 lg:p-6 ${fact.lime ? "bg-lime" : ""}`}
              >
                <span
                  lang="ko"
                  aria-hidden="true"
                  className="font-kr text-[28px] leading-none lg:text-[32px]"
                >
                  {fact.glyph}
                </span>
                <h3 className="m-0 text-[20px] leading-[1.1] font-black tracking-[-0.01em] lg:text-[26px]">
                  {fact.title}
                </h3>
                <p
                  className={`m-0 text-[14px] leading-[1.5] lg:text-[16px] ${fact.lime ? "text-ink" : "text-ink-soft"}`}
                >
                  {fact.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-sm border-2 border-ink bg-sticker p-5 lg:gap-[18px] lg:px-7 lg:py-6">
          <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-baseline lg:justify-between lg:gap-4">
            <p className="m-0 mb-1 text-[14px] font-black tracking-[0.06em] uppercase lg:mb-0">
              Маршрут
            </p>
            <p className="m-0 mb-4 text-[14px] text-ink-soft lg:mb-0 lg:text-[15px]">
              Між містами — швидкісний потяг KTX
            </p>
          </div>
          <ol className="m-0 flex list-none flex-col gap-1.5 bg-[linear-gradient(#121212,#121212)] bg-[size:3px_calc(100%_-_56px)] bg-[position:26.5px_28px] bg-no-repeat p-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:bg-[size:calc(83.333%_+_13px)_3px] lg:bg-[position:28px_26.5px]">
            {STOPS.map((stop, i) => (
              <li key={i} className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2.5">
                <span className="grid size-14 flex-none place-items-center">
                  {stop.marker === "plane" ? (
                    <img
                      className="pk-sticker block w-14"
                      src={planeHolo}
                      alt=""
                      width={256}
                      height={256}
                      loading="lazy"
                      style={tilt(stop.tilt)}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className={`size-[18px] flex-none rounded-full border-[3px] border-ink ${stop.filled ? "bg-ink" : "bg-sticker"}`}
                    />
                  )}
                </span>
                <span className="text-[20px] font-black lg:text-[22px] lg:leading-[1.1]">
                  {stop.name}
                </span>
                <span className="text-[15px] text-ink-soft">{stop.when}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-[2fr_1fr_1fr] lg:gap-6">
          {PHOTOS.map((photo, i) => (
            <figure
              key={photo.label}
              className={`relative m-0 box-content overflow-hidden rounded-sm border-2 border-ink bg-paper-light lg:aspect-auto lg:h-[300px] ${i === 0 ? "col-span-full aspect-video lg:col-span-1" : "aspect-square"}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                className="block size-full object-cover"
              />
              <figcaption
                className="pk-label pk-label--ink absolute bottom-3 left-3"
                style={tilt(-3)}
              >
                <span className="px-[14px] py-2 text-[15px]">{photo.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
