import { michiState, loadMichiState } from "./state.js";
import { exportMichiCode, importMichiCode, importMichiHash } from "./customization.js";
import { simulateBattle } from "./combat.js";
import { PIXEL_MAPS, COLOR_INDICES } from "./config.js";
// Renderiza el sprite del michi rival en la arena
function renderRivalCat(rival) {
  // Selecciona los elementos del rival
  const rivalHead = document.querySelector(".player-opponent .head");
  const rivalBody = document.querySelector(".player-opponent .body-cat");
  const rivalPaw = document.querySelector(".player-opponent .paw");
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
  const container = document.querySelector(".player-opponent .fighter-sprite-display");
  if (container) {
    const calculated = Math.floor(container.offsetWidth / PIXEL_MAPS.CAT_HEAD_COLS);
    pixelSize = Math.max(4, Math.min(calculated, 32));
    container.style.setProperty("--pixel-size", `${pixelSize}px`);
  }

  // Renderizar cabeza
  if (rivalHead) {
    const pixel = rivalHead.querySelector(".pixel");
    if (pixel) {
      pixel.style.boxShadow = PIXEL_MAPS.CAT_HEAD.map((v, i) => v === 0 ? null : `${pixelSize * (i % PIXEL_MAPS.CAT_HEAD_COLS)}px ${pixelSize * Math.floor(i / PIXEL_MAPS.CAT_HEAD_COLS)}px ${colors[v]}`).filter(Boolean).join(",");
      rivalHead.style.width = `${PIXEL_MAPS.CAT_HEAD_COLS * pixelSize}px`;
      rivalHead.style.height = `${Math.ceil(PIXEL_MAPS.CAT_HEAD.length / PIXEL_MAPS.CAT_HEAD_COLS) * pixelSize}px`;
    }
  }
  // Renderizar cuerpo
  if (rivalBody) {
    const pixel = rivalBody.querySelector(".pixel");
    if (pixel) {
      pixel.style.boxShadow = PIXEL_MAPS.CAT_BODY.map((v, i) => v === 0 ? null : `${pixelSize * (i % PIXEL_MAPS.CAT_BODY_COLS)}px ${pixelSize * Math.floor(i / PIXEL_MAPS.CAT_BODY_COLS)}px ${colors[v]}`).filter(Boolean).join(",");
      rivalBody.style.width = `${PIXEL_MAPS.CAT_BODY_COLS * pixelSize}px`;
      rivalBody.style.height = `${Math.ceil(PIXEL_MAPS.CAT_BODY.length / PIXEL_MAPS.CAT_BODY_COLS) * pixelSize}px`;
    }
  }
  // Renderizar pata
  if (rivalPaw) {
    const pixel = rivalPaw.querySelector(".pixel");
    if (pixel) {
      pixel.style.boxShadow = PIXEL_MAPS.CAT_PAWS.map((v, i) => v === 0 ? null : `${pixelSize * (i % PIXEL_MAPS.CAT_PAWS_COLS)}px ${pixelSize * Math.floor(i / PIXEL_MAPS.CAT_PAWS_COLS)}px ${colors[v]}`).filter(Boolean).join(",");
      rivalPaw.style.width = `${PIXEL_MAPS.CAT_PAWS_COLS * pixelSize}px`;
      rivalPaw.style.height = `${Math.ceil(PIXEL_MAPS.CAT_PAWS.length / PIXEL_MAPS.CAT_PAWS_COLS) * pixelSize}px`;
    }
  }

  // Renderizar equipamiento para que el michi se vea completo
  if (container && rival.equipped) {
    const existing = container.querySelectorAll(".equipped-item");
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
const input = document.getElementById("opponent-code-input");
const btnLoad = document.getElementById("btn-load-opponent");
const btnStart = document.getElementById("btn-start-simulation");
const logOutput = document.getElementById("battle-log-output");
const localName = document.getElementById("local-name");
const opponentName = document.getElementById("opponent-name");
const localHpBar = document.getElementById("local-hp-bar");
const opponentHpBar = document.getElementById("opponent-hp-bar");
const localHpText = document.getElementById("local-hp-text");
const opponentHpText = document.getElementById("opponent-hp-text");

let rivalMichi = null;

function logBattle(msg) {
  const p = document.createElement("p");
  p.className = "log-line";
  p.textContent = "> " + msg;
  logOutput.appendChild(p);
  logOutput.scrollTop = logOutput.scrollHeight;
}

function clearLog() {
  logOutput.innerHTML = '<p class="log-line system">> Sistema listo. Esperando inicio de combate...</p>';
  const wrappers = document.querySelectorAll(".player-local .cat-wrapper, .player-opponent .cat-wrapper");
  wrappers.forEach(w => w.classList.remove("anim-hit", "anim-attack", "anim-win", "anim-lose"));
}

function triggerAnim(target, cls) {
  const wrapper = target === "local"
    ? document.querySelector(".player-local .cat-wrapper")
    : document.querySelector(".player-opponent .cat-wrapper");
  if (!wrapper) return;

  wrapper.classList.remove("anim-hit", "anim-attack", "anim-win", "anim-lose");
  void wrapper.offsetWidth;
  wrapper.classList.add(cls);

  if (cls !== "anim-win" && cls !== "anim-lose") {
    wrapper.addEventListener("animationend", () => wrapper.classList.remove(cls), { once: true });
  }
}

function updateHP(localHP, rivalHP, localMax, rivalMax) {
  localHpBar.style.width = `${(localHP / localMax) * 100}%`;
  opponentHpBar.style.width = `${(rivalHP / rivalMax) * 100}%`;
  localHpText.textContent = `${localHP}/${localMax} HP`;
  opponentHpText.textContent = `${rivalHP}/${rivalMax} HP`;
}

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

// Exportar código del michi local (para copiar en personalización)
window.exportMichiCode = exportMichiCode;
