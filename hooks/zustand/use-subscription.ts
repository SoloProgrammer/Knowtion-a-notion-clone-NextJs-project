import { create } from "zustand";

type SubscriptionState = {
  plan: string;
  isPlanLoading: boolean;
  setPlan: (plan: string) => void;
  setPlanIsLoading: (loading: boolean) => void;
};

export const useSubscription = create<SubscriptionState>((set) => ({
  plan: "free",
  setPlan: (plan: string) => set({ plan }),
  isPlanLoading: true,
  setPlanIsLoading: (loading: boolean) => set({ isPlanLoading: loading }),
}));
