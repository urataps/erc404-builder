/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config.resolve.fallback = { fs: false, net: false, tls: false };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  }
};

export default nextConfig;
