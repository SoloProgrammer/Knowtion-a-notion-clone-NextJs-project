"use client"

import { cn } from "@/lib/utils";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import { HTMLAttributes } from "react";
export const ScrollDownIcon = ({
  className,
}: Omit<HTMLAttributes<HTMLButtonElement>, "onClick">) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 1], [1, -10]);
  return (
    <motion.div
      style={{ opacity }}
      className={cn(
        "absolute w-10 h-10 bottom-4 left-1/2 -translate-x-1/2",
        className
      )}
    >
      <Image
        src={"/scroll.gif"}
        alt="scroll-down"
        fill
        className="invert dark:invert-0"
      />
    </motion.div>
  );
};
