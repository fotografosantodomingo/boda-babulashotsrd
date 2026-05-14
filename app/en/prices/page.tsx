import type { Metadata } from "next";
import { WeddingPricesPage, getWeddingPricesMetadata } from "@/components/WeddingPricesPage";
import { canonicalUrl } from "@/lib/seo";

const enPath = "/en/prices/";
const esPath = "/precios/";
const base = getWeddingPricesMetadata("en");

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: canonicalUrl(enPath),
    languages: {
      "es-DO": canonicalUrl(esPath),
      en: canonicalUrl(enPath),
      "x-default": canonicalUrl(esPath)
    }
  },
  openGraph: {
    ...base.openGraph,
    locale: "en_US",
    siteName: "Babula Shots Weddings"
  },
  twitter: { card: "summary_large_image", title: base.title, description: base.description }
};

export default function Page() {
  return <WeddingPricesPage locale="en" />;
}
