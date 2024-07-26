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
  collaborators: v.optional(
    v.array(
      v.object({
        name: v.string(),
        id: v.string(),
        imgUrl: v.string(),
      })
    )
  ),
  isPublished: v.optional(v.boolean()),
  updatedAt: v.optional(v.number()),
};

const {
  userId,
  isArchived,
  parentDocument,
  updatedAt,
  collaborators,
  ...rest
} = DocumentColumns;

export const udpateDocumentColumns = rest;

export default defineSchema({
  documents: defineTable(DocumentColumns)
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
});
