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

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Babula Shots Bodas",
  url: siteUrl,
  telephone: phoneE164,
  email,
  parentOrganization: { "@type": "Organization", name: "Babula Shots", url: mainBrandUrl },
  sameAs: [mainBrandUrl, bodaUrl, inmobiliariaUrl, droneUrl, santoDomingoHubUrl, "https://www.instagram.com/babulashotsrd/"]
};
