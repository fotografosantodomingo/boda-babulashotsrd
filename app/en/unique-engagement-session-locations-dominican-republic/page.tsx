import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyEnArticlePage } from "@/components/LegacyEnArticlePage";
import { defaultBlogPostHero, findBlogPost } from "@/lib/blogPosts";
import { canonicalUrl, siteUrl } from "@/lib/seo";

const ES_SLUG = "buscas-un-lugar-unico-para-tu-preboda";

export const metadata: Metadata = (() => {
  const post = findBlogPost(ES_SLUG);
  if (!post?.en) return {};
  const en = post.en;
  const enPath = `/en/${en.enSlug}/`;
  const esPath = `/${post.slug}/`;
  const hero = post.hero ?? defaultBlogPostHero;
  return {
    title: en.title,
    description: en.description,
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
      title: en.title,
      description: en.description,
      url: canonicalUrl(enPath),
      type: "article",
      locale: "en_US",
      siteName: "Babula Shots Bodas",
      images: [{ url: `${siteUrl}${hero.src}`, alt: hero.alt }]
    },
    twitter: {
      card: "summary_large_image",
      title: en.title,
      description: en.description,
      images: [`${siteUrl}${hero.src}`]
    }
  };
})();

export default function Page() {
  const post = findBlogPost(ES_SLUG);
  if (!post?.en) notFound();
  return <LegacyEnArticlePage post={post} />;
}
