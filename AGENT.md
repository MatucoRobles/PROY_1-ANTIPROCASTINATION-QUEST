# AGENTS.md

## Proyecto: Anti-Procrastination Quest

Vanilla JS multi-page. Sin build system, sin npm, sin tests.

---

## Arquitectura JS

```
Assets/Js/
  main.js          # Entry point: initCat() en DOMContentLoaded
  config.js        # Constantes, PIXEL_MAPS, CSS_VARS, ICON_IMG_MAP, claves de localStorage
  items.config.js  # ITEM_POOL, ITEM_SLOTS — datos de ítems con rutas PNG
  state.js         # Estado global (state, michiState), localStorage, quests, progreso, chest/equip
  dom.js           # TODOS los querySelector centralizados aquí
  render.js        # Funciones de renderizado — no muta estado, recibe callbacks para acciones
  event.js         # bindEvents() — registra todos los listeners, coordina usuario → estado → render
  customization.js # (reservado) Lógica de personalización del gato
  combat.js        # (reservado) Lógica de combate
```

---

## Reglas de arquitectura

- **Todo `querySelector` va en `dom.js`**. No usar `querySelector` fuera de `dom.js` bajo ninguna circunstancia.
- **`render.js` nunca muta estado**. Si necesita ejecutar lógica de estado (ej. equipar ítem), recibe un callback: `renderRewardModal(item, autoEquipped, onEquip)`.
- **`event.js` es el coordinador**: escucha acciones del usuario → llama `state.js` → llama `render.js`.
- **`config.js` solo exporta datos**. No importa nada, todo en `Object.freeze()`.
- **`items.config.js` solo exporta datos**. Mismo patrón que `config.js`.
- **`COLORS` en `render.js` es interno** — sin `export`, no se importa desde otros módulos.

---

## Estado en localStorage

| Clave | Contenido |
|---|---|
| `anti_procrastination_cat_state` | `{ primary, shadow, light, scale }` — colores y escala del gato |
| `apq_quests` | `[{ id, nombre, estado }]` — array de quests |
| `apq_total_completadas` | `{ misionesCompletas: number, cofresDisponibles: number }` |
| `apq_michi_state` | `{ hp, atk, def, equipped: { weapon, armor, hat } }` |

---

## Modelo de datos

**Quest:**
```js
{ id: string, nombre: string, estado: "pendiente" | "activa" | "completada" }
```

**Ítem:**
```js
{ id: string, nombre: string, slot: "weapon" | "armor" | "hat", stat: "hp" | "atk" | "def", bonus: number, img: string }
```

Las imágenes de ítems viven en `Assets/Images/items/`.
Las imágenes de íconos viven en `Assets/Images/icons/`.

---

## Gato pixel art

El gato se renderiza con `box-shadow` sobre un único `div.pixel` por parte (`.head`, `.body-cat`, `.paw`). El tamaño se calcula adaptativamente:

```
pixelSize = clamp(floor(container.offsetWidth / 17), 4, 32)
```

Los ítems equipados se renderizan como `<img class="equipped-item equipped-{slot}">` dentro de `.cat-wrapper`.

---

## Arquitectura CSS

```
Assets/CSS/
  main.css          # Importa todos los layers
  tokens/tokens.css # Variables CSS — colores, espaciado, tipografía, z-index, transiciones
  layout.css        # Estructura de página — grid, flex, navbar, sidebar, containers
  components.css    # Componentes reutilizables — botones, inputs, modales, quests, tabs
  cat/cat.css       # Estilos exclusivos del gato pixel art y ítems equipados
  cat/cat-motion.css# Animaciones del gato — @keyframes saludar comentado, listo para activar
```

**Reglas CSS:**
- **Cada regla va en el archivo que corresponde** a su naturaleza — no crear archivos CSS nuevos.
- **Solo usar tokens de `tokens.css`** — no hardcodear valores ni inventar tokens nuevos sin necesidad.
- **Responsive en los bloques `@media` ya existentes** en `layout.css` y `components.css` — no crear archivos nuevos ni bloques `@media` sueltos.
- **`image-rendering: pixelated`** en todas las imágenes pixel art (íconos PNG, ítems equipados).
- **`box-sizing: border-box`** en componentes que usen `width: 100%` con padding o border.

---

## Reglas HTML

- **Etiquetas semánticas** según el contexto: `<article>`, `<header>`, `<footer>`, `<section>`, `<nav>`, `<aside>`, `<figure>`.
- **Íconos decorativos** (texto adyacente explica el significado): `alt=""` + `aria-hidden="true"`.
- **Íconos funcionales** (único comunicador de acción): `alt` descriptivo.
- **`<option>` no soporta imágenes** — solo texto, nunca agregar `<img>` dentro de `<option>`.
- **Scripts** con `type="module"` al cierre del `<body>`.
- **`</head>` siempre cerrado** antes de `<body>`.

---

## Workflow de cambios

1. **`dom.js`** — agregar selectores si el cambio requiere nuevos elementos del DOM
2. **`config.js` / `items.config.js`** — agregar constantes o datos nuevos
3. **`state.js`** — agregar lógica de estado y persistencia
4. **`render.js`** — agregar o modificar funciones de renderizado
5. **`event.js`** — registrar listeners y coordinar el flujo

No hay lint ni test. Verificar manualmente en navegador con DevTools abierto.

---

## Páginas

| Archivo | Estado |
|---|---|
| `index.html` | Funcional — tablón de misiones, gato, progreso, cofre |
| `Pages/personalization_page.html` | Pendiente de implementar |
| `Pages/arena_page.html` | Pendiente de implementar |