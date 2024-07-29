"use client";

import * as Y from "yjs";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

import { useTheme } from "next-themes";
import { useMediaQuery } from "usehooks-ts";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useRoom, useSelf } from "@liveblocks/react/suspense";

const DEFAULT_EDITOR_BLOCKS = JSON.stringify(
  Array(10)
    .fill(0)
    .map((_) => ({
      id: crypto.randomUUID(),
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [],
      children: [],
    }))
);

type EditorProps = {
  onChange?: (content: string) => void;
  editable?: boolean;
};

const Editor = ({ onChange, editable }: EditorProps) => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>(new Y.Doc());
  const [provider, setProvider] = useState<any>(
    new LiveblocksYjsProvider(room, doc)
  );

  // useEffect(() => {
  //   const yDoc = new Y.Doc();
  //   const initialContentParsed = JSON.parse(
  //     initialContent || DEFAULT_EDITOR_BLOCKS
  //   ) as PartialBlock[];

  //   const yFragment = yDoc.getXmlFragment("root");
  //   initialContentParsed.forEach((block) => {
  //     const yBlock = new Y.XmlElement("block");
  //     yBlock.setAttribute("id", block.id!);
  //     yBlock.setAttribute("type", block.type!);
  //     yBlock.setAttribute("props", JSON.stringify(block.props));
  //     // yFragment.push([yBlock]);
  //   });

  //   const yProvider = new LiveblocksYjsProvider(room, yDoc);
  //   setDoc(yDoc);
  //   setProvider(yProvider);

  //   return () => {
  //     yDoc.destroy();
  //     yProvider.destroy();
  //   };
  // }, [room, initialContent]);

  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const res = await edgestore.publicFiles.upload({
      file,
    });
    return res.url;
  };

  const userInfo = useSelf((me) => me.info);

  const editor: BlockNoteEditor = useCreateBlockNote({
    uploadFile: handleUpload,
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("root"),
      user: {
        name: userInfo.name,
        color: userInfo.color,
      },
    },
  });

  const isMobile = useMediaQuery("(max-width:768px)");

  const { resolvedTheme } = useTheme();

  return (
    <BlockNoteView
      className="flex-grow !bg-transparent"
      editable={editable}
      onChange={() => {
        onChange?.(JSON.stringify(editor.document));
      }}
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      sideMenu={!isMobile}
    />
  );
};

export default Editor;
