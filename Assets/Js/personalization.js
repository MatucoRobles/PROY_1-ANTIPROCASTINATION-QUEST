import { exportMichiHash } from "./customization.js";
import { patchState } from "./state.js";
import { renderMichiName } from "./render.js";
import { petForm, personalization } from "./dom.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnExport = personalization.btnExport;
  const output = personalization.outputContainer;
  const input = personalization.inputCode;

  if (btnExport && output && input) {
    btnExport.addEventListener("click", (e) => {
      e.preventDefault();
      const hash = exportMichiHash();
      input.value = hash;
      output.classList.remove("hidden");
      input.select();
      document.execCommand("copy");
    });
  }

  const form = petForm.form;
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombreInput = petForm.nombre;
      const nombre = nombreInput?.value.trim();
      if (nombre) {
        patchState({ nombre });
      }
      renderMichiName();
    });
  }
});
