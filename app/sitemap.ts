import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogPosts";
import { cityPath, weddingCities } from "@/lib/weddingCities";

export const dynamic = "force-static";

const baseUrl = "https://boda.babulashotsrd.com";
const lastModified = new Date("2026-05-05");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.95
    },
    {
      url: `${baseUrl}/fotografo-bodas-republica-dominicana`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${baseUrl}/en/fotografo-bodas-republica-dominicana`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.95
    },
    ...weddingCities.map((city) => ({
      url: `${baseUrl}${cityPath(city.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: city.priority === 1 ? 0.9 : city.priority === 2 ? 0.8 : 0.7
    })),
    ...weddingCities.map((city) => ({
      url: `${baseUrl}/en${cityPath(city.slug)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: city.priority === 1 ? 0.85 : city.priority === 2 ? 0.75 : 0.65
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/${post.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/en/${post.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.55
    }))
  ];
}
