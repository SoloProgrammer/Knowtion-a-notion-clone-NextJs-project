import { AvatarImage, Avatar } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { User } from "../(routes)/documents/types";

import { CircleX } from "lucide-react";

type UsersListProps = {
  users: User[] | undefined;
  onUserSelect?: (user: User) => void;
  enabledRemove?: boolean;
};

type UserItemProps = {
  user: User;
  onUserSelect?: (user: User) => void;
  enabledRemove?: boolean;
};

export const UsersList = ({
  users,
  onUserSelect,
  enabledRemove,
}: UsersListProps) => {
  return (
    <div className="mt-2 flex flex-col gap-y-[6px]">
      {users?.map((user) => (
        <UserItem
          key={user.email}
          user={user}
          onUserSelect={onUserSelect}
          enabledRemove={enabledRemove}
        />
      ))}
    </div>
  );
};

const UserItem = ({ user, onUserSelect, enabledRemove }: UserItemProps) => {
  return (
    <div
      onClick={() => onUserSelect?.(user)}
      className={cn(
        "flex items-center gap-x-3 bg-muted/60 py-[2px] rounded-sm px-1 hover:bg-muted cursor-pointer group",
        enabledRemove && "hover:bg-red-400/20"
      )}
    >
      <Avatar className="w-7 h-7">
        <AvatarImage
          src={user.imgUrl}
          alt={user.name as string}
          className={cn(
            enabledRemove &&
              "group-hover:scale-0 transition-transform group-hover:hidden"
          )}
        />
        <CircleX
          className={cn(
            "w-full h-full scale-0 transition-transform text-red-500",
            enabledRemove && "group-hover:scale-100"
          )}
        />
      </Avatar>
      <span
        className={cn(
          "flex flex-col",
          enabledRemove && "group-hover:text-red-500"
        )}
      >
        <span className="text-sm capitalize">{user.name}</span>
        <span
          className={cn(
            "truncate text-[.7rem] text-neutral-400",
            enabledRemove && "group-hover:text-red-500"
          )}
        >
          {user.email}
        </span>
      </span>
    </div>
  );
};
