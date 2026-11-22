import { useSyncExternalStore } from "react";

/**
 * True while `query` matches. On the server and during hydration it returns
 * `serverValue`, then React re-renders with the real value right after hydration
 * (no hydration mismatch). Pick `serverValue` to match the mobile-first prerender.
 */
export function useMediaQuery(query: string, serverValue: boolean): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
