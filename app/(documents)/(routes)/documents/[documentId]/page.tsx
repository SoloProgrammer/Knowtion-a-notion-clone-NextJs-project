"use client";

import { CoverImage } from "@/app/(documents)/_components/cover-image";
import { Navbar } from "@/app/(documents)/_components/navbar";
import { Toolbar } from "@/components/toolbar";

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

  return (
    <>
      <Navbar document={document} />
      {document?.coverImage && <CoverImage cover={document.coverImage} />}
      <div className="md:max-w-4xl lg:max-w-5xl px-2 mx-auto mt-3">
        <Toolbar document={document!} />
      </div>
    </>
  );
};
export default DocumentPage;
