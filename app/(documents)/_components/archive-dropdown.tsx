"use client";

import { MouseEvent, PropsWithChildren } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Trash } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";

import { getFromNowDate } from "@/utils/date";

import { useUser } from "@clerk/clerk-react";
import { useArchiveDocumentMutation } from "../(routes)/documents/hooks";

type ArchiveDropDownProps = {
  documentId: Id<"documents">;
  lastEdited: number;
  lastEditedBy:string | undefined;
  align?: "start" | "center" | "end";
  side?: "bottom" | "left" | "right" | "top";
  disabled?: boolean;
};

export const ArchiveDropDown = ({
  documentId,
  children,
  lastEdited,
  lastEditedBy,
  align = "start",
  side = "right",
  disabled = false,
}: PropsWithChildren<ArchiveDropDownProps>) => {
  const { user } = useUser();
  const { isArchiving, archive } = useArchiveDocumentMutation();

  const handleArchive = (e: MouseEvent) => {
    e.stopPropagation();
    if (!documentId) return;
    archive({ id: documentId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72"
        forceMount
        side={side}
        align={align}
      >
        <DropdownMenuItem
          disabled={disabled || isArchiving}
          className="text-muted-foreground"
          onClick={handleArchive}
        >
          <Trash className="w-4 h-4 mr-1" /> <span>Delete</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2 py-3">
          <span>
            Last edited {getFromNowDate(lastEdited)} by: {lastEditedBy}
          </span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
