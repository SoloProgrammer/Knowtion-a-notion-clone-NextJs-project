"use client";

import Image from "next/image";
import { Raleway } from "next/font/google";
import { BRAND_NAME, DARK } from "@/app/constants";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { useTheme } from "next-themes";
const font = Raleway({
  subsets: ["vietnamese"],
  weight: ["400", "600", "700"],
});
export const Logo = ({
  className,
  hideBrandName = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { hideBrandName?: boolean }) => {
  return (
    <div
      {...props}
      className={cn("hidden md:flex items-center gap-x-2", className)}
    >
      <div className="w-[25px] h-[25px] md:w-[35px] md:h-[35px] relative">
        <Image src={"/logo.png"} alt="logo" fill className="dark:hidden" />
        <Image
          src={"/logo-dark.png"}
          alt="logo"
          fill
          className="hidden dark:block"
        />
      </div>{" "}
      <p
        className={cn(
          font.className,
          "font-bold text-sm md:text-lg",
          hideBrandName && "hidden"
        )}
      >
        {BRAND_NAME}
      </p>
    </div>
  );
};
