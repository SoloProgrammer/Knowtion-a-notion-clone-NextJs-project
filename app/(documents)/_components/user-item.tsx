"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SettingsModal } from "@/components/modals/settings-modal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { ChevronsLeftRight, LogOut, Mail, Settings } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";

import { BRAND_NAME } from "@/app/constants";

export const UserItem = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="w-full flex items-center gap-x-2 p-3 hover:bg-primary/5"
        >
          <div className="flex max-w-[70%] gap-x-2 items-center">
            <Avatar className="w-6 h-6">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="line-clamp-1 text-sm">
              {user?.fullName}&apos;s {BRAND_NAME}
            </span>
          </div>
          <ChevronsLeftRight className="w-4 h-4 text-muted-foreground rotate-[90deg]" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" alignOffset={11} forceMount>
        <div className="w-[300px]">
          <p className="text-sm flex items-center p-2">
            <Mail className="w-4 h-4 text-muted-foreground mr-2" />
            <span>{user?.emailAddresses[0].emailAddress}</span>
          </p>
          <DropdownMenuSeparator />
          <div className="flex justify-between items-center">
            <div className="p-2 flex items-center gap-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <span className="text-sm font-semibold line-clamp-1">
                {user?.fullName}&apos;s {BRAND_NAME}
              </span>
            </div>
            <SettingsModal>
              <div className="p-1 rounded-full hover:bg-secondary mr-1 text-muted-foreground hover:text-primary/90 cursor-pointer">
                <Settings className="w-4 h-4 shrink-0" />
              </div>
            </SettingsModal>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton>
              <div
                role="button"
                className="flex gapx-2 items-center w-full p-1 text-muted-foreground font-semibold rounded-sm"
              >
                <span>Logout</span> <LogOut className="w-4 h-4 ml-2" />
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
