"use client";

import Image from "next/image";

type CoverImageProps = {
  cover: string;
};

export const CoverImage = ({ cover }: CoverImageProps) => {
  return (
    <div className="relative h-[25vh] md:h-[35vh] bg-primary/10">
      <Image src={cover} fill alt="cover" className="object-cover" />
    </div>
  );
};
