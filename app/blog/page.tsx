import type { Metadata } from "next";
import Link from "next/link";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { articles } from "@/lib/articles";
import { canonicalUrl, organizationSchema, siteUrl } from "@/lib/seo";

const title = "Blog de bodas | Babula Shots";
const description =
  "Guías, tips y artículos sobre fotografía de bodas en República Dominicana: locaciones, resorts, paquetes, requisitos legales y consejos de fotógrafo profesional.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl("/blog/"),
    languages: {
      "es-DO": canonicalUrl("/blog/"),
      es: canonicalUrl("/blog/"),
      en: canonicalUrl("/en/blog/"),
      "x-default": canonicalUrl("/blog/")
    }
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl("/blog/"),
    type: "website",
    locale: "es_DO",
    siteName: "Babula Shots Bodas",
    images: [
      { url: `${siteUrl}/images/social-card-1200x630.webp`, width: 1200, height: 630, alt: "Babula Shots Bodas" }
    ]
  },
  twitter: { card: "summary_large_image", title, description }
};

export default function BlogIndex() {
  const schema = [
    organizationSchema,
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog de bodas Babula Shots",
      url: canonicalUrl("/blog/"),
      blogPost: articles.map((a) => ({
        "@type": "BlogPosting",
        headline: a.h1,
        url: canonicalUrl(`/blog/${a.slug}/`),
        datePublished: a.datePublished,
        dateModified: a.dateModified
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: canonicalUrl("/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: canonicalUrl("/blog/") }
      ]
    }
  ];

  return (
    <main>
      <SeoJsonLd data={schema} />
      <section className="plain-hero">
        <p className="eyebrow">Blog</p>
        <h1>Artículos sobre fotografía de bodas</h1>
        <p>Guías prácticas y honestas sobre locaciones, paquetes, fotografía y todo lo que necesitas saber para tu boda en República Dominicana.</p>
      </section>
      <section className="section">
        <div className="wrap">
          <h2 className="section-heading-h2">Últimos artículos</h2>
          <div className="card-grid">
            {articles.map((a) => (
              <Link key={a.slug} className="card" href={`/blog/${a.slug}/`}>
                <img src={a.hero.src} alt={a.hero.alt} loading="lazy" decoding="async" />
                <span>{a.eyebrow}</span>
                <h3>{a.h1}</h3>
                <p>{a.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
