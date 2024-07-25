"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { Button } from "./ui/button";
import { IconPicker } from "./icon-picker";
import { CoverImageModal } from "./modals/cover-image-modal";

import { Image, Info, Smile, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

import { useMutation } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { useDebounceFunction } from "@/hooks/use-debounce-function";

type ToolbarProps = {
  document: Doc<"documents">;
  preview?: boolean;
};

export const Toolbar = ({ document, preview = false }: ToolbarProps) => {
  if (!document) return null;

  const updateDocument = useMutation(api.documents.udpate);
  const titleInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (titleInputRef.current && !editing) {
      titleInputRef.current.value = document.title;
    }
  }, [document.title, editing]);

  const updateDocumentTitle = useDebounceFunction(updateDocument);

  const handleChange = (title: string) => {
    setEditing(true);
    updateDocumentTitle({
      id: document._id,
      title: title.trim(),
    });
  };

  const updateIcon = (icon: string) => {
    updateDocument({ id: document._id, icon });
  };

  const updateCoverImage = (url: string) => {
    updateDocument({ id: document._id, coverImage: url });
  };

  return (
    <div className="relative px-5 md:px-12 group">
      {document.icon && !preview && (
        <div className="flex items-center group/icon pt-6 gap-x-2 w-fit relative select-none">
          <IconPicker onChange={updateIcon}>
            <p className="text-6xl hover:opacity-75 transition cursor-pointer">
              {document.icon}
            </p>
          </IconPicker>
          <Button
            className="md:opacity-0 group-hover/icon:opacity-100 transition text-xs text-muted-foreground p-0 rounded-full h-6 w-6 absolute top-0 -right-7"
            variant={"outline"}
            size={"icon"}
            onClick={() => updateIcon("")}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      {document.icon && preview && (
        <p className="text-6xl pt-6">{document.icon}</p>
      )}
      <div className="flex items-center gap-x-2 pt-3 md:pt-6">
        {!document.icon && !preview && (
          <IconPicker onChange={updateIcon}>
            <Button
              variant={"outline"}
              size={"sm"}
              className="h-auto py-[.4rem]"
            >
              <span>
                <Smile className="w-4 h-4 mr-2" />
              </span>
              <span>Add icon</span>
            </Button>
          </IconPicker>
        )}
        {!document.coverImage && !preview && (
          <CoverImageModal onImageChange={updateCoverImage}>
            <Button
              variant={"outline"}
              size={"sm"}
              className="h-auto py-[.4rem]"
            >
              <span>
                <Image className="w-4 h-4 mr-2" />
              </span>
              <span>Add cover</span>
            </Button>
          </CoverImageModal>
        )}
      </div>
      <div className="mt-3">
        <TextareaAutosize
          ref={titleInputRef}
          placeholder="Untitled"
          defaultValue={document.title || "Untitled"}
          onBlur={() => {
            setTimeout(() => {
              setEditing(false);
            }, 1000);
          }}
          onChange={(e) => handleChange(e.target.value)}
          readOnly={preview}
          className="placeholder:text-muted-foreground resize-none text-primary/90 focus-visible:text-primary/90 text-4xl md:text-5xl border-none outline-none font-bold break w-full !h-auto !bg-transparent rounded-sm"
        />
        <small className="flex items-center text-muted-foreground/70 select-none">
          <span><Info className="w-4 h-4 mr-1"/></span>
          <span>Changes will be saved when you stop editing</span>
        </small>
      </div>
    </div>
  );
};
