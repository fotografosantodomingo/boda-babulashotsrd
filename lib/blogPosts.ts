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
      { href: "/fotografo-bodas-republica-dominicana", label: "Fotógrafo de bodas en República Dominicana" },
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
  }
];

export function findBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
