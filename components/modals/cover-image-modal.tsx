"use client";

import { ElementRef, PropsWithChildren, useRef } from "react";

import ModalProvider from "@/providers/modal-provider";

import { ProgressBar } from "../progress-bar";
import { SingleImageDropzone } from "@/components/single-image-dropzone";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

type CoverImageModalProps = {
  onImageChange?: (imageUrl: string) => void;
  replaceUrl?: string;
};

const MAX_FILE_SIZE = 1570000;

export const CoverImageModal = ({
  children,
  onImageChange,
  replaceUrl,
}: PropsWithChildren<CoverImageModalProps>) => {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<null | number>(null);
  const { edgestore } = useEdgeStore();
  const dialogCloseBtnRef = useRef<ElementRef<"button">>(null);

  const handleFileUpload = async (file: File | undefined) => {
    if (file) {
      setFile(file);
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: setProgress,
        options: {
          replaceTargetUrl: replaceUrl,
        },
      });
      if (dialogCloseBtnRef.current) dialogCloseBtnRef.current.click();
      onImageChange?.(res.url);
      onOpenChange();
    } else setFile(undefined);
  };

  const onOpenChange = () => {
    setProgress(null);
    setFile(undefined);
  };

  return (
    <ModalProvider>
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          {typeof progress === "number" && (
            <div className="absolute w-full h-full border-none z-[99999] flex justify-center items-center bg-black/50 rounded-md">
              <ProgressBar progress={progress} />
            </div>
          )}
          <DialogTitle className="border-b pb-5">
            <h3 className="text-start font-semibold">Upload cover image</h3>
          </DialogTitle>
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={handleFileUpload}
            className="!w-full"
            dropzoneOptions={{
              maxSize: MAX_FILE_SIZE,
            }}
          />
          <DialogClose className="hidden" ref={dialogCloseBtnRef} />
        </DialogContent>
      </Dialog>
    </ModalProvider>
  );
};
