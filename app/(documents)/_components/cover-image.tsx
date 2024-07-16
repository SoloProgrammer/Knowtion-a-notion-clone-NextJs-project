"use client";

import Image from "next/image";
import { ImageIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { ConfirmModal } from "@/components/modals/confirm-action-modal";
import { CoverImageModal } from "@/components/modals/cover-image-modal";
import { Button } from "@/components/ui/button";

import { useMutation } from "convex/react";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "@/components/ui/skeleton";

type CoverImageProps = {
  url: string | undefined;
  documentId: Id<"documents">;
  preview?: boolean;
};

export const CoverImage = ({ url, preview, documentId }: CoverImageProps) => {

  const updateDocument = useMutation(api.documents.udpate);
  const { deleteFromBucket } = useEdgeStore();

  const changeCover = (imageUrl: string | undefined) => {
    updateDocument({ id: documentId, coverImage: imageUrl });
  };

  const removeCover = async () => {
    deleteFromBucket(url as string);
    updateDocument({ id: documentId, coverImage: "" });
  };

  return (
    <div
      className={cn(
        "relative group",
        !!url && "bg-muted min-h-[28vh] md:min-h-[38vh]",
        !url && "!h-[5vh]"
      )}
    >
      {!!url && <Image src={url} fill alt="cover" className="object-cover" />}
      {!!url && !preview && (
        <div className="absolute bottom-2 right-3 flex items-center gap-x-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
          <CoverImageModal onImageChange={changeCover} replaceUrl={url}>
            <Button
              className="text-xs text-muted-foreground h-auto py-2"
              variant={"outline"}
              size={"sm"}
            >
              <ImageIcon className="w-4 h-3 mr-2" />
              Change cover
            </Button>
          </CoverImageModal>
          <ConfirmModal
            onConfirm={removeCover}
            description="This action cannot be undone. This will permanently delete the cover image!"
            btnCopy="Delete cover"
          >
            <Button
              className="text-xs text-muted-foreground h-auto py-2"
              variant={"outline"}
              size={"sm"}
            >
              <X className="w-4 h-3 mr-2" />
              Remove
            </Button>
          </ConfirmModal>
        </div>
      )}
    </div>
  );
};

CoverImage.Skeleton = () => {
  return <Skeleton className="w-full h-[28vh] md:h-[38vh] !rounded-none" />;
};
