import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   // generate static files in /out
  trailingSlash: true, // Netlify serves /page/ correctly
};

export default nextConfig;
