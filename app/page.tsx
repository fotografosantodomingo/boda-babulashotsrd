import type { Metadata } from "next";
import { DominicanRepublicWeddingHome } from "@/components/DominicanRepublicWeddingHome";

export const metadata: Metadata = {
  title: "Fotógrafo de bodas en República Dominicana | Babula Shots",
  description: "Fotógrafo de bodas en República Dominicana. Capturamos tu día especial en Santo Domingo, Punta Cana y todo RD. Fotografía y video profesional.",
  alternates: {
    canonical: "/",
    languages: {
      "es-DO": "/",
      en: "/en",
      "x-default": "/"
    }
  },
  openGraph: {
    title: "Fotógrafo de bodas en República Dominicana | Babula Shots",
    description: "Fotografía profesional de bodas en Santo Domingo, Punta Cana, La Romana, Samaná y toda República Dominicana.",
    url: "/",
    locale: "es_DO",
    siteName: "Babula Shots",
    type: "website",
    images: [{ url: "/images/punta-cana-fotografoo-de-bodas-scaled-e1726885635986.webp", width: 1200, height: 1374 }]
  }
};

export default function HomePage() {
  return <DominicanRepublicWeddingHome canonicalPath="/" />;
}
