import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@omni/db', '@omni/lib', '@omni/ui'],
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default nextConfig;
