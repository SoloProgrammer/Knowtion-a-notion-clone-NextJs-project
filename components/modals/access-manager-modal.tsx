import { Id } from "@/convex/_generated/dataModel";
import React, { useRef } from "react";
import { toast } from "sonner";

import { UsersList } from "@/app/(documents)/_components/user-list";
import { useRemoveCollaboratorMutation, useUpdateCollaboratorAccess } from "@/app/(documents)/(routes)/documents/hooks";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Collaborator, User } from "@/app/(documents)/(routes)/documents/types";

type AccessManagerModalProps = {
  documentId: Id<"documents">;
  collaborators: Omit<Collaborator, "avatar">[] | undefined;
  setShow: (value: boolean) => void;
  show?: boolean;
};
const AccessManagerModal = ({ documentId, collaborators, show = false, setShow }: AccessManagerModalProps) => {
  const toastId = useRef<string | number>("");
  const { remove } = useRemoveCollaboratorMutation(
    () => {
      toast.dismiss(toastId.current);
      toast.success("Document unshared!");
    },
    () => {
      toast.dismiss(toastId.current);
      toast.error("Some error occured! Try again.");
    },
  );

  const { update, isPending: isUpdatingAccess } = useUpdateCollaboratorAccess(
    () => {
      toast.dismiss(toastId.current);
      toast.success("Access Updated!");
    },
    () => {
      toast.dismiss(toastId.current);
      toast.error("Some error occured! Try again.");
    },
  );
  const handleRemoveCollaborator = (collaborator: Omit<Collaborator, "avatar">) => {
    remove({ email: collaborator.email, documentId: documentId });
    toast.loading(`Unsharing the document with ${collaborator.name}`);
  };
  const handleUpdateAccess = (collaboratorId: Id<"collaborators">, access: Collaborator["access"]) => {
    update({ access: access!, collaboratorId });
    toast.loading(`Updating access..`);
  };
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="p-3 pb-5">
        <DialogHeader>
          <DialogTitle className="py-2">Control Access for your team members!</DialogTitle>
          <DialogDescription>
            <UsersList
              users={collaborators as User[]}
              enableActions={true}
              onRemoveAccess={handleRemoveCollaborator}
              onUpdateAccess={handleUpdateAccess}
              isLoading={isUpdatingAccess}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AccessManagerModal;
