"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const isScrolled = useScrollTop();
  return (
    <div
      className={cn(
        "p-6 py-4 fixed top-0 left-0 w-full transition-colors flex justify-between items-center",
        isScrolled && "shadow-sm bg-white dark:bg-neutral-900 border-b"
      )}
    >
      <Logo className="[&>div+p]:hidden md:[&>div+p]:block flex" />
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button variant={"ghost"} size={"sm"} className="font-medium border">
          <span className="hidden md:block">Login </span>
          <LogIn className="w-4 h-4 ml-0 md:ml-2" />
        </Button>
      </div>
    </div>
  );
};
