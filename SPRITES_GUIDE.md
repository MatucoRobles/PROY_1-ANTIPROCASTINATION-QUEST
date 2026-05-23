# Guía de Sprites Pixel Art — Anti-Procrastination Quest

## 1. Cómo funciona el sistema

El gato se renderiza usando la técnica de **box-shadow con múltiples sombras**, donde cada pixel del sprite es un shadow offset en 2D. Un solo `div.pixel` genera la figura completa.

```
.pixel {
  width: var(--pixel-size);
  height: var(--pixel-size);
  box-shadow: [x1]px [y1]px [color], [x2]px [y2]px [color], ...;
}
```

**Ejemplo simplificado** (gato de 3x3):

```
.pixel {
  width: 16px;
  height: 16px;
  box-shadow: 0px 0px #000, 16px 0px #fff, 32px 0px #000,
              0px 16px #fff, 16px 16px #ffb347, 32px 16px #fff,
              0px 32px #000, 16px 32px #fff, 32px 32px #000;
}
```

---

## 2. Estructura de archivos

```
Assets/
├── CSS/
│   ├── main.css              ← importa todos los layers
│   ├── tokens/tokens.css     ← variables CSS (colores, --pixel-size, --cat-scale)
│   ├── cat/cat.css           ← estilos del componente (.cat-wrapper, .head, .body-cat, .paw, .pixel)
│   └── cat/cat-motion.css    ← animaciones (saludar comentada, breathing)
└── Js/
    ├── config.js             ← pixel maps, constantes, configuración
    ├── dom.js                ← selectores del DOM
    ├── state.js              ← estado global + localStorage
    ├── render.js             ← renderizado del gato
    ├── event.js              ← eventos de inputs y resize
    └── main.js               ← punto de entrada
```

---

## 3. Agregar un nuevo color al gato

### 3.1 Colores disponibles (índice en `COLORS`)

| Índice | Nombre      | Uso                              |
|--------|-------------|----------------------------------|
| 0      | transparent | vacío (no genera shadow)        |
| 1      | black       | contorno, líneas                 |
| 2      | white       | espacios vacíos internos         |
| 3      | primary     | **color principal** (modificable) |
| 4      | shadow      | **sombra** (modificable)         |
| 5      | light       | **luz** (modificable)            |
| 6      | accent      | detalles (ojos, nariz)           |

Los índices `3`, `4`, `5` son los que se cambian dinámicamente desde los inputs de color.

### 3.2 Cambiar un color dinámicamente

```js
import { state } from "./state.js";
import { renderAll } from "./render.js";

// state.primary, state.shadow, state.light son hex strings
state.primary = "#ff6b6b";
renderAll();
```

O a través de `patchState`:

```js
import { patchState } from "./state.js";
import { renderAll } from "./render.js";

patchState({ primary: "#ff6b6b" });
renderAll();
```

---

## 4. Crear un sprite nuevo (nueva figura)

### 4.1 Diseñar el pixel map

Cada sprite se define como un **array de números**. Cada número representa un color (índice de `COLORS`).

**Pasos:**

1. Diseña tu sprite en una grilla (ej. 17 columnas máximo).
2. Asigna cada celda a un color usando los índices (`0` = vacío, `1` = negro, `2` = blanco, `3/4/5` = colores configurables).
3. Convierte cada fila en un array unidimensional.

**Ejemplo — cabeza de gato (17x16):**

```
Fila 0:  1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1
Fila 1:  1,3,3,3,3,1,0,0,0,0,0,1,3,3,3,3,1
Fila 2:  1,3,5,5,3,3,1,1,1,1,1,3,3,5,5,3,1
... etc
```

### 4.2 Registrar el pixel map en `config.js`

```js
export const PIXEL_MAPS = Object.freeze({
  // ... existentes ...

  // Nuevo sprite ejemplo (9 columnas x 6 filas)
  CAT_NEW_SPRITE: Object.freeze([
    1,1,1,1,1,1,1,0,0,
    3,3,3,3,3,3,3,1,0,
    3,3,3,3,3,3,3,3,1,
    3,3,3,3,3,3,3,3,1,
    3,3,3,3,3,3,3,1,0,
    1,1,1,1,1,1,1,0,0,
  ]),
  CAT_NEW_SPRITE_COLS: 9,
});
```

### 4.3 Agregar la estructura HTML

```html
<div class="cat-wrapper" aria-label="Nuevo sprite">
    <div class="head">
        <div class="pixel"></div>
    </div>
    <div class="body-cat">
        <div class="pixel"></div>
        <div class="paw">
            <div class="pixel"></div>
        </div>
    </div>
</div>
```

Para un sprite **diferente** (no el gato), podrías crear una nueva estructura:

```html
<div class="sprite-wrapper" data-sprite="nuevo">
    <div class="sprite-part" data-part="head">
        <div class="pixel"></div>
    </div>
</div>
```

### 4.4 Registrar el elemento en `dom.js`

```js
export const elements = Object.freeze({
  head: document.querySelector(".head"),
  bodyCat: document.querySelector(".body-cat"),
  paw: document.querySelector(".paw"),
  // Nuevo sprite:
  newPart: document.querySelector(".sprite-part"),
});
```

### 4.5 Agregar renderizado en `render.js`

```js
import { PIXEL_MAPS, COLOR_INDICES, /* ... */ } from "./config.js";

function renderPixelArt(container, pixels, cols, pixelSize) {
    // ... código existente ...
}

// Agregar al array de catParts en renderCat():
const catParts = [
    // ... partes existentes ...
    { element: elements.newPart, pixels: PIXEL_MAPS.CAT_NEW_SPRITE, cols: PIXEL_MAPS.CAT_NEW_SPRITE_COLS },
];
```

---

## 5. Agregar sprite a una página HTML

### 5.1 Estructura HTML mínima

```html
<div class="cat-wrapper" aria-label="Gato pixel art">
    <div class="head">
        <div class="pixel"></div>
    </div>
    <div class="body-cat">
        <div class="pixel"></div>
        <div class="paw">
            <div class="pixel"></div>
        </div>
    </div>
</div>
```

### 5.2 Incluir el script del módulo

```html
<script type="module" src="Assets/Js/main.js"></script>
```

**Importante:** la página debe cargar el CSS que incluya `cat.css` (es decir, usar `main.css` o importar el layer `cat` directamente).

### 5.3 Clases de contenedor opcionales

Puedes escalar el gato con CSS usando `--cat-scale`:

```css
.mi-contenedor .cat-wrapper {
    --cat-scale: 0.5;  /* mitad de tamaño */
}
```

O directamente desde JS:

```js
patchState({ scale: 0.5 });
```

---

## 6. Sistema de colores dinámicos

### 6.1 Inputs externos

El gato responde a estos inputs cuando existen en el DOM:

| Input ID        | Efecto                        |
|-----------------|------------------------------|
| `#cat-primary`  | Color principal del cuerpo   |
| `#cat-shadow`  | Color de sombra/detalles     |
| `#cat-light`   | Color de luz/reflejo         |
| `#cat-scale`    | Escala del gato (0.5 - 4)    |

Si un input no existe, el sistema lo ignora sin errores (`null` checked).

### 6.2 Persistencia

El estado se guarda en `localStorage` con la key `anti_procrastination_cat_state`.

```js
// Estructura guardada:
{
  primary: "#ffb347",
  shadow: "#e6953b",
  light: "#ffd08a",
  scale: 1
}
```

---

## 7. Responsive y tamaño adaptativo

### 7.1 Cómo se calcula el tamaño

```
pixelSize = clamp(floor(container.offsetWidth / 17), 4, 32)
```

- Se divide el ancho del contenedor `.head` por 17 (columnas de la parte más ancha).
- Se usa un mínimo de `4px` y máximo de `32px`.
- El valor se escribe como `--pixel-size` inline en `.cat-wrapper`.

### 7.2 Forzar un tamaño fijo

Si necesitas un tamaño fijo (ej. el gato pequeño del sidebar):

```css
.current-michi-card .cat-wrapper {
    --cat-scale: 0.5;
}
```

### 7.3 Media query para ajustes globales

```css
@media (max-width: 480px) {
    :root {
        --pixel-size: 8px;
    }
}
```

---

## 8. Animación de saludar (comentada)

La animación `@keyframes saludar` está comentada en `cat-motion.css`. Para activarla:

```css
.paw {
    /* animation: saludar linear 2s infinite; */  ← descomentar esta línea
}
```

Y descomentar la definición del keyframe:

```css
@keyframes saludar {
    0%   { transform: rotate(0deg); }
    25%  { transform: rotate(10deg); }
    50%  { transform: rotate(0deg); }
    75%  { transform: rotate(-10deg); }
    100% { transform: rotate(0deg); }
}
```

---

## 9. Accesibilidad

El `aria-label` del `.cat-wrapper` se genera dinámicamente:

```js
`Gato pixel art, color ${colorName}, escala ${scale}`
```

Los elementos internos `.pixel`, `.head`, `.body-cat`, `.paw` son puramente decorativos.

---

## 10. Checklist para nuevo sprite

- [ ] Diseñar grilla y definir array de pixels
- [ ] Agregar pixel map a `config.js` (`PIXEL_MAPS`)
- [ ] Agregar constante de columnas a `config.js`
- [ ] Crear estructura HTML con `.pixel` interno
- [ ] Registrar selector en `dom.js`
- [ ] Agregar parte a `catParts` en `render.js`
- [ ] Incluir `<script type="module">` en el HTML destino
- [ ] Verificar que el CSS con layer `cat` está cargado
- [ ] Probar en navegador (DevTools → verificar `box-shadow` en `.pixel`)