import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { META as meta } from "./constants";
import { ThemeProvider } from "@/providers/theme-provider";
import ConvexProvider from "@/providers/convex-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

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
            <Toaster position="bottom-right"/>
            {children}
          </ThemeProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
