"use client";

import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

import { Spinner } from "@/components/spinner";
import { Sidebar } from "./_components/sidebar";

import { useConvexAuth } from "convex/react";

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
      <main className="flex-grow">{children}</main>
    </div>
  );
};
export default DocumentsLayout;
