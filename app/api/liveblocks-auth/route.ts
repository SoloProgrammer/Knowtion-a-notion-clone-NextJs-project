import { generate_random_hex_color } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export const POST = async (request: NextRequest) => {
  // Get the current loggedIn clerk user
  const user = await currentUser();
  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g.

  const session = liveblocks.prepareSession(
    `user-${user?.id || crypto.randomUUID()}`,
    {
      userInfo: {
        id: user?.id || crypto.randomUUID(),
        name: user?.fullName || "Guest",
        email: user?.emailAddresses[0].emailAddress as string,
        avatar: user?.imageUrl || "https://liveblocks.io/avatars/avatar-1.png",
        color: generate_random_hex_color(),
      },
    }
  );

  // Use a naming pattern to allow access to rooms with a wildcard
  session.allow(`knowtion:document:*`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
};