"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { FileIcon } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type TitleProps = {
  document: Doc<"documents">;
};

export const Title = ({ document }: TitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(document.title);
  const update = useMutation(api.documents.udpate);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const disableInput = () => setIsEditing(false);
  const enableInput = () => {
    setTitle(document.title);
    setIsEditing(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      update({ title: title.trim() || "Untitled", id: document._id });
      disableInput();
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-x-1">
        {!!document.icon ? (
          <span className="text-[1.1rem]">{document.icon}</span>
        ) : (
          <FileIcon className="w-5 h-5 text-muted-foreground shrink-0" />
        )}
        {isEditing ? (
          <Input
            onKeyDown={handleKeyDown}
            autoFocus
            onBlur={disableInput}
            value={title}
            onChange={handleTitleChange}
            className="px-[0.68rem] h-7 focus-visible:ring-transparent font-medium"
          />
        ) : (
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={enableInput}
            className="h-auto font-medium py-1"
          >
            {title.trim() || "Untitled"}
          </Button>
        )}
      </div>
    </div>
  );
};

Title.Skeleton = () => {
  return (
    <>
      <Skeleton className="w-6 rounded-sm h-6 mr-3" />
      <Skeleton className="w-36 rounded-sm h-6" />
    </>
  );
};
