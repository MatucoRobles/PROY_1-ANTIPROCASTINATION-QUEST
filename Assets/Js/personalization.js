import { exportMichiHash } from "./customization.js";

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
});
