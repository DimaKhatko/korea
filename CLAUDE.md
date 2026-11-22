# CLAUDE.md — PointCamp Korea 2027 landing

## Repo facts
- Landing: spring 2027 teen trip to South Korea (Seoul – Gyeongju – Busan – Seoul), March 2027, two groups.
- Repo: `korea` (cloned from `DimaKhatko/japan` without history) · Stack: TanStack Start (Lovable config) + React + Tailwind v4 + Bun.
- LANDING = `korea`.
- Build output: `dist/client`.
- Firebase: project `pointcamp-a1a24`, target `korea` → site `pointcamp-korea` · domain `korea.pointcamp.com.ua`. There is deliberately no `japan` target in this repo: a deploy from here must never reach the Japan site.
- Default branch: `main`.
- Lockfile: `bun.lock` is the only lockfile.
- Config wrapper: `@lovable.dev/vite-tanstack-config` 2.x — uses `nitro: false`; `bun run build` prerenders `/` with its full content to `dist/client/index.html` (static prerender, not the SPA shell).
- Toolchain: Vite 8.1.5; TanStack Router 1.170.18 / Start 1.168.32 / router-plugin 1.168.23; wrapper `^2.20.0`; `nitro` 3.0.260603-beta (dev); `overrides.rolldown` 1.2.1.

## Design source
- `_reference/korea-design/` is the approved design and the source of truth. Read `HANDOFF.md` first.
- `sections/NN-*.mobile.html` (390 px, primary) and `sections/NN-*.desktop.html` (fluid, max content 1280 px): recreate them faithfully — same copy, order, spacing, assets. Do not redesign. Compare screenshots of the build with the reference files at 390×844 and 1440×900.
- `tokens.json` → CSS variables with the same names in `src/styles.css` (`--paper`, `--ink`, `--lime`, `--space-*`, `--radius-sm`, `--shadow-hard`, `--tilt-*`, …) and Tailwind utilities (`bg-paper`, `text-ink-soft`, `p-space-5`, `rounded-sm`, `shadow-hard`, `font-kr`, `text-h2`, …).
- `css/bundle.css` → `src/pk.css` (pk-* classes, verbatim, in `@layer components`, so utilities override them). `.pk-paper` uses `src/assets/korea/paper-tile.jpg`, `.pk-spray::before` uses `spray-lime.webp`.
- Reference pages have **no box-sizing reset and default line-height**. To match them: `pk-*` elements are `content-box` (rule at the end of `src/pk.css`; add `box-border` where the reference sets `box-sizing:border-box`), plain elements are border-box (preflight), `<button>` is border-box in browsers anyway, and `html` has `line-height: normal`.
- Fonts are self-hosted in `src/assets/fonts` (`font-display: swap`): Kyiv Type Sans (main, preloaded in `__root.tsx`), Black Han Sans (Korean words only), Caveat (marker notes), Archivo Black («KOREA '27» only).
- Assets: `src/assets/korea/` (photos as WebP with the reference base names; Ukrainian `alt` copied from the sections).
- Collage budget: torn photos, notes, stickers, stamps only in the hero, program city headers, section dividers and the final CTA. Max one lime area per screen. «KOREA '27» once (final CTA). No motion in the mockup; any added motion must respect `prefers-reduced-motion`.
- Placeholders `[ДАТИ]` ×2, `[ВІК]`, `[N]`, `[ФОТО]` and the price (3150 €, no «від») live only in `src/lib/korea.ts`; they stay visible until the client sends data.

## Page structure (`src/routes/index.tsx`, components in `src/components/korea/`)
Header · Hero `#top` · About `#about` · WhyUs `#why` · Reviews `#reviews` · WhyKorea `#why-korea` · Partner `#partner` · Route `#route` · Program `#program` · Price `#price` · FinalCTA `#contact` (form `#form`) · Footer.
- Done: Header (sticky below lg with burger menu sheet, static inline nav from lg), Hero, About.
- Placeholders: all other sections.

## Standard v1 rules (S1–S6, concise)
- **S1 Lead submission** *(not built yet: FinalCTA)*. `src/lib/submitLead.ts` exports `LANDING = "korea"`, `WEBHOOK_URL` (Make scenario `pointcamp-leads`), `LeadData { name; phone; email; participant }`, `SendResult { ok; error? }`, `submitLead(data)`. Payload keys exactly: `landing, name, phone, email, participant, page_url, utm_source, utm_medium, utm_campaign, utm_content, utm_term, submitted_at` (ISO), `test` (true when `?test=1`). POST JSON, retry once after 1500 ms, then `{ ok:false, error }`. Push `{ event: "lead_submit" }` to `window.dataLayer` only after a confirmed success; never on failure; guard `window` for SSR. Form via `FormData` with name attrs `name/phone/email/participant`, consent checkbox, CSS-hidden honeypot `website`. Status `idle | sending | sent | error`; errors shown in `marker-deep`. No Telegram tokens or other secrets in client code, no browser calls to third-party APIs. (HANDOFF says the webhook URL comes "from env": decide with Dima before building.)
- **S2 Analytics.** GTM `GTM-PGJNFD95` is the only tracking loader (head script + noscript iframe). GA4 `G-2FL7P34KEE` and Meta Pixel `1816738331899667` are tags inside that container; all three IDs are in `src/lib/analytics.ts`. No direct `gtag.js`, no `fbq`/`fbevents`, no second GTM. `window.dataLayer` typed once in `src/vite-env.d.ts`. Allowed custom events: `lead_submit`, `video_play`.
- **S3 Meta & crawl.** `<html lang="uk">`; title «PointCamp Korea 2027 — весняні канікули в Південній Кореї»; description; canonical `https://korea.pointcamp.com.ua/`; OG (title, description, image absolute 1200×630, url, type, `locale=uk_UA`, `site_name="Point Camp"`); `twitter:card=summary_large_image`; theme-color `#eae5d8`; favicon. `public/robots.txt` with explicit Allow for Googlebot, Bingbot, the AI search/assistant bots, the training bots, Twitterbot, facebookexternalhit and `*` + Sitemap. `public/sitemap.xml` with `<lastmod>` (bump it on every content deploy). Everything a crawler needs must be in the prerendered HTML as text. JSON-LD is one `@graph` in `src/routes/index.tsx` (`structuredData()`): Organization with the shared `@id` `https://pointcamp.com.ua/#organization` + WebPage; it must match the visible copy.
- **S4 Build & hosting.** `vite.config` uses `nitro: false`, `spa: { enabled: false }`, `prerender: { enabled: true, crawlLinks: false }`, `pages: [{ path: "/" }]`. `firebase.json`: `public = dist/client`; **no catch-all rewrite** (unknown paths get `public/404.html` with status 404); `Cache-Control: public, max-age=31536000, immutable` for `/assets/**`; root icons/og/manifest `max-age=86400`; `no-cache, no-store, must-revalidate` for `/` and `/index.html`. `.gitignore` has `.firebase/`, `dist`, `*.report.html`.
- **S5 Subfolder readiness (prep only).** No hardcoded root-absolute asset URLs in TS/TSX/CSS/HTML — use imports or `import.meta.env.BASE_URL` (absolute `https://` URLs in meta tags are fine). Do not set a Vite `base` or router `basepath` yet.
- **S6 Content.** All copy Ukrainian; parents are addressed with lowercase «ви». No emoji. Flag any mention of вогнище, ватра, багаття, костер, bonfire, campfire. Flag outdated years/dates, template or Lovable leftovers, lorem, `{{placeholders}}`, and mentions belonging to another landing (Japan, Croatia) — except the footer's deliberate «Інші програми» links. Keep the softened facts from HANDOFF.md as written (day 4 Lotte World, day 6 no cable car, day 8 drone show «якщо дозволить погода», price extras).

## Commands
- Install: `bun install`
- Clean build: `rm -rf dist && bun run build`
- Serve the build locally: `bunx serve dist/client -p 5000`
- Deploy: `firebase deploy --only hosting:korea` — deploys are done by Dima only.

Prerender needs a working Vite preview server; sandbox environments that cannot start one will fail at the prerender step while client and server bundles still compile.

## Conventions
- Work on the default branch `main`. No feature branches, no Firebase preview channels.
- Mobile-first: base styles for 390 px, `md:` (tablet: mobile stacking, centred, max 640 px content), `lg:` (desktop layout from 1024 px).
- Prompts and code comments in English.
- Never write shell commands with `#` comments.
- Assets must be committed to be visible (nothing is fetched at runtime from outside the repo).
- `bun.lock` is the single lockfile; do not add npm/pnpm/yarn lockfiles.

## Pending
- Sections About → Footer (placeholders now), including the lead form (S1).
- `public/og-image.jpg` is an interim crop of the hanbok photo: make the real OG image from the hero.
- Logos `logo-pointcamp-ink.png` / `-white.png` are low-res placeholders: replace with `logo-pointcamp.svg` from the other repos.
- All `photo-*.webp` are placeholders cut from the program PDF: replace with originals, keep the names.
- JSON-LD `Event` + `Offer` node (dates, 3150 €, availability) once the group dates are known; FAQ block + `FAQPage` if a FAQ is added (`pk-faq` exists in pk.css).
- `wrangler.jsonc` — unused Cloudflare config; verify and remove.
- Unused shadcn components in `src/components/ui/*` — remove what is unused.
- Root `NotFoundComponent` / `ErrorComponent` in `__root.tsx` are English template copy.
