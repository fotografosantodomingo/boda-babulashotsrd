import Image from "next/image";
import Link from "next/link";
import { cityPath, findCityBySlug, slugForCityName, type WeddingCity } from "@/lib/weddingCities";

const services = [
  "Cobertura completa de boda",
  "Sesión pre-boda o compromiso",
  "Fotografía de ceremonia civil",
  "Bodas destino en República Dominicana",
  "Galería online editada",
  "Retratos editoriales de pareja",
  "Video, reels y highlight clips"
];

function nearbyHref(name: string) {
  const slug = slugForCityName(name);
  return findCityBySlug(slug) ? cityPath(slug) : null;
}

export function CityWeddingPage({ city, locale = "es" }: { city: WeddingCity; locale?: "es" | "en" }) {
  const isEnglish = locale === "en";
  const cityTitle = isEnglish ? `Wedding photographer in ${city.city}` : city.h1;
  const cityDescription = isEnglish
    ? `Wedding photographer in ${city.city} for destination weddings, ceremonies, portraits and edited galleries in Dominican Republic.`
    : city.description;
  const quoteSubject = encodeURIComponent(`Fotógrafo de bodas en ${city.city}`);
  const calendarText = encodeURIComponent(`Consulta boda en ${city.city} con Babula Shots`);
  const calendarDetails = encodeURIComponent(
    `Consulta para confirmar disponibilidad de fotografía de bodas en ${city.city}. Contacto: info@babulashotsrd.com / 809 720 95 47`
  );
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarText}&details=${calendarDetails}`;

  return (
    <main>
      <section className="city-hero">
        <Image
          src={city.images[0]}
          alt={`Fotógrafo de bodas en ${city.city}`}
          width={1600}
          height={2000}
          priority
          className="city-hero-image"
        />
        <div className="city-hero-content">
          <p className="eyebrow">Babula Shots · {city.province}</p>
          <h1>{cityTitle}</h1>
          <p>{cityDescription}</p>
          <div className="hero-actions">
            <a className="button button-light" href="#contacto">{isEnglish ? "Book your date" : "Reservar fecha"}</a>
            <a className="button button-ghost" href="tel:+18097209547">{isEnglish ? "Call now" : "Llamar ahora"}</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <p className="section-tag">{isEnglish ? `Wedding photography in ${city.city}` : `Fotografía de bodas en ${city.city}`}</p>
          <div className="copy-stack">
            <h2>{isEnglish ? `Natural, editorial and cinematic weddings in ${city.city}` : `Bodas con estética natural, editorial y cinematográfica en ${city.city}`}</h2>
            <p>{isEnglish ? `${city.city} is an important wedding destination in Dominican Republic. Babula Shots documents ceremonies, couple sessions and celebrations with a natural, elegant and cinematic style.` : city.intro}</p>
            <p>{isEnglish ? `Every wedding in ${city.city} has its own light, timing and logistics. We plan coverage around the real flow of the day so portraits, ceremony and reception feel comfortable and intentional.` : city.localAngle}</p>
            <p>
              {isEnglish
                ? `If you are looking for a wedding photographer in ${city.city}, our process starts with a clear conversation: date, venue, timeline, ceremony type, visual style and the moments that matter most. From there we design coverage that respects the real rhythm of the wedding and creates honest, elegant images for digital gallery, album and print.`
                : `Si buscas un fotógrafo de bodas en ${city.city}, nuestro proceso empieza con una conversación clara: fecha, locación, horario, tipo de ceremonia, estilo visual y momentos importantes. Con esa información diseñamos una cobertura que respeta el ritmo real de la boda y crea imágenes honestas, elegantes y consistentes para galería digital, álbum e impresión.`}
            </p>
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="wrap split">
          <p className="section-tag">{isEnglish ? "Local intent" : "Intención local"}</p>
          <div className="copy-stack">
            <h2>{isEnglish ? `Important searches for couples getting married in ${city.city}` : `Búsquedas importantes para parejas que se casan en ${city.city}`}</h2>
            <p>
              {isEnglish
                ? `This page answers searches with real booking intent, not just general inspiration. Couples comparing photographers, venues and styles for a wedding in ${city.city} can find local context, services, pricing guidance and direct contact options.`
                : `Esta página está pensada para responder búsquedas con intención real de reserva, no solo consultas generales. Si una pareja compara fotógrafos, locaciones y estilos para una boda en ${city.city}, encontrará aquí contexto local, servicios, precios orientativos y formas directas de contacto.`}
            </p>
            <ul className="keyword-list" aria-label={`Keywords relacionados con bodas en ${city.city}`}>
              {city.supportingKeywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap gallery-grid">
          {city.images.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={isEnglish ? `Wedding photography in ${city.city} ${index + 1}` : `Fotografía de boda en ${city.city} ${index + 1}`}
              width={1200}
              height={1500}
              className="gallery-image"
            />
          ))}
        </div>
      </section>

      <section className="section alt-section">
        <div className="wrap split">
          <p className="section-tag">{isEnglish ? "Popular venues" : "Lugares populares"}</p>
          <div>
            <h2>{isEnglish ? `Popular wedding venues in ${city.city}` : `Lugares populares para bodas en ${city.city}`}</h2>
            <p>
              {isEnglish
                ? `These venues and areas help couples compare real wedding locations in ${city.city} and give search engines stronger local context.`
                : `Estos espacios y zonas ayudan a posicionar la página para búsquedas locales reales y también orientan a parejas que están comparando locaciones para una boda en ${city.city}.`}
            </p>
            <ul className="chip-list">
              {city.venues.map((venue) => (
                <li key={venue}>{venue}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <p className="section-tag">{isEnglish ? "Services" : "Servicios"}</p>
          <div>
            <h2>{isEnglish ? `Wedding photography services in ${city.city}` : `Servicios de fotografía para bodas en ${city.city}`}</h2>
            <p>
              {isEnglish
                ? "We cover intimate weddings, large weddings, religious ceremonies, civil ceremonies and destination celebrations. The final delivery keeps a consistent edit so the whole story feels like one complete gallery."
                : "Cubrimos bodas íntimas, bodas grandes, ceremonias religiosas, civiles y celebraciones destino. La entrega final mantiene una edición coherente para que toda la historia se sienta como una sola galería."}
            </p>
            <ul className="service-list">
              {(isEnglish ? [
                "Full wedding coverage",
                "Pre-wedding or engagement session",
                "Civil ceremony photography",
                "Destination weddings in Dominican Republic",
                "Edited online gallery",
                "Editorial couple portraits",
                "Video, reels and highlight clips"
              ] : services).map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="wrap split">
          <p className="section-tag">{isEnglish ? "Planning" : "Planificación"}</p>
          <div>
            <h2>{isEnglish ? `How we prepare wedding coverage in ${city.city}` : `Cómo preparamos una cobertura de boda en ${city.city}`}</h2>
            <p>
              {isEnglish
                ? "Before the wedding we review locations, travel time, ceremony hour, portrait areas and important family moments. This preparation keeps the day fluid and gives the final gallery variety without feeling forced."
                : "Antes de la boda revisamos locaciones, tiempos de traslado, hora de ceremonia, espacios para retratos y momentos familiares importantes. Esta preparación ayuda a que la experiencia sea fluida y que la galería final tenga variedad sin sentirse forzada."}
            </p>
            <div className="planning-grid">
              <article>
                <h3>{isEnglish ? "01 · Timeline and light" : "01 · Horario y luz"}</h3>
                <p>{isEnglish ? "We define the best moments for ceremony, couple portraits, family and details." : "Definimos los mejores momentos para ceremonia, retratos de pareja, familia y detalles."}</p>
              </article>
              <article>
                <h3>{isEnglish ? "02 · Visual route" : "02 · Ruta visual"}</h3>
                <p>{isEnglish ? "We organize getting ready, ceremony, reception and nearby locations without losing rhythm." : "Organizamos preparación, ceremonia, recepción y locaciones cercanas para no perder ritmo."}</p>
              </article>
              <article>
                <h3>{isEnglish ? "03 · Final delivery" : "03 · Entrega final"}</h3>
                <p>{isEnglish ? "The edited gallery keeps color, emotion and consistency for prints, social media and album." : "La galería editada mantiene color, emoción y consistencia para impresión, redes y álbum."}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <p className="section-tag">{isEnglish ? "Pricing" : "Precios"}</p>
          <div className="copy-stack">
            <h2>{isEnglish ? `Wedding photography pricing in ${city.city}` : `Precios para bodas en ${city.city}`}</h2>
            <p>
              {isEnglish
                ? `Pricing depends on hours of coverage, number of photographers, travel, final delivery, video and event type. For a wedding in ${city.city}, send date, venue and approximate guest count to confirm availability and prepare an accurate quote.`
                : `El precio depende de horas de cobertura, cantidad de fotógrafos, traslado, entrega final, video y tipo de evento. Para una boda en ${city.city}, lo ideal es enviar fecha, locación y número aproximado de invitados para confirmar disponibilidad y preparar una cotización precisa.`}
            </p>
            <div className="price-grid">
              <article>
                <h3>{isEnglish ? "Essential coverage" : "Cobertura esencial"}</h3>
                <p>{isEnglish ? "For intimate ceremonies, civil weddings, couple sessions and short celebrations." : "Para ceremonias íntimas, bodas civiles, sesiones de pareja y celebraciones cortas."}</p>
              </article>
              <article>
                <h3>{isEnglish ? "Full wedding" : "Boda completa"}</h3>
                <p>{isEnglish ? "Getting ready, ceremony, portraits, reception, party and edited final gallery." : "Preparación, ceremonia, retratos, recepción, fiesta y galería final editada."}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="wrap split">
          <p className="section-tag">{isEnglish ? `Near ${city.city}` : `Cerca de ${city.city}`}</p>
          <div>
            <h2>{isEnglish ? `We also work near ${city.city}` : `También trabajamos cerca de ${city.city}`}</h2>
            <div className="internal-links">
              {city.nearby.map((near) => {
                const href = nearbyHref(near);
                return href ? (
                  <Link key={near} href={`${isEnglish ? "/en" : ""}${href}`}>{isEnglish ? `Wedding photographer in ${near}` : `Fotógrafo de bodas en ${near}`}</Link>
                ) : (
                  <span key={near}>{isEnglish ? `Wedding photographer in ${near}` : `Fotógrafo de bodas en ${near}`}</span>
                );
              })}
              <Link href={`${isEnglish ? "/en" : ""}/fotografo-bodas-republica-dominicana`}>
                {isEnglish ? "Wedding photographer in Dominican Republic" : "Fotógrafo de bodas en República Dominicana"}
              </Link>
              <Link href={`${isEnglish ? "/en" : ""}/cuanto-cuesta-fotografo-bodas-republica-dominicana`}>
                {isEnglish ? "Wedding photographer cost in Dominican Republic" : "Cuánto cuesta un fotógrafo de bodas en RD"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <p className="section-tag">{isEnglish ? "FAQ" : "Preguntas frecuentes"}</p>
          <div className="faq-stack">
            <h2>{isEnglish ? `Frequently asked questions about weddings in ${city.city}` : `Preguntas frecuentes sobre bodas en ${city.city}`}</h2>
            <article>
              <h3>{isEnglish ? `How much does a wedding photographer in ${city.city} cost?` : `¿Cuánto cuesta un fotógrafo de bodas en ${city.city}?`}</h3>
              <p>
                {isEnglish
                  ? "The price depends on duration, location, number of photographers, final delivery and whether travel is required. For an exact quote, send date, venue and coverage type."
                  : "El precio depende de duración, locación, cantidad de fotógrafos, entrega final y si la boda requiere traslado. Para una cotización exacta, envía fecha, lugar y tipo de cobertura."}
              </p>
            </article>
            <article>
              <h3>{isEnglish ? `Do you photograph destination weddings in ${city.city}?` : `¿Trabajas bodas destino en ${city.city}?`}</h3>
              <p>
                {isEnglish
                  ? "Yes. Babula Shots photographs destination weddings in Dominican Republic, including beach ceremonies, resorts, private villas, countryside venues, churches and intimate events."
                  : "Sí. Babula Shots trabaja bodas destino en República Dominicana, incluyendo ceremonias en playa, resorts, villas privadas, fincas, iglesias y eventos íntimos."}
              </p>
            </article>
            <article>
              <h3>{isEnglish ? "Do you deliver edited photos?" : "¿Entregas fotos editadas?"}</h3>
              <p>
                {isEnglish
                  ? "Yes. Delivery includes a final edited gallery with professional selection, consistent visual style and files ready to download, share and print."
                  : "Sí. La entrega incluye una galería final editada con selección profesional, estilo visual consistente y archivos listos para descargar, compartir e imprimir."}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="contacto" className="cta-section">
        <div className="wrap cta-grid">
          <div>
            <p className="eyebrow">{isEnglish ? "Availability" : "Disponibilidad"}</p>
            <h2>{isEnglish ? `Book your wedding photographer in ${city.city}` : `Reserva tu fotógrafo de bodas en ${city.city}`}</h2>
            <p>{isEnglish ? "Send your date, location and wedding type to confirm availability." : "Envía tu fecha, locación y tipo de boda para confirmar disponibilidad."}</p>
          </div>
          <div className="cta-actions">
            <a className="button button-light" href={`mailto:info@babulashotsrd.com?subject=${quoteSubject}`}>
              {isEnglish ? "Request quote" : "Solicitar cotización"}
            </a>
            <a className="button button-light" href="tel:+18097209547">809 720 95 47</a>
            <a className="button button-light" href={calendarUrl} target="_blank" rel="noopener noreferrer">
              {isEnglish ? "Schedule a call" : "Agendar llamada"}
            </a>
            <a className="button button-light" href="https://wa.me/18097209547" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
