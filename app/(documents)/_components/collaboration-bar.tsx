"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collaborator,
  useAddCollaboratorMutation,
} from "../(routes)/documents/hooks";
import { UsersList } from "./user-list";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Id } from "@/convex/_generated/dataModel";

import { MailPlus, Send } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { User } from "@clerk/nextjs/server";

import { useSearchUsers } from "@/actions/user.actions";
import { useDebounceFunction } from "@/hooks/use-debounce-function";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";

type CollaborationBarProps = {
  documentId: Id<"documents">;
  ownerId: string;
};

export const CollaborationBar = ({
  documentId,
  ownerId,
}: CollaborationBarProps) => {
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const debounceEnabled = useDebounceFunction(() => setIsEnabled(true));

  const handleDebounceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    e.target.value.trim() && debounceEnabled();
  };

  const { data: users, isFetching } = useQuery({
    queryFn: async () => {
      const users = (await useSearchUsers(query.trim())).filter(
        (u) => u.id !== user?.id && u.id !== ownerId
      );
      setIsEnabled(false);
      return users;
    },
    enabled: isEnabled && !!query.trim(),
    queryKey: ["search-users"],
  });

  const { add, isPending } = useAddCollaboratorMutation(
    () => {
      toast.success("Invite sent successully!");
      setSelectedUser(undefined);
      setQuery("");
    },
    (errMsg) => toast.error(errMsg)
  );

  const handleUserSelect = (user: User) => {
    setQuery(user.emailAddresses[0].emailAddress);
    setSelectedUser(user);
  };

  const handleInvite = () => {
    if (!selectedUser) return;

    const collaborator: Collaborator = {
      imgUrl: selectedUser.imageUrl,
      name: selectedUser.firstName || "guest",
      email: selectedUser.emailAddresses[0].emailAddress,
    };
    add({
      id: documentId,
      collaborator,
    });
  };

  return (
    <div className="p-2 border-b flex items-center justify-between">
      <div>shared with</div>
      <div>
        <Popover onOpenChange={() => setQuery("")}>
          <PopoverTrigger>
            <Button size={"sm"} className="h-auto py-1">
              <span>Invite</span>
              <MailPlus className="w-4 h-4 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="p-2">
            <h2 className="font-medium pb-2 text-sm">Search users</h2>
            <div className="flex items-center">
              <Input
                value={query}
                type="search"
                onChange={handleDebounceChange}
                placeholder="pratham@gmail.com"
                className="placeholder:text-primary/50 h-[30px] text-xs focus-visible:ring-transparent bg-muted/70 border rounded-tr-none rounded-br-none"
              />
              <Button
                disabled={isPending || !selectedUser}
                onClick={handleInvite}
                className="h-[30px] min-w-[50px] rounded-tl-none rounded-bl-none"
              >
                {isPending ? (
                  <Spinner />
                ) : (
                  <Send className="w-5 h-5 shrink-0" />
                )}
              </Button>
            </div>
            {isFetching ? (
              <div className="py-5 flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <UsersList users={users} onUserSelect={handleUserSelect} />
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
