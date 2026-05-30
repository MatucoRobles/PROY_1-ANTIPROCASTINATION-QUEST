function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulación de combate por turnos simples
export async function simulateBattle(local, rival, logCallback, updateCallback) {
  const TURN_DELAY = 600;
  let turno = 0;
  let localHP = local.hp;
  let rivalHP = rival.hp;
  const localAtk = local.atk;
  const rivalAtk = rival.atk;
  const localDef = local.def;
  const rivalDef = rival.def;

  function log(msg) {
    if (logCallback) logCallback(msg);
  }
  function update(hp1, hp2) {
    if (updateCallback) updateCallback(hp1, hp2);
  }

  log(`¡Comienza el combate! ${local.nombre || "Tu Michi"} vs ${rival.nombre || "Rival"}`);
  update(localHP, rivalHP);
  await delay(TURN_DELAY);

  while (localHP > 0 && rivalHP > 0) {
    turno++;
    let dmg = Math.max(1, localAtk - rivalDef);
    rivalHP = Math.max(0, rivalHP - dmg);
    log(`Turno ${turno}: ${local.nombre || "Tu Michi"} ataca e inflige ${dmg} de daño. Rival: ${rivalHP} HP`);
    update(localHP, rivalHP);
    await delay(TURN_DELAY);
    if (rivalHP <= 0) break;

    dmg = Math.max(1, rivalAtk - localDef);
    localHP = Math.max(0, localHP - dmg);
    log(`Turno ${turno}: ${rival.nombre || "Rival"} ataca e inflige ${dmg} de daño. Local: ${localHP} HP`);
    update(localHP, rivalHP);
    await delay(TURN_DELAY);
  }

  if (localHP > 0) {
    log("¡Ganaste el combate!");
  } else {
    log("Perdiste el combate...");
  }
  update(localHP, rivalHP);
}
