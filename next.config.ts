import type { NextConfig } from 'next';

// This portfolio has no server-only routes or runtime data dependencies, so it
// can be published as a fully static site (including GitHub Pages).
const nextConfig: NextConfig = {
  output: 'export',
};

export default nextConfig;
