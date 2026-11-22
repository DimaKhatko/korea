import type { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

/** Tailwind breakpoints (rem, like Tailwind's own media queries). */
const BREAKPOINT_QUERY = { md: "(min-width: 48rem)", lg: "(min-width: 64rem)" } as const;

/** Classes that turn the row back into a plain grid from the breakpoint up (static for Tailwind). */
const GRID_FROM = {
  md: "md:mt-0 md:grid md:snap-none md:overflow-visible md:p-0",
  lg: "lg:mt-0 lg:grid lg:snap-none lg:overflow-visible lg:p-0",
} as const;

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
 * Spacing: the reference row has 8 px top padding, which clips the tape on Reviews cards.
 * Here it is 22 px (the rotated tape reaches about 21 px above a card) with a −14 px top
 * margin, so the cards stay exactly where the reference puts them.
 */
export function SnapRow({ label, breakpoint = "lg", gridClassName = "", children }: SnapRowProps) {
  const isGrid = useMediaQuery(BREAKPOINT_QUERY[breakpoint], false);
  const regionProps = isGrid ? {} : ({ role: "region", "aria-label": label, tabIndex: 0 } as const);

  return (
    <div
      {...regionProps}
      className={`-mt-[14px] flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pt-[22px] pb-3 ${GRID_FROM[breakpoint]} ${gridClassName}`}
    >
      {children}
    </div>
  );
}
