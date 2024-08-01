"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/spinner";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { ConfirmModal } from "@/components/modals/confirm-action-modal";
import { Skeleton } from "@/components/ui/skeleton";

import { MessageCircle, Send, Trash } from "lucide-react";
import AutoResizeTextArea from "react-textarea-autosize";
import Image from "next/image";

import { Id } from "@/convex/_generated/dataModel";

import { KeyboardEvent, PropsWithChildren, useRef } from "react";
import {
  useCreateNewComment,
  useDeleteComment,
  useGetDocumentsQuery,
} from "./hooks";
import { useUser } from "@clerk/clerk-react";

import { getFromNowDate } from "@/utils/date";
import { Comment } from "./types";

type CommentsSheetProps = {
  documentId: Id<"documents">;
};

export const CommentsSheet = ({
  children,
  documentId,
}: PropsWithChildren<CommentsSheetProps>) => {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const { create, isPending } = useCreateNewComment(() => {
    if (commentRef.current) commentRef.current.value = "";
  });

  const handleCreateComment = () => {
    const content = commentRef.current?.value;
    if (!content?.trim()) return;
    create({ content, document: documentId });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleCreateComment();
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col h-full px-4 pb-2 w-[85%] ">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <MessageCircle className="text-muted-foreground mr-2" />{" "}
            <span>Live chat feed</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-grow flex flex-col">
          <CommentsList documentId={documentId} />
          <div className="flex items-center gap-x-2 relative flex-col">
            <AutoResizeTextArea
              ref={commentRef}
              className="bg-neutral-100 dark:bg-neutral-900 text-sm w-full resize-none focus:ring-2 ring-black/80 dark:ring-white outline-none rounded-md transition-all p-2 custom-scroll-bar py-[10px]"
              minRows={1}
              placeholder="Type your comment here..."
              maxRows={5}
              onKeyDown={handleKeyDown}
            />
            <Button
              disabled={isPending}
              onClick={handleCreateComment}
              size="icon"
              className="absolute right-[5px] bottom-[5px] h-[30px] w-[30px]"
            >
              {isPending ? <Spinner /> : <Send className="w-4 h-4 shrink-0" />}
            </Button>
          </div>
          <span className="text-[11px] text-muted-foreground my-2 inline-block">
            Pro tip: hit shift + ↵ to push new comment!
          </span>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const CommentsList = ({ documentId }: { documentId: Id<"documents"> }) => {
  const { data: comments, isLoading } = useGetDocumentsQuery(documentId);

  if (isLoading) {
    return <CommentsList.Skeleton />;
  }

  return (
    <>
      {!comments || comments.length < 1 ? (
        <div className="flex items-center flex-grow justify-center flex-col">
          <div className="relative w-[240px] h-[240px]">
            <Image
              src={"/no-comments.png"}
              className="object-cover dark:invert"
              alt="no-comments"
              fill
            />
          </div>
          <p className="mt-2 font-medium">No comments yet!</p>
        </div>
      ) : (
        <div className="flex-grow flex items-end py-5 w-full">
          <div className="flex flex-col gap-y-2 w-full">
            {comments?.map((comment) => (
              <SingleComment key={comment._id} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const SingleComment = ({ comment }: { comment: Comment }) => {
  const { remove, isPending: isDeleting } = useDeleteComment();

  const { user } = useUser();

  const handleDelete = () => remove({ id: comment._id });

  return (
    <div key={comment._id} className="group/comment">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={comment.author.avatar}
              alt={comment.author.name}
            />
          </Avatar>
          <div className="flex gap-x-2 items-center">
            <span className="text-sm font-medium">{comment.author.name}</span>
            <span className="text-xs text-muted-foreground">
              {getFromNowDate(comment._creationTime)}
            </span>
          </div>
        </div>
        {user?.id === comment.author.id ? (
          <ConfirmModal
            onConfirm={handleDelete}
            btnCopy="Yes, delete!"
            description="This action cannot be undone. It will permanently delete this comment!"
          >
            <Button
              disabled={isDeleting}
              className="h-auto p-1 md:opacity-0 group-hover/comment:opacity-100 transition-all text-primary/80 hover:text-primary"
              variant="ghost"
            >
              {isDeleting ? (
                <Spinner />
              ) : (
                <Trash className="w-4 h-4 shrink-0" />
              )}
            </Button>
          </ConfirmModal>
        ) : (
          <></>
        )}
      </div>
      <div className="text-primary/80 text-sm ml-10 mt-0">
        {comment.content}
      </div>
    </div>
  );
};

CommentsList.Skeleton = () => {
  return (
    <div className="flex-grow flex items-end py-5 w-full">
      <div className="flex flex-col gap-y-2">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div
              key={`comments-skeleton-${i}`}
              className="flex flex-col gap-y-0"
            >
              <div className="flex items-center gap-x-2">
                <Skeleton className="rounded-full w-8 h-8" />
                <Skeleton className="w-[100px] h-[10px] rounded-md" />
              </div>
              <div className="ml-10">
                <Skeleton className="w-[220px] md:w-[300px] h-3" />
                <Skeleton className="w-1/2 h-2 mt-1" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export const CommentsTrigger = ({
  documentId,
}: {
  documentId: Id<"documents">;
}) => {
  return (
    <div className="fixed bottom-20 right-6 z-[99]">
      <CommentsSheet documentId={documentId}>
        <Button
          variant="ghost"
          size={"sm"}
          className="bg-neutral-100 border-t shadow-md dark:bg-neutral-800 h-auto p-2 pt-[6px]"
        >
          <MessageCircle className="rotate" />
        </Button>
      </CommentsSheet>
    </div>
  );
};
