import type { Metadata } from "next";
import { WeddingPricesPage, getWeddingPricesMetadata } from "@/components/WeddingPricesPage";
import { canonicalUrl } from "@/lib/seo";

const esPath = "/precios/";
const enPath = "/en/prices/";
const base = getWeddingPricesMetadata("es");

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: canonicalUrl(esPath),
    languages: {
      "es-DO": canonicalUrl(esPath),
      en: canonicalUrl(enPath),
      "x-default": canonicalUrl(esPath)
    }
  },
  openGraph: {
    ...base.openGraph,
    locale: "es_DO",
    siteName: "Babula Shots Bodas"
  }
};

export default function Page() {
  return <WeddingPricesPage locale="es" />;
}
