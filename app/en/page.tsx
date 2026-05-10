import type { Metadata } from "next";
import { DominicanRepublicWeddingHome } from "@/components/DominicanRepublicWeddingHome";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Wedding photographer in Dominican Republic | Babula Shots",
  description: "Wedding photographer in Santo Domingo, Punta Cana, La Romana, Samaná and across Dominican Republic. Destination weddings and beach resorts. Quote on WhatsApp.",
  alternates: {
    canonical: "/en",
    languages: {
      "es-DO": "/",
      es: "/",
      en: "/en",
      "x-default": "/"
    }
  },
  openGraph: {
    title: "Wedding photographer in Dominican Republic | Babula Shots",
    description: "Professional wedding photography in Santo Domingo, Punta Cana, La Romana, Samaná and across Dominican Republic.",
    url: canonicalUrl("/en"),
    locale: "en_US",
    siteName: "Babula Shots",
    type: "website",
    images: [
      {
        url: "/images/social-card-1200x630.webp",
        width: 1200,
        height: 630,
        alt: "Babula Shots Bodas"
      }
    ]
  }
};

export default function EnglishHomePage() {
  return <DominicanRepublicWeddingHome canonicalPath="/" locale="en" />;
}
