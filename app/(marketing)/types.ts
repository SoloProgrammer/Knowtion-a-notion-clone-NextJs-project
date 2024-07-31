import { StaticImageData } from "next/image";

export type Image = {
  src: StaticImageData;
  w: number;
  h: number;
};

export type Card = {
  image: Image;
  title: string;
  desc: string;
};
