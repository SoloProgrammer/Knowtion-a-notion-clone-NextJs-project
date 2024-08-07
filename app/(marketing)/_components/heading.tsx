"use client";

import { BRAND_NAME } from "@/app/constants";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import Cursor from "@/components/cursor";

import { useConvexAuth } from "convex/react";
import { useMediaQuery } from "usehooks-ts";

import { ArrowRight } from "lucide-react";
import { LoginButton } from "./login-button";
import Link from "next/link";
import { motion } from "framer-motion";
import { anim } from "@/lib/utils";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const isMobile = useMediaQuery("(max-width:767px)");
  const isTablet = useMediaQuery("(max-width:1025px)");

  const headingVariants = {
    initial: {
      y: 35,
      opacity: 0.1,
    },
    animate: {
      y: -5,
      opacity: 1,
    },
  };

  const cursor_blue_left = (isMobile && "78%") || (isTablet && "83%") || "93%";
  const cursor_green_left = (isMobile && "-2%") || (isTablet && "10%") || "-10%";

  return (
    <div className="max-w-4xl mx-auto mt-4 relative z-10">
      <Cursor
        duration={0.3}
        delay={0.2}
        color="#34893f"
        initialLeft={"-15%"}
        left={cursor_green_left}
        initialTop={"120%"}
        top={isMobile ? "100%" : "80%"}
        name="Pratham Shinde"
        className="md:!scale-125"
        avatar="/avatar.png"
        flip
      />
      <Cursor
        duration={0.3}
        delay={0.3}
        color="#01befe"
        initialLeft={"100%"}
        left={cursor_blue_left}
        initialTop={170}
        top={isMobile ? 175 : 120}
        name="John Wick"
        avatar="/avatar.png"
        className="md:!scale-125"
      />
      <motion.div
        {...anim(headingVariants)}
        transition={{
          delay: 0,
          duration: 0.2,
          ease: "easeOut",
        }}
        className="flex flex-col gap-7 items-center space-y-1"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold px-2 md:px-2 text-[#333330] dark:text-[beige]">
          Your Ideas, Documents. & Plans. Unified. Welcome to{" "}
          <span className="underline">{BRAND_NAME}</span>
        </h1>
        <h3>
          {BRAND_NAME} is the connected workspace where <br />
          better, faster work happens
        </h3>
        {isLoading && (
          <div className="py-[0.6rem] px-3 text-center mt-10">
            <Spinner />
          </div>
        )}
        {!isLoading && isAuthenticated && (
          <Link href={"/documents"}>
            <Button className="group" size="sm">
              Enter {BRAND_NAME}{" "}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
            </Button>
          </Link>
        )}
        {!isAuthenticated && !isLoading && <LoginButton className="text-sm" />}
      </motion.div>
    </div>
  );
};
