"use client"

import { MouseEvent } from "react";
import { toast } from "sonner";

import { ChevronRight, LucideIcon, PlusIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

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
}: ItemProps) => {
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const handleExpand = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onExpand?.();
  };

  const handleCreateChildDocument = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!isExpanded) onExpand?.();
        // router.push(`/documents/${documentId}`);
      }
    );
    toast.promise(promise, {
      loading: "Creating a new child note...",
      success: "Child note created!",
      error: "Error happens while crearting a new child note!",
    });
  };

  return (
    <div
      role="button"
      className={cn(
        "group text-muted-foreground py-1 hover:bg-primary/5 text-sm flex items-center cursor-pointer w-full font-medium",
        active && "bg-primary/5 text-primary"
      )}
      style={{ paddingLeft: level ? `${level * 10 + 10}px` : "10px" }}
      onClick={onClick}
    >
      {!!id && (
        <div
          onClick={handleExpand}
          className="mr-2 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
        >
          <ChevronRight
            className={cn(
              "w-5 h-5 transition-transform text-muted-foreground/80 shrink-0",
              isExpanded && "rotate-[90deg]"
            )}
          />
        </div>
      )}
      {documentIcon ? (
        <div className="text-[18px] shrink-0 mr-2">{documentIcon}</div>
      ) : (
        <Icon className="h-[18px] shrink-0 mr-2" />
      )}
      <span className="truncate select-none">{label}</span>
      {isSearch && (
        <kbd className="ml-auto bg-muted font-medium border-b text-[10px] text-muted-foreground shadow-sm pointer-events-none select-none rounded inline-flex items-center mr-2 px-1 gap-1">
          <span>Ctrl</span>
          <span>K</span>
        </kbd>
      )}
      {!!id && (
        <div
          onClick={handleCreateChildDocument}
          className="opacity-0 ml-auto mr-2 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 group-hover:opacity-100"
        >
          <PlusIcon
            className={cn("w-4 h-4 text-muted-foreground/80 shrink-0")}
          />
        </div>
      )}
    </div>
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
