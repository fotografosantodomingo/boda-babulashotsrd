"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeLanguageControls } from "@/components/ThemeLanguageControls";

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const prefix = isEnglish ? "/en" : "";

  return (
    <header className="site-header">
      <Link className="brand" href={isEnglish ? "/en" : "/"} aria-label="Babula Shots weddings">
        {isEnglish ? "Weddings" : "Boda"}
      </Link>
      <nav className="site-nav" aria-label={isEnglish ? "Main navigation" : "Navegación principal"}>
        <Link href={`${prefix}/fotografo-bodas-republica-dominicana`}>{isEnglish ? "Dominican Republic" : "República Dominicana"}</Link>
        <Link href={`${prefix}/fotografo-bodas-punta-cana`}>Punta Cana</Link>
        <Link href={`${prefix}/fotografo-bodas-santo-domingo`}>Santo Domingo</Link>
        <Link href={`${prefix}/fotografo-bodas-la-romana`}>La Romana</Link>
        <Link href={`${prefix}/#contacto`}>{isEnglish ? "Book" : "Reserva"}</Link>
      </nav>
      <ThemeLanguageControls />
    </header>
  );
}
