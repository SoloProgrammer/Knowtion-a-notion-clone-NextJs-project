"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft } from "lucide-react";
import { usePathname } from "next/navigation";

import { ElementRef, MouseEvent, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSideBar } from "../zustand-store/sidebar-store";

export const Sidebar = () => {
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const isResizingRef = useRef(false);
  const [isResetting, setIsResetting] = useState(false);
  const { isCollapsed, setIsCollapsed, isTrasitioning } = useSideBar(isMobile);

  const MAX_WIDTH = 450;
  const MIN_WIDTH = 250;

  const handleDragStart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    e.stopPropagation();
    const newWidth = e.clientX;
    if (newWidth < MAX_WIDTH && newWidth >= MIN_WIDTH && sidebarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleResetSideBarWidth = () => {
    setIsResetting(true);
    if (sidebarRef.current && !isMobile) {
      sidebarRef.current.style.width = `${MIN_WIDTH}px`;
    }
    if (isMobile) setIsCollapsed(true);
    setTimeout(() => {
      setIsResetting(false);
    }, 300);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "w-64 relative flex flex-col h-full group/sidebar bg-neutral-100 dark:bg-neutral-900 overflow-y-auto z-[99999] border-r",
          isMobile && "fixed transition-all h-full w-[90%] left-0 top-0",
          isMobile && isCollapsed && "-left-full",
          isResetting && "transition-all",
          isCollapsed && "!w-0 transition-all",
          isTrasitioning && 'transition-all ease-in-expo'
        )}
      >
        <div
          className={cn(
            "hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground absolute right-3 top-2 opacity-0 group-hover/sidebar:opacity-100 rounded-sm cursor-pointer",
            isMobile && "opacity-100 bg-neutral-300 dark:bg-neutral-600"
          )}
          onClick={() => setIsCollapsed(true)}
        >
          <ChevronsLeft className="w-5 h-5 shrink-0" />
        </div>
        <div>
          <p className="line-clamp-1">Action items</p>
        </div>
        <div>
          <p className="line-clamp-1">Documents</p>
        </div>
        <div
          onMouseDown={handleDragStart}
          onClick={handleResetSideBarWidth}
          className="absolute top-0 right-0 bg-primary/10 h-full w-1 cursor-ew-resize opacity-0 group-hover/sidebar:opacity-100 transition-opacity"
        />
      </aside>
    </>
  );
};
