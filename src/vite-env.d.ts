/// <reference types="vite/client" />

interface Window {
  dataLayer?: unknown[];
  /** Actions held before hydration (src/lib/prehydration.ts). */
  __krQueue?: import("./lib/prehydration").PrehydrationAction[];
}
