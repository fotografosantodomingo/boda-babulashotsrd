import Link from "next/link";
import { ThemeLanguageControls } from "@/components/ThemeLanguageControls";

export function SiteHeader() {
  return (
    <header className="site-header" data-site-header>
      <Link className="brand" href="/" aria-label="Babula Shots bodas" data-brand>
        Boda
      </Link>
      <nav className="site-nav" aria-label="Navegación principal">
        <Link href="/" data-nav-main>República Dominicana</Link>
        <Link href="/fotografo-bodas-punta-cana" data-nav-punta>Punta Cana</Link>
        <Link href="/fotografo-bodas-santo-domingo" data-nav-santo>Santo Domingo</Link>
        <Link href="/fotografo-bodas-la-romana" data-nav-romana>La Romana</Link>
        <Link href="/#contacto" data-nav-book>Reserva</Link>
      </nav>
      <ThemeLanguageControls />
    </header>
  );
}
