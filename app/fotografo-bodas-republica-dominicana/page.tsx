import type { Metadata } from "next";
import { DominicanRepublicWeddingHome } from "@/components/DominicanRepublicWeddingHome";

export const metadata: Metadata = {
  title: "Fotógrafo de bodas en República Dominicana | Babula Shots",
  description: "Fotógrafo de bodas en República Dominicana para Santo Domingo, Punta Cana, La Romana, Samaná, Puerto Plata y bodas destino.",
  alternates: {
    canonical: "/fotografo-bodas-republica-dominicana",
    languages: {
      "es-DO": "/fotografo-bodas-republica-dominicana",
      en: "/en/fotografo-bodas-republica-dominicana",
      "x-default": "/fotografo-bodas-republica-dominicana"
    }
  },
  openGraph: {
    title: "Fotógrafo de bodas en República Dominicana | Babula Shots",
    description: "Cobertura profesional para bodas en República Dominicana con estilo natural, editorial y cinematográfico.",
    url: "/fotografo-bodas-republica-dominicana",
    locale: "es_DO",
    siteName: "Babula Shots",
    type: "website",
    images: [{ url: "/images/punta-cana-fotografoo-de-bodas-scaled-e1726885635986.webp", width: 1706, height: 1954 }]
  }
};

export default function DominicanRepublicWeddingPage() {
  return <DominicanRepublicWeddingHome canonicalPath="/fotografo-bodas-republica-dominicana" />;
}
