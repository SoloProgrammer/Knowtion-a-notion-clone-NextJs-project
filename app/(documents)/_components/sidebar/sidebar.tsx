"use client";

import Image from "next/image";
import Link from "next/link";
import { Raleway } from "next/font/google";
import { ElementRef, MouseEvent } from "react";

import { cn } from "@/lib/utils";

import {
  ChevronsLeft,
  Loader,
  PlusCircle,
  PlusIcon,
  Search,
  Settings,
  Trash,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSideBar } from "@/hooks/zustand/use-sidebar";
import { useSearch } from "@/hooks/zustand/use-search";

import { UserItem } from "../user-item";
import { Item } from "../item";
import { DocumentList } from "../document-list";
import { TrashPopPver } from "../trash-popover";
import { SettingsModal } from "@/components/modals/settings-modal";

import { MAX_WIDTH, MIN_WIDTH } from "./constants";
import { BRAND_NAME } from "@/app/constants";
import { useCreateNewDocument } from "../../(routes)/documents/hooks";

const font = Raleway({
  subsets: ["vietnamese"],
  weight: ["400", "600", "700"],
});

export const Sidebar = () => {
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { onCreateDocument: create, isPending } = useCreateNewDocument();

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const isResizingRef = useRef(false);
  const [isResetting, setIsResetting] = useState(false);
  const { isCollapsed, setIsCollapsed, isTrasitioning } = useSideBar(isMobile);
  const { openSearch } = useSearch();

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

  const onCreateDocument = () => create({ title: "Untitled" });

  useEffect(() => {
    isMobile && setIsCollapsed(true);
  }, [pathName]);

  useEffect(() => {
    isCollapsed && !isMobile && setIsCollapsed(false);
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "w-[90%] md:w-[250px] relative flex flex-col h-full group/sidebar bg-neutral-100 dark:bg-neutral-900 overflow-y-auto z-[99999] border-r overflow-x-hidden",
        isMobile &&
          "fixed transition-all h-full w-[90%] left-0 top-0 duration-500",
        isMobile && isCollapsed && "-left-full",

        isResetting && "transition-all duration-500",
        isCollapsed && "!w-0 transition-all",
        isTrasitioning && "transition-all ease-in-expo duration-500"
      )}
    >
      <div className="flex-grow pb-5">
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
        <Item icon={Search} label="Search" isSearch onClick={openSearch} />
        <SettingsModal>
          <Item icon={Settings} label="Settings" />
        </SettingsModal>
        <Item
          icon={isPending ? Loader : PlusCircle}
          label="New page"
          isLoading={isPending}
          onClick={onCreateDocument}
        />
        <div className="mt-5">
          <DocumentList />
          <Item
            icon={isPending ? Loader : PlusIcon}
            label="Add a page"
            onClick={onCreateDocument}
            isLoading={isPending}
          />
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
      </div>
      <Link href={"/"}>
        <div className="px-3 hover:bg-primary/5 transition cursor-pointer h-[55px] border-t flex items-center gap-x-2 group">
          <div className="w-6 h-6 relative truncate">
            <Image
              src={"/logo.png"}
              fill
              alt="logo"
              className="object-cover dark:invert"
            />
          </div>
          <span
            className={cn(
              font.className,
              "text-muted-foreground font-semibold truncate group-hover:text-primary"
            )}
          >
            {BRAND_NAME}
          </span>
        </div>
      </Link>
    </aside>
  );
};
