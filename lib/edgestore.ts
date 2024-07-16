"use client";

import { type EdgeStoreRouter } from "../app/api/edgestore/[...edgestore]/route";
import { createEdgeStoreProvider } from "@edgestore/react";

const { EdgeStoreProvider, useEdgeStore: useEdgeStoreInit } = createEdgeStoreProvider<EdgeStoreRouter>();

const useEdgeStore = () => {
  const { edgestore } = useEdgeStoreInit();
  const deleteFromBucket = async (url: string) => {
    await edgestore.publicFiles.delete({ url: url as string });
  };
  return { ...useEdgeStoreInit(), deleteFromBucket };
};

export { EdgeStoreProvider, useEdgeStore };
