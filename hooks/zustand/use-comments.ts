import { Comment } from "@/app/(documents)/_components/comments/types";
import { create } from "zustand";

type CommentsState = {
  isOpen: boolean;
  isAddOrViewThread: Boolean;
  parent?: Comment | undefined;
  open: () => void;
  close: () => void;
  setIsAddOrViewThread: (value: Boolean) => void;
  setParent: (parent: Comment | undefined) => void;
};

export const useComments = create<CommentsState>((set) => ({
  isOpen: false,
  isAddOrViewThread: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setIsAddOrViewThread: (value: Boolean) => set({ isAddOrViewThread: value }),
  setParent: (parent: Comment | undefined) => set({ parent }),
}));
