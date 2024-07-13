"use client";

import { Text } from "lucide-react";

import { cn } from "@/lib/utils";

import { useSideBar } from "../../zustand-store/sidebar-store";
import { useMediaQuery } from "usehooks-ts";

import { HTMLAttributes } from "react";

export const SideBarMenu = ({
  className,
}: Omit<HTMLAttributes<SVGElement>, "onClick">) => {
  const { setIsCollapsed, setIsTrasitioning, isCollapsed } = useSideBar();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Text
      onClick={() => {
        setIsCollapsed(false);
        setIsTrasitioning?.(true);
        setTimeout(() => {
          setIsTrasitioning?.(false);
        }, 400);
      }}
      className={cn(
        "text-muted-foreground cursor-pointer",
        !isCollapsed && !isMobile && "hidden",
        className
      )}
    />
  );
};
