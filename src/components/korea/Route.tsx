import type { CSSProperties } from "react";
import lattice from "@/assets/korea/lattice.svg";
import routeMap from "@/assets/korea/korea-route-map.svg";
import planeHolo from "@/assets/korea/plane-holo.webp";

/* ---------- Copy and data (edit here) */

/**
 * `plane`: plane sticker rotated by `tilt`; `ring`: 14 px ring dot. Transport (confirmed):
 * Сеул → Кьонджу KTX ≈2 год, Кьонджу → Пусан автобус ≈1,5–2 год, Пусан → Сеул KTX ≈2,5 год.
 */
type Leg =
  | { title: string; detail: string; marker: "plane"; tilt: number }
  | { title: string; detail: string; marker: "ring" };

const LEGS: Leg[] = [
  { title: "Приліт до Сеула", detail: "день 1", marker: "plane", tilt: 90 },
  { title: "Сеул → Кьонджу", detail: "KTX, близько 2 год · день 6", marker: "ring" },
  { title: "Кьонджу → Пусан", detail: "автобус, близько 1,5–2 год · день 6", marker: "ring" },
  { title: "Пусан → Сеул", detail: "KTX, близько 2,5 год · день 9", marker: "ring" },
  { title: "Виліт до Європи", detail: "день 10", marker: "plane", tilt: 0 },
];

/**
 * City labels over the map, positioned with the reference calc(% ± px) values
 * (percent of the map figure, px nudge off the city dot).
 */
const CITY_LABELS: { kr: string; name: string; position: CSSProperties }[] = [
  {
    kr: "서울",
    name: "Сеул",
    position: { left: "calc(32.98% + 16px)", top: "calc(23.56% - 44px)" },
  },
  {
    kr: "경주",
    name: "Кьонджу",
    position: { right: "calc(21.32% + 18px)", top: "calc(51.17% - 18px)" },
  },
  {
    kr: "부산",
    name: "Пусан",
    position: { right: "calc(24.36% + 8px)", top: "calc(62.1% + 16px)" },
  },
];

/**
 * KTX tag: reference position, except that on narrow maps (figure under ~377 px wide,
 * i.e. phones) it is lifted just enough to keep 4 px above the «Кьонджу» label
 * (label top 51.17% − 18 px, tag 32 px tall). The reference overlaps there by 1–5 px.
 * Wider maps get the exact reference value.
 */
const KTX_POSITION: CSSProperties = {
  left: "calc(54.31% - 34px)",
  top: "min(calc(42.83% - 14px), calc(51.17% - 54px))",
};

const MAP_ALT = "Карта Південної Кореї з маршрутом Сеул – Кьонджу – Пусан – Сеул";

const tilt = (deg: number) => ({ "--tilt": `${deg}deg` }) as CSSProperties;

/**
 * Route from 07-route (#route): intro, map card with overlays, legs list.
 * Below lg: text, list, map stacked (the left-column wrapper is `display: contents`, so the
 * map can sit between intro and list). From lg: text + list left, map right (max 520 px,
 * centred), both vertically centred. The map overlays repeat the list and are aria-hidden.
 */
export function Route() {
  return (
    <section id="route" className="pk-paper border-t border-line">
      <div className="mx-auto flex flex-col gap-5 px-5 py-16 md:max-w-[680px] lg:grid lg:max-w-[1280px] lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-24">
        <div className="contents lg:flex lg:flex-col lg:gap-[22px]">
          <div className="order-1 flex flex-col gap-5 lg:order-none lg:gap-[22px]">
            <p className="m-0 flex items-baseline gap-2.5 text-[14px] font-black tracking-[0.06em] text-ink-soft uppercase">
              <span lang="ko" className="font-kr text-[18px] font-normal tracking-normal text-ink">
                경로
              </span>
              <span>Маршрут</span>
            </p>
            <h2 className="m-0 text-[30px] leading-[1.05] font-black tracking-[-0.01em] lg:text-[40px]">
              Наш маршрут Кореєю
            </h2>
            <p className="m-0 text-[17px] leading-[1.55] text-ink-soft lg:text-[19px]">
              Сеул → Кьонджу → Пусан → Сеул. Сеул → Кьонджу і Пусан → Сеул — швидкісним потягом KTX,
              з Кьонджу до Пусана — автобусом. Найдовший переїзд — близько 2,5 години.
            </p>
          </div>

          <ol className="order-2 m-0 list-none border-t-2 border-ink p-0 lg:order-none lg:mt-2">
            {LEGS.map((leg) => (
              <li
                key={leg.title}
                className="grid grid-cols-[44px_1fr] items-center gap-3 border-b border-line py-3"
              >
                <span className="grid h-11 place-items-center">
                  {leg.marker === "plane" ? (
                    <img
                      className="pk-sticker w-11"
                      src={planeHolo}
                      alt=""
                      width={256}
                      height={256}
                      loading="lazy"
                      decoding="async"
                      style={tilt(leg.tilt)}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="box-content size-3.5 rounded-full border-[3px] border-ink bg-sticker"
                    />
                  )}
                </span>
                <span className="flex flex-col gap-0.5">
                  <strong className="text-[18px] font-black lg:text-[20px]">{leg.title}</strong>
                  <span className="text-[15px] text-ink-soft">{leg.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="order-3 lg:order-none lg:w-full lg:max-w-[520px] lg:justify-self-center">
          <div
            className="rounded-sm border-2 border-ink bg-paper-light bg-[size:26px_26px] bg-[position:0_0] bg-repeat px-3.5 pt-[18px] pb-1 shadow-hard"
            style={{ backgroundImage: `url(${lattice})` }}
          >
            <figure className="relative m-0 aspect-[600/783] w-full">
              <img
                src={routeMap}
                alt={MAP_ALT}
                width={600}
                height={783}
                loading="lazy"
                decoding="async"
                className="block size-full"
              />
              {CITY_LABELS.map((city) => (
                <span
                  key={city.kr}
                  aria-hidden="true"
                  className="absolute inline-flex items-baseline gap-1.5 rounded-sm border-2 border-ink bg-sticker px-2.5 py-[5px] whitespace-nowrap shadow-[3px_3px_0_#121212]"
                  style={city.position}
                >
                  <span lang="ko" className="font-kr text-[15px]">
                    {city.kr}
                  </span>
                  <span className="text-[16px] font-black">{city.name}</span>
                </span>
              ))}
              <span
                aria-hidden="true"
                className="pk-tag absolute border-ink bg-ink font-extrabold text-sticker"
                style={KTX_POSITION}
              >
                KTX
              </span>
              <img
                className="pk-sticker absolute top-[11.6%] left-0 w-14 lg:w-[72px]"
                src={planeHolo}
                alt=""
                width={256}
                height={256}
                loading="lazy"
                decoding="async"
                style={tilt(90)}
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
