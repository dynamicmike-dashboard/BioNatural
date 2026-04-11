import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
  disable: true, // Emergency bypass for next-pwa in Next.js 15
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  transpilePackages: ["@bionatural/ui"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // !! IMPORTANT !! 
    // This stabilizes the build in monorepos on Vercel
    // to prevent "Call retries were exceeded" errors.
    workerThreads: false,
    cpus: 1,
  },
  images: {
    unoptimized: true, 
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'bio-natural.mx' },
      { protocol: 'https', hostname: 'nueuzrkjwsbvnhsrosny.supabase.co' }
    ]
  },
  turbopack: {}, // Explicitly requested by error message
  webpack: (config) => {
    // Explicitly using webpack as suggested by the error message
    return config;
  },
};

export default withPWA(nextConfig);
