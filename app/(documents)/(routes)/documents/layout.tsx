"use client";

import { redirect } from "next/navigation";
import { PropsWithChildren, use, useEffect } from "react";

import { Spinner } from "@/components/spinner";
import { SearchCommand } from "@/components/search-command";
import { Sidebar } from "../../_components/sidebar/sidebar";
import { UpgradePlanModal } from "@/components/modals/upgrade-plan-modal";

import { EdgeStoreProvider } from "@/lib/edgestore";
import { DocumentLayoutProvider } from "@/providers/document-layout-provider";

import {
  useCreateSubscriptionMutation,
  useGetUserSubcriptionQuery,
} from "./hooks";
import { useSubscription } from "@/hooks/zustand/use-subscription";
import { useConvexAuth } from "convex/react";

import { PLANS } from "@/app/constants";
import { useUser } from "@clerk/clerk-react";

const DocumentsLayout = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();

  const {
    data: subscription,
    isSuccess,
    isLoading: isPlanLoading,
  } = useGetUserSubcriptionQuery(user?.id!);
  const { create } = useCreateSubscriptionMutation();
  const { setPlan, setPlanIsLoading } = useSubscription();

  // CHECKING FOR EXISTING SUBSCRIPTION IF NOT FOUND CREATE NEW WITH _FREE_ PLAN OR UPDATE PLAN TO THE STORE
  useEffect(() => {
    setPlanIsLoading(isPlanLoading);
    if (!user) return;
    if (isSuccess && subscription) {
      setPlan(subscription?.plan);
    } else if (!subscription && !isPlanLoading) {
      create({ plan: PLANS.FREE });
    }
  }, [subscription, isSuccess, isPlanLoading, user]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }
  if (!isAuthenticated && !isLoading) {
    return redirect("/");
  }

  return (
    <DocumentLayoutProvider>
      <div className="w-full h-full flex justify-center !overflow-y-hidden">
        <Sidebar />
        <SearchCommand />
        <UpgradePlanModal />
        <main className="flex-grow">
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </main>
      </div>
    </DocumentLayoutProvider>
  );
};
export default DocumentsLayout;
