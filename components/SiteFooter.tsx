"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname() || "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const brandLinks = [
    {
      href: "https://babulashotsrd.com/",
      name: "Babula Shots",
      label: isEnglish ? "Main photography and production" : "Fotografía y producción principal"
    },
    {
      href: "https://estudio.babulashotsrd.com/",
      name: "Babula Studio",
      label: isEnglish ? "Studio photos and portraits" : "Fotos de estudio y retratos"
    },
    {
      href: "https://dron.babulashotsrd.com/",
      name: "Babula Drone",
      label: isEnglish ? "Drone, aerial video and production" : "Drone, video aéreo y producción"
    },
    {
      href: "https://inmobiliaria.babulashotsrd.com/",
      name: "Babula Real Estate",
      label: isEnglish ? "Real estate photography" : "Fotografía inmobiliaria"
    }
  ];

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <Link href="/" aria-label="Babula Shots home">
          <Image
            src="/images/cropped-babulashotslogo-1.webp"
            width={240}
            height={240}
            alt="Babula Shots logo"
          />
        </Link>
        <p>
          Instagram
          <br />
          <a href="https://www.instagram.com/babulashotsrd/" target="_blank" rel="noopener noreferrer">
            @babulashotsrd
          </a>
        </p>
        <p>
          {isEnglish ? "Booking" : "Reserva"}
          <br />
          <a href="mailto:info@babulashotsrd.com?subject=Reserva%20de%20boda">
            info@babulashotsrd.com
          </a>
        </p>
        <p>
          {isEnglish ? "Phone" : "Teléfono"}
          <br />
          <a href="tel:+18097209547">809 720 95 47</a>
        </p>
      </div>
      <div className="wrap brand-network" aria-label={isEnglish ? "Babula Shots specialized services" : "Babula Shots servicios especializados"}>
        <h2>Babula Shots network</h2>
        <div className="brand-network-links">
          {brandLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              <strong>{link.name}</strong>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
