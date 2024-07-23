import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { toast } from "sonner";

type CreateDocumentProps = {
  title: string;
  parentDocument?: Id<"documents">;
};

const useCreateNewDocumentMutation = () => {
  const {
    mutate: create,
    isPending: isCreating,
    data: documentId,
    isError,
    error,
    isSuccess,
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
    if (isCreating) {
      toastId = toast.loading("Creating new document...");
    }
    if (isSuccess && documentId) {
      toast.success("New document created.");
      router.push(`/documents/${documentId}`);
      toast.dismiss(toastId);
    }
    if (isError) {
      toast.error("Error, while creating new document");
      toast.dismiss(toastId);
    }
  }, [documentId, isCreating, isError, isSuccess]);

  return {
    onCreateDocument,
    isCreating,
    isSuccess,
    isError,
    error,
    documentId,
  };
};

const useArchiveDocumentMutation = () => {
  let toastId = useRef<string | number>("");

  const {
    mutate: archive,
    isPending: isArchiving,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: useConvexMutation(api.documents.archiveDocument),
    onSuccess: () => {
      toast.success("Document trashed!");
      toast.dismiss(toastId.current);
    },
    onError: () => {
      toast.error("Error moving document to trash. Try again!");
      toast.dismiss(toastId.current);
    },
  });

  useEffect(() => {
    if (isArchiving) {
      toastId.current = toast.loading("Moving document to trash...");
    }
  }, [isArchiving]);

  return {
    archive,
    isArchiving,
    isError,
    error,
    isSuccess,
  };
};

const useDeleteDocumentMutation = () => {
  let toastId = useRef<string | number>("");

  const {
    mutate: remove,
    isPending: isDeleting,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: useConvexMutation(api.documents.deleteDocument),
    onSuccess: () => {
      toast.success("Document permanently deleted!");
      toast.dismiss(toastId.current);
    },
    onError: () => {
      toast.success("Error!, while deleting document. Try again!");
      toast.dismiss(toastId.current);
    },
  });

  useEffect(() => {
    if (isDeleting) {
      toastId.current = toast.loading("deleting your document ...");
    }
  }, [isDeleting]);

  return {
    remove,
    isDeleting,
    isSuccess,
    isError,
  };
};

const useRestoreDocumentMutation = () => {
  const toastId = useRef<string | number>("");
  const {
    mutate: restore,
    isPending: isRestoring,
    isError,
  } = useMutation({
    mutationFn: useConvexMutation(api.documents.restoreArchives),
    onSuccess: () => {
      toast.success("Document restored!");
      toast.dismiss(toastId.current);
    },
    onError: () => {
      toast.error("Error!, while restoring your document!");
      toast.dismiss(toastId.current);
    },
  });

  useEffect(() => {
    if (isRestoring) {
      toastId.current = toast.loading("Restoring your document...");
    }
  }, [isRestoring]);

  return {
    restore,
    isRestoring,
    isError,
  };
};

const usePublishDocumentMutation = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  const { mutate: publish, ...rest } = useMutation({
    mutationFn: useConvexMutation(api.documents.udpate),
    onSuccess,
    onError,
  });
  return { publish, ...rest };
};

const useGetSidebarDocumentsQuery = (
  parentDocument: Id<"documents"> | undefined
) =>
  useQuery(
    convexQuery(api.documents.getDocumentsByParentDocument, { parentDocument })
  );

const useGetDocumentsQuery = () =>
  useQuery(convexQuery(api.documents.getDocumentsByUser, {}));

const useGetArchiveDocumentsQuery = () =>
  useQuery(convexQuery(api.documents.getArchiveDocuments, {}));

export {
  useArchiveDocumentMutation,
  useCreateNewDocumentMutation,
  useDeleteDocumentMutation,
  useRestoreDocumentMutation,
  useGetSidebarDocumentsQuery,
  useGetDocumentsQuery,
  useGetArchiveDocumentsQuery,
  usePublishDocumentMutation,
};
