import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@fsm/db', '@fsm/lib', '@fsm/ui'],
};

export default nextConfig;
