"use client";

import dynamic from "next/dynamic";

import { CoverImage } from "@/app/(documents)/_components/cover-image";
import { Navbar } from "@/app/(documents)/_components/navbar";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useMutation, useQuery } from "convex/react";
import { Spinner } from "@/components/spinner";

const DynamicEditor = dynamic(() => import("@/components/editor"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center mt-10">
      <Spinner size={"lg"} />
    </div>
  ),
});

type DocumentPageProps = {
  params: {
    documentId: Id<"documents">;
  };
};

const DocumentPage = ({ params }: DocumentPageProps) => {
  const document = useQuery(api.documents.getDocumentById, {
    id: params.documentId as Id<"documents">,
  });
  const update = useMutation(api.documents.udpate);

  if (document === undefined) return <DocumentPage.Skeleton />;

  const handleEditorChange = (content: string) => {
    update({ id: document?._id, content });
  };

  return (
    <div className="flex flex-col h-full">
      <Navbar document={document!} />
      <div className="flex flex-col w-full flex-grow overflow-y-auto pb-20">
        <CoverImage url={document?.coverImage} documentId={document?._id!} />
        <div className="md:max-w-4xl lg:max-w-5xl px-2 mx-auto mt-3 flex flex-col gap-y-4 flex-grow w-full">
          <Toolbar document={document!} />
          <DynamicEditor
            initialContent={document.content}
            onChange={handleEditorChange}
            editable={true}
          />
        </div>
      </div>
    </div>
  );
};

DocumentPage.Skeleton = () => {
  return (
    <>
      <Navbar.Skeleton />
      <CoverImage.Skeleton />
      <div className="md:max-w-4xl lg:max-w-5xl px-2 mx-auto mt-10">
        <Skeleton className="w-[270px] h-[40px]" />
        <Skeleton className="w-[100px] h-[20px] mt-10" />
        <Skeleton className="w-[200px] h-[20px] mt-3" />
        <Skeleton className="w-[300px] h-[15px] mt-3" />
      </div>
    </>
  );
};

export default DocumentPage;
