import { useRef } from "react";

export const useDebounceFunction = (
  fn: (...args: any[]) => void,
  delay: number = 500
) => {
  const timerRef = useRef<NodeJS.Timeout>();
  return function (...args: any[]) {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
