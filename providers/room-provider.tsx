"use client";

import { PropsWithChildren } from "react";

import Room from "@/app/(documents)/(routes)/documents/[documentId]/page";
import { LiveCursorsProvider } from "./live-cursors-provider";

import {
  ClientSideSuspense,
  RoomProvider as RoomProviderWrapper,
} from "@liveblocks/react/suspense";

export const RoomProvider = ({
  roomId,
  children,
}: PropsWithChildren & { roomId: string }) => {
  return (
    <RoomProviderWrapper id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<Room.Skeleton />}>
        <LiveCursorsProvider>{children}</LiveCursorsProvider>
      </ClientSideSuspense>
    </RoomProviderWrapper>
  );
};
