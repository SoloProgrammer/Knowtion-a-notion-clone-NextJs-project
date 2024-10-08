"use client";

import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useMutation } from "convex/react";

import { ConfirmModal } from "@/components/modals/confirm-action-modal";
import { Button } from "@/components/ui/button";
import {
  useDeleteDocumentMutation,
  useRestoreDocumentMutation,
} from "../(routes)/documents/hooks";
import { useParams, useRouter } from "next/navigation";

type ArchivedBannerProps = {
  documentId: Id<"documents">;
};

export const ArchivedBanner = ({ documentId }: ArchivedBannerProps) => {
  const { restore, isRestoring } = useRestoreDocumentMutation();
  const { remove, isDeleting } = useDeleteDocumentMutation();
  const params = useParams();
  const router = useRouter();

  const onRestore = () => restore({ id: documentId });

  const onDelete = () => {
    remove({ id: documentId });
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  return (
    <div className="w-full px-3 py-2 bg-red-500 text-center flex items-center justify-center gap-x-3 flex-wrap text-white">
      <span className="font-medium">This page is in trash</span>
      <div className="flex items-center gap-x-1 mt-2 md:mt-0">
        <Button
          onClick={onRestore}
          variant="outline"
          className="h-auto border-white bg-transparent py-2 hover:bg-red-600 !text-white"
          disabled={isRestoring}
        >
          {isRestoring ? "Restoring page..." : "Restore page"}
        </Button>
        <ConfirmModal
          description="This action cannot be undone. This will permanently delete your note!"
          onConfirm={onDelete}
          btnCopy="Delete note"
        >
          <Button
            disabled={isDeleting}
            variant="outline"
            className="h-auto border-white bg-transparent py-2 hover:bg-red-600 !text-white"
          >
            {isDeleting ? "Deleting..." : "Delete forever"}
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};
