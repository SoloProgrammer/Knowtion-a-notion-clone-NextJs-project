import { TextReveal } from "react-animate-components-ts";
import { Raleway } from "next/font/google";

import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { HeroScroll } from "./_components/hero-scroll";
import { Heros } from "./_components/heros";
import { BentoGrid } from "./_components/bento-grid";
import { TextTranslate } from "./_components/text-translate";

import { BRAND_NAME } from "../constants";
import { cn } from "@/lib/utils";
import { ScrollDownIcon } from "./_components/scroll-down-icon";
import { BottomLamp } from "./_components/bottom-lamp";

const font = Raleway({
  subsets: ["vietnamese"],
  weight: ["400", "600", "700"],
});

const MarketingPage = () => {
  const words = ["HOT", "<span class=text-[#fc2f00]>Features</span>"];
  const words1 = [
    "that",
    "are",
    "<span class='text-[#04e762] animate-pulse'>live</span>",
    "on",
    "knowtion",
  ];
  return (
    <div className="min-h-full flex flex-col antialiased w-screen">
      <div className="flex flex-col flex-grow justify-center md:justify-start text-center p-0 pb-10 gap-5 mx-auto">
        <div className="w-screen h-full md:h-[90vh] bg-white dark:bg-[#121212] !p-0 md:shadow-xl relative overflow-hidden">
          <BottomLamp/>
          <div className="md:backdrop-blur-[220px] h-full flex flex-col justify-center">
            <Heading />
            <Heros />
            <ScrollDownIcon />
          </div>
        </div>
        <HeroScroll />
        <h1
          className={cn(
            "h-[150px] md:h-[270px] -mt-40 md:mt-0 mb-32 md:mb-10 text-5xl md:text-[100px] uppercase font-bold text-neutral-600 dark:text-neutral-300 heading px-2 md:px-0",
            font.className
          )}
        >
          <TextReveal words={words} animateOnce={false} delayPerWord={0.15} />
          <TextReveal words={words1} animateOnce={false} delayPerWord={0.15} />
        </h1>
        <BentoGrid />
        <TextTranslate className="md:block !text-[#d7d2ca82]">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className={cn(
                  "uppercase select-none inline-block px-4 tracking-normal",
                  font.className
                )}
              >
                {BRAND_NAME}
              </span>
            ))}
        </TextTranslate>
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
