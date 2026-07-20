"use client";

import { Id } from "@/convex/_generated/dataModel";

import { Spinner } from "@/components/spinner";
import { UsersList } from "./user-list";
import { Separator } from "@/components/ui/separator";
import { TryAgainButton } from "./try-again-button";
import { Collaborator } from "../(routes)/documents/types";
import { CollaboratorsAvatarStack } from "@/components/collaborators-avatar-stack";

import { Blend } from "lucide-react";
import { toast } from "sonner";

import { useRef, useState } from "react";
import {
  useGetCollaboratorsByDocument,
  useRemoveCollaboratorMutation,
} from "../(routes)/documents/hooks";
import { useOthers } from "@liveblocks/react/suspense";
import AccessManagerModal from "@/components/modals/access-manager-modal";

type CollaboratorProps = {
  documentId: Id<"documents">;
};

export const Collaborators = ({ documentId }: CollaboratorProps) => {
  const toastId = useRef<string | number>("");
  const {
    data: collaborators,
    isLoading,
    isError,
    refetch
  } = useGetCollaboratorsByDocument(documentId);

  const [showAccessModal, setShowAccessModal] = useState<boolean>(false);

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

  return (
    <div>
      {onlineCollaborators.length > 0 && (
        <div>
          <p className="text-muted-foreground text-xs font-semibold">
            Active users
          </p>
          <div className="my-3 pb-1">
            <CollaboratorsAvatarStack collaborators={onlineCollaborators} />
          </div>
          <Separator />
        </div>
      )}
      <div className="mt-2">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-xs font-semibold pb-2">
            Shared with
          </p>
          <p onClick={()=> setShowAccessModal(true)} className=" dark:text-white/70 text-black/70 cursor-pointer hover:bg-secondary text-xs font-semibold bg-secondary/70 p-1 px-2 rounded select-none">
            Manage Access
          </p>
        </div>
        <UsersList
          users={collaborators}
        />
      </div>
      <AccessManagerModal show={showAccessModal} documentId={documentId} collaborators={collaborators} setShow={setShowAccessModal}/>
    </div>
  );
};
