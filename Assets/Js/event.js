import { patchState, addQuest, loadQuests } from "./state.js";
import { renderAll, renderCssVariables, renderCat, renderQuestList } from "./render.js";
import { inputs, modal } from "./dom.js";

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

  if (modal.btnOpen) {
    modal.btnOpen.addEventListener("click", openModal);
  }

  if (modal.btnClose) {
    modal.btnClose.addEventListener("click", closeModal);
  }

  if (modal.btnCancel) {
    modal.btnCancel.addEventListener("click", closeModal);
  }

  if (modal.overlay) {
    modal.overlay.addEventListener("click", (e) => {
      if (e.target === modal.overlay) {
        closeModal();
      }
    });
  }

  if (modal.form) {
    modal.form.addEventListener("submit", handleQuestSubmit);
  }
}

export function openModal() {
  if (!modal.overlay) return;
  modal.overlay.classList.remove("hidden");
  modal.overlay.setAttribute("aria-hidden", "false");
  if (modal.inputTitle) {
    modal.inputTitle.focus();
  }
}

export function closeModal() {
  if (!modal.overlay) return;
  modal.overlay.classList.add("hidden");
  modal.overlay.setAttribute("aria-hidden", "true");
  if (modal.form) {
    modal.form.reset();
  }
  if (modal.inputId) {
    modal.inputId.value = "";
  }
}

export function handleQuestSubmit(e) {
  e.preventDefault();
  if (!modal.inputTitle || !modal.selectStatus) return;

  const nombre = modal.inputTitle.value.trim();
  const estado = modal.selectStatus.value;

  addQuest(nombre, estado);
  const quests = loadQuests();
  renderQuestList(quests);
  closeModal();
}