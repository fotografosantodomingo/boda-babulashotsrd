import Image from "next/image";
import Link from "next/link";
import { CallbackForm } from "@/components/CallbackForm";
import { CrossSiteCta } from "@/components/CrossSiteCta";
import { HeroImage } from "@/components/HeroImage";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { blogPosts } from "@/lib/blogPosts";
import { mainBrandUrl } from "@/lib/seo";
import { cityPath, weddingCities } from "@/lib/weddingCities";

type DominicanRepublicWeddingHomeProps = {
  canonicalPath: "/" | "/fotografo-bodas-republica-dominicana";
  locale?: "es" | "en";
};

const portfolioImages = [
  {
    src: "/images/fotografo-de-boda-playa-punta-cana.webp",
    alt: "Fotógrafo de bodas en Punta Cana ceremonia en la playa"
  },
  {
    src: "/images/santo-domingo-fotografo-de-bodas.webp",
    alt: "Fotógrafo de bodas en Santo Domingo República Dominicana"
  },
  {
    src: "/images/fotografo-de-bodas-punta-cana.webp",
    alt: "Sesión de pareja para boda destino en Punta Cana"
  },
  {
    src: "/images/santo-domingo-bodas-zoona-colonial-fotoografoo-scaled.webp",
    alt: "Fotografía de boda en Zona Colonial Santo Domingo"
  },
  {
    src: "/images/wedding-photographer-dominican-republic-punta-cana-sunset.webp",
    alt: "Fotógrafo de bodas al atardecer en República Dominicana"
  },
  {
    src: "/images/mejor-fotografos-de-boda-republica-dominicana.webp",
    alt: "Fotografía de boda premium en República Dominicana"
  }
];

const venues = [
  "Kukua Beach Club (Punta Cana)",
  "Jellyfish Restaurant (Punta Cana)",
  "Casa de Campo (La Romana)",
  "Altos de Chavón (La Romana)",
  "Zona Colonial (Santo Domingo)",
  "Jardín Botánico (Santo Domingo)",
  "Playa Bonita (Las Terrenas)",
  "Playa Dorada (Puerto Plata)"
];

const featuredGuides = blogPosts.slice(0, 7);

const faqItems = [
  {
    question: "¿Cuánto cuesta un fotógrafo de bodas en República Dominicana?",
    answer: "El precio depende de horas de cobertura, locación, cantidad de fotógrafos, video, traslado y entrega final. Para cotizar, envía fecha, ciudad y tipo de boda."
  },
  {
    question: "¿Cuánto cuesta una boda en Punta Cana con fotografía profesional?",
    answer: "La fotografía para una boda en Punta Cana varía según resort, horario, ceremonia en playa, recepción, video y si se requiere cobertura completa desde preparación hasta fiesta."
  },
  {
    question: "¿Cuánto dura una sesión pre-boda?",
    answer: "Una sesión pre-boda suele durar entre una y dos horas, dependiendo de la locación, cambios de look y cantidad de espacios para retratos."
  },
  {
    question: "¿Trabajan bodas destino en República Dominicana?",
    answer: "Sí. Cubrimos bodas destino en Punta Cana, Santo Domingo, La Romana, Samaná, Puerto Plata, Las Terrenas, Bayahíbe y otras zonas del país."
  }
];

export function DominicanRepublicWeddingHome({ canonicalPath, locale = "es" }: DominicanRepublicWeddingHomeProps) {
  const isEnglish = locale === "en";
  const localizedPath = isEnglish ? `/en${canonicalPath === "/" ? "" : canonicalPath}` : canonicalPath;
  const canonicalUrl = `https://boda.babulashotsrd.com${localizedPath === "/" ? "" : localizedPath}`;
  const homeCopy = isEnglish
    ? {
        h1: "Wedding photographer in Dominican Republic",
        eyebrow: "Babula Shots · Santo Domingo · Punta Cana · La Romana · Samaná",
        heroText: "Santo Domingo · Punta Cana · La Romana · Samaná · Puerto Plata · destination weddings across the country.",
        reserve: "Book your date",
        call: "809 720 95 47",
        trust: "+100 weddings documented · Professional photographer since 2020 · Available nationwide",
        servicesTag: "Services",
        servicesTitle: "Wedding photography services",
        servicesIntro: "Babula Shots offers professional coverage for intimate weddings, destination weddings, civil ceremonies, religious celebrations, beach events, resorts, private villas and premium venues.",
        coverageTag: "Local coverage",
        coverageTitle: "Wedding photographer in the main destinations",
        coverageIntro: "These local pages help couples find wedding photography in each important Dominican Republic destination.",
        seoTag: "National SEO",
        seoTitle: "Wedding photography in Dominican Republic",
        portfolioTag: "Portfolio",
        portfolioTitle: "Dominican Republic wedding gallery",
        venuesTag: "Venues",
        venuesTitle: "Popular wedding venues",
        venuesText: "We also shape coverage for venue and destination searches, from beach clubs to historic areas, resorts, private villas and premium hotels.",
        processTag: "Process",
        testimonialsTag: "Reviews",
        testimonialsTitle: "Client reviews",
        faqTag: "FAQ",
        faqTitle: "Frequently asked questions",
        ctaEyebrow: "Booking",
        ctaTitle: "Book your wedding photographer in Dominican Republic",
        ctaText: "Send your date, location and coverage type to receive a personalized quote.",
        quote: "Request quote"
      }
    : {
        h1: "Fotógrafo de bodas en República Dominicana",
        eyebrow: "Babula Shots · Santo Domingo · Punta Cana · La Romana · Samaná",
        heroText: "Santo Domingo · Punta Cana · La Romana · Samaná · Puerto Plata · bodas destino en todo el país.",
        reserve: "Reservar fecha",
        call: "809 720 95 47",
        trust: "+100 bodas documentadas · Fotógrafo profesional desde 2020 · Disponible en todo el país",
        servicesTag: "Servicios",
        servicesTitle: "Servicios de fotografía de bodas",
        servicesIntro: "Babula Shots ofrece cobertura profesional para bodas íntimas, bodas destino, ceremonias civiles, celebraciones religiosas, eventos en playa, resorts, villas privadas y salones premium.",
        coverageTag: "Cobertura local",
        coverageTitle: "Fotógrafo de bodas en las principales ciudades",
        coverageIntro: "Creamos páginas locales para conectar parejas con fotografía de bodas en cada destino importante de República Dominicana.",
        seoTag: "SEO nacional",
        seoTitle: "Fotografía de bodas en República Dominicana",
        portfolioTag: "Portfolio",
        portfolioTitle: "Galería de bodas en República Dominicana",
        venuesTag: "Venues",
        venuesTitle: "Lugares populares para bodas",
        venuesText: "También optimizamos la cobertura para búsquedas por venue y destino, desde clubes de playa hasta espacios históricos, resorts, villas privadas y hoteles premium.",
        processTag: "Proceso",
        testimonialsTag: "Opiniones",
        testimonialsTitle: "Opiniones de clientes",
        faqTag: "Preguntas frecuentes",
        faqTitle: "Preguntas frecuentes",
        ctaEyebrow: "Reserva",
        ctaTitle: "Reserva tu fotógrafo de bodas en República Dominicana",
        ctaText: "Envía fecha, locación y tipo de cobertura para recibir una cotización personalizada.",
        quote: "Solicitar cotización"
      };
  const homeFaqItems = isEnglish
    ? [
        {
          question: "How much does a wedding photographer in Dominican Republic cost?",
          answer: "Pricing depends on coverage hours, location, number of photographers, video, travel and final delivery. Send your date, city and wedding type for a custom quote."
        },
        {
          question: "How much does a Punta Cana wedding with professional photography cost?",
          answer: "Photography for a Punta Cana wedding varies by resort, timeline, beach ceremony, reception, video needs and whether full coverage is required from getting ready to party."
        },
        {
          question: "How long does a pre-wedding session take?",
          answer: "A pre-wedding session usually takes one to two hours depending on the location, outfit changes and number of portrait areas."
        },
        {
          question: "Do you photograph destination weddings in Dominican Republic?",
          answer: "Yes. We cover destination weddings in Punta Cana, Santo Domingo, La Romana, Samaná, Puerto Plata, Las Terrenas, Bayahíbe and other areas of the country."
        }
      ]
    : faqItems;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Babula Shots",
      url: "https://boda.babulashotsrd.com/",
      telephone: "+18097209547",
      email: "info@babulashotsrd.com",
      logo: "https://boda.babulashotsrd.com/images/cropped-babulashotslogo-1.webp",
      sameAs: [
        "https://www.instagram.com/babulashotsrd/",
        "https://babulashotsrd.com/",
        "https://estudio.babulashotsrd.com/",
        "https://dron.babulashotsrd.com/",
        "https://inmobiliaria.babulashotsrd.com/"
      ],
      subOrganization: [
        { "@type": "Organization", name: "Babula Studio", url: "https://estudio.babulashotsrd.com/" },
        { "@type": "Organization", name: "Babula Drone", url: "https://dron.babulashotsrd.com/" },
        { "@type": "Organization", name: "Babula Real Estate", url: "https://inmobiliaria.babulashotsrd.com/" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: homeCopy.h1,
      url: canonicalUrl.endsWith("/") ? canonicalUrl : `${canonicalUrl}/`,
      description: isEnglish
        ? "Wedding photographer in Dominican Republic for Santo Domingo, Punta Cana, La Romana, Samaná, Puerto Plata and destination weddings."
        : "Fotógrafo de bodas en República Dominicana para Santo Domingo, Punta Cana, La Romana, Samaná, Puerto Plata y bodas destino.",
      inLanguage: isEnglish ? "en" : "es-DO"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Babula Shots Wedding Photography",
      url: isEnglish ? "https://boda.babulashotsrd.com/en/" : "https://boda.babulashotsrd.com/",
      inLanguage: isEnglish ? "en" : "es-DO",
      publisher: {
        "@type": "Organization",
        name: "Babula Shots",
        url: "https://boda.babulashotsrd.com/"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://boda.babulashotsrd.com/#localbusiness",
      name: "Babula Shots",
      url: "https://boda.babulashotsrd.com/",
      areaServed: "Dominican Republic",
      telephone: "+18097209547",
      email: "info@babulashotsrd.com",
      priceRange: "$$",
      image: "https://boda.babulashotsrd.com/images/punta-cana-fotografoo-de-bodas-scaled-e1726885635986.webp",
      address: { "@type": "PostalAddress", addressCountry: "DO" },
      sameAs: [
        "https://www.instagram.com/babulashotsrd/",
        "https://babulashotsrd.com/",
        "https://estudio.babulashotsrd.com/",
        "https://dron.babulashotsrd.com/",
        "https://inmobiliaria.babulashotsrd.com/"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: isEnglish ? "Wedding photography in Dominican Republic" : "Fotografía de bodas en República Dominicana",
      serviceType: "Wedding Photography",
      provider: {
        "@type": "LocalBusiness",
        "@id": "https://boda.babulashotsrd.com/#localbusiness",
        name: "Babula Shots",
        telephone: "+18097209547",
        url: "https://boda.babulashotsrd.com/"
      },
      areaServed: "Dominican Republic"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: homeFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isEnglish ? "Home" : "Inicio",
          item: mainBrandUrl + "/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isEnglish ? "Weddings" : "Bodas",
          item: isEnglish ? "https://boda.babulashotsrd.com/en/" : "https://boda.babulashotsrd.com/"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: homeCopy.h1,
          item: canonicalUrl.endsWith("/") ? canonicalUrl : `${canonicalUrl}/`
        }
      ]
    }
  ];

  return (
    <>
      <SeoJsonLd data={schema} />
      <main>
        <section className="city-hero">
          <HeroImage
            src="/images/punta-cana-fotografoo-de-bodas-scaled-e1726885635986.webp"
            alt={isEnglish ? "Wedding photographer in Dominican Republic" : "Fotógrafo de bodas en República Dominicana"}
            width={1200}
            height={1374}
          />
          <div className="city-hero-content">
            <p className="eyebrow">{homeCopy.eyebrow}</p>
            <h1>{homeCopy.h1}</h1>
            <p>{homeCopy.heroText}</p>
            <div className="hero-actions">
              <a className="button button-light" href="#contacto">{homeCopy.reserve}</a>
              <a className="button button-ghost" href="tel:+18097209547">{homeCopy.call}</a>
            </div>
          </div>
        </section>

        <section className="trust-bar" aria-label="Experiencia y autoridad">
          <div className="wrap">
            <p>{homeCopy.trust}</p>
          </div>
        </section>

        <section className="section">
          <div className="wrap split">
            <p className="section-tag">{homeCopy.servicesTag}</p>
            <div>
              <h2>{homeCopy.servicesTitle}</h2>
              <p>{homeCopy.servicesIntro}</p>
              <ul className="service-list">
                {(isEnglish
                  ? ["Full wedding coverage", "Pre-wedding sessions", "Destination weddings in Dominican Republic", "Beach and resort photography", "Edited online gallery", "Video, reels and social content"]
                  : ["Cobertura completa de bodas", "Sesiones pre-boda", "Bodas destino en República Dominicana", "Fotografía en playa y resorts", "Galería online editada", "Video, reels y contenido para redes"]
                ).map((service) => <li key={service}>{service}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="section alt-section">
          <div className="wrap">
            <p className="section-tag">{homeCopy.coverageTag}</p>
            <h2>{homeCopy.coverageTitle}</h2>
            <p className="section-intro">{homeCopy.coverageIntro}</p>
            <div className="city-card-grid">
              {weddingCities.map((city) => (
                <Link key={city.slug} href={`${isEnglish ? "/en" : ""}${cityPath(city.slug)}`} className="city-card">
                  <span>{city.province}</span>
                  <span className="city-card-title">{isEnglish ? `Wedding photographer in ${city.city}` : city.h1}</span>
                  <em>
                    {isEnglish
                      ? `Professional wedding photography in ${city.city} for ceremonies, destination weddings, portraits and edited online galleries.`
                      : city.description}
                  </em>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap split">
            <p className="section-tag">{homeCopy.seoTag}</p>
            <div className="copy-stack">
              <h2>{homeCopy.seoTitle}</h2>
              {(isEnglish
                ? [
                    "Babula Shots is a wedding photographer in Dominican Republic specializing in destination weddings, beach ceremonies and celebrations in Santo Domingo, Punta Cana, La Romana, Samaná, Puerto Plata, Bayahíbe and Las Terrenas. Our style combines real documentary coverage, natural direction and editorial editing for couples who want elegant, authentic memories.",
                    "Every wedding has different logistics: resort, beach, church, Zona Colonial, private villa, countryside venue or mountain setting. We design coverage around the location, timeline, available light and the moments that matter most.",
                    "From getting ready to the last dance, the goal is to deliver an emotional, consistent gallery ready to share, print and preserve."
                  ]
                : [
                    "Babula Shots es un fotógrafo de bodas en República Dominicana especializado en bodas destino, ceremonias en playa y celebraciones en Santo Domingo, Punta Cana, La Romana, Samaná, Puerto Plata, Bayahíbe y Las Terrenas. Nuestro estilo combina documentación real, dirección natural y una edición editorial pensada para parejas que quieren recuerdos elegantes y auténticos.",
                    "Cada boda tiene una logística distinta: resort, playa, iglesia, Zona Colonial, villa privada, finca o montaña. También orientamos a las parejas sobre requisitos para casarse en RD y recomendamos confirmar detalles legales con la Junta Central Electoral.",
                    "Desde la preparación hasta el último baile, el objetivo es entregar una galería emocional, consistente y lista para compartir, imprimir y conservar."
                  ]
              ).map((paragraph) => paragraph.includes("Junta Central Electoral") ? (
                <p key={paragraph}>
                  Cada boda tiene una logística distinta: resort, playa, iglesia, Zona Colonial, villa privada, finca o montaña.
                  También orientamos a las parejas sobre requisitos para casarse en RD y recomendamos confirmar detalles legales con{" "}
                  <a href="https://jce.gob.do/" target="_blank" rel="noopener noreferrer">la Junta Central Electoral</a>.
                </p>
              ) : <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="section alt-section">
          <div className="wrap">
            <p className="section-tag">{isEnglish ? "Wedding guides" : "Guías de boda"}</p>
            <h2>{isEnglish ? "Planning resources for destination weddings" : "Recursos para planificar bodas destino"}</h2>
            <p className="section-intro">
              {isEnglish
                ? "These guides support the city pages with pricing, venue and destination wedding context for couples comparing locations in Dominican Republic."
                : "Estas guías apoyan las páginas locales con contexto de precios, venues y bodas destino para parejas que comparan locaciones en República Dominicana."}
            </p>
            <div className="city-card-grid">
              {featuredGuides.map((post) => (
                <Link key={post.slug} href={`${isEnglish ? "/en" : ""}/${post.slug}`} className="city-card">
                  <span>{isEnglish ? "Guide" : "Guía"}</span>
                  <span className="city-card-title">{post.h1}</span>
                  <em>{post.description}</em>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt-section">
          <div className="wrap">
            <p className="section-tag">{homeCopy.portfolioTag}</p>
            <h2>{homeCopy.portfolioTitle}</h2>
            <div className="gallery-grid">
              {portfolioImages.map((image, index) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={1500}
                  className="gallery-image"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap split">
            <p className="section-tag">{homeCopy.venuesTag}</p>
            <div>
              <h2>{homeCopy.venuesTitle}</h2>
              <p>{homeCopy.venuesText}</p>
              <ul className="chip-list">
                {venues.map((venue) => (
                  <li key={venue}>{venue}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section alt-section">
          <div className="wrap split">
            <p className="section-tag">{homeCopy.processTag}</p>
            <div className="planning-grid">
              <article>
                <h2>{isEnglish ? "01 · Discover" : "01 · Descubrir"}</h2>
                <p>{isEnglish ? "We define date, location, city, timeline, visual style and the key moments of your wedding." : "Definimos fecha, locación, ciudad, horario, estilo visual y momentos importantes de tu boda."}</p>
              </article>
              <article>
                <h2>{isEnglish ? "02 · Create" : "02 · Crear"}</h2>
                <p>{isEnglish ? "We capture ceremony, portraits, family, party and details with natural direction and an editorial eye." : "Capturamos ceremonia, retratos, familia, fiesta y detalles con dirección natural y mirada editorial."}</p>
              </article>
              <article>
                <h2>{isEnglish ? "03 · Deliver" : "03 · Entregar"}</h2>
                <p>{isEnglish ? "You receive an edited wedding gallery ready to download, share, print and keep." : "Recibes una galería editada con fotografía de bodas lista para descargar, compartir, imprimir y guardar."}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <p className="section-tag">{homeCopy.testimonialsTag}</p>
            <h2>{homeCopy.testimonialsTitle}</h2>
            <div className="testimonials-grid">
              {(isEnglish
                ? [
                    ["“The best wedding photographer in Punta Cana. The photos from our beach ceremony feel natural, elegant and full of emotion.”", "María & Carlos · Punta Cana"],
                    ["“Our Santo Domingo wedding was documented with the perfect mix of real moments and editorial portraits.”", "Laura & Andrés · Santo Domingo"],
                    ["“Babula Shots understood the logistics of our destination wedding in La Romana and delivered a beautiful gallery.”", "Valentina & José · La Romana"]
                  ]
                : [
                    ["“El mejor fotógrafo de bodas en Punta Cana. Las fotos de nuestra ceremonia en la playa se ven naturales, elegantes y llenas de emoción.”", "María & Carlos · Punta Cana"],
                    ["“Nuestra boda en Santo Domingo quedó documentada con una mezcla perfecta de momentos reales y retratos editoriales.”", "Laura & Andrés · Santo Domingo"],
                    ["“Babula Shots entendió la logística de nuestra boda destino en La Romana y entregó una galería impecable.”", "Valentina & José · La Romana"]
                  ]).map(([quote, source]) => (
                <blockquote key={source}>
                  <p>{quote}</p>
                  <footer>{source}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt-section">
          <div className="wrap split">
            <p className="section-tag">{homeCopy.faqTag}</p>
            <div className="faq-stack">
              <h2>{homeCopy.faqTitle}</h2>
              {homeFaqItems.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CrossSiteCta locale={isEnglish ? "en" : "es"} />

        <section id="contacto" className="cta-section">
          <div className="wrap cta-grid">
            <div>
              <p className="eyebrow">{homeCopy.ctaEyebrow}</p>
              <h2>{homeCopy.ctaTitle}</h2>
              <p>{homeCopy.ctaText}</p>
              <div className="cta-actions">
                <a className="button button-light" href="mailto:info@babulashotsrd.com?subject=Fot%C3%B3grafo%20de%20bodas%20RD">
                  {homeCopy.quote}
                </a>
                <a className="button button-light" href="tel:+18097209547">809 720 95 47</a>
                <a className="button button-light" href="https://wa.me/18097209547" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="cta-form">
              <CallbackForm locale={isEnglish ? "en" : "es"} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
