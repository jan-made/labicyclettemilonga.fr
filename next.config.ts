import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // <=== enables static exports
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  trailingSlash: true,
  typedRoutes: true,
  experimental: {},
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
