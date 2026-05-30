import { exportMichiHash } from "./customization.js";
import { patchState } from "./state.js";
import { renderMichiName } from "./render.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnExport = document.getElementById("btn-export-code");
  const output = document.getElementById("export-output");
  const input = document.getElementById("generated-code");

  btnExport.addEventListener("click", (e) => {
    e.preventDefault();
    const hash = exportMichiHash();
    input.value = hash;
    output.classList.remove("hidden");
    input.select();
    document.execCommand("copy");
  });

  const form = document.querySelector("#pet-custom-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombreInput = document.querySelector("#pet-name");
      const nombre = nombreInput?.value.trim();
      if (nombre) {
        patchState({ nombre });
      }
      renderMichiName();
    });
  }
});
