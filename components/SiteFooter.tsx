import Link from "next/link";
import { droneUrl, email, estudioUrl, inmobiliariaUrl, mainBrandUrl, niche, phoneDisplay, santoDomingoHubUrl } from "@/lib/seo";
import { cityPath, weddingCities } from "@/lib/weddingCities";

const networkLinks: Array<{ label: string; href: string; description: string; current?: boolean }> = [
  {
    label: "Fotografia de Estudio",
    href: estudioUrl,
    description: "Retratos, corporativo, moda, comida y sesiones en estudio en Santo Domingo"
  },
  { label: "Fotografia Inmobiliaria", href: inmobiliariaUrl, description: "Foto, video y drone para propiedades, agentes y desarrolladores" },
  { label: "Tomas Aereas con Drone", href: droneUrl, description: "Drone para inmobiliaria, construccion, eventos y bodas" }
];

const alsoAtLinks: Array<{ label: string; href: string; primary: string; description: string }> = [
  {
    label: "babulashotsrd.com",
    href: mainBrandUrl,
    primary: "Marca principal",
    description: "Agencia premium de foto y video en Republica Dominicana. Centro de la red Babula Shots."
  },
  {
    label: "fotografosantodomingo.com",
    href: santoDomingoHubUrl,
    primary: "El mismo fotografo - nueva web",
    description: "Pagina por Babula Shots con todos los servicios disponibles: bodas, retratos, comercial, eventos."
  }
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <p className="footer-brand-name">Babula Shots</p>
          <p className="footer-brand-tag">{niche.label} - By Babula Shots</p>
          <p className="footer-brand-snippet">
            Fotografia y video de bodas en Republica Dominicana: Punta Cana, Santo Domingo, La Romana, Samana y bodas
            destino. Parte de la red Babula Shots: bodas, inmobiliaria, drone y la marca principal.
          </p>
        </div>
        <div className="footer-network" aria-label="Red Babula Shots">
          <p className="footer-section-title">Red Babula Shots</p>
          <ul>
            {networkLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={link.current ? "page" : undefined}
                  rel="noopener"
                  className={link.current ? "is-current" : ""}
                >
                  <span className="net-label">{link.label}</span>
                  <span className="net-desc">{link.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-contact">
          <p className="footer-section-title">Contacto</p>
          <p>
            <a href={`tel:${phoneDisplay.replace(/\s/g, "")}`}>{phoneDisplay}</a>
          </p>
          <p>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
      </div>
      <div className="footer-also" aria-label="Tambien en">
        <p className="footer-section-title">
          <span aria-hidden="true">{"\u{1F310}"}</span> Tambien en
        </p>
        <ul>
          {alsoAtLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} rel="noopener">
                <span className="also-label">
                  {link.label}
                  <span aria-hidden="true" className="also-arrow">
                    {"→"}
                  </span>
                </span>
                <span className="also-primary">{link.primary}</span>
                <span className="also-desc">{link.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-areas" aria-label="Areas que servimos">
        <p className="footer-section-title">Areas que servimos</p>
        <div>
          {weddingCities.map((city) => (
            <Link href={cityPath(city.slug)} key={city.slug}>
              {city.city}
            </Link>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p>(c) {new Date().getFullYear()} Babula Shots. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
