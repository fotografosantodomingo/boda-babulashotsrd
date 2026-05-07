"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeLanguageControls } from "@/components/ThemeLanguageControls";

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const isEnglish = pathname === "/en" || pathname === "/en/" || pathname.startsWith("/en/");

  return (
    <header className="site-header" data-site-header>
      <Link className="brand" href={isEnglish ? "/en/" : "/"} aria-label="Babula Shots bodas" data-brand>
        {isEnglish ? "Weddings" : "Boda"}
      </Link>
      <nav className="site-nav" aria-label="Navegación principal">
        <Link href={isEnglish ? "/en/" : "/"} data-nav-main>
          {isEnglish ? "Dominican Republic" : "República Dominicana"}
        </Link>
        <Link href={isEnglish ? "/en/fotografo-bodas-punta-cana" : "/fotografo-bodas-punta-cana"} data-nav-punta>
          Punta Cana
        </Link>
        <Link href={isEnglish ? "/en/fotografo-bodas-santo-domingo" : "/fotografo-bodas-santo-domingo"} data-nav-santo>
          Santo Domingo
        </Link>
        <Link href={isEnglish ? "/en/fotografo-bodas-la-romana" : "/fotografo-bodas-la-romana"} data-nav-romana>
          La Romana
        </Link>
        <a href="https://inmobiliaria.babulashotsrd.com/" data-nav-real-estate>
          {isEnglish ? "Real Estate" : "Inmobiliaria"}
        </a>
        <Link href={isEnglish ? "/en/#contacto" : "/#contacto"} data-nav-book>
          {isEnglish ? "Book" : "Reserva"}
        </Link>
      </nav>
      <ThemeLanguageControls />
    </header>
  );
}
