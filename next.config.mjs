/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Better SVG handling — SVGs in /public are served as-is, but for inline
  // SVGs that get embedded by next/image, this gives them a sensible type.
  // (No runtime impact; just documents intent.)
};

export default nextConfig;
