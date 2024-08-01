"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddCollaboratorMutation } from "../(routes)/documents/hooks";
import { UsersList } from "./user-list";
import { Collaborators } from "./collaborators";
import { CollaboratorsAvatarStack } from "@/components/collaborators-avatar-stack";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Id } from "@/convex/_generated/dataModel";
import { Collaborator, User } from "../(routes)/documents/types";

import { MailPlus, Send } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

import { useSearchUsers } from "@/actions/user.actions";
import { useDebounceFunction } from "@/hooks/use-debounce-function";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { useOthers } from "@liveblocks/react/suspense";
import { ToggleFavorite } from "./toggle-favourite";

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
  const others = useOthers();
  const onlineCollaborators = others.map(({ info }) => info);

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
    setQuery(user.email);
    setSelectedUser(user);
  };

  const handleInvite = () => {
    if (!selectedUser) return;

    const collaborator: Collaborator = {
      avatar: selectedUser.imgUrl,
      name: selectedUser.name || "guest",
      email: selectedUser.email,
    };
    add({
      id: documentId,
      collaborator,
    });
  };

  return (
    <div className="px-2 border-b flex items-center justify-between min-h-12">
      <div>
        {ownerId !== user?.id ? (
          onlineCollaborators.length > 0 ? (
            <CollaboratorsAvatarStack
              collaborators={onlineCollaborators}
              size="sm"
            />
          ) : (
            <span className="text-muted-foreground text-sm">
              &#x2022; 0 online
            </span>
          )
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={ownerId !== user?.id}
                className="h-auto py-1 bg-secondary/50 select-none"
                size={"sm"}
                variant={"ghost"}
              >
                Manage collaborators
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="p-2"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Collaborators documentId={documentId} />
            </PopoverContent>
          </Popover>
        )}
      </div>
      <div className="flex items-center gap-x-2">
        <ToggleFavorite
          documentId={documentId}
          disabled={user?.id !== ownerId}
        />
        <Popover
          onOpenChange={() => {
            setQuery("");
            setSelectedUser(undefined);
          }}
        >
          <PopoverTrigger asChild>
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
