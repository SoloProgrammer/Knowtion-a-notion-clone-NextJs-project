import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const archiveDocument = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      if (!identity) {
        throw new Error("Not authenticated");
      }
      const userId = identity.subject;

      const existingDocument = await ctx.db.get(args.id);

      if (!existingDocument) {
        throw new Error("Not found!");
      }

      if (existingDocument.userId !== userId) {
        throw new Error("Unauthorized!");
      }

      const recursiveArchive = async (documentId: Id<"documents">) => {
        const childDocuments = await ctx.db
          .query("documents")
          .withIndex("by_user_parent", (q) =>
            q.eq("userId", userId).eq("parentDocument", documentId)
          )
          .collect();

        for (const document of childDocuments) {
          await ctx.db.patch(document._id, {
            isArchived: true,
            updatedAt: Date.now(),
          });
          await recursiveArchive(document._id);
        }
      };

      const document = await ctx.db.patch(args.id, {
        isArchived: true,
        updatedAt: Date.now(),
      });

      recursiveArchive(existingDocument._id);

      return document;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
});

export const restoreArchives = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      if (!identity) {
        throw new Error("Not authenticated");
      }
      const userId = identity.subject;

      const existingDocument = await ctx.db.get(args.id);

      if (!existingDocument) {
        throw new Error("Not found!");
      }

      if (existingDocument.userId !== userId) {
        throw new Error("Unauthorized!");
      }

      let payload: Partial<Doc<"documents">> = {
        isArchived: false,
      };

      if (existingDocument.parentDocument) {
        const parentDocument = await ctx.db.get(
          existingDocument.parentDocument
        );
        if (parentDocument?.isArchived) {
          payload.parentDocument = undefined;
        }
      }

      const recursiveRestore = async (documentId: Id<"documents">) => {
        const childDocuments = await ctx.db
          .query("documents")
          .withIndex("by_user_parent", (q) =>
            q.eq("userId", userId).eq("parentDocument", documentId)
          )
          .collect();
        for (const document of childDocuments) {
          await ctx.db.patch(document._id, {
            isArchived: false,
          });
          await recursiveRestore(document._id);
        }
      };

      const document = await ctx.db.patch(args.id, payload);

      recursiveRestore(existingDocument._id);

      return document;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
});

export const deleteDocument = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      if (!identity) {
        throw new Error("Not authenticated");
      }
      const userId = identity.subject;

      const existingDocument = await ctx.db.get(args.id);

      if (!existingDocument) {
        throw new Error("Not found!");
      }

      if (existingDocument.userId !== userId) {
        throw new Error("Unauthorized!");
      }

      const document = await ctx.db.delete(args.id);

      return document;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
});

export const getArchiveDocuments = query({
  handler: async (ctx) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      if (!identity) {
        throw new Error("Not authenticated");
      }

      const userId = identity.subject;

      const documents = await ctx.db
        .query("documents")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .filter((q) => q.eq(q.field("isArchived"), true))
        .order("desc")
        .collect();

      return documents;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
});

export const getDocumentsByParentDocument = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const getDocumentsByUser = query({
  handler: async (ctx) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      if (!identity) {
        throw new Error("Not authenticated");
      }

      const userId = identity.subject;

      const documents = await ctx.db
        .query("documents")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .filter((q) => q.eq(q.field("isArchived"), false))
        .collect();

      return documents;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
      updatedAt: Date.now(),
    });

    return document;
  },
});
