import { loadState, loadQuests, loadMichiState } from "./state.js";
import { bindEvents } from "./event.js";
// Agregamos las dos funciones nuevas al import
import { renderAll, renderQuestList, renderProgress, renderEquippedItems, renderStats, renderEquipmentUI, renderInventoryUI } from "./render.js";

export function initCat() {
  loadState();
  loadMichiState();
  bindEvents();
  renderAll();
  renderEquippedItems(); // Esto dibuja sobre el sprite
  
  // ¡NUEVO! Dibuja la UI
  renderEquipmentUI(); 
  renderInventoryUI(); 
  
  renderStats();
  const quests = loadQuests();
  renderQuestList(quests);
  renderProgress();
}

document.addEventListener("DOMContentLoaded", () => {
  initCat();
});