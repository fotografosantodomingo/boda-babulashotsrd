import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { blogPosts } from "@/lib/blogPosts";
import { allLanguageRoutePairs } from "@/lib/languageRoutes";
import { canonicalUrl } from "@/lib/seo";
import { cityPath, weddingCities } from "@/lib/weddingCities";

export const dynamic = "force-static";

const lastModified = new Date("2026-05-05");

// Build a Set of ES paths that have an EN counterpart (from allLanguageRoutePairs).
// Used to skip emitting duplicate single entries for bilingual paths.
const pairedEsPaths = new Set(allLanguageRoutePairs().map((p) => p.es));
const pairedEnPaths = new Set(allLanguageRoutePairs().map((p) => p.en));

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // ── 1. Bilingual route pairs (from languageRoutes.ts) ───────────────────
  // Each pair gets a single entry with alternates.languages so Googlebot sees
  // xhtml:link rel="alternate" hreflang tags inside the sitemap XML.
  for (const { es, en } of allLanguageRoutePairs()) {
    entries.push({
      url: canonicalUrl(es),
      lastModified,
      alternates: {
        languages: {
          "es-DO": canonicalUrl(es),
          "es": canonicalUrl(es),
          "en": canonicalUrl(en),
          "x-default": canonicalUrl(es)
        }
      }
    });
    // Mirror entry under the EN URL pointing back to ES.
    entries.push({
      url: canonicalUrl(en),
      lastModified,
      alternates: {
        languages: {
          "es-DO": canonicalUrl(es),
          "es": canonicalUrl(es),
          "en": canonicalUrl(en),
          "x-default": canonicalUrl(es)
        }
      }
    });
  }

  // ── 2. Spanish-only blog posts (no EN counterpart) ─────────────────────
  // blogPosts without `en` field — only emit a plain <loc> entry.
  for (const post of blogPosts) {
    const esPath = `/${post.slug}/`;
    if (pairedEsPaths.has(esPath)) continue; // already emitted above
    entries.push({ url: canonicalUrl(esPath), lastModified });
  }

  // ── 3. City pages not already in routePairs ─────────────────────────────
  // (weddingCities are in allLanguageRoutePairs via languageRoutes.ts — skip)
  for (const city of weddingCities) {
    const esPath = cityPath(city.slug);
    const enPath = `/en${cityPath(city.slug)}`;
    if (pairedEsPaths.has(esPath)) continue;
    entries.push({ url: canonicalUrl(esPath), lastModified });
    entries.push({ url: canonicalUrl(enPath), lastModified });
  }

  // ── 4. Blog articles not already in routePairs ──────────────────────────
  // (articles with en.enSlug are in allLanguageRoutePairs — skip duplicates)
  for (const a of articles) {
    const esPath = `/blog/${a.slug}/`;
    if (pairedEsPaths.has(esPath)) continue;
    entries.push({ url: canonicalUrl(esPath), lastModified: new Date(a.dateModified) });
  }
  for (const a of articles.filter((x) => x.en?.enSlug)) {
    const enPath = `/en/blog/${a.en!.enSlug}/`;
    if (pairedEnPaths.has(enPath)) continue;
    entries.push({ url: canonicalUrl(enPath), lastModified: new Date(a.dateModified) });
  }

  return entries;
}
