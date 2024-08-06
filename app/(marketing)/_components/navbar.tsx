"use client";

import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/clerk-react";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { useConvexAuth } from "convex/react";

import { FileInput } from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Spinner } from "@/components/spinner";

import { BRAND_NAME } from "@/app/constants";
import { LoginButton } from "./login-button";

export const Navbar = () => {
  const isScrolled = useScrollTop();
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div
      className={cn(
        "px-4 md:px-6 py-3 md:py-4 fixed top-0 left-0 w-full  backdrop-blur-md transition-colors flex justify-between items-center z-[9999]",
        isScrolled && "shadow-sm bg-white bg-transparent border-b"
      )}
    >
      <Logo className="flex" hideBrandName={false} />
      <div className="flex items-center gap-2">
        <ModeToggle />
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Spinner />
          ) : !isAuthenticated && !isLoading ? (
            <LoginButton />
          ) : (
            <div className="flex items-center gap-2">
              <Link href={"/documents"} className="hidden md:block">
                <Button variant={"ghost"} size={"sm"}>
                  <span className="text-sm">Enter {BRAND_NAME}</span>
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
