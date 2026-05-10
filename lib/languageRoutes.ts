import { blogPosts } from "@/lib/blogPosts";
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
  { es: "/servicios/", en: "/en/servicios/" },
  { es: "/ubicaciones/", en: "/en/ubicaciones/" },
  { es: "/precios/", en: "/en/precios/" },
  { es: "/faq/", en: "/en/faq/" },
  { es: "/fotografo-bodas-republica-dominicana/", en: "/en/fotografo-bodas-republica-dominicana/" },
  ...weddingCities.map((city) => ({ es: cityPath(city.slug), en: `/en${cityPath(city.slug)}` })),
  ...blogPosts.map((post) => ({ es: `/${post.slug}`, en: `/en/${post.slug}` }))
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
