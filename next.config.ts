import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  trailingSlash: false,
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;
