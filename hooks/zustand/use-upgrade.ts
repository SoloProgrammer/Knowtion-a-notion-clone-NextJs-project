import { create } from "zustand";

type UpgradeState = {
  isOpen: boolean;
  openUpgrade: () => void;
  closeUpgrade: () => void;
};

export const useUpgrade = create<UpgradeState>((set) => ({
  isOpen: false,
  openUpgrade: () => set({ isOpen: true }),
  closeUpgrade: () => set({ isOpen: false }),
}));
