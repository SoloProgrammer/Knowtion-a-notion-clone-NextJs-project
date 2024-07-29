"use client";

import { Id } from "@/convex/_generated/dataModel";

import { Spinner } from "@/components/spinner";
import { UsersList } from "./user-list";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TryAgainButton } from "./try-again-button";
import { Collaborator } from "../(routes)/documents/types";

import { Blend } from "lucide-react";
import { toast } from "sonner";

import { useRef } from "react";
import {
  useGetCollaboratorsByDocument,
  useRemoveCollaboratorMutation,
} from "../(routes)/documents/hooks";
import { useOthers } from "@liveblocks/react/suspense";

type CollaboratorProps = {
  documentId: Id<"documents">;
};

export const Collaborators = ({ documentId }: CollaboratorProps) => {
  const toastId = useRef<string | number>("");
  const {
    data: collaborators,
    isLoading,
    isError,
    refetch,
  } = useGetCollaboratorsByDocument(documentId);

  const { remove } = useRemoveCollaboratorMutation(
    () => {
      toast.dismiss(toastId.current);
      toast.success("Document unshared!");
    },
    () => {
      toast.dismiss(toastId.current);
      toast.error("Some error occured! Try again.");
    }
  );

  const others = useOthers();

  const onlineCollaborators = others.map(({ info }) => info);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-5">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-5 flex-col gap-y-3">
        <p>Some error occured!</p>
        <TryAgainButton onClick={() => refetch()} />
      </div>
    );
  }

  if (collaborators && collaborators.length < 1) {
    return (
      <div className="text-xs text-center">
        <Blend className="w-4 h-4 inline-block mr-2" />
        You haven't shared this document with anyone yet.
      </div>
    );
  }

  const handleRemoveCollaborator = (collaborator: Collaborator) => {
    remove({ email: collaborator.email, documentId: documentId });
    toastId.current = toast.loading(
      `Unsharing the document with ${collaborator.name}`
    );
  };

  return (
    <div>
      {onlineCollaborators.length > 0 && (
        <div>
          <p className="text-muted-foreground text-xs font-semibold">
            Now Editing
          </p>
          <div className="flex -space-x-1 my-3 pb-1">
            {onlineCollaborators?.map((collaborator) => {
              return (
                <Tooltip key={collaborator.id}>
                  <TooltipTrigger>
                    <Avatar
                      className={`w-8 h-8 rounded-full`}
                      style={{
                        boxShadow: `0 0 0 2px ${collaborator.color}`,
                      }}
                    >
                      <AvatarImage
                        src={collaborator.avatar}
                        alt={collaborator.name}
                      />
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="!text-xs !p-1 !px-2">
                    {collaborator.name}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
          <Separator />
        </div>
      )}
      <div className="mt-2">
        <p className="text-muted-foreground text-xs font-semibold pb-2">
          Shared with
        </p>
        <UsersList
          users={collaborators}
          enabledRemove
          onUserSelect={handleRemoveCollaborator}
        />
      </div>
    </div>
  );
};
