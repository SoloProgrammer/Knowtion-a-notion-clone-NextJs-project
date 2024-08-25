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

import {
  Check,
  MessageCircle,
  Send,
  SmilePlus,
  SquarePen,
  Trash,
  X,
} from "lucide-react";
import AutoResizeTextArea from "react-textarea-autosize";
import Image from "next/image";

import { Id } from "@/convex/_generated/dataModel";

import {
  ElementRef,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  useCreateNewComment,
  useDeleteComment,
  useGetDocumentsQuery,
  useReactToComment,
  useUpdateComment,
} from "./hooks";
import { useUser } from "@clerk/clerk-react";
import { useMediaQuery } from "usehooks-ts";
import {
  useBroadcastEvent,
  useEventListener,
} from "@liveblocks/react/suspense";
import { useCommentsSheet } from "@/hooks/zustand/use-comments-sheet";

import { getFromNowDate } from "@/utils/date";
import { cn } from "@/lib/utils";
import { Comment, CommentFormProps, Reaction } from "./types";
import { toast } from "sonner";

type CommentsSheetProps = {
  documentId: Id<"documents">;
};

export const CommentsSheet = ({
  children,
  documentId,
}: PropsWithChildren<CommentsSheetProps>) => {
  const { user } = useUser();
  const { closeSheet } = useCommentsSheet();
  // Broadcast event hook
  const broadcast = useBroadcastEvent();
  const { create, isPending } = useCreateNewComment((comment: string) => {
    broadcast({
      type: "NEW_MESSAGE",
      data: {
        message: comment || "",
        user: user?.fullName || "",
      },
    });
  });

  const handleCreateComment = (content: string = "") => {
    if (!content?.trim()) return;
    create({ content, document: documentId });
  };

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Sheet onOpenChange={(open) => !open && closeSheet()}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "flex flex-col h-full px-0 pb-1 pt-5",
          isMobile && "!w-[100%] !max-h-[70%]"
        )}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center px-4 pb-1">
            <MessageCircle className="text-muted-foreground mr-2" />{" "}
            <span>Live chat feed</span>
          </SheetTitle>
        </SheetHeader>
        <CommentsList documentId={documentId} />
        <div className="px-3">
          <CommentForm
            autoFocus={!isMobile}
            isLoading={isPending}
            onSubmit={handleCreateComment}
            key={"create-comment-form"}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const CommentForm = ({
  isLoading,
  defaultValue = "",
  isEdit,
  onSubmit,
  disabled,
  autoFocus = true,
  size = "default",
}: CommentFormProps) => {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = () => {
    const content = commentRef.current?.value || "";
    if(content?.length < 1) return
    onSubmit(content?.trim() || "");
    if (commentRef.current && !isEdit) commentRef.current.value = "";
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const SubmitButtonIcon = isEdit ? Check : Send;

  const [isChanged, setIsChanged] = useState(false);

  const btnDisabled = isLoading || disabled || (!isChanged && isEdit)

  return (
    <div className="px-0">
      <div className="flex items-center gap-x-2 relative flex-col">
        <AutoResizeTextArea
          ref={commentRef}
          className={cn(
            "bg-neutral-100 dark:bg-neutral-900 text-sm w-full resize-none focus:ring-2 ring-black/80 dark:ring-white outline-none rounded-md transition-all p-2 custom-scroll-bar py-[10px]",
            size === "small" && "py-[5px] text-[.85rem]"
          )}
          minRows={1}
          placeholder="Type your comment here..."
          maxRows={5}
          defaultValue={defaultValue}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          tabIndex={isEdit ? 1 :-1}
          autoComplete="off"
          onFocus={(e) => {
            e.target.setSelectionRange(
              defaultValue.length,
              defaultValue.length
            );
          }}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            isEdit && setIsChanged(e.target.value.trim() !== defaultValue);
          }}
        />
        <Button
          disabled={btnDisabled}
          onClick={(e) => {
            e.stopPropagation();
            handleSubmit();
          }}
          size="icon"
          className={cn(
            "absolute right-[5px] bottom-[5px] h-[30px] w-[30px]",
            size === "small" && "right-[3px] h-[25px] w-[25px] bottom-[2px]"
          )}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <SubmitButtonIcon className="w-4 h-4 shrink-0" />
          )}
        </Button>
      </div>
      <span className="text-[11px] text-muted-foreground my-2 inline-block">
        Pro tip: hit shift + ↵ to{" "}
        {isEdit ? "save changes!" : "add new comment!"}
      </span>
    </div>
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
        <div className="flex flex-grow flex-col justify-end w-full overflow-y-auto pr-1">
          <div
            className="flex flex-col gap-y-3 w-full overflow-y-auto custom-scroll-bar pb-2 px-4 pr-3"
            ref={commentsContainerRef}
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
  const { user } = useUser();
  const [isEdit, setIsEdit] = useState(false);

  // Broadcast event hook
  const broadcast = useBroadcastEvent();

  const { remove, isPending: isDeleting } = useDeleteComment(() => {
    broadcast({
      type: "MESSAGE_DELETED",
      user: user?.fullName || "",
    });
  });

  const { save, isPending: isSaving } = useUpdateComment(() =>
    setIsEdit(false)
  );

  const handleDelete = () => remove({ id: comment._id });

  const handleSaveChanges = (content: string = "") => {
    save({ commentId: comment._id, content });
  };

  return (
    <>
      <div
        key={comment._id}
        className="group/comment"
        onClick={() => setIsEdit(false)}
      >
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
          <div>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEdit(prev => !prev);
                  }}
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
          {isEdit ? (
            <div>
              <CommentForm
                defaultValue={comment.content}
                onSubmit={handleSaveChanges}
                isEdit
                autoFocus
                isLoading={isSaving}
                size="small"
              />
            </div>
          ) : (
            comment.content
          )}
        </div>
        <ReactionsList commentId={comment._id} reactions={comment.reactions} />
      </div>
      <Separator className="last:hidden px-4 inline-block" />
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
    <div className="flex-grow flex items-end py-5 w-full px-4">
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
  const { isOpen, openSheet } = useCommentsSheet();
  const [notification, setNotifications] = useState(0);

  useEventListener(({ event }) => {
    if (isOpen) return;

    if (event.type === "NEW_MESSAGE") {
      setNotifications((prev) => ++prev);
      toast(`New message from ${event.data.user}`, {
        description: event.data.message,
      });
    } else if (event.type === "MESSAGE_DELETED") {
      notification > 0 && setNotifications((prev) => --prev);
      toast(`Message deleted by ${event.user}`);
    }
  });

  useEffect(() => {
    if (isOpen) setNotifications(0);
  }, [isOpen]);

  return (
    <div className="fixed bottom-20 right-6 z-[99]">
      <CommentsSheet documentId={documentId}>
        <Button
          onClick={() => openSheet()}
          data-notification-count={(notification || "1").toString()}
          variant="ghost"
          size={"sm"}
          className={cn(
            "bg-neutral-100 border-t shadow-md dark:bg-neutral-800 h-auto p-2 pt-[6px]",
            "before:absolute before:-top-1 before:-left-1 before:transition-opacity before:rounded-full before:bg-red-500 before:animate-bounce before:content-[attr(data-notification-count)] before:flex before:text-xs before:items-center before:justify-center before:w-4 before:h-4 before:opacity-0",
            notification > 0 && "before:opacity-100 before:animate-bounce"
          )}
        >
          <MessageCircle className="rotate" />
        </Button>
      </CommentsSheet>
    </div>
  );
};
