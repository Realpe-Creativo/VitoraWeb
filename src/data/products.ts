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
        link: '/product/1'
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
        link: '/product/1'
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
        price: 49000,
        currency: 'COP',
        images: {
            main: '/img/products/citrato_1.png',
            hover: '/img/products/citrato_2.png',
            gallery: [
                '/img/products/citrato_1.png',
                '/img/products/citrato_2.png'
            ],
            miniBanner: "/img/products/banner_citrato.png",
            url_img: "https://res.cloudinary.com/dkqjmeqaa/image/upload/v1761251385/citrato_magnesio_o8tomv.jpg"
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
            'https://youtube.com/shorts/-Bj17T_mu0M?si=TXo4Txxn0k6OngO2',
            'https://youtube.com/shorts/-Bj17T_mu0M?si=TXo4Txxn0k6OngO2',
            'https://youtube.com/shorts/-Bj17T_mu0M?si=TXo4Txxn0k6OngO2',
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
            url_img: "https://res.cloudinary.com/dkqjmeqaa/image/upload/v1761251385/ashwagandha_h8x9ea.jpg"
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
            url_img: "https://res.cloudinary.com/dkqjmeqaa/image/upload/v1761251385/colageno_ftk6ck.jpg"
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
            url_img: "https://res.cloudinary.com/dkqjmeqaa/image/upload/v1761251385/creatina_monohidratada_ftmogo.jpg"
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
];

export const branches: Branch[] = [
    {
        id: '1',
        name: 'La Calera',
        city: 'Bogotá',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
    {
        id: '2',
        name: 'Centro Comercial',
        city: 'Bogotá',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
    {
        id: '3',
        name: 'Ciudad Jardín',
        city: 'Cali',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
    {
        id: '4',
        name: 'Chipichape',
        city: 'Cali',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
    {
        id: '5',
        name: 'Unicentro',
        city: 'Cali',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
    {
        id: '6',
        name: 'Provenza',
        city: 'Medellin',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
    {
        id: '7',
        name: 'Parque Lleras',
        city: 'Medellin',
        address: 'Carrera 123 # 2-23',
        phone: '+57 3211234567',
        hours: 'Lunes a viernes: 9AM-8PM, Sábados: 10AM-6PM'
    },
];