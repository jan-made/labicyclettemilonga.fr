import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // <=== enables static exports
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  trailingSlash: true,
  env: {
    // Inlined identically into server and client bundles so the static HTML
    // and the first client render select the same upcoming event.
    BUILD_TIME: new Date().toISOString(),
  },
  typedRoutes: true,
  experimental: {},
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
