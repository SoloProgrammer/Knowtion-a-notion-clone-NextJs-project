import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Reaction } from "./types";

const useCreateNewComment = (
  onSuccess?: (data: string) => void,
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

const useUpdateComment = (
  onSuccess?: (data: string) => void,
  onError?: (err: Error) => void
) => {
  const { mutate: save, ...rest } = useMutation({
    mutationFn: useConvexMutation(api.comments.update),
    onSuccess,
    onError,
  });
  return { save, ...rest };
};

const useReactToComment = (onSuccess?: (reactions: Reaction[]) => void) => {
  const { mutate: react, ...rest } = useMutation({
    mutationFn: useConvexMutation(api.comments.reaction),
    onSuccess,
  });
  return { react, ...rest };
};

const useGetCommentsQuery = (
  document: Id<"documents">,
  parentComment?: Id<"comments">,
  orderBy?: string
) =>
  useQuery(convexQuery(api.comments.get, { document, parentComment, orderBy }));

export {
  useCreateNewComment,
  useDeleteComment,
  useReactToComment,
  useGetCommentsQuery,
  useUpdateComment,
};
