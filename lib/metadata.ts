import type { Metadata } from 'next'

export const siteConfig = {
  name: 'AftermathTech',
  title: 'AftermathTech - Autonomous AI & Swarm Intelligence',
  description: 'Serious AI systems. Built for automation, optimization, and swarm-powered intelligence. 100% offline, 100% private.',
  url: 'https://aftermathtech.com',
  ogImage: 'https://aftermathtech.com/og.png',
  keywords: [
    'AI',
    'autonomous AI',
    'swarm intelligence', 
    'offline AI',
    'privacy-first AI',
    'WebAssembly',
    'multi-agent systems',
    'automation',
    'optimization'
  ],
  authors: [
    {
      name: 'AftermathTech',
      url: 'https://aftermathtech.com',
    },
  ],
  creator: 'AftermathTech',
}

export const createMetadata = (overrides?: Partial<Metadata>): Metadata => {
  return {
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.title,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: '@aftermathtech',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: `/site.webmanifest`,
    ...overrides,
  }
}

export default createMetadata
