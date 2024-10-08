"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import { anim } from "@/lib/utils";

export const Heros = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { scrollYProgress } = useScroll();

  const xP = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 700]); // positive x value
  const xN = useTransform(xP, (value) => -value); // converting x value to negative
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 2 : 1.5]);

  const opacity = {
    initial: {
      opacity: 0.5,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <div className="flex flex-col max-w-5xl mx-auto justify-center items-center relative">
      <div className="flex items-center">
        <motion.div
          {...anim(opacity)}
          style={{ x: xN, scale }}
          className="relative hidden md:block w-[400px] h-[400px]"
        >
          <Image
            src={"/notion-1-image.png"}
            alt="notion-image"
            fill
            className="dark:invert"
          />
        </motion.div>
        <motion.div
          {...anim(opacity)}
          style={{ x: xP, scale, translateY: "-20px" }}
          className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]"
        >
          <Image
            src={"/notion-2-image.png"}
            alt="notion-image"
            fill
            className="dark:invert z-[1]"
          />
        </motion.div>
      </div>
    </div>
  );
};
