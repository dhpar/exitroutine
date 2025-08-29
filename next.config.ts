import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  watchOptions: {
    pollIntervalMs: 1000, // Check for changes every second
  },
  crossOrigin: "anonymous",
  headers: async () => {
    return [
      {
         // matching all API routes
         source: "/:path*",
         headers: [
           { key: "Access-Control-Allow-Credentials", value: "false" },
           { key: "Access-Control-Allow-Origin", value: "*" },
           { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT,HEAD" },
           { key: "Access-Control-Allow-Headers", value: "*" },
         ],
      },
    ];
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true
    },
  },
  
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: { test: { test: (arg0: string) => any; }; }) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
};

export default nextConfig;