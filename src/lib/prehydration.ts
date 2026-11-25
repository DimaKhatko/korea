import { useEffect, type RefObject } from "react";

/**
 * Pre-hydration safety. The page is plain prerendered HTML until the client JS has loaded
 * (scripts/defer-client-js.mjs starts it only after the first paint), and on a slow
 * connection that can take many seconds. Without a guard, a submit in that window is a
 * native form POST (page reload, typed data lost) and a tap on a JS-only button is lost.
 *
 * PREHYDRATION_GUARD is an inline <head> script (src/routes/__root.tsx). Until a target has
 * hydrated (it carries `data-ready`), it cancels
 *   - every form submit, and
 *   - clicks on elements marked `data-replay`,
 * and queues them on `window.__krQueue` (once per element), marking the element
 * `data-pending` (styled as busy in styles.css). After hydration, the component's
 * useReplayWhenHydrated() sets `data-ready` and replays the queued action through React:
 * `requestSubmit()` for a form (so validation and sending run on exactly what the user
 * typed), `click()` for a button. Attributes are set on the DOM only, never in React
 * props, so hydration sees the same markup as the prerender.
 */
export const PREHYDRATION_GUARD =
  "(function(w,d){var q=w.__krQueue=w.__krQueue||[];" +
  "function hold(e,el,type){e.preventDefault();" +
  "for(var i=0;i<q.length;i++)if(q[i].el===el)return;" +
  'q.push({el:el,type:type});el.setAttribute("data-pending","")}' +
  'd.addEventListener("submit",function(e){var f=e.target;' +
  'if(f&&!f.hasAttribute("data-ready"))hold(e,f,"submit")},true);' +
  'd.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest("[data-replay]");' +
  'if(t&&!t.hasAttribute("data-ready"))hold(e,t,"click")},true)})(window,document);';

export type PrehydrationAction = { el: Element; type: "submit" | "click" };

/**
 * Marks the element as hydrated and replays the action queued on it before hydration.
 * Runs after every render (cheap), so an element that is unmounted and mounted again (the
 * lead form after «Залишити ще одну заявку») is marked ready too.
 */
export function useReplayWhenHydrated(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("data-ready", "");
    const queue = window.__krQueue ?? [];
    const index = queue.findIndex((action) => action.el === el);
    if (index < 0) return;
    const [action] = queue.splice(index, 1);
    el.removeAttribute("data-pending");
    if (action.type === "submit" && el instanceof HTMLFormElement) el.requestSubmit();
    else el.click();
  });
}
