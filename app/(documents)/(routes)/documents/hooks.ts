import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useConvexMutation } from "@convex-dev/convex-react-query";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { toast } from "sonner";

type CreateDocumentProps = {
  title: string;
  parentDocument?: Id<"documents">;
};

export const useCreateNewDocument = () => {
  const {
    mutate: create,
    isPending,
    data: documentId,
    isError,
  } = useMutation({
    mutationFn: useConvexMutation(api.documents.create),
  });
  const router = useRouter();

  const onCreateDocument = ({
    title,
    parentDocument = undefined,
  }: CreateDocumentProps) => create({ title, parentDocument });

  useEffect(() => {
    let toastId;
    if (isPending) {
      toastId = toast.loading("Creating new document...");
    }
    if (documentId) {
      toast.success("New document created.");
      router.push(`/documents/${documentId}`);
      toast.dismiss(toastId);
    }
    if (isError) {
      toast.error("Error, while creating new document");
      toast.dismiss(toastId);
    }
  }, [documentId, isPending, isError]);

  return {
    onCreateDocument,
    isPending,
    isError,
    documentId,
  };
};
