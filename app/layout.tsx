import type { Metadata } from 'next';
import './globals.css';
import Nav from 'components/Nav';



export const metadata: Metadata = {
  title: 'Aftermath Technologies',
  description: 'Created by Brad Kinnard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1 pt-20">{children}</main>
        <footer className="text-sm text-gray-500 text-center py-6 border-t border-gray-800">
          &copy; {new Date().getFullYear()} Aftermath Technologies. Created by Brad Kinnard.
        </footer>
      </body>
    </html>
  );
}
