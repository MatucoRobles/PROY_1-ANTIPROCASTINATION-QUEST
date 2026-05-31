function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulación de combate por turnos simples
export async function simulateBattle(local, rival, logCallback, updateCallback, animCallback) {
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
  function anim(target, cls) {
    if (animCallback) animCallback(target, cls);
  }

  log(`¡Comienza el combate! ${local.nombre || "Tu Michi"} vs ${rival.nombre || "Rival"}`);
  update(localHP, rivalHP);
  await delay(TURN_DELAY);

  while (localHP > 0 && rivalHP > 0) {
    turno++;
    anim("local", "anim-attack");
    await delay(200);
    anim("rival", "anim-hit");

    let dmg = Math.max(1, localAtk - rivalDef);
    rivalHP = Math.max(0, rivalHP - dmg);
    log(`Turno ${turno}: ${local.nombre || "Tu Michi"} ataca e inflige ${dmg} de daño. Rival: ${rivalHP} HP`);
    update(localHP, rivalHP);
    await delay(TURN_DELAY - 200);
    if (rivalHP <= 0) break;

    anim("rival", "anim-attack");
    await delay(200);
    anim("local", "anim-hit");

    dmg = Math.max(1, rivalAtk - localDef);
    localHP = Math.max(0, localHP - dmg);
    log(`Turno ${turno}: ${rival.nombre || "Rival"} ataca e inflige ${dmg} de daño. Local: ${localHP} HP`);
    update(localHP, rivalHP);
    await delay(TURN_DELAY - 200);
  }

  if (localHP > 0) {
    anim("local", "anim-win");
    anim("rival", "anim-lose");
    log("¡Ganaste el combate!");
  } else {
    anim("rival", "anim-win");
    anim("local", "anim-lose");
    log("Perdiste el combate...");
  }
  update(localHP, rivalHP);
}
