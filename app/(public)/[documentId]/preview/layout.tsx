"use client";

import { PropsWithChildren } from "react";

import { EdgeStoreProvider } from "@/lib/edgestore";

const PreviewLayout = ({ children }: PropsWithChildren) => {
  return (
    <EdgeStoreProvider>
      {children}
    </EdgeStoreProvider>
  );
};

export default PreviewLayout;
