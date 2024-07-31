import Image1 from "../../public/marketing-assets/image-1.png";
import Image2 from "../../public/marketing-assets/image-2.png";
import Image3 from "../../public/marketing-assets/image-3.png";
import Image4 from "../../public/marketing-assets/image-4.png";
import Image5 from "../../public/marketing-assets/image-5.png";
import { Card, Image } from "./types";

export const images: Image[] = [
  {
    src: Image1,
    w: 570,
    h: 508,
  },
  {
    src: Image2,
    w: 570,
    h: 430,
  },
  {
    src: Image3,
    w: 570,
    h: 273,
  },
  {
    src: Image4,
    w: 570,
    h: 290,
  },
  {
    src: Image5,
    w: 570,
    h: 273,
  },
];

export const cards: Card[] = [
  {
    image: images[0],
    title: "Manage collaborators in real time",
    desc: "See who is editing the document and view online collaborators in real time. Removing access from the document will instantly remove the collaborator from the room in real time without a single ms delay.",
  },
  {
    image: images[1],
    title: "Archive documents in one click",
    desc: "Easily archive the document by clicking on the three-dot menu, which opens a popover that allows you to safely move the document to the trash without permanently deleting it at first!",
  },
  {
    image: images[2],
    title: "Archive banners",
    desc: "An archive banner becomes visible at the top of archived document pages, allowing them to be easily restored or permanently deleted from there.",
  },
  {
    image: images[3],
    title: "View/restored/delete trashed documents - Tash box",
    desc: "Easily view the list of trashed documents by clicking the trash icon tab in the sidebar. A popover will open with the list of all trashed documents, which can be searched by typing the document title.",
  },
  {
    image: images[4],
    title: "Want to preview the changes before publish?",
    desc: "Knowtion makes it very easy to preview document changes by switching the tab from 'Editor' to 'Preview,' which is located at the bottom right corner of the page. To start editing again, simply switch the tab back to 'Editor'.",
  },
];
