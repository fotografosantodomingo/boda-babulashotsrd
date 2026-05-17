import { articles } from "@/lib/articles";
import { cityPath, weddingCities } from "@/lib/weddingCities";

type LanguagePaths = {
  es: string;
  en: string;
};

const normalizePath = (pathname: string) => {
  if (!pathname || pathname === "/") return "/";
  const clean = pathname.split("?")[0].split("#")[0];
  return clean.endsWith("/") ? clean : `${clean}/`;
};

const routePairs: LanguagePaths[] = [
  { es: "/", en: "/en/" },
  { es: "/servicios/", en: "/en/services/" },
  { es: "/ubicaciones/", en: "/en/locations/" },
  { es: "/precios/", en: "/en/prices/" },
  { es: "/faq/", en: "/en/faq/" },
  { es: "/fotografo-bodas-republica-dominicana/", en: "/en/fotografo-bodas-republica-dominicana/" },
  { es: "/blog/", en: "/en/blog/" },
  ...weddingCities.map((city) => ({ es: cityPath(city.slug), en: `/en${cityPath(city.slug)}` })),
  // Legacy /{slug}/ Spanish-only posts are NOT paired — they have no English
  // counterpart. languagePathsFor() returns en:"" for those, signalling the
  // EN switcher to hide. /en/{slug}/ used to render Spanish content wrapped in
  // English shell (mixed-language mess) — now 301-redirected to /{slug}/.
  // New bilingual articles at /blog/ + /en/blog/ — auto-derived from articles.ts.
  // Adding a new article with an `en` field automatically wires up the language toggle.
  ...articles
    .filter((a) => a.en?.enSlug)
    .map((a) => ({ es: `/blog/${a.slug}/`, en: `/en/blog/${a.en!.enSlug}/` }))
].map((pair) => ({ es: normalizePath(pair.es), en: normalizePath(pair.en) }));

export function languagePathsFor(pathname: string): LanguagePaths {
  const current = normalizePath(pathname);
  const match = routePairs.find((pair) => pair.es === current || pair.en === current);
  if (match) return match;
  return current.startsWith("/en/") ? { es: "/", en: current } : { es: current, en: "/en/" };
}

export function allLanguageRoutePairs() {
  return routePairs;
}
