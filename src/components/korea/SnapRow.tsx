import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

/** Tailwind breakpoints (rem, like Tailwind's own media queries). */
const BREAKPOINT_QUERY = { md: "(min-width: 48rem)", lg: "(min-width: 64rem)" } as const;

/** Classes that turn the row back into a plain grid from the breakpoint up (static for Tailwind). */
const GRID_FROM = {
  md: "md:mt-0 md:grid md:snap-none md:overflow-visible md:p-0",
  lg: "lg:mt-0 lg:grid lg:snap-none lg:overflow-visible lg:p-0",
} as const;

/** Hides the scroll controls from the breakpoint (static for Tailwind). */
const HIDE_FROM = { md: "md:hidden", lg: "lg:hidden" } as const;

type ScrollState = { ratio: number; pos: number; atStart: boolean; atEnd: boolean };

type SnapRowProps = {
  /** Accessible name of the scroll region below the breakpoint, e.g. «Відгуки батьків, гортайте вбік». */
  label: string;
  /** Below it: horizontal scroll-snap row. From it: grid. Default `lg`. */
  breakpoint?: keyof typeof BREAKPOINT_QUERY;
  /** Grid columns and gap from the breakpoint, e.g. "lg:grid-cols-2 lg:gap-6". */
  gridClassName?: string;
  children: ReactNode;
};

/**
 * Mobile horizontal scroll-snap row (reference: 04-reviews, 05-why-korea). Children set
 * their own width plus `flex-none snap-start`.
 *
 * Below the breakpoint it is a keyboard-scrollable region (tabIndex 0, role="region",
 * aria-label). From the breakpoint it is a plain grid without those attributes. The
 * prerendered HTML carries the mobile attributes; they are dropped after hydration on wide
 * screens. Only attributes change, so there is no layout shift.
 *
 * Below the breakpoint a control bar sits under the row: a progress track (thumb = visible
 * share of the row, moves with the scroll) and prev / next buttons that scroll by one card.
 * It tells parents the cards scroll sideways; it is hidden from the breakpoint.
 *
 * Spacing: the reference row has 8 px top padding, which clips the tape on Reviews cards.
 * Here it is 22 px (the rotated tape reaches about 21 px above a card) with a −14 px top
 * margin, so the cards stay exactly where the reference puts them.
 */
export function SnapRow({ label, breakpoint = "lg", gridClassName = "", children }: SnapRowProps) {
  const isGrid = useMediaQuery(BREAKPOINT_QUERY[breakpoint], false);
  const regionProps = isGrid ? {} : ({ role: "region", "aria-label": label, tabIndex: 0 } as const);
  const rowRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<ScrollState>({
    ratio: 0.3,
    pos: 0,
    atStart: true,
    atEnd: false,
  });

  useEffect(() => {
    const el = rowRef.current;
    if (!el || isGrid) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setScroll({
        ratio: Math.min(1, el.clientWidth / el.scrollWidth),
        pos: max > 0 ? el.scrollLeft / max : 0,
        atStart: el.scrollLeft <= 4,
        atEnd: el.scrollLeft >= max - 4,
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isGrid]);

  const step = (dir: 1 | -1) => {
    const el = rowRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const width = card ? card.getBoundingClientRect().width + 12 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * width, behavior: "smooth" });
  };

  const btn =
    "grid size-11 flex-none place-items-center rounded-full border-2 border-ink bg-paper-light text-[20px] leading-none font-black text-ink shadow-[3px_3px_0_#121212] transition-opacity disabled:opacity-30 disabled:shadow-none";

  return (
    <>
      <div
        ref={rowRef}
        {...regionProps}
        className={`-mt-[14px] flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pt-[22px] pb-3 ${GRID_FROM[breakpoint]} ${gridClassName}`}
      >
        {children}
      </div>
      <div className={`flex items-center gap-3 px-5 pt-2 ${HIDE_FROM[breakpoint]}`}>
        <span
          aria-hidden="true"
          className="relative h-1.5 flex-1 overflow-hidden rounded-full"
          style={{ background: "rgba(18,18,18,.14)" }}
        >
          <span
            className="absolute inset-y-0 rounded-full bg-ink"
            style={{
              width: `${scroll.ratio * 100}%`,
              left: `${scroll.pos * (1 - scroll.ratio) * 100}%`,
            }}
          />
        </span>
        <button
          type="button"
          className={btn}
          onClick={() => step(-1)}
          disabled={scroll.atStart}
          aria-label="Попередня картка"
        >
          ←
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => step(1)}
          disabled={scroll.atEnd}
          aria-label="Наступна картка"
        >
          →
        </button>
      </div>
    </>
  );
}
