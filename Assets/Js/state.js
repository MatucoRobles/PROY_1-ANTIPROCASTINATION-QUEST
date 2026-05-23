import { DEFAULT_STATE, SCALE_CONFIG, STORAGE_KEY } from "./config.js";

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