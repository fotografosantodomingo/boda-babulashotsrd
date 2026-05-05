import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://boda.babulashotsrd.com"),
  title: {
    default: "Fotógrafo de bodas en República Dominicana | Babula Shots",
    template: "%s"
  },
  description: "Fotógrafo de bodas en Santo Domingo, Punta Cana y toda República Dominicana. Estilo natural, cobertura completa y reserva online.",
  openGraph: {
    siteName: "Babula Shots",
    locale: "es_DO",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/images/cropped-babulashotslogo-1-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/cropped-babulashotslogo-1.webp", type: "image/webp" }
    ],
    apple: "/images/cropped-babulashotslogo-1-180.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: "#050505"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-DO">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
