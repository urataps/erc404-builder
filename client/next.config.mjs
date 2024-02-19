/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cryptologos.cc'
      },
      {
        protocol: 'https',
        hostname: 's3.coinmarketcap.com'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    config.resolve.fallback = { fs: false, net: false, tls: false };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  }
};

export default nextConfig;
