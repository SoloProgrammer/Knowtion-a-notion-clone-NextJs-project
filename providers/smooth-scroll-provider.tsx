"use client";

import { PropsWithChildren, useEffect } from "react";
import Lenis from "lenis";

const SmoothScrollProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);
  return children;
};

export default SmoothScrollProvider;
