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
  module: {
    exports: {
      turbopack: {
        rules: {
          '*.svg': {
            loaders: ['@svgr/webpack'],
            as: '*.js',
          },
        },
      },
    }
  }

  
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     issuer: /\.[jt]sx?$/,
  //     use: ["@svgr/webpack"],
  //   });
  //   return config;
  // },
  
};

export default nextConfig;