"use client";

import { PropsWithChildren } from "react";

import Link from "next/link";

import { Logo } from "@/app/(marketing)/_components/logo";

import { EdgeStoreProvider } from "@/lib/edgestore";
import { getHostUrl } from "@/utils/urls";

const PreviewLayout = ({ children }: PropsWithChildren) => {
  return (
    <EdgeStoreProvider>
      <Link className="fixed z-10 bottom-5 right-5" href={getHostUrl()}>
        <Logo hideBrandName className="!flex"/>
      </Link>
      {children}
    </EdgeStoreProvider>
  );
};

export default PreviewLayout;
