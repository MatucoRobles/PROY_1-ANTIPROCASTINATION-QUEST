export const ITEM_SLOTS = Object.freeze({
  WEAPON: "weapon",
  ARMOR: "armor",
  HAT: "hat",
});

const WEAPON_FOLDER = "/Assets/Images/items/weapon/";
const ARMOR_FOLDER = "/Assets/Images/items/armor/";
const HAT_FOLDER = "/Assets/Images/items/hat/";

const createItem = (id, nombre, slot, stat, img, bonus = 1) => ({
  id,
  nombre,
  slot,
  stat,
  bonus,
  img,
});

export const WEAPONS = Object.freeze([
  createItem("sword_iron", "Espada de Hierro", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "sword_iron.png"),
  createItem("wooden_staff", "Baculo de Hechizero", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "wooden_staff.png"),
  createItem("iron_axe", "Hacha de Hierro", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "iron_axe.png"),
  createItem("iron_mace", "Maza de Hierro", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "iron_mace.png"),
  createItem("iron_malet", "Martillo de Hierro", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "iron_malet.png"),
  createItem("iron_sickle", "Hoz de Hierro", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "iron_sickle.png"),
  createItem("light_staff", "Baculo de Luz", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "light_staff.png"),
  createItem("quick_sword", "Espada Rapida", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "quick_sword.png"),
  createItem("skull_staff", "Baculo de Craneo", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "skull_staff.png"),
  createItem("sky_sword", "Espada del Cielo", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "sky_sword.png"),
]);

export const ARMORS = Object.freeze([
  createItem("blue_armor", "Armadura del Caballero Azul", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "blue_armor.png"),
  createItem("gold_armor", "Armadura del Caballero de Oro", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "gold_armor.png"),
  createItem("green_mage_armor", "Bata de Mago de la Naturaleza", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "green_mage_armor.png"),
  createItem("iron_armor", "Armadura de Hierro", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "iron_armor.png"),
  createItem("leather_armor", "Cota de Cuero", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "leather_armor.png"),
  createItem("mage_armor", "Bata de Mago", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "mage_armor.png"),
  createItem("mesh_armor", "Armadura de Malla", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "mesh_armor.png"),
  createItem("red_mage_armor", "Bata de Mago Rojo", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "red_mage_armor.png"),
  createItem("thief_armor", "Ropa de Ladron", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "thief_armor.png"),
  createItem("torturer_armor", "Armadura de Verdugo", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "torturer_armor.png"),
]);

export const HATS = Object.freeze([
  createItem("blue_helmet", "Casco Azul", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "blue_helmet.png"),
  createItem("gold_helmet", "Casco de Oro", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "gold_helmet.png"),
  createItem("green_mage_hat", "Sombrero de Mago Verde", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "green_mage_hat.png"),
  createItem("iron_helmet", "Casco de Hierro", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "iron_helmet.png"),
  createItem("leather_hat", "Sombrero de Cuero", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "leather_hat.png"),
  createItem("mage_hat", "Sombrero de Mago", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "mage_hat.png"),
  createItem("mesh_helmet", "Casco de Malla", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "mesh_helmet.png"),
  createItem("red_mage_hat", "Sombrero de Mago Rojo", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "red_mage_hat.png"),
  createItem("thief_hood_hat", "Capucha de Ladron", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "thief_hood.png"),
  createItem("torturer_helmet", "Casco de Verdugo", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "torturer_helmet.png"),
]);

export const ITEM_POOL = Object.freeze([...WEAPONS, ...ARMORS, ...HATS]);