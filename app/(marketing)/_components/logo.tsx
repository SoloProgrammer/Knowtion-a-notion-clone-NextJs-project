"use client";

import Link from "next/link";
import Image from "next/image";
import { Raleway } from "next/font/google";
import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { BRAND_NAME } from "@/app/constants";

const font = Raleway({
  subsets: ["vietnamese"],
  weight: ["400", "600", "700"],
});

export const Logo = ({
  className,
  hideBrandName = false,
  ...props
}: HTMLAttributes<HTMLAnchorElement> & { hideBrandName?: boolean }) => {
  return (
    <Link
      href={"/"}
      {...props}
      className={cn("hidden md:inline-flex items-center gap-x-2", className)}
    >
      <div className="w-[25px] h-[25px] md:w-[35px] md:h-[35px] relative">
        <Image
          src={"/logo-dark.png"}
          alt="logo"
          fill
          className="invert dark:invert-0"
        />
      </div>
      <p
        className={cn(
          font.className,
          "font-bold md:text-lg",
          hideBrandName && "hidden"
        )}
      >
        {BRAND_NAME}
      </p>
    </Link>
  );
};
