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