"use server";

import { User } from "@/app/(documents)/(routes)/documents/types";
import { clerkClient } from "@clerk/nextjs/server";

export const useSearchUsers = async (query: string) => {
  const { data } = await clerkClient().users.getUserList({ query });
  const users = data.map((user) => ({
    id: user.id,
    name: user.firstName,
    email: user.emailAddresses[0].emailAddress,
    imgUrl: user.imageUrl,
  }));
  return JSON.parse(JSON.stringify(users)) as User[];
};
