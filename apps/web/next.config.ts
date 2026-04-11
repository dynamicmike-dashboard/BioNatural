import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
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
  webpack: (config) => {
    // Explicitly using webpack as suggested by the error message
    return config;
  },
};

export default withPWA(nextConfig);
