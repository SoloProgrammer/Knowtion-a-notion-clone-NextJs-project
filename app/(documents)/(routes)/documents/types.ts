export type User = {
  id?: string;
  name: string;
  email: string;
  imgUrl: string;
};

export type Collaborator = Omit<User, "imgUrl"> & {
  color?: string;
  avatar: string;
};
