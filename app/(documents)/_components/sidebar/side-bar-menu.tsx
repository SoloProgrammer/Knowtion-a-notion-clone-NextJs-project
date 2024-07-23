"use client";

import { Text } from "lucide-react";

import { cn } from "@/lib/utils";

import { useMediaQuery } from "usehooks-ts";
import { useSideBar } from "@/hooks/zustand/use-sidebar";

import { HTMLAttributes } from "react";

export const SideBarMenu = ({
  className,
}: Omit<HTMLAttributes<SVGElement>, "onClick">) => {
  const { setIsCollapsed, setIsTransitioning, isCollapsed } = useSideBar();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Text
      onClick={() => {
        setIsCollapsed(false);
        setIsTransitioning?.(true);
        setTimeout(() => {
          setIsTransitioning?.(false);
        }, 400);
      }}
      className={cn(
        "text-primary/85 cursor-pointer shrink-0",
        !isCollapsed && !isMobile && "hidden",
        className
      )}
    />
  );
};
