export interface BlogItem {
    id: string;
    title: string;
    created_at: string;
    imageUrl: string;
    mainImage: string;
    mainImageDesktop?: string;
    mainImageMobile?: string;
    body: string;
    images?: string[];
    conclusion?: string;
}

export const blogData: BlogItem[] = [
    {
        id: "1",
        title: "¿Para que sirve el Colágeno Hidrolizado Bovino Tipo I?",
        created_at: "2025-05-01",
        imageUrl: "/img/blog/colageno_1.png",
        mainImage: "/img/blog/colageno_1.png",
        mainImageDesktop: "/img/blog/colageno_1.png",
        mainImageMobile: "/img/blog/colageno_movil_1.png",
        body: `
    <p>
     El colágeno tipo I es la forma más abundante de colágeno en el cuerpo humano, y se encuentra principalmente en la piel, los huesos, los tendones y los ligamentos. Su presentación en polvo hidrolizado permite una <strong>absorción rápida y eficiente</strong> por el organismo, ya que ha sido previamente descompuesto en péptidos de colágeno de bajo peso molecular.
    </p>
    <p>
      Este suplemento es ideal para <strong>mantener la salud de la piel, articulaciones, huesos y músculos</strong>, así como para <strong>prevenir o contrarrestar el envejecimiento prematuro</strong> y el desgaste físico causado por la edad o por el esfuerzo físico.
    </p>

    <h2>BENEFICIOS DEL COLÁGENO HIDROLIZADO TIPO I</h2>
    <p>
        <strong>1. Salud de la piel:</strong> Ayuda a mejorar la elasticidad, firmeza e hidratación cutánea, disminuyendo visiblemente arrugas y líneas de expresión. Estimula la producción natural de colágeno y ácido hialurónico.
        <br>
        <strong>2. Fortalecimiento articular:</strong> Contribuye a la regeneración del cartílago, reduciendo el dolor y la rigidez en articulaciones, especialmente útil en casos de artritis, desgaste articular o lesiones deportivas.
        <br>
        <strong>3. Fortalece huesos y dientes:</strong> Aporta aminoácidos esenciales como glicina y prolina que intervienen en la mineralización ósea, favoreciendo la densidad ósea y previniendo la osteoporosis.
        <br>
        <strong>4. Músculos y recuperación física:</strong> Favorece la masa muscular magra y acelera la recuperación tras entrenamientos o cirugías, al reducir la inflamación y mejorar la reparación de tejidos.
        <br>
        <strong>5. Cabello y uñas:</strong> Estimula el crecimiento del cabello, fortalece las uñas y reduce su fragilidad. Su contenido en colágeno tipo I actúa desde el interior, nutriendo las estructuras queratínicas.
        <br>
        <strong>6. Mejora la digestión:</strong> Los péptidos de colágeno pueden fortalecer la mucosa intestinal, ayudando en casos de intestino permeable y mejorando la absorción de nutrientes.
        <br>
        <strong>7. Antioxidante y antiinflamatorio natural:</strong> Su acción antioxidante contribuye a combatir los radicales libres y a reducir los procesos inflamatorios del organismo.
    </p>

    <h2>VALOR NUTRICIONAL POR CADA 100 G DE COLÁGENO TIPO I</h2>
    <table>
      <thead>
        <tr>
          <th>Componente</th>
          <th>Cantidad Aprox.</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Calorías</td>
          <td>362 kcal</td>
        </tr>
        <tr>
          <td>Proteína</td>
          <td>90 g</td>
        </tr>
        <tr>
          <td>Grasas</td>
          <td>0 g</td>
        </tr>
        <tr>
          <td>Carbohidratos</td>
          <td>0 g</td>
        </tr>
        <tr>
          <td>Sodio</td>
          <td>300–450 mg</td>
        </tr>
        <tr>
          <td>Aminoácidos claves</td>
          <td>Glicina, Prolina, Hidroxiprolina, Alanina, Arginina</td>
        </tr>
      </tbody>
    </table>
    <p><strong>El colágeno hidrolizado no contiene colesterol ni gluten. Es libre de azúcares añadidos y aditivos.</strong></p>
    <h2>FORMA DE USO</h2>
    <p>La presentación en polvo permite disolverse fácilmente en líquidos fríos o calientes. Se puede añadir a:</p>
    <ul>
      <li>Batidos</li>
      <li>Avena</li>
      <li>Jugos o zumos</li>
      <li>Agua tibia con limón</li>
      <li>Infusiones o sopas</li>
    </ul>
    
    <h3>Dosis recomendada</h3>
    <p><strong>10 g diarios (1 cucharada sopera)</strong>, preferiblemente en ayunas o entre comidas. En casos de alta demanda física o envejecimiento, se puede consumir hasta <strong>20 g diarios</strong>, fraccionados en dos tomas. Consultar a un profesional de la salud si se desea usar por más tiempo o en cantidades mayores.</p>
    
    <h2>POSIBLES EFECTOS SECUNDARIOS</h2>
    <p>En general, el colágeno hidrolizado es bien tolerado. Sin embargo, en algunos casos puede producir:</p>
    <ul>
      <li>Pesadez estomacal</li>
      <li>Náuseas leves</li>
      <li>Sabor residual si se consume sin mezclar</li>
    </ul>
    <p><strong>No debe sobrepasarse la dosis recomendada.</strong></p>
    
    <h2>CONTRAINDICACIONES</h2>
    <ul>
      <li>No debe ser consumido por personas alérgicas a la proteína bovina.</li>
      <li>No está indicado para personas con insuficiencia renal severa sin supervisión médica.</li>
      <li>En embarazo o lactancia, se debe consultar previamente al médico.</li>
    </ul>
  `,
    },
    {
        id: "2",
        title: "¿Para que sirve el Ashwagandha?",
        created_at: "2025-06-15",
        imageUrl: "/img/blog/ashwaghanda_1.png",
        mainImage: "/img/blog/ashwaghanda_1.png",
        mainImageDesktop: "/img/blog/ashwaghanda_1.png",
        mainImageMobile: "/img/blog/ashwaghanda_movil_1.png",
        body: `
                <p>
                  La ashwagandha (<em>Withania somnifera</em>), también conocida como “ginseng indio”, es una planta adaptógena utilizada tradicionalmente en la medicina ayurvédica desde hace más de 3.000 años. Su raíz es especialmente valorada por su capacidad para <strong>equilibrar el cuerpo, reducir el estrés, fortalecer el sistema nervioso y mejorar la vitalidad general</strong>.
                </p>
                
                <p>
                  El polvo tradicional de ashwagandha conserva todos los compuestos bioactivos de la raíz, como los <strong>withanólidos</strong>, responsables de gran parte de sus efectos fisiológicos. Es ideal como suplemento natural para mejorar la salud física y mental, promover la longevidad y aumentar la resistencia al estrés.
                </p>
                
                <hr />
                
                <h2>BENEFICIOS DE LA ASHWAGANDHA</h2>
                <ol>
                  <li><strong>Reducción del estrés y la ansiedad</strong>: Su acción adaptógena ayuda a regular el eje HPA (hipotálamo–pituitaria–adrenal), disminuyendo los niveles de cortisol y generando una sensación de calma.</li>
                  <li><strong>Mejora del sueño</strong>: Promueve un descanso más profundo y reparador, combatiendo el insomnio leve y mejorando la calidad del sueño en general.</li>
                  <li><strong>Aumento de energía y vitalidad</strong>: Incrementa la resistencia física y mental, combatiendo la fatiga crónica y aumentando el rendimiento general, tanto en deportistas como en personas con alta carga de estrés.</li>
                  <li><strong>Mejora de la función cognitiva</strong>: Potencia la memoria, la concentración y la claridad mental. Sus antioxidantes protegen las neuronas del estrés oxidativo.</li>
                  <li><strong>Equilibrio hormonal y salud sexual</strong>: En hombres, puede aumentar la testosterona y mejorar la fertilidad; en mujeres, ayuda a regular el ciclo hormonal y disminuir síntomas del síndrome premenstrual o menopausia.</li>
                  <li><strong>Fortalecimiento del sistema inmune</strong>: Estimula las defensas naturales del cuerpo y puede ser un coadyuvante en procesos inflamatorios crónicos.</li>
                  <li><strong>Acción antioxidante y antiinflamatoria</strong>: Protege frente a los radicales libres, al tiempo que reduce marcadores de inflamación sistémica.</li>
                </ol>
                
                <hr />
                
                <h2>VALOR NUTRICIONAL POR CADA 100 G DE ASHWAGANDHA EN POLVO</h2>
                
                <table>
                <thead>
                  <tr>
                    <th>Componente</th>
                    <th>Cantidad Aprox.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Calorías</td><td>245 kcal</td></tr>
                  <tr><td>Proteína</td><td>3.7 g</td></tr>
                  <tr><td>Grasas</td><td>0.3 g</td></tr>
                  <tr><td>Carbohidratos totales</td><td>46.9 g</td></tr>
                  <tr><td>Fibra dietaria</td><td>32.3 g</td></tr>
                  <tr><td>Hierro</td><td>3.3 mg</td></tr>
                  <tr><td>Calcio</td><td>23 mg</td></tr>
                  <tr><td>Potasio</td><td>370 mg</td></tr>
                  <tr><td>Withanólidos</td><td>2.5% – 5%</td></tr>
                </tbody>
                </table>
                
                <p><em>Libre de gluten, sin aditivos ni conservantes. Producto 100% natural de origen vegetal.</em></p>
                
                <hr />
                
                <h2>FORMA DE USO</h2>
                
                <p>La ashwagandha en polvo tiene un sabor terroso y ligeramente amargo. Puede mezclarse con:</p>
                <ul>
                  <li>Leche vegetal o animal caliente</li>
                  <li>Batidos, yogures, infusiones o té chai</li>
                  <li>Agua tibia con miel (forma ayurvédica tradicional)</li>
                </ul>
                
                <p><strong>Dosis recomendada:</strong></p>
                <ul>
                  <li><strong>1 a 5 g por día</strong> (aproximadamente ½ a 1 cucharadita), preferiblemente en la noche o durante momentos de alto estrés.</li>
                  <li>Para efectos sostenidos, usar por al menos 6–8 semanas.</li>
                </ul>
                
                <p><strong>Nota</strong>: Para personas sensibles, se recomienda comenzar con dosis bajas e ir aumentando progresivamente.</p>
                
                <hr />
                
                <h2>POSIBLES EFECTOS SECUNDARIOS</h2>
                
                <p>Aunque bien tolerada, en algunas personas puede causar:</p>
                <ul>
                  <li>Somnolencia o sedación leve</li>
                  <li>Malestar gastrointestinal (náuseas, diarrea leve)</li>
                  <li>En dosis altas, puede inducir sueño profundo o sensación de letago</li>
                </ul>
                
                <p><strong>Suspender su uso en caso de reacciones adversas persistentes.</strong></p>
                
                <hr />
                
                <h2>CONTRAINDICACIONES</h2>
                <ul>
                  <li>Embarazo y lactancia (puede tener efectos sobre el útero)</li>
                  <li>Hipotiroidismo severo sin supervisión médica</li>
                  <li>Personas con enfermedades autoinmunes deben consultar antes de consumirla</li>
                  <li>Interacciones posibles con ansiolíticos, sedantes o inmunosupresores</li>
                </ul>
                `,
    },
    {
        id: "3",
        title: "¿Para que sirve la creatina monohidratada?",
        created_at: "2025-07-20",
        imageUrl: "/img/blog/creatina_01.png",
        mainImage: "/img/blog/creatina_01.png",
        mainImageDesktop: "/img/blog/creatina_01.png",
        mainImageMobile: "/img/blog/creatina_movil_1.png",
        body: `
    <p>
      La creatina monohidratada es uno de los suplementos más estudiados y utilizados en el mundo del deporte y la salud muscular. Es una sustancia natural que el cuerpo produce a partir de los aminoácidos arginina, glicina y metionina, y se encuentra principalmente en los músculos y en menor medida en el cerebro.
    </p>
    
    <p>
      Este compuesto ayuda a regenerar el ATP (adenosín trifosfato), la principal fuente de energía celular, especialmente durante esfuerzos cortos e intensos. Su uso está recomendado tanto para atletas de alto rendimiento como para personas que desean mejorar su fuerza, recuperación y rendimiento físico general.
    </p>
    
    <h2>BENEFICIOS DE LA CREATINA MONOHIDRATADA</h2>
    
    <ol>
      <li><strong>Aumento de fuerza y potencia muscular</strong>: Mejora significativamente el rendimiento en ejercicios de alta intensidad y corta duración, como levantamiento de pesas, sprints o HIIT.</li>
      <li><strong>Incremento de masa muscular</strong>: Favorece la síntesis de proteínas y estimula la proliferación de células satélite, lo que contribuye al crecimiento muscular (hipertrofia), especialmente cuando se combina con entrenamiento de resistencia.</li>
      <li><strong>Recuperación más rápida</strong>: Disminuye el daño muscular post-entrenamiento, acelera la recuperación y reduce el dolor muscular de aparición tardía (DOMS).</li>
      <li><strong>Mejora del rendimiento cognitivo</strong>: En situaciones de fatiga, el cerebro también puede beneficiarse de mayores niveles de creatina, mejorando el enfoque, la memoria y la claridad mental.</li>
      <li><strong>Apoyo en adultos mayores</strong>: Suplementar con creatina puede ayudar a prevenir la pérdida de masa muscular (sarcopenia), mantener la fuerza y mejorar el equilibrio en adultos mayores.</li>
      <li><strong>Hidratación muscular celular</strong>: Aumenta el volumen intracelular de agua, lo que promueve un ambiente anabólico ideal para el crecimiento muscular.</li>
      <li><strong>Respaldo clínico sólido</strong>: Es uno de los suplementos más seguros y efectivos avalados por estudios científicos de largo plazo.</li>
    </ol>
    
    <h2>VALOR NUTRICIONAL POR CADA 100 G DE CREATINA MONOHIDRATADA</h2>
    
    <table>
      <thead>
        <tr>
          <th>Componente</th>
          <th>Cantidad Aprox.</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Calorías</td><td>0 kcal</td></tr>
        <tr><td>Proteína</td><td>0 g</td></tr>
        <tr><td>Grasas</td><td>0 g</td></tr>
        <tr><td>Carbohidratos</td><td>0 g</td></tr>
        <tr><td>Creatina pura</td><td>99.9 g</td></tr>
        <tr><td>Sodio</td><td>0 mg</td></tr>
      </tbody>
    </table>
    
    <p><em>Producto sin sabor, sin calorías, sin azúcar ni aditivos. Libre de gluten y de origen animal.</em></p>
    
    <h2>FORMA DE USO</h2>
    
    <p>
      La creatina monohidratada en polvo se disuelve fácilmente en agua o en bebidas no ácidas. Se puede tomar sola o combinada con carbohidratos simples para mejorar su absorción.
    </p>
    
    <p><strong>Dosis recomendada:</strong></p>
    <ul>
      <li><strong>Fase de carga (opcional):</strong> 20 g diarios (divididos en 4 dosis de 5 g) durante 5–7 días.</li>
      <li><strong>Fase de mantenimiento:</strong> 3 a 5 g diarios.</li>
      <li>Se recomienda tomarla a la misma hora todos los días, preferiblemente después del entrenamiento o junto a una comida rica en carbohidratos.</li>
    </ul>
    
    <p><strong>Hidratación:</strong> Es importante consumir suficiente agua durante el día para facilitar la retención celular y la función renal.</p>
    
    <h2>POSIBLES EFECTOS SECUNDARIOS</h2>
    
    <p>La creatina es segura en adultos sanos cuando se consume en dosis adecuadas. Sin embargo, puede causar en algunas personas:</p>
    
    <ul>
      <li>Retención de líquidos</li>
      <li>Malestar estomacal o gases si no se disuelve bien</li>
      <li>Calambres si hay deshidratación</li>
    </ul>
    
    <p><strong>No sobrepasar la dosis diaria recomendada.</strong></p>
    
    <h2>CONTRAINDICACIONES</h2>
    
    <ul>
      <li>Personas con enfermedades renales deben evitar su uso sin autorización médica.</li>
      <li>No se recomienda en embarazo, lactancia o en menores de 18 años sin supervisión profesional.</li>
      <li>Evitar su consumo con cafeína en exceso, ya que puede interferir con sus efectos.</li>
    </ul>
  `
    },
    {
        id: "4",
        title: "¿Para que sirve el Citrato de Magnesio?",
        created_at: "2025-07-28",
        imageUrl: "/img/blog/citrato_1.png",
        mainImage: "/img/blog/citrato_1.png",
        mainImageDesktop: "/img/blog/citrato_1.png",
        mainImageMobile: "/img/blog/citrato_movil_1.png",
        body: `
    <p>
      El citrato de magnesio es una de las formas más biodisponibles y eficaces de magnesio, un <strong>mineral esencial</strong> para más de 300 procesos enzimáticos del cuerpo humano. Su presentación en polvo facilita una absorción rápida y efectiva, especialmente cuando se consume disuelto en líquidos.
    </p>
    
    <p>
      Este suplemento se destaca por su capacidad para <strong>regular el sistema nervioso, muscular y digestivo</strong>, y es ampliamente utilizado para combatir el estrés, los calambres, la fatiga crónica y los trastornos del sueño.
    </p>
    
    <h2>BENEFICIOS DEL CITRATO DE MAGNESIO</h2>
    
    <ol>
      <li><strong>Apoyo al sistema nervioso y reducción del estrés</strong>: El magnesio ayuda a modular la actividad del sistema nervioso central, reduciendo la ansiedad, la irritabilidad y favoreciendo un estado de calma y relajación.</li>
      <li><strong>Mejora del sueño</strong>: Estimula la producción de melatonina y GABA (ácido gamma-aminobutírico), facilitando un descanso profundo y reparador. Ideal para personas con insomnio o sueño interrumpido.</li>
      <li><strong>Alivio de calambres y tensión muscular</strong>: Interviene directamente en la relajación muscular. Su uso es muy común entre deportistas y personas con contracturas o rigidez muscular.</li>
      <li><strong>Prevención de migrañas y dolores de cabeza tensionales</strong>: Estudios indican que bajos niveles de magnesio pueden estar relacionados con migrañas frecuentes. Su suplementación puede reducir su aparición e intensidad.</li>
      <li><strong>Regulación del tránsito intestinal</strong>: Actúa como un laxante osmótico suave, útil en casos de estreñimiento leve al atraer agua al intestino y facilitar la evacuación.</li>
      <li><strong>Apoyo al metabolismo energético</strong>: Participa en la producción de ATP, la principal fuente de energía celular, ayudando a combatir la fatiga física y mental.</li>
      <li><strong>Salud ósea y cardiovascular</strong>: Contribuye a la fijación del calcio en los huesos y ayuda a mantener una presión arterial saludable y un ritmo cardíaco estable.</li>
    </ol>
    
    <h2>VALOR NUTRICIONAL POR CADA 100 G DE CITRATO DE MAGNESIO</h2>
    
    <table>
      <thead>
        <tr>
          <th>Componente</th>
          <th>Cantidad Aprox.</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Calorías</td><td>0 kcal</td></tr>
        <tr><td>Proteína</td><td>0 g</td></tr>
        <tr><td>Grasas</td><td>0 g</td></tr>
        <tr><td>Carbohidratos</td><td>0 g</td></tr>
        <tr><td>Magnesio elemental</td><td>16 g (aprox. 16%)</td></tr>
        <tr><td>Sodio</td><td>0 mg</td></tr>
      </tbody>
    </table>
    
    <p><em>Libre de gluten, azúcares añadidos, colorantes, lactosa y conservantes.</em></p>
    
    <h2>FORMA DE USO</h2>
    
    <p>
      El citrato de magnesio en polvo es altamente soluble. Se recomienda mezclarlo con agua, jugo natural o infusión tibia.
    </p>
    
    <p><strong>Dosis recomendada:</strong></p>
    <ul>
      <li><strong>Adultos:</strong> 1 a 2 g al día (aprox. ¼ a ½ cucharadita), preferiblemente disuelto en agua caliente o tibia, <strong>antes de dormir</strong> o entre comidas.</li>
      <li>Para uso como <strong>regulador intestinal</strong>, puede tomarse hasta 3 g diarios.</li>
      <li>Ajustar la dosis según tolerancia y necesidades individuales. Consultar con un profesional de salud si se desea prolongar su uso.</li>
    </ul>
    
    <h2>POSIBLES EFECTOS SECUNDARIOS</h2>
    
    <p>Aunque es seguro en dosis recomendadas, un exceso puede provocar:</p>
    
    <ul>
      <li>Diarrea o molestias intestinales</li>
      <li>Náuseas</li>
      <li>Calambres abdominales</li>
    </ul>
    
    <p><strong>Reducir la dosis si se presentan síntomas y mantener una adecuada hidratación.</strong></p>
    
    <h2>CONTRAINDICACIONES</h2>
    
    <ul>
      <li>No debe ser usado en personas con insuficiencia renal sin supervisión médica.</li>
      <li>Evitar durante embarazo o lactancia sin indicación profesional.</li>
      <li>Puede interactuar con ciertos medicamentos (antibióticos, diuréticos, bifosfonatos), por lo que se recomienda tomarlo separado por al menos 2 horas.</li>
    </ul>
  `,
    }
];
