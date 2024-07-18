"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

import { Button } from "./ui/button";
import { IconPicker } from "./icon-picker";
import { CoverImageModal } from "./modals/cover-image-modal";

import { Image, Smile, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

import { useMutation } from "convex/react";
import { KeyboardEvent, useEffect, useState } from "react";

type ToolbarProps = {
  document: Doc<"documents">;
  preview?: boolean;
};

export const Toolbar = ({ document, preview = false }: ToolbarProps) => {
  if (!document) return null;

  const updateDocument = useMutation(api.documents.udpate);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState<string>(document.title!);

  useEffect(() => {
    setTitle(document.title!);
  }, [document.title]);

  const enableInput = () => {
    if (preview) return;
    setTitle(document.title!);
    setIsEditing(true);
  };

  const disableInput = () => setIsEditing(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
      updateDocument({ id: document._id, title: title.trim() || "Untitled" });
    }
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
        {isEditing && !preview && (
          <TextareaAutosize
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={disableInput}
            onKeyDown={handleKeyDown}
            onFocus={(e) =>
              e.target.setSelectionRange(title.length, title.length)
            }
            autoFocus
            className="resize-none text-primary/90 text-4xl md:text-5xl border-none outline-none font-bold break w-full !h-auto focus-visible:text-primary !bg-transparent rounded-sm"
          />
        )}
        {!isEditing && (
          <p
            onClick={enableInput}
            className="text-4xl md:text-5xl text-primary/90 font-bold break-words !min-h-[53px]"
          >
            {title}
          </p>
        )}
      </div>
    </div>
  );
};
