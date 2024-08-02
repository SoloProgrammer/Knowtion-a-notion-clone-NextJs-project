import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const DocumentColumns = {
  title: v.string(),
  userId: v.string(),
  isArchived: v.boolean(),
  parentDocument: v.optional(v.id("documents")),
  content: v.optional(v.string()),
  coverImage: v.optional(v.string()),
  icon: v.optional(v.string()),
  isPublished: v.optional(v.boolean()),
  updatedAt: v.optional(v.number()),
  editedBy: v.optional(v.string()),
};

const { userId, isArchived, parentDocument, updatedAt, ...rest } =
  DocumentColumns;

export const udpateDocumentColumns = rest;

export default defineSchema({
  documents: defineTable(DocumentColumns)
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
  favourites: defineTable({
    docId: v.id("documents"),
    userId: v.string(),
  })
    .index("by_user_doc", ["userId", "docId"])
    .index("by_user", ["userId"]),
  comments: defineTable({
    content: v.string(),
    parentComment: v.optional(v.id("comments")),
    document: v.id("documents"),
    author: v.object({
      id: v.string(),
      name: v.string(),
      email: v.string(),
      avatar: v.string(),
    }),
    reactions: v.optional(
      v.array(
        v.object({
          id: v.string(),
          reaction: v.string(),
          user: v.string()
        })
      )
    ),
    createdAt: v.number(),
  })
    .index("by_document", ["document"])
    .index("by_parent_document", ["parentComment", "document"])
    .index("by_user", ["author.id"]),
  collaborators: defineTable({
    name: v.string(),
    email: v.string(),
    avatar: v.string(),
    document: v.id("documents"),
  })
    .index("by_document", ["document"])
    .index("by_email", ["email"])
    .index("by_email_document", ["document", "email"]),
});
