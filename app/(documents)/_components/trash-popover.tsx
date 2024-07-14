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

import { toast } from "sonner";

import { FileIcon, SearchIcon, Trash, Undo } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useMutation, useQuery } from "convex/react";
import { useMediaQuery } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";

type TrashPopOverProps = {};

export const TrashPopPver = ({
  children,
}: PropsWithChildren<TrashPopOverProps>) => {
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
  const documents = useQuery(api.documents.getArchiveDocuments);
  const remove = useMutation(api.documents.deleteDocument);
  const restore = useMutation(api.documents.restoreArchives);
  const params = useParams();
  const router = useRouter();

  const [query, setQuery] = useState<string>("");

  const filteredDocuments = documents?.filter((doc) =>
    document.title.toLowerCase().includes(query.toLowerCase())
  );

  const onClick = (documentId: string) => {
    router.push(`documents/${documentId}`);
  };

  const onRestore = (e: MouseEvent, documentId: Id<"documents">) => {
    e.stopPropagation();
    e.preventDefault();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Error restoring Note. Try again!",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note Deleted!",
      error: "Error deleting Note. Try again!",
    });
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (!documents) {
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
          <div
            role="button"
            onClick={() => onClick(document._id)}
            className="flex w-full justify-between items-center text-primary hover:bg-primary/5 py-[0.35rem] px-1 rounded-sm text-sm"
            key={document._id}
          >
            <span className="truncate pl-1 flex items-center gap-x-1">
              <span className="text-muted-foreground">
                {document.icon ? (
                  document.icon
                ) : (
                  <FileIcon className="w-4 h-4" />
                )}
              </span>
              <span>{document.title}</span>
            </span>
            <div className="flex items-center text-muted-foreground mr-[0.1rem]">
              <div
                onClick={(e) => onRestore(e, document._id)}
                className="p-1 hover:bg-primary/15 rounded-sm hover:text-primary"
              >
                <Undo className="w-4 h-4 shrink-0" />
              </div>
              <ConfirmModal
                onConfirm={() => onRemove(document._id)}
                description="This action cannot be undone. This will permanently delete your note!"
                btnCopy="Delete note"
              >
                <div className="p-1 hover:bg-primary/15 rounded-sm hover:text-primary">
                  <Trash className="w-4 h-4 shrink-0" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
