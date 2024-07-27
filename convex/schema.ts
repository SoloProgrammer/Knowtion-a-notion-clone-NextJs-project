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
};

const { userId, isArchived, parentDocument, updatedAt, ...rest } =
  DocumentColumns;

export const udpateDocumentColumns = rest;

export default defineSchema({
  documents: defineTable(DocumentColumns)
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
  collaborators: defineTable({
    name: v.string(),
    email: v.string(),
    imgUrl: v.string(),
    document: v.id("documents"),
  })
    .index("by_document", ["document"])
    .index("by_email", ["email"])
    .index("by_email_document", ["document", "email"]),
});
