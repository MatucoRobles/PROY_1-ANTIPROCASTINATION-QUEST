import { loadState } from "./state.js";
import { bindEvents } from "./event.js";
import { renderAll } from "./render.js";

export function initCat() {
  loadState();
  bindEvents();
  renderAll();
}

document.addEventListener("DOMContentLoaded", () => {
  initCat();
});