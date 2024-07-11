import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BRAND_NAME } from "./constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${BRAND_NAME} - Home`,
  description: "Create workspaces for your interacvtive teams and collaborate seamlessly",
  icons:{
    icon:[
      {
        media:"(prefers-color-scheme: light)",
        url:'/logo.png',
        href:'/logo.png'
      },
      {
        media:"(prefers-color-scheme: dark)",
        url:'/logo-dark.png',
        href:'/logo-dark.png'
      },
      
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
