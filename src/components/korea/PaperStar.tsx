import { useEffect, useRef, useState, type CSSProperties } from "react";

/** Five-point star in a 24 × 24 box, rounded by the stroke join. */
const STAR_PATH =
  "M12 2.6l2.82 5.92 6.48.8-4.76 4.5 1.22 6.44L12 17.2l-5.76 3.06 1.22-6.44-4.76-4.5 6.48-.8z";

type PaperStarProps = {
  /** Size classes (width = height), e.g. "size-7 lg:size-9". */
  className?: string;
  /** Fixed tilt in degrees (never random: it must match between prerender and hydration). */
  tilt?: number;
  /** Delay of the pop-in, for a staggered row. */
  delayMs?: number;
};

/**
 * Paper-cutout star sticker: marker-red star with a white paper edge and the sticker drop
 * shadow, like the other collage pieces. Decorative (aria-hidden): give the surrounding
 * element the accessible text («5 зірок з 5», «3–4 зірки»).
 *
 * Pops in once when it scrolls into view, reusing the stop-motion `pk-pop` entrance from
 * pk.css (`.pk-in` is added on enter); pk.css switches the animation off under
 * prefers-reduced-motion. Without JS (and in the prerendered HTML) the star is simply there.
 */
export function PaperStar({ className = "", tilt = 0, delayMs = 0 }: PaperStarProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = {
    "--tilt": `${tilt}deg`,
    transform: "rotate(var(--tilt))",
    animationDelay: `${delayMs}ms`,
    filter: "drop-shadow(1px 2px 1.5px rgba(18, 18, 18, 0.35))",
  } as CSSProperties;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pk-pop inline-block flex-none ${entered ? "pk-in" : ""} ${className}`}
      style={style}
    >
      <svg viewBox="0 0 24 24" className="block size-full overflow-visible">
        <path
          d={STAR_PATH}
          fill="var(--marker)"
          stroke="var(--sticker)"
          strokeWidth="2.6"
          strokeLinejoin="round"
          paintOrder="stroke"
        />
      </svg>
    </span>
  );
}
