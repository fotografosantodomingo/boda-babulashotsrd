import type { Metadata } from "next";
import { NetworkPage } from "@/components/NetworkPage";
import { canonicalUrl } from "@/lib/seo";

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
  return <NetworkPage niche="bodas" type="precios" locale="en" />;
}
