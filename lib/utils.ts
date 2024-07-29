import { BRIGHT_HEX_COLOR_CODES } from "@/constants/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generate_random_hex_color() {
  const min = 1;
  const max = BRIGHT_HEX_COLOR_CODES.length - 1;
  return BRIGHT_HEX_COLOR_CODES[Math.round(Math.random() * (max - min) + min)];
}
