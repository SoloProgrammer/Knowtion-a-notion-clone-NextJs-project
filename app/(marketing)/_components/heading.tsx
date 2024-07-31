"use client";

import { BRAND_NAME } from "@/app/constants";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";

import { useConvexAuth } from "convex/react";

import { ArrowRight } from "lucide-react";
import { LoginButton } from "./login-button";
import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-1 mx-auto flex flex-col gap-5 items-center mt-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold px-2">
        Your Ideas, Documents. & Plans. Unified. Welcome to{" "}
        <span className="underline">{BRAND_NAME}</span>
      </h1>
      <h3>
        {BRAND_NAME} is the connected workspace where <br />
        better, faster work happens
      </h3>
      {isLoading && (
        <div className="py-[0.6rem] px-3 text-center mt-10">
          <Spinner />
        </div>
      )}
      {!isLoading && isAuthenticated && (
        <Link href={"/documents"}>
          <Button className="group z-10 relative" size="sm">
            Enter {BRAND_NAME}{" "}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
          </Button>
        </Link>
      )}
      {!isAuthenticated && !isLoading && <LoginButton className="text-sm" />}
    </div>
  );
};
