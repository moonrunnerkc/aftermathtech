import { Metadata } from 'next';

// Site metadata configuration
export const metadata: Metadata = {
  title: {
    default: 'AftermathTech - Autonomous AI & Swarm Intelligence',
    template: '%s | AftermathTech'
  },
  description: 'Advanced autonomous AI systems and swarm intelligence technology. Privacy-first, offline-capable artificial intelligence solutions.',
  keywords: ['AI', 'Artificial Intelligence', 'Swarm Intelligence', 'Autonomous Systems', 'Machine Learning', 'Privacy AI'],
  authors: [{ name: 'AftermathTech' }],
  creator: 'AftermathTech',
  publisher: 'AftermathTech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aftermathtech.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aftermathtech.com',
    title: 'AftermathTech - Autonomous AI & Swarm Intelligence',
    description: 'Advanced autonomous AI systems and swarm intelligence technology. Privacy-first, offline-capable artificial intelligence solutions.',
    siteName: 'AftermathTech',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AftermathTech - Autonomous AI Systems',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AftermathTech - Autonomous AI & Swarm Intelligence',
    description: 'Advanced autonomous AI systems and swarm intelligence technology. Privacy-first, offline-capable artificial intelligence solutions.',
    images: ['/og-image.jpg'],
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
    twitter: {
      ...metadata.twitter,
      title,
      description: description || metadata.description as string,
    },
  };
}

// Export for compatibility
export const siteMetadata = metadata;

// Additional utility functions
export function getPageTitle(title: string): string {
  return `${title} | AftermathTech`;
}

export function getPageDescription(description?: string): string {
  return description || (metadata.description as string);
}