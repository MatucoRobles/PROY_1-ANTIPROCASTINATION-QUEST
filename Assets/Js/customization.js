import { michiState, state } from "./state.js";

// Exporta el estado actual del michi como HASH (base64)
export function exportMichiHash() {
  // Combinamos los colores (state) y las estadísticas (michiState) en un solo objeto
  const exportData = { ...state, ...michiState };
  const json = JSON.stringify(exportData);
  return btoa(unescape(encodeURIComponent(json)));
}

// Importa un HASH (base64) y lo convierte en un objeto michi rival
export function importMichiHash(hash) {
  try {
    const json = decodeURIComponent(escape(atob(hash)));
    return importMichiCode(json);
  } catch {
    return null;
  }
}

// Exporta el estado actual del michi como JSON
export function exportMichiCode() {
  const exportData = { ...state, ...michiState };
  return JSON.stringify(exportData);
}

// Importa un JSON y lo convierte en un objeto michi rival
export function importMichiCode(json) {
  try {
    const rival = JSON.parse(json);
    if (!rival || typeof rival !== "object") return null;
    // Si las estadísticas no existen en el Hash exportado, les damos un valor predeterminado
    rival.hp = typeof rival.hp === "number" && !isNaN(rival.hp) ? rival.hp : 100;
    rival.atk = typeof rival.atk === "number" && !isNaN(rival.atk) ? rival.atk : 10;
    rival.def = typeof rival.def === "number" && !isNaN(rival.def) ? rival.def : 5;
    rival.nombre = typeof rival.nombre === "string" && rival.nombre.trim().length > 0
      ? rival.nombre.trim().slice(0, 20)
      : "RIVAL_MICHI";
    return rival;
  } catch {
    return null;
  }
}
