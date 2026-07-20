import { create } from "zustand";

type AccessControl = {
  access: "read" | "write" | "owner";
  hasEditAccess: boolean;
  documentId: string,
  setAccessControl: (data: { editable: boolean; documentId: string }) => void;
};

export const useDocumentAccess = create<AccessControl>((set) => ({
  access: "read",
  hasEditAccess: false,
  documentId: "",
  setAccessControl: (data: { editable: boolean; documentId: string }) => set(() => ({ hasEditAccess: data.editable, documentId: data.documentId })),
}));
