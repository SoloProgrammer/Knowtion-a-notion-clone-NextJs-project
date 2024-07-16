"use client";

import { CoverImage } from "@/app/(documents)/_components/cover-image";
import { Navbar } from "@/app/(documents)/_components/navbar";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useQuery } from "convex/react";

type DocumentPageProps = {
  params: {
    documentId: Id<"documents">;
  };
};

const DocumentPage = ({ params }: DocumentPageProps) => {
  const document = useQuery(api.documents.getDocumentById, {
    id: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <>
        <Navbar.Skeleton />
        <CoverImage.Skeleton />
        <div className="md:max-w-4xl lg:max-w-5xl px-2 mx-auto mt-10">
          <Skeleton className="w-[270px] h-[40px]"/>
          <Skeleton className="w-[100px] h-[20px] mt-10"/>
          <Skeleton className="w-[200px] h-[20px] mt-3"/>
          <Skeleton className="w-[300px] h-[15px] mt-3"/>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar document={document!} />
      <CoverImage url={document?.coverImage} documentId={document?._id!} />
      <div className="md:max-w-4xl lg:max-w-5xl px-2 mx-auto mt-3">
        <Toolbar document={document!} />
      </div>
    </>
  );
};
export default DocumentPage;
