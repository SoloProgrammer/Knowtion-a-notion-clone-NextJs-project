import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useCreateNewComment = (
  onSuccess?: () => void,
  onError?: (err: Error) => void
) => {
  const { mutate: create, ...rest } = useMutation({
    mutationFn: useConvexMutation(api.comments.create),
    onSuccess,
    onError,
  });

  return { create, ...rest };
};

const useDeleteComment = (
  onSuccess?: () => void,
  onError?: (err: Error) => void
) => {
  const { mutate: remove, ...rest } = useMutation({
    mutationFn: useConvexMutation(api.comments.remove),
    onSuccess,
    onError,
  });
  return { remove, ...rest };
};

const useReactToComment = () => {
  const { mutate: react, ...rest } = useMutation({
    mutationFn: useConvexMutation(api.comments.reaction),
  });
  return { react, ...rest };
};

const useGetDocumentsQuery = (
  document: Id<"documents">,
  parentComment?: Id<"comments">
) => useQuery(convexQuery(api.comments.get, { document, parentComment }));

export {
  useCreateNewComment,
  useDeleteComment,
  useReactToComment,
  useGetDocumentsQuery,
};
