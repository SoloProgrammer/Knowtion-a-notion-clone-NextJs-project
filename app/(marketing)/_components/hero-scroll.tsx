"use client";

import React from "react";
import Image from "next/image";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TypingCursor } from "@/components/typing-cursor";

export function HeroScroll() {
  return (
    <div className="flex flex-col overflow-hidden pb-32 md:pb-0">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-3xl md:text-4xl font-semibold dark:text-white">
              Unleash the
              <TypingCursor
                color="#ff218c"
                text="Pratham shinde"
                className="h-[22px] md:h-[38px] md:hidden w-[1.5px]"
              />{" "}
              power{" "}
              <TypingCursor
                color="#ff218c"
                text="Pratham shinde"
                className="h-[20px] md:h-[38px] hidden md:inline-block w-[1.5px]"
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
                  className="h-[26px] inline-block md:hidden"
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
