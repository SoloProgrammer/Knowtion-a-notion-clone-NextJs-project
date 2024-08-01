import { Id } from "@/convex/_generated/dataModel";

export type CommentAuthor = {
  name: string;
  avatar: string;
  email: string;
  id: string;
};

export type Comment = {
  _id: Id<"comments">;
  _creationTime: number;
  author: CommentAuthor;
  content: string;
  createdAt: number;
  document: string;
};
