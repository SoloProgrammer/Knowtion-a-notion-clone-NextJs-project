import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Knowtion",
    short_name: "Knowtion",
    description: "Your Ideas, Documents. & Plans. Unified. Welcome to Knowtion",
    start_url: "/",
    display: "standalone",
    background_color: "#121212",
    theme_color: "#121212",
    icons: [
      {
        src: "/public/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
