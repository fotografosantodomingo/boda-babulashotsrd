import type { Metadata } from "next";
import { NetworkPage } from "@/components/NetworkPage";
import { canonicalUrl } from "@/lib/seo";

const enPath = "/en/services/";
const esPath = "/servicios/";
const title = "Wedding Services | Babula Shots";
const description = "Coverage, deliverables and timelines per wedding service: ceremony, reception, engagement, destination, album.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl(enPath),
    languages: {
      "es-DO": canonicalUrl(esPath),
      es: canonicalUrl(esPath),
      en: canonicalUrl(enPath),
      "x-default": canonicalUrl(esPath)
    }
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl(enPath),
    type: "website",
    locale: "en_US",
    siteName: "Babula Shots"
  },
  twitter: { card: "summary_large_image", title, description }
};

export default function Page() {
  return <NetworkPage niche="bodas" type="servicios" locale="en" />;
}
