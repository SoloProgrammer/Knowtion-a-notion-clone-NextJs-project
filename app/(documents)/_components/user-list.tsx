import { AvatarImage, Avatar } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { CircleX, Eye, Pen } from "lucide-react";

import { AccessLabel, Collaborator, User } from "../(routes)/documents/types";

import { ACCESS_LABELS } from "@/app/constants";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ConfirmModal } from "@/components/modals/confirm-action-modal";

import { Id } from "@/convex/_generated/dataModel";
import { Separator } from "@radix-ui/react-separator";

type UsersListProps = {
  users: User[] | undefined;
  onUserSelect?: (user: User) => void;
  enabledRemove?: boolean;
  enableActions?: boolean;
  viewOnly?: boolean;
  isLoading?: boolean;
  onRemoveAccess?: (collaborator: User) => void;
  onUpdateAccess?: (collaboratorId: Id<"collaborators">, access: Collaborator["access"]) => void;
};

type UserItemProps = Omit<UsersListProps, "users"> & {
  user: User;
};

export const UsersList = ({
  users,
  onUserSelect,
  enabledRemove,
  enableActions,
  isLoading,
  viewOnly,
  onRemoveAccess,
  onUpdateAccess,
}: UsersListProps) => {
  return (
    <div className="mt-2 flex flex-col gap-y-[6px]">
      {users?.map((user) => (
        <UserItem
          key={user.email}
          user={user}
          onUserSelect={onUserSelect}
          enabledRemove={enabledRemove}
          enableActions={enableActions}
          viewOnly={viewOnly}
          isLoading={isLoading}
          onRemoveAccess={onRemoveAccess}
          onUpdateAccess={onUpdateAccess}
        />
      ))}
    </div>
  );
};

const UserItem = ({
  user,
  onUserSelect,
  enabledRemove,
  enableActions = false,
  isLoading = false,
  viewOnly = true,
  onRemoveAccess,
  onUpdateAccess,
}: UserItemProps) => {
  return (
    <div
      onClick={() => onUserSelect?.(user)}
      className={cn(
        "flex items-start justify-between gap-x-3 bg-muted/60 py-[2px] rounded-sm px-1 hover:bg-muted cursor-pointer group",
        enabledRemove && "hover:bg-red-400/20",
        viewOnly && "cursor-default",
      )}
    >
      <div className="flex items-center gap-x-3">
        <Avatar className="w-7 h-7">
          <AvatarImage
            src={user.imgUrl}
            alt={user.name as string}
            className={cn(enabledRemove && "group-hover:scale-0 transition-transform group-hover:hidden")}
          />
          <CircleX className={cn("w-full h-full scale-0 transition-transform text-red-500", enabledRemove && "group-hover:scale-100")} />
        </Avatar>
        <span className={cn("flex flex-col", enabledRemove && "group-hover:text-red-500")}>
          <span className="text-sm capitalize">{user.name}</span>
          <span className={cn("truncate text-[.7rem] text-neutral-400", enabledRemove && "group-hover:text-red-500")}>{user.email}</span>
        </span>
      </div>
      {enableActions ? (
        <div className="m-1 flex items-center justify-between gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex-1" disabled={isLoading}>
              <p className="border flex justify-between gap-1 items-center text-xs bg-secondary/60 px-2 py-1 hover:bg-secondary-foreground/10 border-foreground/10">
                <span>{user.access === "read" ? "Viewer" : "Editor"}</span>
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.keys(ACCESS_LABELS).map((accessKey) => (
                <>
                <DropdownMenuItem
                  disabled={isLoading}
                  className={cn("flex items-center gap-1 text-xs disabled:cursor-default")}
                  onSelect={() =>
                    onUpdateAccess?.(user.id as Id<"collaborators">, ACCESS_LABELS[accessKey as AccessLabel] as Collaborator["access"])
                  }
                  key={accessKey}
                >
                  {accessKey}
                </DropdownMenuItem>
                </>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ConfirmModal
            onConfirm={() => onRemoveAccess?.(user)}
            description={`This action will permanently remove access for ${user.name} from this document workspace!`}
          >
            <p className="border flex cursor-pointer justify-between gap-1 items-center text-xs bg-secondary/60 px-2 py-1 border-red-800 hover:bg-red-800 hover:text-white">
              <span>Remove</span>
            </p>
          </ConfirmModal>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
