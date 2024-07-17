"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

import { useTheme } from "next-themes";
import { useMediaQuery } from "usehooks-ts";
import { useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

const DEFAULT_EDITOR_BLOCK = JSON.stringify([
  {
    id: "2365a937-aaeb-4e30-8090-d644cec3da0e",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [],
    children: [],
  },
]);

type EditorProps = {
  onChange?: (content: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
    });
    return res.url;
  };

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: JSON.parse(
      initialContent || DEFAULT_EDITOR_BLOCK
    ) as PartialBlock[],
    uploadFile: handleUpload,
  });

  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    blocks.length > 0 && onChange?.(JSON.stringify(blocks));
  }, [blocks]);

  const isMobile = useMediaQuery("(max-width:768px)");

  const { resolvedTheme } = useTheme();

  return (
    <BlockNoteView
      className="flex-grow !bg-transparent"
      onChange={() => setBlocks(editor.document)}
      editable={editable}
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      sideMenu={!isMobile}
    />
  );
};

export default Editor;
