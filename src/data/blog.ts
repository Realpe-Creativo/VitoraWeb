export interface BlogItem {
    id: string;
    title: string;
    created_at: string;
    imageUrl: string;
    mainImage?: string;
    body: string;
    images?: string[];
    conclusion?: string;
}

export const blogData: BlogItem[] = [
    {
        id: "1",
        title: "¿Los pinos y eucaliptos erosionan el suelo y afectan los cuerpos de agua?",
        created_at: "2025-05-01",
        imageUrl: "/img/blog/prueba_blog.webp",
        mainImage: "/img/blog/prueba_blog.webp",
        body: `
    <h2>🌳 ¿Mito o realidad?</h2>
    <p>
      En Colombia —y en muchos países latinoamericanos— es común escuchar afirmaciones como:
      “Los pinos y los eucaliptos se comen el agua”, o
      “Esas especies secan los nacederos y dañan el suelo.”
    </p>
    <p>
      Estas ideas, aunque generalizadas, carecen de base técnica y científica cuando se habla de cultivos forestales bien manejados. En este artículo, desde Maderas Aragón, queremos desmitificar esa creencia y aportar información respaldada por experiencia y estudios de campo.
    </p>

    <h2>🔍 El origen del mito</h2>
    <p>
      Este mito nace de comparaciones inadecuadas entre bosques naturales y plantaciones forestales comerciales. Las primeras tienen biodiversidad, cobertura heterogénea y un equilibrio ecosistémico propio. Las segundas, al ser homogéneas, generan una percepción de “árboles extraños” o “invasivos”.
    </p>
    <p>
      Sin embargo, la clave no está en la especie, sino en la planificación del cultivo, el manejo técnico y el respeto por los suelos, zonas de recarga hídrica y cuerpos de agua.
    </p>

    <h2>🌱 ¿Qué pasa realmente con los eucaliptos y los pinos?</h2>
    <h3>Consumen agua, pero no más que otros cultivos agrícolas</h3>
    <p>
      Los estudios realizados en Colombia y países como Brasil o Chile demuestran que el consumo hídrico de un cultivo de eucalipto o pino no supera el de cultivos como maíz, caña o banano. Además, la evapotranspiración se controla con densidades adecuadas y manejo silvicultural.
    </p>

    <h3>No erosionan el suelo si hay cobertura vegetal</h3>
    <p>
      La erosión ocurre cuando el suelo queda expuesto. Un cultivo bien diseñado —con coberturas herbáceas o manejo de residuos de cosecha— protege el suelo y, en muchos casos, mejora su estructura gracias a la sombra, la hojarasca y el control de escorrentías.
    </p>

    <h3>Zonas de protección son clave</h3>
    <p>
      En Maderas Aragón, por ejemplo, respetamos franjas de aislamiento frente a quebradas, nacederos o zonas de conservación, asegurando que los cultivos forestales no interfieran en los flujos naturales de agua.
    </p>

    <h2>✅ ¿Qué hacemos diferente en Maderas Aragón?</h2>
    <ul>
      <li>Trabajamos con especies adaptadas a los Llanos Orientales, como el <strong>Eucalyptus pellita</strong> y el <strong>Pinus caribaea</strong>, que tienen buen comportamiento en suelos de sabana y requieren un manejo técnico cuidadoso.</li>
      <li>Aplicamos silvicultura responsable, con rotaciones que respetan la capacidad del suelo y minimizan la intervención mecánica.</li>
      <li>Apostamos por una reforestación comercial consciente, que convive con la ganadería y otras formas de uso rural sin comprometer la biodiversidad.</li>
    </ul>
  `,
        // images: [
        //     "/img/news/gallery/articulo1-1.jpg",
        //     "/img/news/gallery/articulo1-2.jpg"
        // ],
        conclusion: `Los pinos y eucaliptos no son el problema. El problema es la falta de conocimiento técnico o el mal manejo. Cuando se aplican buenas prácticas forestales, estas especies contribuyen a la restauración productiva del paisaje, protegen el suelo y ayudan a capturar carbono.

En Maderas Aragón lo tenemos claro: trabajamos con la tierra, no contra ella.`,

    },
    {
        id: "2",
        title: "¿Cuál es la mejor variedad de eucalipto para construcción en Colombia? Conoce el Eucalyptus pellita",
        created_at: "2025-06-15",
        imageUrl: "/img/blog/prueba_blog.webp",
        mainImage: "/img/blog/prueba_blog.webp",
        body: `
    <h2>🌳 El eucalipto en Colombia: más allá del mito, una solución estructural</h2>
    <p>Colombia cuenta con más de 700 especies registradas del género <em>Eucalyptus</em>, pero solo unas pocas son apropiadas para usos industriales y estructurales.</p>
    <p>En medio de esta amplia diversidad, el <strong>Eucalyptus pellita</strong> se ha consolidado como una de las especies más estables, resistentes y versátiles para la construcción y el desarrollo rural.</p>
    <p>En Maderas Aragón, con sede en los Llanos Orientales, hemos apostado por esta especie debido a su comportamiento óptimo en suelos tropicales y su excelente rendimiento estructural.</p>

    <h3>🔍 ¿Qué es el <em>Eucalyptus pellita</em>?</h3>
    <ul>
      <li><strong>Nombre científico:</strong> Eucalyptus pellita</li>
      <li><strong>Origen:</strong> Nativo de Australia y Papúa Nueva Guinea</li>
      <li><strong>Adaptabilidad:</strong> Ideal para zonas tropicales húmedas</li>
      <li><strong>Crecimiento:</strong> Rápido y con excelente desarrollo en climas cálidos</li>
      <li><strong>Densidad de la madera:</strong> Moderada a alta (600–750 kg/m³ en promedio)</li>
      <li><strong>Aplicaciones:</strong> Construcción de cercas, postes, estructuras rurales, madera inmunizada, entre otros.</li>
    </ul>

    <h3>🪵 Ventajas del <em>Eucalyptus pellita</em> frente a otras especies</h3>
    <ul>
      <li><strong>Alta durabilidad natural:</strong> La madera del pellita es resistente a hongos e insectos, lo que la hace ideal para uso estructural, especialmente si se inmuniza correctamente.</li>
      <li><strong>Fibra recta y fácil trabajabilidad:</strong> Su madera se seca con facilidad, se puede aserrar con herramientas convencionales y presenta buena estabilidad dimensional.</li>
      <li><strong>Desempeño ambiental:</strong> Cultivada responsablemente, esta especie mejora la cobertura del suelo, se adapta bien a suelos marginales y tiene buen rendimiento en reforestación comercial.</li>
      <li><strong>Productividad:</strong> Tiene ciclos de corte de entre 6 a 10 años, con altos volúmenes por hectárea. Esto la convierte en una opción viable para producción sostenible de madera.</li>
    </ul>

    <h3>🌱 ¿Por qué usamos <em>Eucalyptus pellita</em> en Maderas Aragón?</h3>
    <ul>
      <li>Se adapta perfectamente al clima y suelo de los Llanos.</li>
      <li>Ofrece madera de excelente calidad para inmunización.</li>
      <li>Presenta bajo porcentaje de deformaciones o agrietamientos.</li>
      <li>Permite aprovechar el recurso forestal con mínimo desperdicio.</li>
    </ul>
    <p>A través de un manejo técnico adecuado, logramos transformar esta madera en postes durables, carpintería campestre y estructuras funcionales para proyectos rurales de todo tipo.</p>
  `,
        conclusion: `No todas las especies de eucalipto sirven para construcción. El Eucalyptus pellita, gracias a su resistencia, crecimiento eficiente y adaptabilidad, es la mejor opción para quienes buscan una madera fuerte, estable y sostenible en Colombia.
  
  En Maderas Aragón trabajamos con esta especie no solo por su rendimiento, sino porque representa una oportunidad real de desarrollo forestal responsable en la región.

  Elegimos el pellita porque no se trata solo de sembrar árboles, sino de construir futuro con madera que perdura.`,
        images: []
    },
    {
        id: "3",
        title: "¿Los bosques de pino y eucalipto son responsables de los incendios forestales?",
        created_at: "2025-07-10",
        imageUrl: "/img/blog/prueba_blog.webp",
        mainImage: "/img/blog/prueba_blog.webp",
        body: `
    <h2>🔥 ¿Son las plantaciones forestales una bomba de tiempo?</h2>
    <p>Es común escuchar que las plantaciones de pino y eucalipto “causan incendios” o que “estas especies arden más fácil que un bosque nativo”.</p>
    <p>Esta afirmación, repetida incluso por líderes comunitarios o medios locales, ha contribuido a una percepción negativa hacia los cultivos forestales en Colombia y América Latina.</p>
    <p>Pero, ¿es verdad que estas especies son más propensas a incendiarse? ¿O estamos frente a un caso clásico de desinformación ambiental?</p>

    <h3>🌲 ¿Qué tan inflamables son el pino y el eucalipto?</h3>
    <ul>
      <li>Aceites esenciales (en el caso del eucalipto).</li>
      <li>Resinas (en el caso del pino).</li>
      <li>Hojas secas y acículas, que se acumulan si no hay manejo adecuado.</li>
    </ul>
    <p>Sin embargo, la presencia de compuestos inflamables no es igual a culpabilidad directa en incendios. Según el estudio de Gonçalves & Batalha (2022), el principal factor de riesgo no es la especie, sino la acumulación de biomasa seca y la falta de manejo preventivo en las plantaciones forestales (<em>Forest Ecology and Management</em>).</p>

    <h3>🔍 ¿Qué dicen las investigaciones?</h3>
    <ul>
      <li><strong>Los incendios no comienzan solos:</strong> Más del 95 % de los incendios forestales en Colombia son provocados por el ser humano, ya sea por quemas agrícolas mal controladas, fogatas o negligencia (Ministerio de Ambiente, 2023).</li>
      <li><strong>No hay evidencia concluyente que demuestre que los pinos o eucaliptos aumenten la frecuencia de incendios:</strong> Lo que sí está demostrado es que el mal manejo del sotobosque y la falta de rondas cortafuego incrementan el riesgo (FAO, 2021).</li>
      <li><strong>Los bosques naturales también se queman:</strong> Bosques húmedos tropicales, secos o incluso pastizales tienen igual o mayor riesgo en temporadas secas si no hay control de combustibles finos (hojas, ramas secas, etc.).</li>
    </ul>

    <h3>🛠️ ¿Qué reduce el riesgo de incendios?</h3>
    <ul>
      <li>Cosecha y manejo de residuos forestales.</li>
      <li>Diseño de franjas cortafuego.</li>
      <li>Reducción de densidad en plantaciones muy cerradas.</li>
      <li>Monitoreo satelital y alertas tempranas.</li>
      <li>Educación comunitaria y prevención activa.</li>
    </ul>
    <p>En países como Chile y Brasil, donde los incendios han causado daños significativos, la tendencia no ha sido prohibir estas especies, sino mejorar el manejo del bosque productivo (INFOR Chile).</p>
  `,
        conclusion: `No, los pinos y eucaliptos no son responsables por sí solos de los incendios forestales. El riesgo aumenta cuando no hay planificación, manejo técnico ni prevención.

Como toda masa vegetal, estas especies pueden arder, pero el foco debe estar en la gestión del riesgo y la conciencia comunitaria, no en culpar a la especie.

Desmitificar esta idea es clave para avanzar hacia una silvicultura productiva y responsable.`,
        images: []
    },
    {
        id: "4",
        title: "¿Cuál es el mejor pino para fabricar postes de cerca en Colombia? Conoce el Pinus caribaea",
        created_at: "2025-07-20",
        imageUrl: "/img/blog/prueba_blog.webp",
        mainImage: "/img/blog/prueba_blog.webp",
        body: `
    <h2>🌲 Colombia y sus variedades de pino</h2>
    <p>En Colombia se han establecido diferentes especies del género <em>Pinus</em> con fines comerciales y de reforestación, particularmente en regiones como la Orinoquía, el Eje Cafetero y algunas zonas de la Sierra Nevada. Estas especies son seleccionadas por su adaptabilidad, crecimiento rápido y capacidad de producir madera recta, ideal para aplicaciones rurales y estructurales.</p>
    <ul>
      <li>Pinus patula</li>
      <li>Pinus tecunumanii</li>
      <li>Pinus oocarpa</li>
      <li>Pinus maximinoi</li>
      <li><strong>Pinus caribaea</strong> (la más utilizada en Colombia para postes y madera tratada)</li>
    </ul>
    <p><em>Fuente: Fedemaderas</em></p>

    <h3>🪵 ¿Por qué <em>Pinus caribaea</em> es ideal para postes?</h3>
    <p>El <strong>Pinus caribaea</strong>, también conocido como pino caribe, es una especie tropical originaria de Centroamérica y las Antillas, que se ha adaptado muy bien a los suelos de sabana en los Llanos Orientales y otras zonas cálidas de Colombia.</p>
    <ul>
      <li><strong>Crecimiento rápido y recto:</strong> Alcanza buena altura y forma cilíndrica en pocos años, lo que facilita la fabricación de postes uniformes.</li>
      <li><strong>Alta impregnabilidad:</strong> Su madera es especialmente apta para tratamientos con sales protectoras (CCA), lo que la convierte en una excelente opción para inmunización, aumentando la vida útil de los postes hasta 20 años o más en condiciones rurales.<br /><em>Fuente: FAO - Manual de tratamiento de maderas</em></li>
      <li><strong>Densidad media y buena resistencia mecánica:</strong> Tiene una densidad que oscila entre 450 y 600 kg/m³, lo cual ofrece equilibrio entre resistencia estructural y facilidad de trabajo.</li>
      <li><strong>Rendimiento por hectárea:</strong> El caribaea produce más madera por hectárea que otras especies de zonas templadas, gracias a su rápido crecimiento en condiciones tropicales.</li>
    </ul>

    <h3>🧱 Aplicaciones más comunes del <em>Pinus caribaea</em></h3>
    <ul>
      <li>Postes para cercas de potreros, parcelas y cerramientos rurales</li>
      <li>Travesaños y estructuras para corrales</li>
      <li>Madera aserrada para carpintería campestre</li>
      <li>Elementos de infraestructura agrícola y ganadera</li>
    </ul>
    <p>Su facilidad para ser inmunizado, trabajado y transportado, lo convierten en una opción estratégica para zonas rurales de alta exigencia estructural.</p>
  `,
        conclusion: `El Pinus caribaea se posiciona como la mejor opción para postes en Colombia por su adaptabilidad, calidad de madera y excelente respuesta al tratamiento protector.

Si el objetivo es obtener postes duraderos, rectos y funcionales para el campo, esta especie es la elección acertada.

Una reforestación técnica con esta especie permite suplir la demanda de madera sin presionar los bosques naturales, integrando productividad y sostenibilidad en una sola estrategia.`,
        images: []
    },
    {
        id: "5",
        title: "¿Por qué elegir postes de madera inmunizada en vez de cemento o plástico?",
        created_at: "2025-07-25",
        imageUrl: "/img/blog/prueba_blog.webp",
        mainImage: "/img/blog/prueba_blog.webp",
        body: `
    <h2>🌳 ¿Qué es un poste inmunizado?</h2>
    <p>Un poste inmunizado es una pieza de madera tratada con productos preservantes (como CCA o CCB) que protegen contra hongos, insectos, humedad y deterioro estructural. Este tratamiento se realiza a presión y prolonga significativamente la vida útil de la madera en contacto con el suelo o el ambiente.</p>

    <h3>⚖️ Comparativa técnica: madera inmunizada vs cemento vs plástico</h3>
    <table>
      <thead>
        <tr>
          <th>Característica</th>
          <th>Madera inmunizada</th>
          <th>Cemento</th>
          <th>Plástico reciclado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Durabilidad</td>
          <td>15–25 años (tratada)</td>
          <td>10–15 años</td>
          <td>7–10 años (en exterior rural)</td>
        </tr>
        <tr>
          <td>Peso</td>
          <td>Ligero</td>
          <td>Muy pesado</td>
          <td>Ligero</td>
        </tr>
        <tr>
          <td>Instalación</td>
          <td>Fácil (manual o mecánica)</td>
          <td>Requiere maquinaria</td>
          <td>Fácil</td>
        </tr>
        <tr>
          <td>Costo</td>
          <td>Bajo – medio</td>
          <td>Medio – alto</td>
          <td>Alto</td>
        </tr>
        <tr>
          <td>Impacto ambiental</td>
          <td>Bajo si es cultivada</td>
          <td>Alto (energía y transporte)</td>
          <td>Alto (deriva de plásticos)</td>
        </tr>
        <tr>
          <td>Reparabilidad</td>
          <td>Alta (puede cortarse, perforarse, adaptarse)</td>
          <td>Baja (fragilidad en transporte)</td>
          <td>Muy baja (material rígido)</td>
        </tr>
      </tbody>
    </table>

    <h3>✅ Ventajas de los postes de madera inmunizada</h3>
    <ul>
      <li><strong>Durabilidad comprobada:</strong> Bien tratados, los postes pueden durar más de 20 años en campo abierto, incluso en suelos húmedos o altamente degradantes. <em>Fuente técnica: FAO</em></li>
      <li><strong>Mayor facilidad de transporte e instalación:</strong> Son más livianos que los postes de cemento y más adaptables que los de plástico. Permiten instalación manual o con herramientas básicas, sin necesidad de grúas.</li>
      <li><strong>Mejor integración con el entorno rural:</strong> Visualmente armónicos con el paisaje, más aceptados en proyectos agroecológicos y de conservación.</li>
      <li><strong>Versatilidad de uso:</strong> Sirven para cercas, portones, corrales, estructuras ganaderas, soportes agrícolas, sistemas de riego, etc.</li>
      <li><strong>Proveniencia renovable (si es madera cultivada):</strong> A diferencia del plástico o el cemento, que son productos industriales intensivos en energía y materiales no renovables, la madera cultivada proviene de plantaciones sostenibles, con menor huella de carbono y posibilidad de captura de CO₂. <em>Fuente: CIFOR</em></li>
    </ul>

    <h3>⚠️ ¿Y las desventajas?</h3>
    <ul>
      <li>Requieren tratamiento profesional certificado para garantizar la durabilidad.</li>
      <li>La madera no tratada o tratada de forma artesanal puede deteriorarse en menos de 3 años.</li>
      <li>En suelos extremadamente ácidos o húmedos, puede requerir protección adicional en la base.</li>
    </ul>

    <h3>🧱 ¿Cuándo usar postes de cemento o plástico?</h3>
    <ul>
      <li><strong>Cemento:</strong> en zonas urbanas, con alto riesgo de robo o vandalismo, o donde se requiere rigidez estructural extrema.</li>
      <li><strong>Plástico reciclado:</strong> en zonas donde la corrosión es alta, aunque su rendimiento estructural y anclaje es menor.</li>
    </ul>
  `,
        conclusion: `Los postes de madera inmunizada ofrecen una relación costo-beneficio superior, especialmente para proyectos rurales en Colombia. 

Son duraderos, sostenibles, fáciles de manejar y adaptables a múltiples aplicaciones. Frente a materiales como el cemento o el plástico, la madera cultivada tratada correctamente sigue siendo la opción más práctica, eficiente y ecológica.`,
        images: []
    },
    {
        id: "6",
        title: "¿Qué significa que una madera sea cultivada? Ventajas ambientales, sociales y productivas",
        created_at: "2025-07-28",
        imageUrl: "/img/blog/prueba_blog.webp",
        mainImage: "/img/blog/prueba_blog.webp",
        body: `
    <h2>🌱 ¿Madera cultivada? No es lo mismo que deforestar</h2>
    <p>Uno de los errores más comunes es asociar el uso de madera con deforestación. Sin embargo, cuando hablamos de madera cultivada, nos referimos a árboles plantados en terrenos definidos con propósito forestal, manejados bajo prácticas técnicas y sostenibles.</p>
    <p>A diferencia de la extracción ilegal o la tala indiscriminada, la madera cultivada proviene de plantaciones controladas, certificadas y diseñadas para regenerarse.</p>

    <h3>🟢 ¿Por qué es importante hablar de esto?</h3>
    <p>Según datos del IDEAM, Colombia pierde alrededor de 120.000 hectáreas de bosque al año por deforestación, principalmente en la Amazonía. Pero las plantaciones forestales no son parte del problema: son parte de la solución.</p>
    <p><em>Fuente: IDEAM</em></p>

    <h3>🌳 Características de la madera cultivada</h3>
    <ul>
      <li><strong>Origen controlado:</strong> Proviene de especies seleccionadas (como pino o eucalipto) sembradas específicamente para su aprovechamiento.</li>
      <li><strong>Rotación planificada:</strong> El ciclo de siembra, crecimiento, cosecha y resiembra se maneja técnicamente (6 a 15 años, según especie).</li>
      <li><strong>Manejo responsable del suelo y el agua:</strong> Se diseñan con medidas de protección de microcuencas, cortafuegos y conservación del suelo.</li>
      <li><strong>Certificación y trazabilidad:</strong> Muchas plantaciones cumplen con estándares como FSC o PEFC.</li>
    </ul>

    <h3>✅ Ventajas de la madera cultivada</h3>
    <ul>
      <li><strong>Evita la presión sobre los bosques naturales:</strong> Al suplir la demanda con madera cultivada, se reduce la extracción ilegal.</li>
      <li><strong>Captura carbono:</strong> Mientras crecen, los árboles almacenan CO₂, ayudando a mitigar el cambio climático.</li>
      <li><strong>Genera empleo rural formalizado:</strong> La cadena forestal es intensiva en mano de obra local y permanente.</li>
      <li><strong>Contribuye a la restauración productiva:</strong> Muchas plantaciones forestales se ubican en zonas degradadas por ganadería extensiva o incendios.</li>
      <li><strong>Permite la planificación a largo plazo:</strong> A diferencia de la tala sin control, la silvicultura profesional permite prever rendimientos, volúmenes y rotaciones.</li>
    </ul>

    <h3>📉 ¿Y los mitos?</h3>
    <ul>
      <li><strong>❌ “Especies exóticas destruyen el suelo”</strong> → Falso si se manejan con cobertura y rotación.</li>
      <li><strong>❌ “La reforestación es negocio de multinacionales”</strong> → Más del 85 % del área reforestada en Colombia pertenece a pequeños y medianos productores.</li>
      <li><strong>❌ “La madera cultivada es de baja calidad”</strong> → Con manejo técnico e inmunización, supera en durabilidad a muchas maderas extraídas de bosque natural.</li>
    </ul>
  `,
        conclusion: `La madera cultivada es un recurso renovable, sostenible y estratégicamente necesario para el futuro del campo colombiano.

Es tiempo de dejar atrás los prejuicios y entender que no toda tala es destrucción: cuando hay planificación, la madera puede ser aliada del ambiente, la economía y la ruralidad.`,
        images: []
    },
    {
        id: "7",
        title: "¿Por qué construir con madera es más ecológico que usar cemento o ladrillo?",
        created_at: "2025-07-29",
        imageUrl: "/img/blog/prueba_blog.webp",
        mainImage: "/img/blog/prueba_blog.webp",
        body: `
    <h2>🌍 La urgencia de construir distinto</h2>
    <p>
      El sector construcción representa más del 36 % de las emisiones globales de CO₂ y consume más del 40 % de la energía mundial según el <em>Global Status Report for Buildings and Construction 2022</em> del Programa de las Naciones Unidas para el Medio Ambiente (UNEP).
    </p>
    <p>
      Materiales como el cemento, el acero y el ladrillo, aunque dominantes, generan una enorme huella ambiental desde su fabricación hasta su demolición. En contraste, la madera cultivada aparece como una alternativa renovable, de bajo impacto y con beneficios estructurales reales.
    </p>

    <h3>🧱 Comparativa ambiental: madera vs cemento/ladrillo</h3>
    <table>
      <thead>
        <tr>
          <th>Aspecto</th>
          <th>Madera cultivada</th>
          <th>Cemento / Ladrillo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fuente</td>
          <td>Renovable</td>
          <td>No renovable</td>
        </tr>
        <tr>
          <td>Producción de CO₂</td>
          <td>Baja (absorbe CO₂)</td>
          <td>Alta (proceso de calcinación)</td>
        </tr>
        <tr>
          <td>Huella energética</td>
          <td>Baja (tratamiento básico)</td>
          <td>Alta (hornos a 1400 °C)</td>
        </tr>
        <tr>
          <td>Reutilización</td>
          <td>Alta (estructuras desmontables)</td>
          <td>Muy baja (escombros)</td>
        </tr>
        <tr>
          <td>Fin de vida útil</td>
          <td>Biodegradable o reciclable</td>
          <td>Relleno sanitario</td>
        </tr>
      </tbody>
    </table>

    <p><strong>📌 Un m³ de madera puede almacenar hasta 1 tonelada de CO₂ durante décadas.</strong> En cambio, la fabricación de 1 tonelada de cemento emite cerca de 0,9 toneladas de CO₂ (IPCC, 2021).</p>

    <h3>🪵 Ventajas estructurales y térmicas de construir con madera</h3>
    <ul>
      <li><strong>Ligereza con resistencia:</strong> La madera estructural bien tratada tiene una relación peso/resistencia superior al hormigón, ideal para zonas rurales, sismorresistentes o de difícil acceso.</li>
      <li><strong>Excelente aislamiento térmico:</strong> Reduce la necesidad de climatización artificial:</li>
    </ul>
    <ul>
      <li>Madera: 0.13 W/mK</li>
      <li>Ladrillo: 0.72 W/mK</li>
      <li>Concreto: 1.75 W/mK</li>
    </ul>
    <ul>
      <li><strong>Velocidad de construcción:</strong> Las estructuras en madera pueden montarse en menos tiempo, con menor logística pesada.</li>
      <li><strong>Flexibilidad de diseño:</strong> Compatible con arquitectura bioclimática, construcción modular o híbrida (madera + metal liviano).</li>
    </ul>

    <h3>🌱 Construcción con madera cultivada ≠ deforestación</h3>
    <p>
      Una aclaración clave: construir con madera no promueve la tala de bosques naturales, siempre que se use madera cultivada y tratada de forma responsable. Estas provienen de plantaciones forestales comerciales con ciclos de cosecha y reforestación planificados, como ocurre en regiones de los Llanos Orientales de Colombia.
    </p>
    <p><em>Fuente: FAO – Plantaciones Forestales Sostenibles</em></p>

    <h3>🏡 ¿Y en Colombia?</h3>
    <ul>
      <li><strong>Normas NSR-10:</strong> ya contemplan estructuras de madera.</li>
      <li><strong>Nuevas generaciones de arquitectos:</strong> exploran diseño sostenible en madera.</li>
      <li><strong>La madera inmunizada:</strong> gana terreno en zonas rurales y proyectos ecológicos.</li>
    </ul>
  `,
        conclusion: `Construir con madera cultivada no es solo una opción viable: es una necesidad ambiental, económica y técnica.

Frente al cemento y el ladrillo, la madera ofrece:
- Menor huella de carbono
- Mayor eficiencia energética
- Menor impacto en el entorno
- Potencial de economía circular

Si queremos responder a los retos del cambio climático desde el sector construcción, la madera debe ser protagonista y no complemento.`,
        images: []
    }

];
