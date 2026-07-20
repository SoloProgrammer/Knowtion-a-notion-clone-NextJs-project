import { ThemeType } from "@/types";
import { ReferrerEnum } from "next/dist/lib/metadata/types/metadata-types";

// Brand constants
const BRAND_NAME = "Knowtion";

// Metadata constanst
const META = {
  title: `${BRAND_NAME}`,
  desciption:
    "Create workspaces for your interacvtive teams and collaborate seamlessly",
  icon: {
    dark: {
      media: "(prefers-color-scheme: dark)",
      url: "/logo-dark.png",
      href: "/logo-dark.png",
    },
    light: {
      media: "(prefers-color-scheme: light)",
      url: "/logo.png",
      href: "/logo.png",
    },
  },
  referrer: "origin-when-cross-origin" as ReferrerEnum,
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Notion",
    "Knowtion",
    "Documents",
  ],
  authors: [
    {
      name: "Pratham Shinde",
      url: "https://github.com/SoloProgrammer",
    },
  ],
  url: "knowtion.vercel.app",
  siteName: "Knowtion",
  og: {
    url: "/og.png", // Must be an absolute URL
    width: 800,
    height: 600,
  },
  locale: "en_US",
};

// Theme constants
const DARK = "dark";
const LIGHT = "light";
const SYSTEM = "system";
const THEMS: ThemeType[] = [
  {
    theme: "Light",
    value: LIGHT,
  },
  {
    theme: "Dark",
    value: DARK,
  },
  {
    theme: "System",
    value: SYSTEM,
  },
];

const PLANS = {
  FREE: "free",
  PRO: "pro",
};

const ACCESS_LEVELS = {
  READ: "read",
  WRITE: "write",
  OWNER: "owner",
};

const ACCESS_LABELS = {
  "Viewer": ACCESS_LEVELS.READ,
  "Editor": ACCESS_LEVELS.WRITE,
};


export { META, BRAND_NAME, THEMS, DARK, LIGHT, SYSTEM, PLANS, ACCESS_LEVELS, ACCESS_LABELS };
