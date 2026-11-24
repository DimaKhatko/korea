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

import {
  MAX_GROUP_SIZE,
  PARTICIPANT_AGE,
  PRICE_EUR,
  SEARCH_INDEXABLE,
  ageRange,
  groupSize,
  tripDates,
} from "@/lib/korea";

const SITE_URL = "https://korea.pointcamp.com.ua/";
const ORG_ID = "https://pointcamp.com.ua/#organization";
const PAGE_ID = `${SITE_URL}#webpage`;
const TRIP_ID = `${SITE_URL}#trip`;
const FAQ_ID = `${SITE_URL}#faq`;

const TITLE = "Весняні канікули в Кореї для підлітків 2027 | PointCamp";
/** ≤ 160 characters; every fact is on the page (hero, About, Partner, Price). */
const DESCRIPTION = `Весняні канікули 2027 у Південній Кореї для підлітків та молоді: 10 днів у Сеулі, Кьонджу й Пусані, група до ${MAX_GROUP_SIZE} учасників, 3150 €. 21–30 березня.`;

/** 1200×630, rendered from the desktop hero (logo, 한국, h1, collage). */
const OG_IMAGE = {
  url: `${SITE_URL}og-image.jpg`,
  width: 1200,
  height: 630,
  alt: "PointCamp Korea 2027: весняні канікули в Південній Кореї. Дівчата в ханбоках біля палацу Кьонбоккун",
};

/** Route as shown on the page: Сеул → Кьонджу → Пусан → Сеул. */
const ITINERARY = [
  { name: "Сеул", alternateName: "Seoul" },
  { name: "Кьонджу", alternateName: "Gyeongju" },
  { name: "Пусан", alternateName: "Busan" },
  { name: "Сеул", alternateName: "Seoul" },
];

/**
 * JSON-LD @graph: the brand (same @id on every Point Camp landing, so crawlers and AI
 * search merge them into one entity), this page, the trip (one group, 21–30.03.2027)
 * with its offer, and the FAQ (built from the same FAQ array as the visible section). Dates, age and group size are added only once src/lib/korea.ts holds
 * real values, never as placeholders. Everything here must match the visible page.
 */
function structuredData() {
  const age = ageRange(PARTICIPANT_AGE);
  const capacity = groupSize(MAX_GROUP_SIZE);
  const dates = tripDates();

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
        telephone: "+380662217373",
        email: "contact@pointcamp.com.ua",
        sameAs: [
          "https://www.instagram.com/point_camp",
          "https://facebook.com/pointcamp",
          "https://t.me/pointcamp",
        ],
      },
      {
        "@type": "WebPage",
        "@id": PAGE_ID,
        url: SITE_URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "uk",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
        },
        about: { "@id": TRIP_ID },
        hasPart: { "@id": FAQ_ID },
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "TouristTrip",
        "@id": TRIP_ID,
        name: "Весняні канікули в Південній Кореї 2027",
        description: `10 днів у Кореї: Сеул, Кьонджу і Пусан. Група до ${MAX_GROUP_SIZE} учасників, з нею щонайменше троє дорослих, серед них — наша людина в Кореї.`,
        url: SITE_URL,
        image: OG_IMAGE.url,
        inLanguage: "uk",
        touristType: "Підлітки",
        provider: { "@id": ORG_ID },
        itinerary: {
          "@type": "ItemList",
          numberOfItems: ITINERARY.length,
          itemListElement: ITINERARY.map((city, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "City",
              ...city,
              containedInPlace: { "@type": "Country", name: "Південна Корея" },
            },
          })),
        },
        offers: {
          "@type": "Offer",
          price: String(PRICE_EUR),
          priceCurrency: "EUR",
          url: `${SITE_URL}#price`,
          offeredBy: { "@id": ORG_ID },
          ...(capacity
            ? {
                eligibleQuantity: {
                  "@type": "QuantitativeValue",
                  maxValue: capacity,
                  unitText: "учасників у групі",
                },
              }
            : {}),
        },
        ...(age
          ? {
              audience: {
                "@type": "PeopleAudience",
                suggestedMinAge: age.min,
                suggestedMaxAge: age.max,
              },
            }
          : {}),
        ...(dates ? { departureTime: dates.start, arrivalTime: dates.end } : {}),
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
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      // Temporary: while src/lib/korea.ts still has «[…]» placeholders (see scripts/write-seo.mjs).
      ...(SEARCH_INDEXABLE ? [] : [{ name: "robots", content: "noindex, follow" }]),
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE.url },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: String(OG_IMAGE.width) },
      { property: "og:image:height", content: String(OG_IMAGE.height) },
      { property: "og:image:alt", content: OG_IMAGE.alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
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
