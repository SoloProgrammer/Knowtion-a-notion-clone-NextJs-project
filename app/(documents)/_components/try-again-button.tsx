"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import { HTMLAttributes, PropsWithChildren } from "react";

export const TryAgainButton = ({
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) => {
  return (
    <Button {...props} size={"sm"} className={cn(className)}>
      <RefreshCcw className="w-4 h-4 mr-2" />
      Try again
    </Button>
  );
};
