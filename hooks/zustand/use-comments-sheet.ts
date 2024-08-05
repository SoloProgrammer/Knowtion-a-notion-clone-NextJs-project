import { create, StoreApi, UseBoundStore } from "zustand";

type CommentsSheetState = {
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
};

export const useCommentsSheet = create<CommentsSheetState>((set, get) => ({
  isOpen: false,
  openSheet: () => set({ isOpen: true }),
  closeSheet: () => set({ isOpen: false }),
}));
