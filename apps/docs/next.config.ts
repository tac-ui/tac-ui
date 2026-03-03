import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ['@tac-ui/web', '@tac-ui/tokens', '@tac-ui/shared'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
