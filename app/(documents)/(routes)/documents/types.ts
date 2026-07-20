import { ACCESS_LABELS, ACCESS_LEVELS } from "@/app/constants";

export type User = {
  id?: string;
  name: string;
  email: string;
  imgUrl: string;
  access?: "read" | "write";
};

export type Collaborator = Omit<User, "imgUrl"> & {
  color?: string;
  avatar: string;
};

export type AccessLabel = keyof typeof ACCESS_LABELS;
export type AccessLevel = keyof typeof ACCESS_LEVELS;
// "Viewer" | "Editor"