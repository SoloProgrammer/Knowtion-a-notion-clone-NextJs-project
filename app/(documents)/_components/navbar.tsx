"use client";

import { SideBarMenu } from "./sidebar/side-bar-menu";
import { Title } from "./title";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

export const Navbar = () => {
  const params = useParams();
  const document = useQuery(api.documents.getDocumentById, {
    id: params.documentId as Id<"documents">,
  });
  if (document === undefined) {
    return (
      <nav className="flex w-full border-b px-2 h-14 items-center">
        <Title.Skeleton />
      </nav>
    );
  }
  return (
    <>
      <nav className="h-14 px-2 border-b flex items-center">
        <div className="flex items-center gap-x-2">
          <SideBarMenu />
          <Title document={document} />
        </div>
      </nav>
    </>
  );
};
