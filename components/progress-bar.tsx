import { CSSProperties } from "react";

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div
      style={
        {
          "--progress": progress,
        } as CSSProperties
      }
      className="progress-bar w-[300px] h-[15px] rounded-lg relative overflow-hidden border-[0.04rem] dark:border-white backdrop-blur"
    >
      <span
        style={{
          color: progress > 50 ? "black" : "white",
        }}
        className="text-center absolute z-10 text-xs left-[50%] top-[50%] translate-y-[-50%] font-bold text-white"
      >
        {progress}%
      </span>
    </div>
  );
};
