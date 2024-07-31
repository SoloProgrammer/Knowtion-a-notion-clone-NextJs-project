import { PropsWithChildren } from "react";
import { Navbar } from "./_components/navbar";

import SmoothScrollProvider from "@/providers/smooth-scroll-provider";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full pt-20">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </main>
    </div>
  );
};
export default MarketingLayout;
