import { michiState, loadMichiState } from "./state.js";
import { exportMichiCode, importMichiCode, importMichiHash } from "./customization.js";
import { simulateBattle } from "./combat.js";
import { PIXEL_MAPS, COLOR_INDICES } from "./config.js";
import { arena, dynamicElements } from "./dom.js";

// Renderiza el sprite del michi rival en la arena
function renderRivalCat(rival) {
  // Selecciona los elementos del rival
  const rivalHead = arena.rivalHead;
  const rivalBody = arena.rivalBody;
  const rivalPaw = arena.rivalPaw;
  // Colores personalizados
  const colors = {
    0: "transparent",
    1: "#000000",
    2: "#ffffff",
    3: rival.primary || "#ffb347",
    4: rival.shadow || "#e6953b",
    5: rival.light || "#ffd08a",
    6: "#ff6b6b",
  };

  // Calculamos dinámicamente el pixelSize igual que en el render local del michi
  let pixelSize = 8;
  const container = arena.rivalContainer;
  if (container) {
    const calculated = Math.floor(container.offsetWidth / PIXEL_MAPS.CAT_HEAD_COLS);
    pixelSize = Math.max(4, Math.min(calculated, 32));
    container.style.setProperty("--pixel-size", `${pixelSize}px`);
  }

  // Renderizar cabeza
  if (rivalHead) {
    const pixel = dynamicElements.getPixel(rivalHead);
    if (pixel) {
      pixel.style.boxShadow = PIXEL_MAPS.CAT_HEAD.map((v, i) => v === 0 ? null : `${pixelSize * (i % PIXEL_MAPS.CAT_HEAD_COLS)}px ${pixelSize * Math.floor(i / PIXEL_MAPS.CAT_HEAD_COLS)}px ${colors[v]}`).filter(Boolean).join(",");
      rivalHead.style.width = `${PIXEL_MAPS.CAT_HEAD_COLS * pixelSize}px`;
      rivalHead.style.height = `${Math.ceil(PIXEL_MAPS.CAT_HEAD.length / PIXEL_MAPS.CAT_HEAD_COLS) * pixelSize}px`;
    }
  }
  // Renderizar cuerpo
  if (rivalBody) {
    const pixel = dynamicElements.getPixel(rivalBody);
    if (pixel) {
      pixel.style.boxShadow = PIXEL_MAPS.CAT_BODY.map((v, i) => v === 0 ? null : `${pixelSize * (i % PIXEL_MAPS.CAT_BODY_COLS)}px ${pixelSize * Math.floor(i / PIXEL_MAPS.CAT_BODY_COLS)}px ${colors[v]}`).filter(Boolean).join(",");
      rivalBody.style.width = `${PIXEL_MAPS.CAT_BODY_COLS * pixelSize}px`;
      rivalBody.style.height = `${Math.ceil(PIXEL_MAPS.CAT_BODY.length / PIXEL_MAPS.CAT_BODY_COLS) * pixelSize}px`;
    }
  }
  // Renderizar pata
  if (rivalPaw) {
    const pixel = dynamicElements.getPixel(rivalPaw);
    if (pixel) {
      pixel.style.boxShadow = PIXEL_MAPS.CAT_PAWS.map((v, i) => v === 0 ? null : `${pixelSize * (i % PIXEL_MAPS.CAT_PAWS_COLS)}px ${pixelSize * Math.floor(i / PIXEL_MAPS.CAT_PAWS_COLS)}px ${colors[v]}`).filter(Boolean).join(",");
      rivalPaw.style.width = `${PIXEL_MAPS.CAT_PAWS_COLS * pixelSize}px`;
      rivalPaw.style.height = `${Math.ceil(PIXEL_MAPS.CAT_PAWS.length / PIXEL_MAPS.CAT_PAWS_COLS) * pixelSize}px`;
    }
  }

  // Renderizar equipamiento para que el michi se vea completo
  if (container && rival.equipped) {
    const existing = dynamicElements.getOpponentEquippedItems();
    existing.forEach(e => e.remove());

    const slots = ["weapon", "armor", "hat"];
    slots.forEach((slot) => {
      const item = rival.equipped[slot];
      if (!item) return;
      const img = document.createElement("img");
      img.src = item.img;
      img.alt = item.nombre;
      img.className = `equipped-item equipped-${slot}`;
      img.dataset.slot = slot;
      container.appendChild(img);
    });
  }
}

// DOM Elements
const input = arena.inputCode;
const btnLoad = arena.btnLoad;
const btnStart = arena.btnStart;
const logOutput = arena.logOutput;
const localName = arena.localName;
const opponentName = arena.opponentName;
const localHpBar = arena.localHpBar;
const opponentHpBar = arena.opponentHpBar;
const localHpText = arena.localHpText;
const opponentHpText = arena.opponentHpText;

let rivalMichi = null;

function logBattle(msg) {
  if (!logOutput) return;
  const p = document.createElement("p");
  p.className = "log-line";
  p.textContent = "> " + msg;
  logOutput.appendChild(p);
  logOutput.scrollTop = logOutput.scrollHeight;
}

function clearLog() {
  if (!logOutput) return;
  logOutput.innerHTML = '<p class="log-line system">> Sistema listo. Esperando inicio de combate...</p>';
  const wrappers = dynamicElements.getAllWrappers();
  wrappers.forEach(w => w.classList.remove("anim-hit", "anim-attack", "anim-win", "anim-lose"));
}

function triggerAnim(target, cls) {
  const wrapper = target === "local"
    ? dynamicElements.getLocalWrapper()
    : dynamicElements.getOpponentWrapper();
  if (!wrapper) return;

  wrapper.classList.remove("anim-hit", "anim-attack", "anim-win", "anim-lose");
  void wrapper.offsetWidth;
  wrapper.classList.add(cls);

  if (cls !== "anim-win" && cls !== "anim-lose") {
    wrapper.addEventListener("animationend", () => wrapper.classList.remove(cls), { once: true });
  }
}

function updateHP(localHP, rivalHP, localMax, rivalMax) {
  if (localHpBar) localHpBar.style.width = `${(localHP / localMax) * 100}%`;
  if (opponentHpBar) opponentHpBar.style.width = `${(rivalHP / rivalMax) * 100}%`;
  if (localHpText) localHpText.textContent = `${localHP}/${localMax} HP`;
  if (opponentHpText) opponentHpText.textContent = `${rivalHP}/${rivalMax} HP`;
}

if (btnLoad) {
  btnLoad.addEventListener("click", (e) => {
    e.preventDefault();
    const code = input.value.trim();
    let rival = importMichiCode(code);
    if (!rival) {
      // Si no es JSON, intenta como HASH
      rival = importMichiHash(code);
    }
    if (!rival) {
      alert("Código inválido o corrupto");
      return;
    }
    rivalMichi = rival;
    opponentName.textContent = rival.nombre || "RIVAL_MICHI";
    updateHP(michiState.hp || 100, rival.hp, michiState.hp || 100, rival.hp);
    renderRivalCat(rival);
    clearLog();
    logBattle("Rival cargado correctamente.");
  });
}

if (btnStart) {
  btnStart.addEventListener("click", async () => {
    if (!rivalMichi) {
      alert("Primero carga un rival.");
      return;
    }
    btnStart.disabled = true;
    clearLog();
    const localFighter = { ...michiState, hp: michiState.hp || 100, atk: michiState.atk || 10, def: michiState.def || 5 };
    await await simulateBattle(
      localFighter,
      rivalMichi,
      (msg) => logBattle(msg),
      (localHP, rivalHP) => updateHP(localHP, rivalHP, localFighter.hp, rivalMichi.hp),
      (target, cls) => triggerAnim(target, cls)
    );
    btnStart.disabled = false;
  });
}

// Exportar código del michi local (para copiar en personalización)
window.exportMichiCode = exportMichiCode;
