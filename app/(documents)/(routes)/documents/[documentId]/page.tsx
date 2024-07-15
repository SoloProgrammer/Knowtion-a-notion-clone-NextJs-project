"use client";

import { Navbar } from "@/app/(documents)/_components/navbar";

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
    <div>
      <Navbar document={document} />
    </div>
  );
};
export default DocumentPage;
