import type { Metadata } from "next";
import Link from "next/link";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import {
  aggregateRating,
  bodaUrl,
  brandLogoUrl,
  canonicalUrl,
  email,
  geoCoordinates,
  localBusinessAreaServed,
  mainBrandUrl,
  organizationSchema,
  phoneE164,
  postalAddress
} from "@/lib/seo";

const PAGE_PATH = "/en/foreigners-marriage-requirements-dominican-republic/";
const PAGE_URL = canonicalUrl(PAGE_PATH);
const ES_MIRROR = canonicalUrl("/los-extranjeros-pueden-contraer-matrimonio-civil-en-la-republica-dominicana/");

const title = "Marriage Requirements in the Dominican Republic for Foreigners · Babula Shots Bodas";
const description =
  "Foreign-citizen marriage requirements in the Dominican Republic: civil vs symbolic wedding, required documents, apostille rules, prenuptial medical certificate, planning tips.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "es-DO": ES_MIRROR,
      es: ES_MIRROR,
      en: PAGE_URL,
      "x-default": ES_MIRROR
    }
  },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    type: "article",
    locale: "en_US",
    siteName: "Babula Shots Bodas",
    images: [
      {
        url: "/images/punta-cana-fotografoo-de-bodas-scaled-e1726885635986.webp",
        width: 1600,
        height: 1067,
        alt: "Destination wedding in Punta Cana, Dominican Republic"
      }
    ]
  }
};

const faqItems = [
  {
    q: "Do foreigners need to live in the Dominican Republic before getting married legally?",
    a: "No residency period is required for a foreign-citizen civil wedding in the Dominican Republic. You can arrive, complete the documentation, take the prenuptial medical exam locally, and marry within a few days — provided all foreign documents are pre-apostilled and translated."
  },
  {
    q: "Is a Dominican Republic civil marriage valid in my home country?",
    a: "Yes — a Dominican civil marriage is recognised internationally under the Hague Apostille Convention. You'll need the marriage certificate apostilled in the Dominican Republic after the ceremony, then translated to your home language for your home country's civil registry to register it."
  },
  {
    q: "What's the difference between a civil wedding and a symbolic / blessing ceremony?",
    a: "A civil wedding (matrimonio civil) is legally binding before a Dominican Civil Registry officer or notary — requires full documentation, apostilles, and a prenuptial medical certificate. A symbolic ceremony (boda simbólica / blessing / vow renewal) has no legal effect in the DR — it's an emotional ceremony often used by couples who married legally at home and want a destination celebration."
  },
  {
    q: "Can a wedding photographer in the Dominican Republic also help with the legal paperwork?",
    a: "We focus on photography and video, not legal paperwork. We work alongside trusted local wedding planners who handle the civil registry coordination, notary booking and apostille logistics."
  },
  {
    q: "How long should we plan ahead?",
    a: "For a legal civil wedding: 2–3 months minimum to get foreign documents apostilled, translated and submitted in advance. For a symbolic ceremony with photography only: 4–8 weeks of lead time is typical for venue, photographer and planner availability."
  },
  {
    q: "Which is more popular for foreign couples — civil or symbolic?",
    a: "About 90% of foreign couples who marry in Dominican Republic resorts choose the symbolic route. They marry legally at home first (much simpler), then come to the DR for the destination ceremony, beach setup and professional photography."
  }
];

const personId = `${mainBrandUrl}/sobre/#person`;

const schema = [
  organizationSchema,
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${bodaUrl}/#localbusiness`,
    name: "Babula Shots Bodas",
    url: bodaUrl,
    image: brandLogoUrl,
    telephone: phoneE164,
    email,
    address: postalAddress,
    geo: geoCoordinates,
    priceRange: "RD$53,600-RD$149,000",
    areaServed: localBusinessAreaServed,
    aggregateRating,
    sameAs: [
      mainBrandUrl,
      "https://www.instagram.com/babulashotsrd/",
      "https://www.wikidata.org/wiki/Q139892828"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#article`,
    headline: "Marriage Requirements in the Dominican Republic for Foreigners",
    description,
    url: PAGE_URL,
    inLanguage: "en",
    mainEntityOfPage: PAGE_URL,
    author: { "@type": "Person", "@id": personId, name: "Michal Nikodem Babula" },
    publisher: { "@type": "Organization", name: "Babula Shots", "@id": `${mainBrandUrl}/#organization` },
    image: `${bodaUrl}/images/punta-cana-fotografoo-de-bodas-scaled-e1726885635986.webp`,
    datePublished: "2026-05-22T12:00:00-04:00",
    dateModified: "2026-05-22T12:00:00-04:00"
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Babula Shots Bodas", item: `${bodaUrl}/en/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${bodaUrl}/en/blog/` },
      { "@type": "ListItem", position: 3, name: "Marriage requirements", item: PAGE_URL }
    ]
  }
];

export default function MarriageRequirementsPage() {
  return (
    <main>
      <SeoJsonLd data={schema as Record<string, unknown>[]} />

      <section className="section">
        <div className="wrap" style={{ maxWidth: "780px" }}>
          <p className="eyebrow">Destination wedding planning · Babula Shots Bodas</p>
          <h1>Marriage Requirements in the Dominican Republic for Foreigners</h1>

          <p>
            The Dominican Republic is one of the most accessible and attractive destinations for
            foreign couples to marry — especially for clients from the United States, Canada and
            Europe. Behind the Caribbean beauty, though, there's a bureaucratic legal process that
            must be followed carefully for the marriage to be valid both locally and in your home
            country. Understanding the difference between a civil marriage and a symbolic ceremony
            is the first step to planning your destination wedding without stress.
          </p>

          <p>
            As wedding photographers specialising in destination weddings, we work constantly with
            international couples and local wedding planners. Although our role is the visual side
            of the day, we know the legal logistics because they directly affect timing, permitted
            venues and the flow of the wedding day.
          </p>

          <h2>Civil marriage vs symbolic / blessing ceremony</h2>
          <p>This is where most foreign couples get confused:</p>
          <ul style={{ lineHeight: 1.9 }}>
            <li>
              <strong>Legal civil marriage (matrimonio civil)</strong> — legally binding under
              Dominican law. Performed before a Civil Registry officer (juez de paz) or a notary
              public. Requires exhaustive documentation, sworn translations, apostille
              legalisation, and in some cases waiting for marriage publication periods.
            </li>
            <li>
              <strong>Symbolic ceremony (blessing / vow renewal)</strong> — no legal effect in the
              Dominican Republic (unless you're already legally married in your country). Performed
              by a minister, priest or a friend of the couple. This is what about 90% of foreign
              couples choose when they marry at resorts in Punta Cana. Paperwork is almost zero —
              just a service contract with the wedding planner or resort.
            </li>
          </ul>

          <p>
            <strong>Our recommendation:</strong> marry legally in your home country (at city hall
            or the courthouse), then travel to the Dominican Republic for the symbolic beach
            ceremony of your dreams. This removes 100% of the Dominican bureaucratic stress.
          </p>

          <h2>Required documents if you choose to marry legally in the DR</h2>
          <p>
            If you're committed to a legal civil marriage in the country, prepare this
            documentation well in advance — ideally 2–3 months before your flight. All foreign
            documents must be translated to Spanish by a certified sworn translator and legalised
            with the Hague Apostille:
          </p>
          <ul style={{ lineHeight: 1.9 }}>
            <li>Valid passports (with at least 6 months of remaining validity)</li>
            <li>Original birth certificates for both partners</li>
            <li>Certificate of single status or divorce certificate (if applicable)</li>
            <li>Witness certificates — usually 2 witnesses, who also need to present passport + birth certificate</li>
            <li>
              <strong>Prenuptial medical certificate</strong> — this one is obtained in the
              Dominican Republic, not your home country. Includes blood analysis and chest X-ray.
            </li>
          </ul>

          <h2>Where can foreigners marry in the Dominican Republic?</h2>
          <p>
            A civil marriage can be performed at the Civil Registry office (Oficialía del Estado
            Civil), at your home-country consulate in the DR, or at the wedding venue itself if you
            hire a notary public to travel to and officiate at the location. The third option is
            popular for beach and resort weddings — the notary handles the paperwork end-to-end and
            travels to where the ceremony happens.
          </p>

          <h2>Popular destination wedding locations</h2>
          <p>
            Most foreign couples choose <Link href="/fotografo-bodas-punta-cana/">Punta Cana</Link>{" "}
            (especially Bávaro and Cap Cana resorts), <Link href="/fotografo-bodas-la-romana/">
            Casa de Campo / La Romana</Link>, <Link href="/fotografo-bodas-samana/">Samaná</Link>{" "}
            or <Link href="/fotografo-bodas-las-terrenas/">Las Terrenas</Link>. Each has a different
            visual style and price tier — Punta Cana is the most popular and accessible from US
            East Coast / Canada; Samaná and Las Terrenas are more intimate and feel less touristy.
          </p>

          <h2>FAQ</h2>
          {faqItems.map((item) => (
            <details key={item.q} style={{ margin: "1rem 0" }}>
              <summary><strong>{item.q}</strong></summary>
              <p style={{ marginTop: ".5rem" }}>{item.a}</p>
            </details>
          ))}

          <h2>Plan your destination wedding photography</h2>
          <p>
            Once your ceremony type is decided, the photography piece becomes simpler. We cover
            destination weddings across the Dominican Republic — message us with your date,
            location and approximate guest count to discuss coverage and check availability.
          </p>

          <p>
            WhatsApp / phone: <a href={`tel:${phoneE164}`}>{phoneE164}</a> · {email}
          </p>

          <p style={{ marginTop: "2rem" }}>
            <Link href="/en/">→ Wedding photography (English)</Link>
            {" · "}
            <Link href={ES_MIRROR.replace(bodaUrl, "")}>→ Versión en español</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
