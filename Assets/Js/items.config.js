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
  createItem("sword_iron", "Espada de Hierro", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "sword_iron.png", 2),
  createItem("wooden_staff", "Baculo de Hechizero", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "wooden_staff.png", 1),
  createItem("iron_axe", "Hacha de Hierro", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "iron_axe.png", 3),
  createItem("iron_mace", "Maza de Hierro", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "iron_mace.png", 2),
  createItem("iron_malet", "Martillo de Hierro", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "iron_malet.png", 4),
  createItem("iron_sickle", "Hoz de Hierro", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "iron_sickle.png", 2),
  createItem("light_staff", "Baculo de Luz", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "light_staff.png", 3),
  createItem("quick_sword", "Espada Rapida", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "quick_sword.png", 2),
  createItem("skull_staff", "Baculo de Craneo", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "skull_staff.png", 4),
  createItem("sky_sword", "Espada del Cielo", ITEM_SLOTS.WEAPON, "atk", WEAPON_FOLDER + "sky_sword.png", 5),
]);

export const ARMORS = Object.freeze([
  createItem("blue_armor", "Armadura del Caballero Azul", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "blue_armor.png", 2),
  createItem("gold_armor", "Armadura del Caballero de Oro", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "gold_armor.png", 4),
  createItem("green_mage_armor", "Bata de Mago de la Naturaleza", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "green_mage_armor.png", 3),
  createItem("iron_armor", "Armadura de Hierro", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "iron_armor.png", 2),
  createItem("leather_armor", "Cota de Cuero", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "leather_armor.png", 1),
  createItem("mage_armor", "Bata de Mago", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "mage_armor.png", 2),
  createItem("mesh_armor", "Armadura de Malla", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "mesh_armor.png", 2),
  createItem("red_mage_armor", "Bata de Mago Rojo", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "red_mage_armor.png", 3),
  createItem("thief_armor", "Ropa de Ladron", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "thief_armor.png", 1),
  createItem("torturer_armor", "Armadura de Verdugo", ITEM_SLOTS.ARMOR, "def", ARMOR_FOLDER + "torturer_armor.png", 4),
]);

export const HATS = Object.freeze([
  createItem("blue_helmet", "Casco Azul", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "blue_helmet.png", 2),
  createItem("gold_helmet", "Casco de Oro", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "gold_helmet.png", 4),
  createItem("green_mage_hat", "Sombrero de Mago Verde", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "green_mage_hat.png", 3),
  createItem("iron_helmet", "Casco de Hierro", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "iron_helmet.png", 2),
  createItem("leather_hat", "Sombrero de Cuero", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "leather_hat.png", 1),
  createItem("mage_hat", "Sombrero de Mago", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "mage_hat.png", 2),
  createItem("mesh_helmet", "Casco de Malla", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "mesh_helmet.png", 2),
  createItem("red_mage_hat", "Sombrero de Mago Rojo", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "red_mage_hat.png", 3),
  createItem("thief_hood_hat", "Capucha de Ladron", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "thief_hood.png", 1),
  createItem("torturer_helmet", "Casco de Verdugo", ITEM_SLOTS.HAT, "hp", HAT_FOLDER + "torturer_helmet.png", 4),
]);

export const ITEM_POOL = Object.freeze([...WEAPONS, ...ARMORS, ...HATS]);