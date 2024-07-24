"use client";

import { useSideBar } from "@/hooks/zustand/use-sidebar";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export const PreviewIndicator = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { isCollapsed } = useSideBar()
  return (
    <div
      {...props}
      className={cn(
        "fixed bottom-0 left-1/2 md:left-[60%] -translate-x-1/2 text-[.8rem] bg-green-400 px-2 rounded-t text-black/80 font-medium z-10 ease-linear",
        isCollapsed && "md:left-1/2",
        className
      )}
    >
      preview mode
    </div>
  );
};
