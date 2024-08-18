import { useRef } from "react";

/**
 * Custom hook to debounce a function.
 *
 * @param {(args: any[]) => void} fn - The function to debounce.
 * @param {number} [delay=500] - The debounce delay in milliseconds.
 * @returns {(args: any[]) => void} A debounced version of the input function.
 */

export const useDebounceFunction = (
  fn: (...args: any[]) => void,
  delay: number = 500
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  
  return function (...args: any[]) {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
