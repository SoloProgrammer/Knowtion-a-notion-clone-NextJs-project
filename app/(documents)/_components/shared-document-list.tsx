"use client";

import { useUser } from "@clerk/clerk-react";
import { useGetSharedDocuments } from "../(routes)/documents/hooks";
import { useParams, useRouter } from "next/navigation";

import { Item } from "./item";

import { Blend, FileIcon } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

export const SharedDocumentList = () => {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();
  const { data: documents } = useGetSharedDocuments(
    user?.emailAddresses[0].emailAddress!
  );

  if (!documents) return null;

  const onRedirect = (documentId: Id<"documents"> | undefined) =>
    router.push(`/documents/${documentId}`);

  return (
    <div className="mt-3">
      <h3
        className={cn(
          "px-4 pb-3 text-primary/80 flex items-center gap-x-2 text-sm font-semibold",
          (!documents || documents.length < 1) && "hidden"
        )}
      >
        <Blend className="w-4 h-4" /> Shared with me
      </h3>
      {documents?.map((document) => (
        <div key={document?._id}>
          <Item
            icon={FileIcon}
            label={document?.title || "Untitled"}
            onClick={() => onRedirect(document?._id)}
            active={params.documentId === document?._id}
            documentIcon={document?.icon}
            id={document?._id}
          />
        </div>
      ))}
    </div>
  );
};
