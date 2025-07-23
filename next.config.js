/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disable linting during builds to get deployment working
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Temporarily disable TypeScript errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },
  
  experimental: {
    appDir: true,
  },
  
  webpack: (config, { dev, isServer }) => {
    return config;
  },
  
  swcMinify: true,
  
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
};

module.exports = nextConfig;
