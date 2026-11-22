import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/korea/Header";
import { Hero } from "@/components/korea/Hero";
import { About } from "@/components/korea/About";
import { WhyUs } from "@/components/korea/WhyUs";
import { Reviews } from "@/components/korea/Reviews";
import { WhyKorea } from "@/components/korea/WhyKorea";
import { Partner } from "@/components/korea/Partner";
import { Route as RouteSection } from "@/components/korea/Route";
import { Program } from "@/components/korea/Program";
import { Price } from "@/components/korea/Price";
import { FinalCTA } from "@/components/korea/FinalCTA";
import { Footer } from "@/components/korea/Footer";

const SITE_URL = "https://korea.pointcamp.com.ua/";
const ORG_ID = "https://pointcamp.com.ua/#organization";

const TITLE = "PointCamp Korea 2027 — весняні канікули в Південній Кореї";
const DESCRIPTION =
  "Весняні канікули в Південній Кореї для підлітків: 10 днів, 9 ночей у Сеулі, Кенджу і Пусані. Перекладач Корейсько-українського центру весь час із групою, поруч троє дорослих PointCamp.";

/**
 * JSON-LD @graph: the brand (same @id on every Point Camp landing, so crawlers and
 * AI search merge them into one entity) and this page. No Event/Offer node yet: the
 * group dates are still placeholders (src/lib/korea.ts); add it once they are known.
 * Everything here must match the visible page.
 */
function structuredData() {
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
        "@id": `${SITE_URL}#webpage`,
        url: SITE_URL,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "uk",
        primaryImageOfPage: `${SITE_URL}og-image.jpg`,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
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
        <Reviews />
        <WhyKorea />
        <Partner />
        <RouteSection />
        <Program />
        <Price />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
