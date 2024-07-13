"use client";

import { FileIcon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Item } from "./item";

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

  const documents = useQuery(api.documents.getDocumentsByParentDocument, {
    parentDocument,
  });

  if (!documents) {
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
      <p
        style={{
          paddingLeft: level ? `${17 + 25 + (level - 1) * 10}px` : "24px",
        }}
        className={cn(
          "hidden text-muted-foreground/80 text-sm py-1",
          expanded && "last:block",
          level === 0 && "!hidden"
        )}
      >
        No pages inside
      </p>
      {documents.map((document) => (
        <>
          <Item
            icon={FileIcon}
            label={document.title}
            onClick={() => onRedirect(document._id)}
            active={params.documentId === document._id}
            documentIcon={document.icon}
            id={document._id}
            isExpanded={expanded[document._id]}
            level={level}
            onExpand={() => onExpand(document._id)}
          />
          {expanded[document._id] && (
            <DocumentList level={level + 1} parentDocument={document._id} />
          )}
        </>
      ))}
    </div>
  );
};
