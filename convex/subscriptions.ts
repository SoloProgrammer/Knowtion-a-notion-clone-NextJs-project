import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { SubscriptionDto } from "./schema";

export const create = mutation({
  args: {
    plan: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const newSubscriptionId = await ctx.db.insert("subscriptions", {
      plan: args.plan,
      buyerId: identity.subject,
    });

    return newSubscriptionId;
  },
});

export const update = mutation({
  args: { ...SubscriptionDto, id: v.id("subscriptions") },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);

    return "Subscription updated";
  },
});

export const get = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let buyerId = args.userId;
    if (!args.userId) {
      const identity = await ctx.auth.getUserIdentity();

      if (!identity) {
        throw new ConvexError("Not authenticated");
      }
      buyerId = identity.subject;
    }

    const subscription = (
      await ctx.db
        .query("subscriptions")
        .withIndex("by_buyer", (q) => q.eq("buyerId", buyerId || ""))
        .collect()
    )[0];

    return subscription;
  },
});
