import { DEFAULT_STATE, SCALE_CONFIG, STORAGE_KEY, QUEST_STORAGE_KEY, QUEST_ESTADOS, QUEST_PROGRESS_BASE, PROGRESS_STORAGE_KEY } from "./config.js";

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
  saveState();
}

export function resetState() {
  Object.assign(state, DEFAULT_STATE);
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
  const completadas = loadTotalCompletadas();
  const porcentaje = Math.round(((completadas % QUEST_PROGRESS_BASE) / QUEST_PROGRESS_BASE) * 100);
  const cofresDisponibles = Math.floor(completadas / QUEST_PROGRESS_BASE);
  return { completadas, porcentaje, cofresDisponibles };
}

export function loadTotalCompletadas() {
  try {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!stored) return 0;
    const parsed = parseInt(stored, 10);
    return isNaN(parsed) ? 0 : parsed;
  } catch {
    return 0;
  }
}

export function saveTotalCompletadas(n) {
  localStorage.setItem(PROGRESS_STORAGE_KEY, n.toString());
}

export function incrementCompletadas() {
  const current = loadTotalCompletadas();
  saveTotalCompletadas(current + 1);
}

export function filterQuests(estado) {
  const quests = loadQuests();
  if (estado === "all") return quests;
  return quests.filter((q) => q.estado === estado);
}