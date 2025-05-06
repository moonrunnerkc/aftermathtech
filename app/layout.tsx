// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Nav from 'components/Nav';

export const metadata: Metadata = {
  title: 'Aftermath Technologies',
  description: 'Cutting-edge AI engineering by Brad Kinnard. Secure, autonomous, built to deploy.',
  metadataBase: new URL('https://aftermathtech.com'),
  openGraph: {
    title: 'Aftermath Technologies',
    description: 'Cutting-edge AI engineering by Brad Kinnard. Secure, autonomous, built to deploy.',
    url: 'https://aftermathtech.com',
    siteName: 'Aftermath Technologies',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Aftermath Technologies OG',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aftermath Technologies',
    description: 'Cutting-edge AI engineering by Brad Kinnard. Secure, autonomous, built to deploy.',
    images: ['/twitter-image.png'],
    creator: '@yourhandle', // Optional: replace with your Twitter handle
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <footer className="text-sm text-gray-500 text-center py-6 border-t border-gray-800">
          &copy; {new Date().getFullYear()} Aftermath Technologies. Created by Brad Kinnard.
        </footer>
      </body>
    </html>
  );
}
