import { create } from "zustand";

type TotalDocumentsState = {
  totalFiles: number;
  update: (count: number) => void;
};

export const useTotalDocuments = create<TotalDocumentsState>((set) => ({
  totalFiles: 0,
  update: (count: number) => set({ totalFiles: count }),
}));
