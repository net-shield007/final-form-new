/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove this line to enable server functionality:
  // output: 'export',
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Remove unoptimized images setting (only needed for static export)
  // images: { unoptimized: true },
  
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
