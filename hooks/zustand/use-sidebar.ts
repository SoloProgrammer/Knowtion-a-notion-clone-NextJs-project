import { create, StoreApi, UseBoundStore } from "zustand";

type SideBarState = {
  isCollapsed: boolean;
  setIsCollapsed: (collapse: boolean) => void;
  isTransitioning?: boolean;
  setIsTransitioning?: (bool: boolean) => void;
};

const initSideBarStore = (initialState: boolean) =>
  create<SideBarState>((set) => ({
    isCollapsed: initialState,
    setIsCollapsed: (collapse) => set(() => ({ isCollapsed: collapse })),
    setIsTransitioning: (bool) => set(() => ({ isTransitioning: bool })),
  }));

let store: UseBoundStore<StoreApi<SideBarState>>;

export const useSideBar = (initialState = false) => {
  if (!store) {
    store = initSideBarStore(initialState);
  }
  return store();
};
