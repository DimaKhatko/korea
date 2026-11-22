import type { CSSProperties } from "react";
import photoSignRooftop from "@/assets/korea/photo-seoul-sign-rooftop.webp";
import sakuraSticker from "@/assets/korea/sticker-sakura.png";
import markerArrow from "@/assets/korea/marker-arrow-red.svg";
import { LeadForm } from "./LeadForm";

const tilt = (deg: number) => ({ "--tilt": `${deg}deg` }) as CSSProperties;

/**
 * Final CTA from 10-form (#contact) with the lead form (#form).
 * Below lg (md–lg centred at 640 px): text, collage (350 × 340 px box), form.
 * From lg: two columns, text + collage (420 px box) left, form right.
 * Collage pieces keep the reference px positions. The lime spray carries the page's only
 * «KOREA '27». The section clips its overflow, as in the reference.
 */
export function FinalCTA() {
  return (
    <section id="contact" className="pk-paper overflow-hidden border-t border-line">
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

          <div className="relative my-1 h-[340px] md:w-[350px] lg:mt-2 lg:mb-0 lg:h-[420px] lg:w-auto">
            <div className="pk-spray absolute top-[10px] left-[-10px] box-border h-[210px] w-[300px] px-9 py-[30px] lg:top-5 lg:left-[-20px] lg:h-[300px] lg:w-[460px] lg:px-[72px] lg:py-14">
              <p className="pk-slogan text-center text-[64px] lg:text-[96px]">
                KOREA
                <br />
                &apos;27
              </p>
            </div>

            <figure
              className="pk-photo absolute top-[150px] right-[-6px] m-0 w-[120px] lg:top-[170px] lg:right-auto lg:left-[490px] lg:w-[140px]"
              style={tilt(5)}
            >
              <span className="pk-photo__tape" />
              <span className="pk-photo__paper">
                <img
                  src={photoSignRooftop}
                  alt="Напис SEOUL на даху на тлі хмарочосів"
                  width={320}
                  height={270}
                  loading="lazy"
                  className="block w-full"
                />
              </span>
            </figure>

            <img
              className="pk-sticker absolute top-[118px] right-[70px] w-[60px] lg:top-24 lg:right-auto lg:left-[520px] lg:w-20"
              src={sakuraSticker}
              alt=""
              width={226}
              height={226}
              loading="lazy"
              style={tilt(-10)}
            />

            <span
              className="pk-note absolute top-[262px] left-5 lg:top-[330px] lg:left-[260px] lg:text-[44px] lg:leading-[1.05]"
              style={tilt(-5)}
            >
              до зустрічі!
            </span>

            <img
              className="pk-mark top-[262px] left-[170px] w-[76px] rotate-[60deg] lg:top-[300px] lg:left-[470px] lg:w-[110px] lg:-rotate-[8deg]"
              src={markerArrow}
              alt=""
              width={240}
              height={180}
            />
          </div>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}
