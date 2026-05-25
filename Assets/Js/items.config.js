export const ITEM_SLOTS = Object.freeze({
  WEAPON: "weapon",
  ARMOR: "armor",
  HAT: "hat",
});

export const ITEM_POOL = Object.freeze([
  {
    id: "sword_iron",
    nombre: "Espada de Hierro",
    slot: "weapon",
    stat: "atk",
    bonus: 10,
    img: "Assets/Images/items/sword_iron.png",
  },
  {
    id: "armor_leather",
    nombre: "Cota de Malla",
    slot: "armor",
    stat: "def",
    bonus: 8,
    img: "Assets/Images/items/armor_leather.png",
  },
  {
    id: "iron_hat",
    nombre: "Casco de Hierro",
    slot: "hat",
    stat: "hp",
    bonus: 15,
    img: "Assets/Images/items/iron_hat.png",
  },
  {
    id: "mage_armor",
    nombre: "Bata de Mago",
    slot: "armor",
    stat: "atk",
    bonus: 4,
    img: "Assets/Images/items/mage_armor.png",
  },
  {
    id: "wooden_stuff",
    nombre: "Baculo de Hechizero",
    slot: "weapon",
    stat: "atk",
    bonus: 6,
    img: "Assets/Images/items/wooden_stuff.png",
  },
]);