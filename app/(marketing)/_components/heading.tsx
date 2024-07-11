"use client";

import { BRAND_NAME } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
  return (
    <div className="max-w-3xl space-y-1 mx-auto flex flex-col gap-3 items-center mt-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
        Your Ideas, Documents. & Plans. Unified. Welcome to{" "}
        <span className="underline">{BRAND_NAME}</span>
      </h1>
      <h3>
        {BRAND_NAME} is the connected workspace where <br />
        better, faster work happens
      </h3>
      <Button>
        Enter {BRAND_NAME} <ArrowRight className="w-4 h-4 ml-2"/>
      </Button>
    </div>
  );
};
