"use client";

import { PropsWithChildren, useEffect, useState } from "react";

const ModalProvider = (props: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    !isMounted && setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return props.children;
};

export default ModalProvider;
