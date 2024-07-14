"use client";

import { MouseEvent, PropsWithChildren } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import { Trash } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";

type ArchiveDropDownProps = {
  documentId: Id<"documents">;
};

export const ArchiveDropDown = ({
  documentId,
  children,
}: PropsWithChildren<ArchiveDropDownProps>) => {
  const { user } = useUser();
  const archive = useMutation(api.documents.archiveDocument);

  const handleArchive = (e: MouseEvent) => {
    e.stopPropagation();
    if (!documentId) return;
    const promise = archive({ id: documentId });
    toast.promise(promise, {
      loading: "Moving note to trash...",
      success: "Note trashed",
      error: "Error moving note to trash. Try again!",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72"
        forceMount
        side="right"
        align="start"
      >
        <DropdownMenuItem
          className="text-muted-foreground"
          onClick={handleArchive}
        >
          <Trash className="w-4 h-4 mr-1" /> <span>Delete</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2 py-3">
          <span>Last edited by: {user?.fullName}</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
