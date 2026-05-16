import type { Metadata } from "next";
import { NetworkPage } from "@/components/NetworkPage";
import { canonicalUrl } from "@/lib/seo";

// Alias for the legacy /en/servicios/ path. Same English content as /en/services/
// but canonical points at the EN slug so search engines index only one URL.
const enPath = "/en/services/";
const esPath = "/servicios/";
const title = "Wedding Photography Services DR · 4.9★ Babula Shots";
const description = "Coverage, deliverables and timelines per wedding service: ceremony, reception, engagement, destination, album.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl(enPath),
    languages: {
      "es-DO": canonicalUrl(esPath),
      en: canonicalUrl(enPath),
      "x-default": canonicalUrl(esPath)
    }
  },
  robots: { index: false, follow: true },
  openGraph: {
    title,
    description,
    url: canonicalUrl(enPath),
    type: "website",
    locale: "en_US",
    siteName: "Babula Shots"
  }
};

export default function Page() {
  return <NetworkPage niche="bodas" type="servicios" locale="en" />;
}
