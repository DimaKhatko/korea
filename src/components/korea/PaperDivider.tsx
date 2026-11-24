import type { CSSProperties } from "react";
import lattice from "@/assets/korea/lattice.svg";

/** Torn edge of the strip, copied from the section dividers in _reference/korea-design. */
const TORN_STRIP_CLIP =
  "polygon(0.0% 4.5%,2.5% 2.1%,5.0% 9.1%,7.5% 1.0%,10.0% 7.5%,12.5% 5.1%,15.0% 0.8%,17.5% 7.1%,20.0% 0.5%,22.5% 6.1%,25.0% 1.0%,27.5% 1.3%,30.0% 5.9%,32.5% 11.6%,35.0% 1.7%,37.5% 3.1%,40.0% 8.8%,42.5% 13.3%,45.0% 8.1%,47.5% 5.6%,50.0% 13.7%,52.5% 0.7%,55.0% 12.0%,57.5% 4.1%,60.0% 2.0%,62.5% 1.6%,65.0% 4.3%,67.5% 11.4%,70.0% 2.5%,72.5% 8.1%,75.0% 8.9%,77.5% 5.2%,80.0% 7.7%,82.5% 0.9%,85.0% 0.8%,87.5% 2.9%,90.0% 9.5%,92.5% 6.0%,95.0% 4.4%,97.5% 8.2%,100.0% 6.3%,100.0% 95.8%,97.5% 88.9%,95.0% 90.2%,92.5% 96.6%,90.0% 92.0%,87.5% 92.6%,85.0% 87.7%,82.5% 89.8%,80.0% 96.0%,77.5% 86.3%,75.0% 98.3%,72.5% 94.1%,70.0% 89.4%,67.5% 97.9%,65.0% 93.2%,62.5% 99.5%,60.0% 90.6%,57.5% 89.3%,55.0% 92.0%,52.5% 87.7%,50.0% 95.6%,47.5% 90.3%,45.0% 91.7%,42.5% 91.9%,40.0% 93.6%,37.5% 88.2%,35.0% 86.8%,32.5% 93.4%,30.0% 90.7%,27.5% 99.2%,25.0% 90.2%,22.5% 90.9%,20.0% 86.1%,17.5% 88.5%,15.0% 96.0%,12.5% 94.6%,10.0% 90.6%,7.5% 99.7%,5.0% 93.5%,2.5% 97.6%,0.0% 98.4%)";

type PaperDividerProps = {
  /** Sticker image import (heart, smiley, star, ...). All stickers are square. */
  sticker: string;
  /** Which end of the strip the sticker sits on. */
  side: "left" | "right";
};

/**
 * Torn paper strip with the lattice pattern and one sticker, pinned to the top of its
 * section (03-why-us, 04-reviews, 09-price). Decorative only. The host section must be
 * `relative` and have no top border.
 * Below lg: top 10 px, 30 px tall, 22 px pattern, 52 px sticker 22 px from the edge.
 * From lg: top 26 px, 40 px tall, 26 px pattern, 68 px sticker 12% from the edge.
 */
export function PaperDivider({ sticker, side }: PaperDividerProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-3 -left-3 top-[10px] h-[30px] lg:top-[26px] lg:h-10"
      style={{
        transform: "rotate(-0.8deg)",
        filter: "drop-shadow(0 3px 2px rgba(18, 18, 18, 0.18))",
      }}
    >
      <div
        className="absolute inset-0 bg-paper-light bg-[size:22px_22px] bg-[position:0_0] bg-repeat lg:bg-[size:26px_26px]"
        style={{ backgroundImage: `url(${lattice})`, clipPath: TORN_STRIP_CLIP }}
      />
      <img
        className={`pk-sticker absolute top-[-12px] w-[52px] lg:top-[-16px] lg:w-[68px] ${side === "right" ? "right-[22px] lg:right-[12%]" : "left-[22px] lg:left-[12%]"}`}
        src={sticker}
        alt=""
        width={256}
        height={256}
        loading="lazy"
        decoding="async"
        style={{ "--tilt": "12deg" } as CSSProperties}
      />
    </div>
  );
}
