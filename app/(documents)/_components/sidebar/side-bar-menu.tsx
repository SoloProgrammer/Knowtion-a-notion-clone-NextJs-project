"use client";

import { AlignJustify } from "lucide-react";

import { cn } from "@/lib/utils";

import { useSideBar } from "../../zustand-store/sidebar-store";
import { useMediaQuery } from "usehooks-ts";

export const SideBarMenu = () => {
  const { setIsCollapsed, setIsTrasitioning, isCollapsed } = useSideBar();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <AlignJustify
      onClick={() => {
        setIsCollapsed(false);
        setIsTrasitioning?.(true);
        setTimeout(() => {
          setIsTrasitioning?.(false);
        }, 300);
      }}
      className={cn(
        "text-muted-foreground cursor-pointer",
        !isCollapsed && !isMobile && "hidden"
      )}
    />
  );
};
