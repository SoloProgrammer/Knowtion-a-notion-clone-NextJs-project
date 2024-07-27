import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { User } from "@clerk/nextjs/server";

type UsersListProps = {
  users: User[] | undefined;
  onUserSelect?: (user: User) => void;
  enabledRemove?: boolean;
};

type UserItemProps = {
  user: User;
  onUserSelect?: (user: User) => void;
};

export const UsersList = ({ users, onUserSelect }: UsersListProps) => {
  return (
    <div className="mt-2 flex flex-col gap-y-1">
      {users?.map((user) => (
        <UserItem user={user} onUserSelect={onUserSelect} />
      ))}
    </div>
  );
};

const UserItem = ({ user, onUserSelect }: UserItemProps) => {
  return (
    <div
      onClick={() => onUserSelect?.(user)}
      className="flex items-center gap-x-3 bg-muted/60 py-1 rounded-sm px-1 hover:bg-muted cursor-pointer"
    >
      <Avatar className="w-5 h-5">
        <AvatarImage src={user.imageUrl} alt={user.firstName as string} />
      </Avatar>
      <span className="truncate text-xs">
        {user.emailAddresses[0].emailAddress}
      </span>
    </div>
  );
};
