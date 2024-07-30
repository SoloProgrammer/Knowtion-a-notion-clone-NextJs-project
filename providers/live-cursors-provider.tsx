"use client";

import { PointerEvent, PropsWithChildren } from "react";

import Cursor from "@/components/cursor";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { useMediaQuery } from "usehooks-ts";

export const LiveCursorsProvider = ({ children }: PropsWithChildren) => {
  const others = useOthers();

  const [_, updateMyPresence] = useMyPresence();

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    updateMyPresence({ cursor });
  }

  function handlePointerLeave() {
    updateMyPresence({ cursor: null });
  }

  const isMobile = useMediaQuery("(max-width:769px)");

  return (
    <>
      {!isMobile && (
        <div
          className="w-full h-full"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {others.map(({ connectionId, presence, info }) => {
            if (presence.cursor === null) {
              return null;
            }

            return (
              <Cursor
                key={`cursor-${connectionId}`}
                color={info.color}
                x={presence.cursor.x}
                y={presence.cursor.y}
                name={info.name}
                avatar={info.avatar}
              />
            );
          })}
          {children}
        </div>
      )}
      {/* hiding cursors on mobile */}
      {isMobile && children} 
    </>
  );
};
