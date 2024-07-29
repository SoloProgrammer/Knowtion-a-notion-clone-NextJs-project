import React from "react";

type CursorProps = {
  color: string;
  x: number;
  y: number;
  name?: string;
};

export default function Cursor({ color, x, y, name }: CursorProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translateX(${x}px) translateY(${y}px)`,
        transition:'.1s transform'
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
      <p
        className="px-1 rounded-sm text-black font-medium text-xs -translate-y-4"
        style={{ background: color }}
      >
        {name}
      </p>
    </div>
  );
}
