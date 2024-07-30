"use client";

import React from "react";
import Image from "next/image";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TypingCursor } from "@/components/typing-cursor";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-xl md:text-4xl font-semibold text-black dark:text-white">
              Unleash the power{" "}
              <TypingCursor
                color="#ff218c"
                text="Pratham shinde"
                className="h-[20px] md:h-[38px]"
              />
              of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Real
                <TypingCursor
                  text="John wick"
                  color="#01befe"
                  className="h-[33px] md:h-[83px] hidden md:inline-block"
                />
                &nbsp;time collaboratio
                <TypingCursor
                  text="John wick"
                  color="#01befe"
                  className="h-[33px] inline-block md:hidden"
                />
                n
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/marketing-assets/real-time-cursors.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
