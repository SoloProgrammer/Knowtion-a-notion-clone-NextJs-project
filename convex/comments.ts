import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    document: v.id("documents"),
    content: v.string(),
  },
  handler: async (ctx, { content, document }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    await ctx.db.insert("comments", {
      author: {
        avatar: identity.pictureUrl!,
        id: identity.subject,
        name: identity.name!,
        email: identity.email!,
      },
      content,
      document,
      createdAt: Date.now(),
    });

    return "comment created!";
  },
});

export const get = query({
  args: {
    document: v.id("documents"),
    parentComment: v.optional(v.id("comments")),
  },
  handler: async (ctx, { document, parentComment }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const comments = await ctx.db
      .query("comments")
      .withIndex("by_parent_document", (q) =>
        q.eq("parentComment", parentComment).eq("document", document)
      )
      .collect();

    return comments;
  },
});

export const remove = mutation({
  args: {
    id: v.id("comments"),
  },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }
    await ctx.db.delete(id);
    return true;
  },
});

export const reaction = mutation({
  args: {
    id: v.id("comments"),
    reaction: v.string(),
  },
  handler: async (ctx, { id, reaction }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const userName = identity.name as string;

    const comment = await ctx.db.get(id);

    if (!comment) {
      throw new ConvexError("Comment Not found!");
    }

    let reactions = comment.reactions || [];

    const existingreaction = reactions.find(
      (r) => r.user === userName && r.reaction === reaction
    );

    if (existingreaction) {
      reactions = reactions.filter(
        (reaction) => reaction.id !== existingreaction.id
      );
    } else {
      const newReaction = {
        reaction,
        user: userName,
        id: crypto.randomUUID(),
      };
      reactions = reactions.concat(newReaction);
    }

    await ctx.db.patch(id, {
      reactions,
    });
    
    return true;
  },
});
