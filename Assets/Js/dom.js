export const elements = Object.freeze({
  head: document.querySelector(".head"),
  bodyCat: document.querySelector(".body-cat"),
  paw: document.querySelector(".paw"),
});

export const inputs = Object.freeze({
  primary: document.querySelector("#cat-primary"),
  shadow: document.querySelector("#cat-shadow"),
  light: document.querySelector("#cat-light"),
});

export const modal = Object.freeze({
  overlay: document.querySelector("#quest-modal"),
  box: document.querySelector(".rpg-modal-box"),
  btnOpen: document.querySelector("#btn-open-modal"),
  btnClose: document.querySelector("#btn-close-modal"),
  btnCancel: document.querySelector("#btn-cancel-quest"),
  form: document.querySelector("#quest-form"),
  inputId: document.querySelector("#quest-id"),
  inputTitle: document.querySelector("#quest-title"),
  selectStatus: document.querySelector("#quest-status"),
});

export const questList = document.querySelector("#quests-list");

export const btnOpenChest = document.querySelector("#btn-open-chest");

export const catWrapper = document.querySelector(".cat-wrapper");

export const stats = Object.freeze({
  hp: document.querySelector("#stat-hp"),
  atk: document.querySelector("#stat-atk"),
  def: document.querySelector("#stat-def"),
});

export const petForm = Object.freeze({
  form: document.querySelector("#pet-custom-form"),
  nombre: document.querySelector("#pet-name"),
  btnSave: document.querySelector("#btn-save-michi"),
});

export const personalization = Object.freeze({
  btnExport: document.querySelector("#btn-export-code"),
  outputContainer: document.querySelector("#export-output"),
  inputCode: document.querySelector("#generated-code"),
});

export const arena = Object.freeze({
  inputCode: document.querySelector("#opponent-code-input"),
  btnLoad: document.querySelector("#btn-load-opponent"),
  btnStart: document.querySelector("#btn-start-simulation"),
  logOutput: document.querySelector("#battle-log-output"),
  localName: document.querySelector("#local-name"),
  opponentName: document.querySelector("#opponent-name"),
  localHpBar: document.querySelector("#local-hp-bar"),
  opponentHpBar: document.querySelector("#opponent-hp-bar"),
  localHpText: document.querySelector("#local-hp-text"),
  opponentHpText: document.querySelector("#opponent-hp-text"),
  rivalHead: document.querySelector(".player-opponent .head"),
  rivalBody: document.querySelector(".player-opponent .body-cat"),
  rivalPaw: document.querySelector(".player-opponent .paw"),
  rivalContainer: document.querySelector(".player-opponent .fighter-sprite-display"),
});