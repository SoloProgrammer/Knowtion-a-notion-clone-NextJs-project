"use client"

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export const Navbar = () => {
    const isScrolled = useScrollTop()
  return <div className={cn("p-6 pt-5 fixed top-0 left-0 w-full transition-colors", isScrolled && 'shadow-sm bg-white border-b')}>
    <Logo className="[&>div+p]:hidden md:[&>div+p]:block flex"/>
  </div>;
};

