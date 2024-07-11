import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BRAND_NAME } from "./constants";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${BRAND_NAME} - Home`,
  description:
    "Create workspaces for your interacvtive teams and collaborate seamlessly",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.png",
        href: "/logo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.png",
        href: "/logo-dark.png",
      },
    ],
  },
  referrer: "origin-when-cross-origin",
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
  openGraph: {
    title: `${BRAND_NAME} - Home`,
    description:
      "Create workspaces for your interacvtive teams and collaborate seamlessly",
    url: "knowtion.vercel.app",
    siteName: "Knowtion",
    images: [
      {
        url: "/og.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
