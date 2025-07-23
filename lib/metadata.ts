import { Metadata } from 'next';

// Site metadata configuration
export const metadata: Metadata = {
  title: {
    default: 'Aftermath Technologies | Offline-First Autonomous AI Systems | Denver, CO',
    template: '%s | Aftermath Technologies'
  },
  description: 'Build autonomous AI systems that work anywhere, anytime. Offline-first AI technology you own and control. No phone home. No dependencies. Pure autonomy by Bradley R. Kinnard.',
  keywords: [
    'offline AI', 
    'autonomous AI systems', 
    'local AI', 
    'private AI', 
    'Denver AI company', 
    'AI without internet', 
    'independent AI',
    'offline-first AI',
    'Bradley Kinnard',
    'Aftermath Technologies',
    'autonomous systems',
    'local machine learning',
    'privacy-first AI',
    'edge AI',
    'decentralized AI'
  ],
  authors: [{ name: 'Bradley R. Kinnard', url: 'https://www.linkedin.com/in/brad-kinnard/' }],
  creator: 'Bradley R. Kinnard',
  publisher: 'Aftermath Technologies Ltd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aftermathtech.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aftermathtech.com',
    title: 'Aftermath Technologies | Offline-First Autonomous AI Systems',
    description: 'Build autonomous AI systems that work anywhere, anytime. You own it. You run it. You win. Architecting offline-first AI that doesn\'t phone home.',
    siteName: 'Aftermath Technologies',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aftermath Technologies - Offline-First Autonomous AI Systems',
        type: 'image/png',
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'application-name': 'Aftermath Technologies',
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
  },
};

// Function to generate page-specific metadata
export function generatePageMetadata(
  title: string,
  description?: string,
  path?: string
): Metadata {
  return {
    title,
    description: description || metadata.description,
    alternates: {
      canonical: path || '/',
    },
    openGraph: {
      ...metadata.openGraph,
      title,
      description: description || metadata.description as string,
      url: `https://aftermathtech.com${path || ''}`,
    },
  };
}

// Export for compatibility
export const siteMetadata = metadata;

// Additional utility functions
export function getPageTitle(title: string): string {
  return `${title} | Aftermath Technologies`;
}

export function getPageDescription(description?: string): string {
  return description || (metadata.description as string);
}