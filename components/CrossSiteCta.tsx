import { droneUrl } from "@/lib/seo";

export function CrossSiteCta({ locale = "es" }: { locale?: "es" | "en" }) {
  const isEnglish = locale === "en";
  return (
    <section className="cross-site-cta" aria-labelledby="cross-site-drone">
      <div className="wrap">
        <div className="cross-site-grid">
          <div>
            <p className="section-tag">{isEnglish ? "Aerial add-on" : "Servicio aliado"}</p>
            <h2 id="cross-site-drone">
              {isEnglish
                ? "Aerial drone footage for venues and ceremonies"
                : "Vista aerea con drone para venues y ceremonias"}
            </h2>
            <p>
              {isEnglish
                ? "Drone shots transform wedding venues, beach ceremonies and resort weddings into cinematic stories. Babula Shots Drone is the same team behind your wedding day, with the same delivery standards."
                : "Las tomas con drone transforman venues, ceremonias en la playa y bodas en resorts en historias cinematograficas. Babula Shots Drone es el mismo equipo de tu boda, con el mismo estandar de entrega."}
            </p>
          </div>
          <div className="cross-site-actions">
            <a className="button button-dark" href={`${droneUrl}/${isEnglish ? "en/" : ""}servicios/`} rel="noopener">
              {isEnglish ? "See drone services" : "Ver servicios de drone"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
