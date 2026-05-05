import type { Metadata } from "next";
import { DominicanRepublicWeddingHome } from "@/components/DominicanRepublicWeddingHome";

export const metadata: Metadata = {
  title: "Wedding photographer in Dominican Republic | Babula Shots",
  description: "Wedding photographer in Santo Domingo, Punta Cana, La Romana, Samaná and across Dominican Republic. Destination weddings, beaches and resorts.",
  alternates: {
    canonical: "/en",
    languages: {
      "es-DO": "/",
      en: "/en",
      "x-default": "/"
    }
  },
  openGraph: {
    title: "Wedding photographer in Dominican Republic | Babula Shots",
    description: "Professional wedding photography in Santo Domingo, Punta Cana, La Romana, Samaná and across Dominican Republic.",
    url: "/en",
    locale: "en_US",
    siteName: "Babula Shots",
    type: "website",
    images: [{ url: "/images/punta-cana-fotografoo-de-bodas-scaled-e1726885635986.webp", width: 1706, height: 1954 }]
  }
};

export default function EnglishHomePage() {
  return <DominicanRepublicWeddingHome canonicalPath="/" locale="en" />;
}
