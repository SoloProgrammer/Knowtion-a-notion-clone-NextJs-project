"use client";

import { ElementRef, MouseEvent } from "react";

import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  PlusCircle,
  PlusIcon,
  Search,
  Settings,
  Trash,
} from "lucide-react";

import { toast } from "sonner";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSideBar } from "@/hooks/zustand/use-sidebar";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";

import { UserItem } from "../user-item";
import { Item } from "../item";
import { DocumentList } from "../document-list";
import { TrashPopPver } from "../trash-popover";
import { SettingsModal } from "@/components/modals/settings-modal";

import { MAX_WIDTH, MIN_WIDTH } from "./constants";

export const Sidebar = () => {
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const isResizingRef = useRef(false);
  const [isResetting, setIsResetting] = useState(false);
  const { isCollapsed, setIsCollapsed, isTrasitioning } = useSideBar(isMobile);

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
    }, 400);
  };

  const onCreateNote = () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created!",
      error: "Error happens while crearting a new note!",
    });
  };

  useEffect(() => {
    isMobile && setIsCollapsed(true);
  }, [pathName]);

  useEffect(() => {
    isCollapsed && !isMobile && setIsCollapsed(false);
  }, []);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "w-[250px] relative flex flex-col h-full group/sidebar bg-neutral-100 dark:bg-neutral-900 overflow-y-auto z-[99999] border-r pb-10",
          isMobile &&
            "fixed transition-all h-full w-[90%] left-0 top-0 duration-500",
          isMobile && isCollapsed && "-left-full",
          isResetting && "transition-all duration-500",
          isCollapsed && "!w-0 transition-all",
          isTrasitioning && "transition-all ease-in-expo duration-500"
        )}
      >
        <div
          role="button"
          className={cn(
            "hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground absolute right-3 top-[.9rem] opacity-0 group-hover/sidebar:opacity-100 rounded-sm cursor-pointer",
            isMobile && "opacity-100 bg-neutral-300 dark:bg-neutral-600"
          )}
          onClick={() => setIsCollapsed(true)}
        >
          <ChevronsLeft className="w-5 h-5 shrink-0" />
        </div>
        <div>
          <UserItem />
        </div>
        <Item icon={Search} label="Search" isSearch />
        <SettingsModal>
          <Item icon={Settings} label="Settings" />
        </SettingsModal>
        <Item icon={PlusCircle} label="New page" onClick={onCreateNote} />
        <div className="mt-5">
          <DocumentList />
          <Item icon={PlusIcon} label="Add a page" onClick={onCreateNote} />
          <TrashPopPver>
            <div className="mt-5">
              <Item icon={Trash} label="Trash" />
            </div>
          </TrashPopPver>
        </div>
        <div
          onMouseDown={handleDragStart}
          onClick={handleResetSideBarWidth}
          className="absolute top-0 right-0 bg-primary/10 h-full w-1 cursor-ew-resize opacity-0 group-hover/sidebar:opacity-100 transition-opacity hover:border-x-[0.05rem] hover:border-neutral-500"
        />
      </aside>
    </>
  );
};
