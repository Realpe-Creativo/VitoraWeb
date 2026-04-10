import {Product, Branch, HeroSlide} from '../types';

export const heroSlides: HeroSlide[] = [
  {
    id: '1',
    images: {
      desktop: '/img/header/hero_1.png',
      mobile: '/img/header/hero_movil_1.png',
      square: '/img/header/hero_movil_1.png'
    },
    title: '',
    subtitle: '',
    link: '#products'
  },
  {
    id: '2',
    images: {
      desktop: '/img/header/hero_2.png',
      mobile: '/img/header/hero_movil_2.png',
      square: '/img/header/hero_movil_2.png'
    },
    title: '',
    subtitle: '',
    link: '#products'
  },
  {
    id: '3',
    images: {
      desktop: '/img/header/hero_3.png',
      mobile: '/img/header/hero_movil_3.png'
    },
    title: '',
    subtitle: '',
    link: '#products'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Citrato de Magnesio Polvo x 250gr',
    short_name: 'Citrato de Magnesio',
    price: 49900,
    currency: 'COP',
    images: {
      main: '/img/products/citrato_1.png',
      hover: '/img/products/citrato_2.png',
      gallery: [
        '/img/products/citrato_1.png',
        '/img/products/citrato_2.png'
      ],
      miniBanner: "/img/products/banner_citrato.png",
      url_img: "https://res.cloudinary.com/dbwojwe12/image/upload/q_auto/f_auto/v1775664457/citrato_1.png_nx4oje.png"
    },
    variants: [
      {sku: 'WH-001-BK', name: 'Black', size: 'Standard'},
    ],
    category: 'Nutrición',
    description: 'Nuestro Citrato de Magnesio ofrece una forma altamente biodisponible de magnesio, ideal para apoyar la función muscular, la energía diaria, el sueño reparador y el equilibrio emocional. <br> Su textura fina y sin sabor lo convierte en un suplemento suave, versátil y fácil de integrar a tu rutina diaria, ya sea en mezclas calientes o frías.',
    benefits: [
      'Mejora la calidad del sueño y favorece una relajación profunda.',
      'Ayuda a disminuir el cansancio y la fatiga.',
      'Apoya la función muscular y nerviosa.',
      'Contribuye al equilibrio del estado de ánimo.',
      'Alta biodisponibilidad: el cuerpo lo absorbe con mayor eficiencia.',
      'Sin saborizantes, sin azúcar, sin colorantes.',
    ],
    faqs: [
      {
        question: '¿Para qué sirve el Citrato de Magnesio?',
        answer: 'Apoya el sueño, la relajación, la energía, la función muscular y el equilibrio emocional.'
      },
      {
        question: '¿Por qué elegir el Citrato de Magnesio?',
        answer: 'Porque es una de las formas de magnesio con mejor absorción y menor irritación gastrointestinal.'
      },
      {
        question: '¿Tiene sabor?',
        answer: 'No. Es completamente neutro.'
      },
      {
        question: '¿Lo puedo mezclar con bebidas calientes?',
        answer: 'Sí, funciona tanto en preparaciones calientes como frías.'
      },
      {
        question: '¿Sirve para calambres musculares?',
        answer: 'Sí. El magnesio es clave en la función muscular y ayuda a disminuir la tensión.'
      },
      {
        question: '¿Lo pueden tomar hombres y mujeres?',
        answer: 'Sí, es adecuado tanto para hombres como para mujeres, salvo indicación médica específica.'
      }
    ],
    icons: [
      {icon: '🔊', description: 'Premium Sound'},
      {icon: '🔋', description: 'Long Battery'},
      {icon: '📶', description: 'Wireless'},
      {icon: '🎧', description: 'Comfort Fit'},
      {icon: '🛡️', description: 'Durable'}
    ],
    extraSections: [
      {
        title: '¿Qué hace diferente a Vitora?',
        content: `
                  • Citrato de Magnesio de alta pureza y excelente absorción.<br/><br/>
                  • Fórmula limpia: sin aditivos innecesarios ni mezclas que reduzcan eficacia.<br/><br/>
                  • Calidad asegurada desde importación hasta empaque final.<br/><br/>
                  • Procesos bajo normativa colombiana para ingredientes alimentarios. <br/><br/>
                  • Transparencia total en origen, composición y calidad.
                  `,
      },
      {
        title: 'Ingredientes',
        content: `
                            Citrato de Magnesio (alta biodisponibilidad).<br/>
                            Sin sabor, sin azúcar, sin conservantes.
                            `,
      },
      {
        title: 'Recomendaciones de conservación',
        content: `
                           • Mantenerse en un lugar fresco, seco y alejado de la luz.<br/><br/>
                           • Cerrar bien el envase después de cada uso.<br/><br/>
                           • Evitar humedad para conservar su calidad.
                         `,
      },
      {
        title: 'Calidad y normativas',
        content: `
                           • Producto alineado con los lineamientos del Artículo 37, literal 3, de la Resolución 2674 de 2013.<br/><br/>
                           • Importado y empacado bajo procesos certificados para ingredientes alimentarios.<br/><br/>
                           • Elaborado especialmente para Vitora por empresas con estándares de calidad.
                         `,
      },
      {
        title: 'Origen',
        content: `
                           Origen de la materia prima: Asia.<br/>
                           Empacado en: Cali, Colombia.
                         `,
      },
      {
        title: 'Información legal',
        content: `
                                      Importado y empacado por:<br/>
                                      Industria Colombiana de Mezclas S.A.S<br/>
                                      Cll 8 No. 42-78 – Cali, Colombia<br/><br/>
                                      Elaborado especialmente para: Vitora.
                                    `,
      },
    ],
    alsoInterestedIds: ['2', '3', '4'],
    shorts: [
      'https://www.youtube.com/shorts/6poO3oBeyEk',
      'https://www.youtube.com/shorts/-Xny9GYwUwg',
      'https://youtube.com/shorts/jG_UTsVRx4g?si=Qw2yh2R9awAW1CpA',
      'https://www.youtube.com/shorts/9oecOkWbTaw',
      'https://www.youtube.com/shorts/5yCjapEJADY',
      'https://www.youtube.com/shorts/2CUF-snwTmg',
    ]
  },
  {
    id: '2',
    name: 'Ashwagandha Polvo x 250gr',
    short_name: 'Ashwagandha',
    price: 94500,
    currency: 'COP',
    images: {
      main: '/img/products/ashwagandha_2.png',
      hover: '/img/products/ashwagandha_1.png',
      gallery: [
        '/img/products/ashwagandha_2.png',
        '/img/products/ashwagandha_1.png'
      ],
      miniBanner: "/img/products/banner_ashwagandha.png",
      url_img: "https://res.cloudinary.com/dbwojwe12/image/upload/q_auto/f_auto/v1775664457/ashwagandha_1.png_fbaq4f.png"
    },
    variants: [
      {sku: 'SW-002-S', name: 'Small', size: '38mm'},
      {sku: 'SW-002-L', name: 'Large', size: '42mm'}
    ],
    category: 'Nutrición',
    description: 'La Ashwagandha Vitora es un producto 100% puro, importado directamente desde la India, país de origen ancestral de esta planta adaptógena. <br>Ayuda a regular el estrés, mejorar la calidad del sueño, equilibrar el estado de ánimo y apoyar la energía diaria sin causar somnolencia. <br><br> Es suave, natural y perfecta para integrar en bebidas calientes o frías. Ideal para quienes buscan bienestar emocional y físico de forma sencilla y constante.',
    benefitsGroups: [
      {
        title: 'Bienestar emocional y mental',
        items: [
          'Reduce el estrés y favorece una sensación de calma.',
          'Ayuda a regular el cortisol (hormona del estrés).',
          'Mejora enfoque, claridad mental y concentración.'
        ],
      },
      {
        title: 'Sueño y relajación',
        items: [
          'Favorece un sueño más profundo y reparador.',
          'Ayuda a calmar la mente en momentos de ansiedad.',
          'No es sedante: equilibra el sistema nervioso de forma natural.'
        ],
      },
      {
        title: 'Energía y rendimiento físico',
        items: [
          'Apoya niveles estables de energía durante el día.',
          'Favorece la recuperación muscular y el rendimiento en ejercicio',
          'Ayuda a disminuir la fatiga general.'
        ],
      },
      {
        title: 'Equilibrio hormonal (hombres y mujeres)',
        items: [
          'Contribuye al balance del sistema endocrino.',
          'Apoya la vitalidad, libido y estabilidad del estado de ánimo.'
        ],
      },
      {
        title: 'Salud celular y longevidad',
        items: [
          'Fuente natural de compuestos antioxidantes.',
          'Ayuda al cuerpo a adaptarse mejor al estrés físico y mental.',
          'Favorece procesos de bienestar a largo plazo.'
        ],
      },
    ],
    faqs: [
      {
        question: '¿Para qué sirve la Ashwagandha?',
        answer: 'Para manejar el estrés, mejorar el sueño, aumentar energía y apoyar el bienestar emocional.'
      },
      {
        question: '¿Es un sedante?',
        answer: 'No. Es un adaptógeno: ayuda al cuerpo a autorregularse.'
      },
      {
        question: '¿Tiene sabor?',
        answer: 'La ashwagandha pura tiene un sabor herbal natural.'
      },
      {
        question: '¿La pueden tomar hombres y mujeres?',
        answer: 'Sí, sus beneficios aplican para cualquier adulto.'
      },
      {
        question: '¿Sirve para dormir mejor?',
        answer: 'Sí, favorece la relajación y el descanso profundo.'
      },
      {
        question: '¿Ayuda al rendimiento físico?',
        answer: 'Sí, apoya energía, fuerza y recuperación muscular.'
      }
    ],
    icons: [
      {icon: '❤️', description: 'Heart Rate'},
      {icon: '📍', description: 'GPS Tracking'},
      {icon: '💧', description: 'Water Resistant'},
      {icon: '⚡', description: 'Fast Charge'},
      {icon: '📱', description: 'Smart Features'}
    ],
    extraSections: [
      {
        title: '¿Qué hace diferente a Vitora?',
        content: `
                  • Ashwagandha pura, sin mezclas ni aditivos.<br/><br/>
                  • Origen directo de India, respetando su calidad tradicional.<br/><br/>
                  • Producto importado y empacado bajo normativa colombiana.<br/><br/>
                  • Fórmula limpia, natural y transparente.<br/><br/>
                  • Perfecto para el bienestar emocional, mental y físico diario.
                  `,
      },
      {
        title: 'Ingredientes',
        content: `
                            Ashwagandha pura (Withania somnifera), de origen India.<br/>
                            Sin sabor, sin azúcar, sin aditivos.
                            `,
      },
      {
        title: 'Recomendaciones de conservación',
        content: `
                           • Mantenerse en un lugar fresco, seco y alejado de la luz.<br/><br/>
                           • Cerrar bien el envase después de cada uso.<br/><br/>
                           • Evitar humedad para conservar su calidad.
                         `,
      },
      {
        title: 'Calidad y normativas',
        content: `
                           • Producto alineado con los lineamientos del Artículo 37, literal 3, de la Resolución 2674 de 2013.<br/><br/>
                           • Importado y empacado bajo procesos certificados para ingredientes alimentarios.<br/><br/>
                           • Elaborado especialmente para Vitora por empresas con estándares de calidad.
                         `,
      },
      {
        title: 'Origen',
        content: `
                           Origen de la materia prima: India.<br/>
                           Empacado en: Cali, Colombia.
                         `,
      },
      {
        title: 'Información legal',
        content: `
                                      Importado y empacado por:<br/>
                                      Industria Colombiana de Mezclas S.A.S<br/>
                                      Cll 8 No. 42-78 – Cali, Colombia<br/><br/>
                                      Elaborado especialmente para: Vitora.
                                    `,
      },
    ],
    alsoInterestedIds: ['1', '3', '4']
  },
  {
    id: '3',
    name: 'Colágeno Hidrolizado Polvo x500gr',
    short_name: 'Colágeno Hidrolizado',
    price: 79900,
    currency: 'COP',
    images: {
      main: '/img/products/colageno_1.png',
      hover: '/img/products/colageno_2.png',
      gallery: [
        '/img/products/colageno_1.png',
        '/img/products/colageno_2.png'
      ],
      miniBanner: "/img/products/banner_colageno.png",
      url_img: "https://res.cloudinary.com/dbwojwe12/image/upload/q_auto/f_auto/v1775664457/colageno_1.png_dio4rg.png"
    },
    variants: [
      {sku: 'CAM-003-B', name: 'Body Only'},
      {sku: 'CAM-003-K', name: 'Kit with Lens', price: 1599}
    ],
    category: 'Photography',
    description: '<strong>¿Qué significa “Tipo I”?</strong> <br> El colágeno tipo I es el tipo de colágeno más abundante en el cuerpo humano. Es el responsable principal de la firmeza de la piel, la resistencia del cabello y uñas, y la salud de tendones y articulaciones. <br> Que sea Tipo I significa que es un colágeno de alta calidad, ideal para resultados visibles en piel y tejidos conectivos. <br><br> Nuestro colágeno hidrolizado es bovino, proveniente de cartílagos cuidadosamente seleccionados, lo cual garantiza una proteína más pura, estable y de mejor biodisponibilidad que los colágenos de menor calidad obtenidos de subproductos óseos o mezclas de fuentes. <br><br> Se absorbe fácilmente y apoya la salud de la piel, articulaciones, cabello y uñas. Una fórmula fina, ligera y sin sabor, ideal para mezclas calientes o frías, perfecta para integrar a tu rutina de bienestar.',
    benefits: [
      'Apoya la firmeza y elasticidad de la piel.',
      'Contribuye al cuidado de articulaciones, tendones y ligamentos.',
      'Mejora la resistencia del cabello y fortalece las uñas.',
      'Textura hidrolizada de fácil disolución: sin grumos y sin sabor.',
      'Ideal para mezclas calientes o frías.',
      'Bajo en calorías, sin azúcar y sin colorantes.'
    ],
    faqs: [
      {
        question: '¿Por qué el colágeno tipo I es mejor?',
        answer: 'Porque es el más compatible con la piel, articulaciones y tejidos conectivos. Su efecto es más visible en firmeza, elasticidad y confort articular.'
      },
      {
        question: '¿Qué diferencia a un colágeno derivado de cartílago?',
        answer: 'Los cartílagos aportan una proteína más pura, estable y con mayor biodisponibilidad, a diferencia de colágenos obtenidos de mezclas óseas o subproductos de menor calidad.'
      },
      {
        question: '¿Tiene sabor?',
        answer: 'No. Es completamente neutro.'
      },
      {
        question: '¿Lo puedo mezclar con bebidas calientes?',
        answer: 'Sí, funciona tanto en preparaciones calientes como frías.'
      },
      {
        question: '¿Se puede tomar a diario?',
        answer: 'Sí. El colágeno es seguro para consumo diario en adultos.'
      }
    ],
    icons: [
      {icon: '📷', description: 'High Resolution'},
      {icon: '🎥', description: '4K Video'},
      {icon: '🔄', description: 'Stabilization'},
      {icon: '🌧️', description: 'Weather Sealed'},
      {icon: '⚡', description: 'Fast Focus'}
    ],
    extraSections: [
      {
        title: '¿Qué hace diferente a Vitora?',
        content: `
                  • Colágeno tipo I de alta pureza, proveniente de cartílagos bovinos.<br/><br/>
                  • Mejor biodisponibilidad y absorción frente a colágenos de menor calidad.<br/><br/>
                  • Formulación limpia: sin aditivos, rellenos ni sabores artificiales.<br/><br/>
                  • Procesos de importación y empaque bajo normativas colombianas vigentes.<br/><br/>
                  • Transparencia total en origen, calidad y composición.
                  `,
      },
      {
        title: 'Ingredientes',
        content: `
                            Colágeno Hidrolizado Tipo I (bovino).<br/>
                            Sin sabor, sin azúcar, sin conservantes.
                            `,
      },
      {
        title: 'Recomendaciones de conservación',
        content: `
                           • Mantenerse en un lugar fresco, seco y alejado de la luz.<br/><br/>
                           • Cerrar bien el envase después de cada uso.<br/><br/>
                           • Evitar humedad para conservar su calidad.
                         `,
      },
      {
        title: 'Calidad y normativas',
        content: `
                           • Producto alineado con los lineamientos del Artículo 37, literal 3, de la Resolución 2674 de 2013.<br/><br/>
                           • Importado y empacado bajo procesos certificados para ingredientes alimentarios.<br/><br/>
                           • Elaborado especialmente para Vitora por empresas con estándares de calidad.
                         `,
      },
      {
        title: 'Origen',
        content: `
                           Origen de la materia prima: Brasil.<br/>
                           Empacado en: Cali, Colombia.
                         `,
      },
      {
        title: 'Información legal',
        content: `
                                      Importado y empacado por:<br/>
                                      Industria Colombiana de Mezclas S.A.S<br/>
                                      Cll 8 No. 42-78 – Cali, Colombia<br/><br/>
                                      Elaborado especialmente para: Vitora.
                                    `,
      },
    ],
    alsoInterestedIds: ['1', '2', '4']
  },
  {
    id: '4',
    name: 'Creatina Monohidratada Polvo x250gr',
    short_name: 'Creatina Monohidratada',
    price: 89900,
    currency: 'COP',
    images: {
      main: '/img/products/creatina_1.png',
      hover: '/img/products/creatina_2.png',
      gallery: [
        '/img/products/creatina_1.png',
        '/img/products/creatina_2.png'
      ],
      miniBanner: "/img/products/banner_creatina.png",
      url_img: "https://res.cloudinary.com/dbwojwe12/image/upload/q_auto/f_auto/v1775664457/creatina_1.png_nyjok4.png"
    },
    variants: [
      {sku: 'CH-004-BK', name: 'Black'},
      {sku: 'CH-004-GY', name: 'Gray'}
    ],
    category: 'Furniture',
    description: 'Nuestra Creatina Monohidratada es pura y de alta biodisponibilidad. <br> Apoya el rendimiento físico, la fuerza muscular, la energía y la recuperación diaria. Su textura fina, sin sabor y de fácil disolución la hace ideal para mezclas calientes o frías. <br><br> Además, investigaciones recientes han demostrado que la creatina también tiene efectos positivos en <strong>la función cognitiva, la longevidad celular y la preservación de masa muscular</strong>, que la convierte en uno de los suplementos más completos para el bienestar diario.',
    benefitsGroups: [
      {
        title: 'Beneficios físicos',
        items: [
          'Aumenta la fuerza y el rendimiento muscular.',
          'Acelera la recuperación, permitiendo entrenamientos más constantes.',
          'Mejora la resistencia y la capacidad de esfuerzo.',
          'Favorece la hidratación celular y el volumen muscular saludable.'
        ],
      },
      {
        title: 'Beneficios para la longevidad',
        items: [
          'Contribuye a mantener los niveles de energía celular (ATP), un factor clave en el envejecimiento saludable.',
          'Apoya la función mitocondrial, que disminuye naturalmente con la edad.',
          'Favorece la preservación de la masa muscular, una de las claves más importantes de la longevidad.',
          'Actúa como amortiguador energético: ayuda al cuerpo a responder mejor al estrés metabólico.'
        ],
      },
      {
        title: 'Beneficios cognitivos',
        items: [
          'Apoya funciones como la memoria de trabajo, el razonamiento y la concentración.',
          'Puede ayudar en contextos de fatiga mental o falta de sueño.',
          'Favorece la claridad mental al optimizar el uso de energía en el cerebro, un órgano que consume grandes cantidades de ATP.',
          'Estudios han mostrado mejoras especialmente en personas con alto nivel de estrés, veganos y adultos mayores.'
        ],
      },
      {
        title: 'Prevención de pérdida de masa muscular',
        items: [
          'Favorece la síntesis de energía muscular, ayudando a mantener masa magra incluso en etapas de menor actividad física.',
          'Es uno de los suplementos más estudiados para prevenir <strong>sarcopenia</strong> (pérdida de masa muscular relacionada con la edad).',
          'Ayuda a conservar fuerza funcional (independencia): caminar, levantarse, cargar peso.',
          'Mejora la capacidad para mantener rutinas de ejercicio a largo plazo, esenciales para la salud muscular.'
        ],
      },
    ],
    faqs: [
      {
        question: '¿La creatina ayuda al cerebro?',
        answer: 'Sí. La creatina participa en la producción energética del cerebro, apoyando memoria, enfoque y claridad mental.'
      },
      {
        question: '¿Sirve para longevidad?',
        answer: 'Contribuye a mantener masa muscular, energía celular y función mitocondrial, tres pilares clave del envejecimiento saludable.'
      },
      {
        question: '¿Ayuda a evitar la pérdida de masa muscular?',
        answer: 'Sí. Es uno de los suplementos más estudiados para prevenir sarcopenia, especialmente útil en adultos mayores y personas con baja actividad física.'
      },
      {
        question: '¿Tiene sabor?',
        answer: 'No. Es completamente neutra'
      },
      {
        question: '¿Se puede mezclar con bebidas calientes o frías?',
        answer: 'Sí, su estabilidad es excelente.'
      },
      {
        question: '¿La pueden tomar hombres y mujeres?',
        answer: 'Sí, es segura para cualquier adulto.'
      }
    ],
    icons: [
      {icon: '🪑', description: 'Ergonomic'},
      {icon: '🔄', description: 'Adjustable'},
      {icon: '💨', description: 'Breathable'},
      {icon: '🎯', description: 'Supportive'},
      {icon: '⭐', description: 'Premium'}
    ],
    extraSections: [
      {
        title: '¿Qué hace diferente a Vitora?',
        content: `
                  • Creatina Monohidratada pura para mejor absorción.<br/><br/>
                  • Fórmula limpia: sin rellenos ni aditivos.<br/><br/>
                  • Importada y empacada bajo normativa colombiana, garantizando seguridad y transparencia.<br/><br/>
                  • Producto apto para todo tipo de rutinas: fuerza, funcional, cardio, HIIT, pilates, cross training y más.<br/><br/>
                  • Enfoque integral: un suplemento útil para energía, mente y envejecimiento saludable.
                  `,
      },
      {
        title: 'Ingredientes',
        content: `
                            Creatina Monohidratada pura.<br/>
                            Sin sabor, sin azúcar, sin aditivos.
                            `,
      },
      {
        title: 'Recomendaciones de conservación',
        content: `
                           • Mantenerse en un lugar fresco, seco y alejado de la luz.<br/><br/>
                           • Cerrar bien el envase después de cada uso.<br/><br/>
                           • Evitar humedad para conservar su calidad.
                         `,
      },
      {
        title: 'Calidad y normativas',
        content: `
                           • Producto alineado con los lineamientos del Artículo 37, literal 3, de la Resolución 2674 de 2013.<br/><br/>
                           • Importado y empacado bajo procesos certificados para ingredientes alimentarios.<br/><br/>
                           • Elaborado especialmente para Vitora por empresas con estándares de calidad.
                         `,
      },
      {
        title: 'Origen',
        content: `
                           Origen de la materia prima: Asia.<br/>
                           Empacado en: Cali, Colombia.
                         `,
      },
      {
        title: 'Información legal',
        content: `
                                      Importado y empacado por:<br/>
                                      Industria Colombiana de Mezclas S.A.S<br/>
                                      Cll 8 No. 42-78 – Cali, Colombia<br/><br/>
                                      Elaborado especialmente para: Vitora.
                                    `,
      },
    ],
    alsoInterestedIds: ['1', '2', '3']
  },
  {
    id: '5',
    name: 'Psyllium en Polvo x250gr',
    short_name: 'Psyllium en Polvo',
    price: 52000,
    currency: 'COP',
    images: {
      main: '/img/products/psyllium_1.png',
      hover: '/img/products/psyllium_2.png',
      gallery: [
        '/img/products/psyllium_1.png',
        '/img/products/psyllium_2.png'
      ],
      miniBanner: "/img/products/banner_creatina.png",
      url_img: "https://res.cloudinary.com/dbwojwe12/image/upload/q_auto/f_auto/v1775664457/psyllium_1.png_nlduc3.png"
    },
    variants: [
      {sku: 'CH-004-BK', name: 'Black'},
      {sku: 'CH-004-GY', name: 'Gray'}
    ],
    category: 'Furniture',
    description: 'Nuestro Psyllium en polvo es una fuente natural de fibra soluble de alta pureza, ideal para apoyar la digestión, mejorar el tránsito intestinal y generar sensación de saciedad. <br><br> Al entrar en contacto con líquidos, forma un gel suave que favorece el movimiento intestinal de forma natural, sin irritar el sistema digestivo. <br><br> </strong>Su textura fina y sin sabor lo hace perfecto para mezclar en agua, jugos, batidos o preparaciones diarias</strong>.',
    benefitsGroups: [
      {
        title: 'Salud digestiva',
        items: [
          'Apoya el tránsito intestinal de forma natural.',
          'Favorece una digestión más regular y equilibrada.',
          'Ayuda a mantener un intestino limpio y funcional.'
        ],
      },
      {
        title: 'Control del apetito',
        items: [
          'Genera sensación de saciedad.',
          'Puede ayudar a reducir la ingesta excesiva de alimentos.'
        ],
      },
      {
        title: 'Bienestar general',
        items: [
          'Contribuye al equilibrio del sistema digestivo.',
          'Fuente natural de fibra soluble.'
        ],
      },
      {
        title: 'Características del producto',
        items: [
          'Alta capacidad de absorción.',
          'Fácil de mezclar: textura fina y sin sabor.',
          'Sin azúcar, sin colorantes, sin aditivos.'
        ],
      },
    ],
    faqs: [
      {
        question: '¿Para qué sirve el Psyllium?',
        answer: 'Apoya la digestión, mejora el tránsito intestinal y ayuda a generar sensación de saciedad.'
      },
      {
        question: '¿Cómo se consume?',
        answer: 'Se puede mezclar con agua, jugos o batidos. Siempre acompañado de suficiente líquido.'
      },
      {
        question: '¿Tiene sabor?',
        answer: 'No. Es completamente neutro.'
      },
      {
        question: '¿Se puede tomar todos los días?',
        answer: 'Sí, es una fuente natural de fibra apta para consumo diario en adultos.'
      },
      {
        question: '¿Ayuda al estreñimiento?',
        answer: 'Sí, favorece el movimiento intestinal de forma natural.'
      },
      {
        question: '¿Lo pueden tomar hombres y mujeres?',
        answer: 'Sí, es apto para cualquier adulto.'
      }
    ],
    icons: [
      {icon: '🪑', description: 'Ergonomic'},
      {icon: '🔄', description: 'Adjustable'},
      {icon: '💨', description: 'Breathable'},
      {icon: '🎯', description: 'Supportive'},
      {icon: '⭐', description: 'Premium'}
    ],
    extraSections: [
      {
        title: '¿Qué hace diferente a Vitora?',
        content: `
                  • Psyllium de alta pureza y excelente calidad.<br/><br/>
                  • Fórmula limpia: sin rellenos ni mezclas innecesarias.<br/><br/>
                  • Importado y empacado bajo normativa colombiana.<br/><br/>
                  • Transparencia total en origen, calidad y composición.<br/><br/>
                  • Ideal para integrar fácilmente en la rutina diaria.
                  `,
      },
      {
        title: 'Ingredientes',
        content: `
                            Psyllium en polvo (Plantago ovata).<br/>
                            Sin sabor, sin azúcar, sin aditivos.
                            `,
      },
      {
        title: 'Recomendaciones de conservación',
        content: `
                           • Mantenerse en un lugar fresco, seco y alejado de la luz.<br/><br/>
                           • Cerrar bien el envase después de cada uso.<br/><br/>
                           • Evitar humedad para conservar su calidad.
                         `,
      },
      {
        title: 'Calidad y normativas',
        content: `
                           • Producto alineado con los lineamientos del Artículo 37, literal 3, de la Resolución 2674 de 2013.<br/><br/>
                           • Importado y empacado bajo procesos certificados para ingredientes alimentarios.<br/><br/>
                           • Elaborado especialmente para Vitora por empresas con estándares de calidad.
                         `,
      },
      {
        title: 'Origen',
        content: `
                           Origen de la materia prima: Asia.<br/>
                           Empacado en: Cali, Colombia.
                         `,
      },
      {
        title: 'Información legal',
        content: `
                                      Importado y empacado por:<br/>
                                      Industria Colombiana de Mezclas S.A.S<br/>
                                      Cll 8 No. 42-78 – Cali, Colombia<br/><br/>
                                      Elaborado especialmente para: Vitora.
                                    `,
      },
    ],
    alsoInterestedIds: ['1', '2', '3']
  },
  {
    id: '6',
    name: 'Té Matcha en Polvo x250gr',
    short_name: 'Té Matcha Premium',
    price: 145000,
    currency: 'COP',
    images: {
      main: '/img/products/matcha_1.png',
      hover: '/img/products/matcha_2.png',
      gallery: [
        '/img/products/matcha_1.png',
        '/img/products/matcha_2.png'
      ],
      miniBanner: "/img/products/banner_creatina.png",
      url_img: "https://res.cloudinary.com/dbwojwe12/image/upload/q_auto/f_auto/v1775664457/matcha_1.png_ngv1yb.png"
    },
    variants: [
      {sku: 'CH-004-BK', name: 'Black'},
      {sku: 'CH-004-GY', name: 'Gray'}
    ],
    category: 'Furniture',
    description: 'Nuestra Creatina Monohidratada es pura y de alta biodisponibilidad. <br> Apoya el rendimiento físico, la fuerza muscular, la energía y la recuperación diaria. Su textura fina, sin sabor y de fácil disolución la hace ideal para mezclas calientes o frías. <br><br> Además, investigaciones recientes han demostrado que la creatina también tiene efectos positivos en <strong>la función cognitiva, la longevidad celular y la preservación de masa muscular</strong>, que la convierte en uno de los suplementos más completos para el bienestar diario.',
    benefitsGroups: [
      {
        title: 'Energía y enfoque',
        items: [
          'Aporta energía sostenida sin picos ni caídas bruscas.',
          'Favorece la concentración y claridad mental.',
          'Ideal para empezar el día o mantener productividad.'
        ],
      },
      {
        title: 'Bienestar general',
        items: [
          'Fuente natural de antioxidantes.',
          'Apoya el equilibrio del cuerpo de forma natural.',
          'Alternativa más estable al café.'
        ],
      },
      {
        title: 'Estilo de vida',
        items: [
          'Perfecto para rutinas saludables.',
          'Se integra fácilmente en bebidas y recetas.'
        ],
      },
      {
        title: 'Características del producto',
        items: [
          'Polvo fino de alta calidad.',
          'Fácil disolución.',
          'Sin azúcar, sin colorantes, sin aditivos.'
        ],
      },
    ],
    faqs: [
      {
        question: '¿Para qué sirve el Té Matcha?',
        answer: 'Aporta energía, mejora el enfoque y es una fuente natural de antioxidantes.'
      },
      {
        question: '¿En qué se diferencia del té verde tradicional?',
        answer: 'En el Matcha consumes la hoja completa, lo que concentra más sus propiedades naturales.'
      },
      {
        question: '¿Tiene cafeína?',
        answer: ' Sí, pero su efecto es más estable y progresivo que el café.'
      },
      {
        question: '¿Se puede tomar todos los días?',
        answer: ' Sí, es ideal para consumo diario en adultos.'
      },
      {
        question: '¿Tiene sabor fuerte?',
        answer: 'Tiene un sabor herbal suave, fácil de combinar en bebidas.'
      },
      {
        question: '¿Se puede preparar frío o caliente?',
        answer: 'Sí, funciona perfectamente en ambas opciones.'
      }
    ],
    icons: [
      {icon: '🪑', description: 'Ergonomic'},
      {icon: '🔄', description: 'Adjustable'},
      {icon: '💨', description: 'Breathable'},
      {icon: '🎯', description: 'Supportive'},
      {icon: '⭐', description: 'Premium'}
    ],
    extraSections: [
      {
        title: '¿Qué hace diferente a Vitora?',
        content: `
                  • Matcha de alta pureza y calidad seleccionada.<br/><br/>
                  • Hoja completa molida: mayor concentración natural.<br/><br/>
                  • Fórmula limpia: sin rellenos ni mezclas.<br/><br/>
                  • Importado y empacado bajo normativa colombiana.<br/><br/>
                  • Transparencia total en origen y composición.
                  `,
      },
      {
        title: 'Ingredientes',
        content: `
                            Té Matcha en polvo (Camellia sinensis).<br/>
                            Sin sabor, sin azúcar, sin aditivos.
                            `,
      },
      {
        title: 'Recomendaciones de conservación',
        content: `
                           • Mantenerse en un lugar fresco, seco y alejado de la luz.<br/><br/>
                           • Cerrar bien el envase después de cada uso.<br/><br/>
                           • Evitar humedad para conservar su calidad.
                         `,
      },
      {
        title: 'Calidad y normativas',
        content: `
                           • Producto alineado con los lineamientos del Artículo 37, literal 3, de la Resolución 2674 de 2013.<br/><br/>
                           • Importado y empacado bajo procesos certificados para ingredientes alimentarios.<br/><br/>
                           • Elaborado especialmente para Vitora por empresas con estándares de calidad.
                         `,
      },
      {
        title: 'Origen',
        content: `
                           Origen de la materia prima: Asia.<br/>
                           Empacado en: Cali, Colombia.
                         `,
      },
      {
        title: 'Información legal',
        content: `
                                      Importado y empacado por:<br/>
                                      Industria Colombiana de Mezclas S.A.S<br/>
                                      Cll 8 No. 42-78 – Cali, Colombia<br/><br/>
                                      Elaborado especialmente para: Vitora.
                                    `,
      },
    ],
    alsoInterestedIds: ['1', '2', '3']
  },
];

export const branches: Branch[] = [
  {
    id: '1',
    name: 'Centro Comercial Unicentro Local 108',
    city: 'Cali',
    address: 'Calle 13 # 89 - 240',
    phone: '+57 323 264 1777',
    hours: 'Lunes a domingo: 7AM-9PM'
  },
  {
    id: '2',
    name: 'Centro Comercial Unicentro Local 430',
    city: 'Cali',
    address: 'Carrera 100 # 5-169',
    phone: '+57 602 822 5030',
    hours: 'Lunes a domingo: 7AM-9PM'
  },
  {
    id: '3',
    name: 'Centro Comercial Cosmocentro Local 147',
    city: 'Cali',
    address: 'Calle 5 #50-103',
    phone: '+57 321 634 2399',
    hours: 'Lunes a domingo: 7AM-9PM'
  },
  {
    id: '4',
    name: 'Centro Comercial Cosmocentro Local 265',
    city: 'Cali',
    address: 'Calle 5 #50-103 ',
    phone: '+57 321 634 2393',
    hours: 'Lunes a domingo: 7AM-9PM'
  },
  {
    id: '5',
    name: 'Centro Comercial Cosmocentro Local 179-A',
    city: 'Cali',
    address: 'Calle 5 #50-103',
    phone: '+57 602 485 0468',
    hours: 'Lunes a domingo: 7AM-9PM'
  },
  {
    id: '6',
    name: 'Centro comercial Chipichape',
    city: 'Cali',
    address: 'Avenida 6A Norte #37AN-97 Local 8-248',
    phone: '+57 323 264 1777',
    hours: 'Lunes a domingo: 7AM-9PM'
  },
  {
    id: '7',
    name: 'Centro comercial Holguines Local 177',
    city: 'Cali',
    address: 'Cr 100 # 11 - 60',
    phone: '+57 602 348 2371',
    hours: 'Lunes a domingo: 7AM-9PM'
  },
  {
    id: '8',
    name: 'Centro comercial Centro Sur Local 133',
    city: 'Cali',
    address: 'Calle 9 #32A-16',
    phone: '+57 318 318 3030',
    hours: 'Lunes a domingo: 7AM-9PM'
  },
];