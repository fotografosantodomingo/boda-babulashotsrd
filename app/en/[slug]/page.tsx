import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityWeddingPage, citySeoEnhancements } from "@/components/CityWeddingPage";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { canonicalUrl } from "@/lib/seo";
import { cityPath, findCityBySlug, weddingCities } from "@/lib/weddingCities";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return weddingCities.map((city) => ({ slug: `fotografo-bodas-${city.slug}` }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const citySlug = slug.startsWith("fotografo-bodas-") ? slug.replace("fotografo-bodas-", "") : "";
  const city = citySlug ? findCityBySlug(citySlug) : null;
  if (!city) return {};

  const esUrl = cityPath(city.slug);
  const enUrl = `/en${esUrl}`;
  const cityLabel = city.city.replace(/ RD$/, "");
  const title = `Wedding Photographer ${cityLabel}, DR · 4.9★ 98 Google Reviews`;
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

export default async function EnglishSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const citySlug = slug.startsWith("fotografo-bodas-") ? slug.replace("fotografo-bodas-", "") : "";
  const city = citySlug ? findCityBySlug(citySlug) : null;
  if (!city) notFound();

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
        url: "https://boda.babulashotsrd.com/en/"
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
