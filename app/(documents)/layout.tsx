"use client";

import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

import { Spinner } from "@/components/spinner";
import { Sidebar } from "./_components/sidebar/sidebar";

import { useConvexAuth } from "convex/react";
import { SearchCommand } from "@/components/search-command";
import { EdgeStoreProvider } from "@/lib/edgestore";

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
    <div className="w-full h-full flex justify-center">
      <Sidebar />
      <SearchCommand />
      <main className="flex-grow">
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </main>
    </div>
  );
};
export default DocumentsLayout;
