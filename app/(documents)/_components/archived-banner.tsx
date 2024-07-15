"use client";

import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";

import { ConfirmModal } from "@/components/modals/confirm-action-modal";
import { Button } from "@/components/ui/button";

type ArchivedBannerProps = {
  documentId: Id<"documents">;
};

export const ArchivedBanner = ({ documentId }: ArchivedBannerProps) => {
  const router = useRouter();
  const params = useParams();
  const restore = useMutation(api.documents.restoreArchives);
  const remove = useMutation(api.documents.deleteDocument);

  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Error restoring Note. Try again!",
    });
  };
 
  const onDelete = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Error deleting Note. Try again!",
    });
    router.push(`/documents`);
  };

  return (
    <div className="w-full p-3 bg-red-500 text-center flex items-center justify-center gap-x-3 flex-wrap text-white">
      <span className="font-medium">This page is in trash</span>
      <div className="flex items-center gap-x-1 mt-2 md:mt-0">
        <Button
          onClick={onRestore}
          variant="outline"
          className="h-auto border-white bg-transparent py-2 hover:bg-red-600 !text-white"
        >
          Restore page
        </Button>
        <ConfirmModal
          description="This action cannot be undone. This will permanently delete your note!"
          onConfirm={onDelete}
          btnCopy="Delete note"
        >
          <Button
            variant="outline"
            className="h-auto border-white bg-transparent py-2 hover:bg-red-600 !text-white"
          >
            Delete forever
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};
