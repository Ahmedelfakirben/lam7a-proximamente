import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lam7a.elfakir.com',
      },
      {
        protocol: 'http',
        hostname: 'supabasekong-t0c40gs0ks0ksc80woo8cos0.46.224.62.53.sslip.io',
      },
    ],
  },
};

export default nextConfig;
