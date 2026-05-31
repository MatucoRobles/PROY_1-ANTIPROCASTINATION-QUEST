import { patchState, addQuest, loadQuests, completeQuest, deleteQuest, incrementCompletadas, filterQuests, openChest, equipItem } from "./state.js";
import { renderAll, renderCssVariables, renderCat, renderQuestList, renderProgress, renderTabs, renderEquippedItems, renderStats, renderRewardModal, renderEquipmentUI, renderInventoryUI } from "./render.js";
import { inputs, modal, questList, btnOpenChest, tabsContainer, inventory } from "./dom.js";
import { ITEM_POOL } from "./items.config.js";

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

  if (questList) {
    questList.addEventListener("click", (e) => {
      const target = e.target;
      const action = target.dataset.action;
      const id = target.dataset.id;
      if (!action || !id) return;

      if (action === "complete") {
        incrementCompletadas();
        completeQuest(id);
        renderQuestList(loadQuests());
        renderProgress();
      } else if (action === "delete") {
        deleteQuest(id);
        renderQuestList(loadQuests());
        renderProgress();
      }
    });
  }

  if (tabsContainer) {
    tabsContainer.addEventListener("click", (e) => {
      const target = e.target;
      if (!target.dataset.filter) return;
      const filter = target.dataset.filter;
      renderTabs(filter);
      renderQuestList(filterQuests(filter));
    });
  }

  if (btnOpenChest) {
    btnOpenChest.addEventListener("click", () => {
      const result = openChest();
      if (!result) return;
      renderProgress();
      if (result.autoEquipped) {
        renderEquippedItems();
        renderStats();
      }
      renderRewardModal(result.item, result.autoEquipped, (item) => {
        equipItem(item);
        renderEquippedItems();
        renderStats();
      });
    });
  }

  if (inventory.grid) {
    inventory.grid.addEventListener("click", (e) => {
      const li = e.target.closest(".rpg-item-slot");
      if (!li) return;
      const id = li.dataset.id;
      if (!id) return;
      const item = ITEM_POOL.find(i => i.id === id);
      if (item) {
        equipItem(item);
        renderEquipmentUI();
        renderEquippedItems();
        renderStats();
        renderInventoryUI();
      }
    });
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
  renderProgress();
  closeModal();
}