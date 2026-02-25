import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@omni/db', '@omni/lib', '@omni/ui'],
};

export default nextConfig;
