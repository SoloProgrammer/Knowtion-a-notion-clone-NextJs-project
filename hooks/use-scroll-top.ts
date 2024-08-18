import { useEffect, useState } from "react";

/**
 * @param {number} threshold
 */

export const useScrollTop = (threshold: number = 10) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > threshold) {
        setIsScrolled(true);
      } else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.addEventListener("scroll", handleWindowScroll);
  }, []);
  return isScrolled;
};
