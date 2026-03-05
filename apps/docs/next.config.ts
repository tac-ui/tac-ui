import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ['@tac-ui/web', '@tac-ui/tokens', '@tac-ui/shared', '@tac-ui/native', '@tac-ui/icon-native'],
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
    },
  },
};

export default nextConfig;
