import { patchState } from "./state.js";
import { renderAll, renderCssVariables, renderCat } from "./render.js";
import { inputs } from "./dom.js";

export function bindEvents() {
  if (inputs.primary) {
    inputs.primary.addEventListener("input", (e) => {
      patchState({ primary: e.target.value });
      renderAll();
    });
  }

  if (inputs.shadow) {
    inputs.shadow.addEventListener("input", (e) => {
      patchState({ shadow: e.target.value });
      renderAll();
    });
  }

  if (inputs.light) {
    inputs.light.addEventListener("input", (e) => {
      patchState({ light: e.target.value });
      renderAll();
    });
  }

  if (inputs.scale) {
    inputs.scale.addEventListener("input", (e) => {
      patchState({ scale: parseFloat(e.target.value) });
      renderCssVariables();
    });
  }

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderCat();
    }, 100);
  });
}