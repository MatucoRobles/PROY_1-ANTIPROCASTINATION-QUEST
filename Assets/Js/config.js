export const PIXEL_MAPS = Object.freeze({
  CAT_HEAD: Object.freeze([
    1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,
    1,3,3,3,3,1,0,0,0,0,0,1,3,3,3,3,1,
    1,3,5,5,3,3,1,1,1,1,1,3,3,5,5,3,1,
    1,3,5,3,3,3,4,3,4,3,4,3,3,3,5,3,1,
    1,3,3,3,3,3,4,3,4,3,4,3,3,3,3,3,1,
    1,3,3,3,3,3,3,3,4,3,3,3,3,3,3,3,1,
    1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,
    1,3,3,3,1,1,3,3,3,3,3,1,1,3,3,3,1,
    1,3,3,3,1,1,3,3,3,3,3,1,1,3,3,3,1,
    1,4,4,3,3,3,3,3,6,3,3,3,3,3,4,4,1,
    1,3,3,4,4,3,3,1,3,1,3,3,4,4,3,3,1,
    1,4,3,3,3,3,3,3,3,3,3,3,3,3,3,4,1,
    1,3,4,4,4,3,3,3,3,3,3,3,4,4,4,3,1,
    0,1,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0,
    0,0,1,3,3,3,3,3,3,3,3,3,3,3,1,0,0,
    0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,
  ]),
  CAT_BODY: Object.freeze([
    0,1,3,3,3,3,3,3,3,3,3,3,1,0,
    1,3,3,3,3,3,3,5,5,5,5,3,3,1,
    1,3,3,3,3,1,5,5,5,5,5,5,3,1,
    1,3,3,3,3,1,5,5,5,5,5,5,3,1,
    1,3,3,3,3,1,5,5,5,5,5,5,3,1,
    1,3,3,3,3,1,5,5,5,5,5,5,3,1,
    0,1,3,3,1,3,3,5,5,5,5,3,3,1,
    0,1,1,1,3,3,3,3,3,3,3,3,3,1,
    0,1,3,3,3,3,1,1,1,3,3,3,3,1,
    0,1,3,3,3,1,0,0,0,1,3,3,3,1,
    0,1,3,3,3,1,0,0,0,1,3,3,3,1,
    0,1,1,1,1,1,0,0,0,1,1,1,1,1,
  ]),
  CAT_PAWS: Object.freeze([
    1,1,1,1,1,1,1,0,0,
    3,3,3,3,3,3,3,1,0,
    3,3,3,3,3,3,3,3,1,
    3,3,3,3,3,3,3,3,1,
    3,3,3,3,3,3,3,1,0,
    1,1,1,1,1,1,1,0,0,
  ]),
  CAT_HEAD_COLS: 17,
  CAT_BODY_COLS: 14,
  CAT_PAWS_COLS: 9,
});

export const COLOR_INDICES = Object.freeze({
  transparent: 0,
  black: 1,
  white: 2,
  primary: 3,
  shadow: 4,
  light: 5,
  accent: 6,
});

export const DEFAULT_COLORS = Object.freeze({
  primary: "#ffb347",
  shadow: "#e6953b",
  light: "#ffd08a",
});

export const DEFAULT_STATE = Object.freeze({
  primary: "#ffb347",
  shadow: "#e6953b",
  light: "#ffd08a",
  scale: 1,
});

export const SCALE_CONFIG = Object.freeze({
  min: 0.5,
  max: 4,
  step: 0.1,
  default: 1,
});

export const PIXEL_SIZE_CONFIG = Object.freeze({
  min: 4,
  max: 32,
  default: 16,
});

export const CAT_MAX_COLS = 17;

export const STORAGE_KEY = "anti_procrastination_cat_state";

export const CSS_VARS = Object.freeze({
  primary: "--cat-primary",
  shadow: "--cat-shadow",
  light: "--cat-light",
  scale: "--cat-scale",
  pixelSize: "--pixel-size",
});

export const QUEST_STORAGE_KEY = "apq_quests";

export const QUEST_ESTADOS = Object.freeze(["pendiente", "activa", "completada"]);

export const QUEST_ESTADO_DEFAULT = "pendiente";

export const QUEST_BADGE_ICONS = Object.freeze({
  pendiente: "⌛",
  activa: "⚔️",
  completada: "✅",
});