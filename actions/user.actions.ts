"use server";

import { clerkClient } from "@clerk/nextjs/server";

export type User = {
  id?: string;
  name: string;
  email: string;
  imgUrl: string;
};

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
