import type { CSSProperties } from "react";
import { responsive } from "@/lib/responsive";
import sakuraSticker from "@/assets/korea/sticker-sakura.webp";
import markerArrow from "@/assets/korea/marker-arrow-red.svg";
import { LeadForm } from "./LeadForm";

const photoSignRooftop = responsive("photo-seoul-sign-rooftop");

const tilt = (deg: number) => ({ "--tilt": `${deg}deg` }) as CSSProperties;

/**
 * Final CTA from 10-form (#contact) with the lead form (#form).
 * Below lg (md–lg centred at 640 px): text, collage (350 × 370 px box), form.
 * From lg: two columns, text + collage (400 px box) left, form right.
 * Collage: top row spray + SEOUL polaroid side by side, bottom row note + arrow towards the form. The lime spray carries the page's only
 * «KOREA '27». The section clips its overflow, as in the reference.
 */
export function FinalCTA() {
  return (
    <section
      id="contact"
      className="kr-cv [--cv-h:1300px] lg:[--cv-h:835px] pk-paper overflow-hidden border-t border-line"
    >
      <div className="mx-auto flex flex-col gap-[18px] px-5 py-16 md:max-w-[680px] lg:grid lg:max-w-[1280px] lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-[18px] lg:gap-5">
          <p className="m-0 flex items-baseline gap-2.5 text-[14px] font-black tracking-[0.06em] text-ink-soft uppercase">
            <span lang="ko" className="font-kr text-[18px] font-normal tracking-normal text-ink">
              신청
            </span>
            <span>Заявка</span>
          </p>
          <h2 className="m-0 text-[30px] leading-[1.05] font-black tracking-[-0.01em] lg:text-[40px]">
            Хочете поїхати з нами до Кореї?
          </h2>
          <p className="m-0 text-[17px] leading-[1.55] text-ink-soft lg:max-w-[40ch] lg:text-[19px]">
            Залиште заявку — і ми звʼяжемося з вами, розкажемо деталі й допоможемо з усім: від
            квитків до візи.
          </p>

          <div className="relative my-1 h-[370px] md:w-[350px] lg:mt-4 lg:mb-0 lg:h-[400px] lg:w-auto">
            <div className="pk-spray absolute top-[6px] left-[-10px] box-border h-[190px] w-[250px] px-7 py-[26px] lg:top-0 lg:left-[-20px] lg:h-[250px] lg:w-[360px] lg:px-12 lg:py-10">
              <p className="pk-slogan text-center text-[54px] lg:text-[80px]">
                KOREA
                <br />
                &apos;27
              </p>
            </div>

            <figure
              className="pk-photo absolute top-[112px] right-[-4px] m-0 w-[200px] lg:top-[24px] lg:right-auto lg:left-[330px] lg:w-[250px]"
              style={tilt(4)}
            >
              <span className="pk-photo__tape" />
              <span className="pk-photo__paper">
                <img
                  src={photoSignRooftop.src}
                  srcSet={photoSignRooftop.srcSet}
                  sizes="(min-width: 1024px) 239px, 186px"
                  alt="Напис SEOUL на даху на тлі хмарочосів"
                  width={900}
                  height={759}
                  loading="lazy"
                  decoding="async"
                  className="block w-full"
                />
              </span>
            </figure>

            <img
              className="pk-sticker absolute top-[88px] right-[-6px] w-[54px] lg:top-[4px] lg:right-auto lg:left-[540px] lg:w-[72px]"
              src={sakuraSticker}
              alt=""
              width={226}
              height={226}
              loading="lazy"
              decoding="async"
              style={tilt(-10)}
            />

            <span
              className="pk-note absolute top-[296px] left-2 lg:top-[300px] lg:left-[60px] lg:text-[44px] lg:leading-[1.05]"
              style={tilt(-5)}
            >
              до зустрічі!
            </span>

            <img
              className="pk-mark top-[300px] left-[176px] w-[64px] rotate-[20deg] lg:top-[262px] lg:left-[300px] lg:w-[100px] lg:-rotate-[8deg]"
              src={markerArrow}
              alt=""
              width={240}
              height={180}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}
