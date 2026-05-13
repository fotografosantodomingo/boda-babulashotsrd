export const basePath = "";
export const siteOrigin = "https://boda.babulashotsrd.com";
export const siteUrl = siteOrigin;
export const mainBrandUrl = "https://babulashotsrd.com";
export const bodaUrl = "https://boda.babulashotsrd.com";
export const inmobiliariaUrl = "https://inmobiliaria.babulashotsrd.com";
export const droneUrl = "https://dron.babulashotsrd.com";
export const santoDomingoHubUrl = "https://www.fotografosantodomingo.com";
export const bookingUrl = "https://babulashotsrd.com/";
export const phoneDisplay = "809 720 95 47";
export const phoneE164 = "+18097209547";
export const email = "info@babulashotsrd.com";
export const whatsappNumber = "18097209547";
export const portfolioUrl = "https://babulashots.pic-time.com/client";

export const niche = {
  label: "Boda",
  enLabel: "Weddings",
  whatsappContext: "Hola, vengo de la web de Bodas Babula Shots."
};

export function withBasePath(path: string) {
  if (path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function canonicalUrl(path: string) {
  const normalized = path === "/" ? "/" : `${path.replace(/^\/|\/$/g, "")}/`;
  return `${siteUrl}${normalized === "/" ? "/" : `/${normalized}`}`;
}

export function assetPath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// ──────────────────────────────────────────────────────────────────────────
// Schema standards — see ~/.claude/.../memory/schema_standards.md
// Apply these patterns on every new page to avoid Google Rich Results warnings.
// ──────────────────────────────────────────────────────────────────────────

// Brand logo / image used by Organization + as Publisher inside Article schemas.
export const brandLogoUrl = `${mainBrandUrl}/wp-content/uploads/2023/05/cropped-babulashotslogo-1.png`;

// ISO 8601 datetime helper. Dominican Republic = UTC-4 year-round (no DST).
// Use for datePublished/dateModified — bare "YYYY-MM-DD" fails Rich Results
// validator with "Invalid datetime / Missing timezone" warnings.
export function isoAst(dateString: string, time = "12:00:00"): string {
  const d = dateString.length === 10 ? dateString : dateString.slice(0, 10);
  return `${d}T${time}-04:00`;
}

// Canonical address (no streetAddress / postalCode — those would be invented data;
// see ~/.claude/.../memory/babula_studio_address.md).
export const postalAddress = {
  "@type": "PostalAddress" as const,
  addressLocality: "Santo Domingo",
  addressRegion: "Distrito Nacional",
  addressCountry: "DO"
};

// Brand-wide aggregate rating (5/5 from 23 reviews).
export const aggregateRating = {
  "@type": "AggregateRating" as const,
  ratingValue: "5",
  bestRating: "5",
  worstRating: "1",
  ratingCount: "23",
  reviewCount: "23"
};

// Santo Domingo center fallback. TODO: replace with actual studio coordinates.
export const geoCoordinates = {
  "@type": "GeoCoordinates" as const,
  latitude: 18.4861,
  longitude: -69.9312
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  // Distinct @id so Google doesn't merge this entity with LocalBusiness/Photographer
  // (which would surface "duplicate url" warnings on Rich Results validator).
  "@id": `${siteUrl}#organization`,
  name: "Babula Shots Bodas",
  url: siteUrl,
  telephone: phoneE164,
  email,
  image: brandLogoUrl,
  logo: brandLogoUrl,
  address: postalAddress,
  // NOTE: NOT using `parentOrganization` — GSC counts the parent's name as a
  // duplicate of the outer name. Brand hierarchy is conveyed by sameAs below.
  sameAs: [mainBrandUrl, bodaUrl, inmobiliariaUrl, droneUrl, santoDomingoHubUrl, "https://www.instagram.com/babulashotsrd/"]
};
