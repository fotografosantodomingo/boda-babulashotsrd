import Link from "next/link";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { defaultBlogPostHero, type BlogPost } from "@/lib/blogPosts";
import {
  brandLogoUrl,
  canonicalUrl,
  isoAst,
  organizationSchema,
  siteUrl
} from "@/lib/seo";

const articleCityLinks = [
  { href: "/en/fotografo-bodas-punta-cana", label: "wedding photographer in Punta Cana" },
  { href: "/en/fotografo-bodas-santo-domingo", label: "wedding photographer in Santo Domingo" },
  { href: "/en/fotografo-bodas-la-romana", label: "wedding photographer in La Romana" },
  { href: "/en/fotografo-bodas-samana", label: "wedding photographer in Samaná" },
  { href: "/en/fotografo-bodas-puerto-plata", label: "wedding photographer in Puerto Plata" }
];

function defaultArticleFaq(h1: string) {
  return [
    {
      question: "How does this guide relate to a wedding in the Dominican Republic?",
      answer: "This guide helps plan photography, venue, timing, and visual intent for couples getting married in the Dominican Republic."
    },
    {
      question: "Does Babula Shots cover destination weddings?",
      answer: "Yes. We cover destination weddings in Punta Cana, Santo Domingo, La Romana, Samaná, Las Terrenas, Puerto Plata, and other regions of the country."
    },
    {
      question: `Can I request a quote after reading ${h1}?`,
      answer: "Yes. Send date, city, venue, and coverage type to confirm availability and prepare a tailored proposal."
    }
  ];
}

export function LegacyEnArticlePage({ post }: { post: BlogPost }) {
  if (!post.en) return null;
  const en = post.en;
  const enPath = `/en/${en.enSlug}/`;
  const esPath = `/${post.slug}/`;
  const canonical = canonicalUrl(enPath);
  const esCanonical = canonicalUrl(esPath);
  const hero = post.hero ?? defaultBlogPostHero;
  const heroAbsolute = `${siteUrl}${hero.src}`;
  const faq = en.faq ?? defaultArticleFaq(en.h1);

  const schema = [
    organizationSchema,
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: en.title,
      description: en.description,
      mainEntityOfPage: canonical,
      datePublished: isoAst("2026-05-23"),
      dateModified: isoAst("2026-05-23"),
      image: heroAbsolute,
      author: { "@type": "Organization", name: "Babula Shots", "@id": `${siteUrl}#organization` },
      publisher: {
        "@type": "Organization",
        name: "Babula Shots",
        logo: { "@type": "ImageObject", url: brandLogoUrl }
      },
      inLanguage: "en"
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
        { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/en/") },
        { "@type": "ListItem", position: 2, name: "Weddings", item: canonicalUrl("/en/") },
        { "@type": "ListItem", position: 3, name: en.h1, item: canonical }
      ]
    }
  ];

  return (
    <>
      <SeoJsonLd data={schema} />
      <main>
        <section className="article-hero">
          <div className="wrap copy-stack">
            <p className="eyebrow">Wedding guide · Babula Shots</p>
            <h1>{en.h1}</h1>
            <p>{en.intro}</p>
            <p style={{ marginTop: "0.5rem" }}>
              <Link href={esPath} rel="alternate" hrefLang="es-DO" style={{ fontSize: "0.9rem" }}>
                Leer en español →
              </Link>
            </p>
          </div>
          {post.hero ? (
            <figure className="article-hero-figure">
              <img
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          ) : null}
        </section>

        <section className="section">
          <div className="wrap article-grid">
            <article className="article-copy">
              {en.bodyHtml ? (
                <div dangerouslySetInnerHTML={{ __html: en.bodyHtml }} />
              ) : (
                <>
                  <section>
                    <h2>Table of contents</h2>
                    <ul className="service-list">
                      {en.sections.map((section) => (
                        <li key={section.heading}>{section.heading}</li>
                      ))}
                      <li>FAQ</li>
                    </ul>
                  </section>
                  {en.sections.map((section) => (
                    <section key={section.heading}>
                      <h2>{section.heading}</h2>
                      <p>{section.body}</p>
                    </section>
                  ))}
                  <section>
                    <h2>FAQ</h2>
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
                <h2>Book wedding photography</h2>
                <p>If you're planning a wedding in the Dominican Republic, send the date, city, and coverage type to confirm availability.</p>
                <p><a href="mailto:info@babulashotsrd.com?subject=Wedding%20booking">Request a quote</a></p>
              </section>
            </article>
            <aside className="article-links" aria-label="Related pages">
              <h2>Related links</h2>
              {[...en.links, ...articleCityLinks].filter((link, index, links) =>
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
