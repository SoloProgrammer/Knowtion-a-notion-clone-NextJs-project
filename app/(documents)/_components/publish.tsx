"use client";

import { toast } from "sonner";
import { CircleCheckBig, Copy, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { cn } from "@/lib/utils";
import { getHostUrl } from "@/utils/urls";

import { useCallback, useState } from "react";
import { useMutation } from "convex/react";

type PublishProps = {
  documentId: Id<"documents">;
  isPublished: boolean;
  disabled?: boolean;
};

export const Publish = ({
  documentId,
  isPublished,
  disabled = false,
}: PublishProps) => {
  const update = useMutation(api.documents.udpate);
  const inputValue = `${getHostUrl()}/${documentId}/preview`;
  const [isCopied, setIscopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyPublishUrl = () => {
    navigator.clipboard.writeText(inputValue);
    setIscopied(true);
    setTimeout(() => {
      setIscopied(false);
    }, 2000);
  };

  const onPublishHandler = useCallback(async () => {
    setLoading(true);
    const promise = update({
      id: documentId,
      isPublished: !isPublished,
    }).finally(() => setLoading(false));
    toast.promise(promise, {
      loading: isPublished ? "Unpublishing..." : "Publishing...",
      success: `Note ${isPublished ? "Unpublished" : "Published"}`,
      error: `Error while ${isPublished ? "Unpublishing" : "Publishing"} note!`,
    });
  }, [isPublished]);

  return (
    <Popover>
      <PopoverTrigger disabled={disabled}>
        <Button
          disabled={disabled}
          size={"sm"}
          variant={"ghost"}
          className="font-bold select-none"
        >
          Publish{" "}
          {isPublished && <Globe className="w-4 h-4 text-sky-500 ml-2" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className={cn(
          "flex flex-col gap-y-3 w-[330px]",
          !isPublished && "items-center"
        )}
      >
        {!isPublished ? (
          <>
            <Globe className="w-6 h-6 text-muted-foreground" />
            <p className="!text-primary font-semibold">Publish this note</p>
            <small className="text-muted-foreground">
              Share your work with others.
            </small>
          </>
        ) : (
          <>
            <div className="flex items-center gap-x-2 text-sky-400 font-semibold text-sm">
              <Globe className="h-4 w-4" />
              <h6>This note is live on web.</h6>
            </div>
            <div className="flex items-center mt-2">
              <Input
                defaultValue={inputValue}
                readOnly
                autoFocus={false}
                className="focus-visible:ring-transparent bg-primary/10 h-[32px] rounded-r-none truncate"
              />
              <Button
                onClick={handleCopyPublishUrl}
                className="rounded-l-none h-[32px]"
              >
                {isCopied ? (
                  <CircleCheckBig className="w-4 -h-4 text-green-500 shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 shrink-0" />
                )}
              </Button>
            </div>
          </>
        )}
        <Button
          disabled={loading}
          className="!w-full mt-2 font-medium"
          onClick={onPublishHandler}
          size={"sm"}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
      </PopoverContent>
    </Popover>
  );
};
