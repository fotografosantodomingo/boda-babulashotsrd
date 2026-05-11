// Bilingual blog articles for boda.babulashotsrd.com.
// Mirrors the estudio repo's blogPosts.ts pattern.
//
// Articles live at /blog/<slug>/ (Spanish) and /en/blog/<enSlug>/ (English).
// The legacy lib/blogPosts.ts (flat /<slug>/ URLs) is left untouched.

export type ArticleImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ArticleSection = {
  heading: string;
  body: string[];
};

export type ArticleFaq = {
  q: string;
  a: string;
};

export type ArticleRelated = {
  href: string;
  label: string;
  description: string;
};

export type ArticleEn = {
  enSlug: string;
  title: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  introParagraphs: string[];
  sections: ArticleSection[];
  faq: ArticleFaq[];
  related: ArticleRelated[];
  ogImageAlt?: string;
};

export type Article = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  // Full ISO 8601 datetime with -04:00 timezone (use isoAst() in lib/seo.ts).
  datePublished: string;
  dateModified: string;
  hero: ArticleImage;
  introParagraphs: string[];
  sections: ArticleSection[];
  faq: ArticleFaq[];
  related: ArticleRelated[];
  ogImageAlt?: string;
  en?: ArticleEn;
};

const ARTICLES: Article[] = [
  // ─────────────────────────────────────────────────────────────────────
  // P3a — All-inclusive resort weddings in Punta Cana (bilingual)
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "bodas-todo-incluido-punta-cana",
    title:
      "Bodas Todo Incluido en Punta Cana: Guía 2026 de Resorts, Paquetes y Fotografía — Babula Shots",
    metaDescription:
      "Guía completa de bodas todo incluido en Punta Cana: 8 mejores resorts, paquetes desde US$2,500, fotografía, timing de ceremonia, requisitos legales y tips de fotógrafo profesional con cobertura nacional.",
    h1: "Bodas Todo Incluido en Punta Cana: Guía 2026 de Resorts, Paquetes y Fotografía",
    eyebrow: "Bodas Destino · Guía Punta Cana",
    datePublished: "2026-05-10T15:00:00-04:00",
    dateModified: "2026-05-10T15:00:00-04:00",
    hero: {
      src: "/images/fotografo-de-bodas-4.webp",
      alt: "Boda todo incluido en resort de Punta Cana — fotografía profesional Babula Shots",
      width: 1600,
      height: 1067
    },
    introParagraphs: [
      "Punta Cana es uno de los destinos top del Caribe para bodas todo incluido — resorts de playa de primera categoría, ceremonias en la arena con golden hour del Atlántico, paquetes que cubren desde flores hasta cena para 80 invitados, y vuelos directos desde 30+ ciudades de Estados Unidos. Para parejas que quieren el día perfecto sin coordinar 15 vendors, el modelo todo incluido es lo más práctico que existe.",
      "En Babula Shots cubrimos bodas en Punta Cana cada semana — desde elopements íntimos en Cap Cana hasta celebraciones de 200 invitados en Bávaro. Esta guía cubre los 8 resorts donde más trabajamos, los rangos de precios reales (no las promesas de marketing), los detalles legales del matrimonio civil para extranjeros, y los errores más comunes que vemos en parejas que reservan sin investigar bien.",
      "Si vas a contratar [un fotógrafo de bodas en Punta Cana](/fotografo-bodas-punta-cana/) — sea Babula Shots u otro — esta guía te da el contexto necesario para hacer las preguntas correctas al resort y asegurar que tu fotografía no se vea limitada por restricciones de cobertura del paquete."
    ],
    sections: [
      {
        heading: "Por qué un resort todo incluido en Punta Cana",
        body: [
          "**Logística simple para boda destino.** Una boda todo incluido en Punta Cana cubre en un mismo lugar: alojamiento de invitados, ceremonia, recepción, banquete, bar abierto, decoración base, coordinador de bodas, y opcionalmente fotografía y video. Para parejas que viven fuera de RD (la mayoría — el 75% de bodas en Punta Cana son de extranjeros) elimina la necesidad de coordinar transportes entre venues.",
          "**Vuelos directos.** El aeropuerto de Punta Cana (PUJ) recibe vuelos directos desde JFK, Miami, Atlanta, Dallas, Toronto, Madrid, Frankfurt, y muchas otras ciudades. Para tus invitados internacionales, llegar es de las opciones más fáciles del Caribe.",
          "**Costos predecibles.** Los paquetes todo incluido publican precios fijos por persona — desde US$2,500 (paquete básico, 30 invitados) hasta US$25,000+ (paquete premium con cena privada, decoración custom, banda en vivo). Para presupuesto vs negociar 8 vendors separados, mucho más simple.",
          "**Plan B garantizado.** Cada resort tiene plan B de lluvia (salón cubierto, gazebo techado, terraza interior). Esto es no-negociable en el Caribe — la temporada de huracanes va de junio a noviembre y siempre puede llover.",
          "**Limitaciones a saber.** El precio bajo viene con restricciones: muchos resorts permiten solo a SUS fotógrafos (o cobran un fee de US$500-2,000 por traer fotógrafo externo), límite de horas, restricción de zonas para sesión, sin acceso a ciertas locaciones internas. Más detalles en la sección de tips."
        ]
      },
      {
        heading: "1. Hard Rock Hotel & Casino Punta Cana",
        body: [
          "**Estilo:** lujo accesible, energía resort, capacidad alta.",
          "**Capacidad:** ceremonias desde 30 hasta 250 invitados.",
          "**Locaciones:** playa privada con gazebo blanco, club de playa Eden, terraza con vista a la piscina, capilla.",
          "**Paquetes:** desde US$3,500 para 30 invitados (paquete Eternity). Premium desde US$15,000.",
          "**Fotografía externa:** permitida pero con fee de aproximadamente US$500. Trabajamos con ellos regularmente.",
          "**Cuándo elegirlo:** parejas que quieren mucha energía, fiesta grande, casino a mano para el bachelor party, instalaciones tipo parque acuático para invitados con niños. La playa de la Hard Rock es enorme y permite múltiples retratos sin saturar."
        ]
      },
      {
        heading: "2. Eden Roc Cap Cana",
        body: [
          "**Estilo:** boutique de lujo, suites privadas, exclusividad.",
          "**Capacidad:** ceremonias íntimas — máximo 80 invitados.",
          "**Locaciones:** playa privada de Juanillo Beach (de las más bonitas del país), Caleton Beach Club con piscina infinita, terrazas con vista al mar Caribe.",
          "**Paquetes:** desde US$8,000 para 30 invitados. Sky's the limit para premium (US$30,000+).",
          "**Fotografía externa:** permitida, fee variable según paquete. Nivel de servicio premium.",
          "**Cuándo elegirlo:** elopement de lujo, micro-bodas (10-30 invitados), parejas que priorizan privacidad sobre fiesta grande, sesiones editoriales con suite con piscina privada incluida."
        ]
      },
      {
        heading: "3. Iberostar Selection Bávaro Suites",
        body: [
          "**Estilo:** todo incluido familiar, playa amplia, buena relación calidad-precio.",
          "**Capacidad:** 30-150 invitados.",
          "**Locaciones:** playa de Bávaro (la playa con más turismo de Punta Cana — pros y contras), gazebo en jardines, salón Tortuga.",
          "**Paquetes:** desde US$2,800 para 30 invitados. Premium hasta US$10,000.",
          "**Fotografía externa:** permitida sin fee adicional en la mayoría de paquetes. Eso lo hace muy popular.",
          "**Cuándo elegirlo:** presupuesto medio, parejas con familiares mayores que valoran las facilidades grandes (piscinas, restaurantes variados, accesibilidad), bodas de tamaño medio (50-100 invitados)."
        ]
      },
      {
        heading: "4. Excellence Punta Cana (adults only)",
        body: [
          "**Estilo:** adultos-solo, romántico, todo incluido premium.",
          "**Capacidad:** 30-180 invitados.",
          "**Locaciones:** Beach Cove (cala privada de las mejores del Caribe), piscina infinita con bar, gazebo blanco, salón Andalusia.",
          "**Paquetes:** desde US$4,500 para 40 invitados. Premium hasta US$18,000.",
          "**Fotografía externa:** permitida con fee de US$300-700 según paquete.",
          "**Cuándo elegirlo:** boda adultos-solo (sin niños permitidos en el resort), pareja que prioriza ambiente romántico, suites con piscina privada para sesión de pareja antes de la ceremonia."
        ]
      },
      {
        heading: "5. Now Onyx Punta Cana",
        body: [
          "**Estilo:** moderno, diseño contemporáneo, mid-range premium.",
          "**Capacidad:** 30-200 invitados.",
          "**Locaciones:** playa privada Uvero Alto, gazebo con vista al mar, terraza Sky Lounge para recepción al atardecer.",
          "**Paquetes:** desde US$3,200 para 30 invitados. Premium US$12,000-15,000.",
          "**Fotografía externa:** permitida con fee de aproximadamente US$400.",
          "**Cuándo elegirlo:** pareja que busca estética moderna (no clásica caribeña), buena relación calidad-precio, locación más tranquila (Uvero Alto es menos turística que Bávaro)."
        ]
      },
      {
        heading: "6. Catalonia Royal Bávaro (adults only)",
        body: [
          "**Estilo:** todo incluido tradicional, jardines tropicales, ambiente caribeño.",
          "**Capacidad:** 30-150 invitados.",
          "**Locaciones:** playa privada amplia, gazebo en jardines, salón Cayuco con vista a la piscina.",
          "**Paquetes:** desde US$2,500 para 30 invitados (uno de los más asequibles de la zona). Premium hasta US$8,000.",
          "**Fotografía externa:** permitida con fee bajo (~US$250).",
          "**Cuándo elegirlo:** presupuesto ajustado pero buscando experiencia adultos-solo, bodas pequeñas-medianas, pareja que valora simplicidad y precio sobre lujo."
        ]
      },
      {
        heading: "7. Royalton Bavaro (adults only Hideaway opcional)",
        body: [
          "**Estilo:** familiar pero con sección Hideaway adultos-solo, playa amplia.",
          "**Capacidad:** 30-200 invitados.",
          "**Locaciones:** playa privada, gazebo, capilla, terraza Diamond Club para Hideaway.",
          "**Paquetes:** desde US$3,000. Premium hasta US$13,000.",
          "**Fotografía externa:** permitida con fee de US$300-500.",
          "**Cuándo elegirlo:** boda mixta (algunos invitados con niños, pareja prefiere ambiente adulto). El sistema Diamond Club da acceso premium dentro del resort."
        ]
      },
      {
        heading: "8. Tortuga Bay Puntacana Resort & Club (Oscar de la Renta)",
        body: [
          "**Estilo:** ultra-lujo, villas privadas, exclusividad total. Diseñado por Oscar de la Renta.",
          "**Capacidad:** ceremonias muy íntimas — 10-50 invitados, ocasionalmente hasta 100.",
          "**Locaciones:** villas privadas frente al mar, playa exclusiva, jardines tropicales, marina, capilla.",
          "**Paquetes:** desde US$15,000 para 30 invitados. Premium US$50,000+.",
          "**Fotografía externa:** permitida (Oscar de la Renta tiene política flexible para clientes premium).",
          "**Cuándo elegirlo:** boda de altísimo presupuesto, micro-boda íntima de lujo, pareja que valora privacidad absoluta y diseño impecable. Las suites con piscina privada son spectacular para pre-ceremonia."
        ]
      },
      {
        heading: "Requisitos legales: matrimonio civil para extranjeros en RD",
        body: [
          "**Documentos requeridos** (al menos 60 días antes de la boda): pasaportes vigentes, partidas de nacimiento apostilladas, prueba de soltería apostillada, divorcios anteriores apostillados (si aplica).",
          "**Traducción al español.** Todos los documentos deben traducirse por traductor jurado en RD.",
          "**Wedding planner del resort.** El planner del resort gestiona el oficial civil que celebra la ceremonia. Costo típico: US$300-700 incluido en muchos paquetes.",
          "**Plazo legal mínimo.** El civil requiere 5 días hábiles entre llegar a RD y celebrar la boda. Los resorts saben gestionar esto.",
          "**Reconocimiento del matrimonio en tu país.** Esto es lo más importante: el matrimonio civil dominicano es válido internacionalmente, pero TIENES que apostillar el acta de matrimonio en RD después de la boda y registrarla en tu país de origen para que tenga efecto legal allá. Costo y plazo: 1-2 semanas, ~US$150 en Cancillería de RD."
        ]
      },
      {
        heading: "Tips de fotografía para boda todo incluido",
        body: [
          "**Reserva al fotógrafo ANTES de firmar el contrato del resort.** Si el resort exige usar SU fotógrafo y no quieres ese, necesitas saberlo antes. Los resorts grandes (Hard Rock, Iberostar, Catalonia) son flexibles. Los premium (Eden Roc, Tortuga Bay) son flexibles. Los paquetes súper económicos a veces son rígidos.",
          "**Pregunta el fee de fotógrafo externo.** Suele ser US$300-700 según resort. Negocialo si tu paquete tiene precio alto.",
          "**Timing de ceremonia.** Para fotografía espectacular, la ceremonia debe ser 1.5-2 horas antes del atardecer (en Punta Cana eso es 6:30 PM en mayo, 6 PM en diciembre). Esto te da: ceremonia con luz buena, retratos de pareja en golden hour, primera bailada al anochecer.",
          "**First look opcional.** Hacer el primer look (la pareja se ve antes de la ceremonia) permite tener retratos terminados ANTES de la ceremonia. Útil cuando no hay tiempo entre ceremonia y recepción.",
          "**Sesión next-day.** Algunos paquetes incluyen una sesión next-day (al día siguiente, en la playa, con vestido o ropa más casual). Si tu paquete no la incluye, considera contratarla por separado — son fotos más relajadas y diferentes a las del día de la boda.",
          "**Lluvia.** Plan B obligatorio. El fotógrafo profesional lleva equipo a prueba de agua y conoce los espacios cubiertos del resort de antemano. Pregúntale al fotógrafo si conoce TU resort específicamente — esto hace la diferencia."
        ]
      },
      {
        heading: "Errores comunes (y cómo evitarlos)",
        body: [
          "**Error 1: contratar fotógrafo del resort sin ver portfolio reciente.** Los fotógrafos in-house rotan mucho. El portfolio que ves en la página puede ser de hace 2 años. Pide ver bodas de los últimos 3-6 meses específicamente.",
          "**Error 2: no leer las restricciones de fotografía del paquete.** Algunos paquetes limitan a 4 horas, o restringen acceso a ciertos espacios (lobby, restaurantes), o cobran extra por video. Lee la letra pequeña.",
          "**Error 3: no coordinar timing con maquillaje y peinado.** El maquillaje del resort tiene horario fijo. Si la ceremonia es a las 5 PM, debes empezar a las 12-1 PM máximo. Coordina con el wedding planner ANTES.",
          "**Error 4: invitar fotógrafo amateur de la familia.** Es la causa #1 de quejas posteriores. Mejor pídele al amateur que tome fotos casuales en la recepción, NO durante la ceremonia.",
          "**Error 5: no separar presupuesto para tip de fotógrafo.** En RD el tip se aprecia mucho — 10-15% del costo del paquete fotográfico es estándar."
        ]
      }
    ],
    faq: [
      {
        q: "¿Cuánto cuesta una boda todo incluido en Punta Cana?",
        a: "Los paquetes básicos empiezan en US$2,500-3,500 para 30 invitados (Catalonia, Iberostar). Mid-range US$4,500-8,000 (Excellence, Hard Rock, Now). Premium US$10,000-20,000 (Eden Roc, Royalton Diamond Club). Ultra-lujo US$25,000+ (Tortuga Bay con villas privadas). Estos precios cubren ceremonia + recepción + banquete + bar abierto, pero NO incluyen alojamiento de invitados (se reserva por separado, US$200-400 por noche por habitación)."
      },
      {
        q: "¿Cuánto cuesta el fotógrafo externo en un resort de Punta Cana?",
        a: "Hay dos costos distintos. (1) Fee del resort por permitir fotógrafo externo: US$250-700 según resort (Catalonia más bajo, Excellence más alto). Este fee va al resort, no al fotógrafo. (2) Costo del fotógrafo: nuestros paquetes de Babula Shots para boda destino en Punta Cana van desde US$1,800 (cobertura básica de 5 horas) hasta US$5,500 (cobertura completa día + sesión next-day + álbum impreso). Pide cotización con tu fecha y tipo de paquete del resort para precio exacto."
      },
      {
        q: "¿Cuándo es la mejor temporada para boda en Punta Cana?",
        a: "Diciembre-abril es temporada alta: clima perfecto (mínimo lluvia, temperaturas 24-28°C), pero precios de hoteles 40-60% más altos y disponibilidad limitada (reservar 12-18 meses antes). Mayo-junio y noviembre son shoulder season: clima excelente, precios mid, buena disponibilidad — la mejor relación calidad/precio. Julio-octubre es temporada de huracanes: precios bajos, pero riesgo real de lluvia y algún huracán cada 2-3 años. Si te casas en agosto-septiembre, contrata seguro de cancelación."
      },
      {
        q: "¿Qué pasa si llueve el día de mi boda?",
        a: "Cada resort tiene plan B obligatorio: salón cubierto (no glamoroso pero funcional), gazebo techado, terraza interior. La decisión de mover a interior se toma 2-4 horas antes de la ceremonia (no a último momento). Como fotógrafa, podemos trabajar tanto en exterior como en interior — los resorts conocen la luz de sus salones y trabajamos con eso. La fotografía de boda con lluvia tiene su propia estética (sombrillas, ventanas, luz suave) y muchas parejas terminan amando esas fotos. Lo más importante: contrata seguro de cancelación si te casas en temporada de huracanes (mayo-noviembre)."
      },
      {
        q: "¿Babula Shots cubre bodas en otros destinos de RD además de Punta Cana?",
        a: "Sí. Cubrimos bodas en toda la República Dominicana: Punta Cana y Bávaro (la mayoría), Cap Cana (premium), La Romana / Casa de Campo (resort exclusivo), Samaná y Las Terrenas (boda destino más alternativa, playa virgen), Puerto Plata (norte del país), Santo Domingo (Zona Colonial para boda urbana), Bayahíbe (intimate beach). Ver listado completo en [ubicaciones para bodas](/ubicaciones/)."
      }
    ],
    related: [
      {
        href: "/fotografo-bodas-punta-cana/",
        label: "Fotógrafo de bodas en Punta Cana",
        description: "Servicio completo de fotografía de bodas en Punta Cana: cobertura, paquetes, sesiones pre-boda y next-day."
      },
      {
        href: "/cuanto-cuesta-fotografo-bodas-republica-dominicana/",
        label: "Cuánto cuesta un fotógrafo de bodas en RD",
        description: "Guía detallada de precios, factores y cómo pedir cotización precisa."
      },
      {
        href: "/ubicaciones/",
        label: "Ubicaciones para bodas",
        description: "Todos los destinos donde cubrimos bodas en República Dominicana."
      },
      {
        href: "/precios/",
        label: "Precios y paquetes",
        description: "Tarifas publicadas para todos nuestros paquetes de fotografía de boda."
      }
    ],
    ogImageAlt: "Bodas todo incluido en Punta Cana — guía completa de Babula Shots",
    en: {
      enSlug: "all-inclusive-resort-weddings-punta-cana",
      title:
        "All-Inclusive Resort Weddings in Punta Cana: 2026 Guide to Resorts, Packages & Photography — Babula Shots",
      metaDescription:
        "Complete guide to all-inclusive resort weddings in Punta Cana, Dominican Republic: 8 best resorts, packages from US$2,500, photography tips, ceremony timing, legal requirements, and pro photographer advice for destination weddings.",
      h1: "All-Inclusive Resort Weddings in Punta Cana: 2026 Guide to Resorts, Packages & Photography",
      eyebrow: "Destination Weddings · Punta Cana Guide",
      introParagraphs: [
        "Punta Cana is one of the Caribbean's top destinations for all-inclusive weddings — top-tier beach resorts, ceremonies on the sand at Atlantic golden hour, packages covering everything from flowers to dinner for 80 guests, and direct flights from 30+ US cities. For couples who want the perfect day without coordinating 15 vendors, the all-inclusive model is the most practical approach.",
        "At Babula Shots we cover Punta Cana weddings every week — from intimate Cap Cana elopements to 200-guest celebrations in Bávaro. This guide covers the 8 resorts where we shoot most often, the real price ranges (not marketing promises), the legal details for civil marriage of foreigners in DR, and the most common mistakes we see couples make when booking without proper research.",
        "If you're hiring [a wedding photographer in Punta Cana](/en/fotografo-bodas-punta-cana/) — whether Babula Shots or someone else — this guide gives you the context to ask the right questions of the resort and ensure your photography isn't restricted by package limitations."
      ],
      sections: [
        {
          heading: "Why an all-inclusive resort in Punta Cana",
          body: [
            "**Simple destination wedding logistics.** An all-inclusive Punta Cana wedding covers in one location: guest lodging, ceremony, reception, dinner, open bar, base decoration, wedding coordinator, and optionally photo and video. For couples living outside the DR (most of them — 75% of Punta Cana weddings are foreigners), it eliminates coordinating transport between venues.",
            "**Direct flights.** Punta Cana airport (PUJ) receives direct flights from JFK, Miami, Atlanta, Dallas, Toronto, Madrid, Frankfurt, and many other cities. For your international guests, getting there is one of the easiest options in the Caribbean.",
            "**Predictable costs.** All-inclusive packages publish fixed per-person prices — from US$2,500 (basic, 30 guests) to US$25,000+ (premium with private dinner, custom decoration, live band). For budgeting vs. negotiating with 8 separate vendors, much simpler.",
            "**Plan B guaranteed.** Each resort has a rain plan B (covered ballroom, roofed gazebo, indoor terrace). This is non-negotiable in the Caribbean — hurricane season runs June through November and rain is always possible.",
            "**Limitations to know.** The lower price comes with restrictions: many resorts allow only THEIR photographers (or charge a US$500-2,000 fee for outside photographers), limited hours, restricted shooting zones, no access to certain interior locations. More details in the tips section below."
          ]
        },
        {
          heading: "1. Hard Rock Hotel & Casino Punta Cana",
          body: [
            "**Style:** accessible luxury, resort energy, high capacity.",
            "**Capacity:** ceremonies from 30 up to 250 guests.",
            "**Locations:** private beach with white gazebo, Eden beach club, terrace with pool view, chapel.",
            "**Packages:** from US$3,500 for 30 guests (Eternity package). Premium from US$15,000.",
            "**Outside photography:** allowed with approximately US$500 fee. We work with them regularly.",
            "**When to choose it:** couples who want lots of energy, big party, casino on hand for the bachelor party, water-park-style facilities for guests with kids. Hard Rock's beach is enormous and allows multiple portraits without saturation."
          ]
        },
        {
          heading: "2. Eden Roc Cap Cana",
          body: [
            "**Style:** boutique luxury, private suites, exclusivity.",
            "**Capacity:** intimate ceremonies — maximum 80 guests.",
            "**Locations:** private Juanillo Beach (one of the country's most beautiful), Caleton Beach Club with infinity pool, terraces with Caribbean Sea view.",
            "**Packages:** from US$8,000 for 30 guests. Sky's the limit for premium (US$30,000+).",
            "**Outside photography:** allowed, fee varies by package. Premium service level.",
            "**When to choose it:** luxury elopement, micro-weddings (10-30 guests), couples who prioritize privacy over big party, editorial sessions with private-pool suite included."
          ]
        },
        {
          heading: "3. Iberostar Selection Bávaro Suites",
          body: [
            "**Style:** family-friendly all-inclusive, wide beach, good value.",
            "**Capacity:** 30-150 guests.",
            "**Locations:** Bávaro beach (the most touristy beach in Punta Cana — pros and cons), garden gazebo, Tortuga ballroom.",
            "**Packages:** from US$2,800 for 30 guests. Premium up to US$10,000.",
            "**Outside photography:** allowed without additional fee in most packages. That makes it very popular.",
            "**When to choose it:** mid-range budget, couples with elderly relatives who appreciate large facilities (multiple pools, varied restaurants, accessibility), medium-size weddings (50-100 guests)."
          ]
        },
        {
          heading: "4. Excellence Punta Cana (adults only)",
          body: [
            "**Style:** adults-only, romantic, all-inclusive premium.",
            "**Capacity:** 30-180 guests.",
            "**Locations:** Beach Cove (one of the Caribbean's best private coves), infinity pool with bar, white gazebo, Andalusia ballroom.",
            "**Packages:** from US$4,500 for 40 guests. Premium up to US$18,000.",
            "**Outside photography:** allowed with US$300-700 fee depending on package.",
            "**When to choose it:** adults-only wedding (no kids allowed at the resort), couple prioritizing romantic atmosphere, suites with private pool for couple session before ceremony."
          ]
        },
        {
          heading: "5. Now Onyx Punta Cana",
          body: [
            "**Style:** modern, contemporary design, mid-range premium.",
            "**Capacity:** 30-200 guests.",
            "**Locations:** private Uvero Alto beach, gazebo with sea view, Sky Lounge terrace for sunset reception.",
            "**Packages:** from US$3,200 for 30 guests. Premium US$12,000-15,000.",
            "**Outside photography:** allowed with approximately US$400 fee.",
            "**When to choose it:** couples seeking modern aesthetic (not classic Caribbean), good value, quieter location (Uvero Alto is less touristy than Bávaro)."
          ]
        },
        {
          heading: "6. Catalonia Royal Bávaro (adults only)",
          body: [
            "**Style:** traditional all-inclusive, tropical gardens, Caribbean atmosphere.",
            "**Capacity:** 30-150 guests.",
            "**Locations:** wide private beach, garden gazebo, Cayuco ballroom with pool view.",
            "**Packages:** from US$2,500 for 30 guests (one of the most affordable in the area). Premium up to US$8,000.",
            "**Outside photography:** allowed with low fee (~US$250).",
            "**When to choose it:** tighter budget but seeking adults-only experience, small-to-medium weddings, couples who value simplicity and price over luxury."
          ]
        },
        {
          heading: "7. Royalton Bavaro (optional adults-only Hideaway)",
          body: [
            "**Style:** family-friendly with Hideaway adults-only section, wide beach.",
            "**Capacity:** 30-200 guests.",
            "**Locations:** private beach, gazebo, chapel, Diamond Club terrace for Hideaway.",
            "**Packages:** from US$3,000. Premium up to US$13,000.",
            "**Outside photography:** allowed with US$300-500 fee.",
            "**When to choose it:** mixed wedding (some guests with kids, couple prefers adult atmosphere). Diamond Club system gives premium access within the resort."
          ]
        },
        {
          heading: "8. Tortuga Bay Puntacana Resort & Club (Oscar de la Renta)",
          body: [
            "**Style:** ultra-luxury, private villas, total exclusivity. Designed by Oscar de la Renta.",
            "**Capacity:** very intimate ceremonies — 10-50 guests, occasionally up to 100.",
            "**Locations:** private oceanfront villas, exclusive beach, tropical gardens, marina, chapel.",
            "**Packages:** from US$15,000 for 30 guests. Premium US$50,000+.",
            "**Outside photography:** allowed (Oscar de la Renta has flexible policy for premium clients).",
            "**When to choose it:** very high-budget wedding, intimate luxury micro-wedding, couples who value absolute privacy and impeccable design. The private-pool suites are spectacular for pre-ceremony shoots."
          ]
        },
        {
          heading: "Legal requirements: civil marriage for foreigners in DR",
          body: [
            "**Required documents** (at least 60 days before the wedding): valid passports, apostilled birth certificates, apostilled proof of single status, apostilled previous divorce decrees (if applicable).",
            "**Spanish translation.** All documents must be translated by a sworn translator in DR.",
            "**Resort wedding planner.** The resort planner handles the civil officer who performs the ceremony. Typical cost: US$300-700 included in many packages.",
            "**Minimum legal timing.** The civil marriage requires 5 business days between arriving in DR and celebrating the wedding. Resorts know how to manage this.",
            "**Recognition of marriage in your home country.** This is the most important: a Dominican civil marriage is internationally valid, but you MUST apostille the marriage certificate in DR after the wedding and register it in your home country to be legally effective there. Cost and timing: 1-2 weeks, ~US$150 at the DR Foreign Ministry."
          ]
        },
        {
          heading: "Photography tips for all-inclusive weddings",
          body: [
            "**Book your photographer BEFORE signing the resort contract.** If the resort requires THEIR photographer and you don't want them, you need to know that beforehand. Big resorts (Hard Rock, Iberostar, Catalonia) are flexible. Premium ones (Eden Roc, Tortuga Bay) are flexible. Super-cheap packages are sometimes rigid.",
            "**Ask the outside-photographer fee.** Usually US$300-700 per resort. Negotiate it if your package has a high price.",
            "**Ceremony timing.** For spectacular photography, ceremony should be 1.5-2 hours before sunset (in Punta Cana that's 6:30 PM in May, 6 PM in December). This gives you: ceremony with good light, golden-hour couple portraits, first dance at dusk.",
            "**Optional first look.** Doing a first look (the couple sees each other before the ceremony) lets you finish portraits BEFORE the ceremony. Useful when there's no time between ceremony and reception.",
            "**Next-day session.** Some packages include a next-day session (the day after, on the beach, with the dress or more casual clothes). If your package doesn't include it, consider booking it separately — the photos are more relaxed and very different from the wedding day.",
            "**Rain plan.** Mandatory plan B. The professional photographer brings waterproof gear and knows the resort's covered spaces in advance. Ask the photographer if they know YOUR specific resort — this makes the difference."
          ]
        },
        {
          heading: "Common mistakes (and how to avoid them)",
          body: [
            "**Mistake 1: hiring the resort photographer without seeing recent portfolio.** In-house photographers rotate frequently. The portfolio you see on the page may be from 2 years ago. Ask to see weddings from the last 3-6 months specifically.",
            "**Mistake 2: not reading the package's photography restrictions.** Some packages limit to 4 hours, restrict access to certain spaces (lobby, restaurants), or charge extra for video. Read the fine print.",
            "**Mistake 3: not coordinating timing with hair and makeup.** Resort makeup has fixed scheduling. If ceremony is at 5 PM, you need to start at 12-1 PM maximum. Coordinate with the wedding planner BEFORE.",
            "**Mistake 4: inviting an amateur family photographer.** It's the #1 cause of post-wedding complaints. Better to ask the amateur to take casual photos at the reception, NOT during the ceremony.",
            "**Mistake 5: not budgeting for the photographer's tip.** In DR tipping is highly appreciated — 10-15% of the photo package cost is standard."
          ]
        }
      ],
      faq: [
        {
          q: "How much does an all-inclusive wedding in Punta Cana cost?",
          a: "Basic packages start at US$2,500-3,500 for 30 guests (Catalonia, Iberostar). Mid-range US$4,500-8,000 (Excellence, Hard Rock, Now). Premium US$10,000-20,000 (Eden Roc, Royalton Diamond Club). Ultra-luxury US$25,000+ (Tortuga Bay with private villas). These prices cover ceremony + reception + dinner + open bar, but do NOT include guest lodging (booked separately, US$200-400 per night per room)."
        },
        {
          q: "How much does an outside photographer cost at a Punta Cana resort?",
          a: "There are two distinct costs. (1) Resort fee for allowing an outside photographer: US$250-700 depending on resort (Catalonia lowest, Excellence highest). This fee goes to the resort, not the photographer. (2) Photographer cost: our Babula Shots packages for destination weddings in Punta Cana start at US$1,800 (basic 5-hour coverage) and go up to US$5,500 (full-day coverage + next-day session + printed album). Request a quote with your date and resort package type for an exact price."
        },
        {
          q: "When is the best season for a wedding in Punta Cana?",
          a: "December-April is high season: perfect weather (minimal rain, 24-28°C temperatures), but hotel prices 40-60% higher and limited availability (book 12-18 months ahead). May-June and November are shoulder season: excellent weather, mid-range prices, good availability — the best value. July-October is hurricane season: low prices, but real risk of rain and a hurricane every 2-3 years. If marrying August-September, get cancellation insurance."
        },
        {
          q: "What if it rains on my wedding day?",
          a: "Each resort has a mandatory plan B: covered ballroom (not glamorous but functional), roofed gazebo, indoor terrace. The decision to move indoors is made 2-4 hours before the ceremony (not at the last minute). As photographers, we can work both outdoors and indoors — resorts know their ballroom lighting and we work with that. Wedding photography with rain has its own aesthetic (umbrellas, windows, soft light) and many couples end up loving those photos. Most importantly: get cancellation insurance if marrying in hurricane season (May-November)."
        },
        {
          q: "Does Babula Shots cover weddings in destinations other than Punta Cana?",
          a: "Yes. We cover weddings throughout the Dominican Republic: Punta Cana and Bávaro (most), Cap Cana (premium), La Romana / Casa de Campo (exclusive resort), Samaná and Las Terrenas (more alternative destination, virgin beach), Puerto Plata (north of the country), Santo Domingo (Colonial Zone for urban wedding), Bayahíbe (intimate beach). See full listing in [wedding locations](/en/locations/)."
        }
      ],
      related: [
        {
          href: "/en/fotografo-bodas-punta-cana/",
          label: "Wedding photographer in Punta Cana",
          description: "Full wedding photography service in Punta Cana: coverage, packages, engagement and next-day sessions."
        },
        {
          href: "/en/cuanto-cuesta-fotografo-bodas-republica-dominicana/",
          label: "Cost of a wedding photographer in DR",
          description: "Detailed price guide, factors and how to request a precise quote."
        },
        {
          href: "/en/locations/",
          label: "Wedding locations",
          description: "All destinations where we cover weddings in the Dominican Republic."
        },
        {
          href: "/en/prices/",
          label: "Prices and packages",
          description: "Published rates for all our wedding photography packages."
        }
      ],
      ogImageAlt: "All-inclusive resort weddings in Punta Cana — Babula Shots complete guide"
    }
  },

  // ─────────────────────────────────────────────────────────────────────
  // P3b — Best wedding venues in Santo Domingo (bilingual)
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "mejores-lugares-bodas-santo-domingo",
    title:
      "Los 10 Mejores Lugares para Bodas en Santo Domingo | Guía 2026 — Babula Shots",
    metaDescription:
      "Los 10 mejores venues para bodas en Santo Domingo: Zona Colonial, Casa de Campo, hoteles 5 estrellas, fincas y playas. Capacidad, precios, fotografía. Guía 2026 de fotógrafo profesional.",
    h1: "Los 10 Mejores Lugares para Bodas en Santo Domingo",
    eyebrow: "Bodas · Guía Santo Domingo",
    datePublished: "2026-05-10T16:00:00-04:00",
    dateModified: "2026-05-10T16:00:00-04:00",
    hero: {
      src: "/images/fotografo-de-bodas-4.webp",
      alt: "Boda elegante en Santo Domingo — fotografía profesional Babula Shots",
      width: 1600,
      height: 1067
    },
    introParagraphs: [
      "Santo Domingo no es Punta Cana — y eso es bueno. Mientras Punta Cana se enfoca en bodas destino con resorts todo incluido, Santo Domingo ofrece la posibilidad de una boda urbana con personalidad: hoteles históricos en la Zona Colonial, salones modernos con vista a la ciudad, fincas privadas a 30 minutos del centro, y la mezcla única de arquitectura colonial del siglo XVI con estética caribeña contemporánea.",
      "Esta guía cubre los 10 mejores lugares donde cubrimos bodas en Santo Domingo — desde las opciones más exclusivas (Casa de Campo a 90 km) hasta venues urbanos íntimos (terrazas de la Zona Colonial). Para cada uno: capacidad, rango de precio, qué tipo de pareja le va bien, fotografía permitida, y honestamente — los pros y los contras desde la perspectiva del fotógrafo.",
      "Si vas a contratar [un fotógrafo de bodas en Santo Domingo](/fotografo-bodas-santo-domingo/) — sea Babula Shots u otro — esta guía te ayuda a elegir un venue que funcione tanto para tus invitados como para tu fotografía."
    ],
    sections: [
      {
        heading: "Por qué casarse en Santo Domingo (vs Punta Cana)",
        body: [
          "**Costo total más bajo.** Una boda equivalente en Santo Domingo cuesta 30-40% menos que en Punta Cana — no porque los servicios sean inferiores, sino porque el sobrecosto de 'destino' no aplica.",
          "**Cultura urbana real.** Tus invitados internacionales experimentan la ciudad real, no solo un resort cerrado. Zona Colonial, restaurantes de chefs locales, museos, vida nocturna, gastronomía dominicana auténtica.",
          "**Acceso a vendors independientes.** En Santo Domingo trabajas con vendors locales de tu elección (DJs, floristas, decoradores, fotógrafos). No estás restringido por los proveedores in-house del resort.",
          "**Fotografía con variedad arquitectónica.** La Zona Colonial te da fondos del siglo XVI únicos en el Caribe. Los hoteles 5 estrellas dan estética moderna. Las fincas dan estética rústica. En una sola ciudad cubres 4-5 estilos visuales distintos.",
          "**Limitaciones honestas.** Logística más compleja para invitados internacionales (sin paquete todo incluido). Clima impredecible — Santo Domingo recibe lluvia con más frecuencia que Punta Cana en el verano. Tráfico — los traslados entre venue y hotel pueden ser 30-60 minutos en hora pico."
        ]
      },
      {
        heading: "1. Hotel Embajador (clásico tradicional)",
        body: [
          "**Estilo:** clásico dominicano, salones tradicionales, prestigio histórico (hotel desde 1956).",
          "**Capacidad:** 50-500 invitados (Salón Embajador es de los más grandes de la ciudad).",
          "**Locaciones:** salón principal con techos altos, jardines exteriores, terrazas con vista a la piscina.",
          "**Rango de precio:** mid-range. Paquetes desde US$8,000 para 100 invitados (catering + salón + decoración base).",
          "**Cuándo elegirlo:** bodas grandes (200+ invitados), parejas dominicanas con familia tradicional, weddings de élite local, eventos formales con dress code estricto. Excelente para fotografía con luz natural en los jardines."
        ]
      },
      {
        heading: "2. Hodelpa Garden Suites (boutique elegante)",
        body: [
          "**Estilo:** boutique moderno, jardines tropicales, ambiente más íntimo que un hotel grande.",
          "**Capacidad:** 30-150 invitados.",
          "**Locaciones:** jardín central con piscina, salón con vista al jardín, terraza superior.",
          "**Rango de precio:** mid-premium. US$10,000-15,000 para 100 invitados.",
          "**Cuándo elegirlo:** bodas medianas con estética moderna, parejas que valoran intimidad pero quieren amenidades hoteleras (rooming, alcobas para invitados, spa). Las suites para preparación son grandes y bien iluminadas — excelente para sesión de getting ready."
        ]
      },
      {
        heading: "3. JW Marriott Santo Domingo (luxury moderno)",
        body: [
          "**Estilo:** lujo internacional, vista panorámica de la ciudad, salones de eventos premium.",
          "**Capacidad:** 80-300 invitados.",
          "**Locaciones:** Sky Lounge en piso 21 (vista panorámica de Santo Domingo y el Caribe), Gran Salón Diplomático, terraza interior con jardín vertical.",
          "**Rango de precio:** premium. US$20,000+ para 150 invitados.",
          "**Cuándo elegirlo:** bodas premium, parejas con muchos invitados internacionales que valoran marcas conocidas, recepciones con vista panorámica al atardecer (la Sky Lounge para cocktail antes de la cena en el salón). La fotografía aérea de la pareja en la terraza con la ciudad de fondo es spectacular."
        ]
      },
      {
        heading: "4. Casa de Campo (La Romana — 90 km de Santo Domingo)",
        body: [
          "**Estilo:** ultra-lujo, resort exclusivo, golf clase mundial. Técnicamente fuera de Santo Domingo pero relevante por demanda alta.",
          "**Capacidad:** 50-300 invitados.",
          "**Locaciones:** Altos de Chavón (réplica de pueblo italiano del siglo XVI con anfiteatro al aire libre y vista al río Chavón — UNO DE LOS MÁS BONITOS DE TODO EL CARIBE), Marina Casa de Campo, playa privada Minitas.",
          "**Rango de precio:** ultra-luxury. US$30,000-100,000+ para 100 invitados.",
          "**Cuándo elegirlo:** parejas con presupuesto premium, bodas estilo destination wedding pero con servicio europeo, ceremonia en Altos de Chavón es lo más memorable que hemos cubierto en 10 años de bodas. Vale el viaje de 90 km de Santo Domingo."
        ]
      },
      {
        heading: "5. Hotel Palacio (boutique en Zona Colonial)",
        body: [
          "**Estilo:** hotel boutique en mansion colonial restaurada (siglo XVI), patio interior con fuentes, ambiente íntimo.",
          "**Capacidad:** 20-80 invitados (íntimo).",
          "**Locaciones:** patio central con arcadas y fuente, terraza superior con vista a la Catedral Primada, salón pequeño con techos altos de madera original.",
          "**Rango de precio:** mid-premium. US$8,000-15,000 para 50 invitados.",
          "**Cuándo elegirlo:** bodas íntimas con estética histórica única, parejas que valoran arquitectura colonial sobre instalaciones modernas, micro-bodas (10-30 invitados) extremadamente atmosféricas. La fotografía aquí es de las más distintivas de toda la ciudad — patios coloniales con luz filtrada."
        ]
      },
      {
        heading: "6. Sambil Gran Salón Quintessence",
        body: [
          "**Estilo:** salón de eventos moderno (no es hotel), diseño contemporáneo, gran capacidad.",
          "**Capacidad:** 100-600 invitados (Quintessence es uno de los salones más grandes de la ciudad).",
          "**Locaciones:** salón principal con candelabros, jardines climatizados, terraza con vista panorámica.",
          "**Rango de precio:** mid-range. US$12,000-20,000 para 200 invitados.",
          "**Cuándo elegirlo:** bodas muy grandes (250+ invitados), parejas que prefieren tener libertad total de proveedores (no hay hotel asociado, traes tu catering, decorador, etc.), eventos donde el salón es el venue principal y los invitados se hospedan en sus propias casas o hoteles cercanos."
        ]
      },
      {
        heading: "7. Catalonia Bávaro (alternativa playa, 25 min de Santo Domingo: Boca Chica)",
        body: [
          "**Estilo:** todo incluido playero, ambiente caribeño tradicional. Boca Chica es la playa accesible desde Santo Domingo.",
          "**Capacidad:** 30-200 invitados.",
          "**Locaciones:** playa de Boca Chica (no es Punta Cana, pero es playa real a 25 minutos del centro), gazebo en jardines.",
          "**Rango de precio:** mid-low. US$5,000-10,000 para 80 invitados con paquete todo incluido.",
          "**Cuándo elegirlo:** parejas que quieren la estética de boda playera pero con la comodidad de Santo Domingo (vuelos a SDQ + 25 minutos a Boca Chica). Buena alternativa cuando el presupuesto no alcanza para Punta Cana pero quieres playa."
        ]
      },
      {
        heading: "8. Finca privada en San Cristóbal o Bani (50-90 km de Santo Domingo)",
        body: [
          "**Estilo:** rústico-elegante, finca privada con paisaje montañoso, naturaleza, ambiente íntimo.",
          "**Capacidad:** 30-150 invitados.",
          "**Locaciones:** finca tipo hacienda con jardines, terrazas con vista a montañas, estructura tipo gazebo construida ad hoc.",
          "**Rango de precio:** variable según finca. Alquiler del espacio US$3,000-8,000 + catering + decoración por cuenta tuya.",
          "**Cuándo elegirlo:** parejas que valoran privacidad absoluta, ambiente rural/natural, libertad creativa de decoración. Las opciones más populares: Finca Loma Linda (San Cristóbal), Finca La Querencia (Bani). Requiere coordinador experimentado porque toda la logística es ad hoc."
        ]
      },
      {
        heading: "9. Mansion Las Carmelitas (boutique exclusivo)",
        body: [
          "**Estilo:** mansion histórica restaurada, jardines amplios, exclusividad.",
          "**Capacidad:** 50-200 invitados.",
          "**Locaciones:** salón principal con araña veneciana, jardín con piscina infinita, capilla privada.",
          "**Rango de precio:** premium. US$15,000-25,000 para 100 invitados.",
          "**Cuándo elegirlo:** bodas elegantes con presupuesto medio-alto, parejas que valoran exclusividad sin ser un hotel comercial, ceremonias religiosas en capilla privada. Fotografía en el jardín con piscina infinita produce algunas de las mejores fotos editoriales de boda en RD."
        ]
      },
      {
        heading: "10. Restaurante Pat'e Palo (Plaza España, Zona Colonial — micro-bodas)",
        body: [
          "**Estilo:** restaurante histórico en Plaza España (Zona Colonial), terrazas con vista a la plaza y al río Ozama.",
          "**Capacidad:** 30-80 invitados (íntimo).",
          "**Locaciones:** terraza superior con vista al Alcázar de Colón y al río Ozama, comedor interior.",
          "**Rango de precio:** mid. US$5,000-10,000 para 50 invitados (incluye comida y servicio).",
          "**Cuándo elegirlo:** micro-bodas o cenas post-ceremonia, parejas que tuvieron ceremonia en otra parte de la Zona Colonial (Catedral, Plaza Las Damas) y quieren cenar con vista a Plaza España. La terraza al atardecer es de las locaciones más fotogénicas de toda la ciudad."
        ]
      },
      {
        heading: "Tips de fotografía para boda en Santo Domingo",
        body: [
          "**Sesión pre-boda en Zona Colonial.** Si te casas en otro venue (hotel moderno, finca), considera reservar 1-2 horas la mañana del día siguiente para sesión post-boda en la Zona Colonial — las fotos resultantes son únicas y las parejas quedan encantadas. Ver nuestra [guía de locaciones en Zona Colonial](https://estudio.babulashotsrd.com/blog/zona-colonial-fotos/).",
          "**Timing de ceremonia para luz óptima.** Para fotografía spectacular: ceremonia 1.5-2 horas antes del atardecer. En Santo Domingo eso es 5:30 PM en mayo, 5 PM en diciembre. Resorts grandes y hoteles pueden tener restricciones de horario — confirma antes.",
          "**Plan B por lluvia.** Más importante en Santo Domingo que en Punta Cana — la ciudad recibe más lluvia en verano. Cada venue debe tener plan interior obligatorio. Si te casas mayo-octubre, este punto es no-negociable.",
          "**Tráfico.** Santo Domingo tiene tráfico real entre 4-8 PM. Si tu ceremonia es a las 5 PM y los invitados deben llegar de su hotel del centro, planifica 60-90 minutos de buffer.",
          "**Permisos para Zona Colonial.** Sesión personal en Zona Colonial NO requiere permiso. Sesión publicitaria/comercial sí — gestionable en 5-10 días con el Ministerio de Cultura. Babula Shots gestiona permiso si tu paquete lo necesita."
        ]
      }
    ],
    faq: [
      {
        q: "¿Cuánto cuesta una boda en Santo Domingo?",
        a: "Depende mucho del tipo. Bodas pequeñas en venue boutique de Zona Colonial: US$10,000-20,000 para 50 invitados. Bodas medianas en hoteles 4-5 estrellas: US$20,000-40,000 para 100-150 invitados. Bodas premium en JW Marriott, Mansion Las Carmelitas: US$40,000-80,000 para 150-200 invitados. Bodas ultra-lujo en Casa de Campo: US$80,000-200,000+. Estos rangos cubren venue + catering + decoración + flores + DJ — NO incluyen el vestido, anillos, ni el fotógrafo (aparte)."
      },
      {
        q: "¿Es mejor casarse en Santo Domingo o Punta Cana?",
        a: "Depende de la prioridad. Punta Cana es mejor para: simplificar logística (todo incluido), boda destino con muchos invitados internacionales, foco en relax/playa. Santo Domingo es mejor para: bodas con personalidad cultural única, presupuesto eficiente, parejas que valoran que sus invitados experiencien la ciudad real, fotografía con variedad arquitectónica. Si tienes muchos invitados extranjeros que solo quieren playa: Punta Cana. Si quieres una boda con sello de identidad: Santo Domingo."
      },
      {
        q: "¿Cuánto tiempo antes debo reservar el venue?",
        a: "Para venues populares en alta temporada (diciembre-abril): 12-18 meses antes. Para shoulder season (mayo-junio, noviembre): 8-12 meses. Para temporada baja: 4-6 meses puede ser suficiente. Casa de Campo y JW Marriott Sky Lounge se reservan con 18+ meses de anticipación para weekends. Mansion Las Carmelitas también — son únicos."
      },
      {
        q: "¿Babula Shots ofrece paquetes específicos para boda en Santo Domingo?",
        a: "Sí. Tenemos paquetes especiales para boda en Santo Domingo: cobertura básica (4 horas, ceremonia + cocktail) desde US$1,500, cobertura completa (8 horas, preparación + ceremonia + recepción + fiesta) desde US$3,500, paquete premium (cobertura + sesión pre-boda en Zona Colonial + álbum impreso + video corto) desde US$6,500. Cotización exacta requiere fecha y venue específicos."
      },
      {
        q: "¿Pueden cubrir mi boda si la ceremonia es en un venue y la recepción en otro?",
        a: "Sí — es muy común en Santo Domingo (ceremonia en iglesia, recepción en hotel). Coordinamos el traslado entre venues. Para mayoría de bodas el traslado es 15-30 minutos en la ciudad y se incluye sin costo adicional. Si la ceremonia es en una catedral histórica de la Zona Colonial y la recepción es en JW Marriott del Polígono Central, el traslado es 25-30 minutos — perfecto para hacer fotos de pareja en la ruta o en una parada intermedia (Malecón, Plaza de la Cultura)."
      }
    ],
    related: [
      {
        href: "/fotografo-bodas-santo-domingo/",
        label: "Fotógrafo de bodas en Santo Domingo",
        description: "Servicio completo de fotografía de bodas en Santo Domingo: cobertura, paquetes, sesión pre-boda en Zona Colonial."
      },
      {
        href: "/fotografo-bodas-punta-cana/",
        label: "Fotógrafo de bodas en Punta Cana",
        description: "Cobertura de bodas destino en Punta Cana, Cap Cana y Bávaro."
      },
      {
        href: "/cuanto-cuesta-fotografo-bodas-republica-dominicana/",
        label: "Cuánto cuesta un fotógrafo de bodas",
        description: "Guía detallada de precios y factores que influyen en la cotización."
      },
      {
        href: "/blog/bodas-todo-incluido-punta-cana/",
        label: "Bodas todo incluido en Punta Cana",
        description: "Guía complementaria — opciones de resort para boda destino."
      }
    ],
    ogImageAlt: "Mejores lugares para bodas en Santo Domingo — guía completa de Babula Shots",
    en: {
      enSlug: "best-wedding-venues-santo-domingo",
      title:
        "10 Best Wedding Venues in Santo Domingo, Dominican Republic | 2026 Guide — Babula Shots",
      metaDescription:
        "The 10 best wedding venues in Santo Domingo, Dominican Republic: Colonial Zone, Casa de Campo, 5-star hotels, private estates and beach options. Capacity, pricing, photography. 2026 photographer's guide.",
      h1: "10 Best Wedding Venues in Santo Domingo",
      eyebrow: "Weddings · Santo Domingo Guide",
      introParagraphs: [
        "Santo Domingo is not Punta Cana — and that's a good thing. While Punta Cana focuses on destination weddings at all-inclusive resorts, Santo Domingo offers an urban wedding with personality: historic hotels in the Colonial Zone, modern ballrooms with city views, private estates 30 minutes from downtown, and the unique blend of 16th-century colonial architecture with contemporary Caribbean aesthetic.",
        "This guide covers the 10 best venues where we shoot weddings in Santo Domingo — from the most exclusive options (Casa de Campo at 90 km) to intimate urban venues (Colonial Zone terraces). For each: capacity, price range, what type of couple it suits, photography permitted, and honestly — pros and cons from a photographer's perspective.",
        "If you're hiring [a wedding photographer in Santo Domingo](/en/fotografo-bodas-santo-domingo/) — Babula Shots or someone else — this guide helps you choose a venue that works both for your guests and for your photography."
      ],
      sections: [
        {
          heading: "Why marry in Santo Domingo (vs Punta Cana)",
          body: [
            "**Lower total cost.** An equivalent wedding in Santo Domingo costs 30-40% less than in Punta Cana — not because services are inferior, but because the 'destination' premium doesn't apply.",
            "**Real urban culture.** Your international guests experience the real city, not just a closed resort. Colonial Zone, local chef restaurants, museums, nightlife, authentic Dominican gastronomy.",
            "**Independent vendor access.** In Santo Domingo you work with local vendors of your choice (DJs, florists, decorators, photographers). You're not restricted by the resort's in-house providers.",
            "**Photography with architectural variety.** The Colonial Zone gives you unique 16th-century backdrops found nowhere else in the Caribbean. The 5-star hotels deliver modern aesthetic. The estates deliver rustic feel. In a single city you cover 4-5 distinct visual styles.",
            "**Honest limitations.** More complex logistics for international guests (no all-inclusive package). Unpredictable weather — Santo Domingo gets rain more frequently than Punta Cana in summer. Traffic — transfers between venue and hotel can be 30-60 minutes during rush hour."
          ]
        },
        {
          heading: "1. Hotel Embajador (classic traditional)",
          body: [
            "**Style:** classic Dominican, traditional ballrooms, historic prestige (hotel since 1956).",
            "**Capacity:** 50-500 guests (the Embajador Ballroom is one of the largest in the city).",
            "**Locations:** main ballroom with high ceilings, outdoor gardens, terraces with pool view.",
            "**Price range:** mid-range. Packages from US$8,000 for 100 guests (catering + ballroom + base decoration).",
            "**When to choose it:** large weddings (200+ guests), Dominican couples with traditional family, local elite weddings, formal events with strict dress code. Excellent for natural-light photography in the gardens."
          ]
        },
        {
          heading: "2. Hodelpa Garden Suites (elegant boutique)",
          body: [
            "**Style:** modern boutique, tropical gardens, more intimate than a big hotel.",
            "**Capacity:** 30-150 guests.",
            "**Locations:** central garden with pool, ballroom with garden view, upper terrace.",
            "**Price range:** mid-premium. US$10,000-15,000 for 100 guests.",
            "**When to choose it:** medium weddings with modern aesthetic, couples who value intimacy but want hotel amenities (rooming, guest suites, spa). The preparation suites are large and well-lit — excellent for getting-ready sessions."
          ]
        },
        {
          heading: "3. JW Marriott Santo Domingo (modern luxury)",
          body: [
            "**Style:** international luxury, panoramic city views, premium event ballrooms.",
            "**Capacity:** 80-300 guests.",
            "**Locations:** Sky Lounge on 21st floor (panoramic view of Santo Domingo and the Caribbean), Diplomatic Grand Ballroom, indoor terrace with vertical garden.",
            "**Price range:** premium. US$20,000+ for 150 guests.",
            "**When to choose it:** premium weddings, couples with many international guests who value known brands, receptions with sunset panoramic views (Sky Lounge for cocktails before dinner in the ballroom). Aerial-style photography of the couple on the terrace with the city behind is spectacular."
          ]
        },
        {
          heading: "4. Casa de Campo (La Romana — 90 km from Santo Domingo)",
          body: [
            "**Style:** ultra-luxury, exclusive resort, world-class golf. Technically outside Santo Domingo but relevant due to high demand.",
            "**Capacity:** 50-300 guests.",
            "**Locations:** Altos de Chavón (16th-century Italian village replica with open-air amphitheater and view of the Chavón River — ONE OF THE MOST BEAUTIFUL IN THE ENTIRE CARIBBEAN), Casa de Campo Marina, private Minitas Beach.",
            "**Price range:** ultra-luxury. US$30,000-100,000+ for 100 guests.",
            "**When to choose it:** couples with premium budget, destination wedding style with European-level service, ceremony at Altos de Chavón is the most memorable thing we've covered in 10 years of weddings. Worth the 90 km drive from Santo Domingo."
          ]
        },
        {
          heading: "5. Hotel Palacio (Colonial Zone boutique)",
          body: [
            "**Style:** boutique hotel in restored colonial mansion (16th century), interior courtyard with fountains, intimate atmosphere.",
            "**Capacity:** 20-80 guests (intimate).",
            "**Locations:** central courtyard with arcades and fountain, upper terrace with view of the Cathedral Primada, small ballroom with original wooden ceilings.",
            "**Price range:** mid-premium. US$8,000-15,000 for 50 guests.",
            "**When to choose it:** intimate weddings with unique historical aesthetic, couples who value colonial architecture over modern facilities, extremely atmospheric micro-weddings (10-30 guests). Photography here is among the most distinctive in the city — colonial courtyards with filtered light."
          ]
        },
        {
          heading: "6. Sambil Gran Salón Quintessence",
          body: [
            "**Style:** modern event ballroom (not a hotel), contemporary design, large capacity.",
            "**Capacity:** 100-600 guests (Quintessence is one of the city's largest ballrooms).",
            "**Locations:** main ballroom with chandeliers, climate-controlled gardens, terrace with panoramic view.",
            "**Price range:** mid-range. US$12,000-20,000 for 200 guests.",
            "**When to choose it:** very large weddings (250+ guests), couples who prefer total vendor freedom (no associated hotel, you bring your catering, decorator, etc.), events where the ballroom is the main venue and guests stay at their own homes or nearby hotels."
          ]
        },
        {
          heading: "7. Catalonia Bávaro (beach alternative — 25 min from Santo Domingo: Boca Chica)",
          body: [
            "**Style:** all-inclusive beach, traditional Caribbean atmosphere. Boca Chica is the beach accessible from Santo Domingo.",
            "**Capacity:** 30-200 guests.",
            "**Locations:** Boca Chica beach (it's not Punta Cana, but it's a real beach 25 minutes from downtown), garden gazebo.",
            "**Price range:** mid-low. US$5,000-10,000 for 80 guests with all-inclusive package.",
            "**When to choose it:** couples who want beach wedding aesthetic with Santo Domingo convenience (flights to SDQ + 25 minutes to Boca Chica). Good alternative when budget doesn't reach Punta Cana but you want beach."
          ]
        },
        {
          heading: "8. Private estate in San Cristóbal or Bani (50-90 km from Santo Domingo)",
          body: [
            "**Style:** rustic-elegant, private estate with mountain landscape, nature, intimate atmosphere.",
            "**Capacity:** 30-150 guests.",
            "**Locations:** hacienda-style estate with gardens, terraces with mountain views, ad-hoc gazebo structure.",
            "**Price range:** variable per estate. Space rental US$3,000-8,000 + catering + decoration on your own.",
            "**When to choose it:** couples who value absolute privacy, rural/natural atmosphere, creative decoration freedom. Most popular options: Finca Loma Linda (San Cristóbal), Finca La Querencia (Bani). Requires experienced coordinator because all logistics are ad-hoc."
          ]
        },
        {
          heading: "9. Mansion Las Carmelitas (exclusive boutique)",
          body: [
            "**Style:** restored historic mansion, large gardens, exclusivity.",
            "**Capacity:** 50-200 guests.",
            "**Locations:** main ballroom with Venetian chandelier, garden with infinity pool, private chapel.",
            "**Price range:** premium. US$15,000-25,000 for 100 guests.",
            "**When to choose it:** elegant weddings with mid-high budget, couples who value exclusivity without it being a commercial hotel, religious ceremonies in private chapel. Photography in the garden with infinity pool produces some of the best editorial wedding photos in DR."
          ]
        },
        {
          heading: "10. Pat'e Palo Restaurant (Plaza España, Colonial Zone — micro-weddings)",
          body: [
            "**Style:** historic restaurant in Plaza España (Colonial Zone), terraces with view of the plaza and the Ozama River.",
            "**Capacity:** 30-80 guests (intimate).",
            "**Locations:** upper terrace with view of the Alcázar de Colón and Ozama River, indoor dining room.",
            "**Price range:** mid. US$5,000-10,000 for 50 guests (includes food and service).",
            "**When to choose it:** micro-weddings or post-ceremony dinners, couples who had ceremony elsewhere in the Colonial Zone (Cathedral, Plaza Las Damas) and want to dine with view of Plaza España. The terrace at sunset is one of the most photogenic locations in the entire city."
          ]
        },
        {
          heading: "Photography tips for a Santo Domingo wedding",
          body: [
            "**Pre-wedding session in the Colonial Zone.** If you marry at a different venue (modern hotel, estate), consider booking 1-2 hours the morning after for a post-wedding session in the Colonial Zone — the resulting photos are unique and couples love them.",
            "**Ceremony timing for optimal light.** For spectacular photography: ceremony 1.5-2 hours before sunset. In Santo Domingo that's 5:30 PM in May, 5 PM in December. Large resorts and hotels may have schedule restrictions — confirm beforehand.",
            "**Rain plan B.** More important in Santo Domingo than in Punta Cana — the city gets more summer rain. Each venue must have a mandatory indoor plan. If marrying May-October, this point is non-negotiable.",
            "**Traffic.** Santo Domingo has real traffic 4-8 PM. If your ceremony is at 5 PM and guests must arrive from their downtown hotel, plan 60-90 minutes of buffer.",
            "**Colonial Zone permits.** Personal session in Colonial Zone does NOT require a permit. Commercial/advertising session does — issued in 5-10 days by Ministry of Culture. Babula Shots handles the permit if your package needs it."
          ]
        }
      ],
      faq: [
        {
          q: "How much does a wedding in Santo Domingo cost?",
          a: "Depends a lot on the type. Small weddings at boutique Colonial Zone venue: US$10,000-20,000 for 50 guests. Mid-size weddings at 4-5 star hotels: US$20,000-40,000 for 100-150 guests. Premium weddings at JW Marriott, Mansion Las Carmelitas: US$40,000-80,000 for 150-200 guests. Ultra-luxury weddings at Casa de Campo: US$80,000-200,000+. These ranges cover venue + catering + decoration + flowers + DJ — they do NOT include dress, rings, or photographer (separate)."
        },
        {
          q: "Is it better to marry in Santo Domingo or Punta Cana?",
          a: "Depends on the priority. Punta Cana is better for: simplifying logistics (all-inclusive), destination wedding with many international guests, focus on relax/beach. Santo Domingo is better for: weddings with unique cultural personality, efficient budget, couples who value their guests experiencing the real city, photography with architectural variety. If you have many foreign guests who only want beach: Punta Cana. If you want a wedding with identity: Santo Domingo."
        },
        {
          q: "How far in advance should I book the venue?",
          a: "For popular venues in high season (December-April): 12-18 months ahead. For shoulder season (May-June, November): 8-12 months. For low season: 4-6 months may be enough. Casa de Campo and JW Marriott Sky Lounge book 18+ months ahead for weekends. Mansion Las Carmelitas similarly — they're unique."
        },
        {
          q: "Does Babula Shots offer specific packages for Santo Domingo weddings?",
          a: "Yes. We have specific packages for Santo Domingo weddings: basic coverage (4 hours, ceremony + cocktail) from US$1,500, full coverage (8 hours, preparation + ceremony + reception + party) from US$3,500, premium package (coverage + Colonial Zone pre-wedding session + printed album + short video) from US$6,500. Exact quote requires specific date and venue."
        },
        {
          q: "Can you cover my wedding if ceremony is at one venue and reception at another?",
          a: "Yes — it's very common in Santo Domingo (ceremony at church, reception at hotel). We coordinate the transfer between venues. For most weddings the transfer is 15-30 minutes within the city and is included at no additional cost. If the ceremony is at a historic Colonial Zone cathedral and reception is at JW Marriott in Polígono Central, the transfer is 25-30 minutes — perfect for couple photos en route or at an intermediate stop (Malecón, Plaza de la Cultura)."
        }
      ],
      related: [
        {
          href: "/en/fotografo-bodas-santo-domingo/",
          label: "Wedding photographer in Santo Domingo",
          description: "Full wedding photography service in Santo Domingo: coverage, packages, Colonial Zone pre-wedding session."
        },
        {
          href: "/en/fotografo-bodas-punta-cana/",
          label: "Wedding photographer in Punta Cana",
          description: "Destination wedding coverage in Punta Cana, Cap Cana and Bávaro."
        },
        {
          href: "/en/cuanto-cuesta-fotografo-bodas-republica-dominicana/",
          label: "Cost of a wedding photographer",
          description: "Detailed price guide and factors that influence the quote."
        },
        {
          href: "/en/blog/all-inclusive-resort-weddings-punta-cana/",
          label: "All-inclusive resort weddings in Punta Cana",
          description: "Complementary guide — resort options for destination weddings."
        }
      ],
      ogImageAlt: "Best wedding venues in Santo Domingo — Babula Shots complete guide"
    }
  }
];

export const articles: Article[] = ARTICLES;

const articleBySlug = new Map<string, Article>(ARTICLES.map((a) => [a.slug, a]));
const articleByEnSlug = new Map<string, Article>(
  ARTICLES.filter((a) => a.en?.enSlug).map((a) => [a.en!.enSlug, a])
);

export function findArticle(slug: string): Article | undefined {
  return articleBySlug.get(slug);
}

export function findArticleByEnSlug(enSlug: string): Article | undefined {
  return articleByEnSlug.get(enSlug);
}

export const articlesWithEn: Article[] = ARTICLES.filter((a) => Boolean(a.en?.enSlug));
