import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@fsm/db', '@fsm/lib', '@fsm/ui'],
  experimental: {
    serverActions: {
      bodySizeLimit: '200mb',
    },
  },
};

export default nextConfig;
