"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export const TextTranslate = ({
  className,
  children,
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) => {
  const { scrollYProgress: WindowScrollProgress } = useScroll();

  const translateX = useTransform(WindowScrollProgress, [0, 1], [550, -550]);

  return (
    <motion.h1
      initial={{
        x: -1000,
      }}
      style={{
        translateX,
      }}
      className={cn(
        "text-[120px] md:text-[220px] tracking-tight font-bold text-nowrap text-neutral-300 dark:text-neutral-700 z-[-1] fixed bottom-10 md:bottom-0",
        className
      )}
    >
      {children}
    </motion.h1>
  );
};
