import Link from "next/link";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import {
  domains,
  faqsForNiche,
  locationsForNiche,
  packagesByNiche,
  servicesByNiche,
  type Niche
} from "@/lib/networkCatalog";
import { canonicalUrl, organizationSchema, phoneE164, siteUrl } from "@/lib/seo";

type Locale = "es" | "en";
type PageType = "servicios" | "ubicaciones" | "precios" | "faq";

const titles: Record<PageType, { es: string; en: string }> = {
  servicios: { es: "Servicios", en: "Services" },
  ubicaciones: { es: "Ubicaciones", en: "Locations" },
  precios: { es: "Precios", en: "Prices" },
  faq: { es: "Preguntas frecuentes", en: "Frequently asked questions" }
};

const intros: Record<PageType, { es: string; en: string }> = {
  servicios: {
    es: "Cobertura, deliverables y tiempos por servicio. Cada servicio tiene su propio FAQ con datos especificos sobre cobertura, equipo y entrega.",
    en: "Coverage, deliverables and timelines per service. Each service ships with its own FAQ covering scope, gear and delivery details."
  },
  ubicaciones: {
    es: "Ciudades y zonas que cubrimos en Republica Dominicana. Cada locacion incluye coordenadas geograficas para que Google identifique correctamente el area de servicio.",
    en: "Cities and zones we cover in the Dominican Republic. Each location includes geographic coordinates so Google correctly identifies the service area."
  },
  precios: {
    es: "Paquetes con precios desde, basados en la lista oficial de la red Babula Shots. Los precios estan en pesos dominicanos (RD$) con equivalente aproximado en dolares estadounidenses.",
    en: "Packages with starting prices, drawn from the official Babula Shots network rate card. Prices in Dominican pesos (RD$) with approximate US dollar equivalent."
  },
  faq: {
    es: "Las preguntas mas frecuentes que recibimos de clientes antes de reservar. Si tu pregunta no esta aqui, escribenos por WhatsApp y te respondemos en menos de 24 horas.",
    en: "The most common questions we receive from clients before booking. If your question isn't here, message us on WhatsApp and we respond within 24 hours."
  }
};

export function NetworkPage({ niche, type, locale }: { niche: Niche; type: PageType; locale: Locale }) {
  const isEn = locale === "en";
  const services = servicesByNiche(niche);
  const locations = locationsForNiche(niche);
  const packages = packagesByNiche(niche);
  const faqs = faqsForNiche(niche);
  const path = isEn ? `/en/${type}/` : `/${type}/`;
  const t = titles[type];
  const intro = intros[type];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: canonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: isEn ? t.en : t.es, item: canonicalUrl(path) }
    ]
  };

  const schemas: unknown[] = [organizationSchema, breadcrumb];

  if (type === "faq") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: isEn ? f.enQ : f.esQ,
        acceptedAnswer: { "@type": "Answer", text: isEn ? f.enA : f.esA }
      }))
    });
  }

  if (type === "servicios") {
    services.forEach((s) => {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        name: isEn ? s.enName : s.esName,
        description: isEn ? s.enDescription : s.esDescription,
        provider: { "@type": "ProfessionalService", name: "Babula Shots", telephone: phoneE164, url: siteUrl },
        url: s.url,
        areaServed: { "@type": "Country", name: "Dominican Republic" }
      });
    });
  }

  if (type === "ubicaciones") {
    locations.forEach((l) => {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Place",
        name: isEn ? l.enName : l.esName,
        address: { "@type": "PostalAddress", addressLocality: isEn ? l.enName : l.esName, addressRegion: l.province, addressCountry: "DO" },
        geo: { "@type": "GeoCoordinates", latitude: l.geo.lat, longitude: l.geo.lng }
      });
    });
  }

  if (type === "precios") {
    packages.forEach((p) => {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Offer",
        name: isEn ? p.enName : p.esName,
        description: isEn ? p.bestFor.en : p.bestFor.es,
        priceCurrency: "DOP",
        ...(p.priceDop ? { price: p.priceDop } : {}),
        availability: "https://schema.org/InStock",
        seller: { "@type": "ProfessionalService", name: "Babula Shots", url: siteUrl }
      });
    });
  }

  return (
    <main>
      <SeoJsonLd data={schemas as Record<string, unknown>[]} />
      <section className="plain-hero">
        <p className="eyebrow">Babula Shots</p>
        <h1>{isEn ? t.en : t.es}</h1>
        <p>{isEn ? intro.en : intro.es}</p>
      </section>

      {type === "servicios" && (
        <section className="section">
          <div className="wrap">
            <h2 className="section-heading-h2">{isEn ? "All services" : "Todos los servicios"}</h2>
            <div className="card-grid">
              {services.map((s) => (
                <article key={s.id} className="card">
                  <span>{isEn ? "Service" : "Servicio"}</span>
                  <h3>{isEn ? s.enName : s.esName}</h3>
                  <p>{isEn ? s.enTagline : s.esTagline}</p>
                  <ul className="service-list">
                    {(isEn ? s.deliverables.en : s.deliverables.es).map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {type === "ubicaciones" && (
        <section className="section">
          <div className="wrap">
            <h2 className="section-heading-h2">{isEn ? "All cities served" : "Todas las ciudades"}</h2>
            <div className="card-grid">
              {locations.map((l) => (
                <article key={l.id} className="card">
                  <span>{l.province}</span>
                  <h3>{isEn ? l.enName : l.esName}</h3>
                  <p>{isEn ? l.enTagline : l.esTagline}</p>
                  <p className="source-note">{isEn ? l.enDescription : l.esDescription}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {type === "precios" && (
        <section className="section">
          <div className="wrap">
            <h2 className="section-heading-h2">{isEn ? "Network rate card" : "Tarifas de la red"}</h2>
            <div className="card-grid">
              {packages.map((p) => (
                <article key={p.id} className="card package-card">
                  <span>{p.priceDisplay}</span>
                  <h3>{isEn ? p.enName : p.esName}</h3>
                  <p>{isEn ? p.bestFor.en : p.bestFor.es}</p>
                  <ul className="service-list">
                    {(isEn ? p.includes.en : p.includes.es).map((inc) => (
                      <li key={inc}>{inc}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="source-note" style={{ marginTop: "1.5rem" }}>
              {isEn
                ? "Network rate card published at "
                : "Tarifas publicadas en la red Babula Shots: "}
              <a href={`${domains.hub}/${isEn ? "en" : "es"}/prices`} rel="noopener">
                fotografosantodomingo.com
              </a>
            </p>
          </div>
        </section>
      )}

      {type === "faq" && (
        <section className="section">
          <div className="wrap faq-wrap">
            {faqs.map((f) => (
              <details key={f.id}>
                <summary>{isEn ? f.enQ : f.esQ}</summary>
                <p>{isEn ? f.enA : f.esA}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {type !== "faq" && faqs.length > 0 && (
        <section className="section alt-section">
          <div className="wrap faq-wrap">
            <p className="section-tag">{isEn ? "Common questions" : "Preguntas frecuentes"}</p>
            <h2>{isEn ? "Quick answers" : "Respuestas rapidas"}</h2>
            {faqs.slice(0, 6).map((f) => (
              <details key={f.id}>
                <summary>{isEn ? f.enQ : f.esQ}</summary>
                <p>{isEn ? f.enA : f.esA}</p>
              </details>
            ))}
            <p style={{ marginTop: "1rem" }}>
              <Link href={isEn ? "/en/faq/" : "/faq/"} className="inline-link">
                {isEn ? "See all FAQs" : "Ver todas las preguntas"}
              </Link>
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

export function getNetworkPageMetadata(niche: Niche, type: PageType, locale: Locale) {
  const isEn = locale === "en";
  const t = titles[type];
  const intro = intros[type];
  const path = isEn ? `/en/${type}/` : `/${type}/`;
  const niceNiche = niche === "bodas" ? (isEn ? "Wedding" : "Bodas")
    : niche === "inmobiliaria" ? (isEn ? "Real Estate" : "Inmobiliaria")
    : niche === "drone" ? "Drone"
    : isEn ? "Studio" : "Estudio";
  const title = `${isEn ? t.en : t.es} ${niceNiche} | Babula Shots`;
  const description = (isEn ? intro.en : intro.es).slice(0, 158);
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(path) },
    openGraph: {
      title,
      description,
      url: canonicalUrl(path),
      type: "website" as const
    }
  };
}
