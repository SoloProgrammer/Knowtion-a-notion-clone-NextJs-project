import { PropsWithChildren } from "react";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full pt-20">{children}</main>
    </div>
  );
};
export default MarketingLayout;
