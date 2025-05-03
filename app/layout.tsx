import type { Metadata } from "next";
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
    <nav className="p-4 bg-black text-white flex justify-between items-center border-b border-gray-800">
    <h1 className="text-xl font-bold">Aftermath Technologies</h1>
    <div className="space-x-4">
    <a href="/" className="hover:text-green-400">Home</a>
    <a href="/services" className="hover:text-green-400">Services</a>
    <a href="/portfolio" className="hover:text-green-400">Portfolio</a>
    </div>
    </nav>

    <main className="flex-1">{children}</main>
    <footer className="text-sm text-gray-500 text-center py-6 border-t border-gray-800">
    &copy; {new Date().getFullYear()} Aftermath Technologies. Created by Brad Kinnard.
    </footer>
    </body>

    </html>
  );
}
