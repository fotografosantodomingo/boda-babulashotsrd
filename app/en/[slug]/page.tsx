import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CityWeddingPage, citySeoEnhancements } from "@/components/CityWeddingPage";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { blogPosts, findBlogPost } from "@/lib/blogPosts";
import { canonicalUrl } from "@/lib/seo";
import { cityPath, findCityBySlug, weddingCities } from "@/lib/weddingCities";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const englishArticleCityLinks = [
  { href: "/en/fotografo-bodas-punta-cana", label: "wedding photographer Punta Cana" },
  { href: "/en/fotografo-bodas-santo-domingo", label: "wedding photography in Santo Domingo" },
  { href: "/en/fotografo-bodas-la-romana", label: "wedding photographer in La Romana" },
  { href: "/en/fotografo-bodas-samana", label: "destination wedding photographer in Samaná" },
  { href: "/en/fotografo-bodas-puerto-plata", label: "wedding photographer in Puerto Plata" }
];

function englishArticleFaq(postTitle: string) {
  return [
    {
      question: "How does this guide help with a Dominican Republic wedding?",
      answer: "It helps couples plan photography, venue timing, location choices and destination wedding logistics in Dominican Republic."
    },
    {
      question: "Does Babula Shots photograph destination weddings?",
      answer: "Yes. We cover destination weddings in Punta Cana, Santo Domingo, La Romana, Samaná, Las Terrenas, Puerto Plata and other areas of the country."
    },
    {
      question: `Can I request a quote after reading ${postTitle}?`,
      answer: "Yes. Send your date, city, venue and coverage needs to confirm availability and receive a custom proposal."
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
    const esUrl = cityPath(city.slug);
    const enUrl = `/en${esUrl}`;
    const title = `Wedding photographer in ${city.city} | Babula Shots`;
    const description = `Wedding photographer in ${city.city} for destination weddings, ceremonies, portraits and edited galleries in Dominican Republic.`;

    return {
      title,
      description,
      alternates: {
        canonical: enUrl,
        languages: {
          "es-DO": esUrl,
          es: esUrl,
          en: enUrl,
          "x-default": esUrl
        }
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl(enUrl),
        images: [{ url: city.images[0], width: 1600, height: 2000, alt: title }],
        type: "website",
        locale: "en_US",
        siteName: "Babula Shots"
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [city.images[0]]
      }
    };
  }

  const post = findBlogPost(slug);
  if (!post) return {};
  const title = `${post.title} | Babula Shots`;

  return {
    title,
    description: post.description,
    alternates: {
      canonical: `/en/${post.slug}`,
      languages: {
        "es-DO": `/${post.slug}`,
        es: `/${post.slug}`,
        en: `/en/${post.slug}`,
        "x-default": `/${post.slug}`
      }
    },
    openGraph: {
      title,
      description: post.description,
      url: canonicalUrl(`/en/${post.slug}`),
      locale: "en_US",
      siteName: "Babula Shots",
      images: [{ url: "/images/fotografo-de-bodas-4.webp", width: 1366, height: 2048 }]
    }
  };
}

export default async function EnglishSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const citySlug = slug.startsWith("fotografo-bodas-") ? slug.replace("fotografo-bodas-", "") : "";
  const city = citySlug ? findCityBySlug(citySlug) : null;

  if (city) {
    const canonical = `https://boda.babulashotsrd.com/en${cityPath(city.slug)}`;
    const questions = [
      {
        question: `How much does a wedding photographer in ${city.city} cost?`,
        answer: `Pricing depends on duration, venue, number of photographers, final delivery and whether the wedding in ${city.city} requires travel. Send date, location and coverage type for an exact quote.`
      },
      {
        question: `Do you photograph destination weddings in ${city.city}?`,
        answer: `Yes. Babula Shots photographs destination weddings in ${city.city} and other areas of Dominican Republic, including beaches, resorts, private villas, countryside venues, churches and intimate events.`
      },
      {
        question: "Do you deliver edited photos?",
        answer: "Yes. Delivery includes a final edited gallery with professional selection, consistent visual style and files ready to download, share and print."
      }
    ];
    const enhancement = citySeoEnhancements[city.slug];
    if (enhancement) {
      questions.push(...enhancement.faq.map((item) => ({
        question: item.englishQuestion,
        answer: item.englishAnswer
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
        name: `Wedding photography in ${city.city}`,
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
            name: "Home",
            item: "https://babulashotsrd.com/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Weddings",
            item: "https://boda.babulashotsrd.com/en/"
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `Wedding photographer in ${city.city}`,
            item: canonical
          }
        ]
      }
    ];

    return (
      <>
        <SeoJsonLd data={schema} />
        <CityWeddingPage city={city} locale="en" />
      </>
    );
  }

  const post = findBlogPost(slug);
  if (!post) notFound();
  const faq = post.faq ?? englishArticleFaq(post.h1);
  const canonical = `https://boda.babulashotsrd.com/en/${post.slug}`;

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
      author: { "@type": "Organization", name: "Babula Shots" },
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
      url: "https://boda.babulashotsrd.com/en/",
      telephone: "+18097209547",
      email: "info@babulashotsrd.com",
      priceRange: "$$",
      address: { "@type": "PostalAddress", addressCountry: "DO" }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Wedding photography in Dominican Republic",
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
        { "@type": "ListItem", position: 1, name: "Home", item: "https://babulashotsrd.com/" },
        { "@type": "ListItem", position: 2, name: "Weddings", item: "https://boda.babulashotsrd.com/en/" },
        { "@type": "ListItem", position: 3, name: post.h1, item: canonical }
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
            <h1>{post.h1}</h1>
            <p>{post.intro}</p>
          </div>
        </section>

        <section className="section">
          <div className="wrap article-grid">
            <article className="article-copy">
              {post.bodyHtml ? (
                <div dangerouslySetInnerHTML={{ __html: post.bodyHtml.replaceAll('href="/', 'href="/en/') }} />
              ) : (
                <>
                  <section>
                    <h2>Table of contents</h2>
                    <ul className="service-list">
                      {post.sections.map((section) => (
                        <li key={section.heading}>{section.heading}</li>
                      ))}
                      <li>FAQ</li>
                    </ul>
                  </section>
                  {post.sections.map((section) => (
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
                <p>If you are planning a wedding in Dominican Republic, send your date, city and coverage needs to confirm availability.</p>
                <p><a href="mailto:info@babulashotsrd.com?subject=Wedding%20photography%20quote">Request a quote</a></p>
              </section>
            </article>
            <aside className="article-links" aria-label="Related pages">
              <h2>Related links</h2>
              {[
                ...post.links.map((link) => ({ href: `/en${link.href}`, label: link.label })),
                ...englishArticleCityLinks
              ].filter((link, index, links) =>
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
