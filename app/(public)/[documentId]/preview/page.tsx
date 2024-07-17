"use client";

import dynamic from "next/dynamic";

import { CoverImage } from "@/app/(documents)/_components/cover-image";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/spinner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useQuery } from "convex/react";

const DynamicEditor = dynamic(() => import("@/components/editor"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center mt-10">
      <Spinner size={"lg"} />
    </div>
  ),
});

type PreviewDocumentPageProps = {
  params: {
    documentId: Id<"documents">;
  };
};

const PreviewDocumentPage = ({ params }: PreviewDocumentPageProps) => {
  const document = useQuery(api.documents.getPreviewDocument, {
    id: params.documentId as Id<"documents">,
  });

  if (document === undefined) return <PreviewDocumentPage.Skeleton />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col w-full flex-grow overflow-y-auto pb-20">
        <CoverImage
          url={document?.coverImage}
          documentId={document?._id!}
          preview
        />
        <div className="md:max-w-4xl lg:max-w-5xl px-2 mx-auto mt-3 flex flex-col gap-y-4 flex-grow w-full">
          <Toolbar document={document!} preview />
          <DynamicEditor
            initialContent={document.content}
            editable={!document.isPublished ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

PreviewDocumentPage.Skeleton = () => {
  return (
    <>
      <CoverImage.Skeleton />
      <div className="md:max-w-4xl lg:max-w-5xl px-5 mx-auto mt-10">
        <Skeleton className="w-[270px] h-[40px]" />
        <Skeleton className="w-[100px] h-[20px] mt-10" />
        <Skeleton className="w-[200px] h-[20px] mt-3" />
        <Skeleton className="w-[300px] h-[15px] mt-3" />
      </div>
    </>
  );
};

export default PreviewDocumentPage;
