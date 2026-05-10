import Image from "next/image";
import Link from "next/link";
import { CallbackForm } from "@/components/CallbackForm";
import { HeroImage } from "@/components/HeroImage";
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

export const citySeoEnhancements: Record<string, {
  logistics: string;
  englishLogistics: string;
  photoAdvice: string;
  englishPhotoAdvice: string;
  faq: Array<{ question: string; answer: string; englishQuestion: string; englishAnswer: string }>;
}> = {
  "punta-cana": {
    logistics: "En Punta Cana muchas bodas ocurren dentro de resorts, beach clubs o villas privadas, por eso coordinamos horarios con wedding planners, permisos internos, distancia entre habitaciones, ceremonia y recepción, y el momento exacto de luz para retratos frente al mar. La cobertura se diseña para no perder tiempo caminando entre áreas del hotel y para aprovechar playa, jardines, muelles, terrazas y espacios de fiesta sin interrumpir la experiencia de los invitados.",
    englishLogistics: "In Punta Cana many weddings happen inside resorts, beach clubs or private villas, so we coordinate timelines with planners, internal permissions, walking distance between rooms, ceremony and reception, and the exact light window for beach portraits. Coverage is designed to avoid losing time between hotel areas and to use the beach, gardens, docks, terraces and party spaces without interrupting the guest experience.",
    photoAdvice: "Para bodas en playa recomendamos retratos principales cerca del atardecer, detalles antes de la ceremonia y una lista corta de fotos familiares. Así la pareja consigue una galería variada con ceremonia, ambiente de resort, retratos naturales y fiesta sin sentir que el día se convierte en una sesión larga.",
    englishPhotoAdvice: "For beach weddings we recommend main portraits near sunset, details before the ceremony and a short family photo list. That gives the couple a varied gallery with ceremony, resort atmosphere, natural portraits and party coverage without turning the day into one long photo session.",
    faq: [
      {
        question: "¿Qué resorts de Punta Cana funcionan mejor para fotos de boda?",
        answer: "Los mejores resultados suelen venir de espacios con playa limpia, sombra cercana, jardines y una recepción bien iluminada. Kukua, Jellyfish, Cap Cana, Bávaro y resorts con terrazas frente al mar ofrecen mucha variedad visual.",
        englishQuestion: "Which Punta Cana resorts work best for wedding photos?",
        englishAnswer: "The strongest results usually come from venues with a clean beach, nearby shade, gardens and a well-lit reception. Kukua, Jellyfish, Cap Cana, Bávaro and oceanfront resort terraces offer strong visual variety."
      }
    ]
  },
  "santo-domingo": {
    logistics: "En Santo Domingo la clave está en combinar ciudad, arquitectura y tiempos de traslado. Para bodas en Zona Colonial, iglesias, hoteles o restaurantes privados, revisamos parqueo, permisos, distancia entre locaciones y momentos de menor tráfico. Esto permite crear retratos urbanos elegantes sin perder el ritmo de la ceremonia y la recepción.",
    englishLogistics: "In Santo Domingo the key is combining city atmosphere, architecture and travel time. For weddings in the Colonial Zone, churches, hotels or private restaurants, we review parking, permissions, distance between locations and lower-traffic windows. This creates elegant urban portraits without losing the rhythm of the ceremony and reception.",
    photoAdvice: "La Zona Colonial funciona muy bien para retratos editoriales, detalles de vestido, fotos familiares y sesiones rápidas entre ceremonia y recepción. Recomendamos planificar una ruta corta para aprovechar fachadas, calles, patios y luz natural sin cansar a la pareja.",
    englishPhotoAdvice: "The Colonial Zone works beautifully for editorial portraits, dress details, family photos and quick sessions between ceremony and reception. We recommend a short route to use facades, streets, courtyards and natural light without exhausting the couple.",
    faq: [
      {
        question: "¿Hacen fotos de boda civil en Santo Domingo?",
        answer: "Sí. Cubrimos bodas civiles, firmas, celebraciones íntimas y recepciones pequeñas en Santo Domingo, con opción de retratos urbanos antes o después de la ceremonia.",
        englishQuestion: "Do you photograph civil weddings in Santo Domingo?",
        englishAnswer: "Yes. We cover civil weddings, signatures, intimate celebrations and small receptions in Santo Domingo, with urban portraits before or after the ceremony."
      }
    ]
  },
  "la-romana": {
    logistics: "La Romana suele mezclar venues premium, villas privadas, playa y espacios como Casa de Campo o Altos de Chavón. Antes de la boda revisamos accesos, tiempos internos, reglas del venue y distancia entre preparación, ceremonia, retratos y recepción para lograr una cobertura fluida.",
    englishLogistics: "La Romana often combines premium venues, private villas, beach settings and places like Casa de Campo or Altos de Chavón. Before the wedding we review access, internal travel times, venue rules and distance between getting ready, ceremony, portraits and reception to keep coverage smooth.",
    photoAdvice: "Para Casa de Campo y Altos de Chavón recomendamos reservar tiempo para retratos editoriales y detalles arquitectónicos. La mezcla de piedra, vegetación, luz cálida y espacios privados permite una galería muy elegante si el horario está bien organizado.",
    englishPhotoAdvice: "For Casa de Campo and Altos de Chavón we recommend reserving time for editorial portraits and architectural details. Stone textures, greenery, warm light and private spaces create an elegant gallery when the timeline is well organized.",
    faq: [
      {
        question: "¿Trabajan bodas en Casa de Campo?",
        answer: "Sí. Cubrimos bodas en Casa de Campo, Altos de Chavón, Minitas Beach, villas privadas y locaciones cercanas de La Romana y Bayahíbe.",
        englishQuestion: "Do you photograph weddings in Casa de Campo?",
        englishAnswer: "Yes. We cover weddings in Casa de Campo, Altos de Chavón, Minitas Beach, private villas and nearby La Romana and Bayahíbe locations."
      }
    ]
  },
  samana: {
    logistics: "Samaná requiere una planificación flexible porque muchas bodas combinan playa, villa, montaña y traslados más largos. Revisamos clima, acceso, horarios de luz y plan alterno para lluvia, especialmente en celebraciones íntimas, elopements y bodas destino cerca de Las Galeras, Playa Rincón o Cayo Levantado.",
    englishLogistics: "Samaná needs flexible planning because many weddings combine beach, villa, mountains and longer transfers. We review weather, access, light timing and rain alternatives, especially for intimate celebrations, elopements and destination weddings near Las Galeras, Playa Rincón or Cayo Levantado.",
    photoAdvice: "La fuerza visual de Samaná está en su naturaleza. Recomendamos retratos con luz suave, momentos documentales durante el traslado y una cobertura que use paisaje sin convertirlo en protagonista por encima de la pareja.",
    englishPhotoAdvice: "Samaná's visual strength is its natural landscape. We recommend portraits in soft light, documentary moments during transitions and coverage that uses the scenery without letting it overpower the couple.",
    faq: [
      {
        question: "¿Cubren bodas pequeñas o elopements en Samaná?",
        answer: "Sí. Samaná es ideal para bodas íntimas, elopements y sesiones de pareja en playa, villa o montaña. Ajustamos la cobertura a pocas horas o día completo.",
        englishQuestion: "Do you cover small weddings or elopements in Samaná?",
        englishAnswer: "Yes. Samaná is ideal for intimate weddings, elopements and couple sessions on the beach, in villas or in mountain settings. Coverage can be a few hours or full day."
      }
    ]
  },
  "puerto-plata": {
    logistics: "Puerto Plata y la costa norte tienen una mezcla de hoteles, playas, villas y zonas con viento como Cabarete. Planificamos la cobertura considerando clima, hora de atardecer, distancia entre locaciones y opciones de retrato si el viento o la lluvia cambian el plan.",
    englishLogistics: "Puerto Plata and the north coast mix hotels, beaches, villas and windier areas like Cabarete. We plan coverage around weather, sunset, distance between locations and portrait alternatives if wind or rain changes the plan.",
    photoAdvice: "En la costa norte funcionan muy bien los retratos con movimiento, vestidos ligeros, atardeceres y escenas de playa más relajadas. Para mantener elegancia, cuidamos dirección, composición y color durante todo el evento.",
    englishPhotoAdvice: "On the north coast, movement, light dresses, sunsets and relaxed beach scenes work beautifully. To keep the gallery elegant, we guide direction, composition and color across the entire event.",
    faq: [
      {
        question: "¿También trabajan en Cabarete y Sosúa?",
        answer: "Sí. Desde Puerto Plata cubrimos Cabarete, Sosúa, Playa Dorada, villas privadas y celebraciones en la costa norte.",
        englishQuestion: "Do you also work in Cabarete and Sosúa?",
        englishAnswer: "Yes. From Puerto Plata we cover Cabarete, Sosúa, Playa Dorada, private villas and celebrations across the north coast."
      }
    ]
  }
};

function nearbyHref(name: string) {
  const slug = slugForCityName(name);
  return findCityBySlug(slug) ? cityPath(slug) : null;
}

function cityGuideLinks(slug: string, isEnglish: boolean) {
  const prefix = isEnglish ? "/en" : "";
  const puntaGuide = slug === "punta-cana"
    ? [{ href: `${prefix}/mejores-lugares-para-bodas-punta-cana`, label: isEnglish ? "Best wedding venues in Punta Cana" : "Mejores lugares para bodas en Punta Cana" }]
    : [];

  return [
    ...puntaGuide,
    { href: `${prefix}/cuanto-cuesta-fotografo-bodas-republica-dominicana`, label: isEnglish ? "Wedding photographer cost in Dominican Republic" : "Cuánto cuesta un fotógrafo de bodas en RD" },
    { href: `${prefix}/boda-destino-republica-dominicana`, label: isEnglish ? "Destination wedding in Dominican Republic" : "Boda destino en República Dominicana" },
    { href: `${prefix}/fotografo-bodas-playa-punta-cana`, label: isEnglish ? "Beach wedding photography in Punta Cana" : "Fotografía para bodas en playa Punta Cana" }
  ].slice(0, 4);
}

export function CityWeddingPage({ city, locale = "es" }: { city: WeddingCity; locale?: "es" | "en" }) {
  const isEnglish = locale === "en";
  const cityTitle = isEnglish ? `Wedding photographer in ${city.city}` : city.h1;
  const cityDescription = isEnglish
    ? `Wedding photographer in ${city.city} for destination weddings, ceremonies, portraits and edited galleries in Dominican Republic.`
    : city.description;
  const enhancement = citySeoEnhancements[city.slug];
  const quoteSubject = encodeURIComponent(`Fotógrafo de bodas en ${city.city}`);

  return (
    <main>
      <section className="city-hero">
        <HeroImage
          src={city.images[0]}
          alt={isEnglish ? `Wedding photographer in ${city.city}` : `Fotógrafo de bodas en ${city.city}`}
          width={1600}
          height={2000}
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

      {enhancement ? (
        <section className="section">
          <div className="wrap split">
            <p className="section-tag">{isEnglish ? "Local expertise" : "Experiencia local"}</p>
            <div className="copy-stack">
              <h2>{isEnglish ? `Wedding logistics in ${city.city}` : `Logística de bodas en ${city.city}`}</h2>
              <p>{isEnglish ? enhancement.englishLogistics : enhancement.logistics}</p>
              <h3>{isEnglish ? `Photo planning tips for ${city.city}` : `Consejos de fotografía para ${city.city}`}</h3>
              <p>{isEnglish ? enhancement.englishPhotoAdvice : enhancement.photoAdvice}</p>
            </div>
          </div>
        </section>
      ) : null}

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
              <Link href={isEnglish ? "/en/" : "/"}>
                {isEnglish ? "Wedding photographer in Dominican Republic" : "Fotógrafo de bodas en República Dominicana"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <p className="section-tag">{isEnglish ? "Related guides" : "Guías relacionadas"}</p>
          <div>
            <h2>{isEnglish ? `Wedding planning resources for ${city.city}` : `Recursos para bodas en ${city.city}`}</h2>
            <p>
              {isEnglish
                ? "These guides connect pricing, venues and destination wedding planning with the local photography pages."
                : "Estas guías conectan precios, venues y planificación de bodas destino con las páginas locales de fotografía."}
            </p>
            <div className="internal-links">
              {cityGuideLinks(city.slug, isEnglish).map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
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
            {enhancement?.faq.map((item) => (
              <article key={item.question}>
                <h3>{isEnglish ? item.englishQuestion : item.question}</h3>
                <p>{isEnglish ? item.englishAnswer : item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="cta-section">
        <div className="wrap cta-grid">
          <div>
            <p className="eyebrow">{isEnglish ? "Availability" : "Disponibilidad"}</p>
            <h2>{isEnglish ? `Book your wedding photographer in ${city.city}` : `Reserva tu fotógrafo de bodas en ${city.city}`}</h2>
            <p>{isEnglish ? "Send your date, location and wedding type to confirm availability." : "Envía tu fecha, locación y tipo de boda para confirmar disponibilidad."}</p>
            <div className="cta-actions">
              <a className="button button-light" href={`mailto:info@babulashotsrd.com?subject=${quoteSubject}`}>
                {isEnglish ? "Request quote" : "Solicitar cotización"}
              </a>
              <a className="button button-light" href="tel:+18097209547">809 720 95 47</a>
              <a className="button button-light" href="https://wa.me/18097209547" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
          <div className="cta-form">
            <CallbackForm locale={isEnglish ? "en" : "es"} />
          </div>
        </div>
      </section>
    </main>
  );
}
