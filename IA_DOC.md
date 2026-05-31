# Informe de Uso de IA — Anti-Procrastination Quest

## 1. ¿Qué herramientas de IA utilizaron?

Use **Claude**, **MiniMax** y **Gemini**. Claude fue usado exclusivamente para diseño, planificación y generación de prompts/SDDs. MiniMax fue el agente que implementó el código en el proyecto — leía archivos, los modificaba y ejecutaba los cambios. También use **ChatGPT** puntualmente al inicio para armar algún prompt específico y la creacion de gatos con problemas de hidrosefalia.
Gemini se uso para la creacion de la estructura y diseño inicial del proyecto y para la integracion de la logica de la ARENA incluyendo el sistema de emeparejamiento usando codigos HASH.

---

## 2. ¿Para qué las utilizaron?

Le describi a Claude la funcionalidad que queria implementar de manera detalla con outputs deseados, y él generaba un **SDD (Software Design Document)** en Markdown que explicaba qué había que hacer y en qué archivo. Ese documento se lo pasaba a MiniMax como contexto para que implementara los cambios.

MiniMax por su parte leía los archivos del proyecto, aplicaba los cambios descritos en el SDD y ejecutaba las modificaciones. Cuando algo salía mal, vovlía a Claude para hacer un SDD de fix y se lo pasábamos de vuelta a MiniMax.

---

## 3. ¿Qué partes del proyecto fueron asistidas por IA?

Prácticamente todo el código:

- **Arquitectura JS modular** (`config.js`, `dom.js`, `state.js`, `render.js`, `event.js`, `main.js`).
- **Sistema de pixel art del gato**: función de `box-shadow` adaptada por MiniMax a partir de una técnica que encontre en una web externa.
- **Refactor del CSS** en capas modulares (`tokens.css`, `layout.css`, `components.css`, etc.): prompt generado con ayuda de ChatGPT, ejecutado por MiniMax.
- **Sistema de quests, cofre, inventario y recompensas**: SDDs en Claude, código en MiniMax.
- **Animaciones de combate**: SDD en Claude, implementadas por MiniMax.
- **AGENTS.md**: documentación generada con Claude para darle contexto a MiniMax al inicio de cada sesión nueva.

Lo que hice sin IA fue el diseño visual de todos los sprites e íconos PNG — armas, armaduras, cascos e íconos de UI hechos a mano en un editor de pixel art.

---

## 4. ¿Qué prompts o consultas les resultaron más útiles?

El flujo de SDDs fue lo que más me funcionó. En lugar de decirle a MiniMax "hacé esto", primero le pedia a Claude que documentara el problema. Eso nos daba un documento que podia revisar antes de ejecutar cualquier cambio — y en varios casos nos permitió detectar decisiones incorrectas antes de que llegaran al código.

Al inicio del proyecto también fue muy útil el prompt de refactor CSS que separó el `styles.css` monolítico en una arquitectura de capas con `@layer`. Y el prompt para generar el gato kawaii, aunque los primeros resultados fueron bastante malos hasta que encontramos la técnica de pixel art con `box-shadow`.

adjunto pruebas que me perisiguen en mis sueños:

#### Gato creado por Claude
![Gato creado por Claude](imgs/claude.png)

#### Gato creado por Claude segundo intento
![Gato creado por Claude segundo intento](imgs/claude2.png)

#### Gato creado por ChatGpt
![Gato creado por ChatGpt](imgs/chatgpt.png)

#### Gato creado por MiniMax
![Gato creado por MiniMax](imgs/minimax.png)

---

## 5. ¿Qué respuestas de la IA tuvieron que corregir?

Bastantes. MiniMax a veces implementaba cosas que no correspondían con la arquitectura o tomaba decisiones propias que rompían lo que ya estaba hecho. Algunos ejemplos:

- Puso los módulos JS dentro de una carpeta `cat/` cuando tenían que ser globales.
- Agregó muchos `!important` en el CSS de `personalization_page` que después hubo que limpiar.
- El sistema de cofres desbloqueaba uno por misión en lugar de uno cada cinco — bug en la implementación de `incrementCompletadas()`.
- Las animaciones del gato rival rompían el flip horizontal porque los `@keyframes` sobreescribían el `scaleX(-1)`.
- En algunos SDDs Claude proponía soluciones más complejas de lo necesario — por ejemplo para sincronizar IDs entre páginas propuso modificar varios archivos JS cuando la solución era cambiar dos atributos en el HTML.
- En un principio la IA habia configurado pop-ups genericos para los mensajes de error y eso estaba mal entonces configuramos unos con la estetica y diseño de la pagina y con mejores mensajes.


---

## 6. ¿Qué problemas tuvieron al trabajar con IA?

El principal fue el **contexto entre sesiones de MiniMax**. Al no recordar las decisiones de arquitectura previas, a veces introducía código que contradecía lo ya establecido. Para mitigarlo cree el `AGENTS.md` con las reglas del proyecto que le pasábamos al inicio de cada sesión.

También tuve el problema de que MiniMax **borro archivos sin querer** al ejecutar cambios en carpetas — en un momento borró sprites que habíamos hecho a mano. El error fue no revisar bien el SDD antes de ejecutarlo.

Otro problema fue que tanto Claude como MiniMax tendían a **sobrecomplicar las soluciones**. Varias veces la respuesta correcta era mucho más simple que lo que proponían. Como ejemplo puedo destacar que quiso ampliar la cantidad de elemetos seleccionados al renderizar los stats en diferentes paginas cuando la solcion mas sencilla era agregar esa clase al html

---

## 7. ¿Qué aprendieron durante el proceso?

Aprendi que la IA es mucho más útil como **herramienta de diseño y documentación** que como generadora de código sin supervisión. El flujo de SDD fue el mayor aprendizaje: documentar antes de implementar nos obligó a entender qué queríamos hacer y nos dio control sobre lo que el agente ejecutaba.

También aprendi a revisar el código que genera la IA antes de aceptarlo. Varios bugs vinieron de implementaciones que parecían correctas pero no respetaban decisiones de arquitectura que ya habíamos tomado.

---

## 8. ¿Qué partes del código puede explicar cada integrante?

- **Agustín**: arquitectura JS modular (el flujo completo de `state` → `render` → `event`), sistema de pixel art con `box-shadow`, sistema de quests con localStorage, sistema de recompensas, cofre e inventario.
- **Matias**: Estructura del HTML y una version inicial del CSS, Integracion del sistema codificacion HASH de los atributos del "Michi" y el sistema de combate y su balanceo (daño de armas y sistema de defensa). Tambien me encargue bastante de la parte estetica de la pagina ARENA.
- **Fiorella**: Me encargué de definir y estandarizar la paleta de colores del proyecto mediante variables CSS asegurando la coherencia estética en todos los componentes.Desarrollé la arquitectura visual de la página de personalización, organizando los slots de equipamiento y la jerarquía de los elementos para asegurar una UX intuitiva.    
---

## 9. ¿Qué decisiones tomó el grupo sin depender de la IA?

**Agustín**
- El diseño visual de todos los sprites e íconos PNG — hechos a mano en un editor de pixel art.
- La decisión de usar el flujo de SDDs en lugar de pedirle código directamente a MiniMax.
- Separar `items.config.js` de `config.js` para no mezclar responsabilidades.

**Matias**
- Sistema de emparejamiento por HASH.
**Fiorella**
- Definir la identidad visual y la paleta cromática, descartando las sugerencias de la IA que no cumplían con los estándares de accesibilidad y contraste que buscábamos.  
- Establecer la estructura final del layout en la vista del Michi, priorizando tamaños fijos (140px) en los slots de equipamiento para evitar que el diseño se rompiera al renderizar los distintos ítems. 

---

## 10. ¿Hubo código sugerido por IA que descartaron? ¿Por qué?

Sí. El caso más claro fue el sistema de ítems equipados sobre el gato: Claude propuso renderizarlos con el mismo sistema de `box-shadow` con paletas de colores propias por ítem. MiniMax lo implementó, pero el resultado era demasiado complejo de mantener y visualmente forzado. Decidi descartar todo ese sistema y reemplazarlo por PNG posicionados con CSS — más simple y con mejor resultado visual.

También descarte la Web Animations API para las animaciones de combate.

También rechacé la implementación de animaciones complejas en los slots de inventario sugeridas por la IA, ya que afectaban el rendimiento móvil y distraían del objetivo funcional del sitio.  