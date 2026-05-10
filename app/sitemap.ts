import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogPosts";
import { cityPath, weddingCities } from "@/lib/weddingCities";

export const dynamic = "force-static";

const baseUrl = "https://boda.babulashotsrd.com";
const lastModified = new Date("2026-05-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const sharedPaths = ["/servicios/", "/en/servicios/", "/ubicaciones/", "/en/ubicaciones/", "/precios/", "/en/precios/", "/faq/", "/en/faq/"];
  return [
    {
      url: baseUrl,
      lastModified
    },
    {
      url: `${baseUrl}/en`,
      lastModified
    },
    ...sharedPaths.map((p) => ({ url: `${baseUrl}${p}`, lastModified })),
    ...weddingCities.map((city) => ({
      url: `${baseUrl}${cityPath(city.slug)}`,
      lastModified
    })),
    ...weddingCities.map((city) => ({
      url: `${baseUrl}/en${cityPath(city.slug)}`,
      lastModified
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/${post.slug}`,
      lastModified
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/en/${post.slug}`,
      lastModified
    }))
  ];
}
