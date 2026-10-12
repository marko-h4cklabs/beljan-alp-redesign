import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  images: {
    // Stopgap: the Vercel team's image-optimization quota is currently
    // exhausted (every /_next/image request 402s in production). This
    // serves original files directly instead — larger payloads, no
    // automatic AVIF/WebP/resizing, but images actually load. Revert once
    // the Vercel plan/quota is sorted (see chat).
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      // The contact form's optional photo attachment is capped at 10MB in
      // the UI; default is 1MB. Leaves headroom for multipart overhead.
      bodySizeLimit: "12mb",
    },
  },
};

export default nextConfig;
