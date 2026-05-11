import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrossSiteCta } from "@/components/CrossSiteCta";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { articles, findArticle } from "@/lib/articles";
import {
  aggregateRating,
  brandLogoUrl,
  canonicalUrl,
  email,
  geoCoordinates,
  isoAst,
  organizationSchema,
  phoneDisplay,
  phoneE164,
  postalAddress,
  siteUrl,
  whatsappUrl
} from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  const path = `/blog/${slug}/`;
  const enPath = article.en?.enSlug ? `/en/blog/${article.en.enSlug}/` : null;
  const languages: Record<string, string> = {
    "es-DO": canonicalUrl(path),
    es: canonicalUrl(path),
    "x-default": canonicalUrl(path)
  };
  if (enPath) languages.en = canonicalUrl(enPath);
  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: canonicalUrl(path), languages },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: canonicalUrl(path),
      type: "article",
      locale: "es_DO",
      siteName: "Babula Shots Bodas",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      images: [{ url: `${siteUrl}${article.hero.src}`, alt: article.ogImageAlt ?? article.hero.alt }]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
      images: [`${siteUrl}${article.hero.src}`]
    }
  };
}

function paragraphWithLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const m = match[0];
    if (m.startsWith("**")) {
      parts.push(<strong key={`b-${key++}`}>{m.slice(2, -2)}</strong>);
    } else {
      const linkMatch = m.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const isExternal = linkMatch[2].startsWith("http");
        if (isExternal) {
          parts.push(
            <a key={`l-${key++}`} href={linkMatch[2]} className="inline-link" rel="noopener">
              {linkMatch[1]}
            </a>
          );
        } else {
          parts.push(
            <Link key={`l-${key++}`} href={linkMatch[2]} className="inline-link">
              {linkMatch[1]}
            </Link>
          );
        }
      } else {
        parts.push(m);
      }
    }
    lastIndex = match.index + m.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const url = canonicalUrl(`/blog/${slug}/`);
  const datePublished = article.datePublished.includes("T") ? article.datePublished : isoAst(article.datePublished);
  const dateModified = article.dateModified.includes("T") ? article.dateModified : isoAst(article.dateModified);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: canonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: canonicalUrl("/blog/") },
      { "@type": "ListItem", position: 3, name: article.h1, item: url }
    ]
  };

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.h1,
    description: article.metaDescription,
    mainEntityOfPage: url,
    datePublished,
    dateModified,
    image: `${siteUrl}${article.hero.src}`,
    author: { "@type": "Organization", name: "Babula Shots", "@id": `${siteUrl}#organization` },
    publisher: {
      "@type": "Organization",
      name: "Babula Shots",
      logo: { "@type": "ImageObject", url: brandLogoUrl }
    },
    inLanguage: "es-DO"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };

  // Brand entity — LocalBusiness (NOT Photographer) so Review Snippet validator
  // accepts the aggregateRating. See memory/schema_standards.md rule 2c.
  const localBusinessSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}#localbusiness`,
    name: "Babula Shots Bodas",
    url: siteUrl,
    image: `${siteUrl}${article.hero.src}`,
    telephone: phoneE164,
    email,
    priceRange: "US$1,500-US$6,500",
    address: postalAddress,
    geo: geoCoordinates,
    areaServed: [
      { "@type": "City", name: "Santo Domingo" },
      { "@type": "City", name: "Punta Cana" },
      { "@type": "City", name: "La Romana" },
      { "@type": "City", name: "Las Terrenas" },
      { "@type": "Country", name: "Dominican Republic" }
    ],
    aggregateRating,
    sameAs: ["https://www.instagram.com/babulashotsrd/"]
  };

  const schemas: Record<string, unknown>[] = [
    organizationSchema as Record<string, unknown>,
    localBusinessSchema,
    breadcrumb as Record<string, unknown>,
    blogPosting as Record<string, unknown>,
    faqSchema as Record<string, unknown>
  ];

  return (
    <main>
      <SeoJsonLd data={schemas} />
      <article className="article">
        <nav className="breadcrumbs" aria-label="Breadcrumbs">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link href="/blog/">Blog</Link>
          <span>/</span>
          <span>{article.h1}</span>
        </nav>

        <header className="article-header">
          <p className="eyebrow">{article.eyebrow}</p>
          <h1>{article.h1}</h1>
          <figure className="article-hero">
            <img
              src={article.hero.src}
              alt={article.hero.alt}
              width={article.hero.width}
              height={article.hero.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        </header>

        <div className="wp-content">
          {article.introParagraphs.map((p, i) => (
            <p key={`intro-${i}`}>{paragraphWithLinks(p)}</p>
          ))}

          {article.sections.map((sec) => (
            <section key={sec.heading}>
              <h2>{sec.heading}</h2>
              {sec.body.map((para, i) => (
                <p key={`${sec.heading}-${i}`}>{paragraphWithLinks(para)}</p>
              ))}
            </section>
          ))}
        </div>

        <aside className="article-cta" aria-label="Reserva tu boda">
          <div className="article-cta-text">
            <p className="section-tag">¿Lista para reservar?</p>
            <h2>Reserva tu fotografía de boda</h2>
            <p>
              Escríbenos por WhatsApp con tu fecha, locación y tipo de cobertura. Te respondemos con disponibilidad y propuesta personalizada en menos de 24 horas.
            </p>
          </div>
          <div className="article-cta-actions">
            <a
              className="button button-light"
              href={whatsappUrl(`Hola, vi el artículo "${article.h1}" y quiero más información sobre la cobertura de boda.`)}
              rel="noopener"
            >
              WhatsApp {phoneDisplay}
            </a>
            <a className="button button-outline" href={`tel:${phoneE164}`}>
              Llamar {phoneDisplay}
            </a>
            <Link className="button button-ghost" href="/precios/">
              Ver precios
            </Link>
          </div>
        </aside>

        {article.en?.enSlug && (
          <p className="article-meta">
            <span className="meta-label">English version:</span>
            <Link href={canonicalUrl(`/en/blog/${article.en.enSlug}/`)}>Read in English</Link>
          </p>
        )}

        <section className="faq-wrap">
          <p className="section-tag">Preguntas frecuentes</p>
          <h2>{article.h1} — preguntas frecuentes</h2>
          {article.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
      </article>

      {article.related.length > 0 && (
        <section className="section alt-section" aria-labelledby="related-h2">
          <div className="wrap">
            <p className="section-tag">Sigue leyendo</p>
            <h2 id="related-h2">Páginas relacionadas</h2>
            <div className="card-grid">
              {article.related.map((r) => (
                <Link key={r.href} className="card" href={r.href}>
                  <span>Relacionado</span>
                  <h3>{r.label}</h3>
                  <p>{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CrossSiteCta locale="es" />
    </main>
  );
}
