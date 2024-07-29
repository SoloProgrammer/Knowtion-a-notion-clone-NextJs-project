"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";

import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";
import { useMediaQuery } from "usehooks-ts";

import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

const PreviewEditor = ({
  initialContent,
}: {
  initialContent: string;
}) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: JSON.parse(initialContent) as PartialBlock[],
  });
  const isMobile = useMediaQuery("(max-width:768px)");

  const { resolvedTheme } = useTheme();

  return (
    <BlockNoteView
      className="flex-grow !bg-transparent"
      editable={false}
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      sideMenu={!isMobile}
    />
  );
};
export default PreviewEditor
