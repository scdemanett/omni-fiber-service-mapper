import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Increase body size limit for server actions
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default nextConfig;
