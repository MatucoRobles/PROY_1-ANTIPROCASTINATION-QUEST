import { loadState, loadQuests, loadMichiState } from "./state.js";
import { bindEvents } from "./event.js";
import { renderAll, renderQuestList, renderProgress, renderEquippedItems, renderStats } from "./render.js";

export function initCat() {
  loadState();
  loadMichiState();
  bindEvents();
  renderAll();
  renderEquippedItems();
  renderStats();
  const quests = loadQuests();
  renderQuestList(quests);
  renderProgress();
}

document.addEventListener("DOMContentLoaded", () => {
  initCat();
});