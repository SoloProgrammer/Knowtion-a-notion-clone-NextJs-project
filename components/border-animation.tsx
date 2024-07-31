import { PropsWithChildren } from "react";

export const BorderAnimation = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`relative w-full h-full rounded-md before:absolute before:h-[200%] before:left-1/2 before:-translate-x-1/2 before:bg-cyan-500 before:dark:bg-cyan-300 before:w-[150px] before:z-[-1] before:top-[43%] before:-translate-y-1/2 z-10 before:animate-rotater before:origin-center`}
    >
      {children}
    </div>
  );
};
