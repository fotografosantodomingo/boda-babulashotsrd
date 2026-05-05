export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { heading: string; body: string }[];
  links: { href: string; label: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "mejores-lugares-para-bodas-punta-cana",
    title: "Mejores lugares para bodas en Punta Cana | Babula Shots",
    description: "Guía de lugares para bodas en Punta Cana: playa, resorts, Cap Cana, Bávaro y espacios ideales para fotografía.",
    h1: "Mejores lugares para bodas en Punta Cana",
    intro: "Punta Cana es uno de los destinos más fuertes para bodas en el Caribe. La decisión del lugar define la luz, el ritmo de la cobertura y el estilo visual de la galería.",
    sections: [
      { heading: "Bodas frente al mar", body: "Las ceremonias de playa funcionan mejor cuando se planifican cerca de golden hour. La luz baja suaviza piel, vestidos y paisaje, y permite retratos más naturales después de la ceremonia." },
      { heading: "Resorts y clubes de playa", body: "Kukua Beach Club, Jellyfish Restaurant, Cap Cana y Bávaro Beach son referencias frecuentes para parejas que quieren una boda destino con logística más simple y escenarios fotográficos claros." },
      { heading: "Cómo elegir el lugar", body: "Antes de reservar, revisa acceso, plan B por lluvia, distancia entre preparación y ceremonia, restricciones de proveedores y espacios para retratos de pareja." }
    ],
    links: [
      { href: "/fotografo-bodas-punta-cana", label: "Fotógrafo de bodas en Punta Cana" },
      { href: "/fotografo-bodas-bayahibe", label: "Fotógrafo de bodas en Bayahíbe" },
      { href: "/fotografo-bodas-la-romana", label: "Fotógrafo de bodas en La Romana" }
    ]
  },
  {
    slug: "cuanto-cuesta-fotografo-bodas-republica-dominicana",
    title: "Cuánto cuesta un fotógrafo de bodas en República Dominicana",
    description: "Factores que influyen en el precio de un fotógrafo de bodas en República Dominicana: horas, locación, entrega y video.",
    h1: "Cuánto cuesta un fotógrafo de bodas en República Dominicana",
    intro: "El precio real depende de la duración, ciudad, traslado, cantidad de fotógrafos, video, álbum y nivel de entrega final.",
    sections: [
      { heading: "Qué cambia el precio", body: "Una ceremonia íntima de pocas horas no requiere la misma logística que una boda completa con preparación, first look, ceremonia, retratos, recepción y fiesta." },
      { heading: "Destino y traslado", body: "Punta Cana, La Romana, Samaná, Las Terrenas, Puerto Plata y zonas de montaña pueden requerir tiempos de traslado o alojamiento según horario y cobertura." },
      { heading: "Cómo pedir una cotización precisa", body: "Envía fecha, locación, cantidad de invitados, hora de ceremonia, si deseas video y si necesitas sesión pre-boda. Con eso se prepara una propuesta clara." }
    ],
    links: [
      { href: "/", label: "Fotógrafo de bodas en República Dominicana" },
      { href: "/fotografo-bodas-santo-domingo", label: "Fotógrafo de bodas en Santo Domingo" },
      { href: "/fotografo-bodas-punta-cana", label: "Fotógrafo de bodas en Punta Cana" }
    ]
  },
  {
    slug: "boda-destino-republica-dominicana",
    title: "Boda destino en República Dominicana | Guía fotográfica",
    description: "Guía para planificar una boda destino en República Dominicana con recomendaciones de fotografía, horarios y ciudades.",
    h1: "Boda destino en República Dominicana",
    intro: "República Dominicana permite bodas destino en playa, ciudad, montaña, villas privadas y resorts. La fotografía debe planificarse junto con la logística del evento.",
    sections: [
      { heading: "Elige la zona según tu experiencia", body: "Punta Cana y Bayahíbe son fuertes para playa y resort. Santo Domingo funciona para bodas urbanas y elegantes. Jarabacoa y Constanza son ideales para montaña." },
      { heading: "Horarios para mejores fotos", body: "La ceremonia cerca del atardecer suele producir retratos más suaves. Si la ceremonia es al mediodía, conviene reservar un momento posterior para retratos de pareja." },
      { heading: "Entrega y comunicación", body: "Para parejas que viven fuera del país, la galería online, contratos claros y comunicación por email o WhatsApp ayudan a que el proceso sea simple." }
    ],
    links: [
      { href: "/fotografo-bodas-punta-cana", label: "Bodas destino en Punta Cana" },
      { href: "/fotografo-bodas-samana", label: "Bodas destino en Samaná" },
      { href: "/fotografo-bodas-las-terrenas", label: "Bodas destino en Las Terrenas" }
    ]
  },
  {
    slug: "fotografo-bodas-playa-punta-cana",
    title: "Fotógrafo para bodas de playa en Punta Cana",
    description: "Fotografía para bodas de playa en Punta Cana: horarios, luz, retratos, ceremonia y consejos para parejas.",
    h1: "Fotógrafo para bodas de playa en Punta Cana",
    intro: "Una boda de playa en Punta Cana necesita planificación de luz, viento, arena, ceremonia y retratos para que todo se vea natural.",
    sections: [
      { heading: "La luz manda", body: "La hora de ceremonia define el resultado visual. Golden hour permite retratos más suaves, mientras que la luz fuerte requiere dirección y exposición más cuidadosa." },
      { heading: "Movimiento real", body: "La playa favorece fotos con movimiento: caminatas, abrazos, velo, viento y momentos espontáneos entre pareja e invitados." },
      { heading: "Plan B", body: "Siempre conviene revisar opciones por lluvia, sombra y espacios cubiertos dentro del resort o club de playa." }
    ],
    links: [
      { href: "/fotografo-bodas-punta-cana", label: "Fotógrafo de bodas Punta Cana" },
      { href: "/mejores-lugares-para-bodas-punta-cana", label: "Mejores lugares para bodas Punta Cana" },
      { href: "/fotografo-bodas-bayahibe", label: "Fotógrafo de bodas Bayahíbe" }
    ]
  },
  {
    slug: "mejores-lugares-para-fotos-boda-santo-domingo",
    title: "Mejores lugares para fotos de boda en Santo Domingo",
    description: "Lugares para fotos de boda en Santo Domingo: Zona Colonial, Jardín Botánico, hoteles, iglesias y espacios urbanos.",
    h1: "Mejores lugares para fotos de boda en Santo Domingo",
    intro: "Santo Domingo tiene una mezcla potente de arquitectura, ciudad, hoteles, iglesias y espacios verdes para fotos de boda.",
    sections: [
      { heading: "Zona Colonial", body: "La Zona Colonial ofrece textura, historia, calles, puertas y luz urbana. Funciona muy bien para retratos editoriales y sesiones de pareja." },
      { heading: "Jardín Botánico", body: "El Jardín Botánico permite un look más natural y verde, ideal para parejas que quieren calma visual dentro de la ciudad." },
      { heading: "Hoteles y salones", body: "Muchos hoteles ofrecen preparación, ceremonia y recepción en un solo lugar, lo que facilita cobertura completa sin traslados largos." }
    ],
    links: [
      { href: "/fotografo-bodas-santo-domingo", label: "Fotógrafo de bodas Santo Domingo" },
      { href: "/fotografo-bodas-boca-chica", label: "Fotógrafo de bodas Boca Chica" },
      { href: "/fotografo-bodas-san-pedro-de-macoris", label: "Fotógrafo de bodas San Pedro de Macorís" }
    ]
  },
  {
    slug: "boda-en-casa-de-campo-la-romana",
    title: "Boda en Casa de Campo La Romana | Fotografía",
    description: "Guía para bodas en Casa de Campo, La Romana: fotografía, horarios, retratos, Altos de Chavón y Minitas Beach.",
    h1: "Boda en Casa de Campo La Romana",
    intro: "Casa de Campo es uno de los espacios más fuertes para bodas premium en República Dominicana por privacidad, paisaje y variedad visual.",
    sections: [
      { heading: "Retratos con variedad", body: "Altos de Chavón, Minitas Beach y villas privadas permiten construir una galería con arquitectura, playa y momentos íntimos." },
      { heading: "Planificación del día", body: "Por la escala del lugar, es importante organizar traslados, horarios y retratos con anticipación para no perder luz." },
      { heading: "Estilo visual", body: "Las bodas en Casa de Campo suelen pedir una mezcla de lujo discreto, emoción real y edición editorial." }
    ],
    links: [
      { href: "/fotografo-bodas-la-romana", label: "Fotógrafo de bodas La Romana" },
      { href: "/fotografo-bodas-bayahibe", label: "Fotógrafo de bodas Bayahíbe" },
      { href: "/fotografo-bodas-punta-cana", label: "Fotógrafo de bodas Punta Cana" }
    ]
  },
  {
    slug: "boda-en-las-terrenas-samana",
    title: "Boda en Las Terrenas y Samaná | Guía fotográfica",
    description: "Guía para bodas en Las Terrenas y Samaná: playa, villas, horarios, retratos y fotografía de bodas destino.",
    h1: "Boda en Las Terrenas y Samaná",
    intro: "Las Terrenas y Samaná son destinos ideales para bodas íntimas, villas privadas y ceremonias frente al mar con una estética relajada.",
    sections: [
      { heading: "Playas y villas", body: "Playa Bonita, Playa Cosón, Las Galeras y villas privadas ofrecen escenarios naturales muy fuertes para una boda destino." },
      { heading: "Fotografía documental", body: "La zona se presta a una cobertura más orgánica: llegada de invitados, ceremonia, caminatas al atardecer y fiesta íntima." },
      { heading: "Logística", body: "Conviene confirmar tiempos de traslado y un plan de lluvia, especialmente si la ceremonia o recepción ocurre en exteriores." }
    ],
    links: [
      { href: "/fotografo-bodas-las-terrenas", label: "Fotógrafo de bodas Las Terrenas" },
      { href: "/fotografo-bodas-samana", label: "Fotógrafo de bodas Samaná" },
      { href: "/fotografo-bodas-puerto-plata", label: "Fotógrafo de bodas Puerto Plata" }
    ]
  },
  {
    slug: "fotografia-de-bodas-en-republica-dominicana-primer-baile-romantico",
    title: "Primer baile en bodas en República Dominicana | Babula Shots",
    description: "Guía para fotografiar el primer baile en bodas en República Dominicana: luz, timing, locaciones y consejos para parejas.",
    h1: "Primer baile en bodas en República Dominicana",
    intro: "El primer baile es uno de los momentos más emotivos de una boda en República Dominicana porque resume la conexión de la pareja, el ambiente de la celebración y la transición entre ceremonia, cena y fiesta. Para fotografiarlo bien no basta con apuntar la cámara: hay que entender la luz, el espacio, la música, la reacción de los invitados y el ritmo del evento.",
    sections: [
      { heading: "Por qué el primer baile merece planificación", body: "En bodas de playa en Punta Cana, villas privadas en La Romana, salones en Santo Domingo o celebraciones íntimas en Samaná, el primer baile puede ocurrir con condiciones de luz muy distintas. Si se hace al atardecer, la fotografía puede aprovechar una atmósfera suave y romántica. Si ocurre en interiores, se necesita controlar flash, luz ambiental y movimiento para mantener una estética natural. Babula Shots revisa el programa con la pareja y el planner para decidir dónde colocarse, qué fondo usar y cómo capturar tanto los retratos de la pareja como las emociones de familiares e invitados." },
      { heading: "Locaciones ideales para fotos del primer baile", body: "Punta Cana funciona muy bien para primeros bailes frente al mar, especialmente en beach clubs y resorts donde la pista se integra con la recepción. La Romana y Casa de Campo permiten una sensación más privada y editorial, con villas, terrazas y espacios elegantes. Santo Domingo ofrece salones, hoteles y restaurantes con una estética urbana y sofisticada. En cada caso, el objetivo es que el lugar acompañe la emoción sin distraer del momento principal." },
      { heading: "Consejos para parejas antes del baile", body: "No es necesario preparar una coreografía complicada. Los mejores resultados suelen venir de movimientos simples: caminar, girar lentamente, abrazarse y mantener contacto visual. También recomendamos hablar con el DJ o la banda para saber cuándo empieza la canción, mantener una pista limpia y avisar al fotógrafo si habrá humo, luces especiales, fuegos fríos o entrada sorpresa. Esos detalles cambian exposición, composición y posición." },
      { heading: "Cómo lo fotografiamos", body: "Durante el primer baile buscamos una mezcla de plano abierto, retratos cerrados, movimiento del vestido, manos, miradas y reacciones. Si la pareja se casa en playa, cuidamos el horizonte y la temperatura de color. Si la boda es en interior, equilibramos luz ambiente con flash para no perder la atmósfera. Después del baile, normalmente seguimos con brindis, cena o fiesta, así que el flujo debe ser rápido y natural." }
    ],
    links: [
      { href: "/", label: "Fotógrafo de bodas en República Dominicana" },
      { href: "/fotografo-bodas-punta-cana", label: "fotógrafo de bodas en Punta Cana" },
      { href: "/fotografo-bodas-santo-domingo", label: "fotografía de bodas en Santo Domingo" },
      { href: "/cuanto-cuesta-fotografo-bodas-republica-dominicana", label: "precios de fotografía de bodas" },
      { href: "/boda-destino-republica-dominicana", label: "boda destino en República Dominicana" }
    ]
  },
  {
    slug: "celebra-el-amor-en-el-caribe-desde-ceremonias-intimas-hasta-grandes-eventos",
    title: "Bodas en el Caribe en República Dominicana | Babula Shots",
    description: "Guía para bodas en el Caribe dominicano: Punta Cana, Samaná, La Romana, resorts, villas y fotografía profesional.",
    h1: "Bodas en el Caribe en República Dominicana",
    intro: "República Dominicana es uno de los destinos más buscados del Caribe para bodas por su mezcla de playas, resorts, villas privadas, clima cálido y conexiones internacionales. Una boda en el Caribe puede ser íntima y relajada o convertirse en una celebración completa con invitados, recepción, fiesta y varios días de experiencia.",
    sections: [
      { heading: "Qué tipo de boda funciona en el Caribe", body: "Las parejas suelen elegir entre ceremonias en playa, bodas en resorts, celebraciones privadas en villas o eventos premium en lugares como Casa de Campo, Cap Cana y Las Terrenas. La decisión cambia la fotografía: una ceremonia íntima pide discreción y cercanía, mientras que una boda grande necesita cobertura completa, coordinación con planners y atención a familia, decoración, fiesta y detalles." },
      { heading: "Mejores destinos para casarse", body: "Punta Cana es fuerte para resorts, beach clubs, Bávaro, Cap Cana, Macao y Uvero Alto. Samaná y Las Terrenas ofrecen una estética más natural, con playas menos urbanas, villas y paisajes verdes. La Romana combina lujo, privacidad y espacios como Casa de Campo y Altos de Chavón. Santo Domingo es ideal para parejas que quieren una boda elegante, urbana o religiosa con recepción en hotel o restaurante privado." },
      { heading: "Fotografía para bodas destino", body: "En una boda destino, la fotografía también documenta viaje, ambiente, familia y experiencia. No se trata solo de ceremonia y retratos. Capturamos preparación, llegada de invitados, detalles del lugar, emoción real y fiesta para que la galería cuente el contexto completo de casarse en República Dominicana." },
      { heading: "Planificación práctica", body: "Antes de reservar, conviene revisar permisos del venue, horarios de ceremonia, plan de lluvia, distancia entre habitaciones y recepción, reglas para proveedores externos y tiempo para retratos. Estas decisiones afectan directamente el resultado visual. Una buena línea de tiempo permite disfrutar el evento sin sacrificar fotos importantes." }
    ],
    links: [
      { href: "/", label: "fotógrafo de bodas República Dominicana" },
      { href: "/fotografo-bodas-punta-cana", label: "bodas en Punta Cana" },
      { href: "/fotografo-bodas-samana", label: "fotógrafo de bodas en Samaná" },
      { href: "/fotografo-bodas-la-romana", label: "fotógrafo de bodas en La Romana" },
      { href: "/mejores-lugares-para-bodas-punta-cana", label: "mejores lugares para bodas en Punta Cana" }
    ]
  },
  {
    slug: "buscas-un-lugar-unico-para-tu-preboda",
    title: "Lugares para sesión preboda en República Dominicana",
    description: "Ideas de lugares para sesión preboda en República Dominicana: Punta Cana, Zona Colonial, Jarabacoa, Las Terrenas y más.",
    h1: "Lugares para sesión preboda en República Dominicana",
    intro: "Una sesión preboda ayuda a la pareja a sentirse cómoda frente a la cámara antes del día de la boda y también crea imágenes útiles para invitaciones, save the date, web de boda o recuerdos personales. República Dominicana ofrece escenarios muy distintos: playa, ciudad histórica, montaña, jardines, villas y resorts.",
    sections: [
      { heading: "Punta Cana y playas del Este", body: "Punta Cana, Bávaro, Cap Cana y Macao son opciones fuertes para parejas que quieren una sesión luminosa, romántica y tropical. La playa funciona mejor temprano en la mañana o cerca del atardecer, cuando la luz es suave y el calor baja. También se pueden combinar zonas de arena, muelles, vegetación y espacios del resort para lograr variedad." },
      { heading: "Santo Domingo y Zona Colonial", body: "La Zona Colonial ofrece fachadas, calles, puertas antiguas, patios y una energía urbana elegante. Es ideal para parejas que quieren una sesión editorial sin salir de la ciudad. Naco, Piantini, hoteles y restaurantes privados también pueden funcionar cuando la pareja busca una estética más moderna o sofisticada." },
      { heading: "Jarabacoa, Constanza y montaña", body: "Las sesiones preboda en montaña tienen una sensación distinta: clima fresco, vegetación, fincas, villas y paisajes abiertos. Jarabacoa y Constanza son ideales para parejas que no quieren playa y prefieren una historia visual más íntima, natural y tranquila." },
      { heading: "Cómo elegir el lugar correcto", body: "El mejor lugar depende de la personalidad de la pareja, ropa, horario, traslado y estilo visual. Antes de la sesión recomendamos definir si quieren algo romántico, elegante, documental, editorial o relajado. Con esa dirección se puede elegir una ruta simple y evitar perder tiempo cambiando demasiadas veces de locación." }
    ],
    links: [
      { href: "/", label: "fotógrafo de bodas en República Dominicana" },
      { href: "/fotografo-bodas-punta-cana", label: "sesión preboda en Punta Cana" },
      { href: "/fotografo-bodas-santo-domingo", label: "fotos de boda en Santo Domingo" },
      { href: "/fotografo-bodas-jarabacoa", label: "fotógrafo de bodas en Jarabacoa" },
      { href: "/boda-destino-republica-dominicana", label: "boda destino en República Dominicana" }
    ]
  },
  {
    slug: "los-extranjeros-pueden-contraer-matrimonio-civil-en-la-republica-dominicana",
    title: "Requisitos para casarse en República Dominicana",
    description: "Información para extranjeros que desean casarse en República Dominicana y planificar una boda destino con fotografía profesional.",
    h1: "Requisitos para casarse en República Dominicana",
    intro: "Los extranjeros pueden contraer matrimonio civil en República Dominicana si cumplen los requisitos legales correspondientes. Por eso el país es una opción muy atractiva para bodas destino: permite combinar una ceremonia válida, viaje familiar, celebración en playa o ciudad y una experiencia visual muy caribeña.",
    sections: [
      { heading: "Documentos habituales", body: "Los documentos pueden variar según nacionalidad y situación civil, pero normalmente se solicita pasaporte válido, acta de nacimiento, declaración o certificado de soltería, documentos de divorcio si aplica y traducciones o legalizaciones cuando corresponda. Siempre recomendamos confirmar requisitos actualizados con la Junta Central Electoral o con el oficial civil responsable de la ceremonia." },
      { heading: "Dónde casarse en República Dominicana", body: "Punta Cana es una de las zonas más elegidas por parejas extranjeras por resorts, playa y facilidad logística. Santo Domingo funciona bien para ceremonias civiles, bodas religiosas y recepciones urbanas. La Romana, Casa de Campo, Samaná y Las Terrenas son ideales para celebraciones privadas, villas y bodas destino con una estética más exclusiva o natural." },
      { heading: "Cómo coordinar fotografía y ceremonia civil", body: "La ceremonia civil suele tener momentos breves pero importantes: entrada, lectura, firmas, intercambio de anillos, beso, retratos familiares y celebración. Coordinamos el horario con la pareja para aprovechar buena luz antes o después del acto legal, especialmente si la boda ocurre frente al mar o en exteriores." },
      { heading: "Consejos para parejas extranjeras", body: "Es importante preparar documentos con tiempo, confirmar traducciones, revisar permisos del venue y definir una línea de tiempo realista. Para fotografía, recomendamos reservar espacio para retratos de pareja, familia y detalles del entorno. Así la galería refleja tanto el valor legal del momento como la emoción de una boda destino en República Dominicana." }
    ],
    links: [
      { href: "/", label: "fotógrafo de bodas República Dominicana" },
      { href: "/fotografo-bodas-punta-cana", label: "wedding photographer Punta Cana" },
      { href: "/fotografo-bodas-santo-domingo", label: "fotografía de bodas en Santo Domingo" },
      { href: "/boda-destino-republica-dominicana", label: "boda destino en República Dominicana" },
      { href: "/cuanto-cuesta-fotografo-bodas-republica-dominicana", label: "cuánto cuesta un fotógrafo de bodas" }
    ]
  }
];

export function findBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
