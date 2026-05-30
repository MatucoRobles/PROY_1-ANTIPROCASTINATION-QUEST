import { DEFAULT_STATE, SCALE_CONFIG, STORAGE_KEY, QUEST_STORAGE_KEY, QUEST_ESTADOS, QUEST_PROGRESS_BASE, PROGRESS_STORAGE_KEY, MICHI_STORAGE_KEY, INVENTORY_STORAGE_KEY, MICHI_NAME_MAX_LENGTH } from "./config.js";
import { ITEM_POOL } from "./items.config.js";

export const state = { ...DEFAULT_STATE };

const HEX_REGEX = /^#[0-9a-f]{6}$/i;

function validateColor(value) {
  return typeof value === "string" && HEX_REGEX.test(value) ? value : null;
}

function validateScale(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= SCALE_CONFIG.min && num <= SCALE_CONFIG.max ? num : null;
}

export function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      Object.assign(state, DEFAULT_STATE);
      return;
    }

    const parsed = JSON.parse(stored);

    state.primary = validateColor(parsed.primary) ?? DEFAULT_STATE.primary;
    state.shadow = validateColor(parsed.shadow) ?? DEFAULT_STATE.shadow;
    state.light = validateColor(parsed.light) ?? DEFAULT_STATE.light;
    state.scale = validateScale(parsed.scale) ?? DEFAULT_STATE.scale;
    state.nombre = typeof parsed.nombre === "string" && parsed.nombre.trim().length > 0
      ? parsed.nombre.trim().slice(0, MICHI_NAME_MAX_LENGTH)
      : DEFAULT_STATE.nombre;
  } catch {
    Object.assign(state, DEFAULT_STATE);
  }
}

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function patchState(partial) {
  if (partial.primary !== undefined) {
    state.primary = validateColor(partial.primary) ?? state.primary;
  }
  if (partial.shadow !== undefined) {
    state.shadow = validateColor(partial.shadow) ?? state.shadow;
  }
  if (partial.light !== undefined) {
    state.light = validateColor(partial.light) ?? state.light;
  }
  if (partial.scale !== undefined) {
    state.scale = validateScale(partial.scale) ?? state.scale;
  }
  if (partial.nombre !== undefined) {
    const nombre = String(partial.nombre).trim().slice(0, MICHI_NAME_MAX_LENGTH);
    state.nombre = nombre.length > 0 ? nombre : state.nombre;
  }
  saveState();
}

export function loadQuests() {
  try {
    const stored = localStorage.getItem(QUEST_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (q) =>
        q &&
        typeof q.id === "string" &&
        typeof q.nombre === "string" &&
        typeof q.estado === "string" &&
        QUEST_ESTADOS.includes(q.estado)
    );
  } catch {
    return [];
  }
}

export function saveQuests(quests) {
  localStorage.setItem(QUEST_STORAGE_KEY, JSON.stringify(quests));
}

export function addQuest(nombre, estado) {
  const quests = loadQuests();
  const quest = {
    id: Date.now().toString(),
    nombre,
    estado,
  };
  quests.push(quest);
  saveQuests(quests);
  return quest;
}

export function completeQuest(id) {
  const quests = loadQuests();
  const quest = quests.find((q) => q.id === id);
  if (quest) {
    quest.estado = "completada";
    saveQuests(quests);
  }
}

export function deleteQuest(id) {
  const quests = loadQuests();
  const filtered = quests.filter((q) => q.id !== id);
  saveQuests(filtered);
}

export function getProgress() {
  const { misionesCompletas, cofresDisponibles } = loadTotalCompletadas();
  const porcentaje = Math.round(((misionesCompletas % QUEST_PROGRESS_BASE) / QUEST_PROGRESS_BASE) * 100);
  return { completadas: misionesCompletas, porcentaje, cofresDisponibles };
}

export function loadTotalCompletadas() {
  try {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!stored) return { misionesCompletas: 0, cofresDisponibles: 0 };
    const parsed = JSON.parse(stored);
    if (typeof parsed === "number") {
      return { misionesCompletas: parsed, cofresDisponibles: Math.floor(parsed / QUEST_PROGRESS_BASE) };
    }
    if (typeof parsed?.misionesCompletas === "number" && typeof parsed?.cofresDisponibles === "number") {
      return parsed;
    }
    return { misionesCompletas: 0, cofresDisponibles: 0 };
  } catch {
    return { misionesCompletas: 0, cofresDisponibles: 0 };
  }
}

export function saveTotalCompletadas(obj) {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(obj));
}

export function incrementCompletadas() {
  const current = loadTotalCompletadas();
  const nuevasMisiones = current.misionesCompletas + 1;
  const cofresGanados = Math.floor(nuevasMisiones / QUEST_PROGRESS_BASE);
  const cofresAbiertos = Math.floor(current.misionesCompletas / QUEST_PROGRESS_BASE) - current.cofresDisponibles;
  const updated = {
    misionesCompletas: nuevasMisiones,
    cofresDisponibles: cofresGanados - cofresAbiertos,
  };
  saveTotalCompletadas(updated);
}

export const michiState = {
  hp: 100,
  atk: 15,
  def: 12,
  equipped: { weapon: null, armor: null, hat: null },
};

export function loadMichiState() {
  try {
    const stored = localStorage.getItem(MICHI_STORAGE_KEY);
    if (!stored) return;
    const parsed = JSON.parse(stored);
    if (parsed?.hp !== undefined) michiState.hp = parsed.hp;
    if (parsed?.atk !== undefined) michiState.atk = parsed.atk;
    if (parsed?.def !== undefined) michiState.def = parsed.def;
    if (parsed?.equipped) {
      michiState.equipped.weapon = parsed.equipped.weapon || null;
      michiState.equipped.armor = parsed.equipped.armor || null;
      michiState.equipped.hat = parsed.equipped.hat || null;
    }
  } catch {}
}

export function saveMichiState() {
  localStorage.setItem(MICHI_STORAGE_KEY, JSON.stringify(michiState));
}

export function loadInventory() {
  try {
    const stored = localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveInventory(ids) {
  localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(ids));
}

export function addToInventory(itemId) {
  const inventory = loadInventory();
  if (!inventory.includes(itemId)) {
    inventory.push(itemId);
    saveInventory(inventory);
  }
}

export function getAvailablePool() {
  const inventory = loadInventory();
  return ITEM_POOL.filter((item) => !inventory.includes(item.id));
}

export function isInventoryFull() {
  return getAvailablePool().length === 0;
}

export function openChest() {
  const progress = loadTotalCompletadas();
  if (progress.cofresDisponibles <= 0) return null;
  if (isInventoryFull()) return null;

  const pool = getAvailablePool();
  const item = pool[Math.floor(Math.random() * pool.length)];
  progress.cofresDisponibles -= 1;
  saveTotalCompletadas(progress);
  addToInventory(item.id);

  const autoEquipped = michiState.equipped[item.slot] === null;
  if (autoEquipped) equipItem(item);

  return { item, autoEquipped };
}

export function equipItem(item) {
  const prev = michiState.equipped[item.slot];
  if (prev) {
    michiState[prev.stat] -= prev.bonus;
  }
  const newItem = { ...item };
  michiState.equipped[item.slot] = newItem;
  michiState[item.stat] += item.bonus;
  saveMichiState();
}

export function filterQuests(estado) {
  const quests = loadQuests();
  if (estado === "all") return quests;
  return quests.filter((q) => q.estado === estado);
}