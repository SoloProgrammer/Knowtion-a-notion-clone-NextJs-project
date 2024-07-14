import { create } from "zustand";

type SearchState = {
  isOpen: boolean;
  openSearch: () => void;
  hideSearch: () => void;
  toggleSearch: () => void;
};

export const useSearch = create<SearchState>((set, get) => ({
  isOpen: false,
  openSearch: () => set(() => ({ isOpen: true })),
  hideSearch: () => set(() => ({ isOpen: false })),
  toggleSearch: () => set({ isOpen: !get().isOpen }),
}));
