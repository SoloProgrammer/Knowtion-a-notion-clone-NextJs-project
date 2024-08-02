import { Id } from "@/convex/_generated/dataModel";

export type CommentAuthor = {
  name: string;
  avatar: string;
  email: string;
  id: string;
};

export type Reaction = {
  id: string;
  user: string;
  reaction: string;
};

export type Comment = {
  _id: Id<"comments">;
  _creationTime: number;
  author: CommentAuthor;
  content: string;
  reactions?: Reaction[];
  createdAt: number;
  document: string;
};