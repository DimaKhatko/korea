// Post-build step (run by `bun run build` after `vite build`): the client JS of the
// prerendered page starts downloading only after the first frame is painted.
//
// dist/client/index.html is a full static prerender, so the first screen needs no JS; JS
// only adds interactivity (menu, form, scroll rows) after hydration. TanStack Start emits
// <link rel="modulepreload"> for the entry chunks and an async module script, which makes
// the ~100 KB (gzip) framework bundle compete with the hero for bandwidth and run before
// the first paint. This script removes those modulepreload links and replaces the module
// script with a tiny inline loader that injects the same script after the first
// contentful paint (or on load, the first pointerdown / keydown / touchstart, or after 3 s,
// whichever comes first). The build fails if the expected markup is not found.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "dist/client/index.html");
let html = readFileSync(file, "utf8");

const scripts = [...html.matchAll(/<script type="module" async="" src="([^"]+)"><\/script>/g)];
if (scripts.length !== 1) {
  throw new Error(`defer-client-js: expected 1 async module script, found ${scripts.length}`);
}
const [tag, src] = scripts[0];

const preloads = html.match(/<link rel="modulepreload" href="[^"]+"\/>/g) ?? [];
if (preloads.length === 0) throw new Error("defer-client-js: no modulepreload links found");
for (const link of preloads) html = html.replace(link, "");

// After the first-contentful-paint entry (plus one task), or on load, the first
// interaction, or after 3 s, whichever comes first.
const loader =
  "<script>(function(){var d=0;function go(){if(d)return;d=1;" +
  'var s=document.createElement("script");s.type="module";' +
  `s.src=${JSON.stringify(src)};document.head.appendChild(s)}` +
  "function later(){setTimeout(go,0)}" +
  "try{new PerformanceObserver(function(l){l.getEntries().forEach(function(e){" +
  'if(e.name==="first-contentful-paint")later()})}).observe({type:"paint",buffered:true})}catch(e){}' +
  'addEventListener("load",later);setTimeout(go,3000);' +
  '["pointerdown","keydown","touchstart"].forEach(function(e){' +
  "addEventListener(e,go,{once:true,passive:true,capture:true})})})()</script>";
html = html.replace(tag, loader);

writeFileSync(file, html);
console.log(
  `defer-client-js: ${src} loads after the first paint (${preloads.length} modulepreload links removed)`,
);
