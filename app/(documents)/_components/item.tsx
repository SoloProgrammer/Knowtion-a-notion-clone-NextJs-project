import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

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
  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;

  return (
    <div
      role="button"
      className={cn(
        "text-muted-foreground py-1 hover:bg-primary/5 text-sm flex items-center cursor-pointer w-full font-medium",
        active && "bg-primary/5 text-primary"
      )}
      style={{ paddingLeft: level ? `${level * 10 + 10}px` : "10px" }}
      onClick={onClick}
    >
      {!!id && (
        <div className="mr-2 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
          <ChevronIcon className="w-5 h-5 text-muted-foreground/80 shrink-0" />
        </div>
      )}
      {documentIcon ? (
        <div className="text-[18px] shrink-0 mr-2">{documentIcon}</div>
      ) : (
        <Icon className="h-[18px] shrink-0 mr-2" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto bg-muted font-medium border-b text-[10px] text-muted-foreground shadow-sm pointer-events-none select-none rounded inline-flex items-center mr-2 px-1 gap-1">
          <span>Ctrl</span>
          <span>K</span>
        </kbd>
      )}
    </div>
  );
};
