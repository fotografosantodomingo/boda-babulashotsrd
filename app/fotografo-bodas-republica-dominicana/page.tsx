import type { Metadata } from "next";
import { DominicanRepublicWeddingHome } from "@/components/DominicanRepublicWeddingHome";

export const metadata: Metadata = {
  title: "Fotógrafo de bodas en República Dominicana · 4.9★ 98 reseñas Google",
  description: "Fotógrafo de bodas en República Dominicana para Santo Domingo, Punta Cana, La Romana, Samaná, Puerto Plata y bodas destino.",
  alternates: {
    canonical: "/",
    languages: {
      "es-DO": "/",
      en: "/en",
      "x-default": "/"
    }
  },
  openGraph: {
    title: "Fotógrafo de bodas en República Dominicana · 4.9★ 98 reseñas Google",
    description: "Cobertura profesional para bodas en República Dominicana con estilo natural, editorial y cinematográfico.",
    url: "/",
    locale: "es_DO",
    siteName: "Babula Shots",
    type: "website",
    images: [{ url: "/images/punta-cana-fotografoo-de-bodas-scaled-e1726885635986.webp", width: 1200, height: 1374 }]
  }
};

export default function DominicanRepublicWeddingPage() {
  return <DominicanRepublicWeddingHome canonicalPath="/" />;
}
