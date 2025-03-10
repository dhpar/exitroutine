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
  
  // webpack: (config, {isServer, dev}) => {
  //   if (!dev) {
  //     config.devtool = isServer ? false : 'eval-source-map'
  //   }
  //   config.server
  //   return config
  // },
  
};

export default nextConfig;
