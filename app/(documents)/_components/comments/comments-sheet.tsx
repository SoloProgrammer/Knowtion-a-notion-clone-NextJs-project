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
import { Separator } from "@/components/ui/separator";
import { IconPicker } from "@/components/icon-picker";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MessageCircle, Send, SmilePlus, SquarePen, Trash } from "lucide-react";
import AutoResizeTextArea from "react-textarea-autosize";
import Image from "next/image";

import { Id } from "@/convex/_generated/dataModel";

import {
  ElementRef,
  KeyboardEvent,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import {
  useCreateNewComment,
  useDeleteComment,
  useGetDocumentsQuery,
  useReactToComment,
} from "./hooks";
import { useUser } from "@clerk/clerk-react";
import { useMediaQuery } from "usehooks-ts";

import { getFromNowDate } from "@/utils/date";
import { cn } from "@/lib/utils";
import { Comment, Reaction } from "./types";

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

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "flex flex-col h-full pr-0 md:pr-3 px-4 pb-1 !overflow-y-auto",
          isMobile && "!w-[100%] !max-h-[70%]"
        )}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <MessageCircle className="text-muted-foreground mr-2" />{" "}
            <span>Live chat feed</span>
          </SheetTitle>
        </SheetHeader>
        <CommentsList documentId={documentId} />
        <div>
          <div className="flex items-center gap-x-2 relative flex-col">
            <AutoResizeTextArea
              ref={commentRef}
              className="bg-neutral-100 dark:bg-neutral-900 text-sm w-full resize-none focus:ring-2 ring-black/80 dark:ring-white outline-none rounded-md transition-all p-2 custom-scroll-bar py-[10px]"
              minRows={1}
              placeholder="Type your comment here..."
              maxRows={5}
              onKeyDown={handleKeyDown}
              autoFocus={!isMobile}
              tabIndex={-1}
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

  const commentsContainerRef = useRef<ElementRef<"div"> | null>(null);

  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop =
        commentsContainerRef.current.scrollHeight;
    }
  }, [comments?.length]);

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
        <div className="flex-grow flex flex-col justify-end w-full overflow-y-auto custom-scroll-bar">
          <div
            ref={commentsContainerRef}
            className="flex flex-col gap-y-3 w-full overflow-y-auto custom-scroll-bar pb-2"
          >
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
    <>
      <div key={comment._id} className="group/comment">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center gap-x-2">
            <Avatar className="w-9 h-9">
              <AvatarImage
                src={comment.author.avatar}
                alt={comment.author.name}
              />
            </Avatar>
            <div className="flex gap-y-[2px] flex-col">
              <span className="text-sm font-medium">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground">
                {getFromNowDate(comment._creationTime)}
              </span>
            </div>
          </div>
          <div className="mr-1">
            {user?.id === comment.author.id ? (
              <div>
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
                <Button
                  disabled={isDeleting}
                  className="h-auto ml-1 p-1 md:opacity-0 group-hover/comment:opacity-100 transition-all text-primary/80 hover:text-primary"
                  variant="ghost"
                >
                  <SquarePen className="w-4 h-4 shrink-0" />
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="text-primary/80 text-[14px] md:text-[13px] md ml-1 mt-2">
          {comment.content}
        </div>
        <ReactionsList commentId={comment._id} reactions={comment.reactions} />
      </div>
      <Separator className="last:hidden" />
    </>
  );
};

const ReactionsList = ({
  reactions,
  commentId,
}: {
  reactions: Reaction[] | undefined;
  commentId: Id<"comments">;
}) => {
  const { react, isPending: isReacting } = useReactToComment();

  const { user } = useUser();

  const handleReactToComment = (reaction: string) => {
    react({ id: commentId, reaction });
  };

  const reactionsByEmoji = reactions?.reduce(
    (acc: Record<string, string[]>, item) => {
      acc[item.reaction] = (acc[item.reaction] || []).concat(item.user);
      return acc;
    },
    {}
  );

  return (
    <div className="mt-2 flex flex-wrap items-center">
      <IconPicker onChange={handleReactToComment}>
        <Button
          className="h-auto p-1 transition-all text-primary/80 hover:text-primary inline-block"
          variant="ghost"
        >
          <SmilePlus className="w-4 h-4 shrink-0" />
        </Button>
      </IconPicker>
      {reactionsByEmoji &&
        Object.keys(reactionsByEmoji).map((reaction, i) => (
          <Tooltip key={`reaction-${i}`}>
            <TooltipTrigger>
              <Button
                disabled={isReacting}
                onClick={() => handleReactToComment(reaction)}
                className={cn(
                  "ml-2 h-auto min-w-[40px] p-1 transition-all text-primary/80 hover:text-primary inline-block py-0 px-0 rounded-md ring-1 ring-black/40 dark:ring-white/40",
                  reactionsByEmoji[reaction].includes(user?.fullName!) &&
                    "bg-sky-400/10 ring-1 !ring-sky-600"
                )}
                variant="ghost"
              >
                <span className="flex items-center justify-center gap-x-[2px]">
                  <small>{reactionsByEmoji[reaction].length}</small>
                  {reaction}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="py-1 hidden md:inline-block">
              {reactionsByEmoji[reaction].map((uName, i) => (
                <>
                  <span key={`user-${i}`} className="text-xs">
                    {uName}
                    {uName === user?.fullName ? "(You)" : ""}
                  </span>
                  <span
                    className={cn(
                      i === reactionsByEmoji[reaction].length - 1 && "hidden"
                    )}
                  >
                    &nbsp;,
                  </span>
                </>
              ))}
            </TooltipContent>
          </Tooltip>
        ))}
    </div>
  );
};

CommentsList.Skeleton = () => {
  return (
    <div className="flex-grow flex items-end py-5 w-full">
      <div className="flex flex-col gap-y-6 w-full">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <>
              <div
                key={`comments-skeleton-${i}`}
                className="flex flex-col gap-y-0 w-full"
              >
                <div className="flex items-center gap-x-2 w-full">
                  <Skeleton className="rounded-full w-9 h-9" />
                  <Skeleton className="w-[150px] h-[10px] rounded-md" />
                </div>
                <div className="ml-1 mt-2 w-full">
                  <Skeleton className="w-full md:w-[350px] h-3" />
                  <Skeleton className="w-1/2 h-2 mt-1" />
                </div>
              </div>
              <Separator className="last:hidden" />
            </>
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
