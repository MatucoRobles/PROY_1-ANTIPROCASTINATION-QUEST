import { PIXEL_MAPS, COLOR_INDICES, CSS_VARS, PIXEL_SIZE_CONFIG, CAT_MAX_COLS, QUEST_BADGE_ICONS } from "./config.js";
import { state } from "./state.js";
import { elements, questList } from "./dom.js";

export const COLORS = {
  0: "transparent",
  1: "#000000",
  2: "#ffffff",
  3: "#ffb347",
  4: "#e6953b",
  5: "#ffd08a",
  6: "#ff6b6b",
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getAdaptivePixelSize(container) {
  if (!container) return PIXEL_SIZE_CONFIG.default;
  const cols = CAT_MAX_COLS;
  const availableWidth = container.offsetWidth;
  const calculated = Math.floor(availableWidth / cols);
  return clamp(calculated, PIXEL_SIZE_CONFIG.min, PIXEL_SIZE_CONFIG.max);
}

function createBoxShadow(pixels, cols, pixelSize) {
  return pixels
    .map((pixelValue, index) => {
      if (pixelValue === 0) return null;

      const x = pixelSize * (index % cols);
      const y = pixelSize * Math.floor(index / cols);

      return `${x}px ${y}px ${COLORS[pixelValue]}`;
    })
    .filter(Boolean)
    .join(",");
}

function renderPixelArt(container, pixels, cols, pixelSize) {
  const pixel = container.querySelector(".pixel");
  if (!pixel) return;

  if (!pixelSize || isNaN(pixelSize) || pixelSize <= 0) {
    console.warn("[render] pixelSize inválido, abortando render del gato.");
    return;
  }

  const rows = Math.ceil(pixels.length / cols);

  pixel.style.boxShadow = createBoxShadow(pixels, cols, pixelSize);
  container.style.width = `${cols * pixelSize}px`;
  container.style.height = `${rows * pixelSize}px`;
}

export function renderCat() {
  const catParts = [
    { element: elements.head, pixels: PIXEL_MAPS.CAT_HEAD, cols: PIXEL_MAPS.CAT_HEAD_COLS },
    { element: elements.bodyCat, pixels: PIXEL_MAPS.CAT_BODY, cols: PIXEL_MAPS.CAT_BODY_COLS },
    { element: elements.paw, pixels: PIXEL_MAPS.CAT_PAWS, cols: PIXEL_MAPS.CAT_PAWS_COLS },
  ];

  const pixelSize = getAdaptivePixelSize(elements.head);

  catParts.forEach((part) => {
    if (part.element) {
      renderPixelArt(part.element, part.pixels, part.cols, pixelSize);
    }
  });

  const wrapper = document.querySelector(".cat-wrapper");
  if (wrapper) {
    wrapper.style.setProperty("--pixel-size", `${pixelSize}px`);
  }
}

export function renderCssVariables() {
  const root = document.documentElement;
  root.style.setProperty(CSS_VARS.primary, state.primary);
  root.style.setProperty(CSS_VARS.shadow, state.shadow);
  root.style.setProperty(CSS_VARS.light, state.light);
  root.style.setProperty(CSS_VARS.scale, state.scale);
}

export function syncColorsMap() {
  COLORS[COLOR_INDICES.primary] = state.primary;
  COLORS[COLOR_INDICES.shadow] = state.shadow;
  COLORS[COLOR_INDICES.light] = state.light;
}

export function updateAriaLabel() {
  const wrapper = document.querySelector(".cat-wrapper");
  if (!wrapper) return;

  const colorName = state.primary.replace("#", "").toUpperCase();
  wrapper.setAttribute(
    "aria-label",
    `Gato pixel art, color ${colorName}, escala ${state.scale}`
  );
}

export function renderAll() {
  renderCssVariables();
  syncColorsMap();
  renderCat();
  updateAriaLabel();
}

export function renderQuestCard(quest) {
  const article = document.createElement("article");
  article.className = `quest-item-card pixel-border-inner status-${quest.estado}`;
  article.dataset.id = quest.id;

  const icon = QUEST_BADGE_ICONS[quest.estado] || "";
  const estadoUpper = quest.estado.toUpperCase();

  article.innerHTML = `
    <header class="quest-info">
      <span class="quest-badge">${icon} ${estadoUpper}</span>
      <p class="quest-name-text">${quest.nombre}</p>
    </header>
    <footer class="quest-actions"></footer>
  `;

  return article;
}

export function renderQuestList(quests) {
  if (!questList) return;

  questList.innerHTML = "";

  if (quests.length === 0) {
    const p = document.createElement("p");
    p.className = "pixel-subtext";
    p.textContent = "No hay misiones registradas.";
    questList.appendChild(p);
    return;
  }

  quests.forEach((quest) => {
    questList.appendChild(renderQuestCard(quest));
  });
}