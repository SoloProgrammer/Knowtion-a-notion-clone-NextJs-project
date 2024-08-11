"use client";

import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

import { Spinner } from "@/components/spinner";
import { SearchCommand } from "@/components/search-command";
import { Sidebar } from "../../_components/sidebar/sidebar";

import { useConvexAuth } from "convex/react";

import { EdgeStoreProvider } from "@/lib/edgestore";
import { DocumentLayoutProvider } from "@/providers/document-layout-provider";
import { UpgradePlanModal } from "@/components/modals/upgrade-plan-modal";
import { useUpgrade } from "@/hooks/zustand/use-upgrade";

const DocumentsLayout = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
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
