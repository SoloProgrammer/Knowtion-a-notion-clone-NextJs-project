import { create, StoreApi, UseBoundStore } from "zustand";

type SideBarState = {
  isCollapsed: boolean;
  setIsCollapsed: (collapse: boolean) => void;
  isTrasitioning?: boolean;
  setIsTrasitioning?: (bool: boolean) => void;
};

const initSideBarStore = (initialState: boolean) =>
  create<SideBarState>((set) => ({
    isCollapsed: initialState,
    setIsCollapsed: (collapse) => set(() => ({ isCollapsed: collapse })),
    setIsTrasitioning: (bool) => set(() => ({ isTrasitioning: bool })),
  }));

let store: UseBoundStore<StoreApi<SideBarState>>;

export const useSideBar = (initialState = false) => {
  if (!store) {
    store = initSideBarStore(initialState);
  }
  return store();
};
