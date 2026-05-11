export type WeddingCity = {
  city: string;
  slug: string;
  province: string;
  priority: 1 | 2 | 3;
  title: string;
  description: string;
  h1: string;
  intro: string;
  localAngle: string;
  venues: string[];
  nearby: string[];
  images: string[];
  supportingKeywords: string[];
  localContext: string[];
  enLocalContext: string[];
  sisterCities: string[];
};

const imageSet = {
  punta: "/images/fotografo-de-boda-playa-punta-cana.webp",
  puntaAlt: "/images/fotografo-bodas-playa-punta-cana.webp",
  santo: "/images/santo-domingo-fotografo-de-bodas.webp",
  colonial: "/images/santo-domingo-bodas-zoona-colonial-fotoografoo-scaled.webp",
  couple: "/images/fotografo-de-bodas-punta-cana.webp",
  premium: "/images/mejor-fotografos-de-boda-republica-dominicana.webp",
  sunset: "/images/wedding-photographer-dominican-republic-punta-cana-sunset.webp",
  resort: "/images/punta-cana-wedding-photographer-luxury-resort.webp",
  hero: "/images/fotografo-de-bodas-4.webp"
};

export const weddingCities: WeddingCity[] = [
  {
    city: "Punta Cana",
    slug: "punta-cana",
    province: "La Altagracia",
    priority: 1,
    title: "Fotógrafo de bodas en Punta Cana | Babula Shots",
    description: "Fotógrafo de bodas en Punta Cana para bodas destino, ceremonias en la playa y resorts. Cobertura profesional con estilo natural y editorial.",
    h1: "Fotógrafo de bodas en Punta Cana",
    intro: "Punta Cana es uno de los destinos más importantes para bodas en República Dominicana. En Babula Shots capturamos ceremonias en la playa, bodas destino, sesiones de pareja y celebraciones en resorts con una estética natural, elegante y cinematográfica.",
    localAngle: "La luz de playa, los horarios de resort y la logística entre ceremonia, coctel y recepción requieren dirección clara. Trabajamos con un flujo cómodo para parejas locales e internacionales.",
    venues: ["Kukua Beach Club", "Jellyfish Restaurant", "Hard Rock Punta Cana", "Dreams Macao", "Cap Cana", "Bávaro Beach"],
    nearby: ["Bayahíbe", "Higüey", "La Romana", "Santo Domingo", "Las Terrenas"],
    images: [imageSet.punta, imageSet.resort, imageSet.sunset, imageSet.couple],
    supportingKeywords: ["wedding photographer Punta Cana", "boda en Punta Cana", "fotógrafo playa Punta Cana"],
    localContext: [
      "Punta Cana concentra la mayor oferta de resorts all-inclusive del Caribe, y eso marca el ritmo de cada boda. Trabajamos dentro del Hard Rock, Eden Roc Cap Cana, Dreams Macao, Iberostar Grand Bávaro y The Westin Puntacana, donde cada complejo tiene su propia coordinadora, su lista de proveedores aprobados y permisos internos para los retratos en zonas privadas como muelles, jardines y suites presidenciales. Conocer esos protocolos evita esperas y nos permite mover a la pareja de la habitación a la playa de Bávaro o a Juanillo Beach sin perder la luz del golden hour.",
      "El tramo entre Cabeza de Toro y Cap Cana Marina ofrece escenarios muy distintos en pocos kilómetros: la playa abierta de Macao con dunas y oleaje fuerte, los gazebos sobre la arena blanca de Bávaro, el muelle de Jellyfish Restaurant, las terrazas frente al canal de Cap Cana y el área del faro en Playa Juanillo. Diseñamos la ruta de retratos pensando en el viento del este, que en temporada alta empuja arena fina a partir de las 11 de la mañana, y en el horario real de cierre del sol entre las 6:15 y las 6:40 PM según el mes.",
      "Muchas parejas combinan ceremonia simbólica en Punta Cana con una boda legal previa en su país. Esto cambia la cobertura: priorizamos el first look, los votos personales, el cocktail con vista al mar y el party hour bajo luces ámbar que ofrecen salones como Kukua o el Coral Beach Club. Si la pareja viene de Estados Unidos, Canadá, México o España, también coordinamos un day-after en Cap Cana Marina o en la piscina infinita del resort para una galería editorial complementaria."
    ],
    enLocalContext: [
      "Punta Cana holds the largest all-inclusive resort cluster in the Caribbean, and that shapes the rhythm of every wedding. We work inside Hard Rock, Eden Roc Cap Cana, Dreams Macao, Iberostar Grand Bávaro and The Westin Puntacana, where each property has its own planner, approved-vendor list and internal permissions for portraits at private docks, gardens and presidential suites. Knowing those protocols avoids long waits and lets us move the couple from the room to Bávaro Beach or Juanillo Beach without losing golden-hour light.",
      "The stretch between Cabeza de Toro and Cap Cana Marina offers very different scenery within a few kilometres: the open beach at Macao with dunes and strong surf, the gazebos on the white sand of Bávaro, the Jellyfish Restaurant pier, the canal-front terraces in Cap Cana and the lighthouse area at Juanillo Beach. We plan the portrait route around the east wind, which kicks fine sand up after 11 AM in high season, and the real sunset window between 6:15 and 6:40 PM depending on the month.",
      "Many couples combine a symbolic ceremony in Punta Cana with a prior legal wedding in their home country. That shifts the coverage: we prioritise the first look, personal vows, oceanfront cocktail and the party hour under amber lights at venues like Kukua or Coral Beach Club. For couples flying in from the US, Canada, Mexico or Spain, we also coordinate a day-after session at Cap Cana Marina or by the resort's infinity pool to add an editorial layer to the gallery."
    ],
    sisterCities: ["bayahibe", "higuey", "la-romana"]
  },
  {
    city: "Santo Domingo",
    slug: "santo-domingo",
    province: "Distrito Nacional",
    priority: 1,
    title: "Fotógrafo de bodas en Santo Domingo | Babula Shots",
    description: "Fotógrafo de bodas en Santo Domingo para bodas elegantes, ceremonias civiles, Zona Colonial y celebraciones premium.",
    h1: "Fotógrafo de bodas en Santo Domingo",
    intro: "Santo Domingo ofrece escenarios perfectos para bodas elegantes, ceremonias civiles, sesiones urbanas y eventos premium. Babula Shots documenta bodas en la ciudad con una mezcla de fotografía documental, dirección natural y estética editorial.",
    localAngle: "La Zona Colonial, hoteles, iglesias y espacios privados permiten una narrativa visual muy completa: preparación, retratos, ceremonia y fiesta con contraste entre arquitectura, ciudad y emoción real.",
    venues: ["Zona Colonial", "Jardín Botánico", "Hoteles de Santo Domingo", "Restaurantes privados", "Salones de eventos", "Malecón Santo Domingo"],
    nearby: ["Boca Chica", "Juan Dolio", "San Pedro de Macorís", "La Romana", "Punta Cana"],
    images: [imageSet.santo, imageSet.colonial, imageSet.hero, imageSet.premium],
    supportingKeywords: ["fotógrafo boda Zona Colonial", "fotógrafo boda civil Santo Domingo", "fotógrafo bodas Santo Domingo"],
    localContext: [
      "Santo Domingo es la única capital del Caribe con un casco histórico declarado Patrimonio de la Humanidad, y eso convierte a la Zona Colonial en un set fotográfico irrepetible. La Catedral Primada de América, el Alcázar de Colón, la Plaza España, las Ruinas del Monasterio de San Francisco y la Calle Las Damas funcionan como locaciones reales para ceremonias religiosas, civiles y sesiones de retrato. Coordinamos los permisos del Ministerio de Cultura cuando la pareja quiere usar las plazas como escenario y los horarios de servicios litúrgicos para no cruzarse con misas dominicales.",
      "Más allá de la Zona Colonial, la ciudad ofrece una segunda capa de venues premium: el Embajador Hotel, el Catalonia Santo Domingo, el JW Marriott en Blue Mall, el Renaissance Jaragua, El Mesón de la Cava dentro de una cueva natural y los salones del Country Club. El Malecón frente al mar Caribe y el Mirador Sur ofrecen retratos urbanos con skyline al atardecer; el Jardín Botánico Nacional aporta vegetación tropical sin salir de la ciudad. Cada zona implica un tráfico distinto entre las 5 y las 8 PM, por eso planificamos la ruta retrato → recepción con margen real.",
      "Las bodas civiles en Santo Domingo siguen un protocolo específico: el Juzgado de Paz cita a la pareja con horarios estrictos y muchos eligen completar la ceremonia con una recepción privada en restaurantes como Adrian Tropical, Pat'e Palo o el rooftop del Billini Hotel. Documentamos firma, anillos, brindis y first dance manteniendo el estilo editorial discreto que pide una boda urbana, sin convertir el evento en una sesión larga ni romper la intimidad del grupo familiar."
    ],
    enLocalContext: [
      "Santo Domingo is the only Caribbean capital with a UNESCO-listed historic centre, and that turns the Zona Colonial into a one-of-a-kind set. The Catedral Primada de América (oldest cathedral in the Americas), Alcázar de Colón, Plaza España, the Ruinas del Monasterio de San Francisco and Calle Las Damas all work as real wedding locations for religious ceremonies, civil ceremonies and portrait sessions. We coordinate Ministry of Culture permissions when couples want to shoot in the public plazas and we check liturgical schedules to avoid clashing with Sunday mass.",
      "Beyond the Colonial Zone the city offers a second layer of premium venues: Hotel El Embajador, Catalonia Santo Domingo, JW Marriott at Blue Mall, the Renaissance Jaragua, El Mesón de la Cava (built inside a natural cave) and the Country Club ballrooms. The Malecón overlooking the Caribbean Sea and Mirador Sur park give urban portraits with a skyline at dusk, while the Jardín Botánico Nacional adds tropical greenery without leaving the city. Each zone has its own traffic pattern between 5 and 8 PM, so we plan the portrait-to-reception route with real-world margin.",
      "Civil weddings in Santo Domingo follow a strict protocol: the Juzgado de Paz assigns appointment slots and many couples complete the ceremony with a private reception at restaurants like Adrian Tropical, Pat'e Palo or the Billini Hotel rooftop. We document signature, rings, toast and first dance keeping the discreet editorial style that an urban wedding demands, without turning the event into a long shoot or breaking the family group's intimacy."
    ],
    sisterCities: ["boca-chica", "san-pedro-de-macoris", "la-romana"]
  },
  {
    city: "La Romana",
    slug: "la-romana",
    province: "La Romana",
    priority: 1,
    title: "Fotógrafo de bodas en La Romana | Babula Shots",
    description: "Fotógrafo de bodas en La Romana y Casa de Campo. Cobertura profesional para bodas destino, playa y eventos privados.",
    h1: "Fotógrafo de bodas en La Romana",
    intro: "La Romana es ideal para bodas destino, celebraciones privadas y eventos en espacios premium como Casa de Campo, Altos de Chavón y playas cercanas. Creamos imágenes elegantes, naturales y listas para galería, álbum e impresión.",
    localAngle: "Aquí las bodas suelen mezclar lujo, privacidad y paisajes cálidos. Diseñamos la cobertura para aprovechar traslados, golden hour y retratos de pareja sin cortar el ritmo del evento.",
    venues: ["Casa de Campo", "Altos de Chavón", "Minitas Beach", "Bayahíbe", "Dominicus"],
    nearby: ["Bayahíbe", "Punta Cana", "San Pedro de Macorís", "Santo Domingo", "Higüey"],
    images: [imageSet.couple, imageSet.puntaAlt, imageSet.sunset, imageSet.premium],
    supportingKeywords: ["boda Casa de Campo", "wedding photographer La Romana", "fotógrafo bodas Casa de Campo"],
    localContext: [
      "La Romana es sinónimo de Casa de Campo, el resort privado de 7.000 acres que define el estándar de las bodas de lujo en la República Dominicana. Trabajamos dentro de los principales escenarios del complejo: el anfiteatro de Altos de Chavón, la Iglesia San Stanislao tallada en piedra coralina, los gazebos sobre Playa Minitas, la Marina Casa de Campo con vista a los yates y las villas privadas con campo de golf diseñado por Pete Dye. Cada espacio tiene su propia política de fotografía y horario de uso, y conocerlos evita fricciones con los wedding planners internos.",
      "Altos de Chavón es probablemente la locación de retrato más fotogénica del país. Es una réplica de una aldea mediterránea del siglo XVI construida en piedra, con calles empedradas, una plaza central frente a la iglesia, miradores sobre el río Chavón y rincones con buganvilias. Recomendamos a las parejas reservar 45 minutos entre ceremonia y recepción para hacer retratos editoriales aquí: la luz cálida sobre la piedra coralina al atardecer produce una calidad cromática que ningún resort de playa puede replicar.",
      "Más allá de Casa de Campo, La Romana sirve como puerta de entrada a Bayahíbe y al Parque Nacional del Este. Muchas parejas hacen una boda principal en el resort y un day-after en Isla Saona o en Catalina Island, con catamarán privado desde la Marina. Cubrimos esos viajes con equipo resistente a la salinidad y planificamos el regreso para que las imágenes lleguen al hotel antes de la reunión de despedida con los invitados."
    ],
    enLocalContext: [
      "La Romana is synonymous with Casa de Campo, the 7,000-acre private resort that sets the luxury-wedding standard in the Dominican Republic. We work across the resort's main settings: the Altos de Chavón amphitheatre, the coral-stone San Stanislao Church, the gazebos above Playa Minitas, the Casa de Campo Marina with its yacht views, and the private villas along the Pete Dye golf course. Each space has its own photography policy and time slot, and knowing them prevents friction with the in-house planners.",
      "Altos de Chavón is arguably the most photogenic portrait location in the country. It is a 16th-century Mediterranean village replica built in stone, with cobbled streets, a central plaza facing the church, viewpoints over the Chavón River and bougainvillea-lined corners. We recommend couples reserve 45 minutes between ceremony and reception to shoot editorial portraits here: the warm sunset light hitting the coral stone produces a colour quality no beach resort can replicate.",
      "Beyond Casa de Campo, La Romana is the gateway to Bayahíbe and Parque Nacional del Este. Many couples have their main wedding at the resort and a day-after on Saona Island or Catalina Island, with a private catamaran from the marina. We cover those trips with salt-resistant gear and plan the return so the proofs reach the hotel before the farewell gathering with guests."
    ],
    sisterCities: ["bayahibe", "punta-cana", "santo-domingo"]
  },
  {
    city: "Samaná",
    slug: "samana",
    province: "Samaná",
    priority: 1,
    title: "Fotógrafo de bodas en Samaná | Babula Shots",
    description: "Fotógrafo de bodas en Samaná para bodas de playa, celebraciones íntimas y bodas destino con estética natural.",
    h1: "Fotógrafo de bodas en Samaná",
    intro: "Samaná combina playas, montañas, villas y rincones naturales con una energía íntima perfecta para bodas destino. Documentamos cada celebración con fotografía emocional, editorial y preparada para galerías premium.",
    localAngle: "Las bodas en Samaná suelen necesitar planificación de luz y traslado entre playa, villa y recepción. Cubrimos el día completo con una dirección suave para que todo se sienta natural.",
    venues: ["Las Galeras", "Cayo Levantado", "Playa Rincón", "Santa Bárbara de Samaná", "Villas privadas"],
    nearby: ["Las Terrenas", "Puerto Plata", "Santo Domingo", "Punta Cana"],
    images: [imageSet.sunset, imageSet.punta, imageSet.couple, imageSet.premium],
    supportingKeywords: ["boda en Samaná", "fotógrafo Las Terrenas", "wedding photographer Samaná"],
    localContext: [
      "La península de Samaná es geográficamente distinta al resto del país: una franja montañosa con coco, vegetación cerrada y bahías protegidas. Las bodas aquí se concentran en tres focos: Santa Bárbara de Samaná frente al puerto, Las Galeras al extremo este con Playa Rincón (considerada una de las cinco mejores playas del Caribe) y Cayo Levantado, la isla privada accesible solo por bote. Cada acceso implica un timing distinto: el ferry a Cayo Levantado opera con horarios fijos y los retratos al atardecer dependen de la última salida del día.",
      "Entre enero y marzo Samaná recibe la llegada de las ballenas jorobadas que vienen a aparearse en la Bahía de Samaná, y muchas parejas eligen esa temporada para casarse con la promesa de ver ballenas durante un brindis en barco. Si la boda cae en esos meses adaptamos la cobertura para incluir un trayecto en bote con teleobjetivo, sabiendo que el oleaje cambia las condiciones de luz y la velocidad de obturación necesaria.",
      "Las bodas en El Limón, en la zona montañosa de Samaná, son una opción aparte: ceremonia íntima cerca de la cascada de 40 metros, traslado en caballo o 4x4 y recepción en villa privada. Estas celebraciones piden cobertura ligera, ropa apropiada para sendero y plan alterno para lluvia tropical, que en esa zona puede aparecer en 20 minutos incluso fuera de temporada de huracanes."
    ],
    enLocalContext: [
      "The Samaná peninsula is geographically different from the rest of the country: a mountainous strip with coconut palms, dense vegetation and protected bays. Weddings here cluster in three areas: Santa Bárbara de Samaná facing the port, Las Galeras at the far east with Playa Rincón (rated one of the top five Caribbean beaches), and Cayo Levantado, a private island reachable only by boat. Each access point has its own timing constraints: the Cayo Levantado ferry runs on fixed schedules and sunset portraits depend on the day's last departure.",
      "Between January and March, Samaná hosts the arrival of humpback whales that mate in the Bay of Samaná, and many couples deliberately pick that season for a wedding with the chance of a whale sighting during a toast at sea. If the date falls in those months we adapt coverage to include a boat run with a telephoto lens, knowing the swell changes lighting conditions and the shutter speeds we need.",
      "Weddings in El Limón, in the mountainous part of Samaná, are a separate proposition: intimate ceremony near the 40-metre waterfall, transfer by horse or 4x4, and reception at a private villa. These celebrations call for light gear, hiking-appropriate clothing and a tropical-rain backup plan, since storms can roll in within 20 minutes in that area even outside hurricane season."
    ],
    sisterCities: ["las-terrenas", "puerto-plata", "cabarete"]
  },
  {
    city: "Puerto Plata",
    slug: "puerto-plata",
    province: "Puerto Plata",
    priority: 1,
    title: "Fotógrafo de bodas en Puerto Plata | Babula Shots",
    description: "Fotógrafo de bodas en Puerto Plata para bodas de playa, Cabarete, Sosúa y celebraciones en la costa norte.",
    h1: "Fotógrafo de bodas en Puerto Plata",
    intro: "Puerto Plata ofrece costa, montaña, hoteles y playas de la zona norte para bodas con carácter tropical y elegante. Babula Shots crea reportajes completos con una mirada documental y cinematográfica.",
    localAngle: "La costa norte cambia rápido de luz y clima. Preparamos cobertura flexible para retratos, ceremonia y recepción manteniendo consistencia visual durante todo el evento.",
    venues: ["Playa Dorada", "Sosúa", "Cabarete", "Costa Dorada", "Fortaleza San Felipe", "Villas privadas"],
    nearby: ["Cabarete", "Santiago", "Samaná", "Las Terrenas"],
    images: [imageSet.premium, imageSet.sunset, imageSet.puntaAlt, imageSet.hero],
    supportingKeywords: ["boda playa Puerto Plata", "fotógrafo Cabarete", "fotógrafo boda norte RD"],
    localContext: [
      "Puerto Plata se construye visualmente alrededor del Monte Isabel de Torres, los 793 metros de montaña con la estatua del Cristo Redentor y el teleférico que ofrece vistas de toda la costa del ámbar. Muchas parejas suben al mirador para una sesión de pareja con la bahía de Puerto Plata de fondo antes de bajar a la ceremonia en la playa. La Fortaleza San Felipe, construida en 1577 y considerada la fortaleza más antigua del Nuevo Mundo aún en pie, aporta un escenario histórico que ningún otro destino caribeño puede ofrecer al mismo precio.",
      "La oferta de venues en la costa norte se reparte entre Playa Dorada (Iberostar Costa Dorada, Senator Puerto Plata, Lifestyle Holidays), Costambar, Sosúa con sus calas pequeñas de aguas turquesas y Cabarete con la energía surfista del Encuentro y Kite Beach. Cada zona tiene un microclima diferente: Sosúa suele ofrecer agua más calmada por la geografía de la bahía, mientras que Cabarete tiene viento constante de noviembre a marzo, ideal para vestidos con movimiento pero exigente con el sonido y los velos largos.",
      "El Victorian District de Puerto Plata —el centro histórico con casas victorianas de madera pintada en tonos pastel— es una alternativa para sesiones urbanas que mezclan herencia colonial y caribeña. Pocas ciudades del país conservan esta arquitectura y la usamos como contraste cuando la pareja quiere una galería que no sea solo playa. El recorrido se completa con el Parque Central y la Catedral San Felipe Apóstol."
    ],
    enLocalContext: [
      "Puerto Plata is built visually around Mount Isabel de Torres, the 793-metre peak crowned by the Christ the Redeemer statue and reachable by the only cable car in the Caribbean, with views over the entire Amber Coast. Many couples ride up for a portrait session with Puerto Plata Bay below before heading down to a beach ceremony. Fortaleza San Felipe, built in 1577 and considered the oldest standing fortress in the New World, offers a historical setting no other Caribbean destination delivers at the same price point.",
      "North-coast venues split between Playa Dorada (Iberostar Costa Dorada, Senator Puerto Plata, Lifestyle Holidays), Costambar, Sosúa with its small turquoise coves, and Cabarete with the surf-driven energy of Encuentro and Kite Beach. Each zone has its own microclimate: Sosúa usually offers calmer water thanks to the bay geography, while Cabarete carries steady wind from November to March — ideal for dresses with movement but demanding for audio and long veils.",
      "Puerto Plata's Victorian District — the downtown of wooden Victorian houses painted in pastel tones — is an alternative for urban sessions mixing colonial and Caribbean heritage. Few cities in the country preserve this architecture and we use it as a contrast when couples want a gallery beyond pure beach work. The route is rounded out by the Parque Central and the San Felipe Apóstol Cathedral."
    ],
    sisterCities: ["cabarete", "samana", "santiago"]
  },
  {
    city: "Santiago RD",
    slug: "santiago",
    province: "Santiago",
    priority: 2,
    title: "Fotógrafo de bodas en Santiago RD | Babula Shots",
    description: "Fotógrafo de bodas en Santiago de los Caballeros para ceremonias elegantes, iglesias, salones y recepciones premium.",
    h1: "Fotógrafo de bodas en Santiago RD",
    intro: "Santiago de los Caballeros es una ciudad clave para bodas elegantes, ceremonias religiosas y celebraciones familiares. Nuestro enfoque combina retrato editorial, momentos espontáneos y una estética cuidada.",
    localAngle: "Las bodas en Santiago suelen tener mucha vida familiar, iglesias importantes y recepciones con ritmo. Cubrimos los momentos formales sin perder emoción ni naturalidad.",
    venues: ["Centro de Santiago", "Monumento a los Héroes", "Hoteles de Santiago", "Iglesias locales", "Salones de eventos"],
    nearby: ["Puerto Plata", "La Vega", "Jarabacoa", "Constanza"],
    images: [imageSet.hero, imageSet.santo, imageSet.premium, imageSet.couple],
    supportingKeywords: ["fotógrafo bodas Santiago de los Caballeros", "fotógrafo bodas Santiago RD", "boda en Santiago"],
    localContext: [
      "Santiago de los Caballeros es la segunda ciudad de la República Dominicana y el corazón del Cibao, una región interior con tradición ganadera, tabacalera y comercial que distingue a sus bodas de las celebraciones costeras. La Catedral Santiago Apóstol El Mayor en el Parque Duarte, con su estructura de tres naves y vitrales del siglo XIX, sigue siendo el principal punto de ceremonias religiosas de la ciudad. El Monumento a los Héroes de la Restauración de 67 metros, visible desde casi cualquier punto, es el escenario clásico para retratos formales después de la ceremonia.",
      "Las recepciones premium en Santiago se concentran en el Hodelpa Gran Almirante, el Centro Español, los salones del Camp David Ranch en la carretera turística, el Hotel Matum y los clubes privados como el Centro Recreativo Pueblo Nuevo. La cultura de boda santiaguera es marcadamente familiar: las hora de bocas y los discursos toman más tiempo que en una boda capitaleña, y la fiesta suele terminar más tarde. Adaptamos la cobertura para cubrir hasta el último merengue y el cierre con perico ripiao en vivo.",
      "El Centro León, museo y centro cultural en pleno Santiago, ofrece arquitectura contemporánea, jardines y exposiciones permanentes que funcionan como locación de retratos editoriales para parejas que buscan algo distinto a la iglesia y al salón tradicional. También documentamos sesiones pre-boda en las haciendas tabacaleras de Tamboril, donde se enrolla a mano el cigarro dominicano —una capa cultural difícil de encontrar en cualquier otra ciudad del país."
    ],
    enLocalContext: [
      "Santiago de los Caballeros is the country's second city and the heart of the Cibao, an inland region with a cattle, tobacco and commercial tradition that sets its weddings apart from coastal celebrations. The Santiago Apóstol El Mayor Cathedral on Parque Duarte, with its three-nave structure and 19th-century stained glass, is still the main religious-ceremony anchor. The 67-metre Monumento a los Héroes de la Restauración, visible from nearly any point in the city, is the classic backdrop for formal portraits after the ceremony.",
      "Premium receptions in Santiago concentrate at Hodelpa Gran Almirante, Centro Español, the ballrooms at Camp David Ranch on the scenic mountain road, Hotel Matum and private clubs like Centro Recreativo Pueblo Nuevo. Santiaguero wedding culture is markedly family-driven: cocktail hour and speeches run longer than in capital weddings, and the party tends to end later. We adjust coverage to capture the last merengue and the live perico ripiao closing set.",
      "Centro León, a museum and cultural centre in downtown Santiago, offers contemporary architecture, gardens and permanent exhibitions that work as editorial portrait locations for couples wanting something beyond the church-and-ballroom template. We also document pre-wedding sessions at the Tamboril tobacco haciendas, where Dominican cigars are hand-rolled — a cultural layer no other Dominican city offers."
    ],
    sisterCities: ["la-vega", "puerto-plata", "jarabacoa"]
  },
  {
    city: "Las Terrenas",
    slug: "las-terrenas",
    province: "Samaná",
    priority: 2,
    title: "Fotógrafo de bodas en Las Terrenas | Babula Shots",
    description: "Fotógrafo de bodas en Las Terrenas para bodas de playa, villas privadas y celebraciones destino en Samaná.",
    h1: "Fotógrafo de bodas en Las Terrenas",
    intro: "Las Terrenas es uno de los lugares más buscados para bodas íntimas frente al mar. Fotografíamos bodas destino, elopements, sesiones pre-boda y celebraciones en villas con un estilo elegante y real.",
    localAngle: "La zona permite historias visuales muy orgánicas: arena, vegetación, villas y atardeceres. Cuidamos los tiempos para lograr retratos naturales sin interrumpir la experiencia.",
    venues: ["Playa Bonita", "Playa Cosón", "Villas privadas", "Hoteles boutique", "Restaurantes frente al mar"],
    nearby: ["Samaná", "Puerto Plata", "Santo Domingo", "Punta Cana"],
    images: [imageSet.sunset, imageSet.punta, imageSet.puntaAlt, imageSet.couple],
    supportingKeywords: ["boda playa Las Terrenas", "wedding photographer Las Terrenas", "fotógrafo Samaná"],
    localContext: [
      "Las Terrenas es la cara más europea de la República Dominicana. La fuerte presencia de comunidad francesa, italiana y suiza ha definido el estilo del pueblo: bistros frente a la playa, panaderías francesas, arquitectura boutique y un ambiente de finca pesquera reconvertida en destino íntimo. Esa influencia se traduce en bodas pequeñas, normalmente entre 20 y 80 invitados, con énfasis en gastronomía, vino y ceremonia simbólica en lugar de protocolos religiosos tradicionales.",
      "Las dos playas principales —Playa Cosón al oeste con sus seis kilómetros de arena casi virgen, y Playa Bonita más cerca del pueblo con palmeras altas y oleaje suave— son los puntos preferidos para ceremonia y retratos. Cosón ofrece un horizonte limpio sin construcciones para retratos al atardecer, mientras que Bonita aporta la sombra natural de las palmeras durante el día. El acceso a ambas playas se hace por carreteras cortas pero estrechas, y conviene salir del pueblo antes de las 5 PM para no perder la última luz por tráfico.",
      "Las villas privadas son el motor del mercado de bodas en Las Terrenas: propiedades de tres a ocho habitaciones con piscina, chef privado y staff incluido, donde la pareja y los invitados conviven toda la semana. Esto cambia la lógica de cobertura: trabajamos en una boda de día completo pero también capturamos cenas previas, brindis de bienvenida y sesiones day-after a un costo combinado más eficiente que coordinando varios eventos sueltos."
    ],
    enLocalContext: [
      "Las Terrenas is the most European-feeling town in the Dominican Republic. A strong French, Italian and Swiss community has shaped its identity: beachfront bistros, French bakeries, boutique architecture and a former fishing-village atmosphere now turned into an intimate destination. That influence translates into smaller weddings, usually between 20 and 80 guests, with an emphasis on food, wine and symbolic ceremonies rather than traditional religious protocols.",
      "The two main beaches — Playa Cosón to the west with its six kilometres of nearly untouched sand, and Playa Bonita closer to town with tall palms and soft surf — are the preferred ceremony and portrait spots. Cosón offers a clean horizon with no buildings for sunset portraits, while Bonita provides natural palm shade during the day. Access to both beaches uses short but narrow roads, and it pays to leave town before 5 PM to avoid losing the last light to traffic.",
      "Private villas drive the Las Terrenas wedding market: three- to eight-bedroom properties with pool, private chef and staff included, where the couple and their guests live together for a week. That changes the coverage logic: we work a full wedding day but also capture welcome dinners, rehearsal toasts and a day-after session at a combined cost that's more efficient than coordinating separate events."
    ],
    sisterCities: ["samana", "puerto-plata", "cabarete"]
  },
  {
    city: "Bayahíbe",
    slug: "bayahibe",
    province: "La Altagracia",
    priority: 2,
    title: "Fotógrafo de bodas en Bayahíbe | Babula Shots",
    description: "Fotógrafo de bodas en Bayahíbe y Dominicus para bodas de playa, resorts y sesiones frente al mar.",
    h1: "Fotógrafo de bodas en Bayahíbe",
    intro: "Bayahíbe combina playa, resorts y una atmósfera tranquila para bodas destino con luz caribeña. Creamos fotografías naturales, románticas y listas para compartir, imprimir y conservar.",
    localAngle: "La cercanía con La Romana y Punta Cana hace que Bayahíbe sea ideal para bodas pequeñas y celebraciones de resort con traslados simples y escenarios variados.",
    venues: ["Dominicus", "Playa Bayahíbe", "Resorts frente al mar", "Isla Saona", "Villas privadas"],
    nearby: ["La Romana", "Punta Cana", "Higüey", "San Pedro de Macorís"],
    images: [imageSet.puntaAlt, imageSet.sunset, imageSet.couple, imageSet.resort],
    supportingKeywords: ["boda playa Bayahíbe", "fotógrafo Dominicus", "wedding photographer Bayahibe"],
    localContext: [
      "Bayahíbe es un antiguo pueblo de pescadores que conserva su carácter después de convertirse en puerta de entrada al Parque Nacional Cotubanamá. A diferencia de Punta Cana, aquí el ritmo es lento: las lanchas salen al amanecer hacia Isla Saona, los pescadores reparan redes en la playa y los resorts se concentran en el área de Dominicus, a un kilómetro del pueblo. Esa coexistencia da a las bodas en Bayahíbe una capa cultural ausente en otros destinos de resort, especialmente en sesiones a primera hora en el muelle del pueblo o frente a las barcas de colores.",
      "Los resorts principales —Iberostar Hacienda Dominicus, Be Live Canoa, Viva V Wyndham Dominicus Beach, Catalonia Royal Bayahíbe, Dreams Dominicus La Romana— se ubican sobre la misma playa de arena blanca con palmeras intactas. Las ceremonias se realizan en gazebos sobre la arena con vista a Isla Catalina al fondo, y la luz de la tarde en Bayahíbe tiene un tono más suave que en Bávaro porque la playa mira al sur-suroeste, no al este.",
      "El día después de la boda muchas parejas reservan un catamarán privado hasta Isla Saona, un trayecto de 45 minutos que pasa por la piscina natural —un banco de arena en medio del mar Caribe a un metro de profundidad— donde flotan estrellas de mar gigantes. Documentar este day-after requiere lentes anti-salinidad, gestión de batería para todo el día sin enchufes y un timing claro porque la marea cambia la altura del banco entre las 11 AM y las 2 PM."
    ],
    enLocalContext: [
      "Bayahíbe is a former fishing village that has kept its character even after becoming the gateway to Cotubanamá National Park. Unlike Punta Cana, the pace here is slow: boats leave for Saona Island at dawn, fishermen mend nets on the beach, and resorts cluster in the Dominicus area, a kilometre from the village. That coexistence gives Bayahíbe weddings a cultural layer absent at other resort destinations, especially during early-morning sessions on the village pier or in front of the brightly painted fishing boats.",
      "The main resorts — Iberostar Hacienda Dominicus, Be Live Canoa, Viva V Wyndham Dominicus Beach, Catalonia Royal Bayahíbe, Dreams Dominicus La Romana — sit along the same white-sand beach with intact palm trees. Ceremonies happen at gazebos on the sand with Catalina Island in the distance, and Bayahíbe's afternoon light has a softer tone than Bávaro because the beach faces south-southwest, not east.",
      "Many couples book a private catamaran to Saona Island the day after the wedding, a 45-minute trip past the natural pool — a sandbar in the middle of the Caribbean only one metre deep, where giant starfish float beneath you. Documenting this day-after demands salt-resistant lenses, all-day battery management without outlets, and tight timing because the tide changes the sandbar height between 11 AM and 2 PM."
    ],
    sisterCities: ["la-romana", "punta-cana", "higuey"]
  },
  {
    city: "Jarabacoa",
    slug: "jarabacoa",
    province: "La Vega",
    priority: 2,
    title: "Fotógrafo de bodas en Jarabacoa | Babula Shots",
    description: "Fotógrafo de bodas en Jarabacoa para bodas de montaña, fincas, villas y sesiones pre-boda naturales.",
    h1: "Fotógrafo de bodas en Jarabacoa",
    intro: "Jarabacoa es perfecta para bodas de montaña, fincas, villas y celebraciones íntimas con una estética natural. Babula Shots documenta cada evento con atención a paisaje, emoción y detalles.",
    localAngle: "Las bodas de montaña tienen una atmósfera distinta: clima fresco, vegetación y luz suave. Aprovechamos esos elementos para crear una galería con personalidad y calidez.",
    venues: ["Fincas privadas", "Villas de montaña", "Salto de Jimenoa", "Restaurantes campestres", "Espacios ecológicos"],
    nearby: ["La Vega", "Constanza", "Santiago", "Santo Domingo"],
    images: [imageSet.hero, imageSet.premium, imageSet.santo, imageSet.couple],
    supportingKeywords: ["boda montaña Jarabacoa", "sesión preboda Jarabacoa", "fotógrafo eventos Jarabacoa"],
    localContext: [
      "Jarabacoa está en pleno corazón de la Cordillera Central a 530 metros sobre el nivel del mar, rodeada por los picos más altos del Caribe —el Pico Duarte de 3.087 metros— y atravesada por los ríos Yaque del Norte, Jimenoa y Baiguate. Esta geografía da a las bodas locales un carácter completamente distinto al resto del país: temperaturas entre 16 y 26 grados, vegetación de pinos y café, neblina matutina y luz filtrada por nubes que actúa como un softbox natural durante casi todo el día.",
      "Los Saltos de Jimenoa Uno y Jimenoa Dos, junto con el Salto de Baiguate, son los escenarios más solicitados para sesiones pre-boda y day-after. El acceso a Jimenoa Uno requiere caminar por puentes colgantes sobre el río y la pareja debe planificar zapatos cómodos y ropa de cambio. Algunas bodas se hacen directamente en miradores con vista a los saltos, con ceremonia íntima de 20 a 40 invitados y recepción posterior en finca o villa de montaña.",
      "Los venues de boda en Jarabacoa son principalmente fincas privadas con vista al valle: Rancho Baiguate, Hacienda Los Anones, Villa Pajón cerca del Parque Nacional Valle Nuevo, y propiedades en Manabao para parejas que quieren máxima privacidad. La logística requiere atención al transporte de los invitados desde Santiago o Santo Domingo —dos a tres horas de carretera con curvas— y previsión para lluvias de tarde que en julio y agosto suelen aparecer entre las 3 y las 5 PM."
    ],
    enLocalContext: [
      "Jarabacoa sits in the heart of the Cordillera Central at 530 metres above sea level, surrounded by the highest peaks in the Caribbean — Pico Duarte at 3,087 metres — and crossed by the Yaque del Norte, Jimenoa and Baiguate rivers. This geography gives local weddings a completely different character from the rest of the country: temperatures between 16 and 26 degrees, pine and coffee vegetation, morning mist and cloud-filtered light that acts as a natural softbox for most of the day.",
      "The Saltos de Jimenoa Uno and Jimenoa Dos, alongside the Salto de Baiguate, are the most requested settings for pre-wedding and day-after sessions. Reaching Jimenoa Uno requires walking across suspension bridges over the river, and couples need comfortable shoes and a change of clothes. Some weddings happen directly at viewpoints over the falls, with an intimate 20-40 guest ceremony and a follow-up reception at a mountain farm or villa.",
      "Wedding venues in Jarabacoa are mostly private farms with valley views: Rancho Baiguate, Hacienda Los Anones, Villa Pajón near Valle Nuevo National Park, and properties in Manabao for couples who want maximum privacy. Logistics demand attention to guest transport from Santiago or Santo Domingo — two to three hours of winding mountain road — and a plan for afternoon rains that, in July and August, typically arrive between 3 and 5 PM."
    ],
    sisterCities: ["constanza", "la-vega", "santiago"]
  },
  {
    city: "Boca Chica",
    slug: "boca-chica",
    province: "Santo Domingo",
    priority: 2,
    title: "Fotógrafo de bodas en Boca Chica | Babula Shots",
    description: "Fotógrafo de bodas en Boca Chica para bodas de playa cerca de Santo Domingo, ceremonias íntimas y sesiones de pareja.",
    h1: "Fotógrafo de bodas en Boca Chica",
    intro: "Boca Chica es una opción cercana a Santo Domingo para bodas de playa, ceremonias íntimas y sesiones de pareja. Ofrecemos cobertura profesional con dirección natural y edición cuidada.",
    localAngle: "Al estar cerca de la capital, Boca Chica funciona muy bien para bodas cortas, celebraciones civiles y sesiones al mar sin una logística compleja.",
    venues: ["Playa Boca Chica", "Hoteles frente al mar", "Andrés", "Clubes privados", "Juan Dolio"],
    nearby: ["Santo Domingo", "San Pedro de Macorís", "Juan Dolio", "La Romana"],
    images: [imageSet.punta, imageSet.sunset, imageSet.santo, imageSet.puntaAlt],
    supportingKeywords: ["boda playa Boca Chica", "fotógrafo boda cerca Santo Domingo", "fotógrafo Juan Dolio"],
    localContext: [
      "Boca Chica está apenas a 30 kilómetros del centro de Santo Domingo, lo que la convierte en la playa más accesible para parejas capitaleñas que quieren una boda frente al mar sin la logística de Punta Cana. Su playa principal es una bahía protegida por un arrecife de coral natural, lo que produce aguas muy calmas, transparentes y poco profundas durante varios cientos de metros —ideal para retratos dentro del agua y para ceremonias con niños o adultos mayores que no tolerarían el oleaje de Bávaro.",
      "Los venues de Boca Chica se distribuyen entre los hoteles tradicionales como Don Juan Beach Resort, Be Live Hamaca y Oasis Hamaca, y los clubes privados del lado este como El Anclote y Boca Marina, un restaurante construido sobre pilotes con vista a la bahía que es uno de los escenarios más solicitados para hora de bocas y ceremonia simbólica. La cercanía con el Aeropuerto Internacional de Las Américas también hace que muchas parejas extranjeras eligan Boca Chica para una boda exprés de fin de semana.",
      "El estilo de boda en Boca Chica tiende a ser más corto y enfocado que en otros destinos: ceremonia civil al mediodía, almuerzo en restaurante frente al mar, sesión de retratos al atardecer y cierre con cena íntima. Esta estructura nos permite trabajar coberturas de 5 a 6 horas con entrega de galería más rápida, ideal para parejas que prefieren simplicidad sin renunciar a un reportaje profesional completo."
    ],
    enLocalContext: [
      "Boca Chica is only 30 kilometres from downtown Santo Domingo, making it the most accessible beach for capital-based couples wanting a seaside wedding without Punta Cana's logistics. Its main beach is a bay protected by a natural coral reef, producing very calm, clear and shallow water for several hundred metres — ideal for in-water portraits and for ceremonies with children or older guests who wouldn't handle Bávaro's surf.",
      "Boca Chica venues split between traditional hotels such as Don Juan Beach Resort, Be Live Hamaca and Oasis Hamaca, and the private clubs on the east side like El Anclote and Boca Marina, a restaurant built on stilts over the bay that's one of the most requested settings for cocktail hour and symbolic ceremonies. Proximity to Las Américas International Airport also makes Boca Chica a popular weekend-wedding choice for international couples.",
      "The wedding style in Boca Chica tends to be shorter and more focused than in other destinations: civil ceremony around noon, lunch at an oceanfront restaurant, a sunset portrait session and an intimate dinner to close. This structure lets us work 5- to 6-hour coverage packages with faster gallery delivery — ideal for couples who prefer simplicity without giving up a full professional report."
    ],
    sisterCities: ["santo-domingo", "san-pedro-de-macoris", "la-romana"]
  },
  {
    city: "Higüey",
    slug: "higuey",
    province: "La Altagracia",
    priority: 3,
    title: "Fotógrafo de bodas en Higüey | Babula Shots",
    description: "Fotógrafo de bodas en Higüey y La Altagracia para ceremonias religiosas, bodas civiles y eventos cerca de Punta Cana.",
    h1: "Fotógrafo de bodas en Higüey",
    intro: "Higüey es un punto importante para bodas religiosas, celebraciones familiares y eventos cerca de Punta Cana. Fotografíamos ceremonias, recepciones y sesiones con una estética natural y profesional.",
    localAngle: "Para parejas que celebran en La Altagracia, Higüey ofrece cercanía con Punta Cana y una identidad local fuerte para reportajes de boda con contexto dominicano.",
    venues: ["Basílica de Higüey", "Salones de eventos", "Punta Cana", "Bávaro", "Espacios privados"],
    nearby: ["Punta Cana", "Bayahíbe", "La Romana", "Santo Domingo"],
    images: [imageSet.resort, imageSet.punta, imageSet.couple, imageSet.hero],
    supportingKeywords: ["fotógrafo boda La Altagracia", "boda cerca Punta Cana", "fotógrafo Higüey"],
    localContext: [
      "Higüey es la capital de la provincia La Altagracia y el centro espiritual del país. La Basílica Catedral Nuestra Señora de la Altagracia, diseñada por los arquitectos franceses André Dunoyer de Segonzac y Pierre Dupré e inaugurada en 1971, es el santuario católico más importante de la República Dominicana y uno de los pocos templos modernos del Caribe declarados de relevancia internacional. Su arco de hormigón de 80 metros, los vitrales policromados de Roberto Mac Lean y la cripta con la imagen original de la Virgen convierten cada ceremonia en un reportaje arquitectónico además de religioso.",
      "Casarse en la Basílica de Higüey requiere coordinar con la diócesis con varios meses de anticipación: documentación canónica, cursillo prematrimonial y reserva de fecha. Muchas parejas dominicanas que viven en Punta Cana o Bávaro hacen la ceremonia religiosa en la Basílica y la recepción en sus resorts, lo que implica un trayecto de 45 minutos por carretera. Coordinamos la cobertura para llegar antes que los novios y captar la entrada bajo el arco principal sin perder ni un minuto del recorrido nupcial.",
      "Más allá de la Basílica, Higüey ofrece salones como el Hotel La Casona Dorada, el Centro de Eventos La Otra Banda y fincas privadas en las afueras hacia San Rafael del Yuma. La ciudad mantiene una vida cultural propia con el Parque Central, la Iglesia San Dionisio (más antigua, del siglo XVI) y la tradición del 21 de enero, día de la Virgen, que llena las calles de peregrinos —un contexto único para una sesión de pareja si la boda coincide con esas fechas."
    ],
    enLocalContext: [
      "Higüey is the capital of La Altagracia province and the country's spiritual centre. The Basílica Catedral Nuestra Señora de la Altagracia, designed by French architects André Dunoyer de Segonzac and Pierre Dupré and consecrated in 1971, is the most important Catholic shrine in the Dominican Republic and one of the few modern Caribbean churches with international recognition. Its 80-metre concrete arch, the Roberto Mac Lean stained-glass windows and the crypt holding the original image of the Virgin turn every ceremony into an architectural feature alongside the religious one.",
      "Marrying at the Higüey Basilica means coordinating with the diocese months in advance: canon-law paperwork, pre-marriage course and date reservation. Many Dominican couples living in Punta Cana or Bávaro hold the religious ceremony at the Basilica and the reception at their resort, which means a 45-minute road transfer. We plan coverage to arrive ahead of the bride and groom to capture the entry under the main arch without missing a single beat of the bridal procession.",
      "Beyond the Basilica, Higüey offers venues like Hotel La Casona Dorada, the Centro de Eventos La Otra Banda and private estates toward San Rafael del Yuma. The city keeps its own cultural life around the Parque Central, the San Dionisio Church (older, dating to the 16th century) and the Virgin's Day tradition on 21 January, when pilgrims fill the streets — a unique backdrop for a couple session if the wedding falls around those dates."
    ],
    sisterCities: ["punta-cana", "bayahibe", "la-romana"]
  },
  {
    city: "San Pedro de Macorís",
    slug: "san-pedro-de-macoris",
    province: "San Pedro de Macorís",
    priority: 3,
    title: "Fotógrafo de bodas en San Pedro de Macorís | Babula Shots",
    description: "Fotógrafo de bodas en San Pedro de Macorís, Juan Dolio y zonas cercanas para bodas elegantes y de playa.",
    h1: "Fotógrafo de bodas en San Pedro de Macorís",
    intro: "San Pedro de Macorís conecta Santo Domingo, Juan Dolio y La Romana, lo que lo convierte en un punto estratégico para bodas de playa y celebraciones familiares. Cubrimos el evento con una narrativa completa.",
    localAngle: "La zona permite bodas cerca del mar, iglesias y recepciones privadas. Organizamos la cobertura para aprovechar la luz y los traslados entre locaciones.",
    venues: ["Juan Dolio", "Guayacanes", "Hoteles de la zona", "Iglesias locales", "Salones privados"],
    nearby: ["Boca Chica", "Santo Domingo", "La Romana", "Bayahíbe"],
    images: [imageSet.puntaAlt, imageSet.santo, imageSet.sunset, imageSet.premium],
    supportingKeywords: ["fotógrafo boda Juan Dolio", "boda en San Pedro de Macorís", "fotógrafo Guayacanes"],
    localContext: [
      "San Pedro de Macorís es la ciudad del béisbol dominicano —cuna de Sammy Sosa, Robinson Canó, Pedro Guerrero y decenas de jugadores de Grandes Ligas— y su identidad cultural se siente en cada boda. La Catedral San Pedro Apóstol en el Parque Duarte, con su estructura neoclásica de finales del siglo XIX, sigue siendo el ancla religiosa de la ciudad y muchas familias macorisanas tradicionales eligen casarse allí antes de mover la celebración a la zona costera de Juan Dolio.",
      "Juan Dolio y Guayacanes, técnicamente fuera del municipio pero parte de la oferta de boda regional, concentran los resorts y villas de playa: Emotions by Hodelpa, Coral Costa Caribe, Casa Marina Dolio y propiedades privadas en los condominios de Costa del Sol. La playa de Juan Dolio tiene un arrecife paralelo a la orilla que rompe el oleaje, dando aguas tranquilas para retratos dentro del mar y ceremonias en gazebo sin problemas de viento.",
      "El malecón de San Pedro frente al río Higuamo, el edificio del antiguo Cuerpo de Bomberos, las casas victorianas de la calle Independencia y los muelles del puerto cañero —legado de la industria azucarera que dio prosperidad a la ciudad a inicios del siglo XX— ofrecen escenarios urbanos poco explotados para sesiones editoriales. Cuando una pareja quiere un reportaje distinto al tradicional de playa, esta capa industrial-victoriana añade carácter a la galería."
    ],
    enLocalContext: [
      "San Pedro de Macorís is the home of Dominican baseball — birthplace of Sammy Sosa, Robinson Canó, Pedro Guerrero and dozens of Major League players — and that cultural identity shows up in every wedding. The San Pedro Apóstol Cathedral on Parque Duarte, a late-19th-century neoclassical building, remains the city's religious anchor, and many traditional Macorisano families marry there before moving the celebration to the coastal Juan Dolio area.",
      "Juan Dolio and Guayacanes, technically outside the municipality but part of the regional wedding offer, host the beach resorts and villas: Emotions by Hodelpa, Coral Costa Caribe, Casa Marina Dolio and private properties in the Costa del Sol developments. Juan Dolio's beach has a reef running parallel to the shore that breaks the swell, producing calm water for in-sea portraits and gazebo ceremonies free of wind problems.",
      "San Pedro's malecón along the Higuamo River, the old fire-station building, the Victorian houses on Calle Independencia and the sugar-port docks — legacy of the early-20th-century sugar boom that built the city — offer under-used urban backdrops for editorial sessions. When a couple wants something other than a standard beach gallery, this industrial-Victorian layer adds character to the report."
    ],
    sisterCities: ["boca-chica", "la-romana", "santo-domingo"]
  },
  {
    city: "La Vega",
    slug: "la-vega",
    province: "La Vega",
    priority: 3,
    title: "Fotógrafo de bodas en La Vega | Babula Shots",
    description: "Fotógrafo de bodas en La Vega para ceremonias, recepciones, sesiones de pareja y eventos familiares.",
    h1: "Fotógrafo de bodas en La Vega",
    intro: "La Vega es ideal para bodas familiares, eventos urbanos y celebraciones cerca de Jarabacoa y Constanza. Creamos reportajes limpios, emocionales y pensados para conservar cada momento importante.",
    localAngle: "La ubicación central de La Vega permite combinar ciudad, montaña y fincas cercanas para una historia visual amplia sin perder cercanía con los invitados.",
    venues: ["Centro de La Vega", "Fincas privadas", "Iglesias locales", "Salones de eventos", "Jarabacoa"],
    nearby: ["Jarabacoa", "Constanza", "Santiago", "Santo Domingo"],
    images: [imageSet.hero, imageSet.premium, imageSet.santo, imageSet.couple],
    supportingKeywords: ["boda en La Vega", "fotógrafo eventos La Vega", "fotógrafo bodas Cibao"],
    localContext: [
      "La Vega es la capital del Carnaval Dominicano y la ciudad concentra una identidad cultural fuerte alrededor del Diablo Cojuelo, las máscaras de cuernos y los desfiles dominicales de febrero. Aunque esta tradición no influye directamente en las bodas, sí marca el tejido urbano: las calles cerca del Parque Central están llenas de talleres de máscaras, murales y arquitectura colonial que ofrecen un set urbano distinto al de Santiago para sesiones pre-boda.",
      "La Catedral de la Concepción de La Vega, una obra de hormigón brutalista terminada en 1992 que reemplazó la catedral anterior dañada por el terremoto de 1976, es uno de los templos católicos más controversiales y arquitectónicamente potentes del país. Su estructura piramidal con vitrales rojos genera un contraste fotográfico fuerte, muy diferente al estilo colonial de otras catedrales dominicanas. Las parejas que se casan allí obtienen un reportaje con valor arquitectónico real, no solo religioso.",
      "El Santo Cerro, a 7 kilómetros de la ciudad, ofrece una iglesia histórica del siglo XV (vinculada a Cristóbal Colón y la Virgen de las Mercedes) sobre una colina con vista al Valle del Cibao. Es el sitio preferido para ceremonias religiosas alternativas y sesiones pre-boda con horizonte abierto. La Vega también funciona como base para bodas en fincas de los cerros circundantes y como punto de partida natural hacia Jarabacoa y Constanza para celebraciones de montaña."
    ],
    enLocalContext: [
      "La Vega is the capital of the Dominican Carnival, and the city concentrates a strong cultural identity around the Diablo Cojuelo characters, horned masks and the Sunday parades in February. While that tradition doesn't directly drive weddings, it shapes the urban fabric: the streets near Parque Central are full of mask workshops, murals and colonial architecture that offer an urban set different from Santiago's for pre-wedding sessions.",
      "The Catedral de la Concepción de La Vega, a brutalist concrete cathedral completed in 1992 to replace the previous one damaged by the 1976 earthquake, is one of the most controversial and architecturally striking Catholic buildings in the country. Its pyramidal structure with red stained glass creates a strong photographic contrast, very different from the colonial style of other Dominican cathedrals. Couples marrying there get a report with real architectural value, not only religious.",
      "Santo Cerro, 7 kilometres from the city, offers a 15th-century historic church (linked to Christopher Columbus and the Virgen de las Mercedes) on a hilltop with views over the Cibao Valley. It's the preferred spot for alternative religious ceremonies and pre-wedding sessions with an open horizon. La Vega also works as a base for farm weddings in the surrounding hills and as a natural launch point to Jarabacoa and Constanza for mountain celebrations."
    ],
    sisterCities: ["jarabacoa", "santiago", "constanza"]
  },
  {
    city: "Barahona",
    slug: "barahona",
    province: "Barahona",
    priority: 3,
    title: "Fotógrafo de bodas en Barahona | Babula Shots",
    description: "Fotógrafo de bodas en Barahona para bodas de playa, sesiones de pareja y celebraciones íntimas en el sur.",
    h1: "Fotógrafo de bodas en Barahona",
    intro: "Barahona ofrece paisajes del sur, playas, montaña y una atmósfera distinta para bodas con carácter. Babula Shots documenta celebraciones íntimas y sesiones de pareja con estética natural.",
    localAngle: "Las bodas en Barahona se benefician de escenarios menos comunes y mucha personalidad visual. Planificamos luz, ruta y tiempos para una galería sólida y emocional.",
    venues: ["Playa San Rafael", "Paraíso", "Bahoruco", "Hoteles del sur", "Villas privadas"],
    nearby: ["Santo Domingo", "La Vega", "Constanza", "Jarabacoa"],
    images: [imageSet.sunset, imageSet.premium, imageSet.puntaAlt, imageSet.hero],
    supportingKeywords: ["boda playa Barahona", "sesión boda Barahona", "fotógrafo bodas sur RD"],
    localContext: [
      "Barahona es la entrada al sur profundo de la República Dominicana, una región menos turística donde la Sierra de Bahoruco cae directamente al mar Caribe formando playas de piedras semipreciosas en lugar de arena fina. Playa San Rafael, con su balneario natural de agua dulce que desemboca en el mar, y Playa Los Patos, conocida por el río más corto del mundo, son los escenarios de boda más fotogénicos: pebble beaches azul cobalto sin las construcciones de resort de la costa este.",
      "La Bahía de las Águilas dentro del Parque Nacional Jaragua, accesible solo por bote desde Cabo Rojo, ofrece ocho kilómetros de arena blanca virgen con flamencos rosados y aguas turquesas. Es uno de los lugares menos explotados del Caribe para bodas íntimas y elopements. La logística es exigente —cinco horas en carro desde Santo Domingo más una hora en lancha— pero el resultado fotográfico no tiene competencia en el país.",
      "El Lago Enriquillo, a 40 minutos de Barahona, es el lago salado más grande del Caribe y se encuentra a 40 metros bajo el nivel del mar, con cocodrilos americanos, iguanas rinoceronte e Isla Cabritos. Para parejas que buscan un reportaje verdaderamente único —no solo otra boda de playa— este ecosistema árido de cactus y palmas de cana ofrece un día de sesión con luz dura y paisajes lunares que ningún otro destino dominicano puede igualar."
    ],
    enLocalContext: [
      "Barahona is the gateway to the Dominican Republic's deep south, a less-touristed region where the Sierra de Bahoruco drops straight into the Caribbean Sea, forming pebble beaches with semi-precious stones instead of fine sand. Playa San Rafael, with its freshwater natural pool that flows into the sea, and Playa Los Patos, home to the world's shortest river, are the most photogenic wedding settings: cobalt-blue pebble beaches free of east-coast resort sprawl.",
      "Bahía de las Águilas inside Jaragua National Park, reachable only by boat from Cabo Rojo, offers eight kilometres of untouched white sand with pink flamingoes and turquoise water. It is one of the least exploited Caribbean spots for intimate weddings and elopements. The logistics are demanding — five hours by car from Santo Domingo plus an hour by boat — but the photographic result is unmatched in the country.",
      "Lago Enriquillo, 40 minutes from Barahona, is the largest saltwater lake in the Caribbean, sitting 40 metres below sea level, with American crocodiles, rhinoceros iguanas and Isla Cabritos. For couples after a truly unique report — not another beach wedding — this arid ecosystem of cactus and cana palms delivers a session day with hard light and lunar landscapes no other Dominican destination can equal."
    ],
    sisterCities: ["santo-domingo", "constanza", "jarabacoa"]
  },
  {
    city: "Constanza",
    slug: "constanza",
    province: "La Vega",
    priority: 3,
    title: "Fotógrafo de bodas en Constanza | Babula Shots",
    description: "Fotógrafo de bodas en Constanza para bodas de montaña, fincas, villas y sesiones pre-boda.",
    h1: "Fotógrafo de bodas en Constanza",
    intro: "Constanza tiene una estética de montaña única en República Dominicana, perfecta para bodas íntimas, sesiones pre-boda y celebraciones en fincas. Creamos imágenes cálidas, elegantes y naturales.",
    localAngle: "El clima fresco, los paisajes verdes y los espacios privados hacen que Constanza sea ideal para parejas que quieren algo diferente a la boda de playa.",
    venues: ["Valle Nuevo", "Fincas privadas", "Villas de montaña", "Jardines", "Espacios campestres"],
    nearby: ["Jarabacoa", "La Vega", "Santiago", "Santo Domingo"],
    images: [imageSet.hero, imageSet.couple, imageSet.premium, imageSet.santo],
    supportingKeywords: ["boda montaña Constanza", "fotógrafo preboda Constanza", "boda en finca Constanza"],
    localContext: [
      "Constanza se sitúa a 1.300 metros sobre el nivel del mar dentro de un valle de origen volcánico rodeado por los picos más altos del Caribe. Las temperaturas oscilan entre 10 y 22 grados durante todo el año y en diciembre y enero pueden caer hasta 5 grados de madrugada —la única zona del país donde ocasionalmente se ha registrado escarcha. Este clima permite vegetación que no existe en ningún otro punto de las Antillas: campos de fresas, plantaciones de manzanas, ajos, papas y flores en invernadero que abastecen al resto del país.",
      "El Parque Nacional Valle Nuevo, conocido como las Madres de las Aguas porque nacen aquí los principales ríos de la isla, ofrece pinares de Pinus occidentalis, sabanas de altura y el Monumento Las Pirámides en su centro geográfico. Las bodas en finca dentro o cerca del parque —Villa Pajón, Aguas Blancas, Rancho Don Antonio— se planifican con luz de mañana muy fría y atardeceres entre las 5:30 y las 6 PM porque el sol cae detrás de la cordillera antes que en la costa.",
      "La estética de Constanza es radicalmente distinta a la postal caribeña: troncos de pino, neblina, vestidos con capa, ramos de flores locales (girasoles, rosas, gladiolos, eucalipto) en lugar de tropicales, y un toque alpino que sorprende a invitados internacionales. Para parejas que ya conocen Punta Cana o La Romana y buscan una boda diferente, Constanza ofrece un reportaje fotográfico que parece de los Alpes o Colombia, no del Caribe."
    ],
    enLocalContext: [
      "Constanza sits at 1,300 metres above sea level inside a volcanic-origin valley ringed by the Caribbean's highest peaks. Temperatures range between 10 and 22 degrees year-round and can drop to 5 degrees at dawn in December and January — the only place in the country where ground frost has occasionally been recorded. This climate sustains vegetation found nowhere else in the Antilles: strawberry fields, apple orchards, garlic, potato and greenhouse-flower plantations that supply the rest of the country.",
      "Valle Nuevo National Park, known as the 'Mother of the Waters' because the island's main rivers are born here, offers Pinus occidentalis pine forests, high-altitude savannahs and the Las Pirámides monument at its geographical centre. Farm weddings inside or near the park — Villa Pajón, Aguas Blancas, Rancho Don Antonio — are planned around very cold morning light and earlier sunsets between 5:30 and 6 PM, because the sun drops behind the cordillera ahead of the coast.",
      "Constanza's aesthetic is radically different from the Caribbean postcard: pine trunks, mist, capes over dresses, bouquets of local flowers (sunflowers, roses, gladioli, eucalyptus) instead of tropicals, and an alpine touch that surprises international guests. For couples who already know Punta Cana or La Romana and want a different wedding, Constanza delivers a photographic report that looks like the Alps or Colombia, not the Caribbean."
    ],
    sisterCities: ["jarabacoa", "la-vega", "santiago"]
  },
  {
    city: "Cabarete",
    slug: "cabarete",
    province: "Puerto Plata",
    priority: 3,
    title: "Fotógrafo de bodas en Cabarete | Babula Shots",
    description: "Fotógrafo de bodas en Cabarete para bodas de playa, costa norte, elopements y celebraciones frente al mar.",
    h1: "Fotógrafo de bodas en Cabarete",
    intro: "Cabarete es una opción vibrante para bodas de playa, celebraciones relajadas y sesiones de pareja en la costa norte. Babula Shots crea reportajes con movimiento, luz natural y emoción real.",
    localAngle: "El viento, el mar y los atardeceres de Cabarete dan una energía visual muy particular. Adaptamos la sesión para que el entorno se vea vivo sin perder elegancia.",
    venues: ["Cabarete Beach", "Encuentro", "Kite Beach", "Hoteles boutique", "Villas privadas"],
    nearby: ["Puerto Plata", "Sosúa", "Santiago", "Las Terrenas"],
    images: [imageSet.sunset, imageSet.premium, imageSet.punta, imageSet.puntaAlt],
    supportingKeywords: ["boda playa Cabarete", "fotógrafo boda norte RD", "wedding photographer Cabarete"],
    localContext: [
      "Cabarete es la capital mundial del kitesurf y windsurf, reconocida por la PKRA y la PWA como sede de campeonatos internacionales. Los vientos alisios cruzan la bahía con consistencia entre noviembre y marzo, lo que define la cultura del pueblo: comunidad atlética internacional, escuelas de kite frente al mar, bares y restaurantes con los pies en la arena (Lax, Mojito, José O'Shay's, Bliss Restaurant) y una población expatriada de canadienses, alemanes, suizos y rusos. Las bodas aquí reflejan ese estilo: descalzas, informales, con cena familiar en mesa larga sobre la playa.",
      "Las tres playas principales tienen funciones distintas: Cabarete Beach al centro del pueblo concentra la actividad de windsurf de tarde y es la opción más práctica para ceremonia; Kite Beach al este es la zona del kitesurf con más viento y mejor para retratos con velos en movimiento; Playa Encuentro al oeste es la playa de los surfistas, con olas más fuertes y una atmósfera más virgen de palmeras, ideal para sesiones pre-boda y elopements al amanecer cuando los surfistas todavía no han llegado.",
      "Los venues de boda en Cabarete son boutique más que resort: Natura Cabana con sus 12 cabañas de hojas de palma frente al mar, Velero Beach Resort, Agualina Kite Resort, Millennium Resort & Spa y villas privadas en Pro Cab y Sosúa. La pareja típica de Cabarete es internacional, deportista y prefiere coberturas cortas pero intensas: 6 horas con énfasis en ceremonia descalza, cocktail con sunset sobre las cometas de kitesurf y party con DJ de música electrónica caribeña."
    ],
    enLocalContext: [
      "Cabarete is the kitesurf and windsurf capital of the world, recognised by the PKRA and PWA as host of international championships. Trade winds cross the bay consistently between November and March, shaping the town's culture: an international athletic community, kite schools on the seafront, feet-in-the-sand bars and restaurants (Lax, Mojito, José O'Shay's, Bliss Restaurant) and an expat population of Canadians, Germans, Swiss and Russians. Local weddings reflect that style: barefoot, informal, with a family dinner at long beach tables.",
      "The three main beaches play different roles: Cabarete Beach at the centre of town hosts the afternoon windsurf activity and is the most practical option for the ceremony; Kite Beach to the east is the kitesurf zone with stronger wind, ideal for portraits with veils in motion; Playa Encuentro to the west is the surfer beach, with bigger waves and a more untouched palm-lined feel, ideal for pre-wedding sessions and dawn elopements before the surfers arrive.",
      "Wedding venues in Cabarete are boutique rather than resort: Natura Cabana with its 12 palm-leaf cabins on the sea, Velero Beach Resort, Agualina Kite Resort, Millennium Resort & Spa and private villas in Pro Cab and Sosúa. The typical Cabarete couple is international, athletic and prefers short but intense coverage: 6 hours focused on a barefoot ceremony, a cocktail with sunset over the kite sails and a party with a Caribbean electronic DJ."
    ],
    sisterCities: ["puerto-plata", "samana", "las-terrenas"]
  }
];

export function cityPath(slug: string) {
  return `/fotografo-bodas-${slug}/`;
}

export function slugForCityName(name: string) {
  const normalized = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/Ñ/g, "N")
    .toLowerCase()
    .replace(/rd$/, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized === "samana" ? "samana" : normalized;
}

export function findCityBySlug(slug: string) {
  return weddingCities.find((city) => city.slug === slug);
}
