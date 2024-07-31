"use client";

import { ElementRef, useRef } from "react";
import Image from "next/image";

import { BRAND_NAME } from "@/app/constants";
import { BorderAnimation } from "@/components/border-animation";

import { cn } from "@/lib/utils";

import {
  motion,
  MotionValue,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

import { useMediaQuery } from "usehooks-ts";

import { cards } from "../constants";
import { Card } from "../types";

export const BentoGrid = () => {
  const scrollContainerRef = useRef<ElementRef<"div"> | null>(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "start start"],
  });

  return (
    <div
      ref={scrollContainerRef}
      className="h-full md:h-[110rem] bg-muted/ flex justify-center items-center flex-col relative -mb-28 md:mb-0"
    >
      <div className="w-full md:max-w-7xl mx-auto p-1 md:p-5 columns-1 md:columns-2 gap-3 group">
        {cards.map((card, i) => (
          <FeatureCard
            index={i}
            scrollY={scrollYProgress}
            key={i}
            card={card}
          />
        ))}
      </div>
    </div>
  );
};

const FeatureCard = ({
  index,
  scrollY,
  card,
}: {
  index: number;
  scrollY: MotionValue<number>;
  card: Card;
}) => {
  const cardContainerRef = useRef<ElementRef<"div"> | null>(null);
  const inView = useInView(cardContainerRef, {
    margin: "-45%",
  });

  const isMobile = useMediaQuery("(max-width:768px)");

  const translate = useTransform(
    scrollY,
    [0, 1],
    isMobile
      ? [100, -200]
      : [index > 1 ? `10%` : -200, index > 1 ? `-${46 - index}%` : -100]
  );

  const { image, title, desc } = card;

  return (
    <motion.div
      ref={cardContainerRef}
      style={{
        translateY: translate,
      }}
      className="p-[2px] mb-3 inline-block rounded-md overflow-hidden group/card"
    >
      <BorderAnimation>
        <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 rounded-t-md group-image overflow-hidden">
          <div
            style={{
              height: "auto",
            }}
            className={cn(
              `m-5 overflow-hidden rounded-md w-[${image.w}px] relative`
            )}
          >
            <Image
              src={image.src}
              alt={BRAND_NAME}
              fill
              className={cn(
                "!static md:absolute w-full h-full object-cover rounded-lg blur-[10px] transition-all scale-[1.05] group-hover/card:scale-[1]",
                inView && "blur-[0px]"
              )}
            />
          </div>
        </div>
        <div className="p-5 z-10 relative bg-muted text-left -mt-1 rounded-md">
          <h3 className="pb-2 text-xl font-semibold">{title}</h3>
          <p className="text text-[16px] text-primary/70">{desc}</p>
        </div>
      </BorderAnimation>
    </motion.div>
  );
};
