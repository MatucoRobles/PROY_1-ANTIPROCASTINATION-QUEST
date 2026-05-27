import { PIXEL_MAPS, COLOR_INDICES, CSS_VARS, PIXEL_SIZE_CONFIG, CAT_MAX_COLS, QUEST_BADGE_ICONS, ICON_IMG_MAP } from "./config.js";
import { state, getProgress, michiState, isInventoryFull, loadInventory, equipItem } from "./state.js"; 
import { elements, questList, btnOpenChest, catWrapper, stats } from "./dom.js";
import { ITEM_POOL } from "./items.config.js";
const COLORS = {
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

function createBoxShadow(pixels, cols, pixelSize, colorsMap = COLORS) {
  return pixels
    .map((pixelValue, index) => {
      if (pixelValue === 0) return null;

      const x = pixelSize * (index % cols);
      const y = pixelSize * Math.floor(index / cols);

      return `${x}px ${y}px ${colorsMap[pixelValue]}`;
    })
    .filter(Boolean)
    .join(",");
}

function renderPixelArt(container, pixels, cols, pixelSize, colorsMap = COLORS) {
  const pixel = container.querySelector(".pixel");
  if (!pixel) return;

  if (!pixelSize || isNaN(pixelSize) || pixelSize <= 0) {
    console.warn("[render] pixelSize inválido, abortando render del gato.");
    return;
  }

  const rows = Math.ceil(pixels.length / cols);

  pixel.style.boxShadow = createBoxShadow(pixels, cols, pixelSize, colorsMap);
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

  if (catWrapper) {
    catWrapper.style.setProperty("--pixel-size", `${pixelSize}px`);
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
  if (!catWrapper) return;
  const colorName = state.primary.replace("#", "").toUpperCase();
  catWrapper.setAttribute(
    "aria-label",
    `Gato pixel art, color ${colorName}, escala ${state.scale}`
  );
}

export function renderAll() {
  renderCssVariables();
  syncColorsMap();
  renderCat();
  updateAriaLabel();
  renderEquippedItems();
  renderStats();
}

export function renderEquippedItems() {
  const slots = ["weapon", "armor", "hat"];
  slots.forEach((slot) => {
    const item = michiState.equipped[slot];
    const existing = document.querySelector(`.equipped-item[data-slot="${slot}"]`);
    if (existing) existing.remove();
    if (!item) return;

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.nombre;
    img.className = `equipped-item equipped-${slot}`;
    img.dataset.slot = slot;

    catWrapper?.appendChild(img);
  });
}

export function renderStats() {
  if (stats.hp) stats.hp.textContent = michiState.hp;
  if (stats.atk) stats.atk.textContent = michiState.atk;
  if (stats.def) stats.def.textContent = michiState.def;
}

export function renderRewardModal(item, autoEquipped, onEquip) {
  const existing = document.querySelector(".reward-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "reward-overlay rpg-modal-overlay";

  const modalBox = document.createElement("div");
  modalBox.className = "reward-modal rpg-modal-box";

  const title = document.createElement("h3");
  title.className = "rpg-box-title";
  title.textContent = "¡RECOMPENSA!";

  const name = document.createElement("p");
  name.textContent = item.nombre;

  const bonus = document.createElement("p");
  bonus.textContent = `+${item.bonus} ${item.stat.toUpperCase()}`;

  const closeBtn = document.createElement("button");
  closeBtn.className = "btn-pixel btn-green";
  closeBtn.id = "btn-close-reward";
  closeBtn.textContent = "CERRAR";
  closeBtn.addEventListener("click", () => overlay.remove());

  const buttonsDiv = document.createElement("div");
  buttonsDiv.appendChild(closeBtn);

  if (autoEquipped) {
    const autoNote = document.createElement("p");
    autoNote.className = "pixel-subtext";
    autoNote.textContent = "¡Equipado automáticamente!";
    modalBox.appendChild(title);
    modalBox.appendChild(name);
    modalBox.appendChild(bonus);
    modalBox.appendChild(autoNote);
  } else {
    const equipBtn = document.createElement("button");
    equipBtn.className = "btn-pixel btn-green";
    equipBtn.id = "btn-equip-item";
    equipBtn.textContent = "EQUIPAR";
    equipBtn.addEventListener("click", () => {
      onEquip(item);
      overlay.remove();
    });

    const discardBtn = document.createElement("button");
    discardBtn.className = "btn-pixel btn-red";
    discardBtn.id = "btn-discard-item";
    discardBtn.textContent = "DESCARTAR";
    discardBtn.addEventListener("click", () => overlay.remove());

    modalBox.appendChild(title);
    modalBox.appendChild(name);
    modalBox.appendChild(bonus);
    buttonsDiv.insertBefore(equipBtn, closeBtn);
    buttonsDiv.insertBefore(discardBtn, closeBtn);
  }

  modalBox.appendChild(buttonsDiv);
  overlay.appendChild(modalBox);
  document.body.appendChild(overlay);
}

export function getIconImg(iconKey, alt, width = 14, height = 14) {
  const src = ICON_IMG_MAP[iconKey];
  if (!src) return "";
  return `<img src="${src}" alt="${alt}" class="rpg-icon-img" width="${width}" height="${height}">`;
}

export function renderQuestCard(quest) {
  const article = document.createElement("article");
  article.className = `quest-item-card pixel-border-inner status-${quest.estado}`;
  article.dataset.id = quest.id;

  const iconKey = QUEST_BADGE_ICONS[quest.estado] || "helmet";
  const estadoUpper = quest.estado.toUpperCase();

  article.innerHTML = `
    <header class="quest-info">
      <span class="quest-badge">${getIconImg(iconKey, "", 14, 14)} ${estadoUpper}</span>
      <p class="quest-name-text">${quest.nombre}</p>
    </header>
    <footer class="quest-actions">
      ${quest.estado !== "completada" ? `<button class="btn-pixel btn-blue small" data-action="complete" data-id="${quest.id}">✔</button>` : ""}
      <button class="btn-pixel btn-red small" data-action="delete" data-id="${quest.id}">✖</button>
    </footer>
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

export function renderProgress() {
  const { completadas, porcentaje, cofresDisponibles } = getProgress();
  const progressBar = document.querySelector("#main-progress-bar");
  const progressText = document.querySelector("#progress-text");

  if (progressBar) {
    progressBar.style.width = `${porcentaje}%`;
  }
  if (progressText) {
    progressText.textContent = `${porcentaje}% Completado (${completadas} Misiones)`;
  }
  renderChestButton(cofresDisponibles);
}

export function renderChestButton(cofresDisponibles) {
  const btn = btnOpenChest;
  const container = btn?.parentElement;
  if (!btn || !container) return;

  const existing = container.querySelector(".inventory-full-msg");
  if (existing) existing.remove();

  if (isInventoryFull()) {
    btn.classList.add("hidden");
    const msg = document.createElement("p");
    msg.className = "pixel-subtext inventory-full-msg";
    msg.textContent = "INVENTARIO COMPLETO";
    container.appendChild(msg);
    return;
  }

  btn.classList.remove("hidden");
  btn.disabled = cofresDisponibles <= 0;
}

export function renderTabs(activeFilter) {
  const tabs = document.querySelectorAll(".tab-item");
  tabs.forEach((tab) => {
    if (tab.dataset.filter === activeFilter) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
}

// --- RENDERIZADO DE LA UI DE EQUIPAMIENTO E INVENTARIO ---

export function renderEquipmentUI() {
  const slots = ["hat", "weapon", "armor"];
  
  slots.forEach(slotType => {
      const container = document.querySelector(`#slot-${slotType}-container`);
      if (!container) return; 
      
      const item = michiState.equipped[slotType];
      container.innerHTML = ""; 
      
      if (item) {
          const img = document.createElement("img");
          img.src = item.img;
          img.title = item.nombre;
          
          // FORZAMOS A LA IMAGEN A LLENAR EL CUADRADO
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "contain";
          img.style.imageRendering = "pixelated";
          
          container.appendChild(img);
      } else {
          container.innerHTML = '<span class="slot-status empty">VACÍO</span>';
      }
  });
}

export function renderInventoryUI() {
  const grid = document.querySelector("#inventory-grid");
  if (!grid) return; 

  const inventoryIds = loadInventory();
  grid.innerHTML = "";

  if (inventoryIds.length === 0) {
      grid.innerHTML = '<li class="full-width-item">Sin artefactos en la mochila. ¡Completa misiones para farmear equipamiento!</li>';
      return;
  }

  inventoryIds.forEach(id => {
      const item = ITEM_POOL.find(i => i.id === id);
      if (!item) return;

      const li = document.createElement("li");
      li.className = "rpg-item-slot pixel-border-inner";
      
      const isEquipped = Object.values(michiState.equipped).some(eq => eq && eq.id === id);
      if (isEquipped) {
          li.style.borderColor = "var(--stamina-green)"; 
          li.style.opacity = "0.6";
      }

      li.innerHTML = `
          <div class="slot-icon-container" style="border:none; box-shadow:none; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
              <img src="${item.img}" title="${item.nombre}" alt="${item.nombre}" style="cursor:pointer; width:90%; height:90%; object-fit:contain; image-rendering:pixelated;">
          </div>
      `;
      
      li.addEventListener("click", () => {
          equipItem(item); 
          renderEquipmentUI(); 
          renderEquippedItems(); 
          renderStats(); 
          renderInventoryUI(); 
      });
      
      grid.appendChild(li);
  });
}