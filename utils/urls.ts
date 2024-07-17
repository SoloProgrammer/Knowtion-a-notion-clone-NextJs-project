export const getHostUrl = (): string => {
  return process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_HOST_URL!
    : "http://localhost:3000";
};
