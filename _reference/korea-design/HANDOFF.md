# PointCamp Korea 2027 — design handoff

Approved landing for the spring 2027 teen trip to South Korea (Seoul – Gyeongju – Busan – Seoul). Domain: `korea.pointcamp.com.ua`. This repo was cloned from `DimaKhatko/japan` without history; reuse its stack and conventions, replace its content.

The source of truth for the layout is `sections/*.html`. Open them in a browser: every section has a `mobile` file (designed at 390 px, the primary layout) and a `desktop` file (fluid page, max content width 1280 px). Recreate them as React components faithfully: same copy, same order, same spacing, same assets. Do not redesign.

## Stack and rules

- TanStack Start + React + Vite + Tailwind + Bun, Firebase Hosting (project `pointcamp-a1a24`). SPA + prerender config stays as in the Japan repo.
- Mobile-first: write base styles for 390 px, then `md:` / `lg:` for desktop. Check both.
- All copy is Ukrainian, parents are addressed with «ви». No emoji anywhere.
- Never mention campfires («вогнища», «ватра», «костри»).
- Placeholders in square brackets stay visible until the client sends data: `[ДАТИ]` (group dates), `[ВІК]` (participant age), `[N]` (max group size), `[ФОТО]` (group photo). Keep them as constants in one config file, for example `src/lib/korea.ts`, so they can be filled in one place.

## Design system

- `tokens.json`: colours, type scale, spacing, radius, shadows, tilt. Map them into the Tailwind theme / CSS variables with the same names (`--paper`, `--ink`, `--lime`, `--marker`, `--space-*`, `--radius-sm`, `--shadow-hard`, …).
- `css/bundle.css`: the component classes used in the sections (`pk-paper`, `pk-kr`, `pk-city`, `pk-slogan`, `pk-photo`, `pk-label`, `pk-note`, `pk-sticker`, `pk-stamp`, `pk-spray`, `pk-btn`, `pk-tag`, `pk-card`, `pk-day`, `pk-list`, `pk-price`, `pk-field`, `pk-check`, `pk-faq`). Port it as a global stylesheet (keep the class names) rather than rewriting every clip-path. Replace its `url(/_blob/…)` references: `.pk-paper` uses `assets/paper-tile.jpg` (512 px tile), `.pk-spray::before` uses `assets/spray-lime.png`. The sections already override these in their `<style>` block; copy that.
- Fonts in `fonts/`: Kyiv Type Sans (variable, 100–1000, the main face), Black Han Sans (Korean words only), Caveat (marker notes), Archivo Black («KOREA '27» only). Self-host with `font-display: swap`; preload Kyiv Type Sans.
- Collage budget («без перебора»): torn photos, marker notes, stickers and stamps appear only in the hero, the program city headers, the section dividers and the final CTA. Day cards, price, form and FAQ stay clean. Max one lime area per screen. «KOREA '27» appears once (final CTA).
- Motion: none in the mockup. If you add the system's stop-motion entrances (`.pk-slam/.pk-pop/.pk-drop` + `.pk-in` on enter), respect `prefers-reduced-motion`.

## Sections, in order

| # | File prefix | Anchor | Component | Notes |
|---|---|---|---|---|
| 1 | `01-header-hero` | `#top` | `Header`, `Hero` | Sticky header on mobile with «Заявка» + burger. Desktop nav: Про подорож, Маршрут, Програма, Вартість, Відгуки. |
| 2 | `02-about` | `#about` | `About` | 4 fact cards with Korean glyph icons; route line with plane stickers (arrival rotated 90°); photo strip. |
| 3 | `03-why-us` | `#why` | `WhyUs` | Torn lattice divider + heart sticker. Stats; `[ФОТО]` slot for a PointCamp group photo. |
| 4 | `04-reviews` | `#reviews` | `Reviews` | Divider + smiley. Ratings (4,8 Google Maps, 98% Facebook, 5 stars with the holo star sticker). Quotes are real; keep them verbatim. Mobile: horizontal scroll-snap. |
| 5 | `05-why-korea` | `#why-korea` | `WhyKorea` | 4 photo cards. Mobile: horizontal scroll-snap. |
| 6 | `06-partner` | `#partner` | `Partner` | Lime panel. Copy will be rewritten by the client later; keep it in one place. |
| 7 | `07-route` | `#route` | `Route` | `assets/korea-route-map.svg` with HTML labels positioned in % over it (see the section file), on a lattice background. KTX times are checked: Seoul–Gyeongju ≈2 h, Gyeongju–Busan ≈30 min, Busan–Seoul ≈2.5 h. |
| 8 | `08-program` | `#program` | `Program` | Vertical timeline: city header rows + 10 day cards. Desktop card = photo left, text right. |
| 9 | `09-price` | `#price` | `Price` | Divider + star. 3150 €, no «від». CTA «Забронювати місце» → `#form`. |
| 10 | `10-form` | `#contact` (form `#form`) | `FinalCTA` / `LeadForm` | Collage + spray. Submit button is ink (the lime is taken by the spray). |
| 11 | `11-footer` | — | `Footer` | Ink background, white logo, colourful sticker icons for contacts and socials (inline SVG, see file). |

The Japan components map roughly as: Hero→Hero, Intro→About, WhyUs→WhyUs, Reviews→Reviews, WhyJapan→WhyKorea, Omotenashi→Partner, Route→Route, Program→Program, Price→Price, FinalCTA→FinalCTA, Footer→Footer. `Moments` is not used on this landing. `SoldOutModal` is not needed now. Remove all Japan images and copy.

## Facts that were deliberately softened (do not "improve" them)

- Day 4: «Цілий день у Lotte World» — no Magic Pass details (rules changed in 2026).
- Day 6: no cable car promise (Songdo may close for maintenance in March); the photo is Blueline Park Sky Capsule.
- Day 8: drone show «по суботах… якщо дозволить погода».
- Price «Оплачується окремо»: flight «від 1200 €», visa, pocket money ≈300 €, Kyiv – Budapest/Warsaw ≈310 €.

## Assets

`assets/` — logos (ink and white; low-res placeholders, replace with `logo-pointcamp.svg` from the other repos), stickers, stamps, plane sticker, lattice pattern, marker arrow, route map, paper texture, spray, and `photo-*.jpg`. All photos are placeholders cut from the program PDF: keep the file names, convert to WebP at build, always give a Ukrainian `alt` (copy the alts from the sections). They will be replaced by originals later.

## Lead form (section 10)

- Fields: «Імʼя», «Телефон», «E-mail», «Інформація про учасника» (placeholder «Імʼя та вік дитини»), consent checkbox «Погоджуюсь на обробку персональних даних», hidden honeypot `website`.
- Send to the Make scenario `pointcamp-leads` (webhook URL from env, follow how the Japan repo reads its config). Payload: `landing: 'korea'`, `name`, `phone`, `email`, `participant`, `page_url`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `submitted_at` (ISO), `test` (true when `?test=1`).
- Never put a Telegram bot token in client code. Remove `src/lib/sendToTelegram.ts` usage.
- After a successful response only: `window.dataLayer.push({ event: 'lead_submit' })`. Show a success state; on error show the message in `marker-deep`.

## Analytics

GTM `GTM-PGJNFD95`, GA4 `G-2FL7P34KEE`, Meta Pixel `1816738331899667` — same setup as the Japan repo.

## Meta

Title «PointCamp Korea 2027 — весняні канікули в Південній Кореї», `lang="uk"`, OG image to be made from the hero, canonical `https://korea.pointcamp.com.ua/`. Update `sitemap.xml`, `robots.txt`, `site.webmanifest`.

## Deploy

The client deploys himself. Add a Firebase hosting target `korea` (site name to be created, e.g. `pointcamp-korea`) in `.firebaserc` / `firebase.json`; do not run deploy commands.
