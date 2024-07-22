"use client";

import { MouseEvent, useEffect } from "react";

import {
  ChevronRight,
  Loader,
  LucideIcon,
  MoreHorizontal,
  PlusIcon,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { ArchiveDropDown } from "./archive-dropdown";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { useCreateNewDocumentMutation } from "../(routes)/documents/hooks";

type ItemProps = {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  isExpanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
  lastEdited?: number;
  isLoading?: boolean;
};

export const Item = ({
  id,
  documentIcon,
  active,
  isExpanded,
  isSearch,
  level = 0,
  onExpand,
  label,
  onClick,
  icon: Icon,
  lastEdited,
  isLoading = false,
}: ItemProps) => {
  const { onCreateDocument, isCreating, documentId } =
    useCreateNewDocumentMutation();

  const handleExpand = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onExpand?.();
  };

  const handleCreateChildDocument = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onCreateDocument({ title: "Untitled", parentDocument: id });
  };

  useEffect(() => {
    if (documentId) !isExpanded && onExpand?.();
  }, [documentId]);

  const CreateChildDocumentIcon = isCreating ? Loader : PlusIcon;

  return (
    <button
      className={cn(
        "group text-muted-foreground py-2 md:py-1 hover:bg-primary/5 text-sm flex items-center cursor-pointer w-full font-medium disabled:cursor-progress disabled:opacity-80",
        active && "bg-primary/5 text-primary"
      )}
      style={{ paddingLeft: level ? `${level * 10 + 10}px` : "10px" }}
      onClick={onClick}
      disabled={isLoading}
      aria-disabled={isLoading}
    >
      {!!id && (
        <button
          onClick={handleExpand}
          className="mr-2 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
        >
          <ChevronRight
            className={cn(
              "w-5 h-5 transition-transform text-muted-foreground/80 shrink-0",
              isExpanded && "rotate-[90deg]"
            )}
          />
        </button>
      )}

      {documentIcon ? (
        <div className="text-[17px] shrink-0 mr-2 select-none">
          {documentIcon}
        </div>
      ) : (
        <Icon
          className={cn("h-[18px] shrink-0 mr-2", isLoading && "animate-spin")}
        />
      )}

      <span className="truncate select-none mr-2">{label}</span>

      {isSearch && (
        <kbd className="ml-auto bg-muted font-medium border-b text-[10px] text-muted-foreground shadow-sm pointer-events-none select-none rounded inline-flex items-center mr-2 px-1 gap-1">
          <span>Ctrl</span>
          <span>K</span>
        </kbd>
      )}

      {!!id && (
        <div className="flex ml-auto items-center gap-x-1">
          <ArchiveDropDown documentId={id} lastEdited={lastEdited!}>
            <button className="opacity-0 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 group-hover:opacity-100">
              <MoreHorizontal
                className={cn(
                  "w-5 h-5 md:w-4 md:h-4 text-muted-foreground/80 shrink-0"
                )}
              />
            </button>
          </ArchiveDropDown>

          <button
            disabled={isCreating}
            onClick={handleCreateChildDocument}
            className="opacity-0  mr-2 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 group-hover:opacity-100"
          >
            <CreateChildDocumentIcon
              className={cn(
                "w-5 h-5 md:w-4 md:h-4 text-muted-foreground/80 shrink-0",
                isCreating && "animate-spin"
              )}
            />
          </button>
        </div>
      )}
    </button>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      className="flex items-center py-1 gap-x-1 mr-2"
      style={{
        paddingLeft: level ? `${17 + 25 + (level - 1) * 10}px` : "12px",
      }}
    >
      <Skeleton className="h-5 w-5 bg-neutral-200 dark:bg-neutral-800" />
      <Skeleton className="h-5 flex-grow bg-neutral-200 dark:bg-neutral-800" />
    </div>
  );
};
