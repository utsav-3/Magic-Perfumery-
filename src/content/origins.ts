/**
 * Where key raw materials come from. Draft sourcing copy — confirm with the
 * client before launch. `usedIn` holds fragrance slugs (checked by tests).
 */
export interface Origin {
  material: string;
  place: string;
  region: string;
  usedIn: string[];
}

export const origins: readonly Origin[] = [
  {
    material: "Mogra",
    place: "Dadar flower market",
    region: "Bombay",
    usedIn: ["dadar-mogra"],
  },
  {
    material: "Oud & saffron",
    place: "Bhendi Bazaar attar lanes",
    region: "Bombay",
    usedIn: ["bhendi-bazaar"],
  },
  {
    material: "Mitti",
    place: "Kannauj distilleries",
    region: "Uttar Pradesh",
    usedIn: ["first-rain"],
  },
  {
    material: "Sandalwood",
    place: "Mysore",
    region: "Karnataka",
    usedIn: ["malabar-hill", "dadar-mogra"],
  },
  {
    material: "Alphonso mango",
    place: "Ratnagiri coast",
    region: "Maharashtra",
    usedIn: ["alphonso"],
  },
];
