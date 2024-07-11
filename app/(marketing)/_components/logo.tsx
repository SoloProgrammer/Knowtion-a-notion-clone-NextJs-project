import Image from "next/image";
import { Poppins } from "next/font/google";
import { BRAND_NAME } from "@/app/constants";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
export const Logo = ({
  className,
  hideBrandName = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { hideBrandName?: boolean }) => {
  return (
    <div
      {...props}
      className={cn("hidden md:flex items-center gap-x-2", className)}
    >
      <div className="w-[25px] h-[25px] md:w-[35px] md:h-[35px] relative">
        <Image src={"/logo.png"} alt="logo" fill />
      </div>{" "}
      <p className={cn(font.className, "font-semibold text-sm md:text-lg", hideBrandName && 'hidden')}>
        {BRAND_NAME}
      </p>
    </div>
  );
};
