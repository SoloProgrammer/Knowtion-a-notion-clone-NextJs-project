"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { FileInput } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { BRAND_NAME } from "@/app/constants";
import Link from "next/link";

export const Navbar = () => {
  const isScrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div
      className={cn(
        "px-3 md:px-6 py-4 fixed top-0 left-0 w-full transition-colors flex justify-between items-center",
        isScrolled && "shadow-sm bg-white dark:bg-neutral-900 border-b"
      )}
    >
      <Logo className="[&>div+p]:hidden md:[&>div+p]:block flex" />
      <div className="flex items-center gap-2">
        <ModeToggle />
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Spinner />
          ) : !isAuthenticated && !isLoading ? (
            <SignInButton mode="modal">
              <Button variant={"default"} size="sm" className="text-xs">
                Get knowtion free
              </Button>
            </SignInButton>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={"/documents"} className="">
                <Button variant={"ghost"} size={"sm"}>
                  <span className="text-sm">
                    Enter {BRAND_NAME}
                  </span>
                  <FileInput className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <UserButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
