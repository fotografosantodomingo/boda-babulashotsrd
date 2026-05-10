import type { Metadata } from "next";
import { DominicanRepublicWeddingHome } from "@/components/DominicanRepublicWeddingHome";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Fotógrafo de bodas en República Dominicana | Babula Shots",
  description: "Fotógrafo de bodas en República Dominicana. Capturamos tu día especial en Santo Domingo, Punta Cana y todo RD. Fotografía y video. Cotiza por WhatsApp.",
  alternates: {
    canonical: "/",
    languages: {
      "es-DO": "/",
      es: "/",
      en: "/en",
      "x-default": "/"
    }
  },
  openGraph: {
    title: "Fotógrafo de bodas en República Dominicana | Babula Shots",
    description: "Fotografía profesional de bodas en Santo Domingo, Punta Cana, La Romana, Samaná y toda República Dominicana.",
    url: canonicalUrl("/"),
    locale: "es_DO",
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

export default function HomePage() {
  return <DominicanRepublicWeddingHome canonicalPath="/" />;
}
