import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['aryapuztfaqwdendkuqc.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aryapuztfaqwdendkuqc.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
