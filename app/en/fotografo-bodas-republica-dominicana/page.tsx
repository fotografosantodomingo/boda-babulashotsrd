import type { Metadata } from "next";
import { DominicanRepublicWeddingHome } from "@/components/DominicanRepublicWeddingHome";

export const metadata: Metadata = {
  title: "Wedding photographer in Dominican Republic | Babula Shots",
  description: "Wedding photographer in Dominican Republic for Santo Domingo, Punta Cana, La Romana, Samaná, Puerto Plata and destination weddings.",
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
    description: "Professional coverage for Dominican Republic weddings with a natural, editorial and cinematic style.",
    url: "/en",
    locale: "en_US",
    siteName: "Babula Shots",
    type: "website",
    images: [{ url: "/images/punta-cana-fotografoo-de-bodas-scaled-e1726885635986.webp", width: 1200, height: 1374 }]
  }
};

export default function EnglishDominicanRepublicWeddingPage() {
  return <DominicanRepublicWeddingHome canonicalPath="/" locale="en" />;
}
