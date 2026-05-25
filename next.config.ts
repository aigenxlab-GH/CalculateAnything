import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",    // generate static files in /out
  trailingSlash: true, // ensures /page/ URLs map to /page/index.html
};

export default nextConfig;
