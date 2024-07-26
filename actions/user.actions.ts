"use server";

import { clerkClient, User } from "@clerk/nextjs/server";

export const useSearchUsers = async (query: string) => {
  const { data: users } = await clerkClient().users.getUserList({ query });
  return JSON.parse(JSON.stringify(users)) as User[];
};
