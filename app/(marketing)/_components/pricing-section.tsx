"use client";

import Payment from "../../../public/marketing-assets/pricing.png";
import Arrow from "../../../public/marketing-assets/arrow.svg";
import Plans from "../../../public/marketing-assets/plans.png";
import KnowtionFree from "../../../public/marketing-assets/knowtion-free.png";
import KnowtionPro from "../../../public/marketing-assets/knowtion-pro.png";

import Image from "next/image";

import { useScroll, useTransform } from "framer-motion";

import { ElementRef, useRef } from "react";
import { motion } from "framer-motion";
import { Raleway } from "next/font/google";
import { cn } from "@/lib/utils";
import { TextReveal } from "react-animate-components-ts";
import Cursor from "@/components/cursor";
import { useMediaQuery } from "usehooks-ts";

const font = Raleway({
  subsets: ["vietnamese"],
  weight: ["400", "600", "700"],
});

export const Pricing = () => {
  const containerRef = useRef<ElementRef<"section"> | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const plans_left = useTransform(
    scrollYProgress,
    [0, 1],
    ["-200px", "-125px"]
  );
  const knowtion_free_bottom = useTransform(
    scrollYProgress,
    [0, 1],
    ["-15%", "-5%"]
  );
  const knowtion_pro_right = useTransform(
    scrollYProgress,
    [0, 1],
    ["-180px", "-130px"]
  );
  const words = [
    "get&nbsp;",
    "knowtion&nbsp;",
    "<span class='bg-[#ffdea81f] text-[orange] border border-[orange] rounded-md inline-block pr-1'>pro</span>",
  ];
  const words1 = ["&&nbsp;", "get&nbsp;", "unlimited&nbsp;", "access"];

  const isMobile = useMediaQuery("(max-width:767px)");

  return (
    <>
      <h1
        className={cn(
          "text-[3.5rem] md:text-[100px] uppercase font-bold text-[#333330] dark:text-[beige] heading px-2 md:px-0 mb-[-20px]",
          font.className
        )}
      >
        <TextReveal words={words} animateOnce delayPerWord={0.2} />
      </h1>
      <span className="relative transition text-2xl pt-2 px-2 rounded-md uppercase font-black bg-[#ffdea81f] text-[orange] border border-[orange] inline-block w-fit mx-auto mb-5 md:mb-0">
        <TextReveal
          words={words1}
          animateOnce
          delayPerWord={0.15}
          delay={0.5}
        />
        <Cursor
          duration={0.3}
          delay={0.3}
          color="#ff9e00"
          left={isMobile ? "70%" : "100%"}
          initialTop={90}
          top={40}
          name="Tony Stark"
          avatar="/avatar.png"
          className="md:!scale-125 !capitalize"
        />
      </span>
      <section
        ref={containerRef}
        className="h-[30vh] mdl:h-[300vh] w-full flex justify-center mb-20 mdl:mb-60"
      >
        <div className="mdl:h-screen mx-auto w-full sticky top-0 overflow-hidden">
          <div className="w-screen absolute h-full flex justify-center items-center">
            <motion.div
              style={{
                boxShadow:
                  "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042",
              }}
              className="relative w-auto border-[4px] border-[#6C6C6C] p-2 md:p-4 bg-[#222222] rounded-2xl shadow-2xl"
            >
              {/*Knowtion Stripe checkout */}
              <div className="w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl relative z-[2]">
                <Image
                  src={Payment}
                  width={undefined}
                  height={510}
                  alt="payment-screen"
                  className="object-cover static"
                  placeholder="blur"
                  layout="intrinsic"
                />
              </div>
              <div className="hidden mdl:block">
                {/* Absolute images to animate */}
                {/* Knowtion plans */}
                <motion.div
                  style={{
                    opacity,
                    left: plans_left,
                  }}
                  className="absolute overflow-hidden -left-[180px] top-1/2 -translate-y-1/2 z-10 border-4 border-[#6C6C6C] rounded-[20px]"
                >
                  <div className="w-full overflow-hidden rounded-2xl md:rounded-2xl relative">
                    <Image
                      src={Plans}
                      alt="payment-screen"
                      height={undefined}
                      width={undefined}
                      className="!h-[200px] md:!h-[400px] !w-auto object-contain static"
                      placeholder="blur"
                      layout="intrinsic"
                    />
                  </div>
                </motion.div>
                {/* Knowtion free */}
                <motion.div
                  style={{
                    opacity,
                    bottom: knowtion_free_bottom,
                  }}
                  className="absolute overflow-hidden right-[190px] bottom-[-9%] z-[11] border-4 border-[#6C6C6C] rounded-[16px]"
                >
                  <div className="w-full overflow-hidden rounded-2xl md:rounded-xl relative">
                    <Image
                      src={KnowtionFree}
                      alt="payment-screen"
                      height={100}
                      width={undefined}
                      className="object-contain static"
                      placeholder="blur"
                      layout="intrinsic"
                    />
                  </div>
                </motion.div>
                {/* Arrow svg */}
                <motion.div
                  style={{
                    opacity,
                  }}
                  className="absolute overflow-hidden right-[20px] bottom-[-60px] z-10"
                >
                  <div className="w-full relative">
                    <Image
                      src={Arrow}
                      alt="payment-screen"
                      height={260}
                      width={undefined}
                      className="object-contain static"
                      layout="intrinsic"
                    />
                  </div>
                </motion.div>
                {/* Knowtion pro */}
                <motion.div
                  style={{
                    opacity,
                    right: knowtion_pro_right,
                  }}
                  className="absolute overflow-hidden right-[-130px] bottom-[20%] z-10 border-4 border-[#6C6C6C] rounded-[16px]"
                >
                  <div className="w-full overflow-hidden rounded-2xl md:rounded-xl relative">
                    <Image
                      src={KnowtionPro}
                      alt="payment-screen"
                      height={50}
                      width={undefined}
                      className="object-contain static"
                      placeholder="blur"
                      layout="intrinsic"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
