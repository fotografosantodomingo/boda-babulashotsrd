import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CityWeddingPage, citySeoEnhancements } from "@/components/CityWeddingPage";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { blogPosts, findBlogPost } from "@/lib/blogPosts";
import { cityPath, findCityBySlug, weddingCities } from "@/lib/weddingCities";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const articleCityLinks = [
  { href: "/fotografo-bodas-punta-cana", label: "fotógrafo de bodas en Punta Cana" },
  { href: "/fotografo-bodas-santo-domingo", label: "fotografía de bodas en Santo Domingo" },
  { href: "/fotografo-bodas-la-romana", label: "fotógrafo de bodas en La Romana" },
  { href: "/fotografo-bodas-samana", label: "fotógrafo de bodas en Samaná" },
  { href: "/fotografo-bodas-puerto-plata", label: "fotógrafo de bodas en Puerto Plata" }
];

function articleFaq(postTitle: string) {
  return [
    {
      question: `¿Cómo se relaciona esta guía con una boda en República Dominicana?`,
      answer: `Esta guía ayuda a planificar fotografía, locación, horarios e intención visual para parejas que se casan en República Dominicana.`
    },
    {
      question: "¿Babula Shots trabaja bodas destino?",
      answer: "Sí. Cubrimos bodas destino en Punta Cana, Santo Domingo, La Romana, Samaná, Las Terrenas, Puerto Plata y otras zonas del país."
    },
    {
      question: `¿Puedo pedir una cotización después de leer ${postTitle}?`,
      answer: "Sí. Envía fecha, ciudad, venue y tipo de cobertura para confirmar disponibilidad y preparar una propuesta personalizada."
    }
  ];
}

export function generateStaticParams() {
  return [
    ...weddingCities.map((city) => ({ slug: `fotografo-bodas-${city.slug}` })),
    ...blogPosts.map((post) => ({ slug: post.slug }))
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const citySlug = slug.startsWith("fotografo-bodas-") ? slug.replace("fotografo-bodas-", "") : "";
  const city = citySlug ? findCityBySlug(citySlug) : null;

  if (city) {
    const url = cityPath(city.slug);

    return {
      title: city.title,
      description: city.description,
      alternates: {
        canonical: url,
        languages: {
          "es-DO": url,
          en: `/en${url}`,
          "x-default": url
        }
      },
      openGraph: {
        title: city.title,
        description: city.description,
        url,
        images: [{ url: city.images[0], width: 1600, height: 2000, alt: city.h1 }],
        type: "website",
        locale: "es_DO"
      },
      twitter: {
        card: "summary_large_image",
        title: city.title,
        description: city.description,
        images: [city.images[0]]
      }
    };
  }

  const post = findBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/${post.slug}`,
      languages: {
        "es-DO": `/${post.slug}`,
        en: `/en/${post.slug}`,
        "x-default": `/${post.slug}`
      }
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/${post.slug}`,
      images: [{ url: "/images/fotografo-de-bodas-4.webp", width: 1366, height: 2048 }]
    }
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const citySlug = slug.startsWith("fotografo-bodas-") ? slug.replace("fotografo-bodas-", "") : "";
  const city = citySlug ? findCityBySlug(citySlug) : null;

  if (city) {
    const canonical = `https://boda.babulashotsrd.com${cityPath(city.slug)}`;
    const questions = [
      {
        question: `¿Cuánto cuesta un fotógrafo de bodas en ${city.city}?`,
        answer: `El precio depende de duración, locación, cantidad de fotógrafos, entrega final y si la boda en ${city.city} requiere traslado. Para una cotización exacta, envía fecha, lugar y tipo de cobertura.`
      },
      {
        question: `¿Trabajas bodas destino en ${city.city}?`,
        answer: `Sí. Babula Shots trabaja bodas destino en ${city.city} y otras zonas de República Dominicana, incluyendo playa, resorts, villas privadas, fincas, iglesias y eventos íntimos.`
      },
      {
        question: "¿Entregas fotos editadas?",
        answer: "Sí. La entrega incluye una galería final editada con selección profesional, estilo visual consistente y archivos listos para descargar, compartir e imprimir."
      }
    ];
    const enhancement = citySeoEnhancements[city.slug];
    if (enhancement) {
      questions.push(...enhancement.faq.map((item) => ({
        question: item.question,
        answer: item.answer
      })));
    }

    const schema = [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Babula Shots",
        url: canonical,
        image: `https://boda.babulashotsrd.com${city.images[0]}`,
        telephone: "+18097209547",
        email: "info@babulashotsrd.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Santo Domingo",
          addressCountry: "DO"
        },
        areaServed: {
          "@type": "City",
          name: city.city
        },
        priceRange: "$$",
        sameAs: ["https://www.instagram.com/babulashotsrd/"]
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Fotografía de bodas en ${city.city}`,
        serviceType: "Wedding photography",
        provider: {
          "@type": "LocalBusiness",
          name: "Babula Shots",
          telephone: "+18097209547",
          url: "https://boda.babulashotsrd.com/"
        },
        areaServed: {
          "@type": "City",
          name: city.city
        },
        offers: {
          "@type": "Offer",
          url: canonical,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://boda.babulashotsrd.com/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: city.h1,
            item: canonical
          }
        ]
      }
    ];

    return (
      <>
        <SeoJsonLd data={schema} />
        <CityWeddingPage city={city} />
      </>
    );
  }

  const post = findBlogPost(slug);
  if (!post) notFound();
  const faq = post.faq ?? articleFaq(post.h1);
  const canonical = `https://boda.babulashotsrd.com/${post.slug}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      mainEntityOfPage: canonical,
      datePublished: "2026-05-05",
      dateModified: "2026-05-05",
      image: "https://boda.babulashotsrd.com/images/punta-cana-fotografoo-de-bodas-scaled-e1726885635986.webp",
      author: {
        "@type": "Organization",
        name: "Babula Shots"
      },
      publisher: {
        "@type": "Organization",
        name: "Babula Shots",
        logo: {
          "@type": "ImageObject",
          url: "https://boda.babulashotsrd.com/images/cropped-babulashotslogo-1.webp"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Babula Shots",
      url: "https://boda.babulashotsrd.com/",
      telephone: "+18097209547",
      email: "info@babulashotsrd.com",
      priceRange: "$$",
      address: { "@type": "PostalAddress", addressCountry: "DO" }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Fotografía de bodas en República Dominicana",
      serviceType: "Wedding photography",
      provider: { "@type": "LocalBusiness", name: "Babula Shots", telephone: "+18097209547" },
      areaServed: "Dominican Republic"
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://boda.babulashotsrd.com/" },
        { "@type": "ListItem", position: 2, name: post.h1, item: canonical }
      ]
    }
  ];

  return (
    <>
      <SeoJsonLd data={schema} />
      <main>
        <section className="article-hero">
          <div className="wrap copy-stack">
            <p className="eyebrow">Guía de bodas · Babula Shots</p>
            <h1>{post.h1}</h1>
            <p>{post.intro}</p>
          </div>
        </section>

        <section className="section">
          <div className="wrap article-grid">
            <article className="article-copy">
              {post.bodyHtml ? (
                <div dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
              ) : (
                <>
                  <section>
                    <h2>Tabla de contenidos</h2>
                    <ul className="service-list">
                      {post.sections.map((section) => (
                        <li key={section.heading}>{section.heading}</li>
                      ))}
                      <li>Preguntas frecuentes</li>
                    </ul>
                  </section>
                  {post.sections.map((section) => (
                    <section key={section.heading}>
                      <h2>{section.heading}</h2>
                      <p>{section.body}</p>
                    </section>
                  ))}
                  <section>
                    <h2>Preguntas frecuentes</h2>
                    <div className="faq-stack">
                      {faq.map((item) => (
                        <article key={item.question}>
                          <h3>{item.question}</h3>
                          <p>{item.answer}</p>
                        </article>
                      ))}
                    </div>
                  </section>
                </>
              )}
              <section>
                <h2>Reserva fotografía para tu boda</h2>
                <p>Si estás organizando una boda en República Dominicana, envía fecha, ciudad y tipo de cobertura para confirmar disponibilidad.</p>
                <p><a href="mailto:info@babulashotsrd.com?subject=Reserva%20de%20boda">Solicitar cotización</a></p>
              </section>
            </article>
            <aside className="article-links" aria-label="Páginas relacionadas">
              <h2>Links relacionados</h2>
              {[...post.links, ...articleCityLinks].filter((link, index, links) =>
                links.findIndex((item) => item.href === link.href) === index
              ).slice(0, 8).map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
