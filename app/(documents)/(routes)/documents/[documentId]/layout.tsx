"use client";

import { PropsWithChildren } from "react";

import { Id } from "@/convex/_generated/dataModel";
import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { RoomProvider } from "@/providers/room-provider";

type DocumentPageProps = {
  params: {
    documentId: Id<"documents">;
  };
};

const SingleDocumentLayout = ({
  children,
  params,
}: PropsWithChildren & DocumentPageProps) => {
  const roomId = `knowtion:document:${params.documentId}`;
  return (
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"}>
      <RoomProvider roomId={roomId}>{children}</RoomProvider>
    </LiveblocksProvider>
  );
};

export default SingleDocumentLayout;
