import { Comment } from "@/app/(documents)/_components/comments/types";
import { create } from "zustand";

type CommentsState = {
  isOpen: boolean;
  isAddOrViewReply: Boolean;
  parent?: Comment | undefined;
  open: () => void;
  close: () => void;
  setIsAddOrViewReply: (value: Boolean) => void;
  setParent: (parent: Comment) => void;
};

export const useComments = create<CommentsState>((set) => ({
  isOpen: false,
  isAddOrViewReply: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setIsAddOrViewReply: (value: Boolean) => set({ isAddOrViewReply: value }),
  setParent: (parent: Comment) => set({ parent }),
}));
