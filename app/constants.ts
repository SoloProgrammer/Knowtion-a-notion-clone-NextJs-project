import { ThemeType } from "@/types";

// Brand constants
const BRAND_NAME = "Knowtion";

// Theme constants
const DARK = "dark";
const LIGHT = "light";
const SYSTEM = "system";
const THEMS: ThemeType[] = [
  {
    theme: "Light",
    value: LIGHT,
  },
  {
    theme: "Dark",
    value: DARK,
  },
  {
    theme: "System",
    value: SYSTEM,
  },
];

export { BRAND_NAME, THEMS, DARK, LIGHT, SYSTEM };
