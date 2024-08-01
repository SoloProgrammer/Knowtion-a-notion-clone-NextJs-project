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
