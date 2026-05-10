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
    supportingKeywords: ["wedding photographer Punta Cana", "boda en Punta Cana", "fotógrafo playa Punta Cana"]
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
    supportingKeywords: ["fotógrafo boda Zona Colonial", "fotógrafo boda civil Santo Domingo", "fotógrafo bodas Santo Domingo"]
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
    supportingKeywords: ["boda Casa de Campo", "wedding photographer La Romana", "fotógrafo bodas Casa de Campo"]
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
    supportingKeywords: ["boda en Samaná", "fotógrafo Las Terrenas", "wedding photographer Samaná"]
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
    supportingKeywords: ["boda playa Puerto Plata", "fotógrafo Cabarete", "fotógrafo boda norte RD"]
  },
  {
    city: "Santiago RD",
    slug: "santiago",
    province: "Santiago",
    priority: 2,
    title: "Fotógrafo de bodas en Santiago RD | Babula Shots",
    description: "Fotógrafo de bodas en Santiago de los Caballeros para ceremonias elegantes, iglesias, salones y recepciones premium.",
    h1: "Fotógrafo de bodas en Santiago RD",
    intro: "Santiago de los Caballeros es una ciudad clave para bodas elegantes, ceremonias religiosas y celebraciones familiares. Nuestro enfoque combina retrato editorial, momentos espontáneos y una entrega cuidada.",
    localAngle: "Las bodas en Santiago suelen tener mucha vida familiar, iglesias importantes y recepciones con ritmo. Cubrimos los momentos formales sin perder emoción ni naturalidad.",
    venues: ["Centro de Santiago", "Monumento a los Héroes", "Hoteles de Santiago", "Iglesias locales", "Salones de eventos"],
    nearby: ["Puerto Plata", "La Vega", "Jarabacoa", "Constanza"],
    images: [imageSet.hero, imageSet.santo, imageSet.premium, imageSet.couple],
    supportingKeywords: ["fotógrafo bodas Santiago de los Caballeros", "fotógrafo bodas Santiago RD", "boda en Santiago"]
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
    supportingKeywords: ["boda playa Las Terrenas", "wedding photographer Las Terrenas", "fotógrafo Samaná"]
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
    supportingKeywords: ["boda playa Bayahíbe", "fotógrafo Dominicus", "wedding photographer Bayahibe"]
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
    supportingKeywords: ["boda montaña Jarabacoa", "sesión preboda Jarabacoa", "fotógrafo eventos Jarabacoa"]
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
    supportingKeywords: ["boda playa Boca Chica", "fotógrafo boda cerca Santo Domingo", "fotógrafo Juan Dolio"]
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
    supportingKeywords: ["fotógrafo boda La Altagracia", "boda cerca Punta Cana", "fotógrafo Higüey"]
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
    supportingKeywords: ["fotógrafo boda Juan Dolio", "boda en San Pedro de Macorís", "fotógrafo Guayacanes"]
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
    supportingKeywords: ["boda en La Vega", "fotógrafo eventos La Vega", "fotógrafo bodas Cibao"]
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
    supportingKeywords: ["boda playa Barahona", "sesión boda Barahona", "fotógrafo bodas sur RD"]
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
    supportingKeywords: ["boda montaña Constanza", "fotógrafo preboda Constanza", "boda en finca Constanza"]
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
    supportingKeywords: ["boda playa Cabarete", "fotógrafo boda norte RD", "wedding photographer Cabarete"]
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
