import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { udpateDocumentColumns } from "./schema";

export const archiveDocument = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      if (!identity) {
        throw new ConvexError("Not authenticated");
      }
      const userId = identity.subject;

      const existingDocument = await ctx.db.get(args.id);

      if (!existingDocument) {
        throw new ConvexError("Not found!");
      }

      if (existingDocument.userId !== userId) {
        throw new ConvexError("Unauthorized!");
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

      await ctx.db.patch(args.id, {
        isArchived: true,
        updatedAt: Date.now(),
      });

      recursiveArchive(existingDocument._id);

      return true;
    } catch (error) {
      throw new ConvexError((error as Error).message);
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
        throw new ConvexError("Not authenticated");
      }
      const userId = identity.subject;

      const existingDocument = await ctx.db.get(args.id);

      if (!existingDocument) {
        throw new ConvexError("Not found!");
      }

      if (existingDocument.userId !== userId) {
        throw new ConvexError("Unauthorized!");
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
      throw new ConvexError((error as Error).message);
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
        throw new ConvexError("Not authenticated");
      }
      const userId = identity.subject;

      const existingDocument = await ctx.db.get(args.id);

      if (!existingDocument) {
        throw new ConvexError("Not found!");
      }

      if (existingDocument.userId !== userId) {
        throw new ConvexError("Unauthorized!");
      }

      await ctx.db.delete(args.id);

      return true;
    } catch (error) {
      throw new ConvexError((error as Error).message);
    }
  },
});

export const getArchiveDocuments = query({
  handler: async (ctx) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      if (!identity) {
        throw new ConvexError("Not authenticated");
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
      throw new ConvexError((error as Error).message);
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
      throw new ConvexError("Not authenticated");
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
        throw new ConvexError("Not authenticated");
      }

      const userId = identity.subject;

      const documents = await ctx.db
        .query("documents")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .filter((q) => q.eq(q.field("isArchived"), false))
        .collect();

      return documents;
    } catch (error) {
      throw new ConvexError((error as Error).message);
    }
  },
});

export const getDocumentById = query({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      const document = await ctx.db.get(args.id);

      if (!document) {
        throw new ConvexError("Not found!");
      }

      if (!identity) {
        throw new ConvexError("Not authenticated");
      }

      const userId = identity.subject;

      const userEmail = identity.email;

      if (document.isArchived && document.userId !== userId) {
        throw new ConvexError("Document is deleted.");
      }

      const collaborators = await ctx.db
        .query("collaborators")
        .withIndex("by_document", (q) => q.eq("document", args.id))
        .collect();

      if (
        document.userId !== userId &&
        !collaborators
          .map((collaborator) => collaborator.email)
          .includes(userEmail!)
      ) {
        throw new ConvexError("Unauthorized");
      }

      return document;
    } catch (error) {
      throw new ConvexError((error as Error).message);
    }
  },
});

export const getPreviewDocument = query({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id);
    if (!document || !document.isPublished) {
      throw new ConvexError("Not found!");
    }
    return document;
  },
});

export const getSharedDocuments = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const collaborators = await ctx.db
      .query("collaborators")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .order("desc")
      .collect();

    const documentIds = collaborators.map(
      (collaborator) => collaborator.document
    );

    const documents = await Promise.all(
      documentIds.map(async (id) => {
        return await ctx.db.get(id);
      })
    );

    return documents.filter((doc) => !doc?.isArchived);
  },
});

export const getCollaborators = query({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const collaborators = await ctx.db
      .query("collaborators")
      .withIndex("by_document", (q) => q.eq("document", args.id))
      .collect();

    return collaborators.map((collaborator) => ({
      name: collaborator.name,
      email: collaborator.email,
      imgUrl: collaborator.avatar,
    }));
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
      throw new ConvexError("Not authenticated");
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

export const udpate = mutation({
  args: {
    ...udpateDocumentColumns,
    id: v.id("documents"),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const exitingDocument = await ctx.db.get(args.id);

    if (!exitingDocument) {
      throw new ConvexError("Not found!");
    }

    const collaborators = await ctx.db
      .query("collaborators")
      .withIndex("by_document", (q) => q.eq("document", args.id))
      .collect();

    const userId = identity.subject;

    if (
      exitingDocument.userId !== userId &&
      !collaborators
        .map((collaborator) => collaborator.email)
        .includes(identity.email!)
    ) {
      throw new ConvexError("Unauthorized!");
    }

    const { id, ...rest } = args;

    const document = await ctx.db.patch(args.id, {
      ...rest,
      updatedAt: Date.now(),
    });

    return document;
  },
});

export const addCollaborator = mutation({
  args: {
    id: v.id("documents"),
    collaborator: v.object({
      name: v.string(),
      avatar: v.string(),
      email: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const exitingDocument = await ctx.db.get(args.id);

    if (!exitingDocument) {
      throw new ConvexError("Not found!");
    }

    const existingCollaborator = await ctx.db
      .query("collaborators")
      .withIndex("by_email_document", (q) =>
        q.eq("document", args.id).eq("email", args.collaborator.email)
      )
      .collect();

    if (existingCollaborator?.length > 0) {
      throw new ConvexError(
        `Document already shared with ${args.collaborator.name}`
      );
    }

    await ctx.db.insert("collaborators", {
      ...args.collaborator,
      document: args.id,
    });

    return true;
  },
});

export const removeCollaborator = mutation({
  args: {
    email: v.string(),
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const existingCollaborator = (
      await ctx.db
        .query("collaborators")
        .withIndex("by_email_document", (q) =>
          q.eq("document", args.documentId).eq("email", args.email)
        )
        .collect()
    )[0];

    if (!existingCollaborator) {
      throw new ConvexError("Collaborator Not found!");
    }

    await ctx.db.delete(existingCollaborator._id);

    return true;
  },
});
