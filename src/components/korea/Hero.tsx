import type { CSSProperties } from "react";
import photoHanbok from "@/assets/korea/photo-seoul-hanbok.webp";
import photoHaeundae from "@/assets/korea/photo-busan-haeundae.webp";
import stamp10Days from "@/assets/korea/stamp-10-days.png";
import markerArrow from "@/assets/korea/marker-arrow-red.svg";
import { PRICE_EUR, TRIP_DATES, TRIP_SUMMARY, TRIP_TITLE } from "@/lib/korea";

/**
 * No orphans in the wrapped h1: a one-letter preposition stays with the next word and the
 * last two words stay together (no-break spaces; the source text keeps plain spaces).
 */
const keepTogether = (text: string) =>
  text.replace(/ ([ввзуаіо]) /gi, " $1\u00a0").replace(/ (\S+)$/, "\u00a0$1");

/** Per-element tilt for pk-* collage pieces (they rotate by var(--tilt)). */
const tilt = (deg: number) => ({ "--tilt": `${deg}deg` }) as CSSProperties;

/**
 * Hero from 01-header-hero (#top).
 * Below lg: one column (centred, max 640 px content from md), collage under the buttons.
 * From lg: two columns, collage on the right. Collage pieces keep the reference px
 * positions inside a fixed-height relative box (330 px mobile, 640 px desktop).
 * The paper texture is offset by the header height so it continues the header's tile,
 * as in the reference where header and hero share one background.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="pk-paper overflow-x-clip bg-[position:0_-75px] lg:min-h-[786px] lg:bg-[position:0_-94px]"
    >
      <div className="mx-auto flex flex-col gap-4 px-5 pt-6 pb-16 md:max-w-[680px] lg:grid lg:max-w-[1280px] lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:px-10 lg:pt-8 lg:pb-24">
        <div className="flex flex-col gap-4 lg:gap-[22px]">
          <span className="pk-label self-start" style={tilt(-2)}>
            <span className="px-[14px] py-2 text-[15px] lg:px-5 lg:py-[10px] lg:text-[18px]">
              Березень 2027
            </span>
          </span>

          <p className="pk-kr text-[88px] lg:text-[120px]" lang="ko">
            한국
          </p>

          <h1 className="m-0 text-[36px] leading-[1.05] font-black tracking-[-0.02em] lg:text-[56px] lg:leading-[1.02]">
            {keepTogether(TRIP_TITLE)}
          </h1>

          <p className="m-0 text-[17px] leading-[1.55] text-ink-soft lg:max-w-[36ch] lg:text-[19px]">
            {TRIP_SUMMARY}
          </p>

          <div className="flex flex-wrap gap-2 lg:gap-2.5">
            <span className="pk-tag">Сеул – Кьонджу – Пусан – Сеул</span>
            <span className="pk-tag">{TRIP_DATES}</span>
          </div>

          <div className="mt-1 flex flex-col gap-1.5 lg:flex-row lg:flex-wrap lg:items-baseline lg:gap-3.5">
            <span className="text-[40px] leading-none font-black tracking-[-0.02em] lg:text-[44px]">
              {PRICE_EUR}&nbsp;€
            </span>
            <span className="text-[15px] leading-[1.45] text-ink-soft">
              у Кореї все включено. Окремо: переліт, віза, трансфер.
            </span>
          </div>

          <div className="mt-1 flex flex-col gap-3 lg:mt-0 lg:flex-row lg:flex-wrap lg:gap-4">
            <a
              className="pk-btn box-border min-h-14 w-full lg:box-content lg:min-h-[52px] lg:w-auto"
              href="#form"
            >
              Залишити заявку
            </a>
            <a
              className="pk-btn pk-btn--ghost box-border w-full lg:box-content lg:w-auto"
              href="#program"
            >
              Програма по днях
            </a>
          </div>
        </div>

        <div className="relative mt-4 h-[430px] lg:mt-0 lg:h-[640px]">
          <figure
            className="pk-photo absolute top-[24px] left-[4px] m-0 w-[300px] lg:top-[30px] lg:left-[10px] lg:w-[400px]"
            style={tilt(-3)}
          >
            <span className="pk-photo__tape" />
            <span className="pk-photo__paper">
              <img
                src={photoHanbok}
                alt="Дівчата в ханбоках біля палацу Кьонбоккун"
                width={700}
                height={360}
                loading="eager"
                fetchPriority="high"
              />
            </span>
          </figure>

          <figure
            className="pk-photo pk-photo--b absolute top-[196px] right-0 m-0 w-[236px] lg:hidden"
            style={tilt(4)}
          >
            <span className="pk-photo__tape" />
            <span className="pk-photo__paper">
              <img
                src={photoHaeundae}
                alt="Пляж Хеунде в Пусані і хмарочоси над ним"
                width={440}
                height={330}
                loading="lazy"
                className="aspect-[4/3] object-cover object-[50%_35%]"
              />
            </span>
          </figure>

          <figure
            className="pk-photo pk-photo--b absolute top-[270px] left-[280px] m-0 hidden w-[300px] lg:block"
            style={tilt(4)}
          >
            <span className="pk-photo__tape" />
            <span className="pk-photo__paper h-[337px]">
              <img
                src={photoHaeundae}
                alt="Пляж Хеунде в Пусані і хмарочоси над ним"
                width={440}
                height={480}
                loading="lazy"
              />
              <span className="pk-photo__caption text-center">Пусан, пляж Хеунде</span>
            </span>
          </figure>

          <img
            className="pk-mark top-[214px] left-[10px] w-[90px] lg:top-[232px] lg:left-[87px] lg:w-[140px]"
            src={markerArrow}
            alt=""
            width={240}
            height={180}
            style={{ transform: "rotate(-60deg)" }}
          />

          <span
            className="pk-note absolute top-[300px] left-0 lg:top-[372px] lg:left-[130px]"
            style={tilt(-6)}
          >
            ханбоки!
          </span>

          <img
            className="pk-sticker absolute top-0 left-[236px] w-[112px] lg:left-[390px] lg:w-[150px]"
            src={stamp10Days}
            alt=""
            width={260}
            height={260}
            style={tilt(10)}
          />
        </div>
      </div>
    </section>
  );
}
