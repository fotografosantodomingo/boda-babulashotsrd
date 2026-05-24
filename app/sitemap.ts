import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { blogPosts } from "@/lib/blogPosts";
import { cityPath, weddingCities } from "@/lib/weddingCities";

export const dynamic = "force-static";

const baseUrl = "https://boda.babulashotsrd.com";
const lastModified = new Date("2026-05-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const sharedPaths = ["/servicios/", "/en/services/", "/ubicaciones/", "/en/locations/", "/precios/", "/en/prices/", "/faq/", "/en/faq/"];
  return [
    {
      url: `${baseUrl}/`,
      lastModified
    },
    {
      url: `${baseUrl}/en/`,
      lastModified
    },
    ...sharedPaths.map((p) => ({ url: `${baseUrl}${p}`, lastModified })),
    // Blog index (Spanish only for now — English /en/blog/ index can come later)
    { url: `${baseUrl}/blog/`, lastModified },
    // City wedding pages
    ...weddingCities.map((city) => ({
      url: `${baseUrl}${cityPath(city.slug)}`,
      lastModified
    })),
    ...weddingCities.map((city) => ({
      url: `${baseUrl}/en${cityPath(city.slug)}`,
      lastModified
    })),
    // Legacy flat-URL blog posts — Spanish at /{slug}/, English mirrors at /en/<enSlug>/
    // when the post has an `en` field (auto-wired from blogPosts.ts).
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/${post.slug}/`,
      lastModified
    })),
    ...blogPosts
      .filter((p) => p.en?.enSlug)
      .map((p) => ({
        url: `${baseUrl}/en/${p.en!.enSlug}/`,
        lastModified
      })),
    // New bilingual articles at /blog/ + /en/blog/
    ...articles.map((a) => ({
      url: `${baseUrl}/blog/${a.slug}/`,
      lastModified: new Date(a.dateModified)
    })),
    ...articles
      .filter((a) => a.en?.enSlug)
      .map((a) => ({
        url: `${baseUrl}/en/blog/${a.en!.enSlug}/`,
        lastModified: new Date(a.dateModified)
      }))
  ];
}
