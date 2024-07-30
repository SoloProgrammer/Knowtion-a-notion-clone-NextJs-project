import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

type CursorProps = {
  color: string;
  x: number;
  y: number;
  name?: string;
  avatar?: string;
};

export default function Cursor({ color, x, y, name, avatar }: CursorProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translateX(${x}px) translateY(${y}px)`,
        transition: ".1s transform",
      }}
      className="z-[99999]"
    >
      <svg
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="translate-x-[-5px]"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      <div
        className="p-1 px-2 flex gap-x-2 items-center rounded-full text-white font-medium text-xs -translate-y-4"
        style={{ background: color }}
      >
        <Avatar className="ring-2 ring-white w-[13px] h-[13px]">
          <AvatarImage src={avatar} />
        </Avatar>
        <span>{name}</span>
      </div>
    </div>
  );
}
