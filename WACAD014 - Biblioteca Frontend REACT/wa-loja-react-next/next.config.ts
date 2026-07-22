import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite todos os domínios (ou especifique o domínio do seu mock)
      },
    ],
  },
};

export default nextConfig;