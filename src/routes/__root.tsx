import type { ReactNode } from "react";
import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import kyivTypeSansUrl from "../assets/fonts/KyivTypeSans-Sub.woff2?url";
import paperTileUrl from "../assets/korea/paper-tile.webp?url";
import { GTM_ID } from "@/lib/analytics";
import { PAGE_TITLE } from "@/lib/korea";
import { PREHYDRATION_GUARD } from "@/lib/prehydration";

/**
 * Deferred Google Tag Manager (same loader as pointcamp-winter). `window.dataLayer` is
 * declared in <head> right away (so `lead_submit` pushes are never lost); gtm.js itself
 * is injected 3 s after `load` or on the first pointerdown / scroll / keydown /
 * touchstart, whichever comes first. GTM then processes everything already queued in
 * dataLayer, including the `gtm.js` event pushed here (the same event the standard
 * snippet pushes), so Page View / GA4 / Meta Pixel tags fire as before.
 */
const GTM_LOADER = `(function(w,d){var done=0,ev=['pointerdown','scroll','keydown','touchstart'];function load(){if(done)return;done=1;ev.forEach(function(e){w.removeEventListener(e,load)});w.dataLayer=w.dataLayer||[];w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var j=d.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';d.head.appendChild(j)}ev.forEach(function(e){w.addEventListener(e,load,{passive:true})});function later(){setTimeout(load,3000)}if(d.readyState==='complete')later();else w.addEventListener('load',later)})(window,document);`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: PAGE_TITLE },
      { name: "author", content: "PointCamp" },
      { name: "theme-color", content: "#eae5d8" },
    ],
    links: [
      // Only the main face is preloaded (subset, see scripts/subset-font.py); the same hashed
      // file is referenced by @font-face in styles.css, so it is fetched once.
      {
        rel: "preload",
        href: kyivTypeSansUrl,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      // The paper texture is the background of every section and the LCP element is the
      // hero section, so the texture is fetched with the HTML instead of after the CSS
      // (same hashed file as `.pk-paper` in pk.css).
      { rel: "preload", href: paperTileUrl, as: "image", fetchPriority: "high" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: `${import.meta.env.BASE_URL}favicon.ico`, sizes: "any" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `${import.meta.env.BASE_URL}favicon-32x32.png`,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `${import.meta.env.BASE_URL}favicon-16x16.png`,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "48x48",
        href: `${import.meta.env.BASE_URL}favicon-48x48.png`,
      },
      { rel: "apple-touch-icon", href: `${import.meta.env.BASE_URL}apple-touch-icon.png` },
      { rel: "manifest", href: `${import.meta.env.BASE_URL}site.webmanifest` },
    ],
    scripts: [
      // Holds submits and taps on JS-only buttons until hydration (src/lib/prehydration.ts).
      { children: PREHYDRATION_GUARD },
      // Declared before anything else runs; gtm.js itself is deferred (GTM_LOADER).
      { children: "window.dataLayer=window.dataLayer||[];" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Google Tag Manager (noscript): must be in body, never head */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: GTM_LOADER }} />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
