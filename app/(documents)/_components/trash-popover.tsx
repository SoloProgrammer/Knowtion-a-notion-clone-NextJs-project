"use client";

import { MouseEvent, PropsWithChildren, useState } from "react";

import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-action-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FileIcon, SearchIcon, Trash, Undo } from "lucide-react";

import { Doc, Id } from "@/convex/_generated/dataModel";

import { cn } from "@/lib/utils";

import { useParams, useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import {
  useDeleteDocumentMutation,
  useGetArchiveDocumentsQuery,
  useRestoreDocumentMutation,
} from "../(routes)/documents/hooks";

type TrashDocumentItemProps = {
  document: Doc<"documents">;
};

export const TrashPopPver = ({ children }: PropsWithChildren) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        forceMount
        side={isMobile ? "bottom" : "right"}
        className="p-0 mr-1"
      >
        <TrashBox />
      </PopoverContent>
    </Popover>
  );
};

const TrashBox = () => {
  const { data: documents, isLoading } = useGetArchiveDocumentsQuery();

  const [query, setQuery] = useState<string>("");

  const filteredDocuments = documents?.filter((document) =>
    document.title.toLowerCase().includes(query.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-5">
        <Spinner size={"lg"} />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-1 p-2">
        <SearchIcon className="w-4 h-4 mx-1" />
        <Input
          value={query}
          autoFocus
          onChange={(e) => setQuery(e.target.value)}
          className="px-2 h-7 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title"
        />
      </div>
      <div className="mt-4 px-1 pb-1">
        <p className="hidden last:block text-center pb-6">No documents found</p>
        {filteredDocuments?.map((document) => (
          <TrashDocumentItem key={document._id} document={document} />
        ))}
      </div>
    </div>
  );
};

const TrashDocumentItem = ({ document }: TrashDocumentItemProps) => {
  const { remove, isDeleting } = useDeleteDocumentMutation();
  const { restore, isRestoring } = useRestoreDocumentMutation();
  const params = useParams();
  const router = useRouter();
  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (e: MouseEvent, documentId: Id<"documents">) => {
    e.stopPropagation();
    e.preventDefault();
    restore({ id: documentId });
  };

  const onRemove = (documentId: Id<"documents">) => {
    remove({ id: documentId });
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  return (
    <div
      role="button"
      onClick={() => onClick(document._id)}
      className={cn(
        "flex w-full justify-between items-center text-primary hover:bg-primary/5 py-[0.35rem] px-1 rounded-sm text-sm group mt-1",
        params.documentId === document._id && "bg-primary/5"
      )}
      key={document._id}
    >
      <span
        className={cn(
          "truncate pl-1 flex items-center gap-x-1 text-muted-foreground group-hover:text-primary font-medium",
          params.documentId === document._id && "text-primary"
        )}
      >
        <span className="text-muted-foreground">
          {document.icon ? document.icon : <FileIcon className="w-4 h-4" />}
        </span>
        <span>{document.title}</span>
      </span>
      <div className="flex items-center text-muted-foreground mr-[0.1rem]">
        <button
          disabled={isRestoring}
          onClick={(e) => onRestore(e, document._id)}
          className="p-1 hover:bg-primary/15 rounded-sm hover:text-primary"
        >
          {isRestoring ? <Spinner /> : <Undo className="w-4 h-4 shrink-0" />}
        </button>
        <ConfirmModal
          onConfirm={() => onRemove(document._id)}
          description="This action cannot be undone. This will permanently delete your note!"
          btnCopy="Delete note"
        >
          <button
            disabled={isDeleting}
            className="p-1 hover:bg-primary/15 rounded-sm hover:text-primary"
          >
            {isDeleting ? <Spinner /> : <Trash className="w-4 h-4 shrink-0" />}
          </button>
        </ConfirmModal>
      </div>
    </div>
  );
};
