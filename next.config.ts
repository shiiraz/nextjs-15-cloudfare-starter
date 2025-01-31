import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // Important for Cloudflare Pages
  reactStrictMode: true,
};

export default nextConfig;
