"use client";

import { BRAND_NAME } from "@/app/constants";
import { cn } from "@/lib/utils";

import {
  motion,
  MotionValue,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { ElementRef, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

export const BentoGrid = () => {
  const scrollContainerRef = useRef<ElementRef<"div"> | null>(null);
  const { scrollYProgress } = useScroll({
    // target: scrollContainerRef,
    // offset: ["start end", "start end"],
  });
  const textTranslateX = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const textTranslateY = useTransform(scrollYProgress, [0, 1], [-600, 140]);

  return (
    <div
      ref={scrollContainerRef}
      className="h-[110rem] bg-muted/ flex justify-center items-center flex-col relative"
    >
      <div className="max-w-7xl mx-auto p-5 columns-1 md:columns-2 gap-3 group">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Card index={i} scrollY={scrollYProgress} />
          ))}
      </div>
      <motion.h1
        style={{
          translateX: textTranslateX,
          translateY: textTranslateY,
        }}
        className="text-[220px] tracking-tight font-bold absolute text-nowrap bottom-[200px] text-muted-foreground z-[-1]"
      >
        KNOWTION KNOWTION KNOWTION KNOWTION KNOWTION KNOWTION KNOWTION KNOWTION
      </motion.h1>
    </div>
  );
};

const Card = ({
  index,
  scrollY,
}: {
  index: number;
  scrollY: MotionValue<number>;
}) => {
  const cardContainerRef = useRef<ElementRef<"div"> | null>(null);
  const inView = useInView(cardContainerRef, {
    margin: "-45%",
    once: true,
  });

  const isMobile = useMediaQuery("(max-width:768px)");

  const translate = useTransform(
    scrollY,
    [0, 1],
    isMobile ? [100, 0] : [index > 1 ? 100 : -100, index > 1 ? -295 : -200]
  );

  return (
    <motion.div
      ref={cardContainerRef}
      style={{
        translateY: translate,
      }}
      className="p-[2px] mb-3 inline-block rounded-md overflow-hidden"
    >
      <div
        key={index}
        className={`relative w-full h-full rounded-md before:absolute before:h-[200%] before:left-1/2 before:-translate-x-1/2 before:bg-cyan-300 before:w-[150px] before:z-[-1] before:top-[43%] before:-translate-y-1/2 z-10 before:animate-rotater before:origin-center`}
      >
        <div className="w-full p-5 h-full bg-neutral-200 dark:bg-neutral-800 rounded-t-md group-image">
          <img
            src={`/marketing-assets/image-${index + 1}.png`}
            alt={BRAND_NAME}
            className={cn(
              "w-full rounded-lg blur-[10px] hover:blur-[0px] transition-all",
              inView && "blur-[0px]",
              "group-hover:blur-[10px] hover:!blur-0"
            )}
          />
        </div>
        <div className="p-5 z-10 relative bg-muted text-left">
          <h3 className="text-xl pb-2">
            Manage collaborators in real time {index}
          </h3>
          <p className="text-muted-foreground text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
            nostrum consequatur perferendis reprehenderit expedita enim ex sequi
            fugiat error ipsam? Quas ex odit illo inventore maxime minus quaerat
            praesentium quis dolor dolorum?
          </p>
        </div>
      </div>
    </motion.div>
  );
};
