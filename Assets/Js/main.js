import { loadState, loadQuests } from "./state.js";
import { bindEvents } from "./event.js";
import { renderAll, renderQuestList, renderProgress } from "./render.js";

export function initCat() {
  loadState();
  bindEvents();
  renderAll();
  const quests = loadQuests();
  renderQuestList(quests);
  renderProgress();
}

document.addEventListener("DOMContentLoaded", () => {
  initCat();
});