"use client";

import { FileIcon, Folder } from "lucide-react";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Item } from "./item";
import { useGetSidebarDocumentsQuery } from "../(routes)/documents/hooks";

type DocumentListProps = {
  parentDocument?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
};

export const DocumentList = ({
  parentDocument,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const onRedirect = (documentId: string) =>
    router.push(`/documents/${documentId}`);

  const { data: documents, isLoading } =
    useGetSidebarDocumentsQuery(parentDocument);

  if (isLoading) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <div>
      <h3
        className={cn(
          "px-4 pb-3 text-primary/80 flex items-center gap-x-2 text-sm font-semibold",
          (level > 0 || !documents || documents.length < 1) && "hidden"
        )}
      >
        <Folder className="w-4 h-4" />
        <span className="truncate">My documents</span>
      </h3>
      <p
        style={{
          paddingLeft: level ? `${17 + 25 + (level - 1) * 10}px` : "24px",
        }}
        className={cn(
          "hidden text-muted-foreground/80 text-sm py-1 truncate",
          expanded && "last:block",
          level === 0 && "!hidden"
        )}
      >
        No pages inside
      </p>
      {documents?.map((document) => (
        <div key={document._id}>
          <Item
            icon={FileIcon}
            label={document.title || "Untitled"}
            onClick={() => onRedirect(document._id)}
            active={params.documentId === document._id}
            documentIcon={document.icon}
            id={document._id}
            isExpanded={expanded[document._id]}
            level={level}
            onExpand={() => onExpand(document._id)}
            lastEdited={document.updatedAt}
            lastEditedBy={document.editedBy}
          />
          {expanded[document._id] && (
            <DocumentList level={level + 1} parentDocument={document._id} />
          )}
        </div>
      ))}
    </div>
  );
};
