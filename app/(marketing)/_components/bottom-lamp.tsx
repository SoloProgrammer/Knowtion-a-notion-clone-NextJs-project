"use client";

import { anim } from "@/lib/utils";
import { motion } from "framer-motion";

export const BottomLamp = () => {
  const lampVariants = {
    initial: {
      width: 90,
      height: 90,
    },
    animate: {
      width: 220,
      height: 220,
      transition: {
        duration: 0.4,
        delay: 0.45,
      },
    },
  };
  return (
    <motion.span
      {...anim(lampVariants)}
      className="hidden md:inline absolute top-[65%] z-0 bg-[beige] rounded-full left-1/2 -translate-x-1/2"
    />
  );
};
