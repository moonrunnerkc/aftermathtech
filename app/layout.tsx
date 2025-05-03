import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


export const metadata: Metadata = {
  title: "Aftermath Technologies",
  description: "created by Brad Kinnard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className="bg-black text-white flex flex-col min-h-screen">
    <main className="flex-1">{children}</main>
    <footer className="text-sm text-gray-500 text-center py-6 border-t border-gray-800">
    &copy; {new Date().getFullYear()} Aftermath Technologies. Created by Brad Kinnard.
    </footer>
    </body>

    </html>
  );
}
