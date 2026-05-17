import Link from "next/link";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { faqsForNiche, packagesByNiche } from "@/lib/networkCatalog";
import { canonicalUrl, organizationSchema, phoneDisplay, phoneE164, ratingBadgeEn, ratingBadgeEs, siteUrl, whatsappUrl } from "@/lib/seo";

type Locale = "es" | "en";

const FSD_HOST = "https://www.fotografosantodomingo.com";
const bookHref = (locale: Locale, packageId?: string) => {
  const params = new URLSearchParams({ service: "wedding-photography", cta: "boda-precios" });
  if (packageId) params.set("package", packageId);
  return `${FSD_HOST}/${locale}/book?${params.toString()}`;
};
const quoteHref = (locale: Locale) =>
  `${FSD_HOST}/${locale}/get-quote?family=wedding-photography&cta=boda-precios`;

const COPY = {
  es: {
    eyebrow: "Babula Shots — Bodas",
    h1: "Precios de fotografía de bodas en República Dominicana",
    lead:
      "Paquetes para reservar online con calendario de disponibilidad en tiempo real. Cobertura para bodas destino, civiles e iglesia en Punta Cana, Cap Cana, Casa de Campo, Santo Domingo y toda la isla. Dirección bilingüe (ES / EN), narrativa documental y entrega rápida.",
    ctaBook: "Reservar fecha en calendario",
    ctaWhatsapp: "WhatsApp",
    ctaQuote: "Cotizar primero",
    valueTag: "Por qué Babula Shots",
    valueH2: "Lo que recibe la pareja al reservar",
    values: [
      {
        h: "Dirección bilingüe para bodas destino",
        p: "Coordinamos en español e inglés con el wedding planner, el resort y los invitados. Pareja de Nueva York con familia dominicana: el día fluye sin malentendidos.",
      },
      {
        h: "Experiencia real en resorts de RD",
        p: "Más de diez temporadas trabajando en Sanctuary Cap Cana, Hard Rock, Casa de Campo, Tortuga Bay, Altos de Chavón y Macao. Conocemos las luces, los tiempos y al staff.",
      },
      {
        h: "Narrativa completa del día",
        p: "Getting ready, ceremonia, sesión de pareja, recepción y hora loca. Entrega de 400-800 fotos editadas en galería privada online — lista para imprimir o compartir.",
      },
    ],

    packagesTag: "Paquetes con reserva online",
    packagesH2: "Paquetes para reservar con calendario",
    packagesIntro:
      "Cada paquete abre el calendario activo del estudio en fotografosantodomingo.com — escoges fecha disponible, pagas 50 % de depósito por Stripe y confirmamos en menos de 24 horas.",
    bookOnline: "Reservar en calendario",
    or: "o",
    customTag: "Solo por cotización personalizada",
    customH2: "Boda personalizada — multi-día o mayor producción",
    customP:
      "Para bodas con segundo fotógrafo, video, dron, álbum impreso premium, cobertura multi-día (welcome dinner, rehearsal, ceremonia, brunch) o producciones con planner internacional, preparamos cotización a medida en menos de 24 horas.",
    customCta: "Solicitar cotización personalizada",

    factorsTag: "Inversión y presupuesto",
    factorsH2: "Qué impacta el precio final de una boda en RD",
    factors: [
      { h: "Locación y traslado", p: "Santo Domingo y Distrito Nacional sin cargo; Punta Cana, Casa de Campo y Bávaro tarifa fija; Las Terrenas, Samaná o Puerto Plata cotizable según horas de viaje." },
      { h: "Horas de cobertura", p: "Cobertura mínima: 4 horas. La boda dominicana típica con hora loca pide 8-10 horas para no perder momentos clave." },
      { h: "Segundo fotógrafo", p: "Recomendado a partir de 100 invitados, ceremonias en dos venues o bodas con detalles de moda. Añade un ángulo simultáneo durante votos y entrada." },
      { h: "Dron y video", p: "Dron certificado disponible para tomas aéreas del venue. Video cinematográfico (highlight 3-5 min + film completo) cotizable como add-on." },
      { h: "Álbum impreso premium", p: "Álbum 30×30 cm tapa dura, papel mate fine-art, hasta 80 páginas. Cotizable como entrega física tras la galería digital." },
      { h: "Temporada", p: "Diciembre, enero, febrero y junio son los picos de bodas destino. Reserva con 8-12 meses de anticipación para fines de semana de alta demanda." },
    ],

    rainTag: "Plan B",
    rainH2: "Lluvia o tormenta — operación con plan B desde día uno",
    rainP:
      "Trabajamos con plan A y plan B desde la firma del contrato. Si el venue tiene cobertura interior la usamos sin perder calidad. Si no, llegamos con paraguas transparentes que producen fotos preciosas y protegen el equipo. La lluvia no cancela la cobertura ni la fecha. La temporada de huracanes en RD va de junio a noviembre; agosto-octubre son los meses pico y reforzamos contratos con cláusulas de fuerza mayor.",

    timingTag: "Cuándo reservar",
    timingH2: "Cuánta anticipación necesitas",
    timing: [
      { h: "12+ meses", p: "Diciembre-febrero alta temporada. Fines de semana en Casa de Campo y Cap Cana se llenan con 12-18 meses." },
      { h: "8-10 meses", p: "Bodas en venues populares (Sanctuary, Hard Rock, Tortuga Bay) entre marzo y junio." },
      { h: "4-6 meses", p: "Bodas en venues regulares fuera de temporada alta. Mantenemos disponibilidad cómoda." },
      { h: "1-2 meses", p: "Bodas íntimas (under 30 guests), elopements y bodas civiles entre semana — frecuentemente confirmables." },
    ],

    processTag: "Cómo trabajamos",
    processH2: "Tu boda en cuatro pasos",
    process: [
      { h: "1. Consulta y visión", p: "Videollamada de 30 minutos para entender tu boda — venues, timeline tentativo, expectativas estéticas y must-have shots." },
      { h: "2. Plan de timeline", p: "Te enviamos un timeline de fotografía recomendado, lista de locaciones por momento del día y plan B para lluvia." },
      { h: "3. Cobertura del día", p: "Llegamos 30 minutos antes del getting ready. Equipo Sony con backup, flashes Profoto, dron opcional. Cobertura discreta y documental." },
      { h: "4. Edición y entrega", p: "400-800 fotos editadas en galería privada online en 14-21 días. Pre-selección de 30 fotos en 48 horas para redes." },
    ],

    faqTag: "Preguntas frecuentes",
    faqH2: "Lo que las parejas preguntan antes de reservar",
    extraFaqs: [
      {
        q: "Puedo reservar mi fecha directamente desde el calendario online?",
        a: "Sí. Cada paquete tiene un botón 'Reservar en calendario' que abre el calendario activo del estudio en fotografosantodomingo.com. Escoges fecha disponible, pagas 50 % de depósito por Stripe y recibes confirmación inmediata por email.",
      },
      {
        q: "Aceptan tarjeta de crédito o solo transferencia?",
        a: "Aceptamos tarjeta de crédito y débito vía Stripe (depósito y pago final), transferencia local en RD o transferencia internacional para clientes fuera del país. El depósito de 50 % asegura la fecha; el saldo se paga el día de la boda.",
      },
      {
        q: "Qué pasa si tengo que cambiar la fecha después de reservar?",
        a: "Cambios de fecha con más de 60 días son sin costo si tenemos disponibilidad. Entre 30-60 días, depende del calendario. Menos de 30 días, el depósito se aplica como crédito a futura reserva (12 meses).",
      },
    ],

    bottomTag: "Reserva tu fecha hoy",
    bottomH2: "El calendario está activo — escoge fecha disponible",
    bottomP:
      "El estudio hub fotografosantodomingo.com tiene calendario online con bloqueo en tiempo real. Pagas 50 % de depósito y confirmamos por email en minutos. Si prefieres WhatsApp primero, te respondemos en menos de 24 horas con disponibilidad y cotización detallada.",
  },

  en: {
    eyebrow: "Babula Shots — Weddings",
    h1: "Wedding photography pricing in the Dominican Republic",
    lead:
      "Packages bookable online with a real-time availability calendar. Coverage for destination, civil and church weddings in Punta Cana, Cap Cana, Casa de Campo, Santo Domingo and across the island. Bilingual direction (ES / EN), documentary narrative and fast delivery.",
    ctaBook: "Reserve a date in the calendar",
    ctaWhatsapp: "WhatsApp",
    ctaQuote: "Get a quote first",
    valueTag: "Why Babula Shots",
    valueH2: "What every couple gets when booking",
    values: [
      {
        h: "Bilingual direction for destination weddings",
        p: "We coordinate in Spanish and English with the wedding planner, the resort and guests. New York couple with a Dominican family: the day flows without misunderstandings.",
      },
      {
        h: "Real resort experience across the DR",
        p: "10+ seasons working at Sanctuary Cap Cana, Hard Rock, Casa de Campo, Tortuga Bay, Altos de Chavón and Macao. We know the light, the timings and the staff.",
      },
      {
        h: "Full-day narrative",
        p: "Getting ready, ceremony, couple session, reception and hora loca. We deliver 400-800 edited photos in a private online gallery — print and share ready.",
      },
    ],

    packagesTag: "Packages with online booking",
    packagesH2: "Packages bookable with a calendar",
    packagesIntro:
      "Each package opens the studio's live calendar at fotografosantodomingo.com — pick an available date, pay a 50 % deposit via Stripe and we confirm in under 24 hours.",
    bookOnline: "Book in calendar",
    or: "or",
    customTag: "Custom-quote only",
    customH2: "Bespoke wedding — multi-day or larger production",
    customP:
      "For weddings needing a second photographer, video, drone, premium printed album, multi-day coverage (welcome dinner, rehearsal, ceremony, brunch) or productions with an international planner, we prepare a tailored quote in under 24 hours.",
    customCta: "Request a custom quote",

    factorsTag: "Investment and budget",
    factorsH2: "What affects the final price of a DR wedding",
    factors: [
      { h: "Location and travel", p: "Santo Domingo and Distrito Nacional included; Punta Cana, Casa de Campo and Bávaro flat fee; Las Terrenas, Samaná or Puerto Plata quoted based on travel hours." },
      { h: "Coverage hours", p: "Minimum coverage: 4 hours. A typical Dominican wedding with hora loca calls for 8-10 hours to avoid losing key moments." },
      { h: "Second photographer", p: "Recommended for 100+ guests, ceremonies at two venues or weddings with fashion details. Adds a simultaneous angle during vows and the entrance." },
      { h: "Drone and video", p: "Certified drone available for aerial venue shots. Cinematic video (3-5 min highlight + full film) quoted as an add-on." },
      { h: "Premium printed album", p: "30×30 cm hardcover, fine-art matte paper, up to 80 pages. Quoted as a physical delivery after the digital gallery." },
      { h: "Season", p: "December, January, February and June are peak destination-wedding months. Book 8-12 months ahead for high-demand weekends." },
    ],

    rainTag: "Plan B",
    rainH2: "Rain or storm — plan B from day one",
    rainP:
      "We work with plan A and plan B from contract signing. If the venue has indoor coverage, we use it without losing image quality. If not, we arrive with clear umbrellas that produce beautiful photos and protect gear. Rain does not cancel coverage or the date. Hurricane season in DR runs June-November; August-October are peak and contracts include force-majeure clauses.",

    timingTag: "When to book",
    timingH2: "How much lead time you need",
    timing: [
      { h: "12+ months", p: "December-February peak season. Weekends at Casa de Campo and Cap Cana fill 12-18 months out." },
      { h: "8-10 months", p: "Weddings at popular venues (Sanctuary, Hard Rock, Tortuga Bay) between March and June." },
      { h: "4-6 months", p: "Weddings at regular venues outside high season. We hold comfortable availability." },
      { h: "1-2 months", p: "Intimate weddings (under 30 guests), elopements and mid-week civil weddings — often still confirmable." },
    ],

    processTag: "How we work",
    processH2: "Your wedding in four steps",
    process: [
      { h: "1. Consult and vision", p: "30-min video call to understand your wedding — venues, tentative timeline, aesthetic expectations and must-have shots." },
      { h: "2. Timeline plan", p: "We send a recommended photography timeline, a list of locations by moment of day and a rain plan B." },
      { h: "3. Day-of coverage", p: "We arrive 30 min before getting ready. Sony gear with backup, Profoto lights, optional drone. Discreet documentary coverage." },
      { h: "4. Edit and delivery", p: "400-800 edited photos in a private online gallery in 14-21 days. 30-photo preview in 48 hours for social media." },
    ],

    faqTag: "Frequently asked",
    faqH2: "What couples ask before booking",
    extraFaqs: [
      {
        q: "Can I book my date directly from the online calendar?",
        a: "Yes. Each package has a 'Book in calendar' button that opens the studio's live calendar at fotografosantodomingo.com. Pick an available date, pay a 50 % deposit via Stripe and receive immediate email confirmation.",
      },
      {
        q: "Do you accept credit cards or only bank transfer?",
        a: "We accept credit and debit cards via Stripe (deposit and final payment), local DR transfer or international transfer for clients outside the country. The 50 % deposit secures the date; the balance is due on the wedding day.",
      },
      {
        q: "What if I need to change the date after booking?",
        a: "Date changes 60+ days out are free if we have availability. Between 30-60 days, depends on calendar. Less than 30 days, the deposit converts to credit for a future booking (12 months).",
      },
    ],

    bottomTag: "Reserve your date today",
    bottomH2: "The calendar is live — pick an available date",
    bottomP:
      "The studio hub fotografosantodomingo.com runs a live online calendar with real-time blocking. Pay a 50 % deposit and we confirm by email in minutes. Prefer WhatsApp first? We reply within 24 hours with availability and a detailed quote.",
  },
} as const;

export function WeddingPricesPage({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const t = COPY[locale];
  const packages = packagesByNiche("bodas");
  const sharedFaqs = faqsForNiche("bodas");
  const path = isEn ? "/en/precios/" : "/precios/";

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Inicio", item: canonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: isEn ? "Wedding pricing" : "Precios de bodas", item: canonicalUrl(path) },
    ],
  };

  const offers = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: t.h1,
    url: canonicalUrl(path),
    provider: { "@type": "ProfessionalService", name: "Babula Shots", telephone: phoneE164, url: siteUrl },
    itemListElement: packages.map((p) => ({
      "@type": "Offer",
      name: isEn ? p.enName : p.esName,
      description: isEn ? p.bestFor.en : p.bestFor.es,
      priceCurrency: "DOP",
      ...(p.priceDop ? { price: p.priceDop } : {}),
      availability: "https://schema.org/InStock",
      url: bookHref(locale, p.id),
      seller: { "@type": "ProfessionalService", name: "Babula Shots", url: siteUrl },
    })),
  };

  const combinedFaqs = [...sharedFaqs, ...t.extraFaqs.map((e, i) => ({ id: `extra-${i}`, esQ: e.q, esA: e.a, enQ: e.q, enA: e.a }))];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: combinedFaqs.map((f) => ({
      "@type": "Question",
      name: isEn ? f.enQ : f.esQ,
      acceptedAnswer: { "@type": "Answer", text: isEn ? f.enA : f.esA },
    })),
  };

  return (
    <main>
      <SeoJsonLd data={[organizationSchema, breadcrumb, offers, faqSchema] as Record<string, unknown>[]} />

      <section className="plain-hero">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.h1}</h1>
        <p>{t.lead}</p>
        <div className="wp-hero-ctas">
          <a className="button button-light" href={bookHref(locale)} rel="noopener">
            {t.ctaBook} →
          </a>
          <a
            className="button button-ghost"
            href={whatsappUrl(isEn ? "Hello, I'd like to check wedding availability." : "Hola, quiero consultar disponibilidad de boda.")}
            rel="noopener"
          >
            {t.ctaWhatsapp} {phoneDisplay}
          </a>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="value-strip">
            <div className="value-strip-head">
              <p className="section-tag">{t.valueTag}</p>
              <h2>{t.valueH2}</h2>
            </div>
            <div className="card-grid wp-values">
              {t.values.map((v) => (
                <article key={v.h} className="card">
                  <h3>{v.h}</h3>
                  <p>{v.p}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-divider">
        <div className="wrap">
          <p className="section-tag">{t.packagesTag}</p>
          <h2 className="section-heading-h2">{t.packagesH2}</h2>
          <p className="section-intro">{t.packagesIntro}</p>
          <div className="card-grid">
            {packages.map((p) => (
              <article key={p.id} className="card package-card wp-package-card">
                <span>{p.priceDisplay}</span>
                <h3>{isEn ? p.enName : p.esName}</h3>
                <p>{isEn ? p.bestFor.en : p.bestFor.es}</p>
                <ul className="service-list">
                  {(isEn ? p.includes.en : p.includes.es).map((inc) => (
                    <li key={inc}>{inc}</li>
                  ))}
                </ul>
                <div className="wp-package-actions">
                  <a className="button button-light" href={bookHref(locale, p.id)} rel="noopener">
                    {t.bookOnline} →
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="wp-custom-tier">
            <p className="section-tag">{t.customTag}</p>
            <h3>{t.customH2}</h3>
            <p>{t.customP}</p>
            <a className="button button-ghost" href={quoteHref(locale)} rel="noopener">
              {t.customCta} →
            </a>
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="wrap">
          <p className="section-tag">{t.factorsTag}</p>
          <h2>{t.factorsH2}</h2>
          <div className="card-grid">
            {t.factors.map((f) => (
              <article key={f.h} className="card">
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="section-tag">{t.rainTag}</p>
          <h2>{t.rainH2}</h2>
          <p style={{ maxWidth: "720px", lineHeight: 1.75 }}>{t.rainP}</p>
        </div>
      </section>

      <section className="section alt-section">
        <div className="wrap">
          <p className="section-tag">{t.timingTag}</p>
          <h2>{t.timingH2}</h2>
          <div className="card-grid">
            {t.timing.map((s) => (
              <article key={s.h} className="card">
                <span>{s.h}</span>
                <p>{s.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="section-tag">{t.processTag}</p>
          <h2>{t.processH2}</h2>
          <div className="card-grid">
            {t.process.map((s) => (
              <article key={s.h} className="card">
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="wrap faq-wrap">
          <p className="section-tag">{t.faqTag}</p>
          <h2>{t.faqH2}</h2>
          {combinedFaqs.map((f) => (
            <details key={f.id}>
              <summary>{isEn ? f.enQ : f.esQ}</summary>
              <p>{isEn ? f.enA : f.esA}</p>
            </details>
          ))}
          <p style={{ marginTop: "1rem" }}>
            <Link href={isEn ? "/en/faq/" : "/faq/"} className="inline-link">
              {isEn ? "See all FAQs →" : "Ver todas las preguntas →"}
            </Link>
          </p>
        </div>
      </section>

      <section className="section booking-cta" id="contacto">
        <div className="wrap">
          <div className="booking-cta-grid">
            <div>
              <p className="section-tag">{t.bottomTag}</p>
              <h2>{t.bottomH2}</h2>
              <p>{t.bottomP}</p>
            </div>
            <div className="booking-cta-actions">
              <a className="button button-light" href={bookHref(locale)} rel="noopener">
                {t.ctaBook} →
              </a>
              <a
                className="button button-ghost"
                href={whatsappUrl(
                  isEn ? "Hello, I'd like to check wedding availability." : "Hola, quiero consultar disponibilidad de boda."
                )}
                rel="noopener"
              >
                {t.ctaWhatsapp} {phoneDisplay}
              </a>
              <a className="button button-ghost" href={`tel:${phoneE164}`}>
                {isEn ? "Call" : "Llamar"} {phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function getWeddingPricesMetadata(locale: Locale) {
  const isEn = locale === "en";
  const t = COPY[locale];
  const path = isEn ? "/en/precios/" : "/precios/";
  return {
    title: isEn
      ? "Wedding Photography Prices Dominican Republic" + ratingBadgeEn
      : "Precios de fotografía de bodas en República Dominicana" + ratingBadgeEs,
    description: t.lead.slice(0, 158),
    alternates: { canonical: canonicalUrl(path) },
    openGraph: {
      title: t.h1,
      description: t.lead.slice(0, 158),
      url: canonicalUrl(path),
      type: "website" as const,
    },
  };
}
