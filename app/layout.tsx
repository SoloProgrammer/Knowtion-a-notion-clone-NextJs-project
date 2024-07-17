import "./globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/providers/theme-provider";
import ConvexProvider from "@/providers/convex-provider";

import { Toaster } from "@/components/ui/sonner";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { META as meta } from "./constants";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.desciption,
  icons: {
    icon: [meta.icon.dark, meta.icon.light],
  },
  referrer: meta.referrer,
  keywords: meta.keywords,
  authors: meta.authors,
  openGraph: {
    title: meta.title,
    description: meta.desciption,
    url: meta.url,
    siteName: meta.siteName,
    images: [meta.og],
    locale: meta.locale,
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
        <ConvexProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster position="bottom-right" />
            {children}
          </ThemeProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
