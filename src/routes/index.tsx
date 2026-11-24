import { lazy, Suspense, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/korea/Header";
import { Hero } from "@/components/korea/Hero";
import { About } from "@/components/korea/About";
import { WhyUs } from "@/components/korea/WhyUs";
import { Partner } from "@/components/korea/Partner";
import { Route as RouteSection } from "@/components/korea/Route";
import { FAQ, Faq } from "@/components/korea/Faq";

/*
 * Code splitting (as in pointcamp-winter): sections below the first screens with heavier
 * code are lazy chunks. They are still prerendered into the HTML (text for crawlers and
 * AI search) and hydrate when their chunk arrives.
 */
const Reviews = lazy(() =>
  import("@/components/korea/Reviews").then((m) => ({ default: m.Reviews })),
);
const WhyKorea = lazy(() =>
  import("@/components/korea/WhyKorea").then((m) => ({ default: m.WhyKorea })),
);
const Program = lazy(() =>
  import("@/components/korea/Program").then((m) => ({ default: m.Program })),
);
const Price = lazy(() => import("@/components/korea/Price").then((m) => ({ default: m.Price })));
const FinalCTA = lazy(() =>
  import("@/components/korea/FinalCTA").then((m) => ({ default: m.FinalCTA })),
);
const Footer = lazy(() => import("@/components/korea/Footer").then((m) => ({ default: m.Footer })));

/** One Suspense boundary per lazy section, so each hydrates independently. */
function Deferred({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

import ogImagePath from "@/assets/korea/og-image.jpg";
import { BUILD_DATE } from "@/lib/buildDate.generated";
import {
  CITIES,
  END_ISO,
  MAX_GROUP_SIZE,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
  PARTICIPANT_AGE,
  PRICE_EUR,
  PRICE_EXTRAS,
  SEARCH_INDEXABLE,
  START_ISO,
  TRIP_SUMMARY,
  TRIP_TITLE,
  ageRange,
  groupSize,
} from "@/lib/korea";

const SITE_URL = "https://korea.pointcamp.com.ua/";
const ORG_ID = "https://pointcamp.com.ua/#organization";
const PAGE_ID = `${SITE_URL}#webpage`;
const EVENT_ID = `${SITE_URL}#event`;
const FAQ_ID = `${SITE_URL}#faq`;

/**
 * OG image: 1200×630 screenshot of the desktop hero (see CLAUDE.md, «Re-shoot»). Imported
 * so Vite puts a content hash in the file name: a changed image gets a new URL, and
 * Facebook / Telegram fetch it again instead of showing their cached copy.
 */
const OG_IMAGE = {
  url: new URL(ogImagePath, SITE_URL).href,
  width: 1200,
  height: 630,
  alt: "PointCamp Korea 2027: весняні канікули в Південній Кореї для підлітків та молоді. Дівчата в ханбоках біля палацу Кьонбоккун",
};

/** «Переліт (від 1200 €); оформлення візи — 100 €; …» from the Price list. */
const extrasText = PRICE_EXTRAS.map(
  (item) =>
    item.text.charAt(0).toLowerCase() + item.text.slice(1) + (item.note ? ` (${item.note})` : ""),
).join("; ");

/**
 * JSON-LD @graph: the brand (same node and @id as on every PointCamp landing, so crawlers
 * and AI search merge them into one entity), this page, the trip as an Event with its
 * public Offer, and the FAQ (built from the same FAQ array as the visible section). All
 * trip values come from src/lib/korea.ts; age and group size only when they are real
 * values. Everything here must match the visible page.
 */
function structuredData() {
  const age = ageRange(PARTICIPANT_AGE);
  const capacity = groupSize(MAX_GROUP_SIZE);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Point Camp",
        alternateName: "PointCamp",
        url: "https://pointcamp.com.ua/",
        logo: `${SITE_URL}favicon-512x512.png`,
        foundingDate: "2011",
        sameAs: [
          "https://www.facebook.com/pointcamp",
          "https://www.instagram.com/point_camp",
          "https://t.me/pointcamp",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+380662217373",
          contactType: "customer service",
          email: "contact@pointcamp.com.ua",
          availableLanguage: ["uk"],
        },
      },
      {
        "@type": "WebPage",
        "@id": PAGE_ID,
        url: SITE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: "uk",
        dateModified: BUILD_DATE,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
        },
        about: { "@id": EVENT_ID },
        hasPart: { "@id": FAQ_ID },
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "Event",
        "@id": EVENT_ID,
        name: TRIP_TITLE,
        description: TRIP_SUMMARY,
        image: OG_IMAGE.url,
        url: SITE_URL,
        inLanguage: "uk",
        startDate: START_ISO,
        endDate: END_ISO,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        ...(age
          ? {
              typicalAgeRange: `${age.min}-${age.max}`,
              audience: {
                "@type": "PeopleAudience",
                suggestedMinAge: age.min,
                suggestedMaxAge: age.max,
              },
            }
          : {}),
        ...(capacity ? { maximumAttendeeCapacity: capacity } : {}),
        location: CITIES.map((city) => ({
          "@type": "Place",
          name: city.name,
          alternateName: city.alternateName,
          address: {
            "@type": "PostalAddress",
            addressLocality: city.name,
            addressCountry: "KR",
          },
        })),
        organizer: { "@id": ORG_ID },
        offers: {
          "@type": "Offer",
          price: String(PRICE_EUR),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}#form`,
          validFrom: BUILD_DATE,
          description: `${PRICE_EUR} € за 10 днів у Кореї. Окремо оплачуються: ${extrasText}.`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        url: `${SITE_URL}#faq`,
        inLanguage: "uk",
        isPartOf: { "@id": PAGE_ID },
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      // Until launch: LAUNCHED = false or placeholders left (NOINDEX_REASONS in korea.ts).
      ...(SEARCH_INDEXABLE ? [] : [{ name: "robots", content: "noindex, follow" }]),
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "PointCamp" },
      { property: "og:locale", content: "uk_UA" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:image", content: OG_IMAGE.url },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: String(OG_IMAGE.width) },
      { property: "og:image:height", content: String(OG_IMAGE.height) },
      { property: "og:image:alt", content: OG_IMAGE.alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE.url },
      { name: "twitter:image:alt", content: OG_IMAGE.alt },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData()),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-paper text-ink">
      <Header />
      <main>
        <Hero />
        <About />
        <WhyUs />
        <Deferred>
          <Reviews />
        </Deferred>
        <Deferred>
          <WhyKorea />
        </Deferred>
        <Partner />
        <RouteSection />
        <Deferred>
          <Program />
        </Deferred>
        <Deferred>
          <Price />
        </Deferred>
        <Faq />
        <Deferred>
          <FinalCTA />
        </Deferred>
      </main>
      <Deferred>
        <Footer />
      </Deferred>
    </div>
  );
}
