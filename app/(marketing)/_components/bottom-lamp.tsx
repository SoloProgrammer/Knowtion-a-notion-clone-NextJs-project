"use client";

import { anim } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";

export const BottomLamp = () => {
  const { scrollYProgress } = useScroll();
  const w = useTransform(scrollYProgress, [0, 1], [230, -3000]);
  const lampVariants = {
    initial: {
      width: 0,
      height: 0,
    },
    animate: {
      width: 230,
      height: 230,
      transition: {
        duration: 0.4,
        delay: 0.25,
      },
    },
  };
  return (
    <motion.span
      {...anim(lampVariants)}
      style={{ width: w }}
      className="hidden md:inline absolute top-[65%] z-0 bg-[beige] rounded-full left-1/2 -translate-x-1/2"
    />
  );
};
