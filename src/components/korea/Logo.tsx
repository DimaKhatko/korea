import rawLogo from "@/assets/korea/logo-pointcamp.svg?raw";

/**
 * PointCamp wordmark from src/assets/korea/logo-pointcamp.svg, inlined so it takes the
 * text colour (ink in the header, white in the footer). The source file is purple
 * (#452B70) on a 576×251 artboard; here the purple becomes currentColor and the viewBox is
 * cropped to the letters (content box 36,80 503×92 plus the hat stroke, 6 units margin).
 * Replacing the SVG file updates the logo on the next build; check VIEWBOX if the artwork
 * changes.
 */
const VIEWBOX = "30 74 515 104";
const ASPECT = 515 / 104;

const markup = rawLogo
  .replace(
    /<svg[^>]*>/,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}" width="100%" height="100%" aria-hidden="true" focusable="false">`,
  )
  .replace(/#452B70/gi, "currentColor");

type LogoProps = {
  /** Height (and any colour) classes, e.g. "h-6 text-ink". Width follows the aspect ratio. */
  className?: string;
  /** Accessible name; omit when the surrounding link already has one. */
  label?: string;
};

export function Logo({ className = "", label }: LogoProps) {
  return (
    <span
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className={`block ${className}`}
      style={{ aspectRatio: ASPECT }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
