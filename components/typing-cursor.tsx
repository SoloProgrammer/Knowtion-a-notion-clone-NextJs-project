import { cn } from "@/lib/utils";

type TypingCursorProps = {
  color: string;
  text: string;
  className?: string;
};

export const TypingCursor = ({ color, text, className }: TypingCursorProps) => {
  return (
    <span
      data-text={text}
      className={cn(
        `h-[38px] w-[2px] bg-[${color}] inline-block relative before:absolute before:-top-4 before:rounded-tl before:rounded-tr before:rounded-br before:w-[max-content] before:px-1 before:h-fit before:bg-[${color}] before:left-0 before:content-[attr(data-text)] before:text-xs before:md:text-sm`,
        className
      )}
    />
  );
};
