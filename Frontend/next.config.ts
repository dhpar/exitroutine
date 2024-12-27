import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  watchOptions: {
    pollIntervalMs: 1000, // Check for changes every second
  },
};

export default nextConfig;
