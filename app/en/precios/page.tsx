import type { Metadata } from "next";
import { NetworkPage } from "@/components/NetworkPage";
import { canonicalUrl } from "@/lib/seo";

// Alias for the legacy /en/precios/ path. Same English content as /en/prices/
// but canonical points at the EN slug so search engines index only one URL.
const enPath = "/en/prices/";
const esPath = "/precios/";
const title = "Wedding Prices | Babula Shots";
const description = "Wedding package prices in Dominican pesos with US dollar equivalent. Network rate card from fotografosantodomingo.com.";

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
  return <NetworkPage niche="bodas" type="precios" locale="en" />;
}
