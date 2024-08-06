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
    },
  };
  return (
    <motion.div
      {...anim(lampVariants)}
      className="hidden md:block absolute bottom-[-10px] z-0 bg-[beige] rounded-full left-1/2 -translate-x-1/2"
    />
  );
};
