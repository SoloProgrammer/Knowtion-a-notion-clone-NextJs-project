"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { PropsWithChildren, useEffect } from "react";

export const DocumentLayoutProvider = ({ children }: PropsWithChildren) => {
  // Hiding vertical scrollbar of body tag on documents page
  useEffect(() => {
    const body = (document as Document).getElementsByTagName("body")[0];
    body.style.overflowY = "hidden";
    return () => {
      body.style.overflowY = "auto";
    };
  }, []);

  return <TooltipProvider>{children}</TooltipProvider>;
};
