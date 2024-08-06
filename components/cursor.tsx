import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

import { AnimatePresence, motion } from "framer-motion";

import { anim, cn } from "@/lib/utils";

type CursorProps = {
  color: string;
  initialLeft?: number | string;
  left: number | string;
  top: number | string;
  initialTop?: number | string;
  name?: string;
  avatar?: string;
  flip?: boolean;
  className?: string;
};

export default function Cursor({
  color,
  className,
  left,
  initialLeft,
  top,
  initialTop,
  name,
  avatar,
  flip,
}: CursorProps) {
  const cursorMove = {
    initial: {
      left: initialLeft || left,
      top: initialTop || top,
      opacity: 0,
    },
    animate: {
      left,
      top,
      opacity: 1,
    },
    exit: {
      left,
      top,
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        transition={{ bounce: 0, duration: 0.2 }}
        {...anim(cursorMove)}
        className={cn(
          "z-[999] absolute top-0 left-0",
          flip && "flex flex-col items-end",
          className
        )}
      >
        <svg
          width="24"
          height="36"
          viewBox="0 0 24 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "translate-x-[-5px]",
            flip && "translate-x-[10px] rotate-45"
          )}
        >
          <path
            d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
            fill={color}
          />
        </svg>
        <div
          className={cn(
            "p-1 px-2 pl-[6px] flex gap-x-2 items-center rounded-full text-white font-medium text-xs -translate-y-4",
            flip && "flex flex-row-reverse"
          )}
          style={{ background: color }}
        >
          <Avatar className="ring-2 ring-white w-[13px] h-[13px] bg-muted-foreground/60">
            <AvatarImage src={avatar} />
          </Avatar>
          <span className="whitespace-nowrap">{name}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
